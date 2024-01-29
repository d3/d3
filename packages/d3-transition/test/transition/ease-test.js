import assert from "assert";
import {easeBounce, easeCubic} from "d3-ease";
import {select, selectAll} from "d3-selection";
import {timeout} from "d3-timer";
import "../../src/index.js";
import {ENDING, RUNNING} from "../../src/transition/schedule.js";
import it from "../jsdom.js";

it("transition.ease() returns the easing function for the first non-null node", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const t1 = select(one).transition();
  const t2 = select(two).transition().ease(easeBounce);
  assert.strictEqual(one.__transition[t1._id].ease, easeCubic);
  assert.strictEqual(two.__transition[t2._id].ease, easeBounce);
  assert.strictEqual(t1.ease(), easeCubic);
  assert.strictEqual(t2.ease(), easeBounce);
  assert.strictEqual(select(one).transition(t1).ease(), easeCubic);
  assert.strictEqual(select(two).transition(t2).ease(), easeBounce);
  assert.strictEqual(selectAll([null, one]).transition(t1).ease(), easeCubic);
  assert.strictEqual(selectAll([null, two]).transition(t2).ease(), easeBounce);
});

it("transition.ease(ease) throws an error if ease is not a function", () => {
  const root = document.documentElement;
  const t = select(root).transition();
  assert.throws(() => { t.ease(42); });
  assert.throws(() => { t.ease(null); });
});

it("transition.ease(ease) sets the easing function for each selected element to the specified function", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const t = selectAll([one, two]).transition().ease(easeBounce);
  assert.strictEqual(one.__transition[t._id].ease, easeBounce);
  assert.strictEqual(two.__transition[t._id].ease, easeBounce);
});

it("transition.ease(ease) passes the easing function the normalized time in [0, 1]", async () => {
  let actual;
  const root = document.documentElement;
  const ease = t => { actual = t; return t; };

  select(root).transition().ease(ease);

  await new Promise(resolve => timeout((elapsed) => {
    assert.strictEqual(actual, elapsed / 250);
    resolve()
  }, 100));
});

it("transition.ease(ease) does not invoke the easing function on the last frame", async () => {
  const root = document.documentElement;
  const ease = t => { assert.strictEqual(schedule.state, RUNNING); return t; };
  const t = select(root).transition().ease(ease);
  const schedule = root.__transition[t._id];
  await t.end();
});

it("transition.ease(ease) observes the eased time returned by the easing function", async () => {
  const root = document.documentElement;
  let expected;
  const ease = () => { return expected = Math.random() * 2 - 0.5; };
  const tween = () => { return t => { assert.strictEqual(t, schedule.state === ENDING ? 1 : expected); }; };
  const t = select(root).transition().ease(ease).tween("tween", tween);
  const schedule = root.__transition[t._id];
  await t.end();
});
