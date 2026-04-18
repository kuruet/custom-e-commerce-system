/**
 * Simple in-memory TTL cache.
 * Prevents hammering DB for identical recommendation queries.
 * Resets on server restart — acceptable for volatile recommendation data.
 */

const store = new Map(); // key → { value, expiresAt }

export const cacheGet = (key) => {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }
  return entry.value;
};

export const cacheSet = (key, value, ttlMs = 60_000) => {
  // Guard against unbounded growth
  if (store.size > 500) {
    const firstKey = store.keys().next().value;
    store.delete(firstKey);
  }
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
};

export const cacheDelete = (key) => store.delete(key);
export const cacheClear = () => store.clear();
