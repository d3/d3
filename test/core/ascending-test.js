require("../env");
require("../../d3");

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
    "returns NaN if a or b is undefined": function() {
      assert.isNaN(d3.ascending(0, undefined));
      assert.isNaN(d3.ascending(undefined, 0));
      assert.isNaN(d3.ascending(undefined, undefined));
    },
    "returns NaN if a or b is NaN": function() {
      assert.isNaN(d3.ascending(0, NaN));
      assert.isNaN(d3.ascending(NaN, 0));
      assert.isNaN(d3.ascending(NaN, NaN));
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
