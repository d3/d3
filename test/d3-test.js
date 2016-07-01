var tape = require("tape"),
    d3 = require("../"),
    testExports = require("./test-exports");

tape("version matches package.json", function(test) {
  test.equal(d3.version, require("../package.json").version);
  test.end();
});

for (var dependency in require("../package.json").dependencies) {
  testExports(dependency);
}
