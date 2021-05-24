self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([
                "./index.html", "./login.html", "./home.html", "./album.html", "./artist.html", "./search.html",
                "./stylesheets/master.css", "./stylesheets/home.css", "./stylesheets/artist.css", "./stylesheets/album.css", "./stylesheets/search.css", "./stylesheets/spotify-style.css",
                "../src/index.js", "../src/include.js", "../src/components/display.css", "../src/components/display.js",
                "../images/logo144.png"
            ])
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
})