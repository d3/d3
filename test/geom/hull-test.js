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
        assert.deepEqual(h([[200, 200], [760, 300], [500, 500]]), [[500, 500], [760, 300], [200, 200]]);
      },
      "for four points": function(h) {
        assert.deepEqual(h([[200, 200], [760, 300], [500, 500], [400, 400]]), [[500, 500], [760, 300], [200, 200]]);
      },
      "returns a counter-clockwise polygon": function(h) {
        assert.greater(_.geom.polygon(h([[200, 200], [760, 300], [500, 500], [400, 400]])).area(), 0);
      }
    },
    "the hull layout with custom accessors": {
      topic: function(hull) {
        return hull().x(function(d) { return d.x; }).y(function(d) { return d.y; });
      },
      "of four points": function(h) {
        assert.deepEqual(h([{x: 200, y: 200}, {x: 760, y: 300}, {x: 500, y: 500}, {x: 400, y: 400}]), [{x: 500, y: 500}, {x: 760, y: 300}, {x: 200, y: 200}]);
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
        assert.deepEqual(h([[200, 200], [760, 300], [500, 500]]), [[500, 500], [760, 300], [200, 200]]);
      },
      "for four points": function(h) {
        assert.deepEqual(h([[200, 200], [760, 300], [500, 500], [400, 400]]), [[500, 500], [760, 300], [200, 200]]);
      }
    }
  }
});

suite.export(module);
