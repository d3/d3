var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.functor");

suite.addBatch({
  "functor": {
    topic: load("core/functor"),
    "when passed a function, returns the function": function(d3) {
      function foo() {}
      assert.strictEqual(d3.functor(foo), foo);
    },
    "when passed a non-function, returns a wrapper function": function(d3) {
      var a = {};
      assert.isNull(d3.functor(null)());
      assert.isUndefined(d3.functor(undefined)());
      assert.strictEqual(d3.functor(a)(), a);
      assert.strictEqual(d3.functor(1)(), 1);
      assert.deepEqual(d3.functor([1])(), [1]);
    }
  }
});

suite.export(module);
