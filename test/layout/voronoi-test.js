var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.layout.voronoi");

suite.addBatch({
  "voronoi": {
    topic: load("layout/voronoi").expression("d3.layout.voronoi"),

    "the default voronoi layout": {
      topic: function(voronoi) {
        return voronoi();
      },
      "has no defined size": function(v) {
        assert.isNull(v.size());
      },
      "has the default x-acessor, d[0]": function(v) {
        assert.strictEqual(v.x()([42, 43]), 42);
      },
      "has the default y-acessor, d[1]": function(v) {
        assert.strictEqual(v.y()([42, 43]), 43);
      },
      "of two points": {
        topic: function(v) {
          return v([[200, 200], [760, 300]]);
        },
        "returns two cells with the expected geometry": function(cells) {
          assert.inDelta(cells, [
            [[-178046.7857142857, 1e6], [179096.07142857145, -1e6], [-1e6, 1e6], [1e6, 1e6]],
            [[-178046.7857142857, 1e6], [179096.07142857145, -1e6], [-1e6, -1e6], [1e6, -1e6]]
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
        "the returned cells' data points back to the input data": function(cells) {
          assert.deepEqual(cells.map(function(cell) { return cell.data; }), [[200, 200], [760, 300]]);
        }
      },
      "links": {
        "for two points": function(v) {
          assert.deepEqual(v.links([[200, 200], [760, 300]]), [
            {source: [200, 200], target: [760, 300]}]);
        },
        "for three points": function(v) {
          assert.deepEqual(v.links([[200, 200], [500, 250], [760, 300]]), [
            {source: [200, 200], target: [760, 300]},
            {source: [500, 250], target: [760, 300]},
            {source: [200, 200], target: [500, 250]}]);
        }
      },
      "triangles": {
        "for three points": function(v) {
          assert.deepEqual(v.triangles([[200, 200], [500, 250], [760, 300]]).map(function(d) {
            return d.map(function(d) { return d.data; });
          }), [[ [200, 200], [760, 300], [500, 250]]]);
        }
      }
    },

    "a voronoi layout with custom x- and y-accessors": {
      topic: function(voronoi) {
        return voronoi()
            .x(function(d) { return d.x; })
            .y(43);
      },
      "observes the specified x-acessor, a function": function(v) {
        assert.strictEqual(v.x()({x: 42, y: 43}), 42);
      },
      "observes the specified y-acessor, a constant": function(v) {
        assert.strictEqual(v.y(), 43);
      },
      "of two points": {
        topic: function(v) {
          return v([{x: 200}, {x: 760}]);
        },
        "returns two cells with the expected geometry": function(cells) {
          assert.inDelta(cells, [
            [[480, 1e6], [480, -1e6], [-1e6, -1e6], [-1e6, 1e6]],
            [[480, -1e6], [480, 1e6], [1e6, -1e6], [1e6, 1e6]]
          ], 1e-6);
        }
      }
    },

    "a voronoi layout with size 960x500": {
      topic: function(voronoi) {
        return voronoi()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; })
            .size([960, 500]);
      },
      "of two points": {
        topic: function(v) {
          return v([{x: 200, y: 200}, {x: 760, y: 300}]);
        },
        "returns two cells with the expected geometry": function(cells) {
          assert.inDelta(cells, [
            [[435.35714285715324, 500], [524.6428571428696, 0], [0, 0], [0, 500]],
            [[960, 0], [960, 500], [435.35714285715324, 500], [524.6428571428696, 0]]
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
    }
  }
});

suite.export(module);
