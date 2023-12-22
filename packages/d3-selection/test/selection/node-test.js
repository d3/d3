import assert from "assert";
import {select, selectAll} from "../../src/index.js";
import it from "../jsdom.js";

it("selection.node() returns the first element in a selection", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  assert.strictEqual(selectAll([one, two]).node(), one);
});

it("selection.node() skips missing elements", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  assert.strictEqual(selectAll([, one,, two]).node(), one);
});

it("selection.node() skips empty groups", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  assert.strictEqual(selectAll([one, two]).selectAll(function(d, i) { return i ? [this] : []; }).node(), two);
});

it("selection.node() returns null for an empty selection", () => {
  assert.strictEqual(select(null).node(), null);
  assert.strictEqual(selectAll([]).node(), null);
  assert.strictEqual(selectAll([,,]).node(), null);
});
