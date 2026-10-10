import fs from "fs";
import path from "path";
import Ajv2020 from "ajv/dist/2020.js";
import { spawnSync } from "child_process";
import { parseArgs } from "node:util";
import { isDeepStrictEqual } from "node:util";

import { PATHS, readJson, summarizeRecords } from "./library-build-common.mjs";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const { values } = parseArgs({ options: {
    help: { type: "boolean", short: "h" },
    python: { type: "string" },
    "db-path": { type: "string" },
    "project-config": { type: "string" },
    "codex-config": { type: "string" },
    "claude-config": { type: "string" },
    "server-name": { type: "string" },
    timeout: { type: "string" },
  } });
  if (values.help) {
    console.log("Usage: node data/library/check-library.mjs [--python PATH] [--db-path PATH] [--project-config JSON] [--codex-config TOML] [--claude-config JSON] [--server-name NAME] [--timeout SECONDS]\nValidates record schema, unique IDs, metadata counts/quality flags, read-only SQLite and real MCP stdio. Client config checks run only for explicitly supplied paths. Defaults to AIGLOSSARY_MCP_PYTHON or .runtime/venv/bin/python.");
    return;
  }
  const dbPath = values["db-path"] ? path.resolve(values["db-path"]) : PATHS.dbOutput;
  const requiredPaths = [
    PATHS.templatesSource,
    PATHS.glossarySource,
    PATHS.biasesSource,
    PATHS.recordsOutput,
    PATHS.metadataOutput,
    PATHS.schemaOutput,
    dbPath,
  ];

  for (const filePath of requiredPaths) {
    assert(fs.existsSync(filePath), `Required file is missing: ${filePath}`);
  }

  const schema = readJson(PATHS.schemaOutput);
  const records = readJson(PATHS.recordsOutput);
  const metadata = readJson(PATHS.metadataOutput);

  assert(Array.isArray(records), "library.records.json must be an array.");
  assert(records.length > 0, "library.records.json is empty.");

  const ajv = new Ajv2020({ allErrors: true, strict: true });
  const validate = ajv.compile(schema);
  const entryIds = new Set();

  for (const [index, record] of records.entries()) {
    const valid = validate(record);
    if (!valid) {
      const details = (validate.errors || [])
        .map((error) => `${error.instancePath || "/"} ${error.message}`)
        .join("; ");
      throw new Error(`Record ${index} failed schema validation: ${details}`);
    }
    assert(!entryIds.has(record.entry_id), `Duplicate entry_id found: ${record.entry_id}`);
    entryIds.add(record.entry_id);
  }

  const summary = summarizeRecords(records);
  assert(isDeepStrictEqual(metadata.counts, summary.counts), "Metadata counts differ from records.");
  assert(isDeepStrictEqual(metadata.quality_flag_counts, summary.quality_flag_counts),
    "Metadata quality flag counts differ from records.");

  const unresolvedFlags = [];
  for (const record of records) {
    for (const flag of record.quality_flags || []) {
      if (flag.code === "unresolved_related_slug" && flag.related_slug) {
        unresolvedFlags.push(`${record.entry_id}:${flag.related_slug}`);
      }
    }
  }

  const unresolvedMetadata = (metadata.unresolved_link_report || []).flatMap((item) =>
    (item.unresolved_related_slugs || []).map((slug) => `${item.entry_id}:${slug}`),
  );

  assert(
    unresolvedFlags.length === unresolvedMetadata.length &&
      unresolvedFlags.every((value) => unresolvedMetadata.includes(value)),
    "Unresolved link report does not match record quality flags.",
  );

  const localPython = path.join(PATHS.root, ".runtime", "venv", "bin", "python");
  const python = values.python || process.env.AIGLOSSARY_MCP_PYTHON ||
    (fs.existsSync(localPython) ? localPython : "python3");
  const args = [path.join(PATHS.root, "scripts", "check_aiglossary_mcp.py"),
    "--root", PATHS.root, "--python", python, "--db-path", dbPath];
  for (const option of ["project-config", "codex-config", "claude-config", "server-name", "timeout"]) {
    if (values[option]) args.push(`--${option}`, values[option]);
  }
  const healthCheck = spawnSync(
    python,
    args,
    {
      cwd: PATHS.root,
      stdio: "inherit",
      env: { ...process.env, PYTHONDONTWRITEBYTECODE: "1" },
    },
  );

  if (healthCheck.error) throw healthCheck.error;
  if (healthCheck.status !== 0) {
    process.exit(healthCheck.status || 1);
  }

  console.log(`Validated ${records.length} records, metadata, DB presence, and MCP health.`);
}

try {
  main();
} catch (error) {
  console.error(`[ERROR] ${error.message}`);
  process.exit(1);
}
