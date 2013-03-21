var vows = require("vows"),
    _ = require("../../"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.geo.area");

var π = Math.PI;

suite.addBatch({
  "area": {
    topic: load("geo/area").expression("d3.geo.area"),
    "Point": function(area) {
      assert.equal(area({type: "Point", coordinates: [0, 0]}), 0);
    },
    "MultiPoint": function(area) {
      assert.equal(area({type: "MultiPoint", coordinates: [[0, 1], [2, 3]]}), 0);
    },
    "LineString": function(area) {
      assert.equal(area({type: "LineString", coordinates: [[0, 1], [2, 3]]}), 0);
    },
    "MultiLineString": function(area) {
      assert.equal(area({type: "MultiLineString", coordinates: [[[0, 1], [2, 3]], [[4, 5], [6, 7]]]}), 0);
    },
    "Polygon": {
      "tiny": function(area) {
        assert.inDelta(area({type: "Polygon", coordinates: [[
          [-64.66070178517852, 18.33986913231323],
          [-64.66079715091509, 18.33994007490749],
          [-64.66074946804680, 18.33994007490749],
          [-64.66070178517852, 18.33986913231323]
        ]]}), 4.890516e-13, 1e-13);
      },
      "semilune": function(area) {
        assert.inDelta(area({type: "Polygon", coordinates: [[[0, 0], [0, 90], [90, 0], [0, 0]]]}), π / 2, 1e-6);
      },
      "lune": function(area) {
        assert.equal(area({type: "Polygon", coordinates: [[[0, 0], [0, 90], [90, 0], [0, -90], [0, 0]]]}), π);
      },
      "hemispheres": {
        "North": function(area) {
          assert.inDelta(area({type: "Polygon", coordinates: [[[0, 0], [-90, 0], [180, 0], [90, 0], [0, 0]]]}), 2 * π, 1e-6);
        },
        "South": function(area) {
          assert.inDelta(area({type: "Polygon", coordinates: [[[0, 0], [90, 0], [180, 0], [-90, 0], [0, 0]]]}), 2 * π, 1e-6);
        },
        "East": function(area) {
          assert.equal(area({type: "Polygon", coordinates: [[[0, 0], [0, 90], [180, 0], [0, -90], [0, 0]]]}), 2 * π);
        },
        "West": function(area) {
          assert.equal(area({type: "Polygon", coordinates: [[[0, 0], [0, -90], [180, 0], [0, 90], [0, 0]]]}), 2 * π);
        }
      },
      "graticule outline": {
        "sphere": function(area) {
          assert.inDelta(area(_.geo.graticule().extent([[-180, -90], [180, 90]]).outline()), 4 * π, 1e-5);
        },
        "hemisphere": function(area) {
          assert.inDelta(area(_.geo.graticule().extent([[-180, 0], [180, 90]]).outline()), 2 * π, 1e-5);
        },
        "semilune": function(area) {
          assert.inDelta(area(_.geo.graticule().extent([[0, 0], [90, 90]]).outline()), π / 2, 1e-5);
        }
      },
      "circles": {
        "hemisphere": function(area) {
          assert.inDelta(area(_.geo.circle().angle(90)()), 2 * π, 1e-5);
        },
        "60°": function(area) {
          assert.inDelta(area(_.geo.circle().angle(60).precision(.1)()), π, 1e-5);
        },
        "60° North": function(area) {
          assert.inDelta(area(_.geo.circle().angle(60).precision(.1).origin([0, 90])()), π, 1e-5);
        },
        "45°": function(area) {
          assert.inDelta(area(_.geo.circle().angle(45).precision(.1)()), π * (2 - Math.SQRT2), 1e-5);
        },
        "45° North": function(area) {
          assert.inDelta(area(_.geo.circle().angle(45).precision(.1).origin([0, 90])()), π * (2 - Math.SQRT2), 1e-5);
        },
        "45° South": function(area) {
          assert.inDelta(area(_.geo.circle().angle(45).precision(.1).origin([0, -90])()), π * (2 - Math.SQRT2), 1e-5);
        },
        "135°": function(area) {
          assert.inDelta(area(_.geo.circle().angle(135).precision(.1)()), π * (2 + Math.SQRT2), 1e-5);
        },
        "135° North": function(area) {
          assert.inDelta(area(_.geo.circle().angle(135).precision(.1).origin([0, 90])()), π * (2 + Math.SQRT2), 1e-5);
        },
        "135° South": function(area) {
          assert.inDelta(area(_.geo.circle().angle(135).precision(.1).origin([0, -90])()), π * (2 + Math.SQRT2), 1e-5);
        },
        "tiny": function(area) {
          assert.inDelta(area(_.geo.circle().angle(1e-6).precision(.1)()), 0, 1e-6);
        },
        "huge": function(area) {
          assert.inDelta(area(_.geo.circle().angle(180 - 1e-6).precision(.1)()), 4 * π, 1e-6);
        },
        "60° with 45° hole": function(area) {
          var circle = _.geo.circle().precision(.1);
          assert.inDelta(area({
            type: "Polygon",
            coordinates: [
              circle.angle(60)().coordinates[0],
              circle.angle(45)().coordinates[0].reverse()
            ]
          }), π * (Math.SQRT2 - 1), 1e-5);
        },
        "45° holes at [0°, 0°] and [0°, 90°]": function(area) {
          var circle = _.geo.circle().precision(.1).angle(45);
          assert.inDelta(area({
            type: "Polygon",
            coordinates: [
              circle.origin([0, 0])().coordinates[0].reverse(),
              circle.origin([0, 90])().coordinates[0].reverse()
            ]
          }), π * 2 * Math.SQRT2, 1e-5);
        },
        "45° holes at [0°, 90°] and [0°, 0°]": function(area) {
          var circle = _.geo.circle().precision(.1).angle(45);
          assert.inDelta(area({
            type: "Polygon",
            coordinates: [
              circle.origin([0, 90])().coordinates[0].reverse(),
              circle.origin([0, 0])().coordinates[0].reverse()
            ]
          }), π * 2 * Math.SQRT2, 1e-5);
        }
      },
      "stripes": {
        "45°, -45°": function(area) {
          assert.inDelta(area(stripes(45, -45)), π * 2 * Math.SQRT2, 1e-5);
        },
        "-45°, 45°": function(area) {
          assert.inDelta(area(stripes(-45, 45)), π * 2 * (2 - Math.SQRT2), 1e-5);
        },
        "45°, 30°": function(area) {
          assert.inDelta(area(stripes(45, 30)), π * (Math.SQRT2 - 1), 1e-5);
        }
      }
    },
    "MultiPolygon": {
      "two hemispheres": function(area) {
        assert.equal(area({type: "MultiPolygon", coordinates: [
          [[[0, 0], [-90, 0], [180, 0], [90, 0], [0, 0]]],
          [[[0, 0], [90, 0], [180, 0], [-90, 0], [0, 0]]]
        ]}), 4 * π);
      }
    },
    "Sphere": function(area) {
      assert.equal(area({type: "Sphere"}), 4 * π);
    },
    "GeometryCollection": function(area) {
      assert.equal(area({type: "GeometryCollection", geometries: [{type: "Sphere"}]}), 4 * π);
    },
    "FeatureCollection": function(area) {
      assert.equal(area({type: "FeatureCollection", features: [{type: "Feature", geometry: {type: "Sphere"}}]}), 4 * π);
    },
    "Feature": function(area) {
      assert.equal(area({type: "Feature", geometry: {type: "Sphere"}}), 4 * π);
    }
  }
});

suite.export(module);

function stripes(a, b) {
  return {type: "Polygon", coordinates: [a, b].map(function(d, i) {
    var stripe = _.range(-180, 180, .1).map(function(x) { return [x, d]; });
    stripe.push(stripe[0]);
    return i ? stripe.reverse() : stripe;
  })};
}
