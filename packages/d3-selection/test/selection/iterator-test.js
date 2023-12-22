import assert from "assert";
import {selectAll} from "../../src/index.js";
import it from "../jsdom.js";

it("selection are iterable over the selected nodes", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  assert.deepStrictEqual([...selectAll([one, two])], [one, two]);
});

it("selection iteration merges nodes from all groups into a single array", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  assert.deepStrictEqual([...selectAll([one, two]).selectAll(function() { return [this]; })], [one, two]);
});

it("selection iteration skips missing elements", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  assert.deepStrictEqual([...selectAll([, one,, two])], [one, two]);
});
