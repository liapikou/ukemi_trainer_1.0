/* Ukemi Sound Trainer — service worker
   The page itself is fetched from the network first, so a new version
   shows up on the next visit; the cached copy is the offline fallback.
   The MediaPipe model, its wasm and the fonts are cached on first use,
   so the trainer works offline afterwards. */
const CACHE = 'ukemi-v24';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = req.url;
  const put = res => { if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; };
  // the app page: network first, cache as fallback
  if (req.mode === 'navigate' || (url.startsWith(self.location.origin) && /(\/|index\.html)$/.test(new URL(url).pathname))) {
    e.respondWith(fetch(req).then(put).catch(() => caches.match(req).then(hit => hit || caches.match('./index.html'))));
    return;
  }
  // everything else: cache first, then network (and keep a copy)
  const keep = url.includes('cdn.jsdelivr.net') || url.includes('storage.googleapis.com') || url.includes('fonts.g') || url.startsWith(self.location.origin);
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => keep ? put(res) : res)));
});
