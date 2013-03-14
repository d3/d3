var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.median");

suite.addBatch({
  "median": {
    topic: load("arrays/median"),
    "returns the median value for numbers": function(d3) {
      assert.equal(d3.median([1]), 1);
      assert.equal(d3.median([5, 1, 2, 3, 4]), 3);
      assert.equal(d3.median([20, 3]), 11.5);
      assert.equal(d3.median([3, 20]), 11.5);
    },
    "ignores null, undefined and NaN": function(d3) {
      assert.equal(d3.median([NaN, 1, 2, 3, 4, 5]), 3);
      assert.equal(d3.median([1, 2, 3, 4, 5, NaN]), 3);
      assert.equal(d3.median([10, null, 3, undefined, 5, NaN]), 5);
    },
    "can handle large numbers without overflowing": function(d3) {
      assert.equal(d3.median([Number.MAX_VALUE, Number.MAX_VALUE]), Number.MAX_VALUE);
      assert.equal(d3.median([-Number.MAX_VALUE, -Number.MAX_VALUE]), -Number.MAX_VALUE);
    },
    "returns undefined for empty array": function(d3) {
      assert.isUndefined(d3.median([]));
      assert.isUndefined(d3.median([null]));
      assert.isUndefined(d3.median([undefined]));
      assert.isUndefined(d3.median([NaN]));
      assert.isUndefined(d3.median([NaN, NaN]));
    },
    "applies the optional accessor function": function(d3) {
      assert.equal(d3.median([[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]], function(d) { return d3.median(d); }), 4.5);
      assert.equal(d3.median([1, 2, 3, 4, 5], function(d, i) { return i; }), 2);
    }
  }
});

suite.export(module);
