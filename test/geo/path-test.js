require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.path");

suite.addBatch({
  "path": {
    topic: function() {
      return d3.geo.path()
          .context(testContext)
          .projection(d3.geo.equirectangular()
            .scale(900 / Math.PI)
            .precision(0));
    },

    "LineString": function(path) {
      path({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [[-63, 18], [-62, 18], [-62, 17]]
        },
      });
      assert.deepEqual(testContext.buffer(), [
        {type: "moveTo", x: 165, y: 160},
        {type: "lineTo", x: 170, y: 160},
        {type: "lineTo", x: 170, y: 165}
      ]);
    },

    "Polygon": function(path) {
      path({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[[-63, 18], [-62, 18], [-62, 17], [-63, 18]]]
        },
      });
      assert.deepEqual(testContext.buffer(), [
        {type: "moveTo", x: 165, y: 160},
        {type: "lineTo", x: 170, y: 160},
        {type: "lineTo", x: 170, y: 165},
        {type: "closePath"}
      ]);
    },

    "returns null when passed null or undefined": function(path) {
      assert.isNull(path(null));
      assert.isNull(path(undefined));
      assert.isNull(path());
    },
    "bogus type name": function(path) {
      assert.isNull(path({
        type: "Feature",
        geometry: {
          type: "__proto__",
          coordinates: [[[-63.03, 18.02], [-63.14, 18.06], [-63.01, 18.07], [-63.03, 18.02]]]
        },
      }));
    },

    "projection": {
      "returns the current projection when called with no arguments": function() {
        var path = d3.geo.path(), projection = d3.geo.albers();
        path.projection(projection);
        assert.strictEqual(path.projection(), projection);
      }
    },

    "pointRadius": {
      "returns the current point radius when called with no arguments": function() {
        var path = d3.geo.path(), radius = function() { return 5; };
        assert.strictEqual(path.pointRadius(), 4.5);
        assert.strictEqual(path.pointRadius(radius).pointRadius(), radius);
      }
    },

    "area": {
      topic: function(path) {
        return path.area;
      },
      "no holes": function(area) {
        assert.strictEqual(area({type: "Polygon", coordinates: [[[100, 0], [101, 0], [101, 1], [100, 1], [100, 0]]]}), 25);
      },
      "holes": function(area) {
        assert.strictEqual(area({type: "Polygon", coordinates: [[[100, 0], [101, 0], [101, 1], [100, 1], [100, 0]],
                                                                [[100.2, .2], [100.8, .2], [100.8, .8], [100.2, .8], [100.2, .2]]]}), 16);
      }
    },

    "centroid": {
      topic: function(path) {
        return path.centroid;
      },
      "Point": function(centroid) {
        assert.deepEqual(centroid({type: "Point", coordinates: [0, 0]}), [480, 250]);
      },
      "MultiPoint": function(centroid) {
        assert.deepEqual(centroid({type: "MultiPoint", coordinates: [[0, 0]]}), [480, 250]);
      },
      "LineString": function(centroid) {
        assert.deepEqual(centroid({type: "LineString", coordinates: [[100, 0], [0, 0]]}), [730, 250]);
      },
      "MultiLineString": function(centroid) {
        assert.deepEqual(centroid({type: "MultiLineString", coordinates: [[[100, 0], [0, 0]], [[-10, 0], [0, 0]]]}), [705, 250]);
      },
      "Polygon": function(centroid) {
        assert.deepEqual(centroid({type: "Polygon", coordinates: [[[100, 0], [101, 0], [101, 1], [100, 1], [100, 0]]]}), [982.5, 247.5]);
      },
      "MultiPolygon": function(centroid) {
        assert.deepEqual(centroid({type: "MultiPolygon", coordinates: [[[[100, 0], [101, 0], [101, 1], [100, 1], [100, 0]]], [[[0, 0], [1, 0], [1, -1], [0, -1], [0, 0]]]]}), [732.5, 250]);
      }
    }
  }
});

var testBuffer = [];

var testContext = {
  point: function(x, y) { testBuffer.push({type: "point", x: Math.round(x), y: Math.round(y)}); },
  moveTo: function(x, y) { testBuffer.push({type: "moveTo", x: Math.round(x), y: Math.round(y)}); },
  lineTo: function(x, y) { testBuffer.push({type: "lineTo", x: Math.round(x), y: Math.round(y)}); },
  closePath: function() { testBuffer.push({type: "closePath"}); },
  buffer: function() { var result = testBuffer; testBuffer = []; return result; }
};

suite.export(module);
