require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.mean");

suite.addBatch({
  "mean": {
    topic: function() {
      return d3.mean;
    },
    "returns the mean value for numbers": function(mean) {
      assert.equal(mean([1]), 1);
      assert.equal(mean([5, 1, 2, 3, 4]), 3);
      assert.equal(mean([20, 3]), 11.5);
      assert.equal(mean([3, 20]), 11.5);
    },
    "ignores null, undefined and NaN": function(mean) {
      assert.equal(mean([NaN, 1, 2, 3, 4, 5]), 3);
      assert.equal(mean([1, 2, 3, 4, 5, NaN]), 3);
      assert.equal(mean([10, null, 3, undefined, 5, NaN]), 6);
    },
    "can handle large numbers without overflowing": function(mean) {
      assert.equal(mean([Number.MAX_VALUE, Number.MAX_VALUE]), Number.MAX_VALUE);
      assert.equal(mean([-Number.MAX_VALUE, -Number.MAX_VALUE]), -Number.MAX_VALUE);
    },
    "returns undefined for empty array": function(mean) {
      assert.isUndefined(mean([]));
      assert.isUndefined(mean([null]));
      assert.isUndefined(mean([undefined]));
      assert.isUndefined(mean([NaN]));
      assert.isUndefined(mean([NaN, NaN]));
    },
    "applies the optional accessor function": function(mean) {
      assert.equal(d3.mean([[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]], function(d) { return d3.mean(d); }), 4.5);
      assert.equal(d3.mean([1, 2, 3, 4, 5], function(d, i) { return i; }), 2);
    }
  }
});

suite.export(module);
