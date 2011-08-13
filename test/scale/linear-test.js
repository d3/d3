require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

vows.describe("d3.scale.linear").addBatch({
  "default instance": {
    topic: d3.scale.linear,
    "has the domain [0, 1]": function(x) {
      assert.deepEqual(x.domain(), [0, 1]);
    },
    "has the range [0, 1]": function(x) {
      assert.deepEqual(x.range(), [0, 1]);
    }
  }
}).export(module);
