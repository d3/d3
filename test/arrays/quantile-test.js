var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.quantile");

suite.addBatch({
  "quantile": {
    topic: load("arrays/quantile"),
    "requires sorted numeric input": function(d3) {
      assert.equal(d3.quantile([1, 2, 3, 4], 0), 1);
      assert.equal(d3.quantile([1, 2, 3, 4], 1), 4);
      assert.equal(d3.quantile([4, 3, 2, 1], 0), 4);
      assert.equal(d3.quantile([4, 3, 2, 1], 1), 1);
    },
    "uses the R-7 algorithm": function(d3) {
      var data = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20];
      assert.equal(d3.quantile(data, 0), 3);
      assert.equal(d3.quantile(data, .25), 7.25);
      assert.equal(d3.quantile(data, .5), 9);
      assert.equal(d3.quantile(data, .75), 14.5);
      assert.equal(d3.quantile(data, 1), 20);
      var data = [3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20];
      assert.equal(d3.quantile(data, 0), 3);
      assert.equal(d3.quantile(data, .25), 7.5);
      assert.equal(d3.quantile(data, .5), 9);
      assert.equal(d3.quantile(data, .75), 14);
      assert.equal(d3.quantile(data, 1), 20);
    },
    "coerces values to numbers": function(d3) {
      var strings = ["1", "2", "3", "4"];
      assert.strictEqual(d3.quantile(strings, 1/3), 2);
      assert.strictEqual(d3.quantile(strings, 1/2), 2.5);
      assert.strictEqual(d3.quantile(strings, 2/3), 3);
      var dates = [new Date(2011, 0, 1), new Date(2012, 0, 1)];
      assert.strictEqual(d3.quantile(dates, 0), +new Date(2011, 0, 1));
      assert.strictEqual(d3.quantile(dates, 1/2), +new Date(2011, 6, 2, 13));
      assert.strictEqual(d3.quantile(dates, 1), +new Date(2012, 0, 1));
    },
    "returns an exact value for integer p-values": function(d3) {
      var data = [1, 2, 3, 4];
      assert.equal(d3.quantile(data, 1/3), 2);
      assert.equal(d3.quantile(data, 2/3), 3);
    },
    "returns the first value for p = 0": function(d3) {
      var data = [1, 2, 3, 4];
      assert.equal(d3.quantile(data, 0), 1);
    },
    "returns the last value for p = 1": function(d3) {
      var data = [1, 2, 3, 4];
      assert.equal(d3.quantile(data, 1), 4);
    }
  }
});

suite.export(module);
