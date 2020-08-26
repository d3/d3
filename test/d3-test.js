var tape = require("tape-await"),
    d3 = require("../"),
    d3Selection = require("d3-selection"),
    testExports = require("./test-exports");

tape("version matches package.json", function(test) {
  test.equal(d3.version, require("../package.json").version);
});

for (var dependency in require("../package.json").dependencies) {
  testExports(dependency);
}
