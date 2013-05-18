var vows = require("vows"),
    _ = require("../../"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.geom.polygon");

suite.addBatch({
  "polygon": {
    topic: load("geom/polygon").expression("d3.geom.polygon"),
    "closed counterclockwise unit square": {
      topic: function(polygon) {
        return polygon([[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]);
      },
      "has area 1": function(p) {
        assert.equal(p.area(), 1);
      },
      "has centroid ⟨.5,.5⟩": function(p) {
        assert.deepEqual(p.centroid(), [.5, .5]);
      }
    },
    "closed clockwise unit square": {
      topic: function(polygon) {
        return polygon([[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]);
      },
      "has area 1": function(p) {
        assert.equal(p.area(), -1);
      },
      "has centroid ⟨.5,.5⟩": function(p) {
        assert.deepEqual(p.centroid(), [.5, .5]);
      }
    },
    "closed clockwise triangle": {
      topic: function(polygon) {
        return polygon([[1, 1], [3, 2], [2, 3], [1, 1]]);
      },
      "has area 1.5": function(p) {
        assert.equal(p.area(), -1.5);
      },
      "has centroid ⟨2,2⟩": function(p) {
        var centroid = p.centroid();
        assert.inDelta(centroid[0], 2, 1e-6);
        assert.inDelta(centroid[1], 2, 1e-6);
      }
    },
    "open counterclockwise unit square": {
      topic: function(polygon) {
        return polygon([[0, 0], [0, 1], [1, 1], [1, 0]]);
      },
      "has area 1": function(p) {
        assert.equal(p.area(), 1);
      },
      "has centroid ⟨.5,.5⟩": function(p) {
        assert.deepEqual(p.centroid(), [.5, .5]);
      }
    },
    "open clockwise unit square": {
      topic: function(polygon) {
        return polygon([[0, 0], [1, 0], [1, 1], [0, 1]]);
      },
      "has area 1": function(p) {
        assert.equal(p.area(), -1);
      },
      "has centroid ⟨.5,.5⟩": function(p) {
        assert.deepEqual(p.centroid(), [.5, .5]);
      }
    },
    "open clockwise triangle": {
      topic: function(polygon) {
        return polygon([[1, 1], [3, 2], [2, 3]]);
      },
      "has area 1.5": function(p) {
        assert.equal(p.area(), -1.5);
      },
      "has centroid ⟨2,2⟩": function(p) {
        var centroid = p.centroid();
        assert.inDelta(centroid[0], 2, 1e-6);
        assert.inDelta(centroid[1], 2, 1e-6);
      }
    },
    "large square": {
      topic: function(polygon) {
        var r = 1e8,
            d = _.range(0, r, r / 1e4);
        return polygon(
            d.map(function(y) { return [0, y]; }).concat(
            d.map(function(x) { return [x, r]; })).concat(
            d.map(function(y) { return [r, y]; }).reverse()).concat(
            d.map(function(x) { return [x, 0]; }).reverse()));
      },
      "has area 1e16 - 5e7": function(p) {
        assert.equal(p.area(), 1e16 - 5e7);
      }
    }
  }
});

suite.export(module);
