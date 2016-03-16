var tape = require("tape"),
    d3 = require("../");

tape("version matches package.json", function(test) {
  test.equal(d3.version, require("../package.json").version);
  test.end();
});
