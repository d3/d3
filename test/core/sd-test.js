require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.sd");

suite.addBatch({
  "sd": {
    topic: function() {
      return d3.sd;
    },
    "returns the sd value for numbers": function(sd) {
      assert.isNaN(sd([1]));
      assert.equal(sd([5, 1, 2, 3, 4]), 1.5811388300841898);
      assert.equal(sd([20, 3]), 12.020815280171307);
      assert.equal(sd([3, 20]), 12.020815280171307);
    },
    "ignores null, undefined and NaN": function(sd) {
      assert.equal(sd([NaN, 1, 2, 3, 4, 5]), 1.5811388300841898);
      assert.equal(sd([1, 2, 3, 4, 5, NaN]), 1.5811388300841898);
      assert.equal(sd([10, null, 3, undefined, 5, NaN]), 3.605551275463989);
    },
    "can handle large numbers without overflowing": function(sd) {
      assert.equal(sd([Number.MAX_VALUE, Number.MAX_VALUE]), 0);
      assert.equal(sd([-Number.MAX_VALUE, -Number.MAX_VALUE]), 0);
    },
    "returns undefined for empty array": function(sd) {
      assert.isUndefined(sd([]));
      assert.isUndefined(sd([null]));
      assert.isUndefined(sd([undefined]));
      assert.isUndefined(sd([NaN]));
      assert.isUndefined(sd([NaN, NaN]));
    },
    "applies the optional accessor function": function(sd) {
      assert.equal(d3.sd([[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]], function(d) { return d3.mean(d); }), 2.1213203435596424);
      assert.equal(d3.sd([1, 2, 3, 4, 5], function(d, i) { return i; }), 1.5811388300841898);
    }
  }
});

suite.export(module);
