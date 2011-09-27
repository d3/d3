require("../env");
require("../../d3");
require("../../d3.geo");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.bonne");

suite.addBatch({
  "bonne": {
    topic: function() {
      return d3.geo.bonne();
    },
    "Arctic": function(bonne) {
      var lonlat = [0, 85],
          coords = bonne(lonlat);
      assert.inDelta(coords, [480, 92.920367], 1e-6);
      assert.inDelta(bonne.invert(coords), lonlat, 1e-6);
    },
    "Antarctic": function(bonne) {
      var lonlat = [0, -85],
          coords = bonne(lonlat);
      assert.inDelta(coords, [480, 686.332312], 1e-6);
      assert.inDelta(bonne.invert(coords), lonlat, 1e-6);
    },
    "Hawaii": function(bonne) {
      var lonlat = [-180, 0],
          coords = bonne(lonlat);
      assert.inDelta(coords, [103.604887, -22.895998], 1e-6);
      assert.inDelta(bonne.invert(coords), lonlat, 1e-6);
    },
    "Phillipines": function(bonne) {
      var lonlat = [180, 0],
          coords = bonne(lonlat);
      assert.inDelta(coords, [856.395112, -22.895998], 1e-6);
      assert.inDelta(bonne.invert(coords), lonlat, 1e-6);
    },
    "Inversion works for non-zero translation": function() {
      var bonne = d3.geo.bonne().translate([123, 99]).scale(100),
          coords = bonne([0, 85]),
          lonlat = bonne.invert(coords);
      assert.inDelta(lonlat[0], 0, 1e-6);
      assert.inDelta(lonlat[1], 85, 1e-6);
    }
  }
});

suite.export(module);
