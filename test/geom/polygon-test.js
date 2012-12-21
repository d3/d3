require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geom.polygon");

suite.addBatch({
  "closed counterclockwise unit square": {
    topic: function() {
      return d3.geom.polygon([[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]);
    },
    "has area 1": function(polygon) {
      assert.equal(polygon.area(), 1);
    },
    "has centroid ⟨.5,.5⟩": function(polygon) {
      assert.deepEqual(polygon.centroid(), [.5, .5]);
    }
  },
  "closed clockwise unit square": {
    topic: function() {
      return d3.geom.polygon([[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]);
    },
    "has area 1": function(polygon) {
      assert.equal(polygon.area(), -1);
    },
    "has centroid ⟨.5,.5⟩": function(polygon) {
      assert.deepEqual(polygon.centroid(), [.5, .5]);
    }
  },
  "closed clockwise triangle": {
    topic: function() {
      return d3.geom.polygon([[1, 1], [3, 2], [2, 3], [1, 1]]);
    },
    "has area 1.5": function(polygon) {
      assert.equal(polygon.area(), -1.5);
    },
    "has centroid ⟨2,2⟩": function(polygon) {
      var centroid = polygon.centroid();
      assert.inDelta(centroid[0], 2, 1e-6);
      assert.inDelta(centroid[1], 2, 1e-6);
    }
  },
  "open counterclockwise unit square": {
    topic: function() {
      return d3.geom.polygon([[0, 0], [0, 1], [1, 1], [1, 0]]);
    },
    "has area 1": function(polygon) {
      assert.equal(polygon.area(), 1);
    },
    "has centroid ⟨.5,.5⟩": function(polygon) {
      assert.deepEqual(polygon.centroid(), [.5, .5]);
    }
  },
  "open clockwise unit square": {
    topic: function() {
      return d3.geom.polygon([[0, 0], [1, 0], [1, 1], [0, 1]]);
    },
    "has area 1": function(polygon) {
      assert.equal(polygon.area(), -1);
    },
    "has centroid ⟨.5,.5⟩": function(polygon) {
      assert.deepEqual(polygon.centroid(), [.5, .5]);
    }
  },
  "open clockwise triangle": {
    topic: function() {
      return d3.geom.polygon([[1, 1], [3, 2], [2, 3]]);
    },
    "has area 1.5": function(polygon) {
      assert.equal(polygon.area(), -1.5);
    },
    "has centroid ⟨2,2⟩": function(polygon) {
      var centroid = polygon.centroid();
      assert.inDelta(centroid[0], 2, 1e-6);
      assert.inDelta(centroid[1], 2, 1e-6);
    }
  },
  "large square": {
    topic: function() {
      var r = 1e8,
          d = d3.range(0, r, r / 1e4);
      return d3.geom.polygon(
          d.map(function(y) { return [0, y]; }).concat(
          d.map(function(x) { return [x, r]; })).concat(
          d.map(function(y) { return [r, y]; }).reverse()).concat(
          d.map(function(x) { return [x, 0]; }).reverse()));
    },
    "has area 1e16 - 5e7": function(polygon) {
      assert.equal(polygon.area(), 1e16 - 5e7);
    }
  },
});

suite.export(module);
