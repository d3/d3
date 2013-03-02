require("../env");

var vows = require("vows"),
    assert = require("../env-assert"),
    time = require("./time"),
    local = time.local,
    utc = time.utc;

var suite = vows.describe("d3.time.dayOfYear");

suite.addBatch({
  "dayOfYear": {
    topic: function() {
      return d3.time.dayOfYear;
    },
    "no floating-point rounding error": function(dayOfYear) {
      assert.equal(dayOfYear(new Date(2011, 4, 9)), 128);
    }
  }
});

suite.export(module);
