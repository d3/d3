var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.geo.interpolate");

suite.addBatch({
  "interpolate": {
    topic: load("geo/interpolate").expression("d3.geo.interpolate"),
    "zero distance": function(interpolate) {
      assert.deepEqual(interpolate([140.63289, -29.95101], [140.63289, -29.95101])(0.5), [140.63289, -29.95101]);
    },
    "equator": function(interpolate) {
      assert.inDelta(interpolate([10, 0], [20, 0])(0.5), [15, 0], 1e-6);
    },
    "meridian": function(interpolate) {
      assert.inDelta(interpolate([10, -20], [10, 40])(0.5), [10, 10], 1e-6);
    }
  }
});

suite.export(module);
