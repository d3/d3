import assert from "assert";
import {selection} from "d3-selection";
import {transition} from "../../src/index.js";
import it from "../jsdom.js";

it("transition.call is the same as selection.call", () => {
  assert.strictEqual(transition.prototype.call, selection.prototype.call);
});
