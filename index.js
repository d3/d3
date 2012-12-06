var self = this,
    globals = ["document", "window", "navigator", "CSSStyleDeclaration", "d3", "Sizzle"],
    globalValues = {};

globals.forEach(function(global) {
  if (global in self) globalValues[global] = self[global];
});

document = require("jsdom").jsdom("<html><head></head><body></body></html>");
window = document.createWindow();
navigator = window.navigator;
CSSStyleDeclaration = window.CSSStyleDeclaration;

Sizzle = require("sizzle");

require("./d3");

module.exports = d3;

globals.forEach(function(global) {
  if (global in globalValues) self[global] = globalValues[global];
  else delete self[global];
});
