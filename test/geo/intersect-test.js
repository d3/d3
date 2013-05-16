var vows = require("vows"),
    _ = require("../../"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.geo.intersect");

suite.addBatch({
  "d3.geo.intersect": {
    topic: load("../test/geo/intersect-mock").expression("d3.geo.intersect"),
    "simple": function(intersect) {
      assert.deepEqual(intersect([[1, 0, 0], [0, 0, 1]], [[Math.SQRT1_2, -Math.SQRT1_2, 0], [Math.SQRT1_2, Math.SQRT1_2, 0]]), [1, 0, 0]);
    }
  }
});

suite.export(module);
