import assert from "assert";
import {easeCubic} from "d3-ease";
import {interpolateNumber, interpolateRgb, interpolateString} from "d3-interpolate";
import {select, selectAll} from "d3-selection";
import {timeout} from "d3-timer";
import "../../src/index.js";
import it from "../jsdom.js";

it("transition.attr(name, value) creates an tween to the specified value", async () => {
  const root = document.documentElement;
  const ease = easeCubic;
  const duration = 250;
  const interpolate = interpolateRgb("red", "blue");
  const s = select(root).attr("fill", "red");
  s.transition().attr("fill", "blue");
  await new Promise(resolve => timeout(elapsed => {
    assert.strictEqual(root.getAttribute("fill"), interpolate(ease(elapsed / duration)));
    resolve();
  }, 125));
});

it("transition.attr(name, value) creates a namespaced tween to the specified value", async () => {
  const root = document.documentElement;
  const ease = easeCubic;
  const duration = 250;
  const interpolate = interpolateRgb("red", "blue");
  const s = select(root).attr("svg:fill", "red");
  s.transition().attr("svg:fill", "blue");
  await new Promise(resolve => timeout(elapsed => {
    assert.strictEqual(root.getAttributeNS("http://www.w3.org/2000/svg", "fill"), interpolate(ease(elapsed / duration)));
    resolve();
  }, 125));
});

it("transition.attr(name, value) creates an tween to the value returned by the specified function", async () => {
  const root = document.documentElement;
  const ease = easeCubic;
  const duration = 250;
  const interpolate = interpolateRgb("red", "blue");
  const s = select(root).attr("fill", "red");
  s.transition().attr("fill", function() { return "blue"; });
  await new Promise(resolve => timeout(elapsed => {
    assert.strictEqual(root.getAttribute("fill"), interpolate(ease(elapsed / duration)));
    resolve();
  }, 125));
});

it("transition.attr(name, value) creates a namespaced tween to the value returned by the specified function", async () => {
  const root = document.documentElement;
  const ease = easeCubic;
  const duration = 250;
  const interpolate = interpolateRgb("red", "blue");
  const s = select(root).attr("svg:fill", "red");
  s.transition().attr("svg:fill", function() { return "blue"; });
  await new Promise(resolve => timeout(elapsed => {
    assert.strictEqual(root.getAttributeNS("http://www.w3.org/2000/svg", "fill"), interpolate(ease(elapsed / duration)));
    resolve();
  }, 125));
});

it("transition.attr(name, constant) is a noop if the string-coerced value matches the current value on tween initialization", async () => {
  const root = document.documentElement;
  const s = select(root).attr("foo", 1);
  s.transition().attr("foo", 1);
  timeout(() => root.setAttribute("foo", 2), 125);
  await new Promise(resolve => timeout(() => {
    assert.strictEqual(root.getAttribute("foo"), "2");
    resolve();
  }, 250));
});

it("transition.attr(ns:name, constant) is a noop if the string-coerced value matches the current value on tween initialization", async () => {
  const root = document.documentElement;
  const s = select(root).attr("svg:foo", 1);
  s.transition().attr("svg:foo", 1);
  timeout(() => root.setAttributeNS("http://www.w3.org/2000/svg", "foo", 2), 125);
  await new Promise(resolve => timeout(() => {
    assert.strictEqual(root.getAttributeNS("http://www.w3.org/2000/svg", "foo"), "2");
    resolve();
  }, 250));
});

it("transition.attr(name, function) is a noop if the string-coerced value matches the current value on tween initialization", async () => {
  const root = document.documentElement;
  const s = select(root).attr("foo", 1);
  s.transition().attr("foo", function() { return 1; });
  timeout(() => root.setAttribute("foo", 2), 125);
  await new Promise(resolve => timeout(() => {
    assert.strictEqual(root.getAttribute("foo"), "2");
    resolve();
  }, 250));
});

it("transition.attr(ns:name, function) is a noop if the string-coerced value matches the current value on tween initialization", async () => {
  const root = document.documentElement;
  const s = select(root).attr("svg:foo", 1);
  s.transition().attr("svg:foo", function() { return 1; });
  timeout(() => root.setAttributeNS("http://www.w3.org/2000/svg", "foo", 2), 125);
  await new Promise(resolve => timeout(() => {
    assert.strictEqual(root.getAttributeNS("http://www.w3.org/2000/svg", "foo"), "2");
    resolve();
  }, 250));
});

it("transition.attr(name, constant) uses interpolateNumber if value is a number", async () => {
  const root = document.documentElement;
  const s = select(root).attr("foo", "15px");
  s.transition().attr("foo", 10);
  await new Promise(resolve => timeout(() => {
    assert.strictEqual(root.getAttribute("foo"), "NaN");
    resolve();
  }, 125));
});

it("transition.attr(name, function) uses interpolateNumber if value is a number", async () => {
  const root = document.documentElement;
  const s = select(root).attr("foo", "15px");
  s.transition().attr("foo", () => 10);
  await new Promise(resolve => timeout(() => {
    assert.strictEqual(root.getAttribute("foo"), "NaN");
    resolve();
  }, 125));
});

it("transition.attr(name, value) immediately evaluates the specified function with the expected context and arguments", "<h1 id='one' fill='cyan'></h1><h1 id='two' fill='magenta'></h1>", async () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const ease = easeCubic;
  const duration = 250;
  const interpolate1 = interpolateRgb("cyan", "red");
  const interpolate2 = interpolateRgb("magenta", "green");
  const s = selectAll([one, two]).data(["red", "green"]);
  const result = [];
  s.transition().attr("fill", function(d, i, nodes) { result.push([d, i, nodes, this]); return d; });
  assert.deepStrictEqual(result, [
    ["red", 0, [one, two], one],
    ["green", 1, [one, two], two]
  ]);
  await new Promise(resolve => timeout(elapsed => {
    assert.strictEqual(one.getAttribute("fill"), interpolate1(ease(elapsed / duration)));
    assert.strictEqual(two.getAttribute("fill"), interpolate2(ease(elapsed / duration)));
    resolve();
  }, 125));
});

it("transition.attr(name, value) constructs an interpolator using the current value on start", async () => {
  const root = document.documentElement;
  const ease = easeCubic;
  const duration = 250;
  const interpolate = interpolateRgb("red", "blue");
  const s = select(root);
  s.transition().on("start", function() { s.attr("fill", "red"); }).attr("fill", function() { return "blue"; });
  await new Promise(resolve => timeout(elapsed => {
    assert.strictEqual(root.getAttribute("fill"), interpolate(ease(elapsed / duration)));
    resolve();
  }, 125));
});

it("transition.attr(name, null) creates an tween which removes the specified attribute post-start", async () => {
  const root = document.documentElement;
  const s = select(root).attr("fill", "red");
  const started = () => assert.strictEqual(root.getAttribute("fill"), "red");
  s.transition().attr("fill", null).on("start", started);
  await new Promise(resolve => timeout(() => {
    assert.strictEqual(root.hasAttribute("fill"), false);
    resolve();
  }));
});

it("transition.attr(name, null) creates an tween which removes the specified namespaced attribute post-start", async () => {
  const root = document.documentElement;
  const s = select(root).attr("svg:fill", "red");
  const started = () => assert.strictEqual(root.getAttributeNS("http://www.w3.org/2000/svg", "fill"), "red");
  s.transition().attr("svg:fill", null).on("start", started);
  await new Promise(resolve => timeout(() => {
    assert.strictEqual(root.hasAttributeNS("http://www.w3.org/2000/svg", "fill"), false);
    resolve();
  }));
});

it("transition.attr(name, value) creates an tween which removes the specified attribute post-start if the specified function returns null", async () => {
  const root = document.documentElement;
  const s = select(root).attr("fill", "red");
  const started = () => assert.strictEqual(root.getAttribute("fill"), "red");
  s.transition().attr("fill", function() {}).on("start", started);
  await new Promise(resolve => timeout(() => {
    assert.strictEqual(root.hasAttribute("fill"), false);
    resolve();
  }));
});

it("transition.attr(name, value) creates an tween which removes the specified namespaced attribute post-start if the specified function returns null", async () => {
  const root = document.documentElement;
  const s = select(root).attr("svg:fill", "red");
  const started = () => assert.strictEqual(root.getAttributeNS("http://www.w3.org/2000/svg", "fill"), "red");
  s.transition().attr("svg:fill", function() {}).on("start", started);
  await new Promise(resolve => timeout(() => {
    assert.strictEqual(root.hasAttributeNS("http://www.w3.org/2000/svg", "fill"), false);
    resolve();
  }));
});

it("transition.attr(name, value) interpolates numbers", async () => {
  const root = document.documentElement;
  const ease = easeCubic;
  const duration = 250;
  const interpolate = interpolateNumber(1, 2);
  const s = select(root).attr("foo", 1);
  s.transition().attr("foo", 2);
  await new Promise(resolve => timeout(elapsed => {
    assert.strictEqual(root.getAttribute("foo"), interpolate(ease(elapsed / duration)) + "");
    resolve();
  }, 125));
});

it("transition.attr(name, value) interpolates strings", async () => {
  const root = document.documentElement;
  const ease = easeCubic;
  const duration = 250;
  const interpolate = interpolateString("1px", "2px");
  const s = select(root).attr("foo", "1px");
  s.transition().attr("foo", "2px");
  await new Promise(resolve => timeout(elapsed => {
    assert.strictEqual(root.getAttribute("foo"), interpolate(ease(elapsed / duration)));
    resolve();
  }, 125));
});

it("transition.attr(name, value) interpolates colors", async () => {
  const root = document.documentElement;
  const ease = easeCubic;
  const duration = 250;
  const interpolate = interpolateRgb("#f00", "#00f");
  const s = select(root).attr("foo", "#f00");
  s.transition().attr("foo", "#00f");
  await new Promise(resolve => timeout(elapsed => {
    assert.strictEqual(root.getAttribute("foo"), interpolate(ease(elapsed / duration)));
    resolve();
  }, 125));
});

it("transition.attr(name, value) creates an attrTween with the specified name", async () => {
  const root = document.documentElement;
  const s = select(root).attr("fill", "red");
  const t = s.transition().attr("fill", "blue");
  assert.strictEqual(t.attrTween("fill").call(root).call(root, 0.5), "rgb(128, 0, 128)");
});

it("transition.attr(name, value) creates a tween with the name \"attr.name\"", async () => {
  const root = document.documentElement;
  const s = select(root).attr("fill", "red");
  const t = s.transition().attr("fill", "blue");
  t.tween("attr.fill").call(root).call(root, 0.5);
  assert.strictEqual(root.getAttribute("fill"), "rgb(128, 0, 128)");
});
