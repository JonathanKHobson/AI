/* ThemeHelper.version2.js  v2.0
   API parity with ThemeHelper.js:
   - buildThemeMap(allTemplates?, allTasks?)
   - getCounts()
   - getHomeOf(id)
   - getMembers(themeKey)
   - getThemes()
   Optional: assignBestTheme, getRules
*/
;(function(root){
  const g = (typeof window !== 'undefined') ? window : root;

  // ----- Themes (keys and display names) -----
  const THEMES = {
    explore:      { id:'explore',      name:'Explore & Scan' },
    define:       { id:'define',       name:'Define & Frame' },
    ideate:       { id:'ideate',       name:'Ideate & Diverge' },
    plan:         { id:'plan',         name:'Plan & Structure' },
    analyze:      { id:'analyze',      name:'Analyze & Make Sense' },
    decide:       { id:'decide',       name:'Decide & Prioritize' },
    communicate:  { id:'communicate',  name:'Communicate & Ship' },
    reflect:      { id:'reflect',      name:'Reflect & Grow' }
  };

  // ----- Rules (earlier wins ties, encodes arrival intent) -----
  const THEME_RULES = [
    { key:'explore', label:'Explore & Scan',
      includeAny:['pestle','scan','discover','unknowns','map','landscape','macro-environment','research/interviews'],
      includeCats:['strategy','creativity'],
      includeTags:['use:discover']
    },
    { key:'define', label:'Define & Frame',
      includeAny:['problem-framing','clarification','hypothesis','scope','checks'],
      includeCats:['reasoning','planning'],
      includeTags:['use:problem-framing','topic:clarification']
    },
    { key:'ideate', label:'Ideate & Diverge',
      includeAny:['brainstorm','ideate','workshop','affinity','cluster'],
      includeCats:['creativity'],
      includeTags:['use:workshop','use:brainstorming']
    },
    { key:'plan', label:'Plan & Structure',
      includeAny:['plan','sequence','verify','acceptance criteria','checks'],
      includeCats:['planning'],
      includeTags:['use:planning','use:process-improvement']
    },
    { key:'analyze', label:'Analyze & Make Sense',
      includeAny:['code','co-occurrence','contradiction','sentiment','themes','quotes','saturation'],
      includeCats:['ux','research','analysis'],
      includeTags:['topic:analysis','topic:codebook','use:synthesize','stage:analyze']
    },
    { key:'decide', label:'Decide & Prioritize',
      includeAny:['decision-ready','prioritize','ranked list','roadmap','okrs','severity','impact','frequency'],
      includeCats:['ux','research','analysis'],
      includeTags:['topic:insights','topic:prioritization','stage:summarize','use:prioritize']
    },
    { key:'communicate', label:'Communicate & Ship',
      includeAny:['email','dm','memo','caption','subject','preheader','platform-native'],
      includeCats:['communication','writing'],
      includeTags:['topic:writing','use:present','use:edit']
    },
    { key:'reflect', label:'Reflect & Grow',
      includeAny:['felt-sense','doctrine of the mean','moderation','check-in','journaling','ethics'],
      includeCats:['wellbeing','personal-development','ethics','mindfulness','cultural-frameworks'],
      includeTags:['use:check-in','use:journaling','use:communication']
    }
  ];

  // ----- State -----
  let THEME_MEMBERS = null; // { themeKey: [ids...] }
  let HOME_OF = null;       // { id: themeKey }

  // ----- Utilities -----
  const kebab = s => String(s||'').trim().toLowerCase().replace(/\s+/g,'-');
  const slugify = s => String(s||'')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/^-+|-+$/g,'');

  // Tag alias fixes to reduce drift
  const TAG_ALIASES = new Map([
    ['topic:matrix','format:matrix'],
    ['use:pattern','use:iteration'],
    ['phase:compare/decide','phase:compare'],
    ['phase:evaluate/review','phase:evaluate']
  ]);

  function normTag(t){
    if (!t) return null;
    let v = kebab(t);
    if (TAG_ALIASES.has(v)) v = TAG_ALIASES.get(v);
    return v;
  }

  function toTokens(t){
    // Build a token set from many fields so schema drift does not break scoring
    const tokens = new Set();
    const push = v => {
      if (!v) return;
      const s = String(v).toLowerCase();
      tokens.add(s);
      // split to capture individual words and tails like "type:helper"
      if (s.includes(':')) tokens.add(s.split(':').pop());
      s.split(/[^a-z0-9]+/).forEach(w => { if (w) tokens.add(w); });
    };

    const all = []
      .concat([t.label, t.slug, t.definition, t.help, t.kind])
      .concat(t.categories || [])
      .concat(t.tags || [])
      .concat(t.use_cases || []);
    all.forEach(push);

    // Normalize tag aliases
    (t.tags || []).map(normTag).forEach(push);
    return tokens;
  }

  function haystack(t){
    // For includeAny substring checks
    return [
      t.label, t.slug, t.definition, t.help,
      ...(t.categories || []),
      ...(t.tags || []),
      ...(t.use_cases || [])
    ].filter(Boolean).join(' ').toLowerCase();
  }

  function keyOf(t){
    return kebab(t.id && t.id !== 'none' ? t.id : (t.slug || t.label || 'template'));
  }

  function addUnique(arr, id){
    id = String(id||'').trim();
    if (!id) return false;
    if (arr.indexOf(id) >= 0) return false;
    arr.push(id);
    return true;
  }

  function scoreForTheme(t, rule){
    const h = haystack(t);
    let s = 0;

    // includeAny: substring presence
    for (const tok of (rule.includeAny || [])){
      if (tok && h.includes(String(tok).toLowerCase())) s += 2;
    }
    // includeCats: exact match inside categories
    const cats = (t.categories || []).map(kebab);
    for (const c of (rule.includeCats || [])){
      if (cats.includes(kebab(c))) s += 3;
    }
    // includeTags: exact normalized tag match
    const tags = (t.tags || []).map(normTag);
    for (const tg of (rule.includeTags || [])){
      if (tags.includes(tg)) s += 4;
    }
    return s;
  }

  function assignBestTheme(t){
    const scored = THEME_RULES
      .map(r => ({ key:r.key, score: scoreForTheme(t, r) }))
      .filter(x => x.score > 0);

    if (!scored.length) return null;

    // Pick highest score, tie break to earlier rule order
    scored.sort((a,b) => {
      if (b.score !== a.score) return b.score - a.score;
      return THEME_RULES.findIndex(r => r.key === a.key) - THEME_RULES.findIndex(r => r.key === b.key);
    });
    return scored[0].key;
  }

  function enforceSingleHome(){
    const seen = new Set();
    const order = Object.keys(THEMES); // priority is declaration order
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

  // ----- Public API -----
  function buildThemeMap(allA, allB){
    const A = Array.isArray(allA) ? allA : (g.TEMPLATES || g.FRAMEWORKS || []);
    const B = Array.isArray(allB) ? allB : (g.TASK_TEMPLATES || g.TASKS || []);
    const SRC = []
      .concat(A)
      .concat(B)
      .filter(Boolean)
      .filter(x => x && x.id !== 'none');

    THEME_MEMBERS = {};
    HOME_OF = {};
    for (const k of Object.keys(THEMES)) THEME_MEMBERS[k] = [];

    for (const t of SRC){
      const id = keyOf(t);
      const themeKey = assignBestTheme(t);
      if (!themeKey) continue;
      addUnique(THEME_MEMBERS[themeKey], id);
    }
    enforceSingleHome();
    return THEME_MEMBERS;
  }

  function getCounts(){
    const out = [];
    for (const k of Object.keys(THEMES)){
      const n = (THEME_MEMBERS && THEME_MEMBERS[k]) ? THEME_MEMBERS[k].length : 0;
      out.push({ theme: THEMES[k].name, key: k, count: n });
    }
    out.sort((a,b) => b.count - a.count || a.theme.localeCompare(b.theme));
    return out;
  }

  function getHomeOf(id){ return HOME_OF ? HOME_OF[String(id||'').trim()] : undefined; }
  function getMembers(themeKey){ return THEME_MEMBERS ? (THEME_MEMBERS[themeKey] || []) : []; }
  function getThemes(){ return THEMES; }
  function getRules(){ return THEME_RULES; }

  const API = {
    version: '2.0',
    buildThemeMap,
    getCounts,
    getHomeOf,
    getMembers,
    getThemes,
    getRules,
    // exposed for advanced use
    assignBestTheme
  };

  g.THEME_HELPER = API;
  if (typeof module !== 'undefined') module.exports = API;

})(typeof window !== 'undefined' ? window : globalThis);
