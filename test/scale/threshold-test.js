var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.scale.threshold");

suite.addBatch({
  "threshold": {
    topic: load("scale/threshold").expression("d3.scale.threshold"),
    "has the default domain [.5]": function(threshold) {
      var x = threshold();
      assert.deepEqual(x.domain(), [.5]);
      assert.equal(x(.49), 0);
    },
    "has the default range [0, 1]": function(threshold) {
      var x = threshold();
      assert.deepEqual(x.range(), [0, 1]);
      assert.equal(x(.50), 1);
    },
    "maps a number to a discrete value in the range": function(threshold) {
      var x = threshold().domain([1/3, 2/3]).range(["a", "b", "c"]);
      assert.equal(x(0), "a");
      assert.equal(x(.2), "a");
      assert.equal(x(.4), "b");
      assert.equal(x(.6), "b");
      assert.equal(x(.8), "c");
      assert.equal(x(1), "c");
    },
    "domain values are arbitrary": function(threshold) {
      var x = threshold().domain(["10", "2"]).range([0, 1, 2]);
      assert.strictEqual(x.domain()[0], "10");
      assert.strictEqual(x.domain()[1], "2");
      assert.equal(x("0"), 0);
      assert.equal(x("12"), 1);
      assert.equal(x("3"), 2);
    },
    "range values are arbitrary": function(threshold) {
      var a = {}, b = {}, c = {}, x = threshold().domain([1/3, 2/3]).range([a, b, c]);
      assert.equal(x(0), a);
      assert.equal(x(.2), a);
      assert.equal(x(.4), b);
      assert.equal(x(.6), b);
      assert.equal(x(.8), c);
      assert.equal(x(1), c);
    }
  }
});

suite.export(module);
