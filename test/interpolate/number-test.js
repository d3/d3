var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.interpolateNumber");

suite.addBatch({
  "interpolateNumber": {
    topic: load("interpolate/number").expression("d3.interpolateNumber"),
    "interpolates numbers": function(interpolate) {
      assert.strictEqual(interpolate(2, 12)(.4), 6);
      assert.strictEqual(interpolate(2, 12)(.6), 8);
    },
    "coerces strings to numbers": function(interpolate) {
      assert.strictEqual(interpolate("2", "12")(.4), 6);
    }
  }
});

suite.export(module);
