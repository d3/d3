var tape = require("tape"),
    d3 = require("../");

module.exports = function(moduleName) {
  var module = require(moduleName);
  tape("d3 exports everything from " + moduleName, function(test) {
    for (var symbol in module) {
      if (symbol !== "version") {
        test.equal(symbol in d3, true, moduleName + " export " + symbol);
      }
    }
    test.end();
  });
};
