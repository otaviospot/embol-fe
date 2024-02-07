module.exports = {
  globDirectory: 'build/',
  globPatterns: ['**/*.{html,js,css,png,jpg,jpeg,svg}'],
  swSrc: 'public/custom-service-worker.js', // Seu service worker personalizado
  swDest: 'build/custom-service-worker.js', // Destino após a build
  maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
};
