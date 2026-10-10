import { PATHS, buildLibraryRecords, readJson, summarizeRecords, writeJson } from "./library-build-common.mjs";

let records;
let duplicateSlugMap;

try {
  records = readJson(PATHS.recordsOutput);
  duplicateSlugMap = Object.fromEntries(
    records
      .reduce((map, record) => {
        const bucket = map.get(record.source_slug) || [];
        bucket.push(record.entry_id);
        map.set(record.source_slug, bucket);
        return map;
      }, new Map())
      .entries(),
  );
} catch (error) {
  const built = buildLibraryRecords();
  records = built.records;
  duplicateSlugMap = built.duplicateSlugMap;
}

const metadata = summarizeRecords(records, Object.fromEntries(
  Object.entries(duplicateSlugMap)
    .filter(([, entryIds]) => entryIds.length > 1)
    .sort((a, b) => a[0].localeCompare(b[0])),
));

writeJson(PATHS.metadataOutput, metadata);

console.log(`Built library metadata to ${PATHS.metadataOutput}.`);
