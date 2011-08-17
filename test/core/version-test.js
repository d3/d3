require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.version");

suite.addBatch({
  "semantic versioning": {
    topic: d3.version,
    "has the form major.minor.patch": function(version) {
      assert.match(version, /^[0-9]+\.[0-9]+\.[0-9]+$/);
    }
  }
});

suite.export(module);
