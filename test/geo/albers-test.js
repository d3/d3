require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.albers");

suite.addBatch({
  "albers": {
    topic: function() {
      return d3.geo.albers();
    },
    "Arctic": function(albers) {
      var coords = albers([0, 85]);
      assert.inDelta(coords[0], 1031.393796, 1e-6);
      assert.inDelta(coords[1], -714.160436, 1e-6);
      var lonlat = albers.invert(coords);
      assert.inDelta(lonlat[0], 0, 1e-6);
      assert.inDelta(lonlat[1], 85, 1e-6);
    },
    "Antarctic": function(albers) {
      var coords = albers([0, -85]);
      assert.inDelta(coords[0], 2753.458335, 1e-6);
      assert.inDelta(coords[1],  317.371122, 1e-6);
      var lonlat = albers.invert(coords);
      assert.inDelta(lonlat[0], 0, 1e-6);
      assert.inDelta(lonlat[1], -85, 1e-6);
    },
    "Hawaii": function(albers) {
      var coords = albers([-180, 0]);
      assert.inDelta(coords[0], -984.779405, 1e-6);
      assert.inDelta(coords[1],  209.571197, 1e-6);
      var lonlat = albers.invert(coords);
      assert.inDelta(lonlat[0], -180, 1e-6);
      assert.inDelta(lonlat[1], 0, 1e-6);
    },
    "Phillipines": function(albers) {
      var coords = albers([180, 0]);
      assert.inDelta(coords[0],   894.435228, 1e-6);
      assert.inDelta(coords[1], -2927.636630, 1e-6);
      var lonlat = albers.invert(coords);
      assert.inDelta(lonlat[0], 180, 1e-6);
      assert.inDelta(lonlat[1], 0, 1e-6);
    },
    "Inversion works for non-zero translation": function() {
      var albers = d3.geo.albers().translate([123, 99]).scale(100),
          coords = albers([0, 85]),
          lonlat = albers.invert(coords);
      assert.inDelta(lonlat[0], 0, 1e-6);
      assert.inDelta(lonlat[1], 85, 1e-6);
    }
  }
});

suite.export(module);
