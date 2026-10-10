#!/usr/bin/env python3
"""Check the recipient-local read-only index, MCP stdio, and explicit client configs."""
from __future__ import annotations

import argparse
import asyncio
from collections import Counter
import hashlib
import json
import os
from pathlib import Path
import shutil
import sqlite3
import sys

SERVER_NAME = "aiglossary_library"
EXPECTED_TOOLS = {
    "get_library_overview", "list_collections", "list_kinds", "list_tags",
    "list_categories", "list_entries", "search_library", "get_entry",
    "get_related_entries", "get_entry_evidence", "recommend_frameworks", "build_context_pack",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", required=True, type=Path, help="Library release root.")
    parser.add_argument("--python", help="MCP-capable Python; otherwise env AIGLOSSARY_MCP_PYTHON or package-local runtime.")
    parser.add_argument("--db-path", type=Path, help="Existing SQLite index to inspect read-only.")
    parser.add_argument("--project-config", type=Path, help="Explicit project MCP JSON to compare; never modified.")
    parser.add_argument("--codex-config", type=Path, help="Explicit Codex TOML to compare; requires Python 3.11+.")
    parser.add_argument("--claude-config", type=Path, help="Explicit Claude MCP JSON to compare; never modified.")
    parser.add_argument("--server-name", default=SERVER_NAME, help="Expected config server key.")
    parser.add_argument("--timeout", type=float, default=45, help="MCP session timeout in seconds.")
    return parser.parse_args()


def require(condition: bool, message: str) -> None:
    if not condition:
        raise ValueError(message)


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def executable_path(value: str) -> Path:
    found = shutil.which(value) if os.sep not in value else value
    require(bool(found), f"Python executable not found: {value}")
    # Do not resolve venv symlinks: that would discard the virtual environment.
    return Path(found).expanduser().absolute()


def resolve_runtime(root: Path, supplied: str | None) -> Path:
    configured = supplied or os.environ.get("AIGLOSSARY_MCP_PYTHON")
    runtime = executable_path(configured) if configured else root / ".runtime/venv/bin/python"
    require(runtime.is_file() and os.access(runtime, os.X_OK),
            "MCP runtime missing. Run scripts/setup_aiglossary_mcp_runtime.sh or supply --python.")
    return runtime


def load_config(path: Path, root: Path, server_name: str) -> dict:
    if path.suffix.lower() == ".toml":
        try:
            import tomllib
        except ImportError as error:
            raise ValueError("Explicit TOML config inspection requires Python 3.11+.") from error
        with path.open("rb") as handle:
            data = tomllib.load(handle)
        servers = data.get("mcp_servers", {})
    else:
        data = json.loads(path.read_text(encoding="utf-8"))
        servers = data.get("mcpServers", {})
        if server_name not in servers:
            servers = data.get("projects", {}).get(str(root), {}).get("mcpServers", {})
    require(server_name in servers, f"Server {server_name!r} is missing in {path}.")
    entry = servers[server_name]
    require(isinstance(entry, dict), f"Invalid server configuration in {path}.")
    require(not entry.get("disabled", False) and entry.get("enabled", True), f"Server is disabled in {path}.")
    require(entry.get("type", "stdio") == "stdio", f"Expected a local stdio server in {path}.")
    return entry


def compare_config(path: Path, root: Path, runtime: Path, db: Path, server_name: str) -> dict:
    entry = load_config(path, root, server_name)
    command, arguments = entry.get("command"), entry.get("args", [])
    require(isinstance(command, str) and isinstance(arguments, list) and
            all(isinstance(item, str) for item in arguments), f"Invalid command/args in {path}.")
    command_path = Path(os.path.expandvars(command)).expanduser()
    if not command_path.is_absolute():
        command_path = Path(shutil.which(str(command_path)) or path.parent / command_path).absolute()
    arguments = [os.path.expandvars(item) for item in arguments]
    wrapper = root / "scripts/run_aiglossary_mcp.sh"
    direct = command_path == runtime
    wrapped = command_path == wrapper or (
        command_path.name in {"bash", "sh"} and arguments and Path(arguments[0]).expanduser().absolute() == wrapper)
    require(direct or wrapped, f"Config runtime/launcher differs from the selected release in {path}.")
    if direct:
        require(arguments and Path(arguments[0]).expanduser().absolute() == root / "ai_glossary_mcp_server.py",
                f"Config server source differs in {path}.")
        require("--root" in arguments and arguments.index("--root") + 1 < len(arguments) and
                Path(arguments[arguments.index("--root") + 1]).expanduser().absolute() == root,
                f"Config --root differs in {path}.")
    else:
        configured_python = entry.get("env", {}).get("AIGLOSSARY_MCP_PYTHON")
        wrapper_python = executable_path(configured_python) if configured_python else root / ".runtime/venv/bin/python"
        require(wrapper_python == runtime, f"Config wrapper Python differs from selected runtime in {path}.")
    if "--db-path" in arguments:
        index = arguments.index("--db-path") + 1
        require(index < len(arguments) and Path(arguments[index]).expanduser().absolute() == db,
                f"Config index differs in {path}.")
    else:
        require(db == root / "data/database/ai_glossary_mcp.db", f"Config lacks selected --db-path in {path}.")
    return {"path": str(path), "server_name": server_name, "release_binding_matches": True}


def inspect_index(db: Path, records: list[dict], metadata: dict) -> dict:
    require(records and len({record["entry_id"] for record in records}) == len(records), "Empty corpus or duplicate IDs.")
    counts = dict(Counter(record["collection"] for record in records))
    require(metadata["counts"]["total_records"] == len(records) and
            metadata["counts"]["collections"] == counts, "Metadata counts differ from normalized records.")
    with sqlite3.connect(f"{db.as_uri()}?mode=ro", uri=True) as connection:
        connection.execute("PRAGMA query_only = ON")
        require(connection.execute("PRAGMA integrity_check").fetchone()[0] == "ok", "SQLite integrity check failed.")
        require(not connection.execute("PRAGMA foreign_key_check").fetchall(), "SQLite foreign key check failed.")
        exported = {row[0]: json.loads(row[1]) for row in connection.execute("SELECT entry_id, record_json FROM entries")}
        require(exported == {record["entry_id"]: record for record in records}, "SQLite record projection differs from source.")
        linked = connection.execute("SELECT source_entry_id, relationship_type FROM relationships LIMIT 1").fetchone()
    return {"record_count": len(records), "collection_counts": counts,
            "linked_entry_id": linked[0] if linked else records[0]["entry_id"],
            "relationship_type": linked[1] if linked else "related",
            "integrity_check": "ok", "foreign_key_errors": [], "all_record_json_parity": True}


async def check_server(root: Path, runtime: Path, db: Path, records: list[dict], index: dict) -> dict:
    from mcp import ClientSession, StdioServerParameters
    from mcp.client.stdio import stdio_client

    params = StdioServerParameters(command=str(runtime),
        args=[str(root / "ai_glossary_mcp_server.py"), "--root", str(root), "--db-path", str(db)],
        env={**os.environ, "PYTHONDONTWRITEBYTECODE": "1"}, cwd=str(root))
    called = []
    async with stdio_client(params) as (reader, writer):
        async with ClientSession(reader, writer) as session:
            await session.initialize()
            discovered = (await session.list_tools()).tools
            require({tool.name for tool in discovered} == EXPECTED_TOOLS, "MCP tool discovery differs from complete runtime.")
            require(all(tool.annotations and tool.annotations.readOnlyHint is True and
                        tool.annotations.destructiveHint is False for tool in discovered),
                    "MCP tools lack expected read-only annotations.")

            async def call(name: str, arguments: dict) -> dict:
                result = await session.call_tool(name, arguments)
                require(not result.isError, f"MCP call failed: {name}: {result.content}")
                called.append(name)
                if result.structuredContent is not None:
                    return result.structuredContent
                return json.loads(next(block.text for block in result.content if block.type == "text"))

            overview = await call("get_library_overview", {})
            require(overview["record_count"] == index["record_count"] and
                    overview["collection_counts"] == index["collection_counts"], "MCP overview differs from index/source.")
            collections = await call("list_collections", {})
            require({row["collection"]: row["record_count"] for row in collections["collections"]} ==
                    index["collection_counts"], "MCP collection counts differ.")
            await call("list_kinds", {})
            await call("list_tags", {"limit": 3})
            await call("list_categories", {"limit": 3})
            await call("list_entries", {"limit": 3})
            samples = {collection: next(record for record in records if record["collection"] == collection)
                       for collection in index["collection_counts"]}
            for record in samples.values():
                entry = await call("get_entry", {"entry_id": record["entry_id"]})
                require(entry["entry"] == record, "MCP full record differs from normalized source.")
            sample = records[0]
            search = await call("search_library", {"query": sample["title"], "limit": 3})
            require(bool(search["results"]), "MCP title search returned no results.")
            for relationship_type in (None, index["relationship_type"]):
                arguments = {"entry_id": index["linked_entry_id"], "limit": 3}
                if relationship_type:
                    arguments["relationship_type"] = relationship_type
                related = await call("get_related_entries", arguments)
                require(related["entry_id"] == index["linked_entry_id"], "MCP relationships returned another entry.")
                if relationship_type:
                    require(all(row["relationship_type"] == relationship_type for row in related["relationships"]),
                            "MCP relationship filter was ignored.")
            await call("get_entry_evidence", {"entry_id": sample["entry_id"]})
            framework = samples.get("framework")
            require(framework is not None, "Expected framework collection is missing.")
            recommendations = await call("recommend_frameworks", {"goal": framework["title"], "limit": 3})
            require(bool(recommendations["recommendations"]), "MCP framework recommendation returned no results.")
            context = await call("build_context_pack", {"entry_ids": [sample["entry_id"]], "limit": 3})
            require(context["direct_entries"] == [sample], "MCP context pack omitted the selected entry.")
    return {"tools": sorted(EXPECTED_TOOLS), "calls": called, "sample_entry_ids":
            {key: record["entry_id"] for key, record in samples.items()}, "technical_pass": True}


def main() -> None:
    args = parse_args()
    root = args.root.expanduser().resolve()
    require(args.timeout > 0, "Timeout must be positive.")
    runtime = resolve_runtime(root, args.python)
    if runtime != Path(sys.executable).absolute():
        # Re-execute before importing MCP, retaining the selected venv identity.
        os.execve(str(runtime), [str(runtime), str(Path(__file__).absolute()), *sys.argv[1:]],
                  {**os.environ, "PYTHONDONTWRITEBYTECODE": "1"})
    require(sys.version_info >= (3, 10), "Python 3.10+ required.")
    db = args.db_path.expanduser().resolve() if args.db_path else root / "data/database/ai_glossary_mcp.db"
    records_path = root / "data/library/library.records.json"
    metadata_path = root / "data/library/library.metadata.json"
    protected = [records_path, metadata_path, root / "data/library/library.records.schema.json", db]
    configs = [path.expanduser().resolve() for path in
               (args.project_config, args.codex_config, args.claude_config) if path is not None]
    for path in [*protected, root / "ai_glossary_mcp_server.py", *configs]:
        require(path.is_file(), f"Required file missing: {path}")
    before = {str(path): digest(path) for path in [*protected, *configs]}
    try:
        records = json.loads(records_path.read_text(encoding="utf-8"))
        metadata = json.loads(metadata_path.read_text(encoding="utf-8"))
        index = inspect_index(db, records, metadata)
        config_checks = [compare_config(path, root, runtime, db, args.server_name) for path in configs]
        protocol = asyncio.run(asyncio.wait_for(check_server(root, runtime, db, records, index), timeout=args.timeout))
    finally:
        after = {str(path): digest(path) for path in [*protected, *configs]}
        require(before == after, "A protected source/index/config changed during the health check.")
    print(json.dumps({"technical_pass": True, "runtime": str(runtime), "root": str(root), "db_path": str(db),
                      "index": index, "mcp": protocol, "config_checks": config_checks,
                      "client_configs_supplied": bool(configs), "protected_files_unchanged": before == after}, indent=2))


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(f"[ERROR] {error}", file=sys.stderr)
        raise SystemExit(1)
