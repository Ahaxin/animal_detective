const CACHE='animal-detective-studio-v7';
const FILES=['./','./index.html','./game.js','./orchard.js','./studio.js','./assets/missRabbit.svg','./assets/skunk.svg','./assets/parrot.svg','./assets/bear.svg','./assets/raccoon.svg','./assets/monkey.svg','./world3d.bundle.js','./game-screen.css','./mobile.js','./manifest.webmanifest','./assets/favicon.svg','./assets/icon-192.png','./assets/icon-512.png',...['garden','garden-portrait','bird','fox','squirrel','mole','owl'].map(name=>`./assets/${name}.webp`)];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('animal-detective-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 if(event.request.mode==='navigate'){
  event.respondWith(fetch(event.request).catch(()=>caches.match('./index.html')));
  return;
 }
 // Only the explicitly listed game shell is cached, never login or API responses.
 event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
});

