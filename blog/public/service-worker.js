/* eslint-disable no-restricted-globals */

const APP_SHELL_CACHE = 'app-shell';
const BLOG_DATA_CACHE = 'blog-data';

const ROOT_URL = 'http://127.0.0.1:3000';
const APP_SHELL_FILES = [
    '/',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
    '/manifest.json',
    '/static/js/main.7070100c.js',
    '/static/js/main.7070100c.js.map',
    '/favicon.ico',
    '/icons/icon_144.png'
];
self.addEventListener('install', function (event) {
    console.log("Installed !!");
    // Pre-caching : Mise en cache des fichiers indispensables
    event.waitUntil(
        caches.open(APP_SHELL_CACHE).then(function (cache) {
            cache.addAll(APP_SHELL_FILES);
        })
    );
});
self.addEventListener('activate', function (event) {
    console.log("Activated");
});
// Cache only strategy
function getFromCache(cacheName, request) {
    return caches.open(cacheName).then(function (cache) {
        return cache.match(request).then(function (cachedResult) {
            if (cachedResult) {
                console.log("Returned from pre-cache " + request.url);
                return cachedResult;
            } else {
                console.error("Couldn't fetch " + request.url + " from pre-cache");
            }
        })
    });
}

function getFromCacheOrNetwork(cacheName, request, onError = null) {
    return caches.open(cacheName).then(function (cache) {
        return cache.match(request).then(function (cachedResult) {
            console.log(request);
            if (cachedResult) {
                console.log("Returned from cache " + request.url);
                return cachedResult;
            } else {
                return fetch(request).then(function (networkResult) {
                    cache.put(request.url, networkResult.clone());
                    return networkResult;
                }).catch(function (error) {
                    console.log("Error fetching " + request.url, error);
                    if (onError) {
                        return onError();
                    }
                });
            }
        })
    });
}
// Événement appelé à chaque requête HTTP (chargement initial + fetch ultérieurs)
self.addEventListener('fetch', function (event) {
    // Si on cherche un fichier du pre-cache => CACHE ONLY
    if (APP_SHELL_FILES.includes(event.request.url.replace(ROOT_URL, ''))) {
        console.log('event shell ' + event.request.url);
        event.respondWith(getFromCache(APP_SHELL_CACHE, event.request));
    }
    else if (event.request.url.startsWith('http://localhost:8081/')) {
        console.log('event network ' + event.request.url);
        event.respondWith(
            getFromCacheOrNetwork(BLOG_DATA_CACHE, event.request, () => {
                // Ici, vous pouvez retourner une réponse de fallback ou indiquer que les données ne sont pas disponibles.
                // Par exemple, retourner une réponse statique ou depuis un autre cache.
                return new Response(JSON.stringify({error: "This data is not available while offline"}), {
                    headers: {'Content-Type': 'application/json'}
                });
            })
        );
    }
    // Sinon, utilisez la stratégie Cache-then-Network
    else {
        event.respondWith(
            caches.match(event.request)
                .then(function(response) {
                    return response || fetch(event.request);
                })
                .catch(() => {
                    // Gérer le cas hors ligne ou d'autres erreurs de réseau
                })
        );
    }
});



