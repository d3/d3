var globals = ["document", "window", "d3"],
    globalValues = {};

require("./globals");
require("./d3");

globals.forEach(function(g) {
  if (g in global) globalValues[g] = global[g];
});

module.exports = d3;

globals.forEach(function(g) {
  if (g in globalValues) global[g] = globalValues[g];
  else delete global[g]
});
