var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.time.dayOfYear");

suite.addBatch({
  "dayOfYear": {
    topic: load("time/day").expression("d3.time.dayOfYear"),
    "no floating-point rounding error": function(dayOfYear) {
      assert.equal(dayOfYear(new Date(2011, 4, 9)), 128);
    }
  }
});

suite.export(module);
