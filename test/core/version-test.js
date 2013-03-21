var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.version");

suite.addBatch({
  "version": {
    topic: load().expression("d3.version"),
    "has the form major.minor.patch": function(version) {
      assert.match(version, /^[0-9]+\.[0-9]+\.[0-9]+/);
    }
  }
});

suite.export(module);
