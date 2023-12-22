import assert from "assert";
import {easeCubic} from "d3-ease";
import {interpolateHcl} from "d3-interpolate";
import {select} from "d3-selection";
import {timeout} from "d3-timer";
import "../../src/index.js";
import it from "../jsdom.js";

it("transition.textTween(value) defines a text tween using the interpolator returned by the specified function", async () => {
  const root = document.documentElement;
  const interpolate = interpolateHcl("red", "blue");
  const ease = easeCubic;
  select(root).transition().textTween(() => interpolate);
  await new Promise(resolve => timeout(elapsed => {
    assert.deepStrictEqual(root.textContent, interpolate(ease(elapsed / 250)));
    resolve();
  }, 125));
});

it("transition.textTween() returns the existing text tween", () => {
  const root = document.documentElement;
  const factory = () => {};
  const t = select(root).transition().textTween(factory);
  assert.strictEqual(t.textTween(), factory);
});

it("transition.textTween(null) removes an existing text tween", () => {
  const root = document.documentElement;
  const factory = () => {};
  const t = select(root).transition().textTween(factory);
  t.textTween(undefined);
  assert.strictEqual(t.textTween(), null);
});
