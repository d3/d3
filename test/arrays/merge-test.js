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
    "returns a new array when zero arrays are passed": function(merge) {
      var input = [],
          output = merge(input);
      assert.deepEqual(output, []);
      input.push([0.1]);
      assert.deepEqual(input, [[0.1]]);
      assert.deepEqual(output, []);
    },
    "returns a new array when one array is passed": function(merge) {
      var input = [[1, 2, 3]],
          output = merge(input);
      assert.deepEqual(output, [1, 2, 3]);
      input.push([4.1]);
      input[0].push(3.1);
      assert.deepEqual(input, [[1, 2, 3, 3.1], [4.1]]);
      assert.deepEqual(output, [1, 2, 3]);
    },
    "returns a new array when two or more arrays are passed": function(merge) {
      var input = [[1, 2, 3], [4, 5], [6]],
          output = merge(input);
      assert.deepEqual(output, [1, 2, 3, 4, 5, 6]);
      input.push([7.1]);
      input[0].push(3.1);
      input[1].push(5.1);
      input[2].push(6.1);
      assert.deepEqual(input, [[1, 2, 3, 3.1], [4, 5, 5.1], [6, 6.1], [7.1]]);
      assert.deepEqual(output, [1, 2, 3, 4, 5, 6]);
    },
    "does not modify the input arrays": function(merge) {
      var input = [[1, 2, 3], [4, 5], [6]];
      merge(input);
      assert.deepEqual(input, [[1, 2, 3], [4, 5], [6]]);
    }
  }
});

suite.export(module);
