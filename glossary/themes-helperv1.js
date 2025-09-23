// theme-helper.js  v1.1
// Purpose: assign each template/task to exactly one "home" theme,
// prevent duplicates, and expose a simple API for counts and lookups.
;(function(root){
  const g = (typeof window !== 'undefined') ? window : root;

  // --- Themes (entry doors)
  const THEMES = {
    META_PROMPT:       { id:'META_PROMPT',       name:'Meta & Prompt-craft' },
    RESEARCH_ANALYZE:  { id:'RESEARCH_ANALYZE',  name:'Research & Analysis' },
    IDEATE_CREATE:     { id:'IDEATE_CREATE',     name:'Ideate & Create' },
    PLAN_EXECUTE:      { id:'PLAN_EXECUTE',      name:'Plan & Execute' },
    WRITE_PERSUADE:    { id:'WRITE_PERSUADE',    name:'Write & Persuade' },
    EVALUATE_IMPROVE:  { id:'EVALUATE_IMPROVE',  name:'Evaluate & Improve' },
    PEOPLE_SELF:       { id:'PEOPLE_SELF',       name:'People & Self-Management' },
    ETHICS_RISK:       { id:'ETHICS_RISK',       name:'Ethics, Bias & Safety' }
  };

  // --- Balanced rule set (tightens borders around Evaluate/Plan/Meta/Write)
  // Order matters for tie breaks. Earlier wins.
  const RULES = [
    ['META_PROMPT', new Set(['template-picker','meta','prompting','prompt-development-techniques','acceptance-criteria','scoping','question','clarify'])],
    ['EVALUATE_IMPROVE', new Set(['evaluate','evaluation','review','testing','checklist','qa','retro','retrospective','postmortem','audit','scorecard','experiment-review','quality'])],
    ['PLAN_EXECUTE', new Set(['plan','planning','prioritize','priority','decision','decision-making','roadmap','strategy','okr','project','operations','task-brief','execution'])],
    ['WRITE_PERSUADE', new Set(['write','writing','story','storytelling','narrative','memo','deck','slides','copy','ad-copy','proposal','email','pitch','social'])],
    ['RESEARCH_ANALYZE', new Set(['research','analysis','analyze','analysis-frameworks','synthesis','insight','codebook','journey','sentiment','causal'])],
    ['IDEATE_CREATE', new Set(['ideate','ideation','creative','creativity','brainstorm','divergent','reframe','invent'])],
    ['PEOPLE_SELF', new Set(['psychology','wellbeing','well-being','self-reflection','reflection','coaching','habit','habits','motivation','future-self','cbt','mental-model'])],
    ['ETHICS_RISK', new Set(['ethics','fairness','bias','safety','risk','harms','risk-mitigation'])]
  ];

  // --- Internal state
  let THEME_MEMBERS = null;     // { themeKey: [ids...] }
  let HOME_OF = null;           // { id: themeKey }

  // --- Helpers -------------------------------------------------------------
  function toTokens(t){
    const out = new Set();
    const push = v => {
      if (!v) return;
      const s = String(v).toLowerCase();
      out.add(s);
      if (s.includes(':')) out.add(s.split(':').pop()); // keep tail of "type:helper"
      s.split(/[^a-z0-9]+/).forEach(w => { if (w) out.add(w); });
    };

    // Pull from common fields, tolerate small schema differences
    const fields = []
      .concat(t.categories || [])
      .concat(t.tags || [])
      .concat(t.use_cases || [])
      .concat([t.kind, t.label, t.slug]);

    fields.forEach(push);
    return out;
  }

  function scoreTheme(tokens, keySet){
    let s = 0;
    for (const tok of tokens) if (keySet.has(tok)) s++;
    return s;
  }

  function assignBestTheme(t){
    const tokens = toTokens(t);

    // Heuristics that sharpen borders
    if (tokens.has('template-picker') || tokens.has('helper') || tokens.has('prompt'))
      return 'META_PROMPT';
    if (['postmortem','retro','retrospective','audit','qa','scorecard','checklist'].some(x => tokens.has(x)))
      return 'EVALUATE_IMPROVE';
    if (['decision','decision-making','roadmap','okr','prioritize'].some(x => tokens.has(x)))
      return 'PLAN_EXECUTE';
    if (['memo','deck','slides','copy','proposal','pitch'].some(x => tokens.has(x)))
      return 'WRITE_PERSUADE';

    // Rule scoring
    let best = RULES[0][0], bestScore = -1;
    for (const [k, kw] of RULES){
      const s = scoreTheme(tokens, kw);
      if (s > bestScore){ best = k; bestScore = s; }
    }
    return best;
  }

  function addUnique(arr, id){
    id = String(id||'').trim();
    if (!id) return false;
    if (arr.indexOf(id) >= 0) return false;
    arr.push(id);
    return true;
  }

  function enforceSingleHome(){
    const seen = new Set();
    const order = Object.keys(THEMES); // priority order
    for (const k of order){
      const list = THEME_MEMBERS[k];
      THEME_MEMBERS[k] = list.filter(id => {
        if (seen.has(id)) return false;
        seen.add(id);
        HOME_OF[id] = k;
        return true;
      });
    }
  }

  // --- Public API ----------------------------------------------------------
  function buildThemeMap(allA, allB){
    const A = Array.isArray(allA) ? allA : (g.TEMPLATES || g.FRAMEWORKS || []);
    const B = Array.isArray(allB) ? allB : (g.TASK_TEMPLATES || []);
    const all = []
      .concat(A)
      .concat(B)
      .filter(x => x && x.id && x.id !== 'none');

    THEME_MEMBERS = {};
    for (const k of Object.keys(THEMES)) THEME_MEMBERS[k] = [];
    HOME_OF = {};

    for (const t of all){
      const k = assignBestTheme(t);
      addUnique(THEME_MEMBERS[k], t.id);
    }
    enforceSingleHome();
    return THEME_MEMBERS;
  }

  function getCounts(){
    const out = [];
    for (const k of Object.keys(THEMES)){
      const name = THEMES[k].name;
      const n = (THEME_MEMBERS && THEME_MEMBERS[k]) ? THEME_MEMBERS[k].length : 0;
      out.push({ theme: name, key: k, count: n });
    }
    // stable sort by count desc, then name
    out.sort((a,b) => b.count - a.count || a.theme.localeCompare(b.theme));
    return out;
  }

  function getHomeOf(id){ return HOME_OF ? HOME_OF[id] : undefined; }
  function getMembers(themeKey){ return THEME_MEMBERS ? (THEME_MEMBERS[themeKey] || []) : []; }
  function getThemes(){ return THEMES; }

  const API = {
    version: '1.1',
    buildThemeMap,
    getCounts,
    getHomeOf,
    getMembers,
    getThemes
  };

  g.THEME_HELPER = API;
  if (typeof module !== 'undefined') module.exports = API;
})(this);
