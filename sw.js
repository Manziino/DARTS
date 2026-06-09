self.addEventListener('install', (e) => {
  self.skipWaiting(); // Force l'installation immédiate
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      // Détruit TOUS les anciens caches sans exception
      return Promise.all(keys.map((k) => caches.delete(k))); 
    }).then(() => {
      return self.clients.claim(); // Prend le contrôle de la page immédiatement
    })
  );
});

self.addEventListener('fetch', (e) => {
  // Contourne le cache et va TOUJOURS chercher la version en ligne
  e.respondWith(fetch(e.request));
});
