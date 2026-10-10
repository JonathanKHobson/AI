// Read-only source, schema and consumer checks. Only --report writes a new report.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { parseArgs } from "node:util";
import Ajv2020 from "ajv/dist/2020.js";
import { ROOT, PATHS, buildLibraryRecords, readJson } from "./library-build-common.mjs";
import { buildBrowserData } from "./browser-projection.mjs";

const { values } = parseArgs({ options: {
  "adapter-records": { type: "string" }, "public-catalog": { type: "string" },
  report: { type: "string" },
} });
const sha = value => crypto.createHash("sha256").update(value).digest("hex");
const json = value => JSON.stringify(value, null, 2) + "\n";
const file = name => {
  const bytes = fs.readFileSync(name);
  return { path: fs.realpathSync(name), bytes: bytes.length, sha256: sha(bytes) };
};
const counts = rows => Object.fromEntries([...new Set(rows.map(r => r.collection))].sort()
  .map(c => [c, rows.filter(r => r.collection === c).length]));
const records = buildLibraryRecords().records;
const second = buildLibraryRecords().records;
const disk = readJson(PATHS.recordsOutput);
const ids = new Set(records.map(row => row.entry_id));
const validate = new Ajv2020({ allErrors: true, strict: false }).compile(readJson(PATHS.schemaOutput));
const schemaErrors = records.flatMap(row => validate(row) ? [] : [{ entry_id: row.entry_id, errors: validate.errors }]);
const dangling = records.flatMap(row => list(row.relationships).filter(rel => !ids.has(rel.target_entry_id))
  .map(rel => ({ entry_id: row.entry_id, target_entry_id: rel.target_entry_id })));
function list(value) { return Array.isArray(value) ? value : []; }
const browser = buildBrowserData();
const ownershipPath = path.join(ROOT, "OWNERSHIP.json");
const ownership = fs.existsSync(ownershipPath) ? readJson(ownershipPath) : null;
const ownerBindingMatches = Boolean(ownership?.publication_authorized && ownership.covered_sources?.length &&
  ownership.covered_sources.every(source => sha(fs.readFileSync(path.join(ROOT, source.path))) === source.sha256));
const report = {
  captured_utc: new Date().toISOString(), source_root: ROOT,
  scope: "Local technical validation only; no publication, source authority, or rights grant implied",
  sources: [PATHS.templatesSource, PATHS.glossarySource, PATHS.biasesSource,
    path.join(ROOT, "glossary/js/templates.data.js"), path.join(ROOT, "glossary/js/templates.tasks.data.js"),
    path.join(ROOT, "data/library/library-build-common.mjs"), PATHS.recordsOutput, PATHS.schemaOutput,
    path.join(ROOT, "data/library/browser-projection.mjs"), path.join(ROOT, "data/library/verify-projections.mjs")].map(file),
  normalized: {
    records: records.length, counts: counts(records), unique_entry_ids: ids.size,
    deterministic_rebuild: json(records) === json(second), exact_stored_bytes: json(records) === fs.readFileSync(PATHS.recordsOutput, "utf8"),
    semantic_stored_parity: JSON.stringify(records) === JSON.stringify(disk), rebuilt_sha256: sha(json(records)),
    schema_errors: schemaErrors, dangling_relationships: dangling,
    unresolved_related_slug_records: records.filter(row => row.quality_flags.some(flag => flag.code === "unresolved_related_slug")).length,
  },
  browser: {
    counts: Object.fromEntries(Object.entries(browser).map(([key, rows]) => [key, rows.length])),
    deterministic_rebuild: json(browser) === json(buildBrowserData()),
    payload_sha256: sha(json(browser)),
  },
  rights: {
    root_license_or_notice: fs.readdirSync(ROOT).filter(name => /^(license|notice|copyright)(\.|$)/i.test(name)),
    explicit_schema_rights_fields: Object.keys(readJson(PATHS.schemaOutput).properties).filter(name => /license|rights|copyright/i.test(name)),
    glossary_with_source_sources: records.filter(row => row.collection === "glossary" && list(row.provenance.source_sources).length).length,
    bias_with_source_meta_source: records.filter(row => row.collection === "bias" && row.provenance.source_meta?.source).length,
    owner_publication_authority_recorded: ownerBindingMatches,
    ownership_record: ownership ? "OWNERSHIP.json" : null,
    declared_licenses: ownership?.licenses ?? null,
    unresolved_entry_ids: ownerBindingMatches ? [] : [...ids].sort(),
    reason: "Owner-confirmed AGPL/CC BY-SA scope is recorded separately from technical checks; cited third-party works retain their own rights",
  },
};
if (values["adapter-records"]) {
  const name = path.resolve(values["adapter-records"]);
  const adapter = readJson(name);
  const old = new Map(adapter.map(row => [row.entry_id, row]));
  const shared = records.filter(row => old.has(row.entry_id));
  const added = records.filter(row => !old.has(row.entry_id));
  report.adapter = { ...file(name), count: adapter.length, counts: counts(adapter), shared: shared.length,
    added_counts: counts(added), added_entry_ids: added.map(row => row.entry_id),
    adapter_only_ids: adapter.filter(row => !ids.has(row.entry_id)).map(row => row.entry_id),
    shared_exact: shared.filter(row => JSON.stringify(row) === JSON.stringify(old.get(row.entry_id))).length,
    shared_changed: shared.filter(row => JSON.stringify(row) !== JSON.stringify(old.get(row.entry_id))).length };
}
if (values["public-catalog"]) {
  const name = path.resolve(values["public-catalog"]);
  const catalog = readJson(name);
  report.browser.baseline = file(name);
  report.browser.collection_parity = Object.fromEntries(Object.entries(browser).map(([key, rows]) => [key, JSON.stringify(rows) === JSON.stringify(catalog[key])]));
  const sourceFields = { glossarySha256: PATHS.glossarySource, frameworksSha256: path.join(ROOT, "glossary/js/templates.data.js"),
    tasksSha256: path.join(ROOT, "glossary/js/templates.tasks.data.js"), biasesSha256: PATHS.biasesSource };
  report.browser.source_hash_parity = Object.fromEntries(Object.entries(sourceFields).map(([key, name]) => [key, catalog.source?.[key] === file(name).sha256]));
  report.browser.source_lineage_matches = Object.fromEntries(Object.entries(sourceFields).map(([key, name]) => {
    const digest = file(name).sha256;
    const source = ownership?.covered_sources?.find(item => item.path === path.relative(ROOT, name));
    return [key, catalog.source?.[key] === digest || Boolean(ownerBindingMatches && source?.sha256 === digest && source?.source_sha256 === catalog.source?.[key] && source?.transformation)];
  }));
}
report.technical_pass = report.normalized.deterministic_rebuild && report.normalized.exact_stored_bytes
  && report.normalized.unique_entry_ids === records.length && !schemaErrors.length && !dangling.length
  && report.browser.deterministic_rebuild && (!report.browser.collection_parity || Object.values(report.browser.collection_parity).every(Boolean))
  && (!report.browser.source_lineage_matches || Object.values(report.browser.source_lineage_matches).every(Boolean));
if (values.report) {
  const target = path.resolve(values.report);
  if (fs.existsSync(target)) throw new Error(`Report already exists; choose a fresh path: ${target}`);
  fs.writeFileSync(target, json(report), { flag: "wx" });
}
console.log(json({ technical_pass: report.technical_pass, normalized: report.normalized,
  browser: report.browser, adapter: report.adapter && { count: report.adapter.count, shared: report.adapter.shared,
    added_counts: report.adapter.added_counts, shared_changed: report.adapter.shared_changed },
  owner_publication_authority_recorded: ownerBindingMatches }));
process.exitCode = report.technical_pass ? 0 : 1;
