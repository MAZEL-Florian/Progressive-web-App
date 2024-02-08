const APP_SHELL_CACHE = 'app-shell';
const POKE_DATA_CACHE = 'poke-data';
const POKE_SPRITE_CACHE = 'poke-sprite';
const PLACEHOLDER_SPRITE = '/sprites/placeholder.png'
const ROOT_URL = 'http://127.0.0.1:3000';
const APP_SHELL_FILES = [
  '/',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
  '/static/js/main.01c31d92.js',
  '/static/js/main.01c31d92.js.map',
  '/static/css/main.e6c13ad2.css',
  '/static/css/main.e6c13ad2.css.map',
  '/favicon.ico',
  '/manifest.json',
  '/icons/icon_144.png',
  PLACEHOLDER_SPRITE,
];
self.addEventListener('install', function(event){
  console.log("Installed !!");
  // Pre-caching : Mise en cache des fichiers indispensables
  // On utilise waitUntil pour être sûr que tous les fichiers sont mis en cache
  // avant de passer à la suite
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then(function(cache){
      cache.addAll(APP_SHELL_FILES);
    })
  );
});
self.addEventListener('activate', function(event){
  console.log("Activated");
});
// Cache only strategy
function getFromCache(cacheName, request){
  return caches.open(cacheName).then(function(cache){
    return cache.match(request).then(function(cachedResult){
      if(cachedResult){
        console.log("Returned from pre-cache " + request.url);
        return cachedResult;
      } else {
        console.error("Couldn't fetch " + request.url + " from pre-cache");
      }
    })
  });
}
// Retourne l'image de placeholder enregistré dans le pre-cache
function getPlaceholder(){
  return caches.open(APP_SHELL_CACHE).then(function(cache){
    return cache.match(PLACEHOLDER_SPRITE);
  });
}
function getFromCacheOrNetwork(cacheName, request, onError = null){
  return caches.open(cacheName).then(function(cache){
    return cache.match(request).then(function(cachedResult){
      if(cachedResult){
        console.log("Returned from cache " + request.url);
        return cachedResult;
      } else {
        return fetch(request).then(function(networkResult){
          cache.put(request.url, networkResult.clone());
          return networkResult;
        }).catch(function(error){
          console.log("Error fetching " + request.url, error);
          if(onError){
            return onError();
          }
        });
      }
    })
  });
}
// Événement appelé à chaque requête HTTP (chargement initial + fetch ultérieurs)
self.addEventListener('fetch', function(event){
  // Si on cherche un fichier du pre-cache => CACHE ONLY
  // Request.url = http://127.0.0.1:3000/blablabla.file
  // File dans le cache = /blablabla.file
  // Donc on utilise un replace pour retirer les parties indésirables
  if(APP_SHELL_FILES.includes(event.request.url.replace(ROOT_URL, ''))){
    event.respondWith(getFromCache(APP_SHELL_CACHE, event.request));
  }
  else if(event.request.url.startsWith('https://pokeapi.co/api/')){
    event.respondWith(getFromCacheOrNetwork(POKE_DATA_CACHE, event.request));
  }
  else if(event.request.url.startsWith('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/')){
    event.respondWith(getFromCacheOrNetwork(POKE_SPRITE_CACHE, event.request, getPlaceholder);
  }
  // Sinon je fais une requête classique
  else {
    event.respondWith(fetch(event.request));
  }
});