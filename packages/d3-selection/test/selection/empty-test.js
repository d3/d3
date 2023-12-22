import assert from "assert";
import {select, selectAll} from "../../src/index.js";
import it from "../jsdom.js";

it("selection.empty() return false if the selection is not empty", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  assert.strictEqual(select(document).empty(), false);
});

it("selection.empty() return true if the selection is empty", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  assert.strictEqual(select(null).empty(), true);
  assert.strictEqual(selectAll([]).empty(), true);
  assert.strictEqual(selectAll([,]).empty(), true);
});
