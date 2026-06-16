const CACHE = "bio-112-v1"

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) =>
      cache.addAll(["/", "/index.html", "/icon-512.jpg"])
    )
  )
})

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  )
})
