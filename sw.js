const CACHE_NAME = 'montcode-cm-v1';
const ASSETS = [
  './',
  './index.html',
  './logo.png.jpg',
  'https://cdn.tailwindcss.com',
  'https://img.icons8.com/fluency/96/scale.png',
  'https://img.icons8.com/fluency/96/heart-with-pulse.png'
];

// Instalación: Guarda los archivos en el cache local del teléfono
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activación: Limpia caches antiguos si actualizas la versión
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Estrategia: Carga desde el Cache primero, luego busca en la red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
