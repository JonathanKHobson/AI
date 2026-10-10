# Recipient-local library checks

The complete local access flow retains four layers: authoring inputs (`data/database/templates.json`, `glossary/js/glossary.data.js`, `glossary/js/biases.data.js`), normalized records and metadata under `data/library/`, the SQLite/FTS index at `data/database/ai_glossary_mcp.db`, and `ai_glossary_mcp_server.py`. At runtime the MCP reads only SQLite; it does not reparse authoring inputs or HTML.

Build reviewed source projections and set up the recipient-local runtime from the library root:

```sh
npm run build:records
npm run build:metadata
PYTHON_BIN=python3.12 bash scripts/setup_aiglossary_mcp_runtime.sh
.runtime/venv/bin/python build_ai_glossary_mcp_index.py --root .
```

The setup installs the declared requirements into `.runtime/venv`. Use the README's recipient configuration example to register `aiglossary_library` manually. Existing global Codex, Claude and project configurations are separate recipient inputs, rather than assumed installed state.

Use Node 20+ and the package-local Python runtime described in the library README. These commands run from the library root. They do not discover or modify global client configurations.

```sh
node data/scripts/validate.mjs
node data/scripts/build-wrapper.mjs
node data/library/check-library.mjs
```

The template validator and schema retain the original required fields and field-type checks. `INPUT` and `SCHEMA` can select explicit validation inputs. The wrapper builder evaluates the trusted authored `template_src` functions and writes `glossary/js/templates.data.js`; validate reviewed authoring inputs before building. Run wrapper generation in a working copy when checking a frozen release.

The library check validates all normalized records against their schema, unique IDs, metadata counts and unresolved-link quality flags. Its health check opens the existing SQLite index read-only, checks integrity and every normalized record, discovers all 12 MCP tools, and calls them over an isolated stdio connection. It checks collection counts, records, relationships with and without filtering, search, recommendations and a context pack. The temporary MCP child exits when the session closes. It hashes source/index files and any supplied configurations before and after the check.

Select an MCP-capable Python with `--python /absolute/path/to/python` or `AIGLOSSARY_MCP_PYTHON`. The default is `.runtime/venv/bin/python`; symlinks retain their virtual-environment identity. The same flags work on the Python checker directly:

```sh
python3 scripts/check_aiglossary_mcp.py --root . --python .runtime/venv/bin/python
node data/library/check-library.mjs --python .runtime/venv/bin/python --db-path /absolute/path/to/existing-index.db
```

Client drift checks are optional and require explicit recipient inputs:

```sh
node data/library/check-library.mjs --project-config /absolute/path/to/.mcp.json
node data/library/check-library.mjs --codex-config /absolute/path/to/config.toml --claude-config /absolute/path/to/claude-config.json
```

JSON inputs use `mcpServers`; Claude's explicit project-scoped configuration under `projects[absolute_library_root].mcpServers` is also supported. Codex TOML uses `mcp_servers` and requires Python 3.11+ for its standard-library TOML parser. `--server-name` selects an existing alias. Configurations must bind to the selected Python and release server/root, or the release's `scripts/run_aiglossary_mcp.sh` launcher with the same selected runtime. An overridden index must also be declared with `--db-path` in the supplied configuration. Configurations are inspected as data and never executed or rewritten.

`--timeout` bounds the MCP session (45 seconds by default). Run `--help` on either checker for the full options. A successful local check establishes local source/index/runtime behavior; it does not establish native client discovery, Site deployment or a reload of an already running MCP connection.

Generated HTML under `data/database/glossary/`, `data/database/patterns/` and `data/database/tasks/` is a publication projection. Personas and tasks remain outside the v1 normalized MCP library. Overlapping glossary, framework and bias slugs retain separate collection records and their relationships.

`npm run verify` performs in-memory deterministic source/schema/relationship/browser checks and compares the parent repository's existing browser catalog. `npm run verify:standalone` omits that parent-catalog comparison. Neither overwrites the stored corpus, browser catalog, SQLite index or adapter. The direct verifier accepts `--public-catalog /absolute/path/to/catalog.json`, `--adapter-records /absolute/path/to/library.records.json` and `--report /absolute/path/to/new-report.json`; a report path must not already exist.

The browser view retains duplicate glossary/bias rows with distinct routes, includes the task collection and picker helper, and preserves the deployed option shape. Framework projections read `data/database/templates.json`; the browser also reads the separate task wrapper. The normalized MCP view merges duplicate entry IDs and omits tasks. These are separate projections of the same authoring inputs.

`.runtime/venv/bin/python data/library/verify_sqlite_projection.py` builds two temporary indexes, checks byte determinism, all normalized records, integrity and foreign keys, then calls the real MCP over stdio. Optional `--adapter-root /absolute/path/to/adapter` tests that explicit consumer against the isolated index. It removes its temporary indexes and checks protected corpus/index hashes. No client configuration is changed.

Publication authority and the requested Compass Suite licensing are recorded in this release's ownership, notice and provenance documents. Technical projection checks do not themselves establish rights or change the licensing of separately retained third-party material. Existing deployed browser and installed adapter snapshots remain separate baselines.
