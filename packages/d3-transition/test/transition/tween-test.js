import assert from "assert";
import {easeCubic} from "d3-ease";
import {select, selectAll} from "d3-selection";
import {now, timeout} from "d3-timer";
import "../../src/index.js";
import {ENDING} from "../../src/transition/schedule.js";
import it from "../jsdom.js";

it("transition.tween(name, value) defines an tween using the interpolator returned by the specified function", async () => {
  const root = document.documentElement;
  let value;
  const interpolate = t => { value = t; };
  select(root).transition().tween("foo", () => interpolate);
  await new Promise(resolve => timeout(elapsed => {
    assert.strictEqual(value, easeCubic(elapsed / 250));
    resolve();
  }, 125));
});

it("transition.tween(name, value) invokes the value function with the expected context and arguments", "<h1 id='one'></h1><h1 id='two'></h1>", async () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const result = [];
  selectAll([one, two]).data(["one", "two"]).transition().tween("foo", function(d, i, nodes) { result.push([d, i, nodes, this]); });
  await new Promise(resolve => timeout(resolve));
  assert.deepStrictEqual(result, [
    ["one", 0, [one, two], one],
    ["two", 1, [one, two], two]
  ]);
});

it("transition.tween(name, value) passes the eased time to the interpolator", async () => {
  const root = document.documentElement;
  const then = now();
  const duration = 250;
  const ease = easeCubic;
  const t = select(root).transition().tween("foo", () => interpolate);
  const schedule = root.__transition[t._id];
  function interpolate(t) {
    assert.strictEqual(this, root);
    assert.strictEqual(t, schedule.state === ENDING ? 1 : ease((now() - then) / duration));
  }
  await t.end();
});

it("transition.tween(name, value) allows the specified function to return null for a noop", async () => {
  const root = document.documentElement;
  const s = select(root);
  s.transition().tween("foo", () => {});
});

it("transition.tween(name, value) uses copy-on-write to apply changes", "<h1 id='one'></h1><h1 id='two'></h1>", async () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const foo = () => {};
  const bar = () => {};
  const t = selectAll([one, two]).transition();
  const schedule1 = one.__transition[t._id];
  const schedule2 = two.__transition[t._id];
  t.tween("foo", foo);
  assert.deepStrictEqual(schedule1.tween, [{name: "foo", value: foo}]);
  assert.strictEqual(schedule2.tween, schedule1.tween);
  t.tween("foo", bar);
  assert.deepStrictEqual(schedule1.tween, [{name: "foo", value: bar}]);
  assert.strictEqual(schedule2.tween, schedule1.tween);
  select(two).transition(t).tween("foo", foo);
  assert.deepStrictEqual(schedule1.tween, [{name: "foo", value: bar}]);
  assert.deepStrictEqual(schedule2.tween, [{name: "foo", value: foo}]);
});

it("transition.tween(name, value) uses copy-on-write to apply removals", "<h1 id='one'></h1><h1 id='two'></h1>", async () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const foo = () => {};
  const t = selectAll([one, two]).transition();
  const schedule1 = one.__transition[t._id];
  const schedule2 = two.__transition[t._id];
  t.tween("foo", foo);
  assert.deepStrictEqual(schedule1.tween, [{name: "foo", value: foo}]);
  assert.strictEqual(schedule2.tween, schedule1.tween);
  t.tween("bar", null);
  assert.deepStrictEqual(schedule1.tween, [{name: "foo", value: foo}]);
  assert.strictEqual(schedule2.tween, schedule1.tween);
  t.tween("foo", null);
  assert.deepStrictEqual(schedule1.tween, []);
  assert.strictEqual(schedule2.tween, schedule1.tween);
  select(two).transition(t).tween("foo", foo);
  assert.deepStrictEqual(schedule1.tween, []);
  assert.deepStrictEqual(schedule2.tween, [{name: "foo", value: foo}]);
});

it("transition.tween(name, value) coerces the specified name to a string", async () => {
  const root = document.documentElement;
  const tween = () => {};
  const t = select(root).transition().tween({toString() { return "foo"; }}, tween);
  assert.strictEqual(t.tween("foo"), tween);
});

it("transition.tween(name) coerces the specified name to a string", async () => {
  const root = document.documentElement;
  const tween = () => {};
  const t = select(root).transition().tween("foo", tween);
  assert.strictEqual(t.tween({toString() { return "foo"; }}), tween);
});

it("transition.tween(name, value) throws an error if value is not null and not a function", async () => {
  const root = document.documentElement;
  const t = select(root).transition();
  assert.throws(() => { t.tween("foo", 42); });
});

it("transition.tween(name, null) removes the specified tween", async () => {
  const root = document.documentElement;
  let frames = 0;
  const interpolate = () => { ++frames; };
  const t = select(root).transition().tween("foo", () => interpolate).tween("foo", null);
  assert.strictEqual(t.tween("foo"), null);
  await new Promise(resolve => timeout(() => {
    assert.strictEqual(frames, 0);
    resolve();
  }, 125));
});

it("transition.tween(name) returns the tween with the specified name", async () => {
  const root = document.documentElement;
  const tween = () => {};
  const started = () => { assert.strictEqual(t.tween("foo"), tween); }
  const ended = () => { assert.strictEqual(t.tween("foo"), tween); }
  const t = select(root).transition().tween("foo", tween).on("start", started).on("end", ended);
  assert.strictEqual(t.tween("foo"), tween);
  assert.strictEqual(t.tween("bar"), null);
  await t.end();
});
