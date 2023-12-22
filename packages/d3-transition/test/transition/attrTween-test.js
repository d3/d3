import assert from "assert";
import {easeCubic} from "d3-ease";
import {interpolateHcl} from "d3-interpolate";
import {select, selectAll} from "d3-selection";
import {timeout, now} from "d3-timer";
import "../../src/index.js";
import {ENDING} from "../../src/transition/schedule.js";
import it from "../jsdom.js";

it("transition.attrTween(name, value) defines an attribute tween using the interpolator returned by the specified function", async () => {
  const root = document.documentElement;
  const interpolate = interpolateHcl("red", "blue");
  select(root).transition().attrTween("foo", () => interpolate);
  await new Promise(resolve => timeout(elapsed => {
    assert.strictEqual(root.getAttribute("foo"), interpolate(easeCubic(elapsed / 250)));
    resolve();
  }, 125));
});

it("transition.attrTween(name, value) invokes the value function with the expected context and arguments", "<h1 id='one'></h1><h1 id='two'></h1>", async () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const result = [];
  selectAll([one, two]).data(["one", "two"]).transition().attrTween("foo", function(d, i, nodes) { result.push([d, i, nodes, this]); });
  await new Promise(resolve => timeout(resolve));
  assert.deepStrictEqual(result, [
    ["one", 0, [one, two], one],
    ["two", 1, [one, two], two]
  ]);
});

it("transition.attrTween(name, value) passes the eased time to the interpolator", async () => {
  const root = document.documentElement;
  const then = now();
  const duration = 250;
  const ease = easeCubic;
  const t = select(root).transition().attrTween("foo", () => interpolate);
  const schedule = root.__transition[t._id];
  function interpolate(t) {
    assert.strictEqual(this, root);
    assert.strictEqual(t, schedule.state === ENDING ? 1 : ease((now() - then) / duration));
  }
  await t.end();
});

it("transition.attrTween(name, value) allows the specified function to return null for a noop", async () => {
  const root = document.documentElement;
  const s = select(root).attr("foo", "42").attr("svg:bar", "43");
  s.transition().attrTween("foo", () => {}).attrTween("svg:bar", () => {});
  await new Promise(resolve => timeout(resolve, 125));
  assert.strictEqual(root.getAttribute("foo"), "42");
  assert.strictEqual(root.getAttributeNS("http://www.w3.org/2000/svg", "bar"), "43");
});

it("transition.attrTween(name, value) defines a namespaced attribute tween using the interpolator returned by the specified function", async () => {
  const root = document.documentElement;
  const interpolate = interpolateHcl("red", "blue");
  select(root).transition().attrTween("svg:foo", () => interpolate);
  await new Promise(resolve => timeout(elapsed => {
    assert.strictEqual(root.getAttributeNS("http://www.w3.org/2000/svg", "foo"), interpolate(easeCubic(elapsed / 250)));
    resolve();
  }, 125));
});

it("transition.attrTween(name, value) coerces the specified name to a string", async () => {
  const root = document.documentElement;
  const interpolate = interpolateHcl("red", "blue");
  select(root).transition().attrTween({toString() { return "foo"; }}, () => interpolate);
  await new Promise(resolve => timeout(elapsed => {
    assert.strictEqual(root.getAttribute("foo"), interpolate(easeCubic(elapsed / 250)));
    resolve();
  }, 125));
});

it("transition.attrTween(name, value) throws an error if value is not null and not a function", async () => {
  const root = document.documentElement;
  const t = select(root).transition();
  assert.throws(() => { t.attrTween("foo", 42); });
});

it("transition.attrTween(name, null) removes the specified attribute tween", async () => {
  const root = document.documentElement;
  const interpolate = interpolateHcl("red", "blue");
  const t = select(root).transition().attrTween("foo", () => interpolate).attrTween("foo", null);
  assert.strictEqual(t.attrTween("foo"), null);
  assert.strictEqual(t.tween("attr.foo"), null);
  await new Promise(resolve => timeout(resolve, 125));
  assert.strictEqual(root.hasAttribute("foo"), false);
});

it("transition.attrTween(name) returns the attribute tween with the specified name", async () => {
  const root = document.documentElement;
  const interpolate = interpolateHcl("red", "blue");
  const tween = () => interpolate;
  const started = () => assert.strictEqual(t.attrTween("foo"), tween);
  const ended = () => assert.strictEqual(t.attrTween("foo"), tween);
  const t = select(root).transition().attrTween("foo", tween).on("start", started).on("end", ended);
  assert.strictEqual(t.attrTween("foo"), tween);
  assert.strictEqual(t.attrTween("bar"), null);
  await t.end();
});

it("transition.attrTween(name) coerces the specified name to a string", async () => {
  const root = document.documentElement;
  const tween = () => {};
  const t = select(root).transition().attrTween("color", tween);
  assert.strictEqual(t.attrTween({toString() { return "color"; }}), tween);
});
