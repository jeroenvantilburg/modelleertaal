var CACHE_NAME = 'modelleertaal-cache-v1';
var CURRENT_CACHES = CACHE_NAME;
var urlsToCache = [
  './',
  'index.html',
  'config.js',
  'sw.js',
  'scripts/registerSW.js',
  'scripts/codemirror-mode-modelleertaal.js',
  'scripts/codemirror.css',
  'scripts/codemirror.js',
  'scripts/jquery-3.2.1.min.js',
  'scripts/jquery.flot.js',
  'scripts/jquery.flot.tooltip.js',
  'scripts/modelleertaal-app.browser.js',
  'modellen/examenvwo2005.xml',
  'modellen/examenvwo2006.xml',
  'modellen/examenvwo2013.xml',
  'modellen/examenvwo2014.xml',
  'modellen/examenvwo2015.xml',
  'modellen/examenvwo2016-2.xml',
  'modellen/examenvwo2016.xml',
  'modellen/examenvwo2017-2.xml',
  'modellen/examenvwo2017.xml',
  'modellen/examenvwo2018.xml',
  'modellen/examenvwo2019-2-antwoord.xml',
  'modellen/examenvwo2019-2.xml',
  'modellen/examenvwo2021-3-antwoord.xml',
  'modellen/examenvwo2021-3-energie.xml',
  'modellen/examenvwo2021-3.xml',
  'modellen/examenvwo2022.xml',
  'modellen/leeg.xml',
  'modellen/models.js',
  'modellen/update_models.bat',
  'modellen/update_models_js.py'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  // Return without calling event.respondWith()
  // if this is a range request.
  if (event.request.headers.has('range')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

