var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.geo.bounds");

suite.addBatch({
  "bounds": {
    topic: load("geo/bounds"),
    "Feature": function(d3) {
      assert.deepEqual(d3.geo.bounds({
        type: "Feature",
        geometry: {
          type: "MultiPoint",
          coordinates: [[-123, 39], [-122, 38]]
        }
      }), [[-123, 38], [-122, 39]])
    },
    "FeatureCollection": function(d3) {
      assert.deepEqual(d3.geo.bounds({
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
    "GeometryCollection": function(d3) {
      assert.deepEqual(d3.geo.bounds({
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
    "LineString": function(d3) {
      assert.deepEqual(d3.geo.bounds({
        type: "LineString",
        coordinates: [[-123, 39], [-122, 38]]
      }), [[-123, 38], [-122, 39]])
    },
    "MultiLineString": function(d3) {
      assert.deepEqual(d3.geo.bounds({
        type: "MultiLineString",
        coordinates: [[[-123, 39], [-122, 38]]]
      }), [[-123, 38], [-122, 39]])
    },
    "MultiPoint": function(d3) {
      assert.deepEqual(d3.geo.bounds({
        type: "MultiPoint",
        coordinates: [[-123, 39], [-122, 38]]
      }), [[-123, 38], [-122, 39]])
    },
    "MultiPolygon": function(d3) {
      assert.deepEqual(d3.geo.bounds({
        type: "MultiPolygon",
        coordinates: [[[[-123, 39], [-122, 39], [-122, 38], [-123, 39]], [[10, 20], [20, 20], [20, 10], [10, 10], [10, 20]]]]
      }), [[-123, 38], [-122, 39]])
    },
    "Point": function(d3) {
      assert.deepEqual(d3.geo.bounds({
        type: "Point",
        coordinates: [-123, 39]
      }), [[-123, 39], [-123, 39]])
    },
    "Polygon": function(d3) {
      assert.deepEqual(d3.geo.bounds({
        type: "Polygon",
        coordinates: [[[-123, 39], [-122, 39], [-122, 38], [-123, 39]], [[10, 20], [20, 20], [20, 10], [10, 10], [10, 20]]]
      }), [[-123, 38], [-122, 39]])
    },
    "NestedCollection": function(d3) {
        assert.deepEqual(d3.geo.bounds({
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
      }), [[-120,46], [-119,47]])
    }
  }
});

suite.export(module);
