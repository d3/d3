document = require("jsdom").jsdom("<html><head></head><body></body></html>");
window = document.createWindow();
navigator = window.navigator;
CSSStyleDeclaration = window.CSSStyleDeclaration;

require("../lib/sizzle/sizzle");
Sizzle = window.Sizzle;
getComputedStyle = window.getComputedStyle;

process.env.TZ = "America/Los_Angeles";

require("./env-assert");
require("./env-xhr");
require("./env-fragment");

require("../d3");
