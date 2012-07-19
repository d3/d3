require("../env");
require("../../d3.v2");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.collignon");

suite.addBatch({
  "collignon": {
    "zero origin": {
      topic: d3.geo.collignon,
      "Arctic":      testProjection([0,    85], [480,          -581.558130]),
      "Antarctic":   testProjection([0,   -85], [480,           615.894334]),
      "Hawaii":      testProjection([-180,  0], [-1292.453850,  250]),
      "Phillipines": testProjection([ 180,  0], [ 2252.453850,  250]),
      "Inversion works for non-zero translation": function() {
        var collignon = d3.geo.collignon().translate([123, 99]).scale(100),
            coords = collignon([0, 85]),
            lonlat = collignon.invert(coords);
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
