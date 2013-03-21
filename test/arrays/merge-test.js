var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.merge");

suite.addBatch({
  "merge": {
    topic: load("arrays/merge").expression("d3.merge"),
    "merges an array of arrays": function(merge) {
      var a = {}, b = {}, c = {}, d = {}, e = {}, f = {};
      assert.deepEqual(merge([[a], [b, c], [d, e, f]]), [a, b, c, d, e, f]);
    },
    "returns a new array": function(merge) {
      var input = [[1, 2, 3], [4, 5], [6]];
      assert.isFalse(merge(input) === input);
    },
    "does not modify the input arrays": function(merge) {
      var input = [[1, 2, 3], [4, 5], [6]];
      merge(input);
      assert.deepEqual(input, [[1, 2, 3], [4, 5], [6]]);
    }
  }
});

suite.export(module);
