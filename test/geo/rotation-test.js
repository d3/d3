var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.geo.rotation");

suite.addBatch({
  "rotation": {
    topic: load("geo/rotation").expression("d3.geo.rotation"),
    "a rotation of [+90°, 0°]": {
      topic: function(rotation) {
        return rotation([90, 0]);
      },
      "only rotates longitude": function(rotation) {
        assert.inDelta(rotation([0, 0]), [90, 0], 1e-6);
      },
      "wraps around when crossing the antimeridian": function(rotation) {
        assert.inDelta(rotation([150, 0]), [-120, 0], 1e-6);
      }
    },
    "a rotation of [-45°, -45°]": {
      topic: function(rotation) {
        return rotation([-45, 45]);
      },
      "rotates longitude and latitude": function(rotation) {
        assert.inDelta(rotation([0, 0]), [-54.73561, 30], 1e-6);
      },
      "inverse rotation of longitude and latitude": function(rotation) {
        assert.inDelta(rotation.invert([-54.73561, 30]), [0, 0], 1e-6);
      }
    }
  }
});

suite.export(module);
