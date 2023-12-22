import assert from "assert";
import {dispatch} from "../src/index.js";

it("dispatch(type…) returns a dispatch object with the specified types", () => {
  const d = dispatch("foo", "bar");
  assert(d instanceof dispatch);
});

it("dispatch(type…) does not throw an error if a specified type name collides with a dispatch method", () => {
  const d = dispatch("on");
  assert(d instanceof dispatch);
});

it("dispatch(type…) throws an error if a specified type name is illegal", () => {
  assert.throws(() => { dispatch("__proto__"); });
  assert.throws(() => { dispatch("hasOwnProperty"); });
  assert.throws(() => { dispatch(""); });
  assert.throws(() => { dispatch("foo.bar"); });
  assert.throws(() => { dispatch("foo bar"); });
  assert.throws(() => { dispatch("foo\tbar"); });
});

it("dispatch(type…) throws an error if a specified type name is a duplicate", () => {
  assert.throws(() => { dispatch("foo", "foo"); });
});

it("dispatch(type).call(type, object, arguments…) invokes callbacks of the specified type", () => {
  let foo = 0;
  let bar = 0;
  const d = dispatch("foo", "bar").on("foo", function() { ++foo; }).on("bar", function() { ++bar; });
  d.call("foo");
  assert.strictEqual(foo, 1);
  assert.strictEqual(bar, 0);
  d.call("foo");
  d.call("bar");
  assert.strictEqual(foo, 2);
  assert.strictEqual(bar, 1);
});

it("dispatch(type).call(type, object, arguments…) invokes callbacks with specified arguments and context", () => {
  const results = [];
  const foo = {};
  const bar = {};
  const d = dispatch("foo").on("foo", function() { results.push({this: this, arguments: [].slice.call(arguments)}); });
  d.call("foo", foo, bar);
  assert.deepStrictEqual(results, [{this: foo, arguments: [bar]}]);
  d.call("foo", bar, foo, 42, "baz");
  assert.deepStrictEqual(results, [{this: foo, arguments: [bar]}, {this: bar, arguments: [foo, 42, "baz"]}]);
});

it("dispatch(type).call(type, object, arguments…) invokes callbacks in the order they were added", () => {
  const results = [];
  const d = dispatch("foo");
  d.on("foo.a", function() { results.push("A"); });
  d.on("foo.b", function() { results.push("B"); });
  d.call("foo");
  d.on("foo.c", function() { results.push("C"); });
  d.on("foo.a", function() { results.push("A"); }); // move to end
  d.call("foo");
  assert.deepStrictEqual(results, ["A", "B", "B", "C", "A"]);
});

it("dispatch(type).call(type, object, arguments…) returns undefined", () => {
  const d = dispatch("foo");
  assert.strictEqual(d.call("foo"), undefined);
});

it("dispatch(type).apply(type, object, arguments) invokes callbacks of the specified type", () => {
  let foo = 0;
  let bar = 0;
  const d = dispatch("foo", "bar").on("foo", function() { ++foo; }).on("bar", function() { ++bar; });
  d.apply("foo");
  assert.strictEqual(foo, 1);
  assert.strictEqual(bar, 0);
  d.apply("foo");
  d.apply("bar");
  assert.strictEqual(foo, 2);
  assert.strictEqual(bar, 1);
});

it("dispatch(type).apply(type, object, arguments) invokes callbacks with specified arguments and context", () => {
  const results = [];
  const foo = {};
  const bar = {};
  const d = dispatch("foo").on("foo", function() { results.push({this: this, arguments: [].slice.call(arguments)}); });
  d.apply("foo", foo, [bar]);
  assert.deepStrictEqual(results, [{this: foo, arguments: [bar]}]);
  d.apply("foo", bar, [foo, 42, "baz"]);
  assert.deepStrictEqual(results, [{this: foo, arguments: [bar]}, {this: bar, arguments: [foo, 42, "baz"]}]);
});

it("dispatch(type).apply(type, object, arguments) invokes callbacks in the order they were added", () => {
  const results = [];
  const d = dispatch("foo");
  d.on("foo.a", function() { results.push("A"); });
  d.on("foo.b", function() { results.push("B"); });
  d.apply("foo");
  d.on("foo.c", function() { results.push("C"); });
  d.on("foo.a", function() { results.push("A"); }); // move to end
  d.apply("foo");
  assert.deepStrictEqual(results, ["A", "B", "B", "C", "A"]);
});

it("dispatch(type).apply(type, object, arguments) returns undefined", () => {
  const d = dispatch("foo");
  assert.strictEqual(d.apply("foo"), undefined);
});

it("dispatch(type).on(type, f) returns the dispatch object", () => {
  const d = dispatch("foo");
  assert.strictEqual(d.on("foo", function() {}), d);
});

it("dispatch(type).on(type, f) replaces an existing callback, if present", () => {
  let foo = 0;
  let bar = 0;
  const d = dispatch("foo", "bar");
  d.on("foo", function() { ++foo; });
  d.call("foo");
  assert.strictEqual(foo, 1);
  assert.strictEqual(bar, 0);
  d.on("foo", function() { ++bar; });
  d.call("foo");
  assert.strictEqual(foo, 1);
  assert.strictEqual(bar, 1);
});

it("dispatch(type).on(type, f) replacing an existing callback with itself has no effect", () => {
  let foo = 0;
  const FOO = function() { ++foo; };
  const d = dispatch("foo").on("foo", FOO);
  d.call("foo");
  assert.strictEqual(foo, 1);
  d.on("foo", FOO).on("foo", FOO).on("foo", FOO);
  d.call("foo");
  assert.strictEqual(foo, 2);
});

it("dispatch(type).on(type., …) is equivalent to dispatch(type).on(type, …)", () => {
  const d = dispatch("foo");
  let foos = 0;
  let bars = 0;
  const foo = function() { ++foos; };
  const bar = function() { ++bars; };
  assert.strictEqual(d.on("foo.", foo), d);
  assert.strictEqual(d.on("foo."), foo);
  assert.strictEqual(d.on("foo"), foo);
  assert.strictEqual(d.on("foo.", bar), d);
  assert.strictEqual(d.on("foo."), bar);
  assert.strictEqual(d.on("foo"), bar);
  assert.strictEqual(d.call("foo"), undefined);
  assert.strictEqual(foos, 0);
  assert.strictEqual(bars, 1);
  assert.strictEqual(d.on(".", null), d);
  assert.strictEqual(d.on("foo"), undefined);
  assert.strictEqual(d.call("foo"), undefined);
  assert.strictEqual(foos, 0);
  assert.strictEqual(bars, 1);
});

it("dispatch(type).on(type, null) removes an existing callback, if present", () => {
  let foo = 0;
  const d = dispatch("foo", "bar");
  d.on("foo", function() { ++foo; });
  d.call("foo");
  assert.strictEqual(foo, 1);
  d.on("foo", null);
  d.call("foo");
  assert.strictEqual(foo, 1);
});

it("dispatch(type).on(type, null) does not remove a shared callback", () => {
  let a = 0;
  const A = function() { ++a; };
  const d = dispatch("foo", "bar").on("foo", A).on("bar", A);
  d.call("foo");
  d.call("bar");
  assert.strictEqual(a, 2);
  d.on("foo", null);
  d.call("bar");
  assert.strictEqual(a, 3);
});

it("dispatch(type).on(type, null) removing a missing callback has no effect", () => {
  let a = 0;
  const d = dispatch("foo");
  function A() { ++a; }
  d.on("foo.a", null).on("foo", A).on("foo", null).on("foo", null);
  d.call("foo");
  assert.strictEqual(a, 0);
});

it("dispatch(type).on(type, null) during a callback does not invoke the old callback", () => {
  let a = 0;
  let b = 0;
  let c = 0;
  const A = function() { ++a; d.on("foo.B", null); }; // remove B
  const B = function() { ++b; };
  const d = dispatch("foo").on("foo.A", A).on("foo.B", B);
  d.call("foo");
  assert.strictEqual(a, 1);
  assert.strictEqual(b, 0);
  assert.strictEqual(c, 0);
});

it("dispatch(type).on(type, f) during a callback does not invoke the old or the new callback", () => {
  let a = 0;
  let b = 0;
  let c = 0;
  const A = function() { ++a; d.on("foo.B", C); }; // replace B with C
  const B = function() { ++b; };
  const C = function() { ++c; };
  const d = dispatch("foo").on("foo.A", A).on("foo.B", B);
  d.call("foo");
  assert.strictEqual(a, 1);
  assert.strictEqual(b, 0);
  assert.strictEqual(c, 0);
});

it("dispatch(type).on(type, f) during a callback does not invoke the new callback", () => {
  let a = 0;
  let b = 0;
  const A = function() { ++a; d.on("foo.B", B); }; // add B
  const B = function() { ++b; };
  const d = dispatch("foo").on("foo.A", A);
  d.call("foo");
  assert.strictEqual(a, 1);
  assert.strictEqual(b, 0);
});

it("dispatch(type).on(type, f) coerces type to a string", () => {
  const f = function() {};
  const g = function() {};
  const d = dispatch(null, undefined).on(null, f).on(undefined, g);
  assert.strictEqual(d.on(null), f);
  assert.strictEqual(d.on(undefined), g);
});

it("dispatch(\"foo\", \"bar\").on(\"foo bar\", f) adds a callback for both types", () => {
  let foos = 0;
  const foo = function() { ++foos; };
  const d = dispatch("foo", "bar").on("foo bar", foo);
  assert.strictEqual(d.on("foo"), foo);
  assert.strictEqual(d.on("bar"), foo);
  d.call("foo");
  assert.strictEqual(foos, 1);
  d.call("bar");
  assert.strictEqual(foos, 2);
});

it("dispatch(\"foo\").on(\"foo.one foo.two\", f) adds a callback for both typenames", () => {
  let foos = 0;
  const foo = function() { ++foos; };
  const d = dispatch("foo").on("foo.one foo.two", foo);
  assert.strictEqual(d.on("foo.one"), foo);
  assert.strictEqual(d.on("foo.two"), foo);
  d.call("foo");
  assert.strictEqual(foos, 2);
});

it("dispatch(\"foo\", \"bar\").on(\"foo bar\") returns the callback for either type", () => {
  const foo = function() {};
  const d = dispatch("foo", "bar");
  d.on("foo", foo);
  assert.strictEqual(d.on("foo bar"), foo);
  assert.strictEqual(d.on("bar foo"), foo);
  d.on("foo", null).on("bar", foo);
  assert.strictEqual(d.on("foo bar"), foo);
  assert.strictEqual(d.on("bar foo"), foo);
});

it("dispatch(\"foo\").on(\"foo.one foo.two\") returns the callback for either typename", () => {
  const foo = function() {};
  const d = dispatch("foo");
  d.on("foo.one", foo);
  assert.strictEqual(d.on("foo.one foo.two"), foo);
  assert.strictEqual(d.on("foo.two foo.one"), foo);
  assert.strictEqual(d.on("foo foo.one"), foo);
  assert.strictEqual(d.on("foo.one foo"), foo);
  d.on("foo.one", null).on("foo.two", foo);
  assert.strictEqual(d.on("foo.one foo.two"), foo);
  assert.strictEqual(d.on("foo.two foo.one"), foo);
  assert.strictEqual(d.on("foo foo.two"), foo);
  assert.strictEqual(d.on("foo.two foo"), foo);
});

it("dispatch(\"foo\").on(\".one .two\", null) removes the callback for either typename", () => {
  const foo = function() {};
  const d = dispatch("foo");
  d.on("foo.one", foo);
  d.on("foo.two", foo);
  d.on("foo.one foo.two", null);
  assert.strictEqual(d.on("foo.one"), undefined);
  assert.strictEqual(d.on("foo.two"), undefined);
});

it("dispatch(type).on(type, f) throws an error if f is not a function", () => {
  assert.throws(() => { dispatch("foo").on("foo", 42); });
});

it("dispatch(…).on(type, f) throws an error if the type is unknown", () => {
  assert.throws(() => { dispatch("foo").on("bar", () => {}); });
  assert.throws(() => { dispatch("foo").on("__proto__", () => {}); });
});

it("dispatch(…).on(type) throws an error if the type is unknown", () => {
  assert.throws(() => { dispatch("foo").on("bar"); });
  assert.throws(() => { dispatch("foo").on("__proto__"); });
});

it("dispatch(type).on(type) returns the expected callback", () => {
  const d = dispatch("foo");
  function A() {}
  function B() {}
  function C() {}
  d.on("foo.a", A).on("foo.b", B).on("foo", C);
  assert.strictEqual(d.on("foo.a"), A);
  assert.strictEqual(d.on("foo.b"), B);
  assert.strictEqual(d.on("foo"), C);
});

it("dispatch(type).on(.name) returns undefined when retrieving a callback", () => {
  const d = dispatch("foo").on("foo.a", function() {});
  assert.strictEqual(d.on(".a"), undefined);
});

it("dispatch(type).on(.name, null) removes all callbacks with the specified name", () => {
  const d = dispatch("foo", "bar"), a = {}, b = {}, c = {}, those = [];
  function A() { those.push(a); }
  function B() { those.push(b); }
  function C() { those.push(c); }
  d.on("foo.a", A).on("bar.a", B).on("foo", C).on(".a", null);
  d.call("foo");
  d.call("bar");
  assert.deepStrictEqual(those, [c]);
});

it("dispatch(type).on(.name, f) has no effect", () => {
  const d = dispatch("foo", "bar"), a = {}, b = {}, those = [];
  function A() { those.push(a); }
  function B() { those.push(b); }
  d.on(".a", A).on("foo.a", B).on("bar", B);
  d.call("foo");
  d.call("bar");
  assert.deepStrictEqual(those, [b, b]);
  assert.strictEqual(d.on(".a"), undefined);
});

it("dispatch(type…).copy() returns an isolated copy", () => {
  const foo = function() {};
  const bar = function() {};
  const d0 = dispatch("foo", "bar").on("foo", foo).on("bar", bar);
  const d1 = d0.copy();
  assert.strictEqual(d1.on("foo"), foo);
  assert.strictEqual(d1.on("bar"), bar);

  // Changes to d1 don’t affect d0.
  assert.strictEqual(d1.on("bar", null), d1);
  assert.strictEqual(d1.on("bar"), undefined);
  assert.strictEqual(d0.on("bar"), bar);

  // Changes to d0 don’t affect d1.
  assert.strictEqual(d0.on("foo", null), d0);
  assert.strictEqual(d0.on("foo"), undefined);
  assert.strictEqual(d1.on("foo"), foo);
});
