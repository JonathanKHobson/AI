#!/usr/bin/env python3

from __future__ import annotations

import argparse
import os
import sqlite3
from pathlib import Path
from typing import Any

from ai_glossary_mcp_common import get_library_paths, load_json, to_json


DB_VERSION = 1


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build the AIGlossary local SQLite index.")
    parser.add_argument("--root", required=True, help="Repository root.")
    parser.add_argument("--db-path", default=None, help="Optional override for the output SQLite DB path.")
    return parser.parse_args()


def create_schema(connection: sqlite3.Connection) -> None:
    connection.executescript(
        """
        PRAGMA journal_mode = WAL;
        PRAGMA synchronous = NORMAL;
        PRAGMA foreign_keys = ON;

        CREATE TABLE entries (
          entry_id TEXT PRIMARY KEY,
          collection TEXT NOT NULL,
          source_slug TEXT NOT NULL,
          title TEXT NOT NULL,
          kind TEXT,
          status TEXT NOT NULL,
          definition TEXT NOT NULL,
          help TEXT NOT NULL,
          notes TEXT NOT NULL,
          search_text TEXT NOT NULL,
          use_cases_json TEXT NOT NULL,
          boosters_json TEXT NOT NULL,
          fields_json TEXT NOT NULL,
          related_entry_ids_json TEXT NOT NULL,
          provenance_json TEXT NOT NULL,
          record_json TEXT NOT NULL
        );

        CREATE TABLE aliases (
          alias_id INTEGER PRIMARY KEY AUTOINCREMENT,
          entry_id TEXT NOT NULL,
          alias TEXT NOT NULL,
          alias_slug TEXT NOT NULL,
          FOREIGN KEY (entry_id) REFERENCES entries (entry_id) ON DELETE CASCADE
        );

        CREATE TABLE tags (
          tag_id INTEGER PRIMARY KEY AUTOINCREMENT,
          namespace TEXT NOT NULL,
          value TEXT NOT NULL,
          raw TEXT NOT NULL UNIQUE
        );

        CREATE TABLE entry_tags (
          entry_id TEXT NOT NULL,
          tag_id INTEGER NOT NULL,
          PRIMARY KEY (entry_id, tag_id),
          FOREIGN KEY (entry_id) REFERENCES entries (entry_id) ON DELETE CASCADE,
          FOREIGN KEY (tag_id) REFERENCES tags (tag_id) ON DELETE CASCADE
        );

        CREATE TABLE categories (
          category_id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL UNIQUE
        );

        CREATE TABLE entry_categories (
          entry_id TEXT NOT NULL,
          category_id INTEGER NOT NULL,
          PRIMARY KEY (entry_id, category_id),
          FOREIGN KEY (entry_id) REFERENCES entries (entry_id) ON DELETE CASCADE,
          FOREIGN KEY (category_id) REFERENCES categories (category_id) ON DELETE CASCADE
        );

        CREATE TABLE relationships (
          relationship_id INTEGER PRIMARY KEY AUTOINCREMENT,
          source_entry_id TEXT NOT NULL,
          target_entry_id TEXT NOT NULL,
          relationship_type TEXT NOT NULL,
          reason TEXT NOT NULL,
          metadata_json TEXT NOT NULL,
          FOREIGN KEY (source_entry_id) REFERENCES entries (entry_id) ON DELETE CASCADE,
          FOREIGN KEY (target_entry_id) REFERENCES entries (entry_id) ON DELETE CASCADE
        );

        CREATE TABLE evidence (
          evidence_id TEXT PRIMARY KEY,
          entry_id TEXT NOT NULL,
          field_name TEXT NOT NULL,
          section TEXT NOT NULL,
          text_value TEXT NOT NULL,
          FOREIGN KEY (entry_id) REFERENCES entries (entry_id) ON DELETE CASCADE
        );

        CREATE VIRTUAL TABLE evidence_fts USING fts5(
          evidence_id UNINDEXED,
          entry_id UNINDEXED,
          search_text,
          tokenize = 'unicode61'
        );

        CREATE TABLE quality_flags (
          quality_flag_id INTEGER PRIMARY KEY AUTOINCREMENT,
          entry_id TEXT NOT NULL,
          code TEXT NOT NULL,
          severity TEXT NOT NULL,
          message TEXT NOT NULL,
          details_json TEXT NOT NULL,
          FOREIGN KEY (entry_id) REFERENCES entries (entry_id) ON DELETE CASCADE
        );

        CREATE TABLE build_info (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL
        );

        CREATE INDEX idx_entries_collection_title ON entries (collection, title);
        CREATE INDEX idx_entries_kind_status ON entries (kind, status);
        CREATE INDEX idx_aliases_entry ON aliases (entry_id, alias);
        CREATE INDEX idx_relationships_source ON relationships (source_entry_id, relationship_type);
        CREATE INDEX idx_relationships_target ON relationships (target_entry_id, relationship_type);
        CREATE INDEX idx_quality_flags_entry ON quality_flags (entry_id, code);
        """
    )


def insert_lookup_value(connection: sqlite3.Connection, table: str, value_column: str, value: str, extra: dict[str, Any] | None = None) -> int:
    extra = extra or {}
    columns = [value_column, *extra.keys()]
    placeholders = ", ".join("?" for _ in columns)
    connection.execute(
      f"INSERT INTO {table} ({', '.join(columns)}) VALUES ({placeholders})",
      [value, *extra.values()],
    )
    row = connection.execute(f"SELECT rowid FROM {table} WHERE {value_column} = ?", (value,)).fetchone()
    return int(row[0])


def build_evidence_rows(record: dict[str, Any]) -> list[tuple[str, str, str, str, str]]:
    entry_id = record["entry_id"]
    rows: list[tuple[str, str, str, str, str]] = []
    serial = 0

    def add(field_name: str, section: str, value: str) -> None:
      nonlocal serial
      text = str(value or "").strip()
      if not text:
        return
      evidence_id = f"{entry_id}::evidence::{serial}"
      serial += 1
      rows.append((evidence_id, entry_id, field_name, section, text))

    add("title", "identity", record.get("title", ""))
    add("definition", "summary", record.get("definition", ""))
    add("help", "summary", record.get("help", ""))
    add("notes", "summary", record.get("notes", ""))
    for alias in record.get("aliases", []):
      add("alias", "identity", alias)
    for category in record.get("categories", []):
      add("category", "classification", category)
    for tag in record.get("tags", []):
      add("tag", "classification", tag.get("raw", ""))
    for use_case in record.get("use_cases", []):
      add("use_case", "application", use_case)
    for booster in record.get("boosters", []):
      add("booster", "application", booster)
    for field in record.get("fields", []):
      add("field_label", "fields", field.get("label", ""))
      add("field_key", "fields", field.get("key", ""))
      add("field_description", "fields", field.get("description", ""))
      add("field_placeholder", "fields", field.get("placeholder", ""))
      for option in field.get("options", []):
        add("field_option", "fields", option)
    return rows


def build_ai_glossary_mcp_index(*, root: str | Path, db_path: str | Path | None = None, verbose: bool = True) -> Path:
    paths = get_library_paths(root)
    target_db_path = Path(db_path).expanduser().resolve() if db_path else paths.db_path
    target_db_path.parent.mkdir(parents=True, exist_ok=True)

    records = load_json(paths.records_path)
    metadata = load_json(paths.metadata_path)

    temp_db_path = target_db_path.with_suffix(f"{target_db_path.suffix}.tmp")
    if temp_db_path.exists():
      temp_db_path.unlink()

    connection = sqlite3.connect(temp_db_path)
    try:
      create_schema(connection)

      tag_id_by_raw: dict[str, int] = {}
      category_id_by_name: dict[str, int] = {}

      pending_relationships: list[tuple[str, str, str, str, str]] = []

      for record in records:
        connection.execute(
          """
          INSERT INTO entries (
            entry_id, collection, source_slug, title, kind, status, definition, help, notes, search_text,
            use_cases_json, boosters_json, fields_json, related_entry_ids_json, provenance_json, record_json
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          """,
          (
            record["entry_id"],
            record["collection"],
            record["source_slug"],
            record["title"],
            record.get("kind"),
            record["status"],
            record.get("definition", ""),
            record.get("help", ""),
            record.get("notes", ""),
            record.get("search_text", ""),
            to_json(record.get("use_cases", [])),
            to_json(record.get("boosters", [])),
            to_json(record.get("fields", [])),
            to_json(record.get("related_entry_ids", [])),
            to_json(record.get("provenance", {})),
            to_json(record),
          ),
        )

        for alias in record.get("aliases", []):
          connection.execute(
            "INSERT INTO aliases (entry_id, alias, alias_slug) VALUES (?, ?, ?)",
            (record["entry_id"], alias, alias.lower().replace(" ", "-")),
          )

        for tag in record.get("tags", []):
          raw = tag["raw"]
          if raw not in tag_id_by_raw:
            connection.execute(
              "INSERT INTO tags (namespace, value, raw) VALUES (?, ?, ?)",
              (tag["namespace"], tag["value"], raw),
            )
            tag_id_by_raw[raw] = int(connection.execute("SELECT tag_id FROM tags WHERE raw = ?", (raw,)).fetchone()[0])
          connection.execute(
            "INSERT INTO entry_tags (entry_id, tag_id) VALUES (?, ?)",
            (record["entry_id"], tag_id_by_raw[raw]),
          )

        for category in record.get("categories", []):
          if category not in category_id_by_name:
            connection.execute("INSERT INTO categories (name) VALUES (?)", (category,))
            category_id_by_name[category] = int(
              connection.execute("SELECT category_id FROM categories WHERE name = ?", (category,)).fetchone()[0]
            )
          connection.execute(
            "INSERT INTO entry_categories (entry_id, category_id) VALUES (?, ?)",
            (record["entry_id"], category_id_by_name[category]),
          )

        for relationship in record.get("relationships", []):
          pending_relationships.append(
            (
              record["entry_id"],
              relationship["target_entry_id"],
              relationship["type"],
              relationship.get("reason", ""),
              to_json(relationship.get("metadata", {})),
            )
          )

        for flag in record.get("quality_flags", []):
          details = {key: value for key, value in flag.items() if key not in {"code", "severity", "message"}}
          connection.execute(
            """
            INSERT INTO quality_flags (entry_id, code, severity, message, details_json)
            VALUES (?, ?, ?, ?, ?)
            """,
            (
              record["entry_id"],
              flag["code"],
              flag["severity"],
              flag["message"],
              to_json(details),
            ),
          )

        for evidence_row in build_evidence_rows(record):
          connection.execute(
            """
            INSERT INTO evidence (evidence_id, entry_id, field_name, section, text_value)
            VALUES (?, ?, ?, ?, ?)
            """,
            evidence_row,
          )
          connection.execute(
            "INSERT INTO evidence_fts (evidence_id, entry_id, search_text) VALUES (?, ?, ?)",
            (evidence_row[0], evidence_row[1], evidence_row[4]),
          )

      for relationship_row in pending_relationships:
        connection.execute(
          """
          INSERT INTO relationships (
            source_entry_id, target_entry_id, relationship_type, reason, metadata_json
          ) VALUES (?, ?, ?, ?, ?)
          """,
          relationship_row,
        )

      build_info = {
        "db_version": DB_VERSION,
        "built_at": metadata.get("built_at"),
        "record_count": len(records),
        "counts_json": metadata.get("counts", {}),
        "quality_flag_counts_json": metadata.get("quality_flag_counts", {}),
      }
      for key, value in build_info.items():
        connection.execute("INSERT INTO build_info (key, value) VALUES (?, ?)", (key, to_json(value)))

      connection.commit()
    finally:
      connection.close()

    os.replace(temp_db_path, target_db_path)
    if verbose:
      print(f"Built SQLite index with {len(records)} records -> {target_db_path}")
    return target_db_path


def main() -> None:
    args = parse_args()
    build_ai_glossary_mcp_index(root=args.root, db_path=args.db_path, verbose=True)


if __name__ == "__main__":
    main()
