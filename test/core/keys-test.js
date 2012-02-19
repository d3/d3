require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.keys");

suite.addBatch({
  "keys": {
    topic: function() {
      return d3.keys;
    },
    "enumerates every defined key": function(keys) {
      assert.deepEqual(keys({a: 1, b: 1}), ["a", "b"]);
    },
    "includes keys defined on prototypes": function(keys) {
      function abc() {
        this.a = 1;
        this.b = 2;
      }
      abc.prototype.c = 3;
      assert.deepEqual(keys(new abc()), ["a", "b", "c"]);
    },
    "includes keys with null or undefined values": function(keys) {
      assert.deepEqual(keys({a: undefined, b: null, c: NaN}), ["a", "b", "c"]);
    }
  }
});

suite.export(module);
