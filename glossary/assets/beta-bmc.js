/* beta-bmc.js — externalized, no <script> wrapper, with v2 storage keys */
(() => {
  "use strict";

  // Run after DOM is ready (defer usually suffices; this is extra-safe)
  const onReady = (fn) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else { fn(); }
  };

  // Capture the <script src="...beta-bmc.js" data-*> element for config
  const cfgElAtLoad = document.currentScript;

  onReady(() => {
    const root = document.body;
    const cfgEl = cfgElAtLoad || document.querySelector('script[src*="beta-bmc"][data-beta],script[src*="beta-bmc"][data-bmc]');
    const cfg = {
      beta: (root?.dataset.beta || cfgEl?.dataset.beta || "bar").toLowerCase(),     // 'bar' | 'pill' | 'off'
      bmc:  (root?.dataset.bmc  || cfgEl?.dataset.bmc  || "obvious").toLowerCase(), // 'obvious' | 'discrete' | 'off'
      bmcDismissible: String(root?.dataset.bmcDismissible || cfgEl?.dataset.bmcDismissible || "").toLowerCase() === "true"
    };
    if (cfg.beta === "discrete") cfg.beta = "pill"; // tolerate misspelling

    const pageKey = (location.pathname || "index").replace(/[^a-z0-9]+/gi, "_").toLowerCase();

    // Bump to v2 so anything previously dismissed reappears
    const betaKey           = "pb.beta.hidden.v2." + pageKey;              // bar hard-dismiss
    const betaCollapsedKey  = "pb.beta.collapsed.v2." + pageKey;           // pill collapse state
    const bmcKey            = "pb.bmc.hidden.v2." + pageKey;

    // -------- EmailJS (lazy) --------
    const EMAILJS_PUBLIC_KEY = "DpN9hLocoU__4dYVX";
    const EMAILJS_SERVICE    = "service_9wx16fe";
    const EMAILJS_TEMPLATE   = "template_hjbmxbn";

    function ensureEmailJS(){
      return new Promise((resolve, reject) => {
        if (window.emailjs?.init) { try { emailjs.init(EMAILJS_PUBLIC_KEY); } catch {}
          return resolve(window.emailjs);
        }
        const s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";
        s.onload = () => { try { emailjs.init(EMAILJS_PUBLIC_KEY); } catch {} ; resolve(window.emailjs); };
        s.onerror = () => reject(new Error("EmailJS failed to load"));
        document.head.appendChild(s);
      });
    }

    // -------- Feedback dialog --------
    function ensureFeedbackDialog(){
      let dlg = document.getElementById("pbFeedbackDialog");
      if (dlg) return dlg;

      dlg = document.createElement("dialog");
      dlg.id = "pbFeedbackDialog";
      dlg.innerHTML = `
        <form id="pbFeedbackForm" novalidate style="min-width:min(560px,96vw);max-width:96vw;">
          <h3 style="margin:0 0 8px;font:700 16px system-ui">Share quick feedback</h3>
          <p style="margin:0 0 12px;font:500 13px;opacity:.9">What’s confusing, broken, or delightful?</p>
          <label style="display:block;font:600 12px;margin-bottom:6px">Your feedback</label>
          <textarea name="message" required minlength="5" placeholder="I noticed…" style="width:100%;height:120px;padding:10px;border-radius:10px;border:1px solid #ddd;resize:vertical"></textarea>
          <div style="display:flex;gap:12px;margin-top:10px">
            <div style="flex:1">
              <label style="display:block;font:600 12px;margin-bottom:6px">Email (optional, for follow-up)</label>
              <input type="email" name="email" placeholder="you@example.com" style="width:100%;padding:10px;border-radius:10px;border:1px solid #ddd">
            </div>
          </div>
          <div id="pbFeedbackNote" style="margin-top:10px;font:12px;opacity:.8"></div>
          <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px">
            <button type="button" value="cancel" id="pbFeedbackCancel" style="padding:8px 12px;border-radius:10px;border:1px solid #ddd;background:#fff;cursor:pointer">Cancel</button>
            <button type="submit" id="pbFeedbackSend" style="padding:8px 12px;border-radius:10px;border:1px solid #111;background:#111;color:#fff;cursor:pointer">Send</button>
          </div>
        </form>
      `;
      document.body.appendChild(dlg);

      dlg.querySelector("#pbFeedbackCancel").addEventListener("click", () => dlg.close());
      dlg.addEventListener("close", () => {
        dlg.querySelector("#pbFeedbackForm")?.reset();
        dlg.querySelector("#pbFeedbackNote").textContent = "";
      });
      dlg.addEventListener("cancel", (e) => { e.preventDefault(); dlg.close(); });

      dlg.querySelector("#pbFeedbackForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const form   = e.currentTarget;
        const sendBtn= dlg.querySelector("#pbFeedbackSend");
        const note   = dlg.querySelector("#pbFeedbackNote");
        const data   = new FormData(form);
        const message= (data.get("message")||"").toString().trim();
        const email  = (data.get("email")||"").toString().trim();

        if (message.length < 5){ note.textContent = "Please add a bit more detail."; return; }
        sendBtn.disabled = true; note.textContent = "Sending…";

        try{
          await ensureEmailJS();
          const params = { message, email, page: location.href, ua: navigator.userAgent, ts: new Date().toISOString() };
          await window.emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, params);
          note.textContent = "Thanks! Your feedback was sent.";
          setTimeout(() => dlg.close(), 900);
        } catch(err){
          console.error(err);
          note.textContent = "Failed to send. You can email it instead — sorry!";
        } finally {
          sendBtn.disabled = false;
        }
      });

      return dlg;
    }

    function openFeedback(){ ensureFeedbackDialog().showModal(); }
    window.pbBetaBMC = { openFeedback }; // optional global hook

    // -------- Beta bar --------
    function addBetaBar(){
      if (localStorage.getItem(betaKey) === "1") return;
      const bar = document.createElement("div");
      bar.className = "betaBanner";
      bar.innerHTML = `
        <span class="tag" aria-hidden="true">beta</span>
        <span class="msg">prototype</span>
        <span class="sub">things may change or break — <button class="link-btn" type="button">feedback helps</button></span>
        <button class="x" type="button" aria-label="Dismiss">×</button>
      `;
      bar.querySelector(".x")?.addEventListener("click", () => {
        bar.remove(); try { localStorage.setItem(betaKey, "1"); } catch {}
      });
      bar.querySelector(".link-btn")?.addEventListener("click", openFeedback);
      document.body.appendChild(bar);
    }

    // -------- Beta dock (pill) --------
    function addBetaDock(){
      const dock = document.createElement("div");
      dock.className = "betaDock";
      dock.setAttribute("aria-expanded", "true");
      dock.innerHTML = `
        <div class="betaPanel" role="note" aria-label="Prototype notice">
          <span class="label">beta prototype</span>
          <button class="feedback" type="button" aria-label="Send feedback">Feedback</button>
          <button class="collapse" type="button" aria-label="Hide (collapse to edge)">×</button>
        </div>
        <button class="betaHandle" type="button" aria-label="Show beta notice" title="Show">‹</button>
      `;

      const handle = dock.querySelector(".betaHandle");
      const xBtn   = dock.querySelector(".collapse");
      const fbBtn  = dock.querySelector(".feedback");

      const startCollapsed = localStorage.getItem(betaCollapsedKey) === "1";
      if (startCollapsed){ dock.classList.add("collapsed"); dock.setAttribute("aria-expanded","false"); }

      function collapse(){
        dock.classList.add("collapsed"); dock.setAttribute("aria-expanded","false");
        try { localStorage.setItem(betaCollapsedKey, "1"); } catch {}
      }
      function expand(){
        dock.classList.remove("collapsed"); dock.setAttribute("aria-expanded","true");
        try { localStorage.setItem(betaCollapsedKey, "0"); } catch {}
      }

      xBtn?.addEventListener("click", collapse);
      handle?.addEventListener("click", expand);
      handle?.addEventListener("keydown", (e)=>{ if (e.key === "Enter" || e.key === " "){ e.preventDefault(); expand(); }});
      fbBtn?.addEventListener("click", openFeedback);

      document.body.appendChild(dock);
      return dock;
    }

    // -------- BMC dock + spacing hook --------
    function positionBetaDockAroundBMC(bmcDock){
      const beta = document.querySelector(".betaDock");
      if (!beta) return;
      const base = 16, gap = 12;

      function place(){
        const rect = bmcDock.getBoundingClientRect();
        const h = Math.ceil(rect.height || 0) || (bmcDock.classList.contains("obvious") ? 56 : 46);
        beta.style.bottom = (base + h + gap) + "px";
        document.body.classList.add("has-bmc");
      }
      place();

      const img = bmcDock.querySelector("img");
      if (img && !img.complete) img.addEventListener("load", place, { once: true });
      window.addEventListener("resize", place, { passive: true });

      const close = bmcDock.querySelector(".bmcClose");
      if (close) close.addEventListener("click", () => {
        beta.style.bottom = base + "px";
        document.body.classList.remove("has-bmc");
      }, { once: true });
    }

    function addBMCDock(){
      if (cfg.bmc === "off") return null;
      if (cfg.bmcDismissible && localStorage.getItem(bmcKey) === "1") return null;

      const dock = document.createElement("div");
      dock.id = "bmcDock";
      if (cfg.bmc === "obvious") dock.classList.add("obvious");
      if (cfg.bmcDismissible) dock.classList.add("dismissible");

      if (cfg.bmc === "obvious"){
        dock.innerHTML = `
          <a href="https://www.buymeacoffee.com/jonathankylehobson" target="_blank" rel="noopener">
            <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee">
          </a>
          <button class="bmcClose" type="button" aria-label="Hide support button">×</button>
        `;
      } else {
        dock.innerHTML = `
          <a class="bmc-compact" href="https://www.buymeacoffee.com/jonathankylehobson"
             target="_blank" rel="noopener" aria-label="Buy Me A Coffee" title="Buy Me A Coffee">
            <img class="bmc-ico" src="https://media.giphy.com/media/TDQOtnWgsBx99cNoyH/giphy.gif"
                 alt="Buy Me A Coffee" loading="lazy" decoding="async" referrerpolicy="no-referrer">
          </a>
          ${cfg.bmcDismissible ? '<button class="bmcClose" type="button" aria-label="Hide support button">×</button>' : ''}
        `;
      }

      dock.querySelector(".bmcClose")?.addEventListener("click", () => {
        dock.remove(); try { localStorage.setItem(bmcKey, "1"); } catch {}
      });

      document.body.appendChild(dock);
      return dock;
    }

    // -------- Boot --------
    let betaDockEl = null;
    if (cfg.beta !== "off"){
      if (cfg.beta === "pill"){ betaDockEl = addBetaDock(); }
      else { addBetaBar(); }
    }
    const bmcDockEl = addBMCDock();
    if (betaDockEl && bmcDockEl) positionBetaDockAroundBMC(bmcDockEl);
  });
})();