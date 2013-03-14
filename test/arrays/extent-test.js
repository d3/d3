var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.extent");

suite.addBatch({
  "extent": {
    topic: load("arrays/extent"),
    "returns the numeric extent for numbers": function(d3) {
      assert.deepEqual(d3.extent([1]), [1, 1]);
      assert.deepEqual(d3.extent([5, 1, 2, 3, 4]), [1, 5]);
      assert.deepEqual(d3.extent([20, 3]), [3, 20]);
      assert.deepEqual(d3.extent([3, 20]), [3, 20]);
    },
    "returns the lexicographic extent for strings": function(d3) {
      assert.deepEqual(d3.extent(["c", "a", "b"]), ["a", "c"]);
      assert.deepEqual(d3.extent(["20", "3"]), ["20", "3"]);
      assert.deepEqual(d3.extent(["3", "20"]), ["20", "3"]);
    },
    "ignores null, undefined and NaN": function(d3) {
      assert.deepEqual(d3.extent([NaN, 1, 2, 3, 4, 5]), [1, 5]);
      assert.deepEqual(d3.extent([1, 2, 3, 4, 5, NaN]), [1, 5]);
      assert.deepEqual(d3.extent([10, null, 3, undefined, 5, NaN]), [3, 10]);
      assert.deepEqual(d3.extent([-1, null, -3, undefined, -5, NaN]), [-5, -1]);
    },
    "compares heterogenous types as numbers": function(d3) {
      assert.deepEqual(d3.extent([20, "3"]), ["3", 20]);
      assert.deepEqual(d3.extent(["20", 3]), [3, "20"]);
      assert.deepEqual(d3.extent([3, "20"]), [3, "20"]);
      assert.deepEqual(d3.extent(["3", 20]), ["3", 20]);
    },
    "returns undefined for empty array": function(d3) {
      assert.deepEqual(d3.extent([]), [undefined, undefined]);
      assert.deepEqual(d3.extent([null]), [undefined, undefined]);
      assert.deepEqual(d3.extent([undefined]), [undefined, undefined]);
      assert.deepEqual(d3.extent([NaN]), [undefined, undefined]);
      assert.deepEqual(d3.extent([NaN, NaN]), [undefined, undefined]);
    },
    "applies the optional accessor function exactly once": function(d3) {
      var i = 10;
      assert.deepEqual(d3.extent([0,1,2,3], function() { return ++i; }), [11, 14]);
    }
  }
});

suite.export(module);
