import assert from "assert";
import {select, selectAll} from "d3-selection";
import "../../src/index.js";
import it from "../jsdom.js";

it("transition.text(value) creates a tween to set the text content to the specified value post-start", async () => {
  const root = document.documentElement;
  const s = select(root);
  const t = s.transition().text("hello");

  await new Promise(resolve => t.on("start", () => {
    assert.strictEqual(root.textContent, "");
    resolve();
  }));

  assert.strictEqual(root.textContent, "hello");
});

it("transition.text(value) creates a tween to set the text content to the value returned by the specified function post-start", async () => {
  const root = document.documentElement;
  const s = select(root);
  const t = s.transition().text(() => "hello");

  await new Promise(resolve => t.on("start", () => {
    assert.strictEqual(root.textContent, "");
    resolve();
  }));

  assert.strictEqual(root.textContent, "hello");
});

it("transition.text(value) immediately evaluates the specified function with the expected context and arguments", "<h1 id='one'></h1><h1 id='two'></h1>", async () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const s = selectAll([one, two]).data(["red", "green"]);
  const result = [];
  const t = s.transition().text(function(d, i, nodes) { result.push([d, i, nodes, this]); return d; });

  assert.deepStrictEqual(result, [
    ["red", 0, [one, two], one],
    ["green", 1, [one, two], two]
  ]);

  await new Promise(resolve => t.on("start", resolve));
  assert.strictEqual(one.textContent, "red");
  assert.strictEqual(two.textContent, "green");
});

it("transition.text(value) creates a tween with the name \"text\"", () => {
  const root = document.documentElement;
  const s = select(root);
  const t = s.transition().text("hello");
  assert.strictEqual(t.tween("text").call(root), undefined);
  assert.strictEqual(root.textContent, "hello");
});
