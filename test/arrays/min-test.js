var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.min");

suite.addBatch({
  "min": {
    topic: load("arrays/min", "arrays/max"),
    "returns the least numeric value for numbers": function(d3) {
      assert.equal(d3.min([1]), 1);
      assert.equal(d3.min([5, 1, 2, 3, 4]), 1);
      assert.equal(d3.min([20, 3]), 3);
      assert.equal(d3.min([3, 20]), 3);
    },
    "returns the least lexicographic value for strings": function(d3) {
      assert.equal(d3.min(["c", "a", "b"]), "a");
      assert.equal(d3.min(["20", "3"]), "20");
      assert.equal(d3.min(["3", "20"]), "20");
    },
    "ignores null, undefined and NaN": function(d3) {
      assert.equal(d3.min([NaN, 1, 2, 3, 4, 5]), 1);
      assert.equal(d3.min([1, 2, 3, 4, 5, NaN]), 1);
      assert.equal(d3.min([10, null, 3, undefined, 5, NaN]), 3);
    },
    "compares heterogenous types as numbers": function(d3) {
      assert.strictEqual(d3.min([20, "3"]), "3");
      assert.strictEqual(d3.min(["20", 3]), 3);
      assert.strictEqual(d3.min([3, "20"]), 3);
      assert.strictEqual(d3.min(["3", 20]), "3");
    },
    "returns undefined for empty array": function(d3) {
      assert.isUndefined(d3.min([]));
      assert.isUndefined(d3.min([null]));
      assert.isUndefined(d3.min([undefined]));
      assert.isUndefined(d3.min([NaN]));
      assert.isUndefined(d3.min([NaN, NaN]));
    },
    "applies the optional accessor function": function(d3) {
      assert.equal(d3.min([[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]], function(d) { return d3.max(d); }), 5);
      assert.equal(d3.min([1, 2, 3, 4, 5], function(d, i) { return i; }), 0);
    }
  }
});

suite.export(module);
