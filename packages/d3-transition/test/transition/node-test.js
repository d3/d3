import assert from "assert";
import {selection} from "d3-selection";
import {transition} from "../../src/index.js";
import it from "../jsdom.js";

it("transition.node is the same as selection.node", () => {
  assert.strictEqual(transition.prototype.node, selection.prototype.node);
});
