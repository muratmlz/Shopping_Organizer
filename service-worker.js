self.addEventListener('install', event => {
    console.log('Service Worker εγκαταστάθηκε');
});

self.addEventListener('fetch', event => {
    console.log('Αιτήματα για:', event.request.url);
});
