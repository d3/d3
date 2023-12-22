import assert from "assert";
import {selection} from "d3-selection";
import {transition} from "../../src/index.js";
import it from "../jsdom.js";

it("transition.nodes is the same as selection.nodes", () => {
  assert.strictEqual(transition.prototype.nodes, selection.prototype.nodes);
});
