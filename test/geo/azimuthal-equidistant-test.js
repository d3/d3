require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.azimuthalEquidistant");

suite.addBatch({
  "azimuthalEquidistant": {
    topic: function() {
      return d3.geo.azimuthalEquidistant().translate([0, 0]).scale(100);
    },
    "origin": function(projection) {
      var coords = projection([0, 0]);
      assert.inDelta(coords[0], 0, 1e-6);
      assert.inDelta(coords[1], 0, 1e-6);
      var lonlat = projection.invert(coords);
      assert.inDelta(lonlat[0], 0, 1e-6);
      assert.inDelta(lonlat[1], 0, 1e-6);
    },
    "Arctic": function(projection) {
      var coords = projection([0, 85]);
      assert.inDelta(coords[0], 0, 1e-6);
      assert.inDelta(coords[1], -148.352986, 1e-6);
      var lonlat = projection.invert(coords);
      assert.inDelta(lonlat[0], 0, 1e-6);
      assert.inDelta(lonlat[1], 85, 1e-6);
    },
    "Antarctic": function(projection) {
      var coords = projection([0, -90]);
      assert.inDelta(coords[0], 0, 1e-6);
      assert.inDelta(coords[1], 157.079632, 1e-6);
      var lonlat = projection.invert(coords);
      assert.inDelta(lonlat[0], 0, 1e-6);
      assert.inDelta(lonlat[1], -90, 1e-6);
    },
    "Hawaii": function(projection) {
      var coords = projection([-180, 0]);
      assert.inDelta(coords[0], -314.159265, 1e-6);
      assert.inDelta(coords[1], 0, 1e-6);
      var lonlat = projection.invert(coords);
      assert.inDelta(lonlat[0], -180, 1e-6);
      assert.inDelta(lonlat[1], 0, 1e-6);
    },
    "Phillipines": function(projection) {
      var coords = projection([180, 0]);
      assert.inDelta(coords[0], 314.159265, 1e-6);
      assert.inDelta(coords[1], 0, 1e-6);
      var lonlat = projection.invert(coords);
      assert.inDelta(lonlat[0], 180, 1e-6);
      assert.inDelta(lonlat[1], 0, 1e-6);
    },
    "Inversion works for non-zero translation": function() {
      var projection = d3.geo.azimuthalEquidistant().translate([123, 99]).scale(100),
          coords = projection([0, 85]),
          lonlat = projection.invert(coords);
      assert.inDelta(lonlat[0], 0, 1e-6);
      assert.inDelta(lonlat[1], 85, 1e-6);
    }
  }
});

suite.export(module);
