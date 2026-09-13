import { resolveWorkshopReturnUrl } from "./return-policy.js";

const app = document.querySelector("#app") || document.querySelector("main#main");
const config = window.CLAIRE_CONFIG || {};

const state = {
  catalog: null,
  returnUrl: "",
  glossary: { query: "", category: "all", status: "all", visible: 50 },
  frameworks: { query: "", category: "all", kind: "all", visible: 50 },
  principles: { query: "", category: "all", kind: "all", visible: 50 },
};

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const plainText = (value = "") => String(value)
  .replace(/\*\*([^*]+)\*\*/g, "$1")
  .replace(/\*([^*]+)\*/g, "$1")
  .replace(/`([^`]+)`/g, "$1")
  .replace(/【[^】]+】/g, "")
  .trim();

const normalize = (value = "") => plainText(value)
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase();

const truncate = (value, max = 230) => {
  const text = plainText(value);
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
};

function safeExternalUrl(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function configuredReturnUrl() {
  const requested = new URLSearchParams(location.search).get("return");
  const stored = sessionStorage.getItem("claire:return");
  const result = resolveWorkshopReturnUrl({
    requested,
    stored,
    fallback: config.studioUrl,
    allowedOrigins: config.studioAllowedOrigins,
    currentOrigin: location.origin,
  });
  if (result.source === "requested") sessionStorage.setItem("claire:return", result.url);
  return result;
}

function parseRoute() {
  const raw = location.hash.replace(/^#\/?/, "");
  const parts = raw.split("/").filter(Boolean);
  let section = parts[0] || "home";
  if (!["home", "glossary", "frameworks", "principles", "prompts"].includes(section)) section = "home";
  let slug = "";
  try { slug = decodeURIComponent(parts.slice(1).join("/")); } catch {}
  return { section, slug };
}

function applyConfig() {
  const returnResult = configuredReturnUrl();
  state.returnUrl = returnResult.url;
  document.querySelectorAll("[data-studio-link], [data-return-link]").forEach((link) => { link.href = state.returnUrl; });
  document.querySelectorAll("[data-portfolio-link]").forEach((link) => {
    link.href = safeExternalUrl(config.portfolioUrl) || "https://jonathankhobson.github.io/portfolio/ai/";
  });
  document.querySelectorAll("[data-year]").forEach((node) => { node.textContent = new Date().getFullYear(); });
  const returnBar = document.querySelector("[data-return-bar]");
  if (returnBar) returnBar.classList.toggle("visible", returnResult.source === "requested");
}

function updateNavigation(section) {
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === section) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  const nav = document.querySelector("[data-site-nav]");
  const toggle = document.querySelector("[data-menu-button]");
  if (nav) nav.dataset.open = "false";
  if (toggle) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  }
}

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "Unknown" : new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
}

function getGlossary(slug) {
  return state.catalog.glossary.find((record) => record.routeSlug === slug || (!record.routeSlug && record.slug === slug));
}
function getFramework(slug) {
  return state.catalog.frameworks.find((record) => record.slug === slug || record.id === slug);
}
function getPrinciple(slug) {
  return state.catalog.biases.find((record) => record.routeSlug === slug || (!record.routeSlug && (record.slug === slug || record.id === slug)));
}

function tag(value, className = "") {
  return `<span class="tag ${escapeHtml(className)}">${escapeHtml(String(value).replaceAll("_", " "))}</span>`;
}

function renderHome() {
  const { glossary, frameworks, biases, source } = state.catalog;
  document.title = "CLAIRE Prompting and AI Glossary | Kyle Hobson";
  app.innerHTML = `
    <section class="hero" data-anchor="A2">
      <div class="shell hero-grid">
        <div>
          <p class="eyebrow">A practical AI field guide</p>
          <h1>Make the ask clear. <span>Keep the thinking visible.</span></h1>
          <p class="hero-copy">Explore Kyle Hobson's full AI glossary, compare prompting frameworks, and turn a useful pattern into a working prompt worksheet.</p>
          <div class="button-row"><a class="button primary" href="#/glossary">Search the glossary</a><a class="button" href="#/frameworks">Find a framework</a></div>
        </div>
        <aside class="hero-index" aria-label="Resource index" data-anchor="A3">
          <div class="index-line"><span class="mono-label">Glossary</span><strong>${glossary.length.toLocaleString()} terms</strong><span>Definitions, aliases, status, and related ideas</span></div>
          <div class="index-line"><span class="mono-label">Prompting</span><strong>${frameworks.length.toLocaleString()} resources</strong><span>Frameworks, methods, heuristics, and tasks</span></div>
          <div class="index-line"><span class="mono-label">Checks</span><strong>${biases.length.toLocaleString()} records</strong><span>Bias, ethics, and critical thinking references</span></div>
        </aside>
      </div>
    </section>
    <section class="section soft" data-anchor="A4">
      <div class="shell">
        <div class="section-head"><div><p class="eyebrow">Choose your route</p><h2>Start with the question you have.</h2></div><p>The library stays broad. Each route keeps the next step small enough to use during a workshop or return to later.</p></div>
        <div class="path-list">
          <a class="path" href="#/glossary"><span class="path-number">01</span><span class="path-title">What does this term mean?</span><span class="path-copy">Search definitions, aliases, categories, related concepts, and recorded sources.</span><span class="path-action">Open glossary</span></a>
          <a class="path" href="#/frameworks"><span class="path-number">02</span><span class="path-title">How should I structure the task?</span><span class="path-copy">Browse frameworks, methods, heuristics, strategies, and practical prompt patterns.</span><span class="path-action">Find a fit</span></a>
          <a class="path" href="#/principles"><span class="path-number">03</span><span class="path-title">What should I check?</span><span class="path-copy">Review bias, ethics, accessibility, and critical thinking references from the source library.</span><span class="path-action">Review checks</span></a>
        </div>
      </div>
    </section>
    <section class="section" data-anchor="A5">
      <div class="shell">
        <div class="section-head"><div><p class="eyebrow">Why CLAIRE</p><h2>Guidance over guesswork.</h2></div><p>CLAIRE carries forward the original front door's emphasis on clear questions, transparent structure, bias and accessibility checks, and portable prompts.</p></div>
        <div class="source-grid">
          <div><p class="mono-label">01 Simple</p><h3>Start in everyday language.</h3><p>Add only the context and constraints the task needs.</p></div>
          <div><p class="mono-label">02 Trustworthy</p><h3>Keep evidence visible.</h3><p>Status, sources, uncertainty, and human review remain part of the record.</p></div>
          <div><p class="mono-label">03 Portable</p><h3>Use the tools you permit.</h3><p>The resource site does not require an AI provider or send worksheet inputs to one.</p></div>
        </div>
        <p class="source-note">Catalog built from the canonical local source snapshot. Framework data updated ${escapeHtml(formatDate(source.frameworksModified))}.</p>
      </div>
    </section>`;
}

function catalogConfig(type) {
  if (type === "glossary") return {
    title: "AI glossary", eyebrow: "Full reference index",
    lede: "Search the complete source snapshot. Source status labels are inherited from the canonical catalog, not freshly fact-checked by this site.",
    records: state.catalog.glossary, facetLabel: "Source status", facetKey: "status", facets: ["verified", "draft", "duplicate_candidate"],
    searchPlaceholder: "Search terms, definitions, or aliases",
  };
  if (type === "principles") return {
    title: "Principles and checks", eyebrow: "Bias, ethics, and critical thinking",
    lede: "Browse the source library's bias and ethics records. Use them as review prompts, not as automatic judgments about people.",
    records: state.catalog.biases, facetLabel: "Type", facetKey: "kind",
    facets: [...new Set(state.catalog.biases.map((record) => record.kind))].filter(Boolean).sort(),
    searchPlaceholder: "Search biases, harms, or mitigations",
  };
  return {
    title: "Framework library", eyebrow: "Methods and prompt patterns",
    lede: "Find a structure for the work, then open its detail page to review use cases, fields, helpful checks, and a prompt worksheet.",
    records: state.catalog.frameworks, facetLabel: "Type", facetKey: "kind",
    facets: [...new Set(state.catalog.frameworks.map((record) => record.kind))].filter(Boolean).sort(),
    searchPlaceholder: "Search frameworks, uses, or fields",
  };
}

function categoriesFor(record, type) {
  return type === "principles" ? [record.category].filter(Boolean) : (record.categories || []);
}

function recordTitle(record, type) {
  if (type === "glossary") return record.term;
  if (type === "principles") return record.name || record.slug;
  return record.label;
}

function recordDefinition(record, type) {
  if (type === "principles") return record.summary || record.definition || record.harms?.[0] || record.mitigations?.[0] || "Open this check for its source details.";
  return record.definition || record.help || record.useCases?.[0] || "Open this record for its source details.";
}

function catalogText(record, type) {
  if (type === "glossary") return normalize([record.term, record.definition, ...record.aliases, ...record.categories, ...record.tags].join(" "));
  if (type === "principles") return normalize([record.name, record.summary, record.definition, record.category, record.kind, ...record.mechanisms, ...record.indicators, ...record.contexts, ...record.harms, ...record.mitigations, ...record.tags].join(" "));
  return normalize([record.label, record.definition, record.help, ...record.categories, ...record.tags, ...record.useCases, ...record.fields.map((field) => field.label)].join(" "));
}

function allCategories(records, type) {
  return [...new Set(records.flatMap((record) => categoriesFor(record, type)))].filter(Boolean).sort((a, b) => a.localeCompare(b));
}

function renderCatalog(type) {
  const cfg = catalogConfig(type);
  const saved = state[type];
  const categories = allCategories(cfg.records, type);
  document.title = `${cfg.title} | CLAIRE Prompting`;
  app.innerHTML = `
    <section class="shell page-intro" data-anchor="B1"><p class="eyebrow">${escapeHtml(cfg.eyebrow)}</p><h1>${escapeHtml(cfg.title)}</h1><p>${escapeHtml(cfg.lede)}</p></section>
    <div class="shell library-layout">
      <aside class="filter-rail" aria-label="Resource sections" data-anchor="B2">
        <h2>Resource shelf</h2>
        <nav class="scope-list">
          ${scopeLink("glossary", "AI glossary", state.catalog.glossary.length, type)}
          ${scopeLink("frameworks", "Frameworks", state.catalog.frameworks.length, type)}
          ${scopeLink("principles", "Principles", state.catalog.biases.length, type)}
          ${scopeLink("prompts", "Prompting", "guide", type)}
        </nav>
        <nav class="rail-links" aria-label="Related destinations"><a data-studio-link href="${escapeHtml(state.returnUrl)}">Return to Workshop Studio</a><a data-portfolio-link href="${escapeHtml(config.portfolioUrl || "")}">Kyle's Applied AI work</a></nav>
      </aside>
      <section aria-labelledby="results-heading" data-anchor="B3">
        <h2 id="results-heading" class="sr-only">${escapeHtml(cfg.title)} results</h2>
        <div class="library-tools">
          <div class="search-wrap"><label class="sr-only" for="catalog-search">Search ${escapeHtml(cfg.title.toLowerCase())}</label><input id="catalog-search" type="search" value="${escapeHtml(saved.query)}" placeholder="${escapeHtml(cfg.searchPlaceholder)}" autocomplete="off"><button class="clear-search" type="button" aria-label="Clear search">×</button></div>
          <div class="filter-row">
            <label>Category<select id="category-filter"><option value="all">All categories</option>${categories.map((category) => `<option value="${escapeHtml(category)}"${saved.category === category ? " selected" : ""}>${escapeHtml(category)}</option>`).join("")}</select></label>
            <label>${escapeHtml(cfg.facetLabel)}<select id="facet-filter"><option value="all">All</option>${cfg.facets.map((facet) => `<option value="${escapeHtml(facet)}"${saved[cfg.facetKey] === facet ? " selected" : ""}>${escapeHtml(facet.replaceAll("_", " "))}</option>`).join("")}</select></label>
          </div>
        </div>
        <div class="results-bar"><p id="result-status" role="status" aria-live="polite"></p><button class="button small quiet" data-clear-filters type="button">Reset filters</button></div>
        <div id="record-list" class="result-list"></div>
        <div class="load-more-wrap"><button id="load-more" class="button" type="button" hidden>Show more results</button></div>
      </section>
    </div>`;
  bindCatalog(type, cfg);
  updateCatalog(type, cfg);
}

function scopeLink(section, label, count, current) {
  return `<a class="scope-link" href="#/${section}"${section === current ? ' aria-current="page"' : ""}><span>${label}</span><span class="scope-count">${typeof count === "number" ? count.toLocaleString() : count}</span></a>`;
}

function bindCatalog(type, cfg) {
  const search = document.querySelector("#catalog-search");
  const category = document.querySelector("#category-filter");
  const facet = document.querySelector("#facet-filter");
  const refresh = () => { state[type].visible = 50; updateCatalog(type, cfg); };
  search.addEventListener("input", () => { state[type].query = search.value; refresh(); });
  category.addEventListener("change", () => { state[type].category = category.value; refresh(); });
  facet.addEventListener("change", () => { state[type][cfg.facetKey] = facet.value; refresh(); });
  const clear = () => {
    state[type] = { query: "", category: "all", visible: 50, [cfg.facetKey]: "all" };
    search.value = ""; category.value = "all"; facet.value = "all"; updateCatalog(type, cfg); search.focus();
  };
  document.querySelector(".clear-search").addEventListener("click", () => { state[type].query = ""; search.value = ""; refresh(); search.focus(); });
  document.querySelector("[data-clear-filters]").addEventListener("click", clear);
  document.querySelector("#load-more").addEventListener("click", () => { state[type].visible += 50; updateCatalog(type, cfg); });
}

function updateCatalog(type, cfg) {
  const saved = state[type];
  const query = normalize(saved.query);
  const filtered = cfg.records.filter((record) => {
    if (query && !catalogText(record, type).includes(query)) return false;
    if (saved.category !== "all" && !categoriesFor(record, type).includes(saved.category)) return false;
    return saved[cfg.facetKey] === "all" || record[cfg.facetKey] === saved[cfg.facetKey];
  });
  const visible = filtered.slice(0, saved.visible);
  document.querySelector("#result-status").innerHTML = filtered.length
    ? `Showing <strong>${visible.length.toLocaleString()}</strong> of <strong>${filtered.length.toLocaleString()}</strong> matching records.`
    : "No records match these filters.";
  document.querySelector("#record-list").innerHTML = visible.length
    ? visible.map((record) => renderRecordRow(record, type)).join("")
    : `<div class="empty"><h2>No match yet</h2><p>Try a broader word, another category, or reset the filters.</p></div>`;
  const loadMore = document.querySelector("#load-more");
  loadMore.hidden = visible.length >= filtered.length;
  loadMore.textContent = `Show ${Math.min(50, filtered.length - visible.length).toLocaleString()} more`;
}

function renderRecordRow(record, type) {
  const routeSlug = type === "glossary" || type === "principles" ? (record.routeSlug || record.slug) : record.slug;
  const title = recordTitle(record, type);
  const kind = type === "glossary" ? `Source status: ${record.status}` : record.kind;
  return `<article class="result-card"><div class="result-kind">${escapeHtml(String(kind || type).replaceAll("_", " "))}</div><div class="result-main"><h2><a href="#/${type}/${encodeURIComponent(routeSlug)}">${escapeHtml(title)}</a></h2><p>${escapeHtml(truncate(recordDefinition(record, type)))}</p><div class="tag-row">${categoriesFor(record, type).slice(0, 3).map((category) => tag(category)).join("")}</div></div><span class="result-arrow" aria-hidden="true">→</span></article>`;
}

function renderDetail(type, slug) {
  const record = type === "glossary" ? getGlossary(slug) : type === "principles" ? getPrinciple(slug) : getFramework(slug);
  const cfg = catalogConfig(type);
  if (!record) {
    document.title = "Record not found | CLAIRE Prompting";
    app.innerHTML = `<section class="shell error-state"><h1>That resource is not in this snapshot.</h1><p><a href="#/${type}">Return to ${escapeHtml(cfg.title.toLowerCase())}</a></p></section>`;
    return;
  }
  const title = recordTitle(record, type);
  document.title = `${title} | CLAIRE Prompting`;
  app.innerHTML = `<article class="shell detail" data-anchor="C1">
    <a class="detail-back" href="#/${type}">← Back to ${escapeHtml(cfg.title.toLowerCase())}</a>
    <p class="mono-label">${escapeHtml((type === "glossary" ? `Source status: ${record.status}` : record.kind).replaceAll("_", " "))}</p>
    <h1>${escapeHtml(title)}</h1>
    <p class="detail-lede">${escapeHtml(plainText(recordDefinition(record, type)))}</p>
    <div class="detail-meta">${categoriesFor(record, type).slice(0, 5).map((category) => tag(category)).join("")}</div>
    <div class="button-row"><button id="copy-link" class="button primary" type="button">Copy deep link</button>${type === "frameworks" ? `<a class="button" href="#worksheet">Open prompt worksheet</a>` : ""}<a class="button" data-studio-link href="${escapeHtml(state.returnUrl)}">Return to Studio</a></div>
    <p id="copy-status" class="copy-status" role="status" aria-live="polite"></p>
    ${type === "glossary" ? renderGlossaryDetail(record) : type === "principles" ? renderPrincipleDetail(record) : renderFrameworkDetail(record)}
  </article>`;
  bindDetail(type, record);
  applyConfig();
}

function renderGlossaryDetail(record) {
  const sourceItems = record.sources.map((source) => {
    const url = safeExternalUrl(source.url);
    return url ? `<li><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)}</a></li>` : "";
  }).filter(Boolean).join("");
  return `${record.notes ? `<section class="detail-section"><h2>Notes and use</h2><p>${escapeHtml(plainText(record.notes))}</p></section>` : ""}<section class="detail-section"><h2>Recorded sources</h2>${sourceItems ? `<ul class="source-list">${sourceItems}</ul>` : `<p>No source links are recorded for this entry in the current snapshot.</p>`}</section><section class="detail-section"><h2>Aliases</h2>${record.aliases.length ? `<ul>${record.aliases.map((alias) => `<li>${escapeHtml(alias)}</li>`).join("")}</ul>` : `<p>No aliases are recorded.</p>`}</section><section class="detail-section"><h2>Related resources</h2>${relatedLinks(record.related) || `<p>No related records are linked.</p>`}</section><section class="detail-section"><h2>Source status</h2><p>${statusExplanation(record.status)}</p></section>`;
}

function renderFrameworkDetail(record) {
  const uses = record.useCases.length ? `<ul>${record.useCases.slice(0, 10).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : `<p>No use cases are recorded.</p>`;
  const checks = record.boosters.length ? `<ul>${record.boosters.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : `<p>No additional checks are recorded.</p>`;
  return `<section class="detail-section"><h2>Use this when</h2>${uses}</section>${record.help ? `<section class="detail-section"><h2>Guidance</h2><p>${escapeHtml(plainText(record.help))}</p></section>` : ""}<section class="detail-section"><h2>Helpful checks</h2>${checks}</section>${renderWorksheet(record)}<section class="detail-section"><h2>Related resources</h2>${relatedLinks(record.related) || `<p>No related records are linked.</p>`}</section>`;
}

function renderPrincipleDetail(record) {
  const groups = [
    ["How it works", record.mechanisms], ["What to notice", record.indicators], ["Contexts", record.contexts],
    ["Potential harms", record.harms], ["Mitigations", record.mitigations], ["Examples", record.examples],
  ];
  return groups.filter(([, values]) => values?.length).map(([heading, values]) => `<section class="detail-section"><h2>${heading}</h2><ul>${values.map((item) => `<li>${escapeHtml(plainText(item))}</li>`).join("")}</ul></section>`).join("") + `<section class="detail-section"><h2>Use with care</h2><p>This source record is a review aid. It is not a diagnosis of a person, group, or decision.</p></section>`;
}

function relatedLinks(slugs = []) {
  const items = slugs.map((slug) => {
    const glossary = getGlossary(slug);
    if (glossary) return `<li><a href="#/glossary/${encodeURIComponent(glossary.routeSlug || glossary.slug)}">${escapeHtml(glossary.term)}</a></li>`;
    const framework = getFramework(slug);
    if (framework) return `<li><a href="#/frameworks/${encodeURIComponent(framework.slug)}">${escapeHtml(framework.label)}</a></li>`;
    const principle = getPrinciple(slug);
    if (principle) return `<li><a href="#/principles/${encodeURIComponent(principle.routeSlug || principle.slug)}">${escapeHtml(principle.name)}</a></li>`;
    return "";
  }).filter(Boolean).join("");
  return items ? `<ul>${items}</ul>` : "";
}

function statusExplanation(status) {
  const text = {
    verified: "Inherited as verified from the canonical source snapshot. This site has not freshly fact-checked the record. Review its recorded sources and context before a high-stakes decision.",
    draft: "Inherited as draft from the canonical source snapshot. This site has not freshly reviewed the wording, so treat it as work in progress.",
    duplicate_candidate: "Inherited as a possible duplicate from the canonical source snapshot. This site has not freshly reviewed the match, so compare nearby terms before relying on this label.",
  }[status] || "The source snapshot does not provide a recognized editorial status for this entry.";
  return escapeHtml(text);
}

function renderWorksheet(record) {
  const fields = record.fields.length ? record.fields : [
    { key: "goal", label: "What do you want the AI to help produce?", type: "textarea", placeholder: "Describe the task and useful result.", options: [] },
    { key: "context", label: "What context or constraints matter?", type: "textarea", placeholder: "Add audience, boundaries, examples, or format needs.", options: [] },
  ];
  return `<details id="worksheet" class="worksheet detail-section" data-anchor="C3"><summary>Build a prompt worksheet with this framework</summary><div class="worksheet-body"><p>The worksheet stays in this browser and is not sent to an AI service.</p><form id="worksheet-form">${fields.slice(0, 12).map(renderWorksheetField).join("")}<div class="button-row"><button class="button primary" type="submit">Build worksheet</button><button class="button" type="reset">Clear</button></div></form><div class="worksheet-output" hidden><label for="prompt-output">Ready-to-copy worksheet</label><textarea id="prompt-output" readonly></textarea><button id="copy-prompt" class="button" type="button">Copy worksheet</button><p id="prompt-status" class="copy-status" role="status" aria-live="polite"></p></div></div></details>`;
}

function renderWorksheetField(field) {
  const id = `field-${field.key.replace(/[^a-z0-9_-]/gi, "-")}`;
  if (field.options?.length) return `<label class="worksheet-field" for="${escapeHtml(id)}"><span>${escapeHtml(field.label)}</span><select id="${escapeHtml(id)}" name="${escapeHtml(field.key)}"><option value="">Choose an option</option>${field.options.map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`).join("")}</select></label>`;
  if (field.type === "textarea") return `<label class="worksheet-field" for="${escapeHtml(id)}"><span>${escapeHtml(field.label)}</span><textarea id="${escapeHtml(id)}" name="${escapeHtml(field.key)}" placeholder="${escapeHtml(field.placeholder)}"></textarea></label>`;
  return `<label class="worksheet-field" for="${escapeHtml(id)}"><span>${escapeHtml(field.label)}</span><input id="${escapeHtml(id)}" name="${escapeHtml(field.key)}" type="text" placeholder="${escapeHtml(field.placeholder)}"></label>`;
}

function buildWorksheetText(record, form) {
  const lines = [`Use this source framework: ${plainText(record.label)}`, "", plainText(record.definition)];
  const values = [...new FormData(form).entries()].filter(([, value]) => String(value).trim());
  if (values.length) {
    lines.push("", "My inputs:");
    values.forEach(([key, value]) => {
      const field = record.fields.find((item) => item.key === key);
      lines.push(`${field?.label || key}: ${String(value).trim()}`);
    });
  }
  if (record.boosters.length) lines.push("", "Helpful checks:", ...record.boosters.map((item) => `- ${plainText(item)}`));
  lines.push("", "If an essential input is missing, identify the gap before proceeding. Make the output easy to inspect and revise.");
  return lines.filter((line, index, all) => line !== "" || all[index - 1] !== "").join("\n");
}

function bindDetail(type, record) {
  document.querySelector("#copy-link").addEventListener("click", async () => {
    const success = await copyText(location.href);
    document.querySelector("#copy-status").textContent = success ? "Deep link copied." : "Copy was unavailable. Select the address from your browser.";
  });
  if (type !== "frameworks") return;
  const form = document.querySelector("#worksheet-form");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const output = document.querySelector("#prompt-output");
    output.value = buildWorksheetText(record, form);
    document.querySelector(".worksheet-output").hidden = false;
    output.focus();
  });
  form.addEventListener("reset", () => { document.querySelector(".worksheet-output").hidden = true; });
  document.querySelector("#copy-prompt").addEventListener("click", async () => {
    const success = await copyText(document.querySelector("#prompt-output").value);
    document.querySelector("#prompt-status").textContent = success ? "Worksheet copied." : "Copy was unavailable. Select the text and copy it manually.";
  });
}

async function copyText(value) {
  try { await navigator.clipboard.writeText(value); return true; } catch { return false; }
}

function renderPrompts() {
  const variants = ["clear-framework", "clear-path-forward-framework", "clear-prompting-method"].map(getFramework).filter(Boolean);
  const classicPickerUrl = safeExternalUrl(config.classicPickerUrl) || "https://jonathankhobson.github.io/AI/glossary/startup-wizard.html";
  const classicBuilderUrl = safeExternalUrl(config.classicBuilderUrl) || "https://jonathankhobson.github.io/AI/glossary/prompt-builder.html";
  document.title = "Prompt resources | CLAIRE Prompting";
  app.innerHTML = `<section class="shell page-intro" data-anchor="D1"><p class="eyebrow">Prompt resources</p><h1>Choose a structure, then make it yours.</h1><p>The source library contains several similarly named CLEAR methods. They solve different problems and remain separate from the CLAIRE resource identity.</p></section><section class="shell prompt-grid" data-anchor="D2">${variants.map((record, index) => `<article class="prompt-card${index === 1 ? " featured" : ""}"><p class="mono-label">Source framework ${String(index + 1).padStart(2, "0")}</p><h2>${escapeHtml(record.label)}</h2><p>${escapeHtml(record.definition)}</p><div class="button-row"><a class="button${index === 1 ? " primary" : ""}" href="#/frameworks/${encodeURIComponent(record.slug)}">Open worksheet</a></div></article>`).join("")}<article class="prompt-card"><p class="mono-label">Browse by task</p><h2>Search all ${state.catalog.frameworks.length.toLocaleString()} prompt resources.</h2><p>Try a task such as lesson planning, research synthesis, feedback, or decision support.</p><div class="button-row"><a class="button" href="#/frameworks">Search library</a></div></article></section><section class="section dark" data-anchor="D3"><div class="shell"><div class="section-head"><div><p class="eyebrow">Preserved tools</p><h2>Need more guided support?</h2></div><p>The classic guided picker and advanced builder remain available from the canonical public resource site. Their interfaces remain separate from this compact Workshop Studio package.</p></div><div class="button-row"><a class="button primary" href="${escapeHtml(classicPickerUrl)}" target="_blank" rel="noopener noreferrer">Classic guided picker</a><a class="button" href="${escapeHtml(classicBuilderUrl)}" target="_blank" rel="noopener noreferrer">Classic advanced builder</a></div></div></section>`;
}

function render() {
  if (!state.catalog) return;
  const route = parseRoute();
  updateNavigation(route.section);
  if (route.section === "home") renderHome();
  else if (route.section === "prompts") renderPrompts();
  else if (route.slug) renderDetail(route.section, route.slug);
  else renderCatalog(route.section);
  applyConfig();
  window.scrollTo({ top: 0, behavior: "instant" });
}

function setupShell() {
  applyConfig();
  const toggle = document.querySelector("[data-menu-button]");
  const nav = document.querySelector("[data-site-nav]");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      nav.dataset.open = String(open);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.dataset.open === "true") {
        nav.dataset.open = "false"; toggle.setAttribute("aria-expanded", "false"); toggle.focus();
      }
    });
  }
  window.addEventListener("hashchange", render);
}

async function start() {
  setupShell();
  try {
    const response = await fetch("./assets/catalog.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Catalog request returned ${response.status}`);
    state.catalog = await response.json();
    render();
  } catch (error) {
    console.error(error);
    app.innerHTML = `<section class="shell error-state"><h1>The resource shelf could not open.</h1><p>Run <code>npm run build:data</code>, serve the project over HTTP, and try again.</p></section>`;
  }
}

start();
