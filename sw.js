const urlsToCache = [
  "/",
  "/index.html",
  "/pages/settings.html",
  "/pages/table.html",

  "/scripts/dashboardChart.js",
  "/scripts/db.js",
  "/scripts/handleAddForm.js",
  "/scripts/handleEdit.js",
  "/scripts/handleMonthYearSelector.js",
  "/scripts/index.js",
  "/scripts/settings.js",
  "/scripts/table.js",
  "/scripts/core.js",

  "/styles/common.css",
  "/styles/settings.css",

  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",

  "https://cdn.jsdelivr.net/npm/chart.js",
  "https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels",

  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/webfonts/fa-solid-900.woff2",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/webfonts/fa-brands-400.woff2",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open("v1").then((cache) => cache.addAll(urlsToCache)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
  console.log("Service worker activated");
});

self.addEventListener("fetch", (event) => {  
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {      
        if(cachedResponse !== undefined) {           
          return cachedResponse;
        } else {        
          return fetch(event.request).then((response) => {
              let responseClone = response.clone();
              if (event.request.url.includes("404") || event.request.url.includes("https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png")) {
                  return fetch(event.request);
              }
              caches.open("v1").then((cache) => {
                  cache.put(event.request, responseClone);
              });
              return response;
          })
          .catch((err) => {
            console.log("No Internet: ", err);
            return new Response("No Internet");
          });
        }
    })
  );
});
