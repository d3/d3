require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.geo.interpolate");

suite.addBatch({
  "interpolate": {
    topic: function() {
      return d3.geo.interpolate;
    },
    "zero distance": function(arc) {
      assert.deepEqual(d3.geo.interpolate([140.63289, -29.95101], [140.63289, -29.95101])(.5), [140.63289, -29.95101]);
    },
    "equator": function(arc) {
      assert.inDelta(d3.geo.interpolate([10, 0], [20, 0])(.5), [15, 0], 1e-6);
    },
    "meridian": function(arc) {
      assert.inDelta(d3.geo.interpolate([10, -20], [10, 40])(.5), [10, 10], 1e-6);
    }
  }
});

suite.export(module);
