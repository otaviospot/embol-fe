/* eslint-disable */

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js'
);

// Precache assets
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// Cache CSS and JS Files
workbox.routing.registerRoute(
  ({ request }) =>
    request.destination === 'style' || request.destination === 'script',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

// Cache Images
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

// Cache para requisições da API

workbox.routing.registerRoute(
  ({ url }) =>
    url.origin === 'https://embol-yzffe.ondigitalocean.app' &&
    url.pathname.startsWith('/api'),
  new workbox.strategies.NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 7, // 1 semana
      }),
    ],
  })
);
