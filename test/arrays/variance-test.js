var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.variance");

suite.addBatch({
  "variance": {
    topic: load("arrays/variance").expression("d3.variance"),
    "returns the variance value for numbers": function(variance) {
      assert.isUndefined(variance([1]));
      assert.equal(variance([5, 1, 2, 3, 4]), 2.5);
      assert.equal(variance([20, 3]), 144.5);
      assert.equal(variance([3, 20]), 144.5);
    },
    "ignores null, undefined and NaN": function(variance) {
      assert.equal(variance([NaN, 1, 2, 3, 4, 5]), 2.5);
      assert.equal(variance([1, 2, 3, 4, 5, NaN]), 2.5);
      assert.equal(variance([10, null, 3, undefined, 5, NaN]), 13);
    },
    "can handle large numbers without overflowing": function(variance) {
      assert.equal(variance([Number.MAX_VALUE, Number.MAX_VALUE]), 0);
      assert.equal(variance([-Number.MAX_VALUE, -Number.MAX_VALUE]), 0);
    },
    "returns undefined for empty array": function(variance) {
      assert.isUndefined(variance([]));
      assert.isUndefined(variance([null]));
      assert.isUndefined(variance([undefined]));
      assert.isUndefined(variance([NaN]));
      assert.isUndefined(variance([NaN, NaN]));
    },
    "applies the optional accessor function": function(variance) {
      assert.equal(variance([[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]], mean), 4.5);
      assert.equal(variance([1, 2, 3, 4, 5], function(d, i) { return i; }), 2.5);
    }
  }
});

function mean(array) {
  return array.reduce(function(p, v) { return p + v; }) / array.length;
}

suite.export(module);
