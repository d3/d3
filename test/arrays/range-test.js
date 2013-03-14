var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.range");

suite.addBatch({
  "range": {
    topic: load("arrays/range"),
    "start is an inclusive lower bound": function(d3) {
      assert.equal(d3.range(5)[0], 0);
      assert.equal(d3.range(1, 5)[0], 1);
      assert.equal(d3.range(5, 1, -1)[0], 5);
    },
    "stop is an exclusive upper bound": function(d3) {
      assert.equal(d3.range(5)[4], 4);
      assert.equal(d3.range(1, 5)[3], 4);
      assert.equal(d3.range(5, 1, -1)[3], 2);
    },
    "with one argument, returns integers [0 … stop)": function(d3) {
      assert.deepEqual(d3.range(0), []);
      assert.deepEqual(d3.range(1), [0]);
      assert.deepEqual(d3.range(5), [0, 1, 2, 3, 4]);
    },
    "with two arguments, returns integers [start … stop)": function(d3) {
      assert.deepEqual(d3.range(0, 5), [0, 1, 2, 3, 4]);
      assert.deepEqual(d3.range(5, 9), [5, 6, 7, 8]);
    },
    "with three arguments, returns start + k * step": function(d3) {
      assert.deepEqual(d3.range(0, 5, 1), [0, 1, 2, 3, 4]);
      assert.deepEqual(d3.range(5, 9, .5), [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5]);
      assert.deepEqual(d3.range(5, 8.5, .5), [5, 5.5, 6, 6.5, 7, 7.5, 8]);
      assert.deepEqual(d3.range(2, 0, -.5), [2, 1.5, 1, .5]);
    },
    "handles fractional steps without rounding errors": function(d3) {
      assert.deepEqual(d3.range(0, 0.5, 0.1), [0, 0.1, 0.2, 0.3, 0.4]);
      assert.deepEqual(d3.range(-2, -1.2, 0.1), [-2, -1.9, -1.8, -1.7, -1.6, -1.5, -1.4, -1.3]);
    },
    "handles extremely small steps without rounding errors": function(d3) {
      assert.deepEqual(d3.range(2.1e-31, 5e-31, 1.1e-31), [2.1e-31, 3.2e-31, 4.3e-31]);
    },
    "handles extremely large steps without rounding errors": function(d3) {
      assert.deepEqual(d3.range(1e300, 2e300, 0.3e300), [1e300, 1.3e300, 1.6e300, 1.9e300]);
    },
    "returns an ascending range if step is positive": function(d3) {
      assert.deepEqual(d3.range(0, 5, 1), [0, 1, 2, 3, 4]);
    },
    "returns a descending range if step is negative": function(d3) {
      assert.deepEqual(d3.range(5, 0, -1), [5, 4, 3, 2, 1]);
    },
    "returns an empty range if start, stop or step are NaN": function(d3) {
      assert.isEmpty(d3.range(0, NaN));
      assert.isEmpty(d3.range(1, NaN));
      assert.isEmpty(d3.range(-1, NaN));
      assert.isEmpty(d3.range(0, undefined));
      assert.isEmpty(d3.range(1, undefined));
      assert.isEmpty(d3.range(-1, undefined));
      assert.isEmpty(d3.range(NaN, 0));
      assert.isEmpty(d3.range(NaN, 1));
      assert.isEmpty(d3.range(NaN, -1));
      assert.isEmpty(d3.range(undefined, 0));
      assert.isEmpty(d3.range(undefined, 1));
      assert.isEmpty(d3.range(undefined, -1));
      assert.isEmpty(d3.range(NaN, NaN));
      assert.isEmpty(d3.range(undefined, undefined));
      assert.isEmpty(d3.range(NaN, NaN, NaN));
      assert.isEmpty(d3.range(undefined, undefined, undefined));
      assert.isEmpty(d3.range(0, 10, NaN));
      assert.isEmpty(d3.range(10, 0, NaN));
      assert.isEmpty(d3.range(0, 10, undefined));
      assert.isEmpty(d3.range(10, 0, undefined));
    },
    "returns an empty range if start equals stop": function(d3) {
      assert.isEmpty(d3.range(10, 10));
      assert.isEmpty(d3.range(10, 10, 1));
      assert.isEmpty(d3.range(10, 10, -1));
      assert.isEmpty(d3.range(10, 10, -.5));
      assert.isEmpty(d3.range(10, 10, .5));
      assert.isEmpty(d3.range(0, 0));
      assert.isEmpty(d3.range(0, 0, 1));
      assert.isEmpty(d3.range(0, 0, -1));
      assert.isEmpty(d3.range(0, 0, -.5));
      assert.isEmpty(d3.range(0, 0, .5));
    },
    "returns an empty range if stop is less than start and step is positive": function(d3) {
      assert.isEmpty(d3.range(20, 10));
      assert.isEmpty(d3.range(20, 10, 2));
      assert.isEmpty(d3.range(20, 10, 1));
      assert.isEmpty(d3.range(20, 10, .5));
    },
    "returns an empty range if stop is greater than start and step is negative": function(d3) {
      assert.isEmpty(d3.range(10, 20, -2));
      assert.isEmpty(d3.range(10, 20, -1));
      assert.isEmpty(d3.range(10, 20, -.5));
    }
  }
});

suite.export(module);
