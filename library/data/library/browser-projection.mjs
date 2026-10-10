// Reproduce the deployed catalog's data contract from this library's inputs.
// This module only reads sources. It does not publish or replace any snapshot.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { ROOT, loadGlossarySource, loadBiasesSource, loadTemplateSource } from "./library-build-common.mjs";

const list = value => Array.isArray(value) ? value : [];
const text = value => value == null ? "" : String(value);
const slug = value => text(value.slug || value.id);

function routeRows(rows) {
  const seen = new Map();
  return rows.map(row => {
    const key = row.slug;
    const count = (seen.get(key) || 0) + 1;
    seen.set(key, count);
    return { ...row, routeSlug: count === 1 ? key : `${key}~${count}` };
  });
}

function loadFrameworkSources() {
  const sandbox = { console, module: { exports: null } };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  for (const name of ["templates.tasks.data.js"]) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, "glossary", "js", name), "utf8"), sandbox,
      { filename: name, timeout: 10000 });
  }
  if (!Array.isArray(sandbox.TASKS)) {
    throw new Error("Task wrapper did not populate TASKS");
  }
  return [...loadTemplateSource(), ...sandbox.TASKS];
}

export function buildBrowserData() {
  const glossary = routeRows(loadGlossarySource().map(row => ({
    slug: slug(row), term: text(row.term), aliases: list(row.aliases),
    definition: text(row.definition), sources: list(row.sources), categories: list(row.categories),
    tags: list(row.tags), related: list(row.related), status: text(row.status), notes: text(row.notes),
  })));
  const biases = routeRows(loadBiasesSource().map(row => ({
    id: text(row.id), slug: slug(row), name: text(row.name), kind: text(row.kind || "bias"),
    category: text(row.category), summary: text(row.summary), definition: text(row.definition),
    mechanisms: list(row.mechanisms), indicators: list(row.indicators), contexts: list(row.contexts),
    harms: list(row.harms), mitigations: list(row.mitigations), examples: list(row.examples),
    related: list(row.related), tags: list(row.tags),
  })));
  const seen = new Set();
  const frameworks = loadFrameworkSources().filter(row => {
    const key = slug(row);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).map(row => ({
    id: text(row.id), slug: slug(row), label: text(row.label), kind: text(row.kind),
    definition: text(row.definition), help: text(row.help), categories: list(row.categories),
    tags: list(row.tags), useCases: list(row.use_cases || row.useCases), boosters: list(row.boosters),
    fields: list(row.fields).map(field => ({
      key: text(field.key), label: text(field.label), type: text(field.type || "text"),
      placeholder: text(field.placeholder), options: list(field.options).map(option => typeof option === "object"
        ? { label: text(option.label ?? option.value), value: text(option.value ?? option.label) }
        : { label: text(option), value: text(option) }),
    })), related: list(row.related),
  }));
  return { glossary, frameworks, biases };
}
