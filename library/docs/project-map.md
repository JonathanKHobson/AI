# Library source map

- `OWNERSHIP.json`, `NOTICE.md`: owner-confirmed publication scope and data hashes.
- `PROVENANCE.json`: exact retained source and portability transformations.
- `data/database/templates.json`, `glossary/js/*.data.js`: authoring inputs and browser wrappers.
- `data/library/library.records.json`, `library.metadata.json`, `library.records.schema.json`: normalized data, metadata and schema.
- `data/library/library-build-common.mjs`, `build-library-*.mjs`: shared normalization and builders.
- `data/library/browser-projection.mjs`, `verify-projections.mjs`: browser reproduction and deterministic checks.
- `build_ai_glossary_mcp_index.py`, `ai_glossary_mcp_common.py`, `ai_glossary_mcp_server.py`: complete SQLite builder and read-only MCP runtime.
- `data/library/verify_sqlite_projection.py`: isolated real-protocol verification and protected-data checks.
- `data/scripts/`: complete template schema validation and browser-wrapper builder.
- `data/library/check-library.mjs`: schema, metadata and recipient-local runtime checks.
- `scripts/`: recipient-local runtime setup, launch and self-contained all-tool health checks.
- `docs/local-library-access.md`: recipient setup, explicit client configuration checks and maintenance.

The local source-bearing library remains the authoring owner; this Git path is the reviewed versioned publication authority. Reconcile contributions deliberately. Do not copy personal client configs or runtime state into the release. The parent repository's browser routes remain separate and unchanged.
