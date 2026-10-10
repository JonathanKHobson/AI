# AI Glossary Library 1.0.0

The versioned source and local access runtime for Kyle Hobson's glossary, in the existing [AI repository](https://github.com/JonathanKHobson/AI). The [public browser library](https://activity-atlas.jkylehobson.chatgpt.site/ai/) remains a separate preserved deployment.

This release contains 1,740 normalized records: 842 glossary entries, 366 frameworks and 532 biases. All 1,200 predecessor-adapter IDs remain present; the additions are 532 biases, six frameworks and two glossary entries. The browser view preserves duplicate routes and includes task templates, so its 846 glossary, 407 framework/task and 536 bias rows have a different shape from the normalized corpus.

## Source and authority

`OWNERSHIP.json` records Kyle's ownership confirmation and exact data hashes. `PROVENANCE.json` identifies retained source files and recipient-portability changes. [LICENSE](LICENSE) and [NOTICE.md](NOTICE.md) apply the Compass Suite licensing model: AGPL-3.0-only for original code, CC BY-SA 4.0 for original content and the dataset compilation, with third-party terms retained and official branding reserved. The source commit and immutable `library/v1.0.0` release identify this edition. Future editions require new versions; existing published files and tags are preserved.

Authoring inputs are `data/database/templates.json`, `glossary/js/glossary.data.js` and `glossary/js/biases.data.js`. Browser tasks additionally use `glossary/js/templates.tasks.data.js`. The generated normalized JSON, metadata and schema are under `data/library/`. Original content, source citations and quality flags are retained. One personal draft-file locator was replaced by a public provenance label in 106 records; the private source hash and released output hash are recorded separately. The 73 unresolved-related-slug warnings are visible source limitations, not silently repaired relationships.

## Reproduce and inspect

Requirements: Node.js 20 or newer and Python 3.10 or newer; Python 3.12 is the tested version. From this `library` directory:

```sh
npm ci
npm run verify
npm run build:records
npm run build:metadata
npm run validate:templates
python3 build_ai_glossary_mcp_index.py --root .
```

In an extracted standalone release archive, use `npm run verify:standalone`. In a full repository checkout, `npm run verify` additionally checks the preserved browser snapshot at `../assets/catalog.json`. Both builds preserve normalized data bytes. SQLite is generated locally, rather than copied from a personal installation.

The verifier checks deterministic normalized rebuilds, the schema, emitted relationship targets and browser projection. Ownership evidence is reported separately and cannot be inferred from passing technical checks.

## Use the complete read-only MCP runtime

```sh
PYTHON_BIN=python3.12 bash scripts/setup_aiglossary_mcp_runtime.sh
.runtime/venv/bin/python build_ai_glossary_mcp_index.py --root .
.runtime/venv/bin/python data/library/verify_sqlite_projection.py
npm run check:library
bash scripts/run_aiglossary_mcp.sh
```

Setup creates a package-local `.runtime/venv` and installs the pinned `mcp==1.26.0` dependency. It does not change Codex, Claude or other client settings. The launch script uses that runtime by default, or an explicitly supplied `AIGLOSSARY_MCP_PYTHON`. To configure a recipient-owned MCP client, use the absolute path to this Python interpreter as its command and the absolute paths to `ai_glossary_mcp_server.py` and this `library` directory as arguments:

```json
{"command":"/YOUR/CHECKOUT/library/.runtime/venv/bin/python","args":["/YOUR/CHECKOUT/library/ai_glossary_mcp_server.py","--root","/YOUR/CHECKOUT/library"]}
```

The server exposes 12 read-only tools for overview, collections, kinds, tags, categories, entry listing/search/retrieval, relationships, evidence, framework recommendations and context packs. The isolated SQLite verifier builds two temporary indexes, checks integrity and record parity, and exercises actual stdio entry retrieval, filtered/unfiltered relationships and bias search. It removes temporary indexes and verifies protected source/index hashes.

The included health checker is self-contained and calls all 12 tools over real stdio. Optional client-config comparisons read only paths explicitly supplied by the recipient. Machine-specific configuration is not distributed. Existing installed adapters and their databases are not changed by this release. The launch/setup helpers replace personal paths with recipient-owned paths while retaining the full server, builder and projection procedures.

## Maintenance and recovery

See [docs/project-map.md](docs/project-map.md). Edit source inputs, rebuild and verify both projections, then create a new version. Browser deployment remains a separate reviewed action in the Activity Atlas owner. Do not replace its catalog merely because a local build passed. Roll back source with a normal Git revert; prior release archives and the live site remain available.
