/* AISettings.js — site-wide AI settings (OpenAI/Gemini/Apertus), lean modal, dynamic UI */
(function(){
// === AIState (in-flight store + telemetry) — embedded here and global ===
  if (!window.AIState) {
    window.AIState = (() => {
      let state = {
        inFlight: false,
        startedAt: 0,
        model: null,
        meta: null,
        last: 'idle',
        payload: null,
        error: null,
      };
      const subs = new Set();
      const emit = () => subs.forEach(fn => { try { fn(state); } catch {} });

      function telemetry(name, payload = {}) {
        try { window.dataLayer?.push({ event: name, ...payload }); } catch {}
      }

      const begin = (model, meta = {}) => {
        if (state.inFlight) return false; // lock: no double-submit
        state = { ...state, inFlight: true, startedAt: performance.now(), model, meta, last: 'loading', payload: null, error: null };
        emit();
        telemetry('ai_search_started', { model, ...meta });
        requestAnimationFrame(() => telemetry('ai_search_first_paint_loading', { model, ...meta }));
        return true;
      };

      const resolveSuccess = (payload) => {
        const latency = Math.round(performance.now() - state.startedAt);
        state = { ...state, inFlight: false, last: 'success', payload };
        emit();
        telemetry('ai_search_resolved_success', { model: state.model, latency_ms: latency });
      };

      const resolveError = (err) => {
        const latency = Math.round(performance.now() - state.startedAt);
        state = { ...state, inFlight: false, last: 'error', error: (err && err.message) || String(err) };
        emit();
        telemetry('ai_search_resolved_error', { model: state.model, latency_ms: latency, message: state.error });
      };

      const subscribe = (fn) => { subs.add(fn); fn(state); return () => subs.delete(fn); };
      return { begin, resolveSuccess, resolveError, subscribe };
    })();
  }

  // === Result modal helpers — use existing if present, else create minimal ===
  (function ensureResultModal(){
    function maybeCreateModal(){
      let modal = document.getElementById('geminiResultModal');
      if (modal) return modal;

      modal = document.createElement('div');
      modal.id = 'geminiResultModal';
      modal.hidden = true;
      modal.setAttribute('role','dialog');
      modal.setAttribute('aria-modal','true');
      modal.innerHTML = `
        <div class="modal__panel" role="document" tabindex="-1" style="max-width:720px;background:#111;color:#fff;border-radius:12px;padding:16px 18px;margin:20px auto">
          <h2 class="modal__title" style="margin:0 0 10px">AI-assisted results</h2>
          <div id="geminiResultBody" class="modal__body" style="max-height:60vh;overflow:auto">
            <div class="skeleton-line" style="height:10px;background:#2a2a2a;border-radius:6px;margin:8px 0"></div>
            <div class="skeleton-line" style="height:10px;background:#2a2a2a;border-radius:6px;margin:8px 0"></div>
          </div>
          <div class="modal__actions" style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px">
            <button id="geminiUseBtn" class="btn btn-primary">Use this</button>
            <button id="geminiCloseBtn" class="btn btn-secondary">Close</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      return modal;
    }

    const modal = maybeCreateModal();
    const panel = modal.querySelector('.modal__panel');
    const body  = modal.querySelector('#geminiResultBody');
    const closeBtn = modal.querySelector('#geminiCloseBtn');

    window.setGeminiModalContent = (result) => {
      body.innerHTML = result?.html
        ? result.html
        : `<pre style="white-space:pre-wrap">${(result?.text || '').trim()}</pre>`;
    };

    window.openGeminiModal = () => {
      modal.hidden = false;
      panel.focus();
    };

    closeBtn?.addEventListener('click', () => { modal.hidden = true; });
  })();

  const KEY = 'pb.ai.settings.v2';
  
  // ---- Public AI base (global) ----
// Other pages can override by defining window.PB_PUBLICAI_BASE *before* loading this file.
window.PB_PUBLICAI_BASE = window.PB_PUBLICAI_BASE || 'https://pb-publicai-proxy.composer01.workers.dev';
function publicAIBaseV1(){
  // Always normalize to .../v1
  return (String(window.PB_PUBLICAI_BASE || '').replace(/\/+$/,'') + '/v1');
}


  const defaults = {
    provider: 'openai',            // 'openai' | 'gemini' | 'apertus'
    model: 'gpt-4o-mini',          // default for OpenAI
    geminiModel: 'gemini-2.5-flash',
    // Apertus
    apertusModel: 'swiss-ai/apertus-8b-instruct',
    apertusRoute: 'publicai',      // 'publicai' | 'huggingface'
    noApi: true,                   // open provider website + copy to clipboard
    apiKey: '',                    // used for OpenAI or Gemini
    publicAIKey: '',               // used when Apertus route = publicai
    hfToken: '',                   // used when Apertus route = huggingface
    promptSeed: ''
  };

  // ---- storage ----
  function load(){
    try{
      const raw = localStorage.getItem(KEY);
      if (!raw) return { ...defaults };
      const parsed = JSON.parse(raw);
      return { ...defaults, ...parsed };
    }catch{
      return { ...defaults };
    }
  }
  function save(patch){
    const s = { ...load(), ...patch };
    localStorage.setItem(KEY, JSON.stringify(s));
    notify(s);
  }

  // ---- subscriptions ----
  const listeners = new Set();
  function onSaved(fn){ if (typeof fn==='function') listeners.add(fn); return ()=>listeners.delete(fn); }
  function notify(state){ listeners.forEach(fn=>{ try{ fn(state); }catch{} }); }

  // ---- dialog injection (lean, uses site modal classes) ----
  let refs = null;
  function ensureDialog(){
    if (refs && refs.dlg) return refs.dlg;
    const dlg = document.createElement('dialog');
    dlg.id = 'aiSettingsDialog';
    dlg.className = 'modal';
    dlg.innerHTML = `
  <form method="dialog" class="modal-body" id="aiSettingsForm" aria-labelledby="aiSettingsTitle">
    <header class="modal-header">
      <h3 id="aiSettingsTitle">AI Assist Settings</h3>
      <button type="button" class="icon close" aria-label="Close" id="aiClose">×</button>
    </header>

    <section class="modal-section">
      <p class="note" id="aiSafetyNote" style="margin-bottom:10px">
        Browser calls send your API key with each request to the selected provider. Use only on trusted devices.
        You can choose not to save the key; it remains in this browser only.
      </p>

      <div class="field" style="margin-bottom:12px">
        <label>Provider</label>
        <div role="radiogroup" aria-label="AI Provider" style="display:flex;gap:16px;flex-wrap:wrap">
          <label class="radio"><input type="radio" name="aiProv" id="aiProvOpenAI" value="openai"><span>OpenAI (ChatGPT)</span></label>
          <label class="radio"><input type="radio" name="aiProv" id="aiProvGemini" value="gemini"><span>Google Gemini</span></label>
          <label class="radio"><input type="radio" name="aiProv" id="aiProvApertus" value="apertus"><span>Apertus (Swiss AI)</span></label>
        </div>
      </div>

      <label class="tiny" style="display:block;margin:.25rem 0 0">
        <input type="checkbox" id="aiNoApi">
        No-API mode: open provider website with your prompt; copies to clipboard when clicked.
      </label>
      <p class="note" id="aiNoApiNote" style="margin:-4px 0 12px">
        When checked, “Generate/Ask” opens ChatGPT, Gemini, or an Apertus web chat and copies your prompt to the clipboard. Keys are not required.
      </p>

      <div class="field" id="aiApertusRouteWrap" style="margin-bottom:12px; display:none">
        <label for="aiApertusRoute">Access via</label>
        <select id="aiApertusRoute" style="width:100%;min-width:260px;padding:8px 10px;border-radius:10px">
          <option value="publicai">Platform Public AI (api.publicai.co)</option>
          <option value="huggingface">Hugging Face (router.huggingface.co)</option>
        </select>
        <div class="tiny" id="aiApertusRouteHint" style="margin-top:6px">
          Choose how to call Apertus. Public AI is OpenAI-compatible; HF uses your Hugging Face token.
        </div>
      </div>

      <div class="field" style="margin-bottom:12px">
        <label id="aiKeyLabel" for="aiApiKey">OpenAI API key</label>
        <input id="aiApiKey" type="password" placeholder="sk-..." autocomplete="off"
               style="width:100%;min-width:520px;padding:10px 12px;border-radius:10px">
        <div class="tiny" id="aiApiHint" style="margin-top:6px">OpenAI Chat Completions API (messages[]).</div>
      </div>

      <div class="field" style="margin-bottom:12px">
        <label id="aiModelLabel" for="aiModel">ChatGPT models</label>
        <select id="aiModel" style="width:100%;min-width:260px;padding:8px 10px;border-radius:10px"></select>
        <div class="tiny" id="aiModelHint" style="margin-top:6px">OpenAI Chat Completions API (messages[]).</div>
      </div>

      <div class="field">
        <label for="aiPromptSeed">Universal prompt (optional)</label>
        <input id="aiPromptSeed" type="text" maxlength="400" placeholder="Short prefix to prepend"
               style="width:100%;min-width:520px;padding:10px 12px;border-radius:10px">
      </div>
    </section>

    <!-- split footer: left (Forget/Test), right (Save/Close) -->
    <footer class="modal-footer"
            style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
      <div class="btn-group" style="display:flex;gap:8px;align-items:center">
        <button type="button" class="btn danger" id="aiForget">Forget keys</button>
        <button type="button" class="btn" id="aiTest" style="opacity:.72">Test</button>
      </div>
      <div class="btn-group" style="display:flex;gap:8px;align-items:center">
        <button type="button" class="btn primary" id="aiSave">Save</button>
        <button type="button" class="btn" id="aiCancel">Close</button>
      </div>
    </footer>
  </form>
`;

    document.body.appendChild(dlg);

    // collect refs once
    refs = {
      dlg,
      form: dlg.querySelector('#aiSettingsForm'),
      btnClose: dlg.querySelector('#aiClose'),
      provOpenAI: dlg.querySelector('#aiProvOpenAI'),
      provGemini: dlg.querySelector('#aiProvGemini'),
      provApertus: dlg.querySelector('#aiProvApertus'),
      noApi: dlg.querySelector('#aiNoApi'),

      // key+model
      keyLabel: dlg.querySelector('#aiKeyLabel'),
      apiKey: dlg.querySelector('#aiApiKey'),
      apiHint: dlg.querySelector('#aiApiHint'),
      modelLabel: dlg.querySelector('#aiModelLabel'),
      modelSel: dlg.querySelector('#aiModel'),
      modelHint: dlg.querySelector('#aiModelHint'),
      promptSeed: dlg.querySelector('#aiPromptSeed'),

      // apertus route
      apertusRouteWrap: dlg.querySelector('#aiApertusRouteWrap'),
      apertusRoute: dlg.querySelector('#aiApertusRoute'),

      // footer buttons
      btnForget: dlg.querySelector('#aiForget'),
      btnTest: dlg.querySelector('#aiTest'),
      btnSave: dlg.querySelector('#aiSave'),
      btnCancel: dlg.querySelector('#aiCancel')
    };

    // events
    refs.btnClose.addEventListener('click', close);
    refs.btnCancel.addEventListener('click', close);
    refs.btnSave.addEventListener('click', onSave);
    refs.btnForget.addEventListener('click', onForget);
    refs.btnTest.addEventListener('click', onTest);

    refs.provOpenAI.addEventListener('change', renderProvider);
    refs.provGemini.addEventListener('change', renderProvider);
    refs.provApertus.addEventListener('change', renderProvider);
    refs.apertusRoute.addEventListener('change', renderProvider);
    refs.noApi.addEventListener('change', () => {
      const hide = refs.noApi.checked;
      refs.keyLabel.style.display = hide ? 'none' : '';
      refs.apiKey.style.display   = hide ? 'none' : '';
      refs.apiHint.style.display  = hide ? 'none' : '';
    });

    hydrate();
    return dlg;
  }

  // helper to add <option>
  function add(sel, value, label){ const o = document.createElement('option'); o.value = value; o.textContent = label; sel.appendChild(o); }

  // populate UI from storage
  function hydrate(){
    const s = load();
    // radios
    const prov = (s.provider || 'openai').toLowerCase();
    if (prov === 'gemini') refs.provGemini.checked = true;
    else if (prov === 'apertus' && refs.provApertus) refs.provApertus.checked = true;
    else refs.provOpenAI.checked = true;

    // no API
    refs.noApi.checked = !!s.noApi;
    refs.keyLabel.style.display = s.noApi ? 'none' : '';
    refs.apiKey.style.display   = s.noApi ? 'none' : '';
    refs.apiHint.style.display  = s.noApi ? 'none' : '';

    // api key / seed
    refs.apiKey.value = s.apiKey || '';
    refs.promptSeed.value = s.promptSeed || '';

    // provider-specific
    renderProvider();
  }

  function renderProvider(){
    const provider =
      (refs.provApertus && refs.provApertus.checked) ? 'apertus' :
      (refs.provGemini && refs.provGemini.checked) ? 'gemini' : 'openai';

    const s = load();
    refs.modelSel.innerHTML = '';

    if (provider === 'openai'){
      refs.apertusRouteWrap.style.display = 'none';
      refs.keyLabel.textContent = 'OpenAI API key';
      refs.apiKey.placeholder = 'sk-...';
      refs.apiHint.textContent = 'OpenAI Chat Completions API (messages[]).';

      refs.modelLabel.textContent = 'ChatGPT models';
      add(refs.modelSel, 'gpt-4o-mini', 'gpt-4o-mini');
      add(refs.modelSel, 'gpt-4o', 'gpt-4o');
      refs.modelHint.textContent = 'OpenAI Chat Completions API (messages[]).';

      refs.modelSel.value = (s.model && s.model.startsWith('gpt-')) ? s.model : 'gpt-4o-mini';
      refs.apiKey.value = s.apiKey || '';
      return;
    }

    if (provider === 'gemini'){
      refs.apertusRouteWrap.style.display = 'none';
      refs.keyLabel.textContent = 'Gemini API key (Google AI Studio)';
      refs.apiKey.placeholder = 'AIza...';
      refs.apiHint.textContent = 'Gemini generateContent API.';

      refs.modelLabel.textContent = 'Gemini models';
      add(refs.modelSel, 'gemini-2.5-flash', 'Gemini 2.5 Flash');
      add(refs.modelSel, 'gemini-2.5-pro', 'Gemini 2.5 Pro');
      // New: Gemini 2.0 family
add(refs.modelSel, 'gemini-2.0-flash', 'Gemini 2.0 Flash');
add(refs.modelSel, 'gemini-2.0-flash-lite', 'Gemini 2.0 Flash-Lite');
      refs.modelHint.textContent = 'Gemini generateContent API.';

      // Allow any of the supported Gemini models, including new 2.0 variants
const allowedGemini = new Set([
  'gemini-2.5-flash',
  'gemini-2.5-pro',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
]);
refs.modelSel.value = allowedGemini.has(s.geminiModel || '')
  ? s.geminiModel
  : 'gemini-2.5-flash';

      refs.apiKey.value = s.apiKey || '';
      return;
    }

    // APERTUS
    refs.apertusRouteWrap.style.display = '';
    refs.apertusRoute.value = s.apertusRoute || 'publicai';

    if (refs.apertusRoute.value === 'publicai'){
      refs.keyLabel.textContent = 'Public AI API key';
      refs.apiKey.placeholder = 'pk-...';
      refs.apiHint.textContent = 'OpenAI-compatible via proxy at ' + (window.PB_PUBLICAI_BASE || 'https://pb-publicai-proxy.composer01.workers.dev') + '/v1 (Authorization; UA added by proxy).';
      refs.apiKey.value = s.publicAIKey || '';
    } else {
      refs.keyLabel.textContent = 'Hugging Face token';
      refs.apiKey.placeholder = 'hf_...';
      refs.apiHint.textContent = 'HF Inference Providers (router.huggingface.co/v1).';
      refs.apiKey.value = s.hfToken || '';
    }

    refs.modelLabel.textContent = 'Apertus models';
    add(refs.modelSel, 'swiss-ai/apertus-8b-instruct', 'Apertus 8B Instruct');
    add(refs.modelSel, 'swiss-ai/apertus-70b-instruct', 'Apertus 70B Instruct');
    refs.modelHint.textContent = 'Use Instruct for chat.';
    refs.modelSel.value = s.apertusModel || 'swiss-ai/apertus-8b-instruct';
  }

  function onSave(){
    const provider =
      (refs.provApertus && refs.provApertus.checked) ? 'apertus' :
      (refs.provGemini && refs.provGemini.checked) ? 'gemini' : 'openai';

    const patch = {
      provider,
      noApi: !!refs.noApi.checked,
      promptSeed: refs.promptSeed.value.trim()
    };

    if (provider === 'openai'){
      patch.apiKey = refs.apiKey.value.trim();
      patch.model = refs.modelSel.value || 'gpt-4o-mini';
    } else if (provider === 'gemini'){
      patch.apiKey = refs.apiKey.value.trim();
      patch.geminiModel = refs.modelSel.value || 'gemini-2.5-flash';
    } else {
      // apertus
      const route = refs.apertusRoute.value;
      patch.apertusRoute = route;
      patch.apertusModel = refs.modelSel.value || 'swiss-ai/apertus-8b-instruct';
      if (route === 'publicai') patch.publicAIKey = refs.apiKey.value.trim();
      if (route === 'huggingface') patch.hfToken = refs.apiKey.value.trim();
    }

    save(patch);
    close();
  }

  function onForget(){
    const s = load();
    const provider =
      (refs.provApertus && refs.provApertus.checked) ? 'apertus' :
      (refs.provGemini && refs.provGemini.checked) ? 'gemini' : 'openai';

    if (provider === 'apertus'){
      const route = refs.apertusRoute.value || s.apertusRoute || 'publicai';
      if (route === 'publicai') s.publicAIKey = '';
      else s.hfToken = '';
    } else {
      s.apiKey = '';
    }
    save(s);
    refs.apiKey.value = '';
  }
  
  function ensureStatusEl(){
  if (!refs) return null;
  const next = refs.btnTest.nextElementSibling;
  if (next && next.id === 'aiTestStatus') return next;
  const span = document.createElement('span');
  span.id = 'aiTestStatus';
  span.className = 'tiny';
  span.style.marginLeft = '8px';
  span.style.whiteSpace = 'pre-wrap';
  refs.btnTest.insertAdjacentElement('afterend', span);
  return span;
}
function setTestStatus(msg, kind){
  const el = ensureStatusEl();
  if (!el) return;
  el.textContent = msg;
  el.style.color =
    kind === 'ok'   ? 'var(--green-600, #1a7f37)' :
    kind === 'warn' ? 'var(--amber-700, #92400e)' :
    kind === 'error'? 'var(--red-700, #b91c1c)' :
                      'var(--gray-700, #374151)';
}

// small fetch wrapper with timeout + JSON parsing
async function httpJSON(url, opts={}, timeoutMs=12000){
  const ctrl = new AbortController();
  const t = setTimeout(()=>ctrl.abort(), timeoutMs);
  try{
    const res = await fetch(url, { ...opts, signal: ctrl.signal });
    const text = await res.text();
    let json = null;
    try { json = text ? JSON.parse(text) : null; } catch {}
    return { res, json, text };
  } finally {
    clearTimeout(t);
  }
}

// === Provider tests ===
async function testOpenAIKey(key){
  const { res, json } = await httpJSON('https://api.openai.com/v1/models', {
    headers: { 'Authorization': `Bearer ${key}` }
  });
  if (res.ok) return { ok:true, provider:'OpenAI' };
  const msg = (json && (json.error && json.error.message)) || res.statusText || 'Auth failed';
  const tip = (res.status === 401 || res.status === 403) ? ' Check the key value and org access.' : '';
  return { ok:false, provider:'OpenAI', status: res.status, message: msg, tip };
}

async function testGeminiKey(key){
  const { res, json } = await httpJSON(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(key)}`);
  if (res.ok) return { ok:true, provider:'Gemini', note: (json && json.models && json.models.length ? `${json.models.length} models` : 'models listed') };
  // 403 often means invalid/expired key; 400 can be quota/project config
  const msg = (json && (json.error && json.error.message)) || res.statusText || 'Auth failed';
  const tip = (res.status === 403) ? ' Verify the API key and project settings in Google AI Studio.' : '';
  return { ok:false, provider:'Gemini', status: res.status, message: msg, tip };
}

// OpenAI-compatible routers (Public AI, Hugging Face)
async function testOpenAICompatKey(baseUrl, key, label){
  const { res, json } = await httpJSON(`${baseUrl.replace(/\/$/,'')}/models`, {
    headers: { 'Authorization': `Bearer ${key}` }
    // Note: browsers cannot set 'User-Agent'. If the provider requires a custom UA, this may fail in-browser.
  });
  if (res.ok) return { ok:true, provider:label || 'OpenAI-compatible' };
  const msg = (json && (json.error && (json.error.message || json.error))) || res.statusText || 'Auth failed';
  let tip = '';
  if (label === 'Public AI') tip = ' If this persists, Public AI may require a server-side proxy for CORS/UA requirements.';
  return { ok:false, provider:label || 'OpenAI-compatible', status: res.status, message: msg, tip };
}


async function onTest(){
  ensureDialog(); // make sure refs exist
  const s = load();
  const provider =
    (refs.provApertus && refs.provApertus.checked) ? 'apertus' :
    (refs.provGemini && refs.provGemini.checked) ? 'gemini' : 'openai';

  // No-API mode => open website
  if (refs.noApi.checked) {
    if (provider === 'openai'){
      window.open('https://chat.openai.com', '_blank', 'noopener');
      return;
    }
    if (provider === 'gemini'){
      window.open('https://gemini.google.com/app', '_blank', 'noopener');
      return;
    }
    // Apertus
    if ((s.apertusRoute || 'publicai') === 'publicai'){
      window.open('https://chat.publicai.co/', '_blank', 'noopener');
    } else {
      window.open('https://huggingface.co/swiss-ai/Apertus-8B-Instruct-2509', '_blank', 'noopener');
    }
    return;
  }

  // API-mode => validate key
  const key = (refs.apiKey.value || '').trim();
  const route = (provider === 'apertus') ? (refs.apertusRoute.value || s.apertusRoute || 'publicai') : null;

  if (!key) {
    setTestStatus('Enter your API key then press Test.', 'warn');
    refs.apiKey.focus();
    return;
  }

  // UI: disable button, show progress
  const btn = refs.btnTest;
  const prev = btn.textContent;
  btn.disabled = true;
  btn.style.opacity = '.6';
  btn.textContent = 'Testing…';
  setTestStatus('Contacting provider…', 'info');

  try {
    let result;

    if (provider === 'openai') {
      result = await testOpenAIKey(key);
    } else if (provider === 'gemini') {
      result = await testGeminiKey(key);
    } else {
      if (route === 'publicai') result = await testOpenAICompatKey(publicAIBaseV1(), key, 'Public AI');
      else result = await testOpenAICompatKey('https://router.huggingface.co/v1', key, 'Hugging Face');
    }

    if (result.ok) {
      setTestStatus(`✅ Key valid (${result.provider}${result.note ? ' — ' + result.note : ''})`, 'ok');
    } else {
      const tip = result.tip ? ` ${result.tip}` : '';
      setTestStatus(`❌ Key invalid or blocked [${result.status || 'n/a'}]. ${result.message || 'Auth failed.'}${tip}`, 'error');
    }
  } catch (err){
    const msg = (err && err.message) ? err.message : String(err);
    const isPublicAI = (refs?.provApertus?.checked && (refs?.apertusRoute?.value || s.apertusRoute) === 'publicai');
const hint = isPublicAI
  ? ' Public AI requires a User-Agent header; browsers can’t set it. Requests are routed via your proxy at ' + (window.PB_PUBLICAI_BASE || '(not set)') + '.'
  : ' Are you running over https and not file:// ?';
setTestStatus(`❌ Network/CORS error. ${msg}.${hint}`, 'error');
  } finally {
    btn.disabled = false;
    btn.style.opacity = '';
    btn.textContent = prev;
  }
}


  // ---- api ----
  function open(){
    ensureDialog();
    try { refs.dlg.showModal(); } catch { refs.dlg.open = true; }
  }
  function close(){ try{ refs.dlg.close(); }catch{ refs.dlg.open = false; } }
  function get(){ return load(); }

  window.AISettings = { open, get, onSaved };
  
    // === AI Loading Overlay (DOM injected; subscribes to AIState) ===
  (function attachAIOverlay(){
    function ensureAiOverlay(){
      let root = document.getElementById('aiOverlay');
      if (root) return root;

      root = document.createElement('div');
      root.id = 'aiOverlay';
      root.setAttribute('role','dialog');
      root.setAttribute('aria-modal','true');
      root.setAttribute('aria-busy','true');
      root.setAttribute('aria-live','polite');
      root.hidden = true;
      root.style.cssText = 'position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:rgba(10,12,12,.52);backdrop-filter:blur(2px);';

      const panel = document.createElement('div');
      panel.className = 'aiOverlay__panel';
      panel.setAttribute('role','document');
      panel.tabIndex = -1;
      panel.style.cssText = 'min-width:320px;max-width:480px;border-radius:12px;padding:20px 24px;background:#111;color:#fafafa;box-shadow:0 20px 60px rgba(0,0,0,.35);';

      panel.innerHTML = `
        <div id="aiOverlaySpinner" style="width:40px;height:40px;margin:4px auto 12px;border-radius:50%;border:3px solid rgba(255,255,255,.25);border-top-color:currentColor;animation:aiSpin 800ms linear infinite"></div>
        <h2 style="margin:0 0 6px;font-size:1.1rem;font-weight:600">Preparing results…</h2>
        <p id="aiOverlayMsg" style="margin:0 0 6px;opacity:.85">Summarizing matches and composing output.</p>
        <p id="aiOverlaySlow" style="margin:8px 0 0;font-size:.92rem;opacity:.75;display:none">Still working… larger prompts can take a bit.</p>
        <div id="aiOverlayActions" style="display:flex;justify-content:center;gap:12px;margin-top:12px">
          <button id="aiOverlayCancel" style="display:none;padding:8px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.2);background:transparent;color:inherit;cursor:pointer">Cancel</button>
        </div>
      `;

    const style = document.createElement('style');
style.textContent = `
  /* Make hidden actually hidden, even against inline display styles */
  #aiOverlay[hidden]{ display:none !important; }

  @keyframes aiSpin{ to{ transform:rotate(360deg) } }
`;
document.head.appendChild(style);

      root.appendChild(panel);
      document.body.appendChild(root);
      return root;
    }

    const root = ensureAiOverlay();
    const panel = root.querySelector('.aiOverlay__panel');
    const msg = root.querySelector('#aiOverlayMsg');
    const slow = root.querySelector('#aiOverlaySlow');
    const actions = root.querySelector('#aiOverlayActions');
    const cancelBtn = root.querySelector('#aiOverlayCancel');

    let timer = null;
    let allowCancel = false;

    // Warn on accidental unload while working
    window.addEventListener('beforeunload', (e) => {
      // don’t block normal exits unless truly in-flight
      if (window.AIState && AIState._debug?.inFlight) return; // internal switch if you add one
      // use subscription below to control in-flight guard
    });

    AIState.subscribe((s) => {
      if (s.inFlight) {
        root.hidden = false;
        document.body.style.overflow = 'hidden';
        panel.focus();

        slow.style.display = 'none';
        cancelBtn.style.display = 'none';
        allowCancel = false;
        msg.textContent = 'Summarizing matches and composing output.';

        clearTimeout(timer);
        timer = setTimeout(() => {
          slow.style.display = 'block';           // 5s patience message
          cancelBtn.style.display = 'inline-block';
          allowCancel = true;
        }, 5000);

        // block unload only while in-flight
        window.onbeforeunload = () => 'AI-assisted search is still running.';
      } else {
        clearTimeout(timer);
        root.hidden = true;
        document.body.style.overflow = '';
        window.onbeforeunload = null;
      }
    });

    cancelBtn.addEventListener('click', () => {
      if (!allowCancel) return;
      if (confirm('Cancel AI-assisted search? Progress will be lost.')) {
        // resolve as error so telemetry captures cancellation
        AIState.resolveError(new Error('user_cancelled'));
      }
    });

    // minimalist focus trap
    document.addEventListener('keydown', (e) => {
      if (root.hidden) return;
      if (e.key === 'Tab') { e.preventDefault(); (allowCancel ? cancelBtn : panel).focus(); }
      if (e.key === 'Escape') {
        if (!allowCancel) { e.preventDefault(); return; }
        if (confirm('Cancel AI-assisted search?')) AIState.resolveError(new Error('user_cancelled'));
      }
    }, true);
  })();
  
  // === Inline AI-assisted search handler (delegated) ===
(function attachAISearchHandler(){

  // --- Debug flags via URL or console (no publish needed) ---
  // Usage examples:
  //   ?aiDelay=5000          -> force 5s delay
  //   ?aiError=1             -> force error after delay
  //   ?aiDelay=6000&aiError  -> both
  const __qs = new URLSearchParams(location.search);
  const __FORCE = {
    delayMs: Number(__qs.get('aiDelay')) || 0,
    error: __qs.has('aiError')
  };

  // Console helpers:
  window.AI_DEBUG = window.AI_DEBUG || {};
  Object.assign(window.AI_DEBUG, {
    setDelay(ms){ __FORCE.delayMs = Number(ms) || 0; console.info('[AI_DEBUG] delayMs =', __FORCE.delayMs); },
    setError(on){ __FORCE.error = !!on; console.info('[AI_DEBUG] error =', __FORCE.error); },
    kick(query){ 
      const q = (query || getCurrentQuery() || 'debug: synthetic query');
      console.info('[AI_DEBUG] kick with query:', q);
      run(q);
    },
    // overlay-only smoke test (no AI call): begin → resolve in 4s
    overlay(ms=4000){
      if (!AIState.begin('debug', { source:'overlay_smoke' })) return;
      setTimeout(()=>AIState.resolveSuccess({ size: 0 }), Number(ms)||4000);
    }
  });

  // Hotkey smoke test: Cmd/Ctrl + Shift + G shows overlay for 4s
  document.addEventListener('keydown', (e) => {
    const k = e.key?.toLowerCase();
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && k === 'g') {
      e.preventDefault();
      window.AI_DEBUG.overlay(4000);
    }
  });
  
  function getCurrentQuery(){
    // Adjust selector to your real search input if needed
    const el = document.querySelector('#searchInput, input[type="search"], .search input');
    return (el && el.value || '').trim();
  }

  async function defaultRunGemini(q){
    // Fallback stub if window.runGemini isn’t defined elsewhere
    await new Promise(r => setTimeout(r, 1200));
    return { text: `Echo: ${q}` };
  }

  function handoffToResults(result){
    if (typeof window.setGeminiModalContent === 'function' && typeof window.openGeminiModal === 'function') {
      window.setGeminiModalContent(result);
      AIState.resolveSuccess({ size: (result.text || result.html || '').length });
      window.openGeminiModal();
      return;
    }
    // Fallback: keep user in overlay with a Close button
    const msg = document.getElementById('aiOverlayMsg');
    const slow = document.getElementById('aiOverlaySlow');
    const actions = document.getElementById('aiOverlayActions');
    msg.textContent = 'Results ready.';
    slow.style.display = 'none';
    actions.innerHTML = `<button id="aiOverlayClose" style="padding:8px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.2);background:transparent;color:inherit;cursor:pointer">Close</button>`;
    document.getElementById('aiOverlayClose').onclick = () => AIState.resolveSuccess({ size: (result.text || '').length });
  }

  function showError(err, q){
    AIState.resolveError(err);
    const msg = document.getElementById('aiOverlayMsg');
    const slow = document.getElementById('aiOverlaySlow');
    const actions = document.getElementById('aiOverlayActions');
    msg.textContent = 'We hit a snag generating results.';
    slow.textContent = (err && err.message) ? err.message : 'Network or service error.';
    slow.style.display = 'block';
    actions.innerHTML = `
      <button id="aiRetryBtn" style="padding:8px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.2);background:transparent;color:inherit;cursor:pointer">Retry</button>
      <button id="aiAdvancedBtn" style="padding:8px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.2);background:transparent;color:inherit;cursor:pointer">Advanced search</button>`;
    document.getElementById('aiRetryBtn').onclick = () => run(q);
    document.getElementById('aiAdvancedBtn').onclick = () => (window.openAdvancedSearch ? window.openAdvancedSearch() : (location.href = '#advanced'));
  }

  async function run(q){
    const ok = AIState.begin('gemini', { source: 'ai_assisted_button' });
    if (!ok) return;
    try{
      // Force local slowness / failure without publishing
      if (__FORCE.delayMs) await new Promise(r => setTimeout(r, __FORCE.delayMs));
      if (__FORCE.error) throw new Error('forced_debug_error');

      const result = await (window.runGemini ? window.runGemini(q) : defaultRunGemini(q));
      handoffToResults(result);
    }catch(err){
      showError(err, q);
    }
  }

  // Delegate clicks: either give your button id="btnAI" or data-ai-assist="gemini"
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-ai-assist="gemini"], #btnAI');
    if (!t) return;
    e.preventDefault();
    const q = getCurrentQuery();
    run(q);
  });
  
  
  // === Production shims: guarantee overlay shows on real AI path ===
(function installAISearchShims(){
  const log = (...a)=>console.debug('[AI shim]', ...a);

  // Safe wrapper helper (idempotent)
  function wrap(obj, name, wrapFn){
    if (!obj || typeof obj[name] !== 'function') return false;
    const orig = obj[name];
    if (orig.__aiWrapped) return true;
    obj[name] = wrapFn(orig);
    obj[name].__aiWrapped = true;
    log('wrapped', name);
    return true;
  }

  // Resolve overlay right before any modal opens
  function wrapModalOpeners(){
    // Our helper (from ensureResultModal)
    wrap(window, 'openGeminiModal', (orig)=> function(...args){
      try { AIState && AIState.resolveSuccess({ size: 0 }); } catch {}
      return orig.apply(this, args);
    });

    // If the site uses a different opener, add more names here:
    wrap(window, 'openAIResultsDialog', (orig)=> function(...args){
      try { AIState && AIState.resolveSuccess({ size: 0 }); } catch {}
      return orig.apply(this, args);
    });

    // As a safety net, watch the modal node itself for unhide
    const modal = document.getElementById('geminiResultModal');
    if (modal && !modal.__aiObserved) {
      const mo = new MutationObserver(() => {
        if (!modal.hidden) { try { AIState && AIState.resolveSuccess({ size: 0 }); } catch {} }
      });
      mo.observe(modal, { attributes: true, attributeFilter: ['hidden', 'style', 'class'] });
      modal.__aiObserved = true;
      log('observing modal visibility');
    }
  }

  // Begin overlay as soon as any Gemini call starts, even if production uses another entrypoint
  function wrapAiCalls(){
    // Common names—add or remove as needed for your app
    const startWrappers = [
      'runGemini',           // our suggested name
      'geminiSearch',        // possible site name
      'aiAssistGemini',      // possible site name
      'pbGeminiCall',        // possible site name
    ];
    startWrappers.forEach(name => {
      wrap(window, name, (orig)=> async function(...args){
        const started = AIState && AIState.begin('gemini', { source: `shim:${name}` });
        try {
          const res = await orig.apply(this, args);
          // Do NOT resolve here; we resolve when the modal actually opens (via wrapModalOpeners)
          // Fallback: auto-resolve in 12s if nobody opened a modal, to avoid a stuck overlay
          if (started) setTimeout(() => {
            const s = (AIState && AIState.subscribe ? null : null); // no-op; avoid errors
            try { AIState && AIState.resolveSuccess({ size: 0 }); } catch {}
          }, 12000);
          return res;
        } catch (err) {
          try { AIState && AIState.resolveError(err); } catch {}
          throw err;
        }
      });
    });

    // If production calls Gemini via fetch directly, you can also hook it narrowly:
    if (window.fetch && !window.fetch.__aiWrapped) {
      const origFetch = window.fetch;
      window.fetch = function(input, init){
        const url = (typeof input === 'string' ? input : (input && input.url) || '');
        const isGemini = /generativelanguage\.googleapis\.com|publicai|router\.huggingface\.co/i.test(url);
        if (isGemini && !(AIState && AIState.inFlight)) { try { AIState.begin('gemini', { source:'shim:fetch' }); } catch {} }
        return origFetch.apply(this, arguments);
      };
      window.fetch.__aiWrapped = true;
      log('wrapped fetch (Gemini endpoints)');
    }
  }

  // Try now, on load, and briefly poll—covers late script loads in production
  function tryInstall(){
    wrapModalOpeners();
    wrapAiCalls();
  }
  tryInstall();
  window.addEventListener('load', tryInstall);

  let attempts = 0;
  const iv = setInterval(() => {
    tryInstall();
    attempts++;
    if (attempts > 40) clearInterval(iv); // ~12s cap
  }, 300);
})();

  
})();
  
})();

  


