import fs from "fs";
import Ajv2020 from "ajv/dist/2020.js";   // <-- use the 2020 class

const INPUT  = process.env.INPUT  || "./data/database/templates.json";
const SCHEMA = process.env.SCHEMA || "./data/scripts/schema.template.json";

const ajv = new Ajv2020({ allErrors: true, strict: true });  // <-- Ajv2020

const schema = JSON.parse(fs.readFileSync(SCHEMA, "utf8"));
const data   = JSON.parse(fs.readFileSync(INPUT, "utf8"));

const validate = ajv.compile(schema);

let ok = true;
for (const [i, t] of data.entries()) {
  if (!validate(t)) {
    ok = false;
    console.error(`Template[${i}] ${t.label || t.slug || t.id || ""}`);
    for (const err of validate.errors) console.error(" -", err.instancePath, err.message);
  }
}
if (!ok) process.exit(1);
console.log(`Validated ${data.length} templates from ${INPUT}.`);