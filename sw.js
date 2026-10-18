// QMS Service Worker - Network First + Offline Support
// index.html 使用 network-first，更新不需要改此檔案

const CACHE = 'qms-static-v1';
const PRECACHE = ['./index.html', './icon-192.png', './icon-512.png', './manifest.json'];

self.addEventListener('install', e => {
  // Pre-cache everything including index.html for offline support
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = e.request.url;

  // API calls: never cache
  if (url.includes('script.google.com') ||
      url.includes('anthropic.com') ||
      url.includes('googleapis.com')) return;

  // index.html: network first → always fresh when online, cached when offline
  if (url.endsWith('/') || url.includes('index.html')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Static assets: cache first
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
