# CLARE Prompting and AI Glossary

This repository publishes the [CLARE Prompting and AI Glossary site](https://jonathankhobson.github.io/AI/). Visitors can browse prompt frameworks, AI terms, and the classic guided tools. The [data catalog](https://jonathankhobson.github.io/AI/data/data-catalog.html) lists the classic JavaScript datasets.

GitHub Pages serves this repository's `main` branch from its root. `index.html` loads the current resource library from `assets/catalog.json`; the classic pages under `glossary/` load their own JavaScript data files. Keep both routes working. The source and release process for the published `assets/catalog.json` has not been established from this repository, so do not regenerate or replace it from another local corpus without verifying its lineage and parity.

There is no root `package.json` or public `build:data` script. For a local check, serve this directory over HTTP, open the root page, and confirm that the catalog loads. Open the data catalog and a classic glossary page as separate route checks. See [AGENTS.md](AGENTS.md) for edit boundaries.
