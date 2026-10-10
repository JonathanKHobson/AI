#!/usr/bin/env python3

from __future__ import annotations

import argparse
import sqlite3
import threading
from pathlib import Path
from typing import Any

from mcp.server.fastmcp import FastMCP
from mcp.types import ToolAnnotations

from ai_glossary_mcp_common import (
    build_fts_query,
    decode_cursor,
    encode_cursor,
    from_json,
    get_library_paths,
    normalize_text,
    tokenize_query,
)


READ_ONLY_ANNOTATIONS = ToolAnnotations(
    readOnlyHint=True,
    destructiveHint=False,
    idempotentHint=True,
    openWorldHint=False,
)


class LibraryRepository:
    def __init__(self, root: str | Path, db_path: str | Path | None = None) -> None:
        self.paths = get_library_paths(root)
        self.db_path = Path(db_path).expanduser().resolve() if db_path else self.paths.db_path
        self._lock = threading.Lock()
        self._connection = sqlite3.connect(
            f"file:{self.db_path}?mode=ro",
            uri=True,
            check_same_thread=False,
        )
        self._connection.row_factory = sqlite3.Row
        self._connection.execute("PRAGMA query_only = ON")

    def _fetch_all(self, query: str, params: tuple[Any, ...] | list[Any] = ()) -> list[sqlite3.Row]:
        with self._lock:
            cursor = self._connection.execute(query, params)
            return cursor.fetchall()

    def _fetch_one(self, query: str, params: tuple[Any, ...] | list[Any] = ()) -> sqlite3.Row | None:
        with self._lock:
            cursor = self._connection.execute(query, params)
            return cursor.fetchone()

    def _fetch_value(self, query: str, params: tuple[Any, ...] | list[Any] = ()) -> Any:
        row = self._fetch_one(query, params)
        return None if row is None else row[0]

    def _base_entry_card(self, row: sqlite3.Row) -> dict[str, Any]:
        return {
            "entry_id": row["entry_id"],
            "collection": row["collection"],
            "source_slug": row["source_slug"],
            "title": row["title"],
            "kind": row["kind"],
            "status": row["status"],
            "definition": row["definition"],
        }

    def _list_with_cursor(self, query: str, params: list[Any], limit: int, cursor: str | None) -> dict[str, Any]:
        offset = decode_cursor(cursor)
        bounded_limit = max(1, min(limit, 100))
        rows = self._fetch_all(f"{query} LIMIT ? OFFSET ?", (*params, bounded_limit + 1, offset))
        next_cursor = None
        if len(rows) > bounded_limit:
            rows = rows[:bounded_limit]
            next_cursor = encode_cursor(offset + bounded_limit)
        return {"rows": rows, "next_cursor": next_cursor}

    def get_library_overview(self) -> dict[str, Any]:
        counts_json = from_json(self._fetch_value("SELECT value FROM build_info WHERE key = 'counts_json'"), {})
        quality_json = from_json(self._fetch_value("SELECT value FROM build_info WHERE key = 'quality_flag_counts_json'"), {})
        built_at = from_json(self._fetch_value("SELECT value FROM build_info WHERE key = 'built_at'"), None)
        return {
            "built_at": built_at,
            "record_count": int(self._fetch_value("SELECT COUNT(*) FROM entries") or 0),
            "evidence_count": int(self._fetch_value("SELECT COUNT(*) FROM evidence") or 0),
            "relationship_count": int(self._fetch_value("SELECT COUNT(*) FROM relationships") or 0),
            "collection_counts": counts_json.get("collections", {}),
            "kind_counts": counts_json.get("kinds", {}),
            "status_counts": counts_json.get("statuses", {}),
            "quality_flag_counts": quality_json,
        }

    def list_collections(self) -> dict[str, Any]:
        rows = self._fetch_all(
            """
            SELECT collection, COUNT(*) AS record_count
            FROM entries
            GROUP BY collection
            ORDER BY collection ASC
            """
        )
        return {"collections": [dict(row) for row in rows]}

    def list_kinds(self, collection: str | None = None) -> dict[str, Any]:
        where = []
        params: list[Any] = []
        if collection:
            where.append("collection = ?")
            params.append(collection)
        where_sql = f"WHERE {' AND '.join(where)}" if where else ""
        rows = self._fetch_all(
            f"""
            SELECT coalesce(kind, 'unknown') AS kind, COUNT(*) AS record_count
            FROM entries
            {where_sql}
            GROUP BY coalesce(kind, 'unknown')
            ORDER BY record_count DESC, kind ASC
            """,
            params,
        )
        return {"kinds": [dict(row) for row in rows], "collection": collection}

    def list_tags(self, namespace: str | None, collection: str | None, limit: int, cursor: str | None) -> dict[str, Any]:
        where = []
        params: list[Any] = []
        if namespace:
            where.append("t.namespace = ?")
            params.append(namespace)
        if collection:
            where.append("e.collection = ?")
            params.append(collection)
        where_sql = f"WHERE {' AND '.join(where)}" if where else ""
        result = self._list_with_cursor(
            f"""
            SELECT t.namespace, t.value, t.raw, COUNT(DISTINCT et.entry_id) AS record_count
            FROM tags t
            JOIN entry_tags et ON et.tag_id = t.tag_id
            JOIN entries e ON e.entry_id = et.entry_id
            {where_sql}
            GROUP BY t.tag_id
            ORDER BY record_count DESC, t.raw ASC
            """,
            params,
            limit,
            cursor,
        )
        return {
            "tags": [dict(row) for row in result["rows"]],
            "next_cursor": result["next_cursor"],
            "namespace": namespace,
            "collection": collection,
        }

    def list_categories(self, collection: str | None, limit: int, cursor: str | None) -> dict[str, Any]:
        where = []
        params: list[Any] = []
        if collection:
            where.append("e.collection = ?")
            params.append(collection)
        where_sql = f"WHERE {' AND '.join(where)}" if where else ""
        result = self._list_with_cursor(
            f"""
            SELECT c.name, COUNT(DISTINCT ec.entry_id) AS record_count
            FROM categories c
            JOIN entry_categories ec ON ec.category_id = c.category_id
            JOIN entries e ON e.entry_id = ec.entry_id
            {where_sql}
            GROUP BY c.category_id
            ORDER BY record_count DESC, c.name ASC
            """,
            params,
            limit,
            cursor,
        )
        return {
            "categories": [dict(row) for row in result["rows"]],
            "next_cursor": result["next_cursor"],
            "collection": collection,
        }

    def list_entries(
        self,
        *,
        collection: str | None,
        kind: str | None,
        status: str | None,
        tag: str | None,
        category: str | None,
        limit: int,
        cursor: str | None,
    ) -> dict[str, Any]:
        offset = decode_cursor(cursor)
        bounded_limit = max(1, min(limit, 100))
        where = ["1 = 1"]
        params: list[Any] = []
        joins: list[str] = []

        if collection:
            where.append("e.collection = ?")
            params.append(collection)
        if kind:
            where.append("coalesce(e.kind, 'unknown') = ?")
            params.append(kind)
        if status:
            where.append("e.status = ?")
            params.append(status)
        if tag:
            joins.append("JOIN entry_tags et_filter ON et_filter.entry_id = e.entry_id")
            joins.append("JOIN tags t_filter ON t_filter.tag_id = et_filter.tag_id")
            where.append("t_filter.raw = ?")
            params.append(tag)
        if category:
            joins.append("JOIN entry_categories ec_filter ON ec_filter.entry_id = e.entry_id")
            joins.append("JOIN categories c_filter ON c_filter.category_id = ec_filter.category_id")
            where.append("c_filter.name = ?")
            params.append(category)

        rows = self._fetch_all(
            f"""
            SELECT DISTINCT e.entry_id, e.collection, e.source_slug, e.title, e.kind, e.status, e.definition
            FROM entries e
            {' '.join(joins)}
            WHERE {' AND '.join(where)}
            ORDER BY e.collection ASC, e.title ASC
            LIMIT ? OFFSET ?
            """,
            (*params, bounded_limit + 1, offset),
        )

        next_cursor = None
        if len(rows) > bounded_limit:
            rows = rows[:bounded_limit]
            next_cursor = encode_cursor(offset + bounded_limit)

        return {
            "entries": [self._base_entry_card(row) for row in rows],
            "next_cursor": next_cursor,
        }

    def search_library(
        self,
        *,
        query: str,
        collection: str | None,
        kind: str | None,
        tag: str | None,
        category: str | None,
        limit: int,
        cursor: str | None,
    ) -> dict[str, Any]:
        fts_query = build_fts_query(query)
        if not fts_query:
            return {"results": [], "next_cursor": None}

        offset = decode_cursor(cursor)
        bounded_limit = max(1, min(limit, 50))
        filters = ["1 = 1"]
        params: list[Any] = [fts_query]

        if collection:
            filters.append("e.collection = ?")
            params.append(collection)
        if kind:
            filters.append("coalesce(e.kind, 'unknown') = ?")
            params.append(kind)
        if tag:
            filters.append(
                "EXISTS (SELECT 1 FROM entry_tags et JOIN tags t ON t.tag_id = et.tag_id WHERE et.entry_id = e.entry_id AND t.raw = ?)"
            )
            params.append(tag)
        if category:
            filters.append(
                "EXISTS (SELECT 1 FROM entry_categories ec JOIN categories c ON c.category_id = ec.category_id WHERE ec.entry_id = e.entry_id AND c.name = ?)"
            )
            params.append(category)

        rows = self._fetch_all(
            f"""
            SELECT
              ev.evidence_id,
              ev.entry_id,
              ev.field_name,
              ev.section,
              snippet(evidence_fts, 2, '[', ']', ' ... ', 18) AS snippet,
              bm25(evidence_fts) AS score,
              e.collection,
              e.source_slug,
              e.title,
              e.kind,
              e.status,
              e.definition
            FROM evidence_fts
            JOIN evidence ev ON ev.evidence_id = evidence_fts.evidence_id
            JOIN entries e ON e.entry_id = ev.entry_id
            WHERE evidence_fts MATCH ? AND {' AND '.join(filters)}
            ORDER BY score ASC, e.title ASC
            LIMIT ? OFFSET ?
            """,
            (*params, bounded_limit + 1, offset),
        )

        next_cursor = None
        if len(rows) > bounded_limit:
            rows = rows[:bounded_limit]
            next_cursor = encode_cursor(offset + bounded_limit)

        results = []
        for row in rows:
            result = self._base_entry_card(row)
            result.update(
                {
                    "evidence_id": row["evidence_id"],
                    "field_name": row["field_name"],
                    "section": row["section"],
                    "snippet": row["snippet"],
                    "score": row["score"],
                }
            )
            results.append(result)

        return {"results": results, "next_cursor": next_cursor, "query": query}

    def get_entry(self, entry_id: str) -> dict[str, Any]:
        row = self._fetch_one("SELECT record_json FROM entries WHERE entry_id = ?", (entry_id,))
        if row is None:
            return {"entry": None}

        entry = from_json(row["record_json"], {})
        linked = self.get_related_entries(entry_id, relationship_type=None, limit=50)
        quality_flags = [
            {
                "code": flag_row["code"],
                "severity": flag_row["severity"],
                "message": flag_row["message"],
                "details": from_json(flag_row["details_json"], {}),
            }
            for flag_row in self._fetch_all(
                """
                SELECT code, severity, message, details_json
                FROM quality_flags
                WHERE entry_id = ?
                ORDER BY severity DESC, code ASC
                """,
                (entry_id,),
            )
        ]
        return {
            "entry": entry,
            "linked_relationships": linked["relationships"],
            "quality_flags": quality_flags,
        }

    def get_related_entries(self, entry_id: str, relationship_type: str | None, limit: int) -> dict[str, Any]:
        bounded_limit = max(1, min(limit, 100))
        where = []
        params: list[Any] = [entry_id, entry_id, entry_id, entry_id, entry_id]
        if relationship_type:
            where.append("r.relationship_type = ?")
            params.append(relationship_type)
        where_sql = f"AND {' AND '.join(where)}" if where else ""
        rows = self._fetch_all(
            f"""
            SELECT
              r.relationship_type,
              r.reason,
              r.metadata_json,
              CASE
                WHEN r.source_entry_id = ? THEN 'outgoing'
                ELSE 'incoming'
              END AS direction,
              CASE
                WHEN r.source_entry_id = ? THEN r.target_entry_id
                ELSE r.source_entry_id
              END AS entry_id,
              e.collection,
              e.source_slug,
              e.title,
              e.kind,
              e.status,
              e.definition
            FROM relationships r
            JOIN entries e
              ON e.entry_id = CASE
                WHEN r.source_entry_id = ? THEN r.target_entry_id
                ELSE r.source_entry_id
              END
            WHERE (r.source_entry_id = ? OR r.target_entry_id = ?) {where_sql}
            ORDER BY e.title ASC
            LIMIT ?
            """,
            (*params, bounded_limit),
        )

        relationships = []
        for row in rows:
            card = self._base_entry_card(row)
            relationships.append(
                {
                    "direction": row["direction"],
                    "relationship_type": row["relationship_type"],
                    "reason": row["reason"],
                    "metadata": from_json(row["metadata_json"], {}),
                    "related_entry": card,
                }
            )
        return {"entry_id": entry_id, "relationships": relationships}

    def get_entry_evidence(self, entry_id: str) -> dict[str, Any]:
        rows = self._fetch_all(
            """
            SELECT evidence_id, field_name, section, text_value
            FROM evidence
            WHERE entry_id = ?
            ORDER BY section ASC, field_name ASC, evidence_id ASC
            """,
            (entry_id,),
        )
        return {"entry_id": entry_id, "evidence": [dict(row) for row in rows]}

    def recommend_frameworks(
        self,
        *,
        goal: str,
        stage: str | None,
        constraints: str | None,
        include_tags: list[str] | None,
        exclude_tags: list[str] | None,
        kinds: list[str] | None,
        limit: int,
    ) -> dict[str, Any]:
        rows = self._fetch_all(
            """
            SELECT
              e.entry_id,
              e.collection,
              e.source_slug,
              e.title,
              e.kind,
              e.status,
              e.definition,
              e.help,
              e.notes,
              e.search_text,
              e.use_cases_json,
              e.boosters_json
            FROM entries e
            WHERE e.collection = 'framework'
            ORDER BY e.title ASC
            """
        )

        include_tags = [normalize_text(tag).lower() for tag in include_tags or [] if normalize_text(tag)]
        exclude_tags = [normalize_text(tag).lower() for tag in exclude_tags or [] if normalize_text(tag)]
        wanted_kinds = {normalize_text(kind).lower() for kind in kinds or [] if normalize_text(kind)}
        tokens = tokenize_query(" ".join(filter(None, [goal, stage, constraints])))
        results = []

        for row in rows:
            if wanted_kinds and normalize_text(row["kind"]).lower() not in wanted_kinds:
                continue

            tag_rows = self._fetch_all(
                """
                SELECT t.raw
                FROM entry_tags et
                JOIN tags t ON t.tag_id = et.tag_id
                WHERE et.entry_id = ?
                """,
                (row["entry_id"],),
            )
            tags = [tag_row["raw"].lower() for tag_row in tag_rows]
            if include_tags and not all(any(tag in raw for raw in tags) for tag in include_tags):
                continue
            if exclude_tags and any(any(tag in raw for raw in tags) for tag in exclude_tags):
                continue

            haystack = " ".join(
                filter(
                    None,
                    [
                        row["title"],
                        row["definition"],
                        row["help"],
                        row["notes"],
                        row["search_text"],
                        " ".join(from_json(row["use_cases_json"], [])),
                        " ".join(from_json(row["boosters_json"], [])),
                        " ".join(tags),
                    ],
                )
            ).lower()

            score = 0
            reasons: list[str] = []
            if stage:
                stage_token = f"phase:{normalize_text(stage).lower()}"
                if stage_token in tags:
                    score += 8
                    reasons.append(f"Matches requested stage via `{stage_token}`.")
            for token in tokens:
                if token in normalize_text(row["title"]).lower():
                    score += 5
                    reasons.append(f"Title mentions `{token}`.")
                elif token in haystack:
                    score += 1
            if goal and normalize_text(goal).lower() in haystack:
                score += 10
                reasons.append("Goal phrase appears directly in the record text.")

            if score <= 0:
                continue

            results.append(
                {
                    "entry": self._base_entry_card(row),
                    "score": score,
                    "why_matched": reasons[:3],
                }
            )

        results.sort(key=lambda item: (-item["score"], item["entry"]["title"]))
        return {
            "goal": goal,
            "stage": stage,
            "recommendations": results[: max(1, min(limit, 10))],
        }

    def build_context_pack(
        self,
        *,
        query: str | None,
        entry_ids: list[str] | None,
        kinds: list[str] | None,
        limit: int,
    ) -> dict[str, Any]:
        limit = max(1, min(limit, 20))
        selected_entries: list[dict[str, Any]] = []

        for entry_id in entry_ids or []:
            fetched = self.get_entry(entry_id).get("entry")
            if fetched:
                selected_entries.append(fetched)

        searched = self.search_library(
            query=query or "",
            collection=None,
            kind=None,
            tag=None,
            category=None,
            limit=limit,
            cursor=None,
        )["results"] if query else []

        kind_filter = {normalize_text(kind).lower() for kind in kinds or [] if normalize_text(kind)}
        seen = {entry["entry_id"] for entry in selected_entries}
        combined_cards = []
        for result in searched:
            if result["entry_id"] in seen:
                continue
            if kind_filter and normalize_text(result.get("kind")).lower() not in kind_filter:
                continue
            combined_cards.append(result)
            seen.add(result["entry_id"])

        entries_by_collection: dict[str, list[dict[str, Any]]] = {}
        for item in combined_cards:
            collection = item.get("collection") or "unknown"
            entries_by_collection.setdefault(collection, [])
            if len(entries_by_collection[collection]) < limit:
                entries_by_collection[collection].append(item)

        glossary_entries = entries_by_collection.get("glossary", [])
        framework_entries = entries_by_collection.get("framework", [])
        bias_entries = entries_by_collection.get("bias", [])

        related_entries = []
        related_seen = set()
        for base in selected_entries[:5]:
            related = self.get_related_entries(base["entry_id"], relationship_type=None, limit=5)["relationships"]
            for relationship in related:
                related_entry = relationship["related_entry"]
                if related_entry["entry_id"] in related_seen:
                    continue
                related_seen.add(related_entry["entry_id"])
                related_entries.append(
                    {
                        "relationship_type": relationship["relationship_type"],
                        "direction": relationship["direction"],
                        "entry": related_entry,
                    }
                )

        tag_counts: dict[str, int] = {}
        category_counts: dict[str, int] = {}
        for entry in selected_entries:
            entry_row = self._fetch_one("SELECT record_json FROM entries WHERE entry_id = ?", (entry["entry_id"],))
            if not entry_row:
                continue
            record = from_json(entry_row["record_json"], {})
            for tag in record.get("tags", []):
                tag_counts[tag["raw"]] = tag_counts.get(tag["raw"], 0) + 1
            for category in record.get("categories", []):
                category_counts[category] = category_counts.get(category, 0) + 1

        return {
            "query": query,
            "requested_entry_ids": entry_ids or [],
            "direct_entries": selected_entries,
            "glossary_entries": glossary_entries,
            "framework_entries": framework_entries,
            "bias_entries": bias_entries,
            "entries_by_collection": entries_by_collection,
            "key_tags": [
                {"tag": tag, "count": count}
                for tag, count in sorted(tag_counts.items(), key=lambda item: (-item[1], item[0]))[:10]
            ],
            "key_categories": [
                {"category": category, "count": count}
                for category, count in sorted(category_counts.items(), key=lambda item: (-item[1], item[0]))[:10]
            ],
            "related_entries": related_entries[:limit],
        }


def build_server(repository: LibraryRepository) -> FastMCP:
    server = FastMCP(
        name="aiglossary_library",
        instructions="Read-only local access to the AIGlossary glossary and framework library.",
        log_level="ERROR",
    )

    @server.tool(description="Return high-level stats for the AIGlossary knowledge index.", annotations=READ_ONLY_ANNOTATIONS, structured_output=True)
    def get_library_overview() -> dict[str, Any]:
        return repository.get_library_overview()

    @server.tool(description="List available collections in the local AIGlossary library.", annotations=READ_ONLY_ANNOTATIONS, structured_output=True)
    def list_collections() -> dict[str, Any]:
        return repository.list_collections()

    @server.tool(description="List indexed kinds, optionally filtered to one collection.", annotations=READ_ONLY_ANNOTATIONS, structured_output=True)
    def list_kinds(collection: str | None = None) -> dict[str, Any]:
        return repository.list_kinds(collection=collection)

    @server.tool(description="List tags, optionally filtered by namespace or collection.", annotations=READ_ONLY_ANNOTATIONS, structured_output=True)
    def list_tags(namespace: str | None = None, collection: str | None = None, limit: int = 50, cursor: str | None = None) -> dict[str, Any]:
        return repository.list_tags(namespace=namespace, collection=collection, limit=limit, cursor=cursor)

    @server.tool(description="List categories, optionally filtered by collection.", annotations=READ_ONLY_ANNOTATIONS, structured_output=True)
    def list_categories(collection: str | None = None, limit: int = 50, cursor: str | None = None) -> dict[str, Any]:
        return repository.list_categories(collection=collection, limit=limit, cursor=cursor)

    @server.tool(description="Browse library records with compact metadata cards and optional filters.", annotations=READ_ONLY_ANNOTATIONS, structured_output=True)
    def list_entries(
        collection: str | None = None,
        kind: str | None = None,
        status: str | None = None,
        tag: str | None = None,
        category: str | None = None,
        limit: int = 20,
        cursor: str | None = None,
    ) -> dict[str, Any]:
        return repository.list_entries(
            collection=collection,
            kind=kind,
            status=status,
            tag=tag,
            category=category,
            limit=limit,
            cursor=cursor,
        )

    @server.tool(description="Full-text search across glossary and framework evidence.", annotations=READ_ONLY_ANNOTATIONS, structured_output=True)
    def search_library(
        query: str,
        collection: str | None = None,
        kind: str | None = None,
        tag: str | None = None,
        category: str | None = None,
        limit: int = 10,
        cursor: str | None = None,
    ) -> dict[str, Any]:
        return repository.search_library(
            query=query,
            collection=collection,
            kind=kind,
            tag=tag,
            category=category,
            limit=limit,
            cursor=cursor,
        )

    @server.tool(description="Fetch one full normalized record, plus linked relationships and quality flags.", annotations=READ_ONLY_ANNOTATIONS, structured_output=True)
    def get_entry(entry_id: str) -> dict[str, Any]:
        return repository.get_entry(entry_id)

    @server.tool(description="Fetch records related to one entry, including incoming and outgoing relationships.", annotations=READ_ONLY_ANNOTATIONS, structured_output=True)
    def get_related_entries(entry_id: str, relationship_type: str | None = None, limit: int = 20) -> dict[str, Any]:
        return repository.get_related_entries(entry_id=entry_id, relationship_type=relationship_type, limit=limit)

    @server.tool(description="Fetch the field-level evidence stored for one entry.", annotations=READ_ONLY_ANNOTATIONS, structured_output=True)
    def get_entry_evidence(entry_id: str) -> dict[str, Any]:
        return repository.get_entry_evidence(entry_id)

    @server.tool(description="Recommend framework records that best fit a goal, stage, and constraints.", annotations=READ_ONLY_ANNOTATIONS, structured_output=True)
    def recommend_frameworks(
        goal: str,
        stage: str | None = None,
        constraints: str | None = None,
        include_tags: list[str] | None = None,
        exclude_tags: list[str] | None = None,
        kinds: list[str] | None = None,
        limit: int = 3,
    ) -> dict[str, Any]:
        return repository.recommend_frameworks(
            goal=goal,
            stage=stage,
            constraints=constraints,
            include_tags=include_tags,
            exclude_tags=exclude_tags,
            kinds=kinds,
            limit=limit,
        )

    @server.tool(description="Assemble a compact mixed glossary/framework context pack for an AI task.", annotations=READ_ONLY_ANNOTATIONS, structured_output=True)
    def build_context_pack(
        query: str | None = None,
        entry_ids: list[str] | None = None,
        kinds: list[str] | None = None,
        limit: int = 10,
    ) -> dict[str, Any]:
        return repository.build_context_pack(query=query, entry_ids=entry_ids, kinds=kinds, limit=limit)

    return server


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run the local AIGlossary MCP server.")
    parser.add_argument("--root", required=True, help="Repository root.")
    parser.add_argument("--db-path", default=None, help="Optional override for the SQLite DB path.")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    repository = LibraryRepository(root=args.root, db_path=args.db_path)
    server = build_server(repository)
    server.run(transport="stdio")


if __name__ == "__main__":
    main()
