/* GitHub Pages compatibility. This is inert on the destination and local previews. */
(function () {
  if (location.hostname !== 'jonathankhobson.github.io' || !location.pathname.startsWith('/AI/')) return;
  const query = new URLSearchParams(location.search);
  if (query.get('_legacy') === '1' || location.pathname.startsWith('/AI/migration/')) return;
  const suffix = location.pathname.slice('/AI/'.length);
  const destination = new URL(suffix + location.search + location.hash, 'https://activity-atlas.jkylehobson.chatgpt.site/ai/');
  let hasSavedWork = false;
  try {
    for (const store of [localStorage, sessionStorage]) for(let i=0;i<store.length;i++) {
      const key=store.key(i);
      if (/^(?:pb[._]|fw_|reasoning_ladder_|claire:return$|postLaunchAsk$)/.test(key)) { hasSavedWork=true; break; }
    }
  } catch (_) {
    // If storage is blocked, keep an explicit choice rather than assuming it is empty.
    hasSavedWork=true;
  }
  if (hasSavedWork) {
    const transfer = new URL('/AI/migration/', location.origin);
    transfer.searchParams.set('page',suffix + location.search + location.hash);
    location.replace(transfer.href);
  } else location.replace(destination.href);
})();
