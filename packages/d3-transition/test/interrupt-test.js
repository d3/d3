import assert from "assert";
import {select} from "d3-selection";
import {interrupt} from "../src/index.js";
import it from "./jsdom.js";

it("interrupt(node) cancels any pending transitions on the specified node", () => {
  const root = document.documentElement;
  const s = select(root);
  const t1 = s.transition();
  const t2 = t1.transition();
  assert.strictEqual(t1._id in root.__transition, true);
  assert.strictEqual(t2._id in root.__transition, true);
  interrupt(root);
  assert.strictEqual(root.__transition, undefined);
});

it("selection.interrupt(name) only cancels pending transitions with the specified name", () => {
  const root = document.documentElement;
  const s = select(root);
  const t1 = s.transition("foo");
  const t2 = s.transition();
  assert.strictEqual(t1._id in root.__transition, true);
  assert.strictEqual(t2._id in root.__transition, true);
  interrupt(root, "foo");
  assert.strictEqual(t1._id in root.__transition, false);
  assert.strictEqual(t2._id in root.__transition, true);
});
