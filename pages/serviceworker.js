const CACHE_NAME = 'Ceylon-Tea';
const CACHE_URLS =  ['Index.html',                      
                     '../images/contact-bg1.webp',
                     '../images/buyNow.webp',
                     '../images/contact-box.webp',
                     '../images/leavesBG.webp',
                     '../images/bg.webp',
                     '../images/manufac.webp',
                     '../images/contactBG2.webp'];
                   
self.addEventListener("install", function(event){
    console.log("Service worker installed");
    event.waitUntil(
        //create and open cache
        caches.open(CACHE_NAME)
            .then(function(cache){
                console.log("Cache opened");
                //add all URLs to cache
                return cache.addAll(CACHE_URLS);
        })
    );
});

  