var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.descending");

suite.addBatch({
  "descending": {
    topic: load("arrays/descending").expression("d3.descending"),
    "numbers": {
      "returns a negative number if a > b": function(descending) {
        assert.isTrue(descending(1, 0) < 0);
      },
      "returns a positive number if a < b": function(descending) {
        assert.isTrue(descending(0, 1) > 0);
      },
      "returns zero if a == b": function(descending) {
        assert.equal(descending(0, 0), 0);
      },
      "returns NaN if a or b is undefined": function(descending) {
        assert.isNaN(descending(0, undefined));
        assert.isNaN(descending(undefined, 0));
        assert.isNaN(descending(undefined, undefined));
      },
      "returns NaN if a or b is NaN": function(descending) {
        assert.isNaN(descending(0, NaN));
        assert.isNaN(descending(NaN, 0));
        assert.isNaN(descending(NaN, NaN));
      }
    },
    "strings": {
      "returns a negative number if a > b": function(descending) {
        assert.isTrue(descending("b", "a") < 0);
      },
      "returns a positive number if a < b": function(descending) {
        assert.isTrue(descending("a", "b") > 0);
      },
      "returns zero if a == b": function(descending) {
        assert.equal(descending("a", "a"), 0);
      }
    }
  }
});

suite.export(module);
