# Library Records Schema

## Record Identity

Each normalized record in `data/library/library.records.json` has:

- `entry_id`
  - Stable ID in the form `{collection}:{slug}`
- `collection`
  - `glossary`, `framework`, or `bias`
- `source_slug`
  - Original slug within the source collection

This prevents collisions where the same slug exists in both collections.

## Core Fields

- `title`
- `kind`
- `status`
- `definition`
- `help`
- `notes`
- `aliases[]`
- `categories[]`
- `tags[]`
- `use_cases[]`
- `boosters[]`
- `fields[]`
- `related_entry_ids[]`
- `relationships[]`
- `provenance`
- `quality_flags[]`
- `search_text`

## Tags

Tags are normalized into objects:

```json
{
  "raw": "topic:safety",
  "namespace": "topic",
  "value": "safety"
}
```

The raw string is preserved for compatibility and filtering. Namespace/value pairs make AI queries more precise.

## Relationships

Relationships are explicit and typed:

- `same_subject`
- `related`
- `alias_of`
- `derived_from`

Each relationship includes:

- `type`
- `target_entry_id`
- `reason`
- `metadata`

## Quality Flags

Quality flags stay attached to the record and also get indexed into SQLite.

Current flags include:

- `missing_kind`
- `missing_definition`
- `weak_title`
- `unresolved_related_slug`
- `derived_kind_from_framework_overlap`

These are intended to support trust-aware retrieval and future cleanup passes.

## Notes On Derivation

- Framework records are derived from `data/database/templates.json`
- Glossary records are derived from `glossary/js/glossary.data.js`
- Bias records are derived from `glossary/js/biases.data.js`
- `glossary.data.js` notes are lightly parsed to extract `use_cases[]` and `boosters[]` when present
- Same-slug overlaps are linked, not merged
