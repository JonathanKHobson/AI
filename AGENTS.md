# Repository guidance

- Public entry: `index.html`; GitHub Pages publishes `main` from `/`.
- Current resource UI: `assets/app.js`, `assets/styles.css`, `assets/config.js`, and the published `assets/catalog.json`.
- Classic tools and datasets: `glossary/`; catalog page: `data/data-catalog.html`.
- `assets/catalog.json` is a deployed data snapshot. Its upstream generation process is not verified here. Preserve its records until source authority and output parity are established.
- No root npm build exists. Serve the repo over HTTP to check the current UI, then verify the classic pages and data catalog separately. Do not suggest `npm run build:data`.
- Preserve existing URLs, page behavior, and downloadable data paths. Check `llms.txt` and catalog metadata when routes move.
