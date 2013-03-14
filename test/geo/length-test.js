var vows = require("vows"),
    load = require("../load"),
    assert = require("assert");

var suite = vows.describe("d3.geo.length");

var π = Math.PI;

suite.addBatch({
  "length": {
    topic: load("geo/length"),
    "the length of points are zero": function(d3) {
      assert.inDelta(d3.geo.length({type: "Point", coordinates: [0, 0]}), 0, 1e-6);
      assert.inDelta(d3.geo.length({type: "MultiPoint", coordinates: [[0, 1], [2, 3]]}), 0, 1e-6);
    },
    "the length of a line string is the sum of its great arc segments": function(d3) {
      assert.inDelta(d3.geo.length({type: "LineString", coordinates: [[-45, 0], [45, 0]]}), Math.PI / 2, 1e-6);
      assert.inDelta(d3.geo.length({type: "LineString", coordinates: [[-45, 0], [-30, 0], [-15, 0], [0, 0]]}), Math.PI / 4, 1e-6);
      assert.inDelta(d3.geo.length({type: "MultiLineString", coordinates: [[[-45, 0], [-30, 0]], [[-15, 0], [0, 0]]]}), Math.PI / 6, 1e-6);
    },
    "the length of a polygon is its perimeter": function(d3) {
      assert.inDelta(d3.geo.length({type: "Polygon", coordinates: [[[0, 0], [3, 0], [3, 3], [0, 3], [0, 0]]]}), 0.157008, 1e-6);
      assert.inDelta(d3.geo.length({type: "MultiPolygon", coordinates: [[[[0, 0], [3, 0], [3, 3], [0, 3], [0, 0]]]]}), 0.157008, 1e-6);
      assert.inDelta(d3.geo.length({type: "MultiPolygon", coordinates: [[[[0, 0], [3, 0], [3, 3], [0, 3], [0, 0]]], [[[1, 1], [2, 1], [2, 2], [1, 2], [1, 1]]]]}), 0.209354, 1e-6);
    },
    "the length of a polygon is its perimeter, including holes": function(d3) {
      assert.inDelta(d3.geo.length({type: "Polygon", coordinates: [[[0, 0], [3, 0], [3, 3], [0, 3], [0, 0]], [[1, 1], [2, 1], [2, 2], [1, 2], [1, 1]]]}), 0.209354, 1e-6);
    },
    "the length of a feature collection is the sum of its features": function(d3) {
      assert.inDelta(d3.geo.length({type: "FeatureCollection", features: [
        {type: "Feature", geometry: {type: "LineString", coordinates: [[-45, 0], [0, 0]]}},
        {type: "Feature", geometry: {type: "LineString", coordinates: [[0, 0], [45, 0]]}}
      ]}), Math.PI / 2, 1e-6);
    },
    "the length of a geometry collection is the sum of its geometries": function(d3) {
      assert.inDelta(d3.geo.length({type: "GeometryCollection", geometries: [
        {type: "GeometryCollection", geometries: [{type: "LineString", coordinates: [[-45, 0], [0, 0]]}]},
        {type: "LineString", coordinates: [[0, 0], [45, 0]]}
      ]}), Math.PI / 2, 1e-6);
    }
  }
});

suite.export(module);
