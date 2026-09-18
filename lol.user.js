// ==UserScript==
// @name         Block Kahoot - Terms of Service Violation
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Displays an Access Denied message on Kahoot domains due to violent content ToS violations.
// @author       You
// @match        *://*.kahoot.it/*
// @match        *://*.kahoot.com/*
// @run-at       document-start
// @grant        none
// ==UserScript==

(function() {
    'use strict';

    // Stop original page resources from loading
    window.stop();

    // Overwrite the DOM with the block screen
    document.documentElement.innerHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Access Denied</title>
            <style>
                body {
                    background-color: #0f0f11;
                    color: #ffffff;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .card {
                    background-color: #1a1a1e;
                    border: 1px solid #2e2e35;
                    border-radius: 12px;
                    padding: 40px;
                    max-width: 480px;
                    text-align: center;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                }
                .icon {
                    font-size: 48px;
                    margin-bottom: 16px;
                }
                h1 {
                    color: #ff4d4d;
                    font-size: 24px;
                    margin: 0 0 12px 0;
                }
                p {
                    color: #a0a0ab;
                    font-size: 15px;
                    line-height: 1.6;
                    margin: 0 0 20px 0;
                }
                .badge {
                    display: inline-block;
                    background-color: #2b1515;
                    color: #ff8080;
                    border: 1px solid #5c2424;
                    padding: 6px 12px;
                    border-radius: 6px;
                    font-family: monospace;
                    font-size: 13px;
                }
            </style>
        </head>
        <body>
            <div class="card">
                <div class="icon">🚫</div>
                <h1>Access Denied</h1>
                <p>Access to this domain has been blocked due to a violation of our <strong>Terms of Service</strong> regarding violence and safety policy guidelines.</p>
                <div class="badge">REASON: TOS_VIOLATION_VIOLENCE</div>
            </div>
        </body>
        </html>
    `;
})();
