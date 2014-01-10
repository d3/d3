var vows = require("vows"),
    _ = require("../../"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.geom.hull");

suite.addBatch({
  "hull": {
    topic: load("geom/hull").expression("d3.geom.hull"),
    "the default hull layout": {
      topic: function(hull) {
        return hull();
      },
      "has the default x-accessor, d[0]": function(h) {
        assert.strictEqual(h.x()([42, 43]), 42);
      },
      "has the default y-accessor, d[1]": function(h) {
        assert.strictEqual(h.y()([42, 43]), 43);
      },
      "of no points is empty": function(h) {
        assert.deepEqual(h([]), []);
      },
      "of one point is empty": function(h) {
        assert.deepEqual(h([[200, 200]]), []);
      },
      "of two points is empty": function(h) {
        assert.deepEqual(h([[200, 200], [760, 300]]), []);
      },
      "for three points": function(h) {
        assert.deepEqual(h([[200, 200], [760, 300], [500, 500]]), [[760, 300], [200, 200], [500, 500]]);
      },
      "for four points": function(h) {
        assert.deepEqual(h([[200, 200], [760, 300], [500, 500], [400, 400]]), [[760, 300], [200, 200], [500, 500]]);
      },
      "returns a counter-clockwise polygon": function(h) {
        assert.greater(_.geom.polygon(h([[200, 200], [760, 300], [500, 500], [400, 400]])).area(), 0);
      },
      "handles points with duplicate ordinates": function(h) {
        assert.deepEqual(h([[-10, -10], [10, 10], [10, -10], [-10, 10]]), [[10, 10], [10, -10], [-10, -10], [-10, 10]]);
      },
      "handles overlapping upper and lower hulls": function(h) {
        assert.deepEqual(h([[0, -10], [0, 10], [0, 0], [10, 0], [-10, 0]]), [[10, 0], [0, -10], [-10, 0], [0, 10]]);
      },

      // Cases below taken from http://uva.onlinejudge.org/external/6/681.html

      "for a set of 6 points with non-trivial hull": function(h) {
        var poly = [[60,20], [250,140], [180,170], [79,140], [50,60], [60,20]];
        var expectedHull = [[250,140], [60,20], [50,60], [79,140], [180,170]];
        assert.deepEqual(h(poly), expectedHull);
      },
      "for a set of 12 points with non-trivial hull": function(h) {
        var poly = [[50,60], [60,20], [70,45], [100,70], [125,90], [200,113], [250,140], [180,170], [105,140], [79,140], [60,85], [50,60]];
        var expectedHull = [[250,140], [60,20], [50,60], [79,140], [180,170]];
        assert.deepEqual(h(poly), expectedHull);
      },
      "for a set of 15 points with non-trivial hull": function(h) {
        var poly = [[30,30], [50,60], [60,20], [70,45], [86,39], [112,60], [200,113], [250,50], [300,200], [130,240], [76,150], [47,76], [36,40], [33,35], [30,30]];
        var expectedHull = [[300,200], [250,50], [60,20], [30,30], [47,76], [76,150], [130,240]];
        assert.deepEqual(h(poly), expectedHull);
      }
    },
    "the hull layout with custom accessors": {
      topic: function(hull) {
        return hull().x(function(d) { return d.x; }).y(function(d) { return d.y; });
      },
      "of four points": function(h) {
        assert.deepEqual(h([{x: 200, y: 200}, {x: 760, y: 300}, {x: 500, y: 500}, {x: 400, y: 400}]), [{x: 760, y: 300}, {x: 200, y: 200}, {x: 500, y: 500}]);
      }
    },
    "the default hull layout applied directly": {
      "for no points is empty": function(h) {
        return h([]);
      },
      "for one point is empty": function(h) {
        return h([[200, 200]]);
      },
      "for two points is empty": function(h) {
        return h([[200, 200], [760, 300]]);
      },
      "for three points": function(h) {
        assert.deepEqual(h([[200, 200], [760, 300], [500, 500]]), [[760, 300], [200, 200], [500, 500]]);
      },
      "for four points": function(h) {
        assert.deepEqual(h([[200, 200], [760, 300], [500, 500], [400, 400]]), [[760, 300], [200, 200], [500, 500]]);
      }
    }
  }
});

suite.export(module);
