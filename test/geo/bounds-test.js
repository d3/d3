var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.geo.bounds");

suite.addBatch({
  "bounds": {
    topic: load("geo/bounds").expression("d3.geo.bounds"),
    "Feature": function(bounds) {
      assert.deepEqual(bounds({
        type: "Feature",
        geometry: {
          type: "MultiPoint",
          coordinates: [[-123, 39], [-122, 38]]
        }
      }), [[-123, 38], [-122, 39]]);
    },
    "FeatureCollection": function(bounds) {
      assert.deepEqual(bounds({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-123, 39]
            }
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-122, 38]
            }
          }
        ]
      }), [[-123, 38], [-122, 39]]);
    },
    "GeometryCollection": function(bounds) {
      assert.deepEqual(bounds({
        type: "GeometryCollection",
        geometries: [
          {
            type: "Point",
            coordinates: [-123, 39]
          },
          {
            type: "Point",
            coordinates: [-122, 38]
          }
        ]
      }), [[-123, 38], [-122, 39]]);
    },
    "LineString": {
      "simple": function(bounds) {
        assert.deepEqual(bounds({
          type: "LineString",
          coordinates: [[-123, 39], [-122, 38]]
        }), [[-123, 38], [-122, 39]]);
      },
      "containing coincident points": function(bounds) {
        assert.deepEqual(bounds({
          type: "LineString",
          coordinates: [[-123, 39], [-122, 38], [-122, 38]]
        }), [[-123, 38], [-122, 39]]);
      },
      "meridian": function(bounds) {
        assert.deepEqual(bounds({
          type: "LineString",
          coordinates: [[0, 0], [0, 1], [0, 60]]
        }), [[0, 0], [0, 60]]);
      },
      "equator": function(bounds) {
        assert.deepEqual(bounds({
          type: "LineString",
          coordinates: [[0, 0], [1, 0], [60, 0]]
        }), [[0, 0], [60, 0]]);
      },
      "containing an inflection point": {
        "in the Northern hemisphere": function(bounds) {
          assert.inDelta(bounds({
            type: "LineString",
            coordinates: [[-45, 60], [45, 60]]
          }), [[-45, 60], [45, 67.792345]], 1e-6);
        },
        "in the Southern hemisphere": function(bounds) {
          assert.inDelta(bounds({
            type: "LineString",
            coordinates: [[-45, -60], [45, -60]]
          }), [[-45, -67.792345], [45, -60]], 1e-6);
        }
      }
    },
    "MultiLineString": function(bounds) {
      assert.deepEqual(bounds({
        type: "MultiLineString",
        coordinates: [[[-123, 39], [-122, 38]]]
      }), [[-123, 38], [-122, 39]]);
    },
    "MultiPoint": {
      "simple": function(bounds) {
        assert.deepEqual(bounds({
          type: "MultiPoint",
          coordinates: [[-123, 39], [-122, 38]]
        }), [[-123, 38], [-122, 39]]);
      },
      "two points near antimeridian": function(bounds) {
        assert.deepEqual(bounds({
          type: "MultiPoint",
          coordinates: [[-179, 39], [179, 38]]
        }), [[179, 38], [-179, 39]]);
      },
      "two points near antimeridian, two points near primary meridian": function(bounds) {
        assert.deepEqual(bounds({
          type: "MultiPoint",
          coordinates: [[-179, 39], [179, 38], [-1, 0], [1, 0]]
        }), [[-1, 0], [-179, 39]]);
      },
      "two points near primary meridian, two points near antimeridian": function(bounds) {
        assert.deepEqual(bounds({
          type: "MultiPoint",
          coordinates: [[-1, 0], [1, 0], [-179, 39], [179, 38]]
        }), [[-1, 0], [-179, 39]]);
      },
      "four mixed points near primary meridian and antimeridian": function(bounds) {
        assert.deepEqual(bounds({
          type: "MultiPoint",
          coordinates: [[-1, 0], [-179, 39], [1, 0], [179, 38]]
        }), [[-1, 0], [-179, 39]]);
      },
      "three points near antimeridian": function(bounds) {
        assert.deepEqual(bounds({
          type: "MultiPoint",
          coordinates: [[178, 38], [179, 39], [-179, 37]]
        }), [[178, 37], [-179, 39]]);
      },
      "various points near antimeridian": function(bounds) {
        assert.deepEqual(bounds({
          type: "MultiPoint",
          coordinates: [[-179, 39], [-179, 38], [178, 39], [-178, 38]]
        }), [[178, 38], [-178, 39]]);
      },
    },
    "MultiPolygon": function(bounds) {
      assert.inDelta(bounds({
        type: "MultiPolygon",
        coordinates: [
          [[[-123, 39], [-122, 39], [-122, 38], [-123, 39]],
          [[10, 20], [20, 20], [20, 10], [10, 10], [10, 20]]]
        ]
      }), [[-123, 10], [20, 39.001067]], 1e-6);
    },
    "Point": function(bounds) {
      assert.deepEqual(bounds({
        type: "Point",
        coordinates: [-123, 39]
      }), [[-123, 39], [-123, 39]]);
    },
    "Polygon": {
      "simple": function(bounds) {
        assert.inDelta(bounds({
          type: "Polygon",
          coordinates: [[[-123, 39], [-122, 39], [-122, 38], [-123, 39]]]
        }), [[-123, 38], [-122, 39.001067]], 1e-6);
      },
      "larger than a hemisphere": {
        "small, counter-clockwise": function(bounds) {
          assert.deepEqual(bounds({
            type: "Polygon",
            coordinates: [[[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]]]
          }), [[-180, -90], [180, 90]]);
        },
        "large lat-lon rectangle": function(bounds) {
          assert.inDelta(bounds({
            type: "Polygon",
            coordinates: [[[-170, 80], [0, 80], [170, 80], [170, -80], [0, -80], [-170, -80], [-170, 80]]]
          }), [[-170, -89.119552], [170, 89.119552]], 1e-6);
        },
        "South pole": function(bounds) {
          assert.inDelta(bounds({
            type: "Polygon",
            coordinates: [[[10, 80], [170, 80], [-170, 80], [-10, 80], [10, 80]]]
          }), [[-180, -90], [180, 88.246216]], 1e-6);
        },
        "excluding both poles": function(bounds) {
          assert.inDelta(bounds({
            type: "Polygon",
            coordinates: [[[10, 80], [170, 80], [-170, 80], [-10, 80], [-10, 0], [-10, -80], [-170, -80], [170, -80], [10, -80], [10, 0], [10, 80]]]
          }), [[10, -88.246216], [-10, 88.246216]], 1e-6);
        }
      },
      "South pole": function(bounds) {
        assert.deepEqual(bounds({
          type: "Polygon",
          coordinates: [[[-60, -80], [60, -80], [180, -80], [-60, -80]]]
        }), [[-180, -90], [180, -80]]);
      },
      "ring": function(bounds) {
        assert.inDelta(bounds({
          type: "Polygon",
          coordinates: [
            [[-60, -80], [60, -80], [180, -80], [-60, -80]],
            [[-60, -89], [180, -89], [60, -89], [-60, -89]]
          ]
        }), [[-180, -89.499961], [180, -80]], 1e-6);
      }
    },
    "NestedCollection": function(bounds) {
      assert.deepEqual(bounds({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "GeometryCollection",
              geometries: [
                {
                  type: "Point",
                  coordinates: [-120,47]
                },
                {
                  type: "Point",
                  coordinates: [-119,46]
                }
              ]
            }
          }
        ]
      }), [[-120,46], [-119,47]]);
    }
  }
});

suite.export(module);
