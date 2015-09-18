var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.deviation");

suite.addBatch({
  "deviation": {
    topic: load("arrays/deviation").expression("d3.deviation"),
    "returns the sd value for numbers": function(deviation) {
      assert.isUndefined(deviation([1]));
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
      assert.isUndefined(deviation([]));
      assert.isUndefined(deviation([null]));
      assert.isUndefined(deviation([undefined]));
      assert.isUndefined(deviation([NaN]));
      assert.isUndefined(deviation([NaN, NaN]));
    },
    "applies the optional accessor function": function(deviation) {
      assert.equal(deviation([[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]], mean), 2.1213203435596424);
      assert.equal(deviation([1, 2, 3, 4, 5], function(d, i) { return i; }), 1.5811388300841898);
    }
  }
});

function mean(array) {
  return array.reduce(function(p, v) { return p + v; }) / array.length;
}

suite.export(module);
