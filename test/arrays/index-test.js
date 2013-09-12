var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.index");

suite.addBatch({
  "index": {
    topic: load("arrays/index-array").expression("d3.index"),
    "returns the array indexed by the accessor function": function(index) {
      assert.deepEqual(index([{foo: "a"}, {foo: "b"}], function(d) { return d.foo; }), {a: {foo: "a"}, b: {foo: "b"}});
    },
    "objects with the same key are overwritten": function(index) {
      assert.deepEqual(index([{foo: "a", bar: 1}, {foo: "a", bar: 2}], function(d) { return d.foo; }), {a: {foo: "a", bar: 2}});
    }
  }
});

suite.export(module);
