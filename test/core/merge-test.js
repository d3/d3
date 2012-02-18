require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.merge");

suite.addBatch({
  "merge": {
    "merges an array of arrays": function() {
      var a = {}, b = {}, c = {}, d = {}, e = {}, f = {};
      assert.deepEqual(d3.merge([[a], [b, c], [d, e, f]]), [a, b, c, d, e, f]);
    },
    "returns a new array": function() {
      var input = [[1, 2, 3], [4, 5], [6]];
      assert.isFalse(d3.merge(input) === input);
    },
    "does not modify the input arrays": function() {
      var input = [[1, 2, 3], [4, 5], [6]];
      d3.merge(input);
      assert.deepEqual(input, [[1, 2, 3], [4, 5], [6]]);
    }
  }
});

suite.export(module);
