require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.centroid");

suite.addBatch({
  "centroid": {
    topic: function() {
      return d3.geo.centroid;
    },
    "Point": function(centroid) {
      assert.deepEqual(centroid({type: "Point", coordinates: [0, 0]}), [0, 0]);
    },
    "MultiPoint": {
      "": function(centroid) {
        assert.inDelta(centroid({type: "MultiPoint", coordinates: [[0, 0], [1, 2]]}), [0.499847, 1.000038], 1e-6);
      },
      "antimeridian": function(centroid) {
        assert.deepEqual(centroid({type: "MultiPoint", coordinates: [[179, 0], [-179, 0]]}), [180, 0]);
      },
      "rings": {
        "equator": function(centroid) {
          assert.isUndefined(centroid({type: "MultiPoint", coordinates: [[0, 0], [90, 0], [180, 0], [-90, 0]]}));
        },
        "polar": function(centroid) {
          assert.isUndefined(centroid({type: "MultiPoint", coordinates: [[0, 0], [0, 90], [180, 0], [0, -90]]}));
        }
      }
    },
    "LineString": function(centroid) {
      assert.inDelta(centroid({type: "LineString", coordinates: [[0, 0], [1, 0]]}), [.5, 0], 1e-6);
      assert.inDelta(centroid({type: "LineString", coordinates: [[0, 0], [0, 90]]}), [0, 45], 1e-6);
      assert.inDelta(centroid({type: "LineString", coordinates: [[0, 0], [0, 45], [0, 90]]}), [0, 45], 1e-6);
      assert.inDelta(centroid({type: "LineString", coordinates: [[-1, -1], [1, 1]]}), [0, 0], 1e-6);
      assert.inDelta(centroid({type: "LineString", coordinates: [[-60, -1], [60, 1]]}), [0, 0], 1e-6);
      assert.inDelta(centroid({type: "LineString", coordinates: [[179, -1], [-179, 1]]}), [180, 0], 1e-6);
      assert.inDelta(centroid({type: "LineString", coordinates: [[-179, 0], [0, 0], [179, 0]]}), [0, 0], 1e-6);
      assert.inDelta(centroid({type: "LineString", coordinates: [[-180, -90], [0, 0], [0, 90]]}), [0, 0], 1e-6);
      assert.isUndefined(centroid({type: "LineString", coordinates: [[0, -90], [0, 90]]}));
    },
    "MultiLineString": function(centroid) {
      assert.inDelta(centroid({type: "MultiLineString", coordinates: [[[0, 0], [0, 2]]]}), [0, 1], 1e-6);
    },
    "Polygon": function(centroid) {
      assert.inDelta(centroid({type: "Polygon", coordinates: [[[0, -90], [0, 0], [0, 90], [1, 0], [0, -90]]]}), [.5, 0], 1e-6);
      //assert.inDelta(centroid(d3.geo.circle().angle(5).origin([0, 45])()), [0, 45], 1e-6);
      assert.equal(centroid({type: "Polygon", coordinates: [d3.range(-180, 180 + 1 / 2, 1).map(function(x) { return [x, -60]; })]})[1], -90);
      assert.inDelta(centroid({type: "Polygon", coordinates: [[[0, -10], [0, 10], [10, 10], [10, -10], [0, -10]]]}), [5, 0], 1e-6);
    },
    "MultiPolygon": function(centroid) {
      assert.inDelta(centroid({type: "MultiPolygon", coordinates: [[[[0, -90], [0, 0], [0, 90], [1, 0], [0, -90]]]]}), [.5, 0], 1e-6);
    },
    "Sphere": function(centroid) {
      assert.isUndefined(centroid({type: "Sphere"}));
    },
    "Feature": function(centroid) {
      assert.deepEqual(centroid({type: "Feature", geometry: {type: "Point", coordinates: [0, 0]}}), [0, 0]);
    },
    "FeatureCollection": function(centroid) {
      assert.inDelta(centroid({type: "FeatureCollection", features: [
        {type: "Feature", geometry: {type: "LineString", coordinates: [[179, 0], [180, 0]]}},
        {type: "Feature", geometry: {type: "Point", coordinates: [0, 0]}}
      ]}), [179.5, 0], 1e-6);
    },
    "GeometryCollection": {
      "Point and LineString": function(centroid) {
        assert.inDelta(centroid({type: "GeometryCollection", geometries: [
          {type: "LineString", coordinates: [[179, 0], [180, 0]]},
          {type: "Point", coordinates: [0, 0]}
        ]}), [179.5, 0], 1e-6);
      },
      "Point, LineString and Polygon": function(centroid) {
        assert.inDelta(centroid({type: "GeometryCollection", geometries: [
          {type: "Polygon", coordinates: [[[-180, 0], [-180, 1], [-179, 1], [-179, 0], [-180, 0]]]},
          {type: "LineString", coordinates: [[179, 0], [180, 0]]},
          {type: "Point", coordinates: [0, 0]}
        ]}), [-179.5, 0.5], 1e-6);
      }
    }
  }
});

suite.export(module);
