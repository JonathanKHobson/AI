import { PATHS, buildLibraryRecords, writeJson } from "./library-build-common.mjs";

const { records, duplicateSlugMap, buildContext } = buildLibraryRecords();

writeJson(PATHS.recordsOutput, records);

console.log(
  `Built ${records.length} normalized records to ${PATHS.recordsOutput} from ${buildContext.template_count} raw framework records, ${buildContext.glossary_count} raw glossary records, and ${buildContext.bias_count} raw bias records (${Object.keys(duplicateSlugMap).length} cross-collection duplicate slugs).`,
);
