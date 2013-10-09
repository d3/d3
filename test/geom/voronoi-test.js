var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.geom.voronoi");

suite.addBatch({
  "voronoi": {
    topic: load("geom/voronoi").expression("d3.geom.voronoi"),

    "the default voronoi layout": {
      topic: function(voronoi) {
        return voronoi();
      },
      "has no defined clip extent": function(v) {
        assert.isNull(v.clipExtent());
      },
      "has no defined size": function(v) {
        assert.isNull(v.size());
      },
      "returns the configured clip extent": function(v) {
        try {
          assert.deepEqual(v.clipExtent([[1, 2], [3, 4]]).clipExtent(), [[1, 2], [3, 4]]);
        } finally {
          v.clipExtent(null);
        }
      },
      "returns the configured size": function(v) {
        try {
          assert.deepEqual(v.size([1, 2]).size(), [1, 2]);
        } finally {
          v.size(null);
        }
      },
      "size implies a clip extent from [0, 0]": function(v) {
        try {
          assert.deepEqual(v.size([1, 2]).clipExtent(), [[0, 0], [1, 2]]);
        } finally {
          v.size(null);
        }
      },
      "clip extent implies a size, assuming [0, 0]": function(v) {
        try {
          assert.deepEqual(v.clipExtent([[1, 2], [3, 4]]).size(), [3, 4]);
        } finally {
          v.clipExtent(null);
        }
      },
      "has the default x-accessor, d[0]": function(v) {
        assert.strictEqual(v.x()([42, 43]), 42);
      },
      "has the default y-accessor, d[1]": function(v) {
        assert.strictEqual(v.y()([42, 43]), 43);
      },
      "of two points": {
        topic: function(v) {
          return v([[200, 200], [760, 300]]);
        },
        "returns two cells with the expected geometry": function(cells) {
          assert.inDelta(cells, [
            [[-178046.7857142857, 1e6], [179096.07142857145, -1e6], [-1e6, -1e6], [-1e6, 1e6]],
            [[179096.07142857145, -1e6], [-178046.7857142857, 1e6], [1e6, 1e6], [1e6, -1e6]]
          ], 1e-6);
        },
        "the returned cells are open polygons": function(cells) {
          cells.forEach(function(cell) {
            assert.greater(cell.length, 2);
            cell.forEach(function(point) {
              assert.equal(point.length, 2);
              assert.isNumber(point[0]);
              assert.isNumber(point[1]);
            });
            assert.notDeepEqual(cell[0], cell[cell.length - 1]);
          });
        },
        "the returned cells are not clipped to the layout size": function(cells) {
          var x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
          cells.forEach(function(cell) {
            cell.forEach(function(point) {
              if (point[0] < x0) x0 = point[0];
              if (point[0] > x1) x1 = point[0];
              if (point[1] < y0) y0 = point[1];
              if (point[1] > y1) y1 = point[1];
            });
          });
          assert.strictEqual(x0, -1e6);
          assert.strictEqual(x1, 1e6);
          assert.strictEqual(y0, -1e6);
          assert.strictEqual(y1, 1e6);
        },
        "the returned cells' point property points back to the input point": function(cells) {
          assert.deepEqual(cells.map(function(cell) { return cell.point; }), [[200, 200], [760, 300]]);
        },
        "the returned cells’ have positive area": function(cells) {
          cells.forEach(function(cell) {
            assert.ok(d3.geom.polygon(cell).area() > 0);
          });
        }
      },
      "links": {
        "for two points": function(v) {
          assert.deepEqual(v.links([[200, 200], [760, 300]]), [
            {source: [200, 200], target: [760, 300]}
          ]);
        },
        "for three points": function(v) {
          assert.deepEqual(v.links([[200, 200], [500, 250], [760, 300]]), [
            {source: [200, 200], target: [500, 250]},
            {source: [500, 250], target: [760, 300]},
            {source: [760, 300], target: [200, 200]}
          ]);
        }
      },
      "triangles": {
        "for three points": function(v) {
          assert.deepEqual(v.triangles([[200, 200], [500, 250], [760, 300]]), [
            [[200, 200], [760, 300], [500, 250]]
          ]);
        }
      }
    },

    "a voronoi layout with custom x- and y-accessors": {
      topic: function(voronoi) {
        return voronoi()
            .x(function(d) { return d.x; })
            .y(43);
      },
      "observes the specified x-accessor, a function": function(v) {
        assert.strictEqual(v.x()({x: 42, y: 43}), 42);
      },
      "observes the specified y-accessor, a constant": function(v) {
        assert.strictEqual(v.y(), 43);
      },
      "of two points": {
        topic: function(v) {
          return v([{x: 200}, {x: 760}]);
        },
        "returns two cells with the expected geometry": function(cells) {
          assert.inDelta(cells, [
            [[480, 1e6], [480, -1e6], [-1e6, -1e6], [-1e6, 1e6]],
            [[480, -1e6], [480, 1e6], [1e6, 1e6], [1e6, -1e6]]
          ], 1e-6);
        }
      },
      "links": {
        topic: function(v) {
          return v.y(function(d) { return d.y; });
        },
        "for two points": function(v) {
          assert.deepEqual(v.links([{x: 200, y: 200}, {x: 760, y: 300}]), [
            {source: {x: 200, y: 200}, target: {x: 760, y: 300}}
          ]);
        },
        "for three points": function(v) {
          assert.deepEqual(v.links([{x: 200, y: 200}, {x: 500, y: 250}, {x: 760, y: 300}]), [
            {source: {x: 200, y: 200}, target: {x: 500, y: 250}},
            {source: {x: 500, y: 250}, target: {x: 760, y: 300}},
            {source: {x: 760, y: 300}, target: {x: 200, y: 200}}
          ]);
        }
      }
    },

    "a voronoi layout with clip extent [[0, 0], [960, 500]]": {
      topic: function(voronoi) {
        return voronoi()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; })
            .clipExtent([[0, 0], [960, 500]]);
      },
      "of two points": {
        topic: function(v) {
          return v([{x: 200, y: 200}, {x: 760, y: 300}]);
        },
        "returns two cells with the expected geometry": function(cells) {
          assert.inDelta(cells, [
            [[435.35714285715324, 500], [524.6428571428696, 0], [0, 0], [0, 500]],
            [[524.6428571428696, 0], [435.35714285715324, 500], [960, 500], [960, 0]]
          ], 1e-6);
        },
        "the returned cells are clipped to the layout size": function(cells) {
          assert.isTrue(cells.every(function(cell) {
            return cell.every(function(point) {
              return point[0] >= 0 && point[0] <= 960
                  && point[1] >= 0 && point[1] <= 500;
            });
          }));
        }
      }
    },

    "the default voronoi layout applied directly": {
      "with zero points": {
        "returns the empty array": function(voronoi) {
          assert.deepEqual(polygons(voronoi([])), []);
        }
      },
      "with one point": {
        topic: function(v) {
          return v([[50, 50]]);
        },
        "returns the semi-infinite bounding box": function(cells) {
          assert.deepEqual(polygons(cells), [
            [[-1e6, 1e6], [1e6, 1e6], [1e6, -1e6], [-1e6, -1e6]]
          ]);
        },
        "the returned cell has positive area": function(cells) {
          assert.ok(d3.geom.polygon(cells[0]).area() > 0);
        }
      },
      "with two points": {
        "separated by a horizontal line": function(voronoi) {
          assert.deepEqual(polygons(voronoi([[0, -100], [0, 100]])), [
            [[-1e6, 0], [1e6, 0], [1e6, -1e6], [-1e6, -1e6]],
            [[1e6, 0], [-1e6, 0], [-1e6, 1e6], [1e6, 1e6]],
          ]);
          assert.deepEqual(polygons(voronoi([[0, 100], [0, -100]])), [
            [[1e6, 0], [-1e6, 0], [-1e6, 1e6], [1e6, 1e6]],
            [[-1e6, 0], [1e6, 0], [1e6, -1e6], [-1e6, -1e6]]
          ]);
        },
        "separated by a vertical line": function(voronoi) {
          assert.deepEqual(polygons(voronoi([[100, 0], [-100, 0]])), [
            [[0, -1e6], [0, 1e6], [1e6, 1e6], [1e6, -1e6]],
            [[0, 1e6], [0, -1e6], [-1e6, -1e6], [-1e6, 1e6]]
          ]);
          assert.deepEqual(polygons(voronoi([[-100, 0], [100, 0]])), [
            [[0, 1e6], [0, -1e6], [-1e6, -1e6], [-1e6, 1e6]],
            [[0, -1e6], [0, 1e6], [1e6, 1e6], [1e6, -1e6]]
          ]);
        },
        "separated by a diagonal line": function(voronoi) {
          assert.deepEqual(polygons(voronoi([[-100, -100], [100, 100]])), [
            [[-1e6, 1e6], [1e6, -1e6], [-1e6, -1e6]],
            [[1e6, -1e6], [-1e6, 1e6], [1e6, 1e6]]
          ]);
          assert.deepEqual(polygons(voronoi([[100, 100], [-100, -100]])), [
            [[1e6, -1e6], [-1e6, 1e6], [1e6, 1e6]],
            [[-1e6, 1e6], [1e6, -1e6], [-1e6, -1e6]]
          ]);
        },
        "separated by an arbitrary diagonal": function(voronoi) {
          assert.deepEqual(polygons(voronoi([[-100, -100], [100, 0]])), [
            [[-500025, 1e6], [499975, -1e6], [-1e6, -1e6], [-1e6, 1e6]],
            [ [499975, -1e6], [-500025, 1e6], [1e6, 1e6], [1e6, -1e6]]
          ]);
        }
      },
      "with three points": {
        "collinear": function(voronoi) {
          assert.deepEqual(polygons(voronoi([[-100, -100], [0, 0], [100, 100]])), [
            [[-1e6, 999900], [999900, -1e6], [-1e6, -1e6]],
            [[-999900, 1e6], [1e6, -999900], [1e6, -1e6], [999900, -1e6], [-1e6, 999900], [-1e6, 1e6]],
            [[1e6, -999900], [-999900, 1e6], [1e6, 1e6]]
          ]);
        }
      }
    }
  }
});

function polygons(cells) {
  cells.forEach(function(cell) { delete cell.point; });
  return cells;
}

suite.export(module);
