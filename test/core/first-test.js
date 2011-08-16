require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.first");

suite.addBatch({
  "first": {
    topic: function() {
      return d3.first;
    },
    "compares using natural order by default": function(first) {
      assert.strictEqual(first([1, 0]), 0);
      assert.strictEqual(first(["1", 0]), 0);
      assert.strictEqual(first(["2", "10"]), "10");
      assert.strictEqual(first(["2", NaN, "10"]), "10");
      assert.strictEqual(first([2, NaN, 10]), 2);
    },
    "compares using optional comparator": function(first) {
      var i = 0, aa, bb, o = new Object();
      assert.strictEqual(first([1, o], function(a, b) { aa = a; bb = b; return ++i; }), o);
      assert.strictEqual(aa, 1);
      assert.strictEqual(bb, o);
      assert.strictEqual(first([1, 0], d3.descending), 1);
      assert.strictEqual(first(["1", 0], d3.descending), "1");
      assert.strictEqual(first(["2", "10"], d3.descending), "2");
      assert.strictEqual(first(["2", NaN, "10"], d3.descending), "2");
      assert.strictEqual(first([2, NaN, 10], d3.descending), 10);
    },
    "returns the first of equal values": function(last) {
      var a = new Object(), b = new Object(), c = new Object();
      assert.strictEqual(last([a, b, c], function() { return 0; }), a);
    },
    "returns undefined for an empty array": function(first) {
      assert.isUndefined(first([]));
    }
  }
});

suite.export(module);
