import assert from "assert";
import {select, selectAll} from "../../src/index.js";
import it from "../jsdom.js";

it("selection.order() moves selected elements so that they are before their next sibling", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const selection = selectAll([two, one]);
  assert.strictEqual(selection.order(), selection);
  assert.strictEqual(one.nextSibling, null);
  assert.strictEqual(two.nextSibling, one);
});

it("selection.order() only orders within each group", "<h1><span id='one'></span></h1><h1><span id='two'></span></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const selection = select(document).selectAll("h1").selectAll("span");
  assert.strictEqual(selection.order(), selection);
  assert.strictEqual(one.nextSibling, null);
  assert.strictEqual(two.nextSibling, null);
});
