document = require("jsdom").jsdom("<html><head></head><body></body></html>");
window = document.createWindow();
navigator = window.navigator;

require("../lib/sizzle/sizzle");
Sizzle = window.Sizzle;

process.env.TZ = "America/Los_Angeles";

require("./env-assert");
require("./env-xhr");
require("./env-fragment");
