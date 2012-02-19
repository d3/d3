require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.extent");

suite.addBatch({
  "extent": {
    topic: function() {
      return d3.extent;
    },
    "returns the numeric extent for numbers": function(extent) {
      assert.deepEqual(extent([1]), [1, 1]);
      assert.deepEqual(extent([5, 1, 2, 3, 4]), [1, 5]);
      assert.deepEqual(extent([20, 3]), [3, 20]);
      assert.deepEqual(extent([3, 20]), [3, 20]);
    },
    "returns the lexicographic extent for strings": function(extent) {
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
      assert.deepEqual(extent([20, "3"]), ["3", 20]);
      assert.deepEqual(extent(["20", 3]), [3, "20"]);
      assert.deepEqual(extent([3, "20"]), [3, "20"]);
      assert.deepEqual(extent(["3", 20]), ["3", 20]);
    },
    "returns undefined for empty array": function(extent) {
      assert.deepEqual(extent([]), [undefined, undefined]);
      assert.deepEqual(extent([null]), [undefined, undefined]);
      assert.deepEqual(extent([undefined]), [undefined, undefined]);
      assert.deepEqual(extent([NaN]), [undefined, undefined]);
      assert.deepEqual(extent([NaN, NaN]), [undefined, undefined]);
    },
    "applies the optional accessor function exactly once": function(extent) {
      var i = 10;
      assert.deepEqual(d3.extent([0,1,2,3], function() { return ++i; }), [11, 14]);
    }
  }
});

suite.export(module);
