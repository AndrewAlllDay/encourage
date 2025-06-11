const CACHE_NAME = 'dg-focus-cache-v1.0.22'; // <--- THIS MUST BE INCREMENTED!
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css', // Ensure style.css is still in this list!
    '/app.js',
    '/manifest.json',
    '/images/icon-192x192.png',
    '/images/icon-512x512.png'
];

// Install event: Caches all the specified assets
self.addEventListener('install', event => {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Caching app shell');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting()) // Activates the new service worker immediately
            .catch(error => {
                console.error('[Service Worker] Caching failed:', error);
            })
    );
});

// Fetch event: Serves cached content if available, otherwise fetches from network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    console.log(`[Service Worker] Serving from cache: ${event.request.url}`);
                    return response;
                }
                // No cache hit - fetch from network
                console.log(`[Service Worker] Fetching from network: ${event.request.url}`);
                return fetch(event.request);
            })
            .catch(error => {
                console.error('[Service Worker] Fetch failed:', error);
                // Optionally, return a fallback page for offline mode if the fetch fails
                // return caches.match('/offline.html');
            })
    );
});

// Activate event: Cleans up old caches
self.addEventListener('activate', event => {
    console.log('[Service Worker] Activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
            .then(() => self.clients.claim()) // Takes control of existing clients immediately
    );
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker Registered!', registration);
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
}