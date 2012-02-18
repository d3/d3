require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.split");

suite.addBatch({
  "split": {
    topic: function() {
      return d3.split;
    },
    "splits an array into arrays": function(split) {
      var a = {}, b = {}, c = {}, d = {}, e = {}, f = {};
      assert.deepEqual(d3.split([a, null, b, c, undefined, d, e, f]), [[a], [b, c], [d, e, f]]);
    },
    "splits using the specified function": function(split) {
      assert.deepEqual(d3.split([1, 0, 2, 3, -1, 4, 5, 6], function(d) { return d <= 0; }), [[1], [2, 3], [4, 5, 6]]);
      assert.deepEqual(d3.split([1, 0, 2, 3, -1, 4, 5, 6], function(d, i) { return i & 1; }), [[1], [2], [-1], [5]]);
    },
    "ignores delimiters at the start or end": function(split) {
      var a = {}, b = {}, c = {};
      assert.deepEqual(d3.split([null, a, b, null, c]), [[a, b], [c]]);
      assert.deepEqual(d3.split([a, b, null, c, null]), [[a, b], [c]]);
      assert.deepEqual(d3.split([null, a, b, null, c, null]), [[a, b], [c]]);
      assert.deepEqual(d3.split([undefined, a, b, undefined, c]), [[a, b], [c]]);
      assert.deepEqual(d3.split([a, b, undefined, c, undefined]), [[a, b], [c]]);
      assert.deepEqual(d3.split([undefined, a, b, undefined, c, undefined]), [[a, b], [c]]);
    }
  }
});

suite.export(module);
