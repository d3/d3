var document = require("jsdom").jsdom(),
    globals = {};

// Stash old globals.
if ("d3" in global) globals.d3 = global.d3;
if ("window" in global) globals.window = global.window;
if ("document" in global) globals.document = global.document;

// Set temporary globals to pretend we’re in a browser.
global.window = document.parentWindow;
global.document = document;

module.exports = require("./d3");

// Restore old globals.
if ("d3" in globals) global.d3 = globals.d3; else delete global.d3;
if ("window" in globals) global.window = globals.window; else delete global.window;
if ("document" in globals) global.document = globals.document; else delete global.document;
