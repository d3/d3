require("../env");
require("../../d3");
require("../../d3.geom");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geom.polygon");

suite.addBatch({
  "counterclockwise polygon (last point equal to start point)": {
    topic: function() {
      return d3.geom.polygon([[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]);
    },
    "area": function(polygon) {
      assert.equal(polygon.area(), 1);
    },
    "centroid": function(polygon) {
      assert.deepEqual(polygon.centroid(), [.5, .5]);
    }
  },
  "counterclockwise polygon (implicitly ending at start point)": {
    topic: function() {
      return d3.geom.polygon([[0, 0], [0, 1], [1, 1], [1, 0]]);
    },
    "area": function(polygon) {
      assert.equal(polygon.area(), 1);
    },
    "centroid": function(polygon) {
      assert.deepEqual(polygon.centroid(), [.5, .5]);
    }
  },
  "clockwise polygon (last point equal to start point)": {
    topic: function() {
      return d3.geom.polygon([[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]);
    },
    "area": function(polygon) {
      assert.equal(polygon.area(), -1);
    },
    "centroid": function(polygon) {
      assert.deepEqual(polygon.centroid(), [.5, .5]);
    }
  },
  "clockwise polygon (implicitly ending at start point)": {
    topic: function() {
      return d3.geom.polygon([[0, 0], [1, 0], [1, 1], [0, 1]]);
    },
    "area": function(polygon) {
      assert.equal(polygon.area(), -1);
    },
    "centroid": function(polygon) {
      assert.deepEqual(polygon.centroid(), [.5, .5]);
    }
  }
});

suite.export(module);
