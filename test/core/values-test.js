require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.values");

suite.addBatch({
  "values": {
    topic: function() {
      return d3.values;
    },
    "enumerates every value": function(values) {
      assert.deepEqual(values({a: 1, b: 2}), [1, 2]);
    },
    "includes values defined on prototypes": function(values) {
      function abc() {
        this.a = 1;
        this.b = 2;
      }
      abc.prototype.c = 3;
      assert.deepEqual(values(new abc()), [1, 2, 3]);
    },
    "includes null or undefined values": function(values) {
      var v = values({a: undefined, b: null, c: NaN});
      assert.isUndefined(v[0]);
      assert.isNull(v[1]);
      assert.isNaN(v[2]);
      assert.equal(v.length, 3);
    }
  }
});

suite.export(module);
