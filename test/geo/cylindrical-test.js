require("../env");
require("../../d3.v2");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.cylindrical");

suite.addBatch({
  "cylindrical": {
    "equirectangular": {
      topic: function() {
        return d3.geo.equirectangular().scale(500);
      },
      "scale": {
        "is coerced to a number": function(projection) {
          assert.strictEqual(projection.scale("400"), projection);
          assert.strictEqual(projection.scale(), 400);
          projection.scale(500);
        }
      },
      "translate": {
        "defaults to [480, 250]": function(projection) {
          assert.deepEqual(projection.translate(), [480, 250]);
        },
        "is coerced to two numbers": function(projection) {
          assert.strictEqual(projection.translate(["23", "141"]), projection);
          assert.strictEqual(projection.translate()[0], 23);
          assert.strictEqual(projection.translate()[1], 141);
          projection.translate([480, 250]);
        }
      },
      "of San Francisco, CA": {
        "is at location [-122.446, 37.767]": function(projection) {
          assert.inDelta(projection.invert([310, 198]), [-122.446, 37.767], .5);
        },
        "is at point [310, 198]": function(projection) {
          assert.inDelta(projection([-122.446, 37.767]), [310, 198], .5);
        }
      }
    },
    "equidistant": {
      "zero origin": {
        topic: function() { return d3.geo.cylindrical().mode("equidistant").scale(500 / (2 * Math.PI)); },
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
        topic: function() { return d3.geo.cylindrical().mode("equalarea").scale(500 / (2 * Math.PI)); },
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
