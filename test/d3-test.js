var tape = require("tape"),
    d3 = require("../"),
    d3Selection = require("d3-selection"),
    testExports = require("./test-exports");

tape("version matches package.json", function(test) {
  test.equal(d3.version, require("../package.json").version);
  test.end();
});

tape("d3.event is a getter for d3Selection.event", function(test) {
  test.equal(d3.event, null);
  try {
    d3Selection.event = 42;
    test.equal(d3.event, 42);
  } finally {
    d3Selection.event = null;
  }
  test.end();
});

for (var dependency in require("../package.json").dependencies) {
  testExports(dependency);
}
