require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.rebind");

suite.addBatch({
  "rebind": {
    topic: function() {
      return d3.rebind;
    },
    "bound function uses source as context": function(rebind) {
      var a = {}, b = {foo: function() { that = this; }}, that;
      rebind(a, b, "foo");
      assert.strictEqual((a.foo(), that), b);
      assert.strictEqual((a.foo.call({}), that), b);
    },
    "bound function receives any arguments": function(rebind) {
      var a = {}, b = {foo: function() { those = Array.prototype.slice.call(arguments); }}, those;
      rebind(a, b, "foo");
      assert.deepEqual((a.foo(), those), []);
      assert.deepEqual((a.foo(1), those), [1]);
      assert.deepEqual((a.foo(null), those), [null]);
      assert.deepEqual((a.foo(b, b, 1), those), [b, b, 1]);
    },
    "bound function returns object if arguments": function(rebind) {
      var a = {}, b = {foo: function() {}};
      rebind(a, b, "foo");
      assert.strictEqual(a.foo(1), a);
      assert.strictEqual(a.foo(1, 2, 3), a);
    },
    "bound function returns return value if no arguments": function(rebind) {
      var a = {}, b = {foo: function() { return that; }}, that = {};
      rebind(a, b, "foo");
      assert.strictEqual(a.foo(), that);
    },
    "can bind multiple methods": function(rebind) {
      var a = {}, b = {foo: function() { return 1; }, bar: function() { return 2; }};
      rebind(a, b, "foo", "bar");
      assert.strictEqual(a.foo(), 1);
      assert.strictEqual(a.bar(), 2);
    },
    "returns the target object": function(rebind) {
      var a = {}, b = {foo: function() { return that; }}, that = {};
      assert.strictEqual(rebind(a, b, "foo"), a);
    }
  }
});

suite.export(module);
