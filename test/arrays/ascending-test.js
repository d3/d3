var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.ascending");

suite.addBatch({
  "d3.ascending": {
    topic: load("arrays/ascending"),
    "numbers": {
      "returns a negative number if a < b": function(d3) {
        assert.isTrue(d3.ascending(0, 1) < 0);
      },
      "returns a positive number if a > b": function(d3) {
        assert.isTrue(d3.ascending(1, 0) > 0);
      },
      "returns zero if a == b": function(d3) {
        assert.equal(d3.ascending(0, 0), 0);
      },
      "returns NaN if a or b is undefined": function(d3) {
        assert.isNaN(d3.ascending(0, undefined));
        assert.isNaN(d3.ascending(undefined, 0));
        assert.isNaN(d3.ascending(undefined, undefined));
      },
      "returns NaN if a or b is NaN": function(d3) {
        assert.isNaN(d3.ascending(0, NaN));
        assert.isNaN(d3.ascending(NaN, 0));
        assert.isNaN(d3.ascending(NaN, NaN));
      }
    },
    "strings": {
      "returns a negative number if a < b": function(d3) {
        assert.isTrue(d3.ascending("a", "b") < 0);
      },
      "returns a positive number if a > b": function(d3) {
        assert.isTrue(d3.ascending("b", "a") > 0);
      },
      "returns zero if a == b": function(d3) {
        assert.equal(d3.ascending("a", "a"), 0);
      }
    }
  }
});

suite.export(module);
