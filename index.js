var document = require("jsdom").jsdom("<html><head></head><body></body></html>"),
    window = document.createWindow(),
    globals = {};

// stash globals
if ("window" in global) globals.window = global.window;
global.window = window;
if ("document" in global) globals.document = global.document;
global.document = document;

// https://github.com/chad3814/CSSStyleDeclaration/issues/3
var CSSStyleDeclaration_prototype = window.CSSStyleDeclaration.prototype,
    CSSStyleDeclaration_setProperty = CSSStyleDeclaration_prototype.setProperty;
CSSStyleDeclaration_prototype.setProperty = function(name, value, priority) {
  return CSSStyleDeclaration_setProperty.call(this, name + "", value == null ? null : value + "", priority == null ? null : priority + "");
};

module.exports = require("./d3");

// restore globals
if ("window" in globals) global.window = globals.window;
else delete global.window;
if ("document" in globals) global.document = globals.document;
else delete global.document;
