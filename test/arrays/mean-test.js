var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.mean");

suite.addBatch({
  "mean": {
    topic: load("arrays/mean"),
    "returns the mean value for numbers": function(d3) {
      assert.equal(d3.mean([1]), 1);
      assert.equal(d3.mean([5, 1, 2, 3, 4]), 3);
      assert.equal(d3.mean([20, 3]), 11.5);
      assert.equal(d3.mean([3, 20]), 11.5);
    },
    "ignores null, undefined and NaN": function(d3) {
      assert.equal(d3.mean([NaN, 1, 2, 3, 4, 5]), 3);
      assert.equal(d3.mean([1, 2, 3, 4, 5, NaN]), 3);
      assert.equal(d3.mean([10, null, 3, undefined, 5, NaN]), 6);
    },
    "can handle large numbers without overflowing": function(d3) {
      assert.equal(d3.mean([Number.MAX_VALUE, Number.MAX_VALUE]), Number.MAX_VALUE);
      assert.equal(d3.mean([-Number.MAX_VALUE, -Number.MAX_VALUE]), -Number.MAX_VALUE);
    },
    "returns undefined for empty array": function(d3) {
      assert.isUndefined(d3.mean([]));
      assert.isUndefined(d3.mean([null]));
      assert.isUndefined(d3.mean([undefined]));
      assert.isUndefined(d3.mean([NaN]));
      assert.isUndefined(d3.mean([NaN, NaN]));
    },
    "applies the optional accessor function": function(d3) {
      assert.equal(d3.mean([[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]], function(d) { return d3.mean(d); }), 4.5);
      assert.equal(d3.mean([1, 2, 3, 4, 5], function(d, i) { return i; }), 2);
    }
  }
});

suite.export(module);
