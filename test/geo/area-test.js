var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.geo.area");

var π = Math.PI;

suite.addBatch({
  "area": {
    topic: load("geo/area", "geo/circle", "geo/graticule", "arrays/range"),
    "Point": function(d3) {
      assert.equal(d3.geo.area({type: "Point", coordinates: [0, 0]}), 0);
    },
    "MultiPoint": function(d3) {
      assert.equal(d3.geo.area({type: "MultiPoint", coordinates: [[0, 1], [2, 3]]}), 0);
    },
    "LineString": function(d3) {
      assert.equal(d3.geo.area({type: "LineString", coordinates: [[0, 1], [2, 3]]}), 0);
    },
    "MultiLineString": function(d3) {
      assert.equal(d3.geo.area({type: "MultiLineString", coordinates: [[[0, 1], [2, 3]], [[4, 5], [6, 7]]]}), 0);
    },
    "Polygon": {
      "tiny": function(d3) {
        assert.inDelta(d3.geo.area({type: "Polygon", coordinates: [[
          [-64.66070178517852, 18.33986913231323],
          [-64.66079715091509, 18.33994007490749],
          [-64.66074946804680, 18.33994007490749],
          [-64.66070178517852, 18.33986913231323]
        ]]}), 4.890516e-13, 1e-13);
      },
      "semilune": function(d3) {
        assert.inDelta(d3.geo.area({type: "Polygon", coordinates: [[[0, 0], [0, 90], [90, 0], [0, 0]]]}), π / 2, 1e-6);
      },
      "lune": function(d3) {
        assert.equal(d3.geo.area({type: "Polygon", coordinates: [[[0, 0], [0, 90], [90, 0], [0, -90], [0, 0]]]}), π);
      },
      "hemispheres": {
        "North": function(d3) {
          assert.inDelta(d3.geo.area({type: "Polygon", coordinates: [[[0, 0], [-90, 0], [180, 0], [90, 0], [0, 0]]]}), 2 * π, 1e-6);
        },
        "South": function(d3) {
          assert.inDelta(d3.geo.area({type: "Polygon", coordinates: [[[0, 0], [90, 0], [180, 0], [-90, 0], [0, 0]]]}), 2 * π, 1e-6);
        },
        "East": function(d3) {
          assert.equal(d3.geo.area({type: "Polygon", coordinates: [[[0, 0], [0, 90], [180, 0], [0, -90], [0, 0]]]}), 2 * π);
        },
        "West": function(d3) {
          assert.equal(d3.geo.area({type: "Polygon", coordinates: [[[0, 0], [0, -90], [180, 0], [0, 90], [0, 0]]]}), 2 * π);
        }
      },
      "graticule outline": {
        "sphere": function(d3) {
          assert.inDelta(d3.geo.area(d3.geo.graticule().extent([[-180, -90], [180, 90]]).outline()), 4 * π, 1e-5);
        },
        "hemisphere": function(d3) {
          assert.inDelta(d3.geo.area(d3.geo.graticule().extent([[-180, 0], [180, 90]]).outline()), 2 * π, 1e-5);
        },
        "semilune": function(d3) {
          assert.inDelta(d3.geo.area(d3.geo.graticule().extent([[0, 0], [90, 90]]).outline()), π / 2, 1e-5);
        }
      },
      "circles": {
        "hemisphere": function(d3) {
          assert.inDelta(d3.geo.area(d3.geo.circle().angle(90)()), 2 * π, 1e-5);
        },
        "60°": function(d3) {
          assert.inDelta(d3.geo.area(d3.geo.circle().angle(60).precision(.1)()), π, 1e-5);
        },
        "60° North": function(d3) {
          assert.inDelta(d3.geo.area(d3.geo.circle().angle(60).precision(.1).origin([0, 90])()), π, 1e-5);
        },
        "45°": function(d3) {
          assert.inDelta(d3.geo.area(d3.geo.circle().angle(45).precision(.1)()), π * (2 - Math.SQRT2), 1e-5);
        },
        "45° North": function(d3) {
          assert.inDelta(d3.geo.area(d3.geo.circle().angle(45).precision(.1).origin([0, 90])()), π * (2 - Math.SQRT2), 1e-5);
        },
        "45° South": function(d3) {
          assert.inDelta(d3.geo.area(d3.geo.circle().angle(45).precision(.1).origin([0, -90])()), π * (2 - Math.SQRT2), 1e-5);
        },
        "135°": function(d3) {
          assert.inDelta(d3.geo.area(d3.geo.circle().angle(135).precision(.1)()), π * (2 + Math.SQRT2), 1e-5);
        },
        "135° North": function(d3) {
          assert.inDelta(d3.geo.area(d3.geo.circle().angle(135).precision(.1).origin([0, 90])()), π * (2 + Math.SQRT2), 1e-5);
        },
        "135° South": function(d3) {
          assert.inDelta(d3.geo.area(d3.geo.circle().angle(135).precision(.1).origin([0, -90])()), π * (2 + Math.SQRT2), 1e-5);
        },
        "tiny": function(d3) {
          assert.inDelta(d3.geo.area(d3.geo.circle().angle(1e-6).precision(.1)()), 0, 1e-6);
        },
        "huge": function(d3) {
          assert.inDelta(d3.geo.area(d3.geo.circle().angle(180 - 1e-6).precision(.1)()), 4 * π, 1e-6);
        },
        "60° with 45° hole": function(d3) {
          var circle = d3.geo.circle().precision(.1);
          assert.inDelta(d3.geo.area({
            type: "Polygon",
            coordinates: [
              circle.angle(60)().coordinates[0],
              circle.angle(45)().coordinates[0].reverse()
            ]
          }), π * (Math.SQRT2 - 1), 1e-5);
        },
        "45° holes at [0°, 0°] and [0°, 90°]": function(d3) {
          var circle = d3.geo.circle().precision(.1).angle(45);
          assert.inDelta(d3.geo.area({
            type: "Polygon",
            coordinates: [
              circle.origin([0, 0])().coordinates[0].reverse(),
              circle.origin([0, 90])().coordinates[0].reverse()
            ]
          }), π * 2 * Math.SQRT2, 1e-5);
        },
        "45° holes at [0°, 90°] and [0°, 0°]": function(d3) {
          var circle = d3.geo.circle().precision(.1).angle(45);
          assert.inDelta(d3.geo.area({
            type: "Polygon",
            coordinates: [
              circle.origin([0, 90])().coordinates[0].reverse(),
              circle.origin([0, 0])().coordinates[0].reverse()
            ]
          }), π * 2 * Math.SQRT2, 1e-5);
        }
      },
      "stripes": {
        "45°, -45°": function(d3) {
          assert.inDelta(d3.geo.area(stripes(d3, 45, -45)), π * 2 * Math.SQRT2, 1e-5);
        },
        "-45°, 45°": function(d3) {
          assert.inDelta(d3.geo.area(stripes(d3, -45, 45)), π * 2 * (2 - Math.SQRT2), 1e-5);
        },
        "45°, 30°": function(d3) {
          assert.inDelta(d3.geo.area(stripes(d3, 45, 30)), π * (Math.SQRT2 - 1), 1e-5);
        }
      }
    },
    "MultiPolygon": {
      "two hemispheres": function(d3) {
        assert.equal(d3.geo.area({type: "MultiPolygon", coordinates: [
          [[[0, 0], [-90, 0], [180, 0], [90, 0], [0, 0]]],
          [[[0, 0], [90, 0], [180, 0], [-90, 0], [0, 0]]]
        ]}), 4 * π);
      }
    },
    "Sphere": function(d3) {
      assert.equal(d3.geo.area({type: "Sphere"}), 4 * π);
    },
    "GeometryCollection": function(d3) {
      assert.equal(d3.geo.area({type: "GeometryCollection", geometries: [{type: "Sphere"}]}), 4 * π);
    },
    "FeatureCollection": function(d3) {
      assert.equal(d3.geo.area({type: "FeatureCollection", features: [{type: "Feature", geometry: {type: "Sphere"}}]}), 4 * π);
    },
    "Feature": function(d3) {
      assert.equal(d3.geo.area({type: "Feature", geometry: {type: "Sphere"}}), 4 * π);
    }
  }
});

suite.export(module);

function stripes(d3, a, b) {
  return {type: "Polygon", coordinates: [a, b].map(function(d, i) {
    var stripe = d3.range(-180, 180, .1).map(function(x) { return [x, d]; });
    stripe.push(stripe[0]);
    return i ? stripe.reverse() : stripe;
  })};
}
