require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.max");

suite.addBatch({
  "max": {
    topic: function() {
      return d3.max;
    },
    "returns the greatest numeric value for numbers": function(max) {
      assert.equal(max([1]), 1);
      assert.equal(max([5, 1, 2, 3, 4]), 5);
      assert.equal(max([20, 3]), 20);
      assert.equal(max([3, 20]), 20);
    },
    "returns the greatest lexicographic value for strings": function(max) {
      assert.equal(max(["c", "a", "b"]), "c");
      assert.equal(max(["20", "3"]), "3");
      assert.equal(max(["3", "20"]), "3");
    },
    "ignores null, undefined and NaN": function(max) {
      assert.equal(max([NaN, 1, 2, 3, 4, 5]), 5);
      assert.equal(max([1, 2, 3, 4, 5, NaN]), 5);
      assert.equal(max([10, null, 3, undefined, 5, NaN]), 10);
      assert.equal(max([-1, null, -3, undefined, -5, NaN]), -1);
    },
    "compares heterogenous types as numbers": function(max) {
      assert.strictEqual(max([20, "3"]), 20);
      assert.strictEqual(max(["20", 3]), "20");
      assert.strictEqual(max([3, "20"]), "20");
      assert.strictEqual(max(["3", 20]), 20);
    },
    "returns undefined for empty array": function(max) {
      assert.isUndefined(max([]));
      assert.isUndefined(max([null]));
      assert.isUndefined(max([undefined]));
      assert.isUndefined(max([NaN]));
      assert.isUndefined(max([NaN, NaN]));
    },
    "applies the optional accessor function": function(max) {
      assert.equal(d3.max([[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]], function(d) { return d3.min(d); }), 2);
      assert.equal(d3.max([1, 2, 3, 4, 5], function(d, i) { return i; }), 4);
    }
  }
});

suite.export(module);
