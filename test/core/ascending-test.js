require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.ascending");

suite.addBatch({
  "numbers": {
    "returns a negative number if a < b": function() {
      assert.isTrue(d3.ascending(0, 1) < 0);
    },
    "returns a positive number if a > b": function() {
      assert.isTrue(d3.ascending(1, 0) > 0);
    },
    "returns zero if a == b": function() {
      assert.equal(d3.ascending(0, 0), 0);
    },
    "returns a positive number if a is NaN or undefined (> b)": function() {
      assert.isTrue(d3.ascending(NaN, 0) > 0);
      assert.isTrue(d3.ascending(undefined, 0) > 0);
    },
    "returns a negative number if b is NaN or undefined (> a)": function() {
      assert.isTrue(d3.ascending(0, NaN) < 0);
      assert.isTrue(d3.ascending(0, undefined) < 0);
    },
    "returns NaN if both a and b are NaN or undefined": function() {
      assert.isTrue(isNaN(d3.ascending(NaN, NaN)));
      assert.isTrue(isNaN(d3.ascending(undefined, undefined)));
    },
    "sorts an array of numbers and NaN in ascending order": function() {
      var array = [1, 5, NaN, 3, 2],
          sorted = array.slice().sort(d3.ascending);
      array.sort();
      for (var i = 0; i < 4; i++) assert.equal(array[i], sorted[i]);
      assert.isTrue(isNaN(array[i]));
      assert.isTrue(isNaN(sorted[i]));
    }
  }
});

suite.addBatch({
  "strings": {
    "returns a negative number if a < b": function() {
      assert.isTrue(d3.ascending("a", "b") < 0);
    },
    "returns a positive number if a > b": function() {
      assert.isTrue(d3.ascending("b", "a") > 0);
    },
    "returns zero if a == b": function() {
      assert.equal(d3.ascending("a", "a"), 0);
    }
  }
});

suite.export(module);
