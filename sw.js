const CACHE_NAME = 'star-studio-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/outro/index.html',
    '/manifest.json',
    '/logo.png',
    '/Icon.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(keys.map(k => { if (k !== CACHE_NAME) return caches.delete(k); }))).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(resp => resp || fetch(event.request).then(fetchResp => {
            return caches.open(CACHE_NAME).then(cache => { cache.put(event.request, fetchResp.clone()); return fetchResp; });
        })).catch(() => caches.match('/index.html'))
    );
});
