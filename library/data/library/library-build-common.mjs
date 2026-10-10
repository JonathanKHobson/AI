import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const ROOT = path.resolve(__dirname, "..", "..");

export const PATHS = {
  root: ROOT,
  templatesSource: path.join(ROOT, "data", "database", "templates.json"),
  glossarySource: path.join(ROOT, "glossary", "js", "glossary.data.js"),
  biasesSource: path.join(ROOT, "glossary", "js", "biases.data.js"),
  recordsOutput: path.join(ROOT, "data", "library", "library.records.json"),
  metadataOutput: path.join(ROOT, "data", "library", "library.metadata.json"),
  schemaOutput: path.join(ROOT, "data", "library", "library.records.schema.json"),
  dbOutput: path.join(ROOT, "data", "database", "ai_glossary_mcp.db"),
};

export function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

export function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function writeJson(filePath, value) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + "\n", "utf8");
}

export function normalizeText(value) {
  if (value == null) return "";
  return String(value).replace(/\s+/g, " ").trim();
}

export function normalizeMultilineText(value) {
  if (value == null) return "";
  return String(value)
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function slugify(value) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[\s_/]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function dedupeStrings(values) {
  const seen = new Set();
  const result = [];
  for (const value of values || []) {
    const clean = normalizeText(value);
    if (!clean) continue;
    if (seen.has(clean)) continue;
    seen.add(clean);
    result.push(clean);
  }
  return result;
}

export function dedupeObjects(values, keyFn) {
  const seen = new Set();
  const result = [];
  for (const value of values || []) {
    const key = keyFn(value);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(value);
  }
  return result;
}

function createGlossarySandbox() {
  const sandbox = {
    console,
    setTimeout,
    clearTimeout,
    window: undefined,
    globalThis: null,
    document: {
      querySelector() {
        return null;
      },
      getElementById() {
        return null;
      },
      addEventListener() {},
    },
    navigator: { userAgent: "node" },
    location: { hash: "" },
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {},
    CustomEvent: function CustomEvent(type, init) {
      this.type = type;
      this.detail = init?.detail;
    },
    GLOSSARY: [],
  };
  sandbox.globalThis = sandbox;
  return sandbox;
}

export function loadGlossarySource() {
  const source = fs.readFileSync(PATHS.glossarySource, "utf8");
  const sandbox = createGlossarySandbox();
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: "glossary.data.js" });
  if (!Array.isArray(sandbox.GLOSSARY)) {
    throw new Error("glossary.data.js did not populate GLOSSARY");
  }
  return sandbox.GLOSSARY;
}

function createBiasesSandbox() {
  const sandbox = {
    console,
    window: undefined,
    globalThis: null,
    module: { exports: null },
    BIASES: [],
  };
  sandbox.globalThis = sandbox;
  return sandbox;
}

export function loadBiasesSource() {
  const source = fs.readFileSync(PATHS.biasesSource, "utf8");
  const sandbox = createBiasesSandbox();
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: "biases.data.js" });
  const biases = Array.isArray(sandbox.BIASES) ? sandbox.BIASES : sandbox.module?.exports;
  if (!Array.isArray(biases)) {
    throw new Error("biases.data.js did not populate BIASES");
  }
  return biases;
}

export function loadTemplateSource() {
  return readJson(PATHS.templatesSource);
}

export function normalizeTag(rawTag) {
  const normalizedRaw = normalizeText(rawTag).toLowerCase();
  if (!normalizedRaw) return null;
  const parts = normalizedRaw.split(":");
  const namespace = parts.length > 1 ? parts[0] : "misc";
  const value = parts.length > 1 ? parts.slice(1).join(":") : normalizedRaw;
  const fixedValue = value === "heustric" ? "heuristic" : value;
  const fixedRaw = `${namespace}:${fixedValue}`;
  return {
    raw: fixedRaw,
    namespace,
    value: fixedValue,
  };
}

function normalizeCategories(...categoryLists) {
  return dedupeStrings(categoryLists.flat().filter(Boolean)).sort((a, b) => a.localeCompare(b));
}

function normalizeFields(fields) {
  if (!Array.isArray(fields)) return [];
  return fields
    .map((field) => {
      if (!field || typeof field !== "object") return null;
      const label = normalizeText(field.label);
      const key = normalizeText(field.key);
      if (!label || !key) return null;
      return {
        label,
        key,
        type: normalizeText(field.type) || "text",
        description: normalizeText(field.desc),
        placeholder: normalizeText(field.ph),
        options: dedupeStrings(field.options || []),
      };
    })
    .filter(Boolean);
}

function splitNoteSections(notes) {
  const normalized = normalizeMultilineText(notes);
  if (!normalized) {
    return {
      useCases: [],
      boosters: [],
      caveats: [],
      remainder: "",
    };
  }

  const markers = [...normalized.matchAll(/(^|\n)(Use-cases|Boosters|Caveats):/gi)];
  if (!markers.length) {
    return {
      useCases: [],
      boosters: [],
      caveats: [],
      remainder: normalized,
    };
  }

  const sections = {};
  for (let index = 0; index < markers.length; index += 1) {
    const marker = markers[index];
    const label = marker[2].toLowerCase();
    const start = marker.index + marker[0].length;
    const end = index + 1 < markers.length ? markers[index + 1].index : normalized.length;
    sections[label] = normalizeMultilineText(normalized.slice(start, end));
  }

  const parseList = (value) =>
    dedupeStrings(
      String(value || "")
        .split("•")
        .map((item) => item.replace(/^[-*]\s*/, ""))
        .map((item) => normalizeMultilineText(item))
        .filter(Boolean),
    );

  const consumed = Object.values(sections).filter(Boolean);
  let remainder = normalized;
  for (const chunk of consumed) {
    if (!chunk) continue;
    remainder = remainder.replace(chunk, "");
  }
  remainder = remainder
    .replace(/(^|\n)(Use-cases|Boosters|Caveats):/gi, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return {
    useCases: parseList(sections["use-cases"]),
    boosters: parseList(sections.boosters),
    caveats: parseList(sections.caveats),
    remainder,
  };
}

function buildSearchText(record) {
  const parts = [
    record.title,
    record.kind,
    record.status,
    record.definition,
    record.help,
    record.notes,
    ...(record.aliases || []),
    ...(record.categories || []),
    ...(record.use_cases || []),
    ...(record.boosters || []),
    ...((record.tags || []).map((tag) => `${tag.raw} ${tag.value}`)),
    ...((record.fields || []).flatMap((field) => [field.label, field.key, field.description, field.placeholder])),
  ];
  return normalizeText(parts.filter(Boolean).join(" "));
}

function qualityFlag(code, severity, message, extra = {}) {
  return {
    code,
    severity,
    message,
    ...extra,
  };
}

function scoreRecordCompleteness(record) {
  const statusWeight = {
    verified: 4,
    published: 3,
    draft: 2,
    duplicate_candidate: 1,
    unknown: 0,
  };
  return (
    (statusWeight[record.status] || 0) * 1000 +
    (record.kind ? 100 : 0) +
    (record.definition?.length || 0) +
    (record.help?.length || 0) +
    (record.notes?.length || 0) +
    (record.aliases?.length || 0) * 5 +
    (record.use_cases?.length || 0) * 5 +
    (record.tags?.length || 0) * 2
  );
}

function mergeFieldLists(primaryFields, secondaryFields) {
  return dedupeObjects([...(primaryFields || []), ...(secondaryFields || [])], (field) => `${field.key}:${field.label}`);
}

function collapseDuplicateEntryRecords(records) {
  const grouped = new Map();
  for (const record of records) {
    const bucket = grouped.get(record.entry_id) || [];
    bucket.push(record);
    grouped.set(record.entry_id, bucket);
  }

  const collapsed = [];
  for (const bucket of grouped.values()) {
    if (bucket.length === 1) {
      collapsed.push(bucket[0]);
      continue;
    }

    const sorted = [...bucket].sort((a, b) => scoreRecordCompleteness(b) - scoreRecordCompleteness(a));
    const primary = structuredClone(sorted[0]);
    const rest = sorted.slice(1);

    for (const record of rest) {
      primary.kind = primary.kind || record.kind || null;
      primary.status = scoreRecordCompleteness(record) > scoreRecordCompleteness(primary) ? record.status : primary.status;
      if ((record.definition?.length || 0) > (primary.definition?.length || 0)) primary.definition = record.definition;
      if ((record.help?.length || 0) > (primary.help?.length || 0)) primary.help = record.help;
      if ((record.notes?.length || 0) > (primary.notes?.length || 0)) primary.notes = record.notes;
      if ((record.title?.length || 0) > (primary.title?.length || 0)) primary.title = record.title;
      primary.aliases = dedupeStrings([...(primary.aliases || []), ...(record.aliases || [])]);
      primary.categories = normalizeCategories(primary.categories || [], record.categories || []);
      primary.tags = dedupeObjects([...(primary.tags || []), ...(record.tags || [])], (tag) => tag.raw).sort((a, b) =>
        a.raw.localeCompare(b.raw),
      );
      primary.use_cases = dedupeStrings([...(primary.use_cases || []), ...(record.use_cases || [])]);
      primary.boosters = dedupeStrings([...(primary.boosters || []), ...(record.boosters || [])]);
      primary.fields = mergeFieldLists(primary.fields, record.fields);
      primary.source_related_slugs = dedupeStrings([...(primary.source_related_slugs || []), ...(record.source_related_slugs || [])])
        .map(slugify)
        .filter(Boolean);
    }

    const mergedProvenance = {
      ...primary.provenance,
      merged_duplicate_sources: sorted.map((record) => ({
        source_file: record.provenance?.source_file,
        status: record.status,
        title: record.title,
        alias_count: (record.aliases || []).length,
      })),
    };
    primary.provenance = mergedProvenance;
    primary.quality_flags.push(
      qualityFlag("merged_duplicate_source_records", "info", "Multiple source records collapsed into one normalized record.", {
        duplicate_count: bucket.length,
      }),
    );
    collapsed.push(primary);
  }

  return collapsed;
}

function baseRecord({
  collection,
  slug,
  title,
  kind,
  status,
  definition,
  help,
  notes,
  aliases,
  categories,
  tags,
  useCases,
  boosters,
  fields,
  provenance,
  sourceRelatedSlugs = [],
}) {
  return {
    entry_id: `${collection}:${slug}`,
    collection,
    source_slug: slug,
    title,
    kind: kind || null,
    status: status || "unknown",
    definition: definition || "",
    help: help || "",
    notes: notes || "",
    aliases: dedupeStrings(aliases || []),
    categories: normalizeCategories(categories || []),
    tags: dedupeObjects((tags || []).map(normalizeTag).filter(Boolean), (tag) => tag.raw).sort((a, b) =>
      a.raw.localeCompare(b.raw),
    ),
    use_cases: dedupeStrings(useCases || []),
    boosters: dedupeStrings(boosters || []),
    fields: normalizeFields(fields),
    related_entry_ids: [],
    relationships: [],
    provenance,
    quality_flags: [],
    search_text: "",
    source_related_slugs: dedupeStrings(sourceRelatedSlugs || []).map(slugify).filter(Boolean),
  };
}

function normalizeTemplateRecord(template) {
  const slug = slugify(template.slug || template.id || template.label);
  const categories = normalizeCategories(
    template.categories || [],
    template.facets?.top_categories || [],
    template.facets?.subcategories || [],
  );
  const tags = dedupeStrings(template.tags || []);
  const tagKinds = tags
    .map(normalizeTag)
    .filter(Boolean)
    .filter((tag) => tag.namespace === "kind")
    .map((tag) => tag.value);
  const kind = normalizeText(template.kind) || tagKinds[0] || null;
  return baseRecord({
    collection: "framework",
    slug,
    title: normalizeText(template.label) || slug,
    kind,
    status: normalizeText(template.status) || "published",
    definition: normalizeMultilineText(template.definition),
    help: normalizeMultilineText(template.help),
    notes: normalizeMultilineText(template.notes),
    aliases: [],
    categories,
    tags,
    useCases: dedupeStrings(template.use_cases || []),
    boosters: dedupeStrings(template.boosters || []),
    fields: template.fields || [],
    provenance: {
      source_file: path.relative(ROOT, PATHS.templatesSource),
      source_type: "json",
      source_collection: "templates",
      source_related_slugs: dedupeStrings(template.related || []),
    },
    sourceRelatedSlugs: template.related || [],
  });
}

function normalizeGlossaryRecord(entry) {
  const noteSections = splitNoteSections(entry.notes);
  const slug = slugify(entry.slug || entry.term || entry.label);
  const tags = dedupeStrings(entry.tags || []);
  const tagKinds = tags
    .map(normalizeTag)
    .filter(Boolean)
    .filter((tag) => tag.namespace === "kind")
    .map((tag) => tag.value);
  return baseRecord({
    collection: "glossary",
    slug,
    title: normalizeText(entry.term || entry.label || entry.name) || slug,
    kind: tagKinds[0] || null,
    status: normalizeText(entry.status) || "draft",
    definition: normalizeMultilineText(entry.definition || entry.description),
    help: normalizeMultilineText(entry.help),
    notes: noteSections.remainder || normalizeMultilineText(entry.notes),
    aliases: dedupeStrings(entry.aliases || entry.synonyms || []),
    categories: normalizeCategories(entry.categories || []),
    tags,
    useCases: noteSections.useCases,
    boosters: noteSections.boosters,
    fields: [],
    provenance: {
      source_file: path.relative(ROOT, PATHS.glossarySource),
      source_type: "js",
      source_collection: "glossary",
      source_aliases: dedupeStrings(entry.aliases || []),
      source_related_slugs: dedupeStrings(entry.related || []),
      source_sources: Array.isArray(entry.sources) ? entry.sources : [],
      caveats: noteSections.caveats,
    },
    sourceRelatedSlugs: entry.related || [],
  });
}

function normalizeBiasRecord(entry) {
  const slug = slugify(entry.id || entry.slug || entry.name);
  const kind = normalizeText(entry.kind) || null;
  const sourceFamily = normalizeText(entry.category);
  const tags = dedupeStrings([...(entry.tags || []), "source:biases"]);
  const notes = [
    entry.mechanisms?.length ? `Mechanisms: ${entry.mechanisms.join("; ")}` : "",
    entry.indicators?.length ? `Indicators: ${entry.indicators.join("; ")}` : "",
    entry.harms?.length ? `Harms: ${entry.harms.join("; ")}` : "",
    entry.examples?.length ? `Examples: ${entry.examples.join("; ")}` : "",
    entry.meta?.source ? `Source: ${entry.meta.source}` : "",
    entry.meta?.ai_relevance ? `AI relevance: ${entry.meta.ai_relevance}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  return baseRecord({
    collection: "bias",
    slug,
    title: normalizeText(entry.name || entry.title) || slug,
    kind,
    status: normalizeText(entry.status) || "source",
    definition: normalizeMultilineText(entry.definition || entry.summary),
    help: normalizeMultilineText((entry.mitigations || []).join("\n")),
    notes: normalizeMultilineText(notes),
    aliases: dedupeStrings(entry.meta?.synonyms || []),
    categories: normalizeCategories(sourceFamily ? [sourceFamily] : [], entry.meta?.categories || []),
    tags,
    useCases: dedupeStrings(entry.contexts || []),
    boosters: [],
    fields: [],
    provenance: {
      source_file: path.relative(ROOT, PATHS.biasesSource),
      source_type: "js",
      source_collection: "biases",
      source_family: sourceFamily || null,
      source_kind: kind,
      source_related_slugs: dedupeStrings(entry.related || []),
      source_mappings: entry.mappings || {},
      source_meta: entry.meta || {},
    },
    sourceRelatedSlugs: entry.related || [],
  });
}

function addRelationship(record, relationship) {
  const normalized = {
    type: relationship.type,
    target_entry_id: relationship.target_entry_id,
    reason: normalizeText(relationship.reason),
    metadata: relationship.metadata || {},
  };
  const exists = record.relationships.some(
    (item) => item.type === normalized.type && item.target_entry_id === normalized.target_entry_id && item.reason === normalized.reason,
  );
  if (exists) return;
  record.relationships.push(normalized);
}

function finalizeRecord(record) {
  const title = normalizeText(record.title);
  if (!record.kind) {
    record.quality_flags.push(qualityFlag("missing_kind", "warning", "Record does not have a resolved kind."));
  }
  if (title.length < 3) {
    record.quality_flags.push(qualityFlag("weak_title", "warning", "Record title is very short.", { title }));
  }
  if (!record.definition) {
    record.quality_flags.push(qualityFlag("missing_definition", "warning", "Record does not have a definition."));
  }
  record.related_entry_ids = dedupeStrings(record.relationships.map((item) => item.target_entry_id)).sort((a, b) =>
    a.localeCompare(b),
  );
  record.quality_flags = dedupeObjects(
    record.quality_flags,
    (flag) => `${flag.code}:${flag.message}:${flag.slug || flag.related_slug || ""}`,
  );
  record.search_text = buildSearchText(record);
  delete record.source_related_slugs;
  return record;
}

export function buildLibraryRecords() {
  const templates = loadTemplateSource();
  const glossary = loadGlossarySource();
  const biases = loadBiasesSource();
  const records = collapseDuplicateEntryRecords([
    ...templates.map(normalizeTemplateRecord),
    ...glossary.map(normalizeGlossaryRecord),
    ...biases.map(normalizeBiasRecord),
  ]);

  const byEntryId = new Map(records.map((record) => [record.entry_id, record]));
  const bySlug = new Map();
  const byTitleSlug = new Map();
  for (const record of records) {
    const slugBucket = bySlug.get(record.source_slug) || [];
    slugBucket.push(record);
    bySlug.set(record.source_slug, slugBucket);

    const titleSlug = slugify(record.title);
    const titleBucket = byTitleSlug.get(titleSlug) || [];
    titleBucket.push(record);
    byTitleSlug.set(titleSlug, titleBucket);
  }

  for (const [slug, bucket] of bySlug.entries()) {
    if (bucket.length < 2) continue;
    for (const sourceRecord of bucket) {
      for (const targetRecord of bucket) {
        if (sourceRecord.entry_id === targetRecord.entry_id) continue;
        addRelationship(sourceRecord, {
          type: "same_subject",
          target_entry_id: targetRecord.entry_id,
          reason: "Matching slug appears in multiple source collections.",
        });
      }
    }
    const frameworks = bucket.filter((record) => record.collection === "framework");
    const glossaryEntries = bucket.filter((record) => record.collection === "glossary");
    for (const glossaryRecord of glossaryEntries) {
      for (const frameworkRecord of frameworks) {
        if (!glossaryRecord.kind && frameworkRecord.kind) {
          glossaryRecord.kind = frameworkRecord.kind;
          glossaryRecord.quality_flags.push(
            qualityFlag("derived_kind_from_framework_overlap", "info", "Kind was derived from the matching framework record.", {
              from_entry_id: frameworkRecord.entry_id,
            }),
          );
          addRelationship(glossaryRecord, {
            type: "derived_from",
            target_entry_id: frameworkRecord.entry_id,
            reason: "Kind was derived from the matching framework record.",
          });
        }
      }
    }
  }

  for (const record of records) {
    for (const relatedSlug of record.source_related_slugs || []) {
      const targets = (bySlug.get(relatedSlug) || []).filter((candidate) => candidate.entry_id !== record.entry_id);
      if (!targets.length) {
        record.quality_flags.push(
          qualityFlag("unresolved_related_slug", "warning", "Related slug could not be resolved.", {
            related_slug: relatedSlug,
          }),
        );
        continue;
      }
      for (const target of targets) {
        addRelationship(record, {
          type: "related",
          target_entry_id: target.entry_id,
          reason: "Related slug from source data.",
          metadata: { source_slug: relatedSlug },
        });
      }
    }
  }

  for (const record of records) {
    for (const alias of record.aliases || []) {
      const aliasSlug = slugify(alias);
      const matches = dedupeObjects(
        [...(bySlug.get(aliasSlug) || []), ...(byTitleSlug.get(aliasSlug) || [])].filter(
          (candidate) => candidate.entry_id !== record.entry_id,
        ),
        (candidate) => candidate.entry_id,
      );
      for (const target of matches) {
        addRelationship(target, {
          type: "alias_of",
          target_entry_id: record.entry_id,
          reason: `Source alias "${alias}" resolves to this record.`,
        });
      }
    }
  }

  const finalized = records.map(finalizeRecord).sort((a, b) => a.entry_id.localeCompare(b.entry_id));
  const duplicateSlugMap = Object.fromEntries(
    [...bySlug.entries()]
      .filter(([, bucket]) => bucket.length > 1)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([slug, bucket]) => [slug, bucket.map((record) => record.entry_id).sort((a, b) => a.localeCompare(b))]),
  );

  return {
    records: finalized,
    duplicateSlugMap,
    buildContext: {
      template_count: templates.length,
      glossary_count: glossary.length,
      bias_count: biases.length,
      total_records: finalized.length,
    },
    byEntryId,
  };
}

export function summarizeRecords(records, duplicateSlugMap = {}) {
  const counts = {
    total_records: records.length,
    collections: {},
    kinds: {},
    statuses: {},
    by_collection_kind_status: {},
  };
  const tagNamespaceCounts = {};
  const categoryCounts = {};
  const qualityFlagCounts = {};
  const unresolvedLinkReport = [];

  for (const record of records) {
    counts.collections[record.collection] = (counts.collections[record.collection] || 0) + 1;
    counts.kinds[record.kind || "unknown"] = (counts.kinds[record.kind || "unknown"] || 0) + 1;
    counts.statuses[record.status || "unknown"] = (counts.statuses[record.status || "unknown"] || 0) + 1;

    counts.by_collection_kind_status[record.collection] = counts.by_collection_kind_status[record.collection] || {};
    counts.by_collection_kind_status[record.collection][record.kind || "unknown"] =
      counts.by_collection_kind_status[record.collection][record.kind || "unknown"] || {};
    counts.by_collection_kind_status[record.collection][record.kind || "unknown"][record.status || "unknown"] =
      (counts.by_collection_kind_status[record.collection][record.kind || "unknown"][record.status || "unknown"] || 0) + 1;

    for (const tag of record.tags || []) {
      tagNamespaceCounts[tag.namespace] = (tagNamespaceCounts[tag.namespace] || 0) + 1;
    }

    for (const category of record.categories || []) {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    }

    const unresolved = [];
    for (const flag of record.quality_flags || []) {
      qualityFlagCounts[flag.code] = (qualityFlagCounts[flag.code] || 0) + 1;
      if (flag.code === "unresolved_related_slug" && flag.related_slug) {
        unresolved.push(flag.related_slug);
      }
    }
    if (unresolved.length) {
      unresolvedLinkReport.push({
        entry_id: record.entry_id,
        collection: record.collection,
        title: record.title,
        unresolved_related_slugs: dedupeStrings(unresolved).sort((a, b) => a.localeCompare(b)),
      });
    }
  }

  return {
    schema_version: 1,
    built_at: new Date().toISOString(),
    counts,
    tag_namespace_counts: Object.fromEntries(Object.entries(tagNamespaceCounts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))),
    category_counts: Object.fromEntries(Object.entries(categoryCounts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))),
    duplicate_slug_map: duplicateSlugMap,
    unresolved_link_report: unresolvedLinkReport.sort((a, b) => a.entry_id.localeCompare(b.entry_id)),
    quality_flag_counts: Object.fromEntries(Object.entries(qualityFlagCounts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))),
  };
}
