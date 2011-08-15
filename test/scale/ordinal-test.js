require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.scale.ordinal");

suite.addBatch({
  "ordinal": {
    topic: function() {
      return d3.scale.ordinal;
    },
    "has an empty domain by default": function(ordinal) {
      assert.isEmpty(ordinal().domain());
    },
    "has an empty range by default": function(ordinal) {
      assert.isEmpty(ordinal().range());
    },
    "maps distinct domain values to discrete range values": function(ordinal) {
      var x = ordinal().range(["a", "b", "c"]);
      assert.equal(x(0), "a");
      assert.equal(x("0"), "a");
      assert.equal(x([0]), "a");
      assert.equal(x(1), "b");
      assert.equal(x(2.0), "c");
      assert.equal(x(new Number(2)), "c");
    },
    "recycles range values when exhausted": function(ordinal) {
      var x = ordinal().range(["a", "b", "c"]);
      assert.equal(x(0), "a");
      assert.equal(x(1), "b");
      assert.equal(x(2), "c");
      assert.equal(x(3), "a");
      assert.equal(x(4), "b");
      assert.equal(x(5), "c");
      assert.equal(x(2), "c");
      assert.equal(x(1), "b");
      assert.equal(x(0), "a");
    },
    "computes discrete points in a continuous range": function(ordinal) {
      var x = ordinal().domain(["a", "b", "c"]).rangePoints([0, 120]);
      assert.deepEqual(x.range(), [0, 60, 120]);
      assert.equal(x.rangeBand(), 0);
      var x = ordinal().domain(["a", "b", "c"]).rangePoints([0, 120], 1);
      assert.deepEqual(x.range(), [20, 60, 100]);
      assert.equal(x.rangeBand(), 0);
    },
    "computes discrete bands in a continuous range": function(ordinal) {
      var x = ordinal().domain(["a", "b", "c"]).rangeBands([0, 120]);
      assert.deepEqual(x.range(), [0, 40, 80]);
      assert.equal(x.rangeBand(), 40);
      var x = ordinal().domain(["a", "b", "c"]).rangeBands([0, 120], .2);
      assert.deepEqual(x.range(), [7.5, 45, 82.5]);
      assert.equal(x.rangeBand(), 30);
    },
    "computes discrete rounded bands in a continuous range": function(ordinal) {
      var x = ordinal().domain(["a", "b", "c"]).rangeRoundBands([0, 100]);
      assert.deepEqual(x.range(), [1, 34, 67]);
      assert.equal(x.rangeBand(), 33);
      var x = ordinal().domain(["a", "b", "c"]).rangeRoundBands([0, 100], .2);
      assert.deepEqual(x.range(), [7, 38, 69]);
      assert.equal(x.rangeBand(), 25);
    },
    "setting domain recomputes range bands": function(ordinal) {
      var x = ordinal().rangeRoundBands([0, 100]).domain(["a", "b", "c"]);
      assert.deepEqual(x.range(), [1, 34, 67]);
      assert.equal(x.rangeBand(), 33);
      x.domain(["a", "b", "c", "d"]);
      assert.deepEqual(x.range(), [0, 25, 50, 75]);
      assert.equal(x.rangeBand(), 25);
    }
  }
});

suite.export(module);
