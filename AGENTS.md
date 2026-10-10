# Repository guidance

- Public entry: `index.html`; GitHub Pages publishes `main` from `/`.
- Current resource UI: `assets/app.js`, `assets/styles.css`, `assets/config.js`, and the published `assets/catalog.json`.
- Classic tools and datasets: `glossary/`; catalog page: `data/data-catalog.html`.
- `assets/catalog.json` is a deployed data snapshot. Its exact authoring source and projection checks are versioned under `library/`. Preserve deployed records; dataset publication and Site deployment are separate.
- No root npm build exists. Serve the repo over HTTP to check the current UI, then verify the classic pages and data catalog separately. Do not suggest `npm run build:data`.
- Preserve existing URLs, page behavior, and downloadable data paths. Check `llms.txt` and catalog metadata when routes move.

- `library/` owns the reviewed glossary source release, complete builders and read-only MCP runtime. Read its README and docs/project-map.md before editing. Run its scoped verification; do not include it in static Site output or alter personal client configuration.
