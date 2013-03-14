var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.version");

suite.addBatch({
  "version": {
    topic: load(),
    "has the form major.minor.patch": function(d3) {
      assert.match(d3.version, /^[0-9]+\.[0-9]+\.[0-9]+/);
    }
  }
});

suite.export(module);
