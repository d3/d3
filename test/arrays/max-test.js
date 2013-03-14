var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.max");

suite.addBatch({
  "max": {
    topic: load("arrays/max", "arrays/min"),
    "returns the greatest numeric value for numbers": function(d3) {
      assert.equal(d3.max([1]), 1);
      assert.equal(d3.max([5, 1, 2, 3, 4]), 5);
      assert.equal(d3.max([20, 3]), 20);
      assert.equal(d3.max([3, 20]), 20);
    },
    "returns the greatest lexicographic value for strings": function(d3) {
      assert.equal(d3.max(["c", "a", "b"]), "c");
      assert.equal(d3.max(["20", "3"]), "3");
      assert.equal(d3.max(["3", "20"]), "3");
    },
    "ignores null, undefined and NaN": function(d3) {
      assert.equal(d3.max([NaN, 1, 2, 3, 4, 5]), 5);
      assert.equal(d3.max([1, 2, 3, 4, 5, NaN]), 5);
      assert.equal(d3.max([10, null, 3, undefined, 5, NaN]), 10);
      assert.equal(d3.max([-1, null, -3, undefined, -5, NaN]), -1);
    },
    "compares heterogenous types as numbers": function(d3) {
      assert.strictEqual(d3.max([20, "3"]), 20);
      assert.strictEqual(d3.max(["20", 3]), "20");
      assert.strictEqual(d3.max([3, "20"]), "20");
      assert.strictEqual(d3.max(["3", 20]), 20);
    },
    "returns undefined for empty array": function(d3) {
      assert.isUndefined(d3.max([]));
      assert.isUndefined(d3.max([null]));
      assert.isUndefined(d3.max([undefined]));
      assert.isUndefined(d3.max([NaN]));
      assert.isUndefined(d3.max([NaN, NaN]));
    },
    "applies the optional accessor function": function(d3) {
      assert.equal(d3.max([[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]], function(d) { return d3.min(d); }), 2);
      assert.equal(d3.max([1, 2, 3, 4, 5], function(d, i) { return i; }), 4);
    }
  }
});

suite.export(module);
