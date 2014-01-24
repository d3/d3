var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.mean");

suite.addBatch({
  "weightedMean": {
    topic: load("arrays/weightedMean").expression("d3.weightedMean"),
    "returns the weighted mean for a set of data and corresponding weights": function(weightedMean) {
      assert.equal(weightedMean([1], [1]), 1);
      assert.equal(weightedMean([5, 1, 2, 3, 4], [1, 1, 1, 1, 1]), 3);
      assert.equal(weightedMean([92, 68, 81], [0.10, 0.20, 0.70]), 79.5);
    },
    "ignores null, undefined and NaN": function(weightedMean) {
      assert.equal(weightedMean([NaN, 1, 2, 3, 4, 5], [1, 1, 1, 1, 1, 1]), 3);
      assert.equal(weightedMean([1, 1, 1, 1, 1, 1], [1, 2, 3, 4, 5, NaN]), 1);
      assert.equal(weightedMean([10, null, 3, undefined, 5, NaN], [1, 1, 1, 1, 1, 1]), 6);
      assert.equal(weightedMean([1, 1, 1, 1, 1, 1], [10, null, 3, undefined, 5, NaN]), 1);
    },
    "does not fail automatically when MAX_VALUE is still 'manageable'": function(weightedMean) {
      assert.equal(weightedMean([Number.MAX_VALUE, Number.MAX_VALUE], [1, 1]), Number.MAX_VALUE);
      assert.equal(weightedMean([-Number.MAX_VALUE, -Number.MAX_VALUE], [1, 1]), -Number.MAX_VALUE);
      assert.equal(weightedMean([1, 1], [Number.MAX_VALUE, Number.MAX_VALUE]), 0);
      assert.equal(weightedMean([1, 1], [-Number.MAX_VALUE, -Number.MAX_VALUE]), 0);
    },
    "returns undefined for empty array": function(weightedMean) {
      assert.isUndefined(weightedMean([]));
      assert.isUndefined(weightedMean([], []));
      assert.isUndefined(weightedMean([86], []));
      assert.isUndefined(weightedMean([], [51]));
      assert.isUndefined(weightedMean([null]));
      assert.isUndefined(weightedMean([null], [7]));
      assert.isUndefined(weightedMean([null], [null]));
      assert.isUndefined(weightedMean([43], [null]));
      assert.isUndefined(weightedMean([undefined]));
      assert.isUndefined(weightedMean([undefined], [undefined]));
      assert.isUndefined(weightedMean([undefined], [92]));
      assert.isUndefined(weightedMean([36], [undefined]));
      assert.isUndefined(weightedMean([NaN], [NaN]));
      assert.isUndefined(weightedMean([NaN, NaN], [NaN, NaN]));
      assert.isUndefined(weightedMean([NaN], [11]));
      assert.isUndefined(weightedMean([34], [NaN]));
    }
  }
});

suite.export(module);
