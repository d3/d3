var globals = ["document", "window", "navigator", "CSSStyleDeclaration", "getComputedStyle"],
    globalValues = {};

globals.forEach(function(g) {
    if (g in global) {
		console.log("Warning: found pre-existing global: " + g);
		globalValues[g] = global[g];
    }
});

require("./globals");
require("./d3");

module.exports = d3;

globals.forEach(function(g) {
  //restore pre-existing globals
  if (g in globalValues) global[g] = globalValues[g];
});
