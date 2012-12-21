require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.stream");

suite.addBatch({
  "stream": {
    topic: function() {
      return d3.geo.stream;
    },
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
          ++calls;
          assert.equal(arguments.length, 0);
        }
      });
      assert.equal(calls, 1);
    },
    "Point ↦ point": function(stream) {
      var calls = 0;
      stream({type: "Point", coordinates: [1, 2]}, {
        point: function(x, y) {
          ++calls;
          assert.equal(arguments.length, 2);
          assert.equal(x, 1);
          assert.equal(y, 2);
        }
      });
      assert.equal(calls, 1);
    },
    "MultiPoint ↦ point*": function(stream) {
      var calls = 0;
      stream({type: "MultiPoint", coordinates: [[1, 2], [3, 4]]}, {
        point: function(x, y) {
          assert.equal(arguments.length, 2);
          if (++calls === 1) {
            assert.equal(x, 1);
            assert.equal(y, 2);
          } else {
            assert.equal(x, 3);
            assert.equal(y, 4);
          }
        }
      });
      assert.equal(calls, 2);
    },
    "LineString ↦ lineStart, point{2,}, lineEnd": function(stream) {
      var calls = 0;
      stream({type: "LineString", coordinates: [[1, 2], [3, 4]]}, {
        lineStart: function() {
          assert.equal(++calls, 1);
          assert.equal(arguments.length, 0);
        },
        point: function(x, y) {
          assert.equal(arguments.length, 2);
          if (++calls === 2) {
            assert.equal(x, 1);
            assert.equal(y, 2);
          } else if (calls === 3) {
            assert.equal(x, 3);
            assert.equal(y, 4);
          } else {
            assert.fail("too many points");
          }
        },
        lineEnd: function() {
          assert.equal(++calls, 4);
          assert.equal(arguments.length, 0);
        }
      });
      assert.equal(calls, 4);
    },
    "MultiLineString ↦ (lineStart, point{2,}, lineEnd)*": function(stream) {
      var calls = 0;
      stream({type: "MultiLineString", coordinates: [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]}, {
        lineStart: function() {
          ++calls;
          assert.isTrue(calls === 1 || calls === 5);
          assert.equal(arguments.length, 0);
        },
        point: function(x, y) {
          ++calls;
          assert.equal(arguments.length, 2);
          if (calls === 2) {
            assert.equal(x, 1);
            assert.equal(y, 2);
          } else if (calls === 3) {
            assert.equal(x, 3);
            assert.equal(y, 4);
          } else if (calls === 6) {
            assert.equal(x, 5);
            assert.equal(y, 6);
          } else if (calls === 7) {
            assert.equal(x, 7);
            assert.equal(y, 8);
          } else {
            assert.fail("too many points");
          }
        },
        lineEnd: function() {
          ++calls;
          assert.isTrue(calls === 4 || calls === 8);
          assert.equal(arguments.length, 0);
        }
      });
      assert.equal(calls, 8);
    },
    "Polygon ↦ polygonStart, lineStart, point{2,}, lineEnd, polygonEnd": function(stream) {
      var calls = 0;
      stream({type: "Polygon", coordinates: [[[1, 2], [3, 4], [1, 2]], [[5, 6], [7, 8], [5, 6]]]}, {
        polygonStart: function() {
          ++calls;
          assert.isTrue(calls === 1);
          assert.equal(arguments.length, 0);
        },
        lineStart: function() {
          ++calls;
          assert.isTrue(calls === 2 || calls === 6);
          assert.equal(arguments.length, 0);
        },
        point: function(x, y) {
          ++calls;
          assert.equal(arguments.length, 2);
          if (calls === 3) {
            assert.equal(x, 1);
            assert.equal(y, 2);
          } else if (calls === 4) {
            assert.equal(x, 3);
            assert.equal(y, 4);
          } else if (calls === 7) {
            assert.equal(x, 5);
            assert.equal(y, 6);
          } else if (calls === 8) {
            assert.equal(x, 7);
            assert.equal(y, 8);
          } else {
            assert.fail("too many points");
          }
        },
        lineEnd: function() {
          ++calls;
          assert.isTrue(calls === 5 || calls === 9);
          assert.equal(arguments.length, 0);
        },
        polygonEnd: function() {
          ++calls;
          assert.isTrue(calls === 10);
          assert.equal(arguments.length, 0);
        }
      });
      assert.equal(calls, 10);
    },
    "MultiPolygon ↦ (polygonStart, lineStart, point{2,}, lineEnd, polygonEnd)*": function(stream) {
      var calls = 0;
      stream({type: "MultiPolygon", coordinates: [[[[1, 2], [3, 4], [1, 2]]], [[[5, 6], [7, 8], [5, 6]]]]}, {
        polygonStart: function() {
          ++calls;
          assert.isTrue(calls === 1 || calls === 7);
          assert.equal(arguments.length, 0);
        },
        lineStart: function() {
          ++calls;
          assert.isTrue(calls === 2 || calls === 8);
          assert.equal(arguments.length, 0);
        },
        point: function(x, y) {
          ++calls;
          assert.equal(arguments.length, 2);
          if (calls === 3) {
            assert.equal(x, 1);
            assert.equal(y, 2);
          } else if (calls === 4) {
            assert.equal(x, 3);
            assert.equal(y, 4);
          } else if (calls === 9) {
            assert.equal(x, 5);
            assert.equal(y, 6);
          } else if (calls === 10) {
            assert.equal(x, 7);
            assert.equal(y, 8);
          } else {
            assert.fail("too many points");
          }
        },
        lineEnd: function() {
          ++calls;
          assert.isTrue(calls === 5 || calls === 11);
          assert.equal(arguments.length, 0);
        },
        polygonEnd: function() {
          ++calls;
          assert.isTrue(calls === 6 || calls === 12);
          assert.equal(arguments.length, 0);
        }
      });
      assert.equal(calls, 12);
    },
    "Feature ↦ .*": function(stream) {
      var calls = 0;
      stream({type: "Feature", geometry: {type: "Point", coordinates: [1, 2]}}, {
        point: function(x, y) {
          ++calls;
          assert.equal(arguments.length, 2);
          assert.equal(x, 1);
          assert.equal(y, 2);
        }
      });
      assert.equal(calls, 1);
    },
    "FeatureCollection ↦ .*": function(stream) {
      var calls = 0;
      stream({type: "FeatureCollection", features: [{type: "Feature", geometry: {type: "Point", coordinates: [1, 2]}}]}, {
        point: function(x, y) {
          ++calls;
          assert.equal(arguments.length, 2);
          assert.equal(x, 1);
          assert.equal(y, 2);
        }
      });
      assert.equal(calls, 1);
    },
    "GeometryCollection ↦ .*": function(stream) {
      var calls = 0;
      stream({type: "GeometryCollection", geometries: [{type: "Point", coordinates: [1, 2]}]}, {
        point: function(x, y) {
          ++calls;
          assert.equal(arguments.length, 2);
          assert.equal(x, 1);
          assert.equal(y, 2);
        }
      });
      assert.equal(calls, 1);
    }
  }
});

suite.export(module);
