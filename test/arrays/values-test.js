var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.values");

suite.addBatch({
  "values": {
    topic: load("arrays/values"),
    "enumerates every value": function(d3) {
      assert.deepEqual(d3.values({a: 1, b: 2}), [1, 2]);
    },
    "includes values defined on prototypes": function(d3) {
      function abc() {
        this.a = 1;
        this.b = 2;
      }
      abc.prototype.c = 3;
      assert.deepEqual(d3.values(new abc()), [1, 2, 3]);
    },
    "includes null or undefined values": function(d3) {
      var v = d3.values({a: undefined, b: null, c: NaN});
      assert.isUndefined(v[0]);
      assert.isNull(v[1]);
      assert.isNaN(v[2]);
      assert.equal(v.length, 3);
    }
  }
});

suite.export(module);
