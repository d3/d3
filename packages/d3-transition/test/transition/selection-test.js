import assert from "assert";
import {select, selection} from "d3-selection";
import "../../src/index.js";
import it from "../jsdom.js";

it("transition.selection() returns the transition’s selection", "<h1 id='one'>one</h1><h1 id='two'>two</h1>", () => {
  const s0 = select(document.body).selectAll("h1");
  const t = s0.transition();
  const s1 = t.selection();
  assert(s1 instanceof selection);
  assert.strictEqual(s1._groups, s0._groups);
  assert.strictEqual(s1._parents, s0._parents);
});
