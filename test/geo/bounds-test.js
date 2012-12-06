require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.bounds");

suite.addBatch({
  "bounds": {
    topic: function() {
      return d3.geo.bounds;
    },
    "Feature": function(bounds) {
      assert.deepEqual(bounds({
        type: "Feature",
        geometry: {
          type: "MultiPoint",
          coordinates: [[-123, 39], [-122, 38]]
        }
      }), [[-123, 38], [-122, 39]])
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
      }), [[-123, 38], [-122, 39]])
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
      }), [[-123, 38], [-122, 39]])
    },
    "LineString": function(bounds) {
      assert.deepEqual(bounds({
        type: "LineString",
        coordinates: [[-123, 39], [-122, 38]]
      }), [[-123, 38], [-122, 39]])
    },
    "MultiLineString": function(bounds) {
      assert.deepEqual(bounds({
        type: "MultiLineString",
        coordinates: [[[-123, 39], [-122, 38]]]
      }), [[-123, 38], [-122, 39]])
    },
    "MultiPoint": function(bounds) {
      assert.deepEqual(bounds({
        type: "MultiPoint",
        coordinates: [[-123, 39], [-122, 38]]
      }), [[-123, 38], [-122, 39]])
    },
    "MultiPolygon": function(bounds) {
      assert.deepEqual(bounds({
        type: "MultiPolygon",
        coordinates: [[[[-123, 39], [-122, 39], [-122, 38], [-123, 39]], [[10, 20], [20, 20], [20, 10], [10, 10], [10, 20]]]]
      }), [[-123, 38], [-122, 39]])
    },
    "Point": function(bounds) {
      assert.deepEqual(bounds({
        type: "Point",
        coordinates: [-123, 39]
      }), [[-123, 39], [-123, 39]])
    },
    "Polygon": function(bounds) {
      assert.deepEqual(bounds({
        type: "Polygon",
        coordinates: [[[-123, 39], [-122, 39], [-122, 38], [-123, 39]], [[10, 20], [20, 20], [20, 10], [10, 10], [10, 20]]]
      }), [[-123, 38], [-122, 39]])
    }
  }
});

suite.export(module);
