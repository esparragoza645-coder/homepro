// Service worker de HomePro360. Cambiá el número de versión cuando modifiques íconos o manifiesto.
const V = 'homepro-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x))))
      .then(() => self.clients.claim())
  );
});

// Solo intercepta archivos propios. Firebase (Auth y Firestore) queda siempre en red.
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin) return;
  if (r.mode === 'navigate') {
    // Red primero para que las actualizaciones lleguen; si no hay conexión, usa la copia guardada.
    e.respondWith(
      fetch(r).then(res => { const c = res.clone(); caches.open(V).then(x => x.put('./index.html', c)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  e.respondWith(
    caches.match(r).then(h => h || fetch(r).then(res => {
      if (res.ok) { const c = res.clone(); caches.open(V).then(x => x.put(r, c)); }
      return res;
    }))
  );
});
