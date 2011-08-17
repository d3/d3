require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.last");

suite.addBatch({
  "last": {
    topic: function() {
      return d3.last;
    },
    "compares using natural order by default": function(last) {
      assert.strictEqual(last([1, 0]), 1);
      assert.strictEqual(last(["1", 0]), "1");
      assert.strictEqual(last(["2", "10"]), "2");
      assert.strictEqual(last(["2", NaN, "10"]), "2");
      assert.strictEqual(last([2, NaN, 10]), 10);
    },
    "compares using optional comparator": function(last) {
      var i = 0, aa, bb, o = new Object();
      assert.strictEqual(last([1, o], function(a, b) { aa = a; bb = b; return ++i; }), 1);
      assert.strictEqual(aa, 1);
      assert.strictEqual(bb, o);
      assert.strictEqual(last([1, 0], d3.descending), 0);
      assert.strictEqual(last(["1", 0], d3.descending), 0);
      assert.strictEqual(last(["2", "10"], d3.descending), "10");
      assert.strictEqual(last(["2", NaN, "10"], d3.descending), "10");
      assert.strictEqual(last([2, NaN, 10], d3.descending), 2);
    },
    "returns the last of equal values": function(last) {
      var a = new Object(), b = new Object(), c = new Object();
      assert.strictEqual(last([a, b, c], function() { return 0; }), c);
    },
    "returns undefined for an empty array": function(last) {
      assert.isUndefined(last([]));
    }
  }
});

suite.export(module);
