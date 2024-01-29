import assert from "assert";
import {select, selectAll} from "d3-selection";
import {timeout} from "d3-timer";
import "../../src/index.js";
import {ENDED, ENDING, STARTING} from "../../src/transition/schedule.js";
import it from "../jsdom.js";

it("transition.on(type, listener) throws an error if listener is not a function", async () => {
  const root = document.documentElement;
  const t = select(root).transition();
  assert.throws(() => { t.on("start", 42); });
});

it("transition.on(typename) returns the listener with the specified typename, if any", async () => {
  const root = document.documentElement;
  const foo = () => {};
  const bar = () => {};
  const t = select(root).transition().on("start", foo).on("start.bar", bar);
  assert.strictEqual(t.on("start"), foo);
  assert.strictEqual(t.on("start.foo"), undefined);
  assert.strictEqual(t.on("start.bar"), bar);
  assert.strictEqual(t.on("end"), undefined);
});

it("transition.on(typename) throws an error if the specified type is not supported", async () => {
  const root = document.documentElement;
  const t = select(root).transition();
  assert.throws(() => { t.on("foo"); });
});

it("transition.on(typename, listener) throws an error if the specified type is not supported", async () => {
  const root = document.documentElement;
  const t = select(root).transition();
  assert.throws(() => { t.on("foo", () => {}); });
});

it("transition.on(typename, listener) throws an error if the specified listener is not a function", async () => {
  const root = document.documentElement;
  const t = select(root).transition();
  assert.throws(() => { t.on("foo", 42); });
});

it("transition.on(typename, null) removes the listener with the specified typename, if any", async () => {
  const root = document.documentElement;
  let starts = 0;
  const t = select(root).transition().on("start.foo", () => { ++starts; });
  const schedule = root.__transition[t._id];
  assert.strictEqual(t.on("start.foo", null), t);
  assert.strictEqual(t.on("start.foo"), undefined);
  assert.strictEqual(schedule.on.on("start.foo"), undefined);
  await new Promise(resolve => timeout(resolve));
  assert.strictEqual(starts, 0);
});

it("transition.on(\"start\", listener) registers a listener for the start event", async () => {
  const root = document.documentElement;
  const t = select(root).transition();
  const schedule = root.__transition[t._id];
  await new Promise(resolve => t.on("start", () => {
    assert.strictEqual(schedule.state, STARTING)
    resolve();
  }));
});

it("transition.on(\"interrupt\", listener) registers a listener for the interrupt event (during start)", async () => {
  const root = document.documentElement;
  const s = select(root);
  const t = s.transition();
  const schedule = root.__transition[t._id];
  timeout(() => s.interrupt());
  await new Promise(resolve => t.on("interrupt", () => {
    assert.strictEqual(schedule.state, ENDED);
    resolve();
  }));
});

it("transition.on(\"interrupt\", listener) registers a listener for the interrupt event (during run)", async () => {
  const root = document.documentElement;
  const s = select(root);
  const t = s.transition();
  const schedule = root.__transition[t._id];
  timeout(() => s.interrupt(), 50);
  await new Promise(resolve => t.on("interrupt", () => {
    assert.strictEqual(schedule.state, ENDED);
    resolve();
  }));
});

it("transition.on(\"end\", listener) registers a listener for the end event", async () => {
  const root = document.documentElement;
  const t = select(root).transition().duration(50);
  const schedule = root.__transition[t._id];
  await new Promise(resolve => t.on("end", () => {
    assert.strictEqual(schedule.state, ENDING);
    resolve();
  }));
});

it("transition.on(typename, listener) uses copy-on-write to apply changes", "<h1 id='one'></h1><h1 id='two'></h1>", async () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const foo = () => {};
  const bar = () => {};
  const t = selectAll([one, two]).transition();
  const schedule1 = one.__transition[t._id];
  const schedule2 = two.__transition[t._id];
  t.on("start", foo);
  assert.strictEqual(schedule1.on.on("start"), foo);
  assert.strictEqual(schedule2.on, schedule1.on);
  t.on("start", bar);
  assert.strictEqual(schedule1.on.on("start"), bar);
  assert.strictEqual(schedule2.on, schedule1.on);
  select(two).transition(t).on("start", foo);
  assert.strictEqual(schedule1.on.on("start"), bar);
  assert.strictEqual(schedule2.on.on("start"), foo);
});
