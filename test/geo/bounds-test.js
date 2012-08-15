require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.bounds");

suite.addBatch({
  "bounds": {
    topic: function() { return d3.geo.bounds; },
    "simple": function(bounds) {
      assert.deepEqual(bounds({
        type: "MultiPoint",
        coordinates: [[0, 0], [-1, -1], [-1, 1], [1, 1], [1, -1], [.5, -.5]]
      }), [[-1, -1], [1, 1]]);
    }
  }
});

suite.export(module);
