require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.deviation");

suite.addBatch({
  "deviation": {
    topic: function() {
      return d3.deviation;
    },
    "returns the sd value for numbers": function(deviation) {
      assert.isNaN(deviation([1]));
      assert.equal(deviation([5, 1, 2, 3, 4]), 1.5811388300841898);
      assert.equal(deviation([20, 3]), 12.020815280171307);
      assert.equal(deviation([3, 20]), 12.020815280171307);
    },
    "ignores null, undefined and NaN": function(deviation) {
      assert.equal(deviation([NaN, 1, 2, 3, 4, 5]), 1.5811388300841898);
      assert.equal(deviation([1, 2, 3, 4, 5, NaN]), 1.5811388300841898);
      assert.equal(deviation([10, null, 3, undefined, 5, NaN]), 3.605551275463989);
    },
    "can handle large numbers without overflowing": function(deviation) {
      assert.equal(deviation([Number.MAX_VALUE, Number.MAX_VALUE]), 0);
      assert.equal(deviation([-Number.MAX_VALUE, -Number.MAX_VALUE]), 0);
    },
    "returns undefined for empty array": function(deviation) {
      assert.isNaN(deviation([]));
      assert.isUndefined(deviation([null]));
      assert.isUndefined(deviation([undefined]));
      assert.isUndefined(deviation([NaN]));
      assert.isUndefined(deviation([NaN, NaN]));
    },
    "applies the optional accessor function": function(deviation) {
      assert.equal(d3.deviation([[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]], function(d) { return d3.mean(d); }), 2.1213203435596424);
      assert.equal(d3.deviation([1, 2, 3, 4, 5], function(d, i) { return i; }), 1.5811388300841898);
    }
  }
});

suite.export(module);
