require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.distance");

suite.addBatch({
  "distance": {
    "computes the great-arc distance": function() {
      assert.equal(d3.geo.distance([0, 0], [0, 0]), 0);
      assert.inDelta(d3.geo.distance([118 + 24 / 60, 33 + 57 / 60], [ 73 + 47 / 60, 40 + 38 / 60]), 3973 / 6371, .5);
    }
  }
});

suite.export(module);
