var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.dispatch");

suite.addBatch({
  "dispatch": {
    topic: load("event/dispatch").expression("d3.dispatch"),
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
      d.on("foo", function() { ++events; });
      d.foo();
      assert.equal(events, 1);
      d.foo();
      d.foo();
      assert.equal(events, 3);
    },
    "the listener is passed any arguments to dispatch": function(dispatch) {
      var d = dispatch("foo"), a = {}, b = {}, aa, bb;
      d.on("foo", function(a, b) { aa = a; bb = b; });
      d.foo(a, b);
      assert.equal(aa, a);
      assert.equal(bb, b);
      d.foo(1, "foo");
      assert.equal(aa, 1);
      assert.equal(bb, "foo");
    },
    "the listener's context is the same as dispatch's": function(dispatch) {
      var d = dispatch("foo"), a = {}, b = {}, that;
      d.on("foo", function() { that = this; });
      d.foo.call(a);
      assert.equal(that, a);
      d.foo.call(b);
      assert.equal(that, b);
    },
    "listeners are notified in the order they are added": function(dispatch) {
      var d = dispatch("foo"), a = {}, b = {}, those = [];
      function A() { those.push(a); }
      function B() { those.push(b); }
      d.on("foo.a", A).on("foo.b", B);
      d.foo();
      assert.deepEqual(those, [a, b]);
      those = [];
      d.on("foo.a", A); // move to the end
      d.foo();
      assert.deepEqual(those, [b, a]);
    },
    "notifying listeners returns the dispatch object": function(dispatch) {
      var d = dispatch("foo");
      assert.equal(d.foo(), d);
    },
    "adding a listener returns the dispatch object": function(dispatch) {
      var d = dispatch("foo");
      function A() {}
      assert.equal(d.on("foo", A), d);
    },
    "removed listeners do not receive subsequent events": function(dispatch) {
      var d = dispatch("foo"), a = {}, b = {}, those = [];
      function A() { those.push(a); }
      function B() { those.push(b); }
      d.on("foo.a", A).on("foo.b", B);
      d.foo();
      those = [];
      d.on("foo.a", null);
      d.foo();
      assert.deepEqual(those, [b]);
    },
    "removing a shared listener only affects the intended event": function(dispatch) {
      var d = dispatch("foo", "bar"), a = 0;
      function A() { ++a; }
      d.on("foo", A).on("bar", A);
      d.foo();
      d.bar();
      assert.equal(a, 2);
      d.on("foo", null);
      d.bar();
      assert.equal(a, 3);
    },
    "adding an existing listener has no effect": function(dispatch) {
      var d = dispatch("foo"), events = 0;
      function A() { ++events; }
      d.on("foo.a", A);
      d.foo();
      d.on("foo.a", A).on("foo.a", A);
      d.foo();
      assert.equal(events, 2);
    },
    "removing a missing listener has no effect": function(dispatch) {
      var d = dispatch("foo"), events = 0;
      function A() { ++events; }
      d.on("foo.a", null).on("foo", A).on("foo", null).on("foo", null);
      d.foo();
      assert.equal(events, 0);
    },
    "adding a listener does not affect the current event": function(dispatch) {
      var d = dispatch("foo"), a = {}, b = {}, those = [];
      function A() { d.on("foo.b", B); those.push(a); }
      function B() { those.push(b); }
      d.on("foo.a", A);
      d.foo();
      assert.deepEqual(those, [a]);
    },
    "removing a listener does affect the current event": function(dispatch) {
      var d = dispatch("foo"), a = {}, b = {}, those = [];
      function A() { d.on("foo.b", null); those.push(a); }
      function B() { those.push(b); }
      d.on("foo.a", A).on("foo.b", B);
      d.foo();
      assert.deepEqual(those, [a]);
    },
    "getting a listener returns the correct listener": function(dispatch) {
      var d = dispatch("foo");
      function A() {}
      function B() {}
      function C() {}
      d.on("foo.a", A).on("foo.b", B).on("foo", C);
      assert.equal(d.on("foo.a"), A);
      assert.equal(d.on("foo.b"), B);
      assert.equal(d.on("foo"), C);
    },
    "omitting the event type": {
      "returns undefined when retrieving a listener": function(dispatch) {
        var d = dispatch("foo");
        assert.isUndefined(d.on(".a"));
      },
      "null removes all named event listeners": function(dispatch) {
        var d = dispatch("foo", "bar"), a = {}, b = {}, c = {}, those = [];
        function A() { those.push(a); }
        function B() { those.push(b); }
        function C() { those.push(c); }
        d.on("foo.a", A).on("bar.a", B).on("foo", C).on(".a", null);
        d.foo();
        d.bar();
        assert.deepEqual(those, [c]);
      },
      "no-op when setting a listener": function(dispatch) {
        var d = dispatch("foo", "bar"), a = {}, b = {}, those = [];
        function A() { those.push(a); }
        function B() { those.push(b); }
        d
            .on(".a", A)
            .on("foo.a", B)
            .on("bar", B);
        d.foo();
        d.bar();
        assert.deepEqual(those, [b, b]);
        assert.isUndefined(d.on(".a"));
      }
    }
  }
});

suite.export(module);
