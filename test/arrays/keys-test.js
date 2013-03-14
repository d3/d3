var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.keys");

suite.addBatch({
  "keys": {
    topic: load("arrays/keys"),
    "enumerates every defined key": function(d3) {
      assert.deepEqual(d3.keys({a: 1, b: 1}), ["a", "b"]);
    },
    "includes keys defined on prototypes": function(d3) {
      function abc() {
        this.a = 1;
        this.b = 2;
      }
      abc.prototype.c = 3;
      assert.deepEqual(d3.keys(new abc()), ["a", "b", "c"]);
    },
    "includes keys with null or undefined values": function(d3) {
      assert.deepEqual(d3.keys({a: undefined, b: null, c: NaN}), ["a", "b", "c"]);
    }
  }
});

suite.export(module);
