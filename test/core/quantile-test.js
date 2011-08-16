require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.quantile");

suite.addBatch({
  "quantile": {
    topic: function() {
      return d3.quantile;
    },
    "requires sorted numeric input": function(quantile) {
      assert.equal(quantile([1, 2, 3, 4], 0), 1);
      assert.equal(quantile([1, 2, 3, 4], 1), 4);
      assert.equal(quantile([4, 3, 2, 1], 0), 4);
      assert.equal(quantile([4, 3, 2, 1], 1), 1);
    },
    "uses the R-7 algorithm": function(quantile) {
      var data = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20];
      assert.equal(quantile(data, 0), 3);
      assert.equal(quantile(data, .25), 7.25);
      assert.equal(quantile(data, .5), 9);
      assert.equal(quantile(data, .75), 14.5);
      assert.equal(quantile(data, 1), 20);
      var data = [3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20];
      assert.equal(quantile(data, 0), 3);
      assert.equal(quantile(data, .25), 7.5);
      assert.equal(quantile(data, .5), 9);
      assert.equal(quantile(data, .75), 14);
      assert.equal(quantile(data, 1), 20);
    },
    "returns an exact value for integer p-values": function(quantile) {
      var a = {}, b = {}, c = {}, d = {}, data = [a, b, c, d];
      assert.equal(quantile(data, 1/3), b);
      assert.equal(quantile(data, 2/3), c);
    },
    "returns the first value for p = 0": function(quantile) {
      var a = {}, b = {}, c = {}, d = {}, data = [a, b, c, d];
      assert.equal(quantile(data, 0), a);
    },
    "returns the last value for p = 1": function(quantile) {
      var a = {}, b = {}, c = {}, d = {}, data = [a, b, c, d];
      assert.equal(quantile(data, 1), d);
    }
  }
});

suite.export(module);
