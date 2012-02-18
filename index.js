var self = this,
    globals = ["document", "window", "navigator", "CSSStyleDeclaration", "d3"],
    globalValues = {};

globals.forEach(function(global) {
  if (global in self) globalValues[global] = self[global];
});

document = require("jsdom").jsdom("<html><head></head><body></body></html>");
window = document.createWindow();
navigator = window.navigator;
CSSStyleDeclaration = window.CSSStyleDeclaration;

require("./d3");
require("./d3.csv");
require("./d3.geo");
require("./d3.geom");
require("./d3.layout");
require("./d3.time");

module.exports = d3;

globals.forEach(function(global) {
  if (global in globalValues) self[global] = globalValues[global];
  else delete self[global];
});
