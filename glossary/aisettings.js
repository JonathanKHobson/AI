/* AISettings.js — site-wide AI settings (OpenAI/Gemini/Apertus), lean modal, dynamic UI */
(function(){
  const KEY = 'pb.ai.settings.v2';

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
      refs.modelHint.textContent = 'Gemini generateContent API.';

      refs.modelSel.value = /^gemini-2\.5-(flash|pro)$/.test(s.geminiModel||'') ? s.geminiModel : 'gemini-2.5-flash';
      refs.apiKey.value = s.apiKey || '';
      return;
    }

    // APERTUS
    refs.apertusRouteWrap.style.display = '';
    refs.apertusRoute.value = s.apertusRoute || 'publicai';

    if (refs.apertusRoute.value === 'publicai'){
      refs.keyLabel.textContent = 'Public AI API key';
      refs.apiKey.placeholder = 'pk-...';
      refs.apiHint.textContent = 'OpenAI-compatible at https://api.publicai.co/v1 (Authorization + User-Agent).';
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
      if (route === 'publicai') result = await testOpenAICompatKey('https://api.publicai.co/v1', key, 'Public AI');
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
    setTestStatus(`❌ Network/CORS error. ${msg}. Are you running over https and not file:// ?`, 'error');
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
})();
