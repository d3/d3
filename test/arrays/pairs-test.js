var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.pairs");

suite.addBatch({
  "pairs": {
    topic: load("arrays/pairs").expression("d3.pairs"),
    "returns the empty array if input array has length less than two": function(pairs) {
      assert.deepEqual(pairs([]), []);
      assert.deepEqual(pairs([1]), []);
    },
    "returns pairs of adjacent elements in the given array": function(pairs) {
      assert.deepEqual(pairs([1, 2]), [[1, 2]]);
      assert.deepEqual(pairs([1, 2, 3]), [[1, 2], [2, 3]]);
      var a = {}, b = {}, c = {}, d = {};
      assert.deepEqual(pairs([a, b, c, d]), [[a, b], [b, c], [c, d]]);
    },
    "includes null or undefined elements in pairs": function(pairs) {
      assert.deepEqual(pairs([1, null, 2]), [[1, null], [null, 2]]);
      assert.deepEqual(pairs([1, 2, undefined]), [[1, 2], [2, undefined]]);
    }
  }
});

suite.export(module);
