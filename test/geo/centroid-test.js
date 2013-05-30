var vows = require("vows"),
    _ = require("../../"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.geo.centroid");

suite.addBatch({
  "centroid": {
    topic: load("geo/centroid").expression("d3.geo.centroid"),

    "the centroid of a point is itself": function(centroid) {
      assert.inDelta(centroid({type: "Point", coordinates: [0, 0]}), [0, 0], 1e-6);
      assert.inDelta(centroid({type: "Point", coordinates: [1, 1]}), [1, 1], 1e-6);
      assert.inDelta(centroid({type: "Point", coordinates: [2, 3]}), [2, 3], 1e-6);
      assert.inDelta(centroid({type: "Point", coordinates: [-4, -5]}), [-4, -5], 1e-6);
    },

    "the centroid of a set of points is the (spherical) average of its constituent members": function(centroid) {
      assert.inDelta(centroid({type: "GeometryCollection", geometries: [{type: "Point", coordinates: [0, 0]}, {type: "Point", coordinates: [1, 2]}]}), [0.499847, 1.000038], 1e-6);
      assert.inDelta(centroid({type: "MultiPoint", coordinates: [[0, 0], [1, 2]]}), [0.499847, 1.000038], 1e-6);
      assert.inDelta(centroid({type: "MultiPoint", coordinates: [[179, 0], [-179, 0]]}), [180, 0], 1e-6);
    },

    "the centroid of a set of points and their antipodes is ambiguous": function(centroid) {
      assert.ok(centroid({type: "MultiPoint", coordinates: [[0, 0], [180, 0]]}).every(isNaN));
      assert.ok(centroid({type: "MultiPoint", coordinates: [[0, 0], [90, 0], [180, 0], [-90, 0]]}).every(isNaN));
      assert.ok(centroid({type: "MultiPoint", coordinates: [[0, 0], [0, 90], [180, 0], [0, -90]]}).every(isNaN));
    },

    "the centroid of the empty set of points is ambiguous": function(centroid) {
      assert.ok(centroid({type: "MultiPoint", coordinates: []}).every(isNaN));
    },

    "the centroid of a line string is the (spherical) average of its constituent great arc segments": function(centroid) {
      assert.inDelta(centroid({type: "LineString", coordinates: [[0, 0], [1, 0]]}), [.5, 0], 1e-6);
      assert.inDelta(centroid({type: "LineString", coordinates: [[0, 0], [0, 90]]}), [0, 45], 1e-6);
      assert.inDelta(centroid({type: "LineString", coordinates: [[0, 0], [0, 45], [0, 90]]}), [0, 45], 1e-6);
      assert.inDelta(centroid({type: "LineString", coordinates: [[-1, -1], [1, 1]]}), [0, 0], 1e-6);
      assert.inDelta(centroid({type: "LineString", coordinates: [[-60, -1], [60, 1]]}), [0, 0], 1e-6);
      assert.inDelta(centroid({type: "LineString", coordinates: [[179, -1], [-179, 1]]}), [180, 0], 1e-6);
      assert.inDelta(centroid({type: "LineString", coordinates: [[-179, 0], [0, 0], [179, 0]]}), [0, 0], 1e-6);
      assert.inDelta(centroid({type: "LineString", coordinates: [[-180, -90], [0, 0], [0, 90]]}), [0, 0], 1e-6);
    },

    "the centroid of a great arc from a point to its antipode is ambiguous": function(centroid) {
      assert.ok(centroid({type: "LineString", coordinates: [[180, 0], [0, 0]]}).every(isNaN));
      assert.ok(centroid({type: "MultiLineString", coordinates: [[[0, -90], [0, 90]]]}).every(isNaN));
    },

    "the centroid of a set of line strings is the (spherical) average of its constituent great arc segments": function(centroid) {
      assert.inDelta(centroid({type: "MultiLineString", coordinates: [[[0, 0], [0, 2]]]}), [0, 1], 1e-6);
    },

    "an empty line is treated as a point": function(centroid) {
      assert.inDelta(centroid({type: "LineString", coordinates: [[1, 1], [1, 1]]}), [1, 1], 1e-6); // TODO
      assert.inDelta(centroid({type: "GeometryCollection", geometries: [{type: "Point", coordinates: [0, 0]}, {type: "LineString", coordinates: [[1, 2], [1, 2]]}]}), [0.499847, 1.000038], 1e-6);
    },

    "an empty polygon is treated as a point": function(centroid) {
      assert.inDelta(centroid({type: "Polygon", coordinates: [[[1, 1], [1, 1], [1, 1], [1, 1]]]}), [1, 1], 1e-6); // TODO
      assert.inDelta(centroid({type: "GeometryCollection", geometries: [{type: "Point", coordinates: [0, 0]}, {type: "Polygon", coordinates: [[[1, 2], [1, 2], [1, 2], [1, 2]]]}]}), [0.499847, 1.000038], 1e-6);
    },

    // TODO Don’t treat a polygon as a line string.
    "the centroid of a polygon is the (spherical) average of its surface": function(centroid) {
      assert.inDelta(centroid({type: "Polygon", coordinates: [[[0, -90], [0, 0], [0, 90], [1, 0], [0, -90]]]}), [.5, 0], 1e-6);
      assert.inDelta(centroid(_.geo.circle().angle(5).origin([0, 45])()), [0, 45], 1e-6);
      assert.inDelta(centroid({type: "Polygon", coordinates: [_.range(-180, 180 + 1 / 2, 1).map(function(x) { return [x, -60]; })]})[1], -90, 1e-6);
      assert.inDelta(centroid({type: "Polygon", coordinates: [[[0, -10], [0, 10], [10, 10], [10, -10], [0, -10]]]}), [5, 0], 1e-6);
    },

    // TODO Actually test multiple polygons here.
    "the centroid of a set of polygons is the (spherical) average of its surface": function(centroid) {
      assert.inDelta(centroid({type: "MultiPolygon", coordinates: [[[[0, -90], [0, 0], [0, 90], [1, 0], [0, -90]]]]}), [.5, 0], 1e-6);
      assert.inDelta(centroid({type: "GeometryCollection", geometries: [{type: "Polygon", coordinates: [[[0, -90], [0, 0], [0, 90], [1, 0], [0, -90]]]}]}), [.5, 0], 1e-6);
    },

    "the centroid of a sphere is ambiguous": function(centroid) {
      assert.ok(centroid({type: "Sphere"}).every(isNaN));
    },

    "the centroid of a feature is the centroid of its constituent geometry": function(centroid) {
      assert.inDelta(centroid({type: "Feature", geometry: {type: "LineString", coordinates: [[1, 1], [1, 1]]}}), [1, 1], 1e-6); // TODO
      assert.inDelta(centroid({type: "Feature", geometry: {type: "Point", coordinates: [1, 1]}}), [1, 1], 1e-6);
      assert.inDelta(centroid({type: "Feature", geometry: {type: "Polygon", coordinates: [[[0, -90], [0, 0], [0, 90], [1, 0], [0, -90]]]}}), [.5, 0], 1e-6);
    },

    "the centroid of a feature collection is the centroid of its constituent geometry": function(centroid) {
      assert.inDelta(centroid({type: "FeatureCollection", features: [
        {type: "Feature", geometry: {type: "LineString", coordinates: [[179, 0], [180, 0]]}},
        {type: "Feature", geometry: {type: "Point", coordinates: [0, 0]}}
      ]}), [179.5, 0], 1e-6);
    },

    "the centroid of a non-empty line string and a point only considers the line string": function(centroid) {
      assert.inDelta(centroid({type: "GeometryCollection", geometries: [
        {type: "LineString", coordinates: [[179, 0], [180, 0]]},
        {type: "Point", coordinates: [0, 0]}
      ]}), [179.5, 0], 1e-6);
    },

    "the centroid of a non-empty polygon, a non-empty line string and a point only considers the polygon": function(centroid) {
      assert.inDelta(centroid({type: "GeometryCollection", geometries: [
        {type: "Polygon", coordinates: [[[-180, 0], [-180, 1], [-179, 1], [-179, 0], [-180, 0]]]},
        {type: "LineString", coordinates: [[179, 0], [180, 0]]},
        {type: "Point", coordinates: [0, 0]}
      ]}), [-179.5, 0.5], 1e-6);
      assert.inDelta(centroid({type: "GeometryCollection", geometries: [
        {type: "Point", coordinates: [0, 0]},
        {type: "LineString", coordinates: [[179, 0], [180, 0]]},
        {type: "Polygon", coordinates: [[[-180, 0], [-180, 1], [-179, 1], [-179, 0], [-180, 0]]]}
      ]}), [-179.5, 0.5], 1e-6);
    },

    "the centroid of the sphere and a point only considers the sphere": function(centroid) {
      assert.ok(centroid({type: "GeometryCollection", geometries: [
        {type: "Sphere"},
        {type: "Point", coordinates: [0, 0]}
      ]}).every(isNaN));
      assert.ok(centroid({type: "GeometryCollection", geometries: [
        {type: "Point", coordinates: [0, 0]},
        {type: "Sphere"}
      ]}).every(isNaN));
    }
  }
});

suite.export(module);
