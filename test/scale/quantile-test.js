var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.scale.quantile");

suite.addBatch({
  "quantile": {
    topic: load("scale/quantile").expression("d3.scale.quantile"),
    "has the empty domain by default": function(quantile) {
      assert.isEmpty(quantile().domain());
    },
    "has the empty range by default": function(quantile) {
      assert.isEmpty(quantile().range());
    },
    "uses the R-7 algorithm to compute quantiles": function(quantile) {
      var x = quantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]).range([0, 1, 2, 3]);
      assert.deepEqual([3, 6, 6.9, 7, 7.1].map(x), [0, 0, 0, 0, 0]);
      assert.deepEqual([8, 8.9].map(x), [1, 1]);
      assert.deepEqual([9, 9.1, 10, 13].map(x), [2, 2, 2, 2]);
      assert.deepEqual([14.9, 15, 15.1, 16, 20].map(x), [3, 3, 3, 3, 3]);
      var x = quantile().domain([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20]).range([0, 1, 2, 3]);
      assert.deepEqual([3, 6, 6.9, 7, 7.1].map(x), [0, 0, 0, 0, 0]);
      assert.deepEqual([8, 8.9].map(x), [1, 1]);
      assert.deepEqual([9, 9.1, 10, 13].map(x), [2, 2, 2, 2]);
      assert.deepEqual([14.9, 15, 15.1, 16, 20].map(x), [3, 3, 3, 3, 3]);
    },
    "domain values are sorted in ascending order": function(quantile) {
      var x = quantile().domain([6, 3, 7, 8, 8, 13, 20, 15, 16, 10]);
      assert.deepEqual(x.domain(), [3, 6, 7, 8, 8, 10, 13, 15, 16, 20]);
    },
    "non-numeric domain values are ignored": function(quantile) {
      var x = quantile().domain([6, 3, NaN, undefined, 7, 8, 8, 13, 20, 15, 16, 10, NaN]);
      assert.deepEqual(x.domain(), [3, 6, 7, 8, 8, 10, 13, 15, 16, 20]);
    },
    "quantiles returns the inner thresholds": function(quantile) {
      var x = quantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]).range([0, 1, 2, 3]);
      assert.deepEqual(x.quantiles(), [7.25, 9, 14.5]);
      var x = quantile().domain([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20]).range([0, 1, 2, 3]);
      assert.deepEqual(x.quantiles(), [7.5, 9, 14]);
    },
    "range cardinality determines the number of quantiles": function(quantile) {
      var x = quantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]);
      assert.deepEqual(x.range([0, 1, 2, 3]).quantiles(), [7.25, 9, 14.5]);
      assert.deepEqual(x.range([0, 1]).quantiles(), [9]);
      assert.deepEqual(x.range([,,,,,]).quantiles(), [6.8, 8, 11.2, 15.2]);
      assert.deepEqual(x.range([,,,,,,]).quantiles(), [6.5, 8, 9, 13, 15.5]);
    },
    "range values are arbitrary": function(quantile) {
      var a = new Object(), b = new Object(), c = new Object();
      var x = quantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]).range([a, b, c, a]);
      assert.deepEqual([3, 6, 6.9, 7, 7.1].map(x), [a, a, a, a, a]);
      assert.deepEqual([8, 8.9].map(x), [b, b]);
      assert.deepEqual([9, 9.1, 10, 13].map(x), [c, c, c, c]);
      assert.deepEqual([14.9, 15, 15.1, 16, 20].map(x), [a, a, a, a, a]);
    },
    "returns undefined if the input value is NaN": function(quantile) {
      var x = quantile().domain([3, 6, 7, 8, 8, 10, 13, 15, 16, 20]).range([0, 1, 2, 3]);
      assert.isUndefined(x(NaN));
    }
  }
});

suite.export(module);
