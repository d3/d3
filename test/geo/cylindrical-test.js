require("../env");
require("../../d3");
require("../../d3.geo");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.cylindrical");

suite.addBatch({
  "cylindrical": {
    "equidistant": {
      "zero origin": {
        topic: d3.geo.cylindrical,
        "Arctic":      testProjection([0,    85], [480, 131.944444]),
        "Antarctic":   testProjection([0,   -85], [480, 368.055555]),
        "Hawaii":      testProjection([-180,  0], [230, 250]),
        "Phillipines": testProjection([ 180,  0], [730, 250]),
        "Inversion works for non-zero translation": function() {
          var cylindrical = d3.geo.cylindrical().translate([123, 99]).scale(100),
              coords = cylindrical([0, 85]),
              lonlat = cylindrical.invert(coords);
          assert.inDelta(lonlat[0], 0, 1e-6);
          assert.inDelta(lonlat[1], 85, 1e-6);
        }
      }
    },
    "equalarea": {
      "zero origin": {
        topic: function() { return d3.geo.conic().mode("equalarea").parallels(0).origin([0, 0]).scale(500); },
        "Arctic":      testProjection([0,    85], [480, 170.725344]),
        "Antarctic":   testProjection([0,   -85], [480, 329.274655]),
        "Hawaii":      testProjection([-180,  0], [230, 250]),
        "Phillipines": testProjection([ 180,  0], [730, 250]),
        "Inversion works for non-zero translation": function() {
          var cylindrical = d3.geo.cylindrical().mode("equalarea").translate([123, 99]).scale(100),
              coords = cylindrical([0, 85]),
              lonlat = cylindrical.invert(coords);
          assert.inDelta(lonlat[0], 0, 1e-6);
          assert.inDelta(lonlat[1], 85, 1e-6);
        }
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
