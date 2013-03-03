require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.rebind");

suite.addBatch({
  "rebind": {
    topic: function() {
      return d3.rebind;
    },
    "source function always has source as context": function(rebind) {
      var target = {}, source = {method: function() { that = this; }}, that;
      rebind(target, source, "method");
      assert.strictEqual((target.method(), that), source);
      assert.strictEqual((target.method.call({}), that), source);
    },
    "source function receives target function's arguments": function(rebind) {
      var target = {}, source = {method: function() { those = Array.prototype.slice.call(arguments); }}, those;
      rebind(target, source, "method");
      assert.deepEqual((target.method(), those), []);
      assert.deepEqual((target.method(1), those), [1]);
      assert.deepEqual((target.method(null), those), [null]);
      assert.deepEqual((target.method(source, source, 1), those), [source, source, 1]);
    },
    "target function returns target if source function returns source": function(rebind) {
      var target = {}, source = {method: function(value) { return value ? source : 42; }};
      rebind(target, source, "method");
      assert.strictEqual(target.method(true), target);
    },
    "otherwise, target function returns source function return value": function(rebind) {
      var target = {}, source = {method: function(value) { return value ? source : 42; }};
      rebind(target, source, "method");
      assert.strictEqual(target.method(false), 42);
    },
    "can bind multiple methods": function(rebind) {
      var target = {}, source = {
        foo: function() { return 1; },
        bar: function() { return 2; }
      };
      rebind(target, source, "foo", "bar");
      assert.strictEqual(target.foo(), 1);
      assert.strictEqual(target.bar(), 2);
    },
    "returns the target object": function(rebind) {
      var target = {}, source = {foo: function() {}};
      assert.strictEqual(rebind(target, source, "foo"), target);
    }
  }
});

suite.export(module);
