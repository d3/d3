import assert from "assert";
import {curveLinear, lineRadial} from "../src/index.js";
import {assertPathEqual} from "./asserts.js";

it("lineRadial() returns a default radial line shape", () => {
  const l = lineRadial();
  assert.strictEqual(l.angle()([42, 34]), 42);
  assert.strictEqual(l.radius()([42, 34]), 34);
  assert.strictEqual(l.defined()([42, 34]), true);
  assert.strictEqual(l.curve(), curveLinear);
  assert.strictEqual(l.context(), null);
  assertPathEqual(l([[0, 1], [2, 3], [4, 5]]), "M0,-1L2.727892,1.248441L-3.784012,3.268218");
});
