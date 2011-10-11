require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.median");

suite.addBatch({
  "median": {
    topic: function() {
      return d3.median;
    },
    "returns the median value for numbers": function(median) {
      assert.equal(median([1]), 1);
      assert.equal(median([5, 1, 2, 3, 4]), 3);
      assert.equal(median([20, 3]), 11.5);
      assert.equal(median([3, 20]), 11.5);
    },
    "ignores null, undefined and NaN": function(median) {
      assert.equal(median([NaN, 1, 2, 3, 4, 5]), 3);
      assert.equal(median([1, 2, 3, 4, 5, NaN]), 3);
      assert.equal(median([10, null, 3, undefined, 5, NaN]), 5);
    },
    "can handle large numbers without overflowing": function(median) {
      assert.equal(median([Number.MAX_VALUE, Number.MAX_VALUE]), Number.MAX_VALUE);
      assert.equal(median([-Number.MAX_VALUE, -Number.MAX_VALUE]), -Number.MAX_VALUE);
    },
    "returns undefined for empty array": function(median) {
      assert.isUndefined(median([]));
      assert.isUndefined(median([null]));
      assert.isUndefined(median([undefined]));
      assert.isUndefined(median([NaN]));
      assert.isUndefined(median([NaN, NaN]));
    },
    "applies the optional accessor function": function(median) {
      assert.equal(d3.median([[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]], function(d) { return d3.median(d); }), 4.5);
      assert.equal(d3.median([1, 2, 3, 4, 5], function(d, i) { return i; }), 2);
    }
  }
});

suite.export(module);
