// scripts/build-wrapper.mjs
import fs from "fs";
import path from "path";

const INPUT = "./data/database/templates.json";
const OUTPUT = "./glossary/js/templates.data.js";

const list = JSON.parse(fs.readFileSync(INPUT, "utf8"));

// revive string -> function
function reviveTemplate(fnText) {
  if (!fnText) return null;
  return (0, eval)(`(${fnText})`);
}

// simple search text builder
function buildSearchText(t) {
  const bits = [
    t.label, t.slug, t.definition, t.help,
    ...(t.tags || []),
    ...(t.categories || []),
    ...(Array.isArray(t.fields) ? t.fields.map(f => f?.label || f?.key || "") : [])
  ].filter(Boolean).join(" ").toLowerCase();
  return bits;
}

const TEMPLATES = list.map(t => {
  const { template_src, ...rest } = t;
  const obj = { ...rest };
  if (!obj.id)   obj.id   = (obj.slug || obj.label || "").toLowerCase().replace(/[^a-z0-9]+/g,"-");
  if (!obj.slug) obj.slug = obj.id;
  obj.template = reviveTemplate(template_src);
  obj.meta = { ...(obj.meta || {}), search_text: buildSearchText(obj) };
  return obj;
});

// write an IIFE that sets both names and CommonJS, matching your bundle
const iife = `(function(root){
  const arr = ${JSON.stringify(TEMPLATES, (k,v)=> typeof v === "function" ? String(v) : v, 2)}
    .map(t => ({...t, template: t.template ? (0, eval)(\`(\${t.template})\`) : null }));
  root.TEMPLATES = arr;
  root.FRAMEWORKS = arr;
  if (typeof module !== 'undefined') module.exports = arr;
})(typeof window !== 'undefined' ? window : globalThis);
`;

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, iife);
console.log(`Built wrapper -> ${OUTPUT}`);
