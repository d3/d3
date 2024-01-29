import assert from "assert";
import {select, selectAll} from "../../src/index.js";
import it from "../jsdom.js";

it("selection.on(type, listener) registers a listeners for the specified event type on each selected element", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  let clicks = 0;
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const s = selectAll([one, two]);
  assert.strictEqual(s.on("click", () => { ++clicks; }), s);
  s.dispatch("click");
  assert.strictEqual(clicks, 2);
  s.dispatch("tick");
  assert.strictEqual(clicks, 2);
});

it("selection.on(type, listener) observes the specified name, if any", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  let foo = 0;
  let bar = 0;
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const s = selectAll([one, two]).on("click.foo", () => { ++foo; }).on("click.bar", () => { ++bar; });
  s.dispatch("click");
  assert.strictEqual(foo, 2);
  assert.strictEqual(bar, 2);
});

it("selection.on(type, listener, capture) observes the specified capture flag, if any", () => {
  let result;
  const s = select({addEventListener: (type, listener, capture) => { result = capture; }});
  assert.strictEqual(s.on("click.foo", () => {}, true), s);
  assert.deepStrictEqual(result, true);
});

it("selection.on(type) returns the listener for the specified event type, if any", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const clicked = () => {};
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const s = selectAll([one, two]).on("click", clicked);
  assert.strictEqual(s.on("click"), clicked);
});

it("selection.on(type) observes the specified name, if any", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const clicked = () => {};
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const s = selectAll([one, two]).on("click.foo", clicked);
  assert.strictEqual(s.on("click"), undefined);
  assert.strictEqual(s.on("click.foo"), clicked);
  assert.strictEqual(s.on("click.bar"), undefined);
  assert.strictEqual(s.on("tick.foo"), undefined);
  assert.strictEqual(s.on(".foo"), undefined);
});

it("selection.on(type, null) removes the listener with the specified name, if any", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  let clicks = 0;
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const s = selectAll([one, two]).on("click", () => { ++clicks; });
  assert.strictEqual(s.on("click", null), s);
  assert.strictEqual(s.on("click"), undefined);
  s.dispatch("click");
  assert.strictEqual(clicks, 0);
});

it("selection.on(type, null) observes the specified name, if any", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  let foo = 0;
  let bar = 0;
  const fooed = () => { ++foo; };
  const barred = () => { ++bar; };
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const s = selectAll([one, two]).on("click.foo", fooed).on("click.bar", barred);
  assert.strictEqual(s.on("click.foo", null), s);
  assert.strictEqual(s.on("click.foo"), undefined);
  assert.strictEqual(s.on("click.bar"), barred);
  s.dispatch("click");
  assert.strictEqual(foo, 0);
  assert.strictEqual(bar, 2);
});

it("selection.on(type, null, capture) ignores the specified capture flag, if any", () => {
  let clicks = 0;
  const clicked = () => { ++clicks; };
  const s = select(document).on("click.foo", clicked, true);
  s.dispatch("click");
  assert.strictEqual(clicks, 1);
  s.on(".foo", null, false).dispatch("click");
  assert.strictEqual(clicks, 1);
  assert.strictEqual(s.on("click.foo"), undefined);
});

it("selection.on(name, null) removes all listeners with the specified name", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  let clicks = 0;
  let loads = 0;
  const clicked = () => { ++clicks; };
  const loaded = () => { ++loads; };
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const s = selectAll([one, two]).on("click.foo", clicked).on("load.foo", loaded);
  assert.strictEqual(s.on("click.foo"), clicked);
  assert.strictEqual(s.on("load.foo"), loaded);
  s.dispatch("click");
  s.dispatch("load");
  assert.strictEqual(clicks, 2);
  assert.strictEqual(loads, 2);
  assert.strictEqual(s.on(".foo", null), s);
  assert.strictEqual(s.on("click.foo"), undefined);
  assert.strictEqual(s.on("load.foo"), undefined);
  s.dispatch("click");
  s.dispatch("load");
  assert.strictEqual(clicks, 2);
  assert.strictEqual(loads, 2);
});

it("selection.on(name, null) can remove a listener with capture", () => {
  let clicks = 0;
  const clicked = () => { ++clicks; };
  const s = select(document).on("click.foo", clicked, true);
  s.dispatch("click");
  assert.strictEqual(clicks, 1);
  s.on(".foo", null).dispatch("click");
  assert.strictEqual(clicks, 1);
  assert.strictEqual(s.on("click.foo"), undefined);
});

it("selection.on(name, listener) has no effect", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  let clicks = 0;
  const clicked = () => { ++clicks; };
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const s = selectAll([one, two]).on("click.foo", clicked);
  assert.strictEqual(s.on(".foo", () => { throw new Error; }), s);
  assert.strictEqual(s.on("click.foo"), clicked);
  s.dispatch("click");
  assert.strictEqual(clicks, 2);
});

it("selection.on(type) skips missing elements", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const clicked = () => {};
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  selectAll([one, two]).on("click.foo", clicked);
  assert.strictEqual(selectAll([, two]).on("click.foo"), clicked);
});

it("selection.on(type, listener) skips missing elements", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  let clicks = 0;
  const clicked = () => { ++clicks; };
  const two = document.querySelector("#two");
  const s = selectAll([, two]).on("click.foo", clicked);
  s.dispatch("click");
  assert.strictEqual(clicks, 1);
});

it("selection.on(type, listener) passes the event and listener data", "<parent id='one'><child id='three'></child><child id='four'></child></parent><parent id='two'><child id='five'></child></parent>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const three = document.querySelector("#three");
  const four = document.querySelector("#four");
  const five = document.querySelector("#five");
  const results = [];

  const s = selectAll([one, two])
      .datum(function(d, i) { return "parent-" + i; })
    .selectAll("child")
      .data(function(d, i) { return [0, 1].map(function(j) { return "child-" + i + "-" + j; }); })
      .on("foo", function(e, d) { results.push([this, e.type, d]); });

  assert.deepStrictEqual(results, []);
  s.dispatch("foo");
  assert.deepStrictEqual(results, [
    [three, "foo", "child-0-0"],
    [four, "foo", "child-0-1"],
    [five, "foo", "child-1-0"]
  ]);
});

it("selection.on(type, listener) passes the current listener data", "<parent id='one'><child id='three'></child><child id='four'></child></parent><parent id='two'><child id='five'></child></parent>", () => {
  const results = [];
  const s = select(document).on("foo", function(e, d) { results.push(d); });
  s.dispatch("foo");
  document.__data__ = 42;
  s.dispatch("foo");
  assert.deepStrictEqual(results, [undefined, 42]);
});
