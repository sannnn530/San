// ==UserScript==
// ==UserName==        Block Google Analytics & Ad Trackers
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Disables Google Analytics, GTM, and blocks tracking payload network requests.
// @author       You
// @match        *://*/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 1. Disable GA tracking flags globally
    window['ga-disable-G-73ZZD7DVCL'] = true;
    window['ga-disable-UA-XXXXXX-Y'] = true;

    // 2. Mock tracking functions to prevent errors on sites that rely on them
    const noop = function () {};
    window.ga = noop;
    window.gtag = noop;

    // 3. Intercept Fetch API requests to analytics endpoints
    const originalFetch = window.fetch;
    window.fetch = function (...args) {
        const url = typeof args[0] === 'string' ? args[0] : (args[0] && args[0].url);
        if (url && (url.includes('google-analytics.com') || url.includes('/g/collect') || url.includes('analytics.google.com'))) {
            return Promise.resolve(new Response(null, { status: 200, statusText: 'Blocked by Userscript' }));
        }
        return originalFetch.apply(this, args);
    };

    // 4. Intercept XMLHttpRequest (XHR) beacons
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url) {
        if (typeof url === 'string' && (url.includes('google-analytics.com') || url.includes('/g/collect') || url.includes('analytics.google.com'))) {
            this.send = noop; // Neutralize sending payload
            return;
        }
        return originalOpen.apply(this, arguments);
    };

    // 5. Intercept navigator.sendBeacon (used for background tracking on unload/scroll)
    if (navigator.sendBeacon) {
        const originalSendBeacon = navigator.sendBeacon;
        navigator.sendBeacon = function (url, data) {
            if (typeof url === 'string' && (url.includes('google-analytics.com') || url.includes('/g/collect'))) {
                return true; // Pretend it succeeded without sending data
            }
            return originalSendBeacon.apply(this, arguments);
        };
    }
})();
