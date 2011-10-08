require("../env");
require("../../d3");
require("../../d3.geom");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geom.polygon");

suite.addBatch({
  "polygon": {
    topic: function() {
      return d3.geom.polygon;
    },
    "area": {
      "last point equal to start point": function(polygon) {
        assert.equal(polygon([[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]).area(), 1);
      },
      "implicitly ending at start point": function(polygon) {
        assert.equal(polygon([[0, 0], [0, 1], [1, 1], [1, 0]]).area(), 1);
      }
    },
    "centroid": {
      "last point equal to start point": function(polygon) {
        assert.deepEqual(polygon([[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]).centroid(), [.5, .5]);
      },
      "implicitly ending at start point": function(polygon) {
        assert.deepEqual(polygon([[0, 0], [0, 1], [1, 1], [1, 0]]).centroid(), [.5, .5]);
      }
    }
  }
});

suite.export(module);
