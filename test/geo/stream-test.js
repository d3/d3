var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.geo.stream");

suite.addBatch({
  "stream": {
    topic: load("geo/stream").expression("d3.geo.stream"),
    "does not allow null input": function(stream) {
      try {
        stream(null);
        assert.fail("expected error");
      } catch (expected) {}
    },
    "ignores unknown types": function(stream) {
      stream({type: "Unknown"}, {});
      stream({type: "Feature", geometry: {type: "Unknown"}}, {});
      stream({type: "FeatureCollection", features: [{type: "Feature", geometry: {type: "Unknown"}}]}, {});
      stream({type: "GeometryCollection", geometries: [{type: "Unknown"}]}, {});
    },
    "ignores null geometries": function(stream) {
      stream(null, {});
      stream({type: "Feature", geometry: null}, {});
      stream({type: "FeatureCollection", features: [{type: "Feature", geometry: null}]}, {});
      stream({type: "GeometryCollection", geometries: [null]}, {});
    },
    "returns void": function(stream) {
      assert.isUndefined(stream({type: "Point", coordinates: [1, 2]}, {point: function() { return true; }}));
    },
    "allows empty multi-geometries": function(stream) {
      stream({type: "MultiPoint", coordinates: []}, {});
      stream({type: "MultiLineString", coordinates: []}, {});
      stream({type: "MultiPolygon", coordinates: []}, {});
    },
    "Sphere ↦ sphere": function(stream) {
      var calls = 0;
      stream({type: "Sphere"}, {
        sphere: function() {
          assert.equal(arguments.length, 0);
          assert.equal(++calls, 1);
        }
      });
      assert.equal(calls, 1);
    },
    "Point ↦ point": function(stream) {
      var calls = 0, coordinates = 0;
      stream({type: "Point", coordinates: [1, 2, 3]}, {
        point: function(x, y, z) {
          assert.equal(arguments.length, 3);
          assert.equal(x, ++coordinates);
          assert.equal(y, ++coordinates);
          assert.equal(z, ++coordinates);
          assert.equal(++calls, 1);
        }
      });
      assert.equal(calls, 1);
    },
    "MultiPoint ↦ point*": function(stream) {
      var calls = 0, coordinates = 0;
      stream({type: "MultiPoint", coordinates: [[1, 2, 3], [4, 5, 6]]}, {
        point: function(x, y, z) {
          assert.equal(arguments.length, 3);
          assert.equal(x, ++coordinates);
          assert.equal(y, ++coordinates);
          assert.equal(z, ++coordinates);
          assert.isTrue(1 <= ++calls && calls <= 2);
        }
      });
      assert.equal(calls, 2);
    },
    "LineString ↦ lineStart, point{2,}, lineEnd": function(stream) {
      var calls = 0, coordinates = 0;
      stream({type: "LineString", coordinates: [[1, 2, 3], [4, 5, 6]]}, {
        lineStart: function() {
          assert.equal(arguments.length, 0);
          assert.equal(++calls, 1);
        },
        point: function(x, y, z) {
          assert.equal(arguments.length, 3);
          assert.equal(x, ++coordinates);
          assert.equal(y, ++coordinates);
          assert.equal(z, ++coordinates);
          assert.isTrue(2 <= ++calls && calls <= 3);
        },
        lineEnd: function() {
          assert.equal(arguments.length, 0);
          assert.equal(++calls, 4);
        }
      });
      assert.equal(calls, 4);
    },
    "MultiLineString ↦ (lineStart, point{2,}, lineEnd)*": function(stream) {
      var calls = 0, coordinates = 0;
      stream({type: "MultiLineString", coordinates: [[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]]]}, {
        lineStart: function() {
          assert.equal(arguments.length, 0);
          assert.isTrue(++calls === 1 || calls === 5);
        },
        point: function(x, y, z) {
          assert.equal(arguments.length, 3);
          assert.equal(x, ++coordinates);
          assert.equal(y, ++coordinates);
          assert.equal(z, ++coordinates);
          assert.isTrue(2 <= ++calls && calls <= 3 || 6 <= calls && calls <= 7);
        },
        lineEnd: function() {
          assert.equal(arguments.length, 0);
          assert.isTrue(++calls === 4 || calls === 8);
        }
      });
      assert.equal(calls, 8);
    },
    "Polygon ↦ polygonStart, lineStart, point{2,}, lineEnd, polygonEnd": function(stream) {
      var calls = 0, coordinates = 0;
      stream({type: "Polygon", coordinates: [[[1, 2, 3], [4, 5, 6], [1, 2, 3]], [[7, 8, 9], [10, 11, 12], [7, 8, 9]]]}, {
        polygonStart: function() {
          assert.equal(arguments.length, 0);
          assert.isTrue(++calls === 1);
        },
        lineStart: function() {
          assert.equal(arguments.length, 0);
          assert.isTrue(++calls === 2 || calls === 6);
        },
        point: function(x, y, z) {
          assert.equal(arguments.length, 3);
          assert.equal(x, ++coordinates);
          assert.equal(y, ++coordinates);
          assert.equal(z, ++coordinates);
          assert.isTrue(3 <= ++calls && calls <= 4 || 7 <= calls && calls <= 8);
        },
        lineEnd: function() {
          assert.equal(arguments.length, 0);
          assert.isTrue(++calls === 5 || calls === 9);
        },
        polygonEnd: function() {
          assert.equal(arguments.length, 0);
          assert.isTrue(++calls === 10);
        }
      });
      assert.equal(calls, 10);
    },
    "MultiPolygon ↦ (polygonStart, lineStart, point{2,}, lineEnd, polygonEnd)*": function(stream) {
      var calls = 0, coordinates = 0;
      stream({type: "MultiPolygon", coordinates: [[[[1, 2, 3], [4, 5, 6], [1, 2, 3]]], [[[7, 8, 9], [10, 11, 12], [7, 8, 9]]]]}, {
        polygonStart: function() {
          assert.equal(arguments.length, 0);
          assert.isTrue(++calls === 1 || calls === 7);
        },
        lineStart: function() {
          assert.equal(arguments.length, 0);
          assert.isTrue(++calls === 2 || calls === 8);
        },
        point: function(x, y, z) {
          assert.equal(arguments.length, 3);
          assert.equal(x, ++coordinates);
          assert.equal(y, ++coordinates);
          assert.equal(z, ++coordinates);
          assert.isTrue(3 <= ++calls && calls <= 4 || 9 <= calls && calls <= 10);
        },
        lineEnd: function() {
          assert.equal(arguments.length, 0);
          assert.isTrue(++calls === 5 || calls === 11);
        },
        polygonEnd: function() {
          assert.equal(arguments.length, 0);
          assert.isTrue(++calls === 6 || calls === 12);
        }
      });
      assert.equal(calls, 12);
    },
    "Feature ↦ .*": function(stream) {
      var calls = 0, coordinates = 0;
      stream({type: "Feature", geometry: {type: "Point", coordinates: [1, 2, 3]}}, {
        point: function(x, y, z) {
          assert.equal(arguments.length, 3);
          assert.equal(x, ++coordinates);
          assert.equal(y, ++coordinates);
          assert.equal(z, ++coordinates);
          assert.equal(++calls, 1);
        }
      });
      assert.equal(calls, 1);
    },
    "FeatureCollection ↦ .*": function(stream) {
      var calls = 0, coordinates = 0;
      stream({type: "FeatureCollection", features: [{type: "Feature", geometry: {type: "Point", coordinates: [1, 2, 3]}}]}, {
        point: function(x, y, z) {
          assert.equal(arguments.length, 3);
          assert.equal(x, ++coordinates);
          assert.equal(y, ++coordinates);
          assert.equal(z, ++coordinates);
          assert.equal(++calls, 1);
        }
      });
      assert.equal(calls, 1);
    },
    "GeometryCollection ↦ .*": function(stream) {
      var calls = 0, coordinates = 0;
      stream({type: "GeometryCollection", geometries: [{type: "Point", coordinates: [1, 2, 3]}]}, {
        point: function(x, y, z) {
          assert.equal(arguments.length, 3);
          assert.equal(x, ++coordinates);
          assert.equal(y, ++coordinates);
          assert.equal(z, ++coordinates);
          assert.equal(++calls, 1);
        }
      });
      assert.equal(calls, 1);
    }
  }
});

suite.export(module);
