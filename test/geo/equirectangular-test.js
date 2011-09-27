require("../env");
require("../../d3");
require("../../d3.geo");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.equirectangular");

var geoTests = {
};

suite.addBatch({
  "equirectangular": {
    "zero origin": {
      topic: d3.geo.equirectangular,
      "Arctic":      testProjection([0,    85], [480, 131.944444]),
      "Antarctic":   testProjection([0,   -85], [480, 368.055555]),
      "Hawaii":      testProjection([-180,  0], [230, 250]),
      "Phillipines": testProjection([ 180,  0], [730, 250]),
      "Inversion works for non-zero translation": function() {
        var equirectangular = d3.geo.equirectangular().translate([123, 99]).scale(100),
            coords = equirectangular([0, 85]),
            lonlat = equirectangular.invert(coords);
        assert.inDelta(lonlat[0], 0, 1e-6);
        assert.inDelta(lonlat[1], 85, 1e-6);
      }
    }
  }
});

function testProjection(lonlat, expected) {
  return function(project) {
    var coords = project(lonlat);
    assert.inDelta(coords, expected, 1e-6);
    assert.inDelta(project.invert(coords), lonlat, 1e-6);
  };
}

suite.export(module);
