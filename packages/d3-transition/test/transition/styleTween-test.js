import assert from "assert";
import {easeCubic} from "d3-ease";
import {interpolateHcl} from "d3-interpolate";
import {select, selectAll} from "d3-selection";
import {now, timeout} from "d3-timer";
import "../../src/index.js";
import {ENDING} from "../../src/transition/schedule.js";
import it from "../jsdom.js";

it("transition.styleTween(name, value) defines a style tween using the interpolator returned by the specified function", async () => {
  const root = document.documentElement;
  const interpolate = interpolateHcl("red", "blue");
  const ease = easeCubic;
  select(root).transition().styleTween("color", () => interpolate);
  await new Promise(resolve => timeout(elapsed => {
    assert.deepStrictEqual(root.style.getPropertyValue("color"), interpolate(ease(elapsed / 250)));
    assert.deepStrictEqual(root.style.getPropertyPriority("color"), "");
    resolve();
  }, 125));
});

it("transition.styleTween(name, value, priority) defines a style tween using the interpolator returned by the specified function", async () => {
  const root = document.documentElement;
  const interpolate = interpolateHcl("red", "blue");
  const ease = easeCubic;
  select(root).transition().styleTween("color", () => interpolate, "important");
  await new Promise(resolve => timeout(elapsed => {
    assert.deepStrictEqual(root.style.getPropertyValue("color"), interpolate(ease(elapsed / 250)));
    assert.deepStrictEqual(root.style.getPropertyPriority("color"), "important");
    resolve();
  }, 125));
});

it("transition.styleTween(name, value) invokes the value function with the expected context and arguments", "<h1 id='one'></h1><h1 id='two'></h1>", async () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const result = [];
  selectAll([one, two]).data(["one", "two"]).transition().styleTween("color", function(d, i, nodes) { result.push([d, i, nodes, this]); });
  await new Promise(resolve => timeout(resolve));
  assert.deepStrictEqual(result, [
    ["one", 0, [one, two], one],
    ["two", 1, [one, two], two]
  ]);
});

it("transition.styleTween(name, value) passes the eased time to the interpolator", async () => {
  const root = document.documentElement;
  const then = now();
  const duration = 250;
  const ease = easeCubic;
  const t = select(root).transition().styleTween("color", () => interpolate);
  const schedule = root.__transition[t._id];
  function interpolate(t) {
    assert.strictEqual(this, root);
    assert.strictEqual(t, schedule.state === ENDING ? 1 : ease((now() - then) / duration));
  }
  await t.end();
});

it("transition.styleTween(name, value) allows the specified function to return null for a noop", async () => {
  const root = document.documentElement;
  const s = select(root).style("color", "red");
  s.transition().styleTween("color", () => {});
  await new Promise(resolve => timeout(() => {
    assert.deepStrictEqual(root.style.getPropertyValue("color"), "red");
    resolve();
  }, 125));
});

it("transition.styleTween(name, value) coerces the specified name to a string", async () => {
  const root = document.documentElement;
  const interpolate = interpolateHcl("red", "blue");
  const ease = easeCubic;
  select(root).transition().styleTween({toString() { return "color"; }}, () => interpolate);
  await new Promise(resolve => timeout(elapsed => {
    assert.deepStrictEqual(root.style.getPropertyValue("color"), interpolate(ease(elapsed / 250)));
    resolve();
  }, 125));
});

it("transition.styleTween(name, value) throws an error if value is not null and not a function", async () => {
  const root = document.documentElement;
  const t = select(root).transition();
  assert.throws(() => { t.styleTween("color", 42); });
});

it("transition.styleTween(name, null) removes the specified style tween", async () => {
  const root = document.documentElement;
  const interpolate = interpolateHcl("red", "blue");
  const t = select(root).transition().styleTween("color", () => interpolate).styleTween("color", null);
  assert.strictEqual(t.styleTween("color"), null);
  assert.strictEqual(t.tween("style.color"), null);
  await new Promise(resolve => timeout(() => {
    assert.strictEqual(root.style.getPropertyValue("color"), "");
    resolve();
  }, 125));
});

it("transition.styleTween(name) returns the style tween with the specified name", async () => {
  const root = document.documentElement;
  const interpolate = interpolateHcl("red", "blue");
  const tween = () => interpolate;
  const started = () => { assert.strictEqual(t.styleTween("color"), tween); };
  const ended = () => { assert.strictEqual(t.styleTween("color"), tween); };
  const t = select(root).transition().styleTween("color", tween).on("start", started).on("end", ended);
  assert.strictEqual(t.styleTween("color"), tween);
  assert.strictEqual(t.styleTween("bar"), null);
  await t.end();
});

it("transition.styleTween(name) coerces the specified name to a string", async () => {
  const root = document.documentElement;
  const tween = () => {};
  const t = select(root).transition().styleTween("color", tween);
  assert.strictEqual(t.styleTween({toString() { return "color"; }}), tween);
});
