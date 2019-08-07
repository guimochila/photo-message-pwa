// Require workbox build
const { generateSW } = require('workbox-build');

generateSW({
  swDest: 'app/sw.js',
  globDirectory: 'app',
  globPatterns: ['**/*.{html,css}', 'main.js'],
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    {
      urlPattern: /\.(css|js)/,
      handler: 'CacheFirst',
    },
    {
      urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome.*/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'fontawesome',
      },
    },
  ],
}).then(({ count, size }) => {
  console.log(
    `Generated new service worker with ${count} files, totaling ${size} bytes`,
  );
});
