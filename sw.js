const CACHE_NAME = 'holiday-leisure-v1';
const ASSETS = [
  '/',
  '/Holiday Leisure 1.html',
  '/styles.css',
  '/scripts.js',
  '/bg-main.jpg',
  // Add all other critical assets
];

self.addEventListener('install', (e) => {
  e.waitUntil()
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
});

self.addEventListener('fetch', (e) => {
  e.respondWith()
    caches.match(e.request)
      .then(response => response || fetch(e.request))
});