Push.config({
    serviceWorker: '/y-serviceworker/y-serviceworker.js', // Sets a custom service worker script
    fallback: function(payload) {
        Push.create("Hello")
    }
});