var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.interpolateNumber");

suite.addBatch({
  "interpolateNumber": {
    topic: load("interpolate/number").expression("d3.interpolateNumber"),
    "interpolates numbers": function(interpolate) {
      assert.strictEqual(interpolate(2, 12)(0.25), 4.5);
      assert.strictEqual(interpolate(2, 12)(0.75), 9.5);
    },
    "coerces strings to numbers": function(interpolate) {
      assert.strictEqual(interpolate("2", "12")(0.25), 4.5);
    }
  }
});

suite.export(module);
