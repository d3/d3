require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.extent");

suite.addBatch({
  "extent": {
    topic: function() {
      return d3.extent;
    },
    "compares numeric values for numbers": function(extent) {
      assert.deepEqual(extent([1]), [1, 1]);
      assert.deepEqual(extent([5, 1, 2, 3, 4]), [1, 5]);
      assert.deepEqual(extent([20, 3]), [3, 20]);
      assert.deepEqual(extent([3, 20]), [3, 20]);
    },
    "compares lexicographic values for strings": function(extent) {
      assert.deepEqual(extent(["c", "a", "b"]), ["a", "c"]);
      assert.deepEqual(extent(["20", "3"]), ["20", "3"]);
      assert.deepEqual(extent(["3", "20"]), ["20", "3"]);
    },
    "ignores null, undefined and NaN": function(extent) {
      assert.deepEqual(extent([NaN, 1, 2, 3, 4, 5]), [1, 5]);
      assert.deepEqual(extent([1, 2, 3, 4, 5, NaN]), [1, 5]);
      assert.deepEqual(extent([10, null, 3, undefined, 5, NaN]), [3, 10]);
      assert.deepEqual(extent([-1, null, -3, undefined, -5, NaN]), [-5, -1]);
    },
    "compares heterogenous types as numbers": function(extent) {
      assert.strictEqual(extent([20, "3"])[0], "3");
      assert.strictEqual(extent(["20", 3])[0], 3);
      assert.strictEqual(extent([3, "20"])[0], 3);
      assert.strictEqual(extent(["3", 20])[0], "3");
      assert.strictEqual(extent([20, "3"])[1], 20);
      assert.strictEqual(extent(["20", 3])[1], "20");
      assert.strictEqual(extent([3, "20"])[1], "20");
      assert.strictEqual(extent(["3", 20])[1], 20);
    },
    "returns undefined for empty array": function(extent) {
      assert.isUndefined(extent([])[0]);
      assert.isUndefined(extent([null])[0]);
      assert.isUndefined(extent([undefined])[0]);
      assert.isUndefined(extent([NaN])[0]);
      assert.isUndefined(extent([NaN, NaN])[0]);
      assert.isUndefined(extent([])[1]);
      assert.isUndefined(extent([null])[1]);
      assert.isUndefined(extent([undefined])[1]);
      assert.isUndefined(extent([NaN])[1]);
      assert.isUndefined(extent([NaN, NaN])[1]);
    },
    "applies the optional accessor function": function(extent) {
      assert.deepEqual(d3.extent([[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]], function(d) { return d3.max(d); }), [5, 10]);
      assert.deepEqual(d3.extent([1, 2, 3, 4, 5], function(d, i) { return i; }), [0, 4]);
    }
  }
});

suite.export(module);
