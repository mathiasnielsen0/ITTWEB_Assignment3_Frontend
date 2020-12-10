let CACHE = "StaleWhileRevalidate";


function fromNetwork(request, timeout) {
    console.log("from network")
    return new Promise(function (fulfill, reject) {

        var timeoutId = setTimeout(reject, timeout);

        fetch(request).then(function (response) {
            clearTimeout(timeoutId);
            fulfill(response);

        }, reject);
    });
}

self.addEventListener('install', (event) => {
    console.log("installing service worker")
    console.log(GetCacheFiles())
    event.waitUntil(async function () {
        const cache = await caches.open(CACHE);
        let files = await GetCacheFiles();

        return await cache.addAll(files);
    });
});

fetch("/asset-manifest.json", {
    method: "GET"
}).then(function (response) {
    if (response.ok) {
        return response.json()
    }
}).then(function (data) {
    let files = [];
    Object.keys(data.files).forEach(item => {
        files.push("./" + data.files[item])
    });
    console.log(files)
    return files;
});


self.addEventListener('fetch', function (evt) {


    evt.respondWith(fromCache(evt.request));

    evt.waitUntil(update(evt.request).then(function (response) {

    }));
});


function fromCache(request) {
    console.log('The service worker is serving the asset from cache');
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        }).catch(function () {
            return fromNetwork(request, 5000);
        });
    });
}


function update(request) {

    return caches.open(CACHE).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response.clone()).then(function () {
                return response;
            });
        });
    });

}


async function GetCacheFiles() {
    return fetch( "https://" + window.location.hostname + "/asset-manifest.json", {
        method: "GET"
    }).then(function (response) {
        if (response.ok) {
            return response.json()
        }
    }).then(function (data) {
        let files = [];
        Object.keys(data.files).forEach(item => {
            files.push("." + data.files[item])
        });
        Object.keys(data.entrypoints).forEach(item => {
            files.push("." + data.entrypoints[item])
        });
        console.log(files)
        return files;
    });
}