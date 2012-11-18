require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.circle");

suite.addBatch({
  "circle": {
    topic: d3.geo.circle,
    "generates a Polygon": function(circle) {
      assert.deepEqual(circle().type, "Polygon"); // TODO test coordinates
    }
  }
});

suite.export(module);
