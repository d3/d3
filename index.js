var document = require("jsdom").jsdom("<html><head></head><body></body></html>"),
    window = document.parentWindow,
    globals = {};

// stash globals
if ("window" in global) globals.window = global.window;
global.window = window;
if ("document" in global) globals.document = global.document;
global.document = document;

module.exports = require("./d3");

// restore globals
if ("window" in globals) global.window = globals.window;
else delete global.window;
if ("document" in globals) global.document = globals.document;
else delete global.document;
