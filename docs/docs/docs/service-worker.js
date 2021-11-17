(function() {

'use strict';

// Licensed under a CC0 1.0 Universal (CC0 1.0) Public Domain Dedication
// http://creativecommons.org/publicdomain/zero/1.0/
  // Update 'version' if you need to refresh the cache
  var staticCacheName = 'static';
  var version = 'lvd1::sitesociete';

  // Store core files in a cache (including a page to display when offline)
  function updateStaticCache() {
      return caches.open(version + staticCacheName)
          .then(function (cache) {
              return cache.addAll([
                  '/sitesociete/js/main.js',
                  '/sitesociete/js/vendor/',
                  '/sitesociete/css/main.css/',
                  '/sitesociete/css/materialize.min.css',                  
                  '/sitesociete/img/roman-kraft-208004-unsplash.png',
                  '/sitesociete/img/img/products/in-plant-2.png',
                  '/sitesociete/img/img/products/ou-plant-0.png',
                  '/sitesociete/img/img/products/ambiance-out-1.png',
                  '/sitesociete/img/img/products/ambiance-int-1.png',
                  '/sitesociete/img/img/products/ambiance-out-1.png',
                  '/sitesociete/img/img/insta/insta1.png',
                  '/sitesociete/img/img/insta/insta2.png',
                  '/sitesociete/img/img/insta/insta3.png',
                  '/sitesociete/',
                  '/sitesociete/index.html',
                  '/sitesociete/offline.html'
              ]);
          });
  };

  self.addEventListener('install', function (event) {
      event.waitUntil(updateStaticCache());
  });

  self.addEventListener('activate', function (event) {
      event.waitUntil(
          caches.keys()
              .then(function (keys) {
                  // Remove caches whose name is no longer valid
                  return Promise.all(keys
                      .filter(function (key) {
                        return key.indexOf(version) !== 0;
                      })
                      .map(function (key) {
                        return caches.delete(key);
                      })
                  );
              })
      );
  });

  self.addEventListener('fetch', function (event) {
      var request = event.request;
      // Always fetch non-GET requests from the network
      if (request.method !== 'GET') {
          event.respondWith(
              fetch(request)
                  .catch(function () {
                      return caches.match('/sitevitrine/offline.html');
                  })
          );
          return;
      }

      // For HTML requests, try the network first, fall back to the cache, finally the offline page
      if (request.headers.get('Accept').indexOf('text/html') !== -1) {
          // Fix for Chrome bug: https://code.google.com/p/chromium/issues/detail?id=573937
          if (request.mode != 'navigate') {
              request = new Request(request.url, {
                  method: 'GET',
                  headers: request.headers,
                  mode: request.mode,
                  credentials: request.credentials,
                  redirect: request.redirect
              });
          }
          event.respondWith(
              fetch(request)
                  .then(function (response) {
                      // Stash a copy of this page in the cache
                      var copy = response.clone();
                      caches.open(version + staticCacheName)
                          .then(function (cache) {
                              cache.put(request, copy);
                          });
                      return response;
                  })
                  .catch(function () {
                      return caches.match(request)
                          .then(function (response) {
                              return response || caches.match('/sitesociete/offline.html');
                          })
                  })
          );
          return;
      }

      // For non-HTML requests, look in the cache first, fall back to the network
      event.respondWith(
          caches.match(request)
              .then(function (response) {
                  return response || fetch(request)
                      .catch(function () {
                          // If the request is for an image, show an offline placeholder
                          if (request.headers.get('Accept').indexOf('image') !== -1) {
                              return new Response('<svg width="400" height="300" role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline Site Vitrine LVdesign</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>', { headers: { 'Content-Type': 'image/svg+xml' }});
                          }
                      });
              })
      );
  });

})();
