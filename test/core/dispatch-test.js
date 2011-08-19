require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.dispatch");

suite.addBatch({
  "dispatch": {
    topic: function() {
      return d3.dispatch;
    },
    "returns a map of dispatchers for each event type": function(dispatch) {
      assert.deepEqual(dispatch(), {});
      var d = dispatch("foo");
      assert.isTrue("foo" in d);
      assert.isFalse("bar" in d);
      var d = dispatch("foo", "bar");
      assert.isTrue("foo" in d);
      assert.isTrue("bar" in d);
    },
    "added listeners receive subsequent events": function(dispatch) {
      var d = dispatch("foo"), events = 0;
      d.foo.add(function() { ++events; });
      d.foo.dispatch();
      assert.equal(events, 1);
      d.foo.dispatch();
      d.foo.dispatch();
      assert.equal(events, 3);
    },
    "the listener is passed any arguments to dispatch": function(dispatch) {
      var d = dispatch("foo"), a = {}, b = {}, aa, bb;
      d.foo.add(function(a, b) { aa = a; bb = b; });
      d.foo.dispatch(a, b);
      assert.equal(aa, a);
      assert.equal(bb, b);
      d.foo.dispatch(1, "foo");
      assert.equal(aa, 1);
      assert.equal(bb, "foo");
    },
    "the listener's context is the same as dispatch's": function(dispatch) {
      var d = dispatch("foo"), a = {}, b = {}, that;
      d.foo.add(function() { that = this; });
      d.foo.dispatch.call(a);
      assert.equal(that, a);
      d.foo.dispatch.call(b);
      assert.equal(that, b);
    },
    "listeners are notified in the order they are first added": function(dispatch) {
      var d = dispatch("foo"), a = {}, b = {}, those = [];
      function A() { those.push(a); }
      function B() { those.push(b); }
      d.foo.add(A);
      d.foo.add(B);
      d.foo.dispatch();
      assert.deepEqual(those, [a, b]);
      those = [];
      d.foo.remove(A);
      d.foo.add(A);
      d.foo.dispatch();
      assert.deepEqual(those, [a, b]);
    },
    "removed listeners do not receive subsequent events": function(dispatch) {
      var d = dispatch("foo"), a = {}, b = {}, those = [];
      function A() { those.push(a); }
      function B() { those.push(b); }
      d.foo.add(A);
      d.foo.add(B);
      d.foo.dispatch();
      those = [];
      d.foo.remove(A);
      d.foo.dispatch();
      assert.deepEqual(those, [b]);
    },
    "adding an existing listener has no effect": function(dispatch) {
      var d = dispatch("foo"), events = 0;
      function A() { ++events; }
      d.foo.add(A);
      d.foo.dispatch();
      d.foo.add(A);
      d.foo.add(A);
      d.foo.dispatch();
      assert.equal(events, 2);
    },
    "removing a missing listener has no effect": function(dispatch) {
      var d = dispatch("foo"), events = 0;
      function A() { ++events; }
      d.foo.remove(A);
      d.foo.add(A);
      d.foo.remove(A);
      d.foo.remove(A);
      d.foo.dispatch();
      assert.equal(events, 0);
    },
    "adding a listener does not affect the current event": function(dispatch) {
      var d = dispatch("foo"), a = {}, b = {}, those = [];
      function A() { d.foo.add(B); those.push(a); }
      function B() { those.push(b); }
      d.foo.add(A);
      d.foo.dispatch();
      assert.deepEqual(those, [a]);
    },
    "removing a listener does affect the current event": function(dispatch) {
      var d = dispatch("foo"), a = {}, b = {}, those = [];
      function A() { d.foo.remove(B); those.push(a); }
      function B() { those.push(b); }
      d.foo.add(A);
      d.foo.add(B);
      d.foo.dispatch();
      assert.deepEqual(those, [a]);
    }
  }
});

suite.export(module);
