import assert from "assert";
import {selectorAll} from "../src/index.js";
import it from "./jsdom.js";

it("selectorAll(selector).call(element) returns all elements that match the selector", "<body class='foo'><div class='foo'>", () => {
  const body = document.body;
  const div = document.querySelector("div");
  assert.deepStrictEqual([...selectorAll("body").call(document.documentElement)], [body]);
  assert.deepStrictEqual([...selectorAll(".foo").call(document.documentElement)], [body, div]);
  assert.deepStrictEqual([...selectorAll("div.foo").call(document.documentElement)], [div]);
  assert.deepStrictEqual([...selectorAll("div").call(document.documentElement)], [div]);
  assert.deepStrictEqual([...selectorAll("div,body").call(document.documentElement)], [body,div]);
  assert.deepStrictEqual([...selectorAll("h1").call(document.documentElement)], []);
  assert.deepStrictEqual([...selectorAll("body.bar").call(document.documentElement)], []);
});

it("selectorAll(null).call(element) always returns the empty array", "<body class='foo'><undefined></undefined><null></null>", () => {
  assert.deepStrictEqual(selectorAll().call(document.documentElement), []);
  assert.deepStrictEqual(selectorAll(null).call(document.documentElement), []);
  assert.deepStrictEqual(selectorAll(undefined).call(document.documentElement), []);
});

it("selectorAll(null).call(element) returns a new empty array each time", () => {
  const one = selectorAll()();
  const two = selectorAll()();
  assert.strictEqual(one === two, false);
  one.push("one");
  assert.deepStrictEqual(selectorAll()(), []);
});
