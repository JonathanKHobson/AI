#!/usr/bin/env python3

from __future__ import annotations

import base64
import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any


@dataclass(frozen=True)
class LibraryPaths:
    root: Path
    records_path: Path
    metadata_path: Path
    db_path: Path


def get_library_paths(root: str | Path) -> LibraryPaths:
    root_path = Path(root).expanduser().resolve()
    return LibraryPaths(
        root=root_path,
        records_path=root_path / "data" / "library" / "library.records.json",
        metadata_path=root_path / "data" / "library" / "library.metadata.json",
        db_path=root_path / "data" / "database" / "ai_glossary_mcp.db",
    )


def normalize_text(value: Any) -> str:
    if not isinstance(value, str):
        return ""
    return re.sub(r"\s+", " ", value).strip()


def slugify(value: Any) -> str:
    text = normalize_text(value).lower()
    text = text.replace("&", " and ")
    text = re.sub(r"[\s_/]+", "-", text)
    text = re.sub(r"[^a-z0-9-]", "", text)
    text = re.sub(r"-{2,}", "-", text)
    return text.strip("-")


def to_json(value: Any) -> str:
    return json.dumps(value, ensure_ascii=False, separators=(",", ":"))


def from_json(value: str | None, default: Any) -> Any:
    if not value:
        return default
    try:
        return json.loads(value)
    except json.JSONDecodeError:
        return default


def load_json(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def encode_cursor(offset: int) -> str:
    payload = to_json({"offset": max(offset, 0)}).encode("utf-8")
    return base64.urlsafe_b64encode(payload).decode("ascii")


def decode_cursor(cursor: str | None) -> int:
    if not cursor:
        return 0
    try:
        payload = base64.urlsafe_b64decode(cursor.encode("ascii"))
        return max(int(json.loads(payload.decode("utf-8")).get("offset", 0)), 0)
    except Exception:
        return 0


def tokenize_query(value: str | None) -> list[str]:
    return [token for token in re.split(r"[^a-z0-9]+", (value or "").lower()) if token]


def build_fts_query(value: str | None) -> str:
    tokens = tokenize_query(value)
    if not tokens:
        return ""
    return " AND ".join(f'{token}*' for token in tokens)
