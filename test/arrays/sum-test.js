var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.sum");

suite.addBatch({
  "sum": {
    topic: load("arrays/sum").expression("d3.sum"),
    "sums numbers": function(sum) {
      assert.equal(sum([1]), 1);
      assert.equal(sum([5, 1, 2, 3, 4]), 15);
      assert.equal(sum([20, 3]), 23);
      assert.equal(sum([3, 20]), 23);
    },
    "sums types that can be coerced to numbers": function(sum) {
      assert.equal(sum(["20", "3"]), 23);
      assert.equal(sum(["3", "20"]), 23);
      assert.equal(sum(["3", 20]), 23);
      assert.equal(sum([20, "3"]), 23);
      assert.equal(sum([3, "20"]), 23);
      assert.equal(sum(["20", 3]), 23);
    },
    "ignores non-numeric types": function(sum) {
      assert.equal(sum(["a", "b", "c"]), 0);
      assert.equal(sum(["a", 1, "2"]), 3);
    },
    "ignores null, undefined and NaN": function(sum) {
      assert.equal(sum([NaN, 1, 2, 3, 4, 5]), 15);
      assert.equal(sum([1, 2, 3, 4, 5, NaN]), 15);
      assert.equal(sum([10, null, 3, undefined, 5, NaN]), 18);
    },
    "applies the optional acccessor function": function(sum) {
      assert.equal(sum([[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]], function(d) { return sum(d); }), 45);
      assert.equal(sum([1, 2, 3, 4, 5], function(d, i) { return i; }), 10);
    },
    "returns zero for the empty array": function(sum) {
      assert.equal(sum([]), 0);
    }
  }
});

suite.export(module);
