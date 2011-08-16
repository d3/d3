require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.rebind");

suite.addBatch({
  "rebind": {
    topic: function() {
      return d3.rebind;
    },
    "bound function uses object as context": function(rebind) {
      var a = {}, that, f = rebind(a, function() { that = this; });
      assert.strictEqual((f(), that), a);
      assert.strictEqual((f.call({}), that), a);
    },
    "bound function receives any arguments": function(rebind) {
      var a = [], b = {}, f = rebind(a, function() { a = Array.prototype.slice.call(arguments); });
      assert.deepEqual((f(), a), []);
      assert.deepEqual((f(1), a), [1]);
      assert.deepEqual((f(null), a), [null]);
      assert.deepEqual((f(b, b, 1), a), [b, b, 1]);
    },
    "bound function returns object if arguments": function(rebind) {
      var a = {}, f = rebind(a, function() {});
      assert.strictEqual(f(1), a);
      assert.strictEqual(f(1, 2, 3), a);
    },
    "bound function returns return value if no arguments": function(rebind) {
      var a = {}, f = rebind({}, function() { return a; });
      assert.strictEqual(f(), a);
    }
  }
});

suite.export(module);
