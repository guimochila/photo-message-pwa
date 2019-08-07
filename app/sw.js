/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "46b986f02ebe2b995e04b21b805ccd63"
  },
  {
    "url": "main.js",
    "revision": "9f1c0670bdbcb6c9d2f54a5307a4765e"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(css|js)/, new workbox.strategies.CacheFirst(), 'GET');
workbox.routing.registerRoute(/^https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome.*/, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"fontawesome", plugins: [] }), 'GET');
