#!/usr/bin/env python3
"""Build isolated indexes and exercise current/candidate MCP consumers via stdio."""
from __future__ import annotations

import argparse
import asyncio
import hashlib
import json
import os
from pathlib import Path
import sqlite3
import subprocess
import sys
import tempfile

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def result_data(result):
    assert not result.isError, result
    if result.structuredContent is not None:
        return result.structuredContent
    return json.loads(next(block.text for block in result.content if block.type == "text"))


async def check_server(root: Path, db: Path, samples: dict[str, str], expected_count: int) -> dict:
    params = StdioServerParameters(command=sys.executable,
        args=[str(root / "ai_glossary_mcp_server.py"), "--root", str(root), "--db-path", str(db)],
        env={**os.environ, "PYTHONDONTWRITEBYTECODE": "1"})
    async with stdio_client(params) as (reader, writer):
        async with ClientSession(reader, writer) as session:
            await session.initialize()
            tools = await session.list_tools()
            overview = result_data(await session.call_tool("get_library_overview", {}))
            assert overview["record_count"] == expected_count, overview
            retrieved = {}
            errors = []
            for collection, entry_id in samples.items():
                result = await session.call_tool("get_entry", {"entry_id": entry_id})
                if result.isError:
                    errors.append({"tool": "get_entry", "entry_id": entry_id,
                        "error": next(block.text for block in result.content if block.type == "text")})
                    continue
                value = result_data(result)
                assert value["entry"]["entry_id"] == entry_id, value
                retrieved[collection] = entry_id
            for relationship_type in (None, "related"):
                arguments = {"entry_id": samples["linked"], "limit": 3}
                if relationship_type:
                    arguments["relationship_type"] = relationship_type
                result = await session.call_tool("get_related_entries", arguments)
                if result.isError:
                    errors.append({"tool": "get_related_entries", "relationship_type": relationship_type,
                        "error": next(block.text for block in result.content if block.type == "text")})
                else:
                    value = result_data(result)
                    assert value["entry_id"] == samples["linked"]
            search = result_data(await session.call_tool("search_library",
                {"query": "anchoring", "collection": "bias", "limit": 3}))
            assert search["results"] and all(row["collection"] == "bias" for row in search["results"]), search
            return {"root": str(root), "server_sha256": digest(root / "ai_glossary_mcp_server.py"),
                "tools": [tool.name for tool in tools.tools], "record_count": overview["record_count"],
                "retrieved": retrieved, "bias_search_result_ids": [row["entry_id"] for row in search["results"]],
                "technical_pass": not errors, "errors": errors}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--adapter-root", type=Path)
    parser.add_argument("--report", type=Path)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[2]
    records = json.loads((root / "data/library/library.records.json").read_text())
    samples = {collection: next(row["entry_id"] for row in records if row["collection"] == collection)
        for collection in ("glossary", "framework", "bias")}
    samples["linked"] = next(row["entry_id"] for row in records if row["relationships"])
    protected = [root / "data/library/library.records.json", root / "data/database/ai_glossary_mcp.db"]
    if args.adapter_root:
        protected += [args.adapter_root / "data/library/library.records.json", args.adapter_root / "data/database/ai_glossary_mcp.db"]
    before = {str(p): digest(p) for p in protected if p.exists()}
    with tempfile.TemporaryDirectory(prefix="projection-check-", dir=root / "data/library") as folder:
        dbs = [Path(folder) / "first.db", Path(folder) / "second.db"]
        for db in dbs:
            subprocess.run([sys.executable, str(root / "build_ai_glossary_mcp_index.py"), "--root", str(root),
                "--db-path", str(db)], check=True, capture_output=True, timeout=30,
                env={**os.environ, "PYTHONDONTWRITEBYTECODE": "1"})
        with sqlite3.connect(f"file:{dbs[0]}?mode=ro", uri=True) as connection:
            integrity = connection.execute("PRAGMA integrity_check").fetchone()[0]
            foreign_keys = connection.execute("PRAGMA foreign_key_check").fetchall()
            exported = [json.loads(row[0]) for row in connection.execute("SELECT record_json FROM entries ORDER BY entry_id")]
        assert integrity == "ok" and not foreign_keys
        assert exported == records, "SQLite record projection differs from normalized corpus"
        assert digest(dbs[0]) == digest(dbs[1]), "SQLite builds differ"
        servers = [asyncio.run(asyncio.wait_for(check_server(root, dbs[0], samples, len(records)), timeout=30))]
        if args.adapter_root:
            servers.append(asyncio.run(asyncio.wait_for(check_server(args.adapter_root.resolve(), dbs[0], samples, len(records)), timeout=30)))
        report = {"technical_pass": servers[0]["technical_pass"], "runtime": sys.executable, "sqlite_sha256": digest(dbs[0]),
            "sqlite_bytes": dbs[0].stat().st_size, "deterministic_sqlite_bytes": True,
            "integrity_check": integrity, "foreign_key_errors": foreign_keys, "all_record_json_parity": True,
            "servers": servers, "protected_before": before}
    report["scratch_removed"] = not Path(folder).exists()
    report["protected_after"] = {str(p): digest(p) for p in protected if p.exists()}
    assert report["protected_before"] == report["protected_after"], "Protected artifact changed"
    encoded = json.dumps(report, indent=2) + "\n"
    if args.report:
        with args.report.open("x") as handle:
            handle.write(encoded)
    print(encoded)


if __name__ == "__main__":
    main()
