import assert from "assert";
import {easeBounce, easeCubic} from "d3-ease";
import {select, selectAll} from "d3-selection";
import {now, timeout} from "d3-timer";
import {transition} from "../../src/index.js";
import it from "../jsdom.js";

it("selection.transition() returns an instanceof transition", () => {
  const root = document.documentElement;
  const s = select(root);
  const t = s.transition();
  assert.strictEqual(t instanceof transition, true);
});

it("selection.transition() uses the default timing parameters", () => {
  const root = document.documentElement;
  const s = select(root);
  const t = s.transition();
  const schedule = root.__transition[t._id];
  assert.strictEqual(schedule.time, now());
  assert.strictEqual(schedule.delay, 0);
  assert.strictEqual(schedule.duration, 250);
  assert.strictEqual(schedule.ease, easeCubic);
});

it("selection.transition() assigns a monotonically-increasing id", () => {
  const root = document.documentElement;
  const s = select(root);
  const t1 = s.transition();
  const t2 = s.transition();
  const t3 = s.transition();
  assert(t2._id > t1._id);
  assert(t3._id > t2._id);
});

it("selection.transition() uses a default name of null", () => {
  const root = document.documentElement;
  const s = select(root);
  const t = s.transition();
  const schedule = root.__transition[t._id];
  assert.strictEqual(schedule.name, null);
});

it("selection.transition(null) uses a name of null", () => {
  const root = document.documentElement;
  const s = select(root);
  const t = s.transition(null);
  const schedule = root.__transition[t._id];
  assert.strictEqual(schedule.name, null);
});

it("selection.transition(undefined) uses a name of null", () => {
  const root = document.documentElement;
  const s = select(root);
  const t = s.transition(undefined);
  const schedule = root.__transition[t._id];
  assert.strictEqual(schedule.name, null);
});

it("selection.transition(name) uses the specified name", () => {
  const root = document.documentElement;
  const s = select(root);
  const t = s.transition("foo");
  const schedule = root.__transition[t._id];
  assert.strictEqual(schedule.name, "foo");
});

it("selection.transition(name) coerces the name to a string", () => {
  const root = document.documentElement;
  const s = select(root);
  const t = s.transition({toString() { return "foo"; }});
  const schedule = root.__transition[t._id];
  assert.strictEqual(schedule.name, "foo");
});

it("selection.transition(transition) inherits the id, name and timing from the corresponding parent in the specified transition", "<h1 id='one'><child></h1><h1 id='two'><child></h1>", async () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const s = selectAll([one, two]);
  const t = s.transition().delay(function(d, i) { return i * 50; }).duration(100).ease(easeBounce);
  const schedule1 = one.__transition[t._id];
  const schedule2 = two.__transition[t._id];
  const t1b = select(one.firstChild).transition(t);
  const schedule1b = one.firstChild.__transition[t._id];
  assert.strictEqual(t1b._id, t._id);
  assert.strictEqual(schedule1b.name, schedule1.name);
  assert.strictEqual(schedule1b.delay, schedule1.delay);
  assert.strictEqual(schedule1b.duration, schedule1.duration);
  assert.strictEqual(schedule1b.ease, schedule1.ease);
  assert.strictEqual(schedule1b.time, schedule1.time);
  await new Promise(resolve => timeout(resolve, 10));
  const t2b = select(two.firstChild).transition(t);
  const schedule2b = two.firstChild.__transition[t._id];
  assert.strictEqual(t2b._id, t._id);
  assert.strictEqual(schedule2b.name, schedule2.name);
  assert.strictEqual(schedule2b.delay, schedule2.delay);
  assert.strictEqual(schedule2b.duration, schedule2.duration);
  assert.strictEqual(schedule2b.ease, schedule2.ease);
  assert.strictEqual(schedule2b.time, schedule2.time);
});

it("selection.transition(transition) reselects the existing transition with the specified transition’s id, if any", () => {
  const root = document.documentElement;
  const foo = () => {};
  const bar = () => {};
  const s = select(root);
  const t1 = s.transition().tween("tween", foo);
  const schedule1 = root.__transition[t1._id];
  const t2 = s.transition(t1).tween("tween", bar);
  const schedule2 = root.__transition[t2._id];
  assert.strictEqual(t1._id, t2._id);
  assert.strictEqual(schedule1, schedule2);
  assert.strictEqual(t1.tween("tween"), bar);
  assert.strictEqual(t2.tween("tween"), bar);
});

it("selection.transition(transition) throws an error if the specified transition is not found", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const t1 = select(one).transition();
  const t2 = select(two).transition().delay(50);
  assert.throws(() => select(two).transition(t1), /transition .* not found/);
  assert.throws(() => select(one).transition(t2), /transition .* not found/);
});
