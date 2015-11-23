var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.quantile");

suite.addBatch({
  "quantile": {
    topic: load("arrays/quantile").expression("d3.quantile"),
    "requires sorted numeric input": function(quantile) {
      assert.equal(quantile([1, 2, 3, 4], 0), 1);
      assert.equal(quantile([1, 2, 3, 4], 1), 4);
      assert.equal(quantile([4, 3, 2, 1], 0), 4);
      assert.equal(quantile([4, 3, 2, 1], 1), 1);
    },
    "uses the R-7 algorithm": function(quantile) {
      var data = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20];
      assert.equal(quantile(data, 0), 3);
      assert.equal(quantile(data, 0.25), 7.25);
      assert.equal(quantile(data, 0.5), 9);
      assert.equal(quantile(data, 0.75), 14.5);
      assert.equal(quantile(data, 1), 20);
      var data = [3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20];
      assert.equal(quantile(data, 0), 3);
      assert.equal(quantile(data, 0.25), 7.5);
      assert.equal(quantile(data, 0.5), 9);
      assert.equal(quantile(data, 0.75), 14);
      assert.equal(quantile(data, 1), 20);
    },
    "coerces values to numbers": function(quantile) {
      var strings = ["1", "2", "3", "4"];
      assert.strictEqual(quantile(strings, 1/3), 2);
      assert.strictEqual(quantile(strings, 1/2), 2.5);
      assert.strictEqual(quantile(strings, 2/3), 3);
      var dates = [new Date(2011, 0, 1), new Date(2012, 0, 1)];
      assert.strictEqual(quantile(dates, 0), +new Date(2011, 0, 1));
      assert.strictEqual(quantile(dates, 1/2), +new Date(2011, 6, 2, 13));
      assert.strictEqual(quantile(dates, 1), +new Date(2012, 0, 1));
    },
    "returns an exact value for integer p-values": function(quantile) {
      var data = [1, 2, 3, 4];
      assert.equal(quantile(data, 1/3), 2);
      assert.equal(quantile(data, 2/3), 3);
    },
    "returns the first value for p = 0": function(quantile) {
      var data = [1, 2, 3, 4];
      assert.equal(quantile(data, 0), 1);
    },
    "returns the last value for p = 1": function(quantile) {
      var data = [1, 2, 3, 4];
      assert.equal(quantile(data, 1), 4);
    }
  }
});

suite.export(module);
