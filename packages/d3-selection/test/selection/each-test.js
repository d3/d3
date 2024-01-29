import assert from "assert";
import {selectAll} from "../../src/index.js";
import it from "../jsdom.js";

it("selection.each(function) calls the specified function for each selected element in order", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const result = [];
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const selection = selectAll([one, two]).datum(function(d, i) { return "node-" + i; });
  assert.strictEqual(selection.each(function(d, i, nodes) { result.push(this, d, i, nodes); }), selection);
  assert.deepStrictEqual(result, [one, "node-0", 0, [one, two], two, "node-1", 1, [one, two]]);
});

it("selection.each(function) skips missing elements", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const result = [];
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const selection = selectAll([, one,, two]).datum(function(d, i) { return "node-" + i; });
  assert.strictEqual(selection.each(function(d, i, nodes) { result.push(this, d, i, nodes); }), selection);
  assert.deepStrictEqual(result, [one, "node-1", 1, [, one,, two], two, "node-3", 3, [, one,, two]]);
});
