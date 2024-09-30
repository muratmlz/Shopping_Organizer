self.addEventListener('install', event => {
    console.log('Service Worker εγκαταστάθηκε');
});

self.addEventListener('fetch', event => {
    console.log('Αιτήματα για:', event.request.url);
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
    .then(() => console.log('Service Worker Registered'));
}

self.addEventListener('install',
event => {
    event.waitUntil(

        caches.open('reminder-cache').then(cache =>{
            return cache.addAll([
                './index.html',
                './styles.css',
                './script.js',
                './manifest.json',
                './icons/icon-192x192.png',
                './icons/icon-512x512.png'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response ||
            fetch(event.request);
        })
    );
});
