require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.geo.rotation");

suite.addBatch({
  "a rotation of [+90°, 0°]": {
    topic: function() {
      return d3.geo.rotation([90, 0]);
    },
    "only rotates longitude": function(rotation) {
      assert.inDelta(rotation([0, 0]), [90, 0], 1e-6);
    },
    "wraps around when crossing the antimeridian": function(rotation) {
      assert.inDelta(rotation([150, 0]), [-120, 0], 1e-6);
    }
  },
  "a rotation of [-45°, -45°]": {
    topic: function() {
      return d3.geo.rotation([-45, 45]);
    },
    "rotates longitude and latitude": function(rotation) {
      assert.inDelta(rotation([0, 0]), [-54.73561, 30], 1e-6);
    }
  }
});

suite.export(module);
