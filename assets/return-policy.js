const DEFAULT_STUDIO_URL = "https://ai-workshop-studio.jkylehobson.chatgpt.site/learn";
const DEFAULT_ALLOWED_ORIGINS = [
  "https://ai-workshop-studio.jkylehobson.chatgpt.site",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

function normalizeAllowedOrigins(values = []) {
  return new Set([...DEFAULT_ALLOWED_ORIGINS, ...values].flatMap((value) => {
    try {
      const url = new URL(value);
      if (url.username || url.password) return [];
      if (url.protocol === "https:") return [url.origin];
      if (url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname) && url.port === "3000") {
        return [url.origin];
      }
    } catch {}
    return [];
  }));
}

function approvedReturnUrl(value, baseOrigin, allowedOrigins) {
  if (!value) return "";
  try {
    const url = baseOrigin ? new URL(value, baseOrigin) : new URL(value);
    if (url.username || url.password || !allowedOrigins.has(url.origin)) return "";
    if (url.protocol !== "https:" && !(url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname) && url.port === "3000")) return "";
    if (!/^\/(?:learn|admin\/preview)\/?$/.test(url.pathname)) return "";
    return url.href;
  } catch {
    return "";
  }
}

export function resolveWorkshopReturnUrl({
  requested = "",
  stored = "",
  fallback = DEFAULT_STUDIO_URL,
  allowedOrigins = DEFAULT_ALLOWED_ORIGINS,
  currentOrigin = DEFAULT_ALLOWED_ORIGINS[0],
} = {}) {
  const allowed = normalizeAllowedOrigins(allowedOrigins);
  const safeFallback = approvedReturnUrl(fallback, DEFAULT_ALLOWED_ORIGINS[0], allowed) || DEFAULT_STUDIO_URL;
  const safeCurrentOrigin = allowed.has(currentOrigin) ? currentOrigin : "";
  const safeRequested = approvedReturnUrl(requested, safeCurrentOrigin, allowed);
  if (safeRequested) return { url: safeRequested, source: "requested" };
  const safeStored = approvedReturnUrl(stored, safeFallback, allowed);
  if (safeStored) return { url: safeStored, source: "stored" };
  return { url: safeFallback, source: "fallback" };
}
