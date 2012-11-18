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

    "Point": function(path) {
      path({
        type: "Point",
        coordinates: [-63, 18]
      });
      assert.deepEqual(testContext.buffer(), [
        {type: "point", x: 165, y: 160},
      ]);
    },

    "MultiPoint": function(path) {
      path({
        type: "MultiPoint",
        coordinates: [[-63, 18], [-62, 18], [-62, 17]]
      });
      assert.deepEqual(testContext.buffer(), [
        {type: "point", x: 165, y: 160},
        {type: "point", x: 170, y: 160},
        {type: "point", x: 170, y: 165}
      ]);
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
      "MultiPoint": {
        "empty": function(centroid) {
          assert.isNull(centroid({type: "MultiPoint", coordinates: []}));
        },
        "single point": function(centroid) {
          assert.deepEqual(centroid({type: "MultiPoint", coordinates: [[0, 0]]}), [480, 250]);
        },
        "two points": function(centroid) {
          assert.deepEqual(centroid({type: "MultiPoint", coordinates: [[-122, 37], [-74, 40]]}), [-10, 57.5]);
        }
      },
      "LineString": {
        "empty": function(centroid) {
          assert.isNull(centroid({type: "LineString", coordinates: []}));
        },
        "two points": function(centroid) {
          assert.deepEqual(centroid({type: "LineString", coordinates: [[100, 0], [0, 0]]}), [730, 250]);
          assert.deepEqual(centroid({type: "LineString", coordinates: [[0, 0], [100, 0], [101, 0]]}), [732.5, 250]);
        },
        "two points, one unique": function(centroid) {
          assert.isNull(centroid({type: "LineString", coordinates: [[-122, 37], [-122, 37]]}));
          assert.isNull(centroid({type: "LineString", coordinates: [[ -74, 40], [ -74, 40]]}));
        },
        "three points; two unique": function(centroid) {
          assert.deepEqual(centroid({type: "LineString", coordinates: [[-122, 37], [-74, 40], [-74, 40]]}), [-10, 57.5]);
        },
        "three points": function(centroid) {
          assert.inDelta(centroid({type: "LineString", coordinates: [[-122, 37], [-74, 40], [-100, 0]]}), [17.389135, 103.563545], 1e-6);
        }
      },
      "MultiLineString": function(centroid) {
        assert.deepEqual(centroid({type: "MultiLineString", coordinates: [[[100, 0], [0, 0]], [[-10, 0], [0, 0]]]}), [705, 250]);
      },
      "Polygon": {
        "single ring": function(centroid) {
          assert.deepEqual(centroid({type: "Polygon", coordinates: [[[100, 0], [101, 0], [101, 1], [100, 1], [100, 0]]]}), [982.5, 247.5]);
        },
        "zero area": function(centroid) {
          assert.isNull(centroid({type: "Polygon", coordinates: [[[1, 0], [2, 0], [3, 0], [1, 0]]]}));
        },
        "two rings, one zero area": function(centroid) {
          assert.deepEqual(centroid({type: "Polygon", coordinates: [[[100, 0], [101, 0], [101, 1], [100, 1], [100, 0]], [[100.1, 0], [100.2, 0], [100.3, 0], [100.1, 0]]]}), [982.5, 247.5]);
        }
      },
      "MultiPolygon": {
        "empty": function(centroid) {
          assert.isNull(centroid({type: "MultiPolygon", coordinates: []}));
        },
        "single polygon": function(centroid) {
          assert.deepEqual(centroid({type: "MultiPolygon", coordinates: [[[[100, 0], [101, 0], [101, 1], [100, 1], [100, 0]]]]}), [982.5, 247.5]);
        },
        "two polygons": function(centroid) {
          assert.deepEqual(centroid({type: "MultiPolygon", coordinates: [[[[100, 0], [101, 0], [101, 1], [100, 1], [100, 0]]], [[[0, 0], [1, 0], [1, -1], [0, -1], [0, 0]]]]}), [732.5, 250]);
        },
        "two polygons, one zero area": function(centroid) {
          assert.deepEqual(centroid({type: "MultiPolygon", coordinates: [[[[100, 0], [101, 0], [101, 1], [100, 1], [100, 0]]], [[[0, 0], [1, 0], [2, 0], [0, 0]]]]}), [982.5, 247.5]);
        }
      },
      "GeometryCollection": {
        "is undefined": function(centroid) {
          assert.isUndefined(centroid({type: "GeometryCollection", geometries: []}));
        }
      },
      "FeatureCollection": {
        "is undefined": function(centroid) {
          assert.isUndefined(centroid({type: "FeatureCollection", features: []}));
        }
      }
    },

    "clipAngle(90)": {
      topic: function() {
        return d3.geo.path()
            .context(testContext)
            .projection(d3.geo.equirectangular()
              .scale(900 / Math.PI)
              .precision(0)
              .clipAngle(90));
      },
      "Point": function(path) {
        path({
          type: "Point",
          coordinates: [-63, 18]
        });
        assert.deepEqual(testContext.buffer(), [
          {type: "point", x: 165, y: 160},
        ]);
      },
      "MultiPoint": function(path) {
        path({
          type: "MultiPoint",
          coordinates: [[-63, 18], [-62, 18], [-62, 17]]
        });
        assert.deepEqual(testContext.buffer(), [
          {type: "point", x: 165, y: 160},
          {type: "point", x: 170, y: 160},
          {type: "point", x: 170, y: 165}
        ]);
      },
      "Polygon": {
        "inserts exterior along clip edge if polygon interior surrounds it": function(path) {
          path({type: "Polygon", coordinates: [[[80, -80], [80, 80], [-80, 80], [-80, -80], [80, -80]]]});
          assert.equal(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }).length, 2);
        },
        "inserts exterior along clip edge if polygon exterior surrounds it": function(path) {
          path({type: "Polygon", coordinates: [[[100, -80], [-100, -80], [-100, 80], [100, 80], [100, -80]]]});
          assert.equal(testContext.buffer().filter(function(d) { return d.type === "moveTo"; }).length, 1);
        }
      }
    },
    "stereographic.precision(1)": {
      topic: function() {
        return d3.geo.path()
            .context(testContext)
            .projection(d3.geo.stereographic()
              .precision(1));
      },
      "correctly resamples points on antemeridian": function(path) {
        path({type: "LineString", coordinates: [[0, 90], [90, 0]]});
        assert.deepEqual(testContext.buffer(), [
          {type: "moveTo", x: 480, y: 100},
          {type: "lineTo", x: 509, y: 103},
          {type: "lineTo", x: 537, y: 111},
          {type: "lineTo", x: 563, y: 125},
          {type: "lineTo", x: 586, y: 144},
          {type: "lineTo", x: 605, y: 167},
          {type: "lineTo", x: 619, y: 193},
          {type: "lineTo", x: 627, y: 221},
          {type: "lineTo", x: 630, y: 250}
        ]);
      }
    },
    "albers.precision(1)": {
      topic: function() {
        return d3.geo.path()
            .context(testContext)
            .projection(d3.geo.albers()
              .scale(140)
              .rotate([0, 0])
              .precision(1));
      },
      "resampling near poles": function(path) {
        path({type: "LineString", coordinates: [[0, 88], [180, 89]]});
        assert.isTrue(testContext.buffer().filter(function(d) { return d.type === "lineTo"; }).length > 1);
        path({type: "LineString", coordinates: [[180, 90], [1, 89.5]]});
        assert.isTrue(testContext.buffer().filter(function(d) { return d.type === "lineTo"; }).length > 1);
      }
    },
    "rotate([0, 0, 0])": {
      "longitudes wrap at ±180°": function(path) {
        path({type: "Point", coordinates: [180 + 1e-6, 0]});
        assert.deepEqual(testContext.buffer(), [{type: "point", x: -420, y: 250}]);
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

function feature(o) {
  return {type: "Feature", geometry: o};
}

suite.export(module);
