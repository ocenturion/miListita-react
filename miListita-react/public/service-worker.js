const CACHE_NAME = 'miListita-v1'

//Archivos basicos
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json'
];

// INSTALL
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ACTIVATE
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// FETCH
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // si está en cache → lo devuelve
      if (response) return response;

      // si no → lo busca en red
      return fetch(event.request);
    })
  );
});