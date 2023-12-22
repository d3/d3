import assert from "assert";
import {area, line, curveStep} from "../../src/index.js";
import {assertPathEqual} from "../asserts.js";

it("line.curve(curveStep)(data) generates the expected path", () => {
  const l = line().curve(curveStep);
  assert.strictEqual(l([]), null);
  assertPathEqual(l([[0, 1]]), "M0,1Z");
  assertPathEqual(l([[0, 1], [2, 3]]), "M0,1L1,1L1,3L2,3");
  assertPathEqual(l([[0, 1], [2, 3], [4, 5]]), "M0,1L1,1L1,3L3,3L3,5L4,5");
});

it("area.curve(curveStep)(data) generates the expected path", () => {
  const a = area().curve(curveStep);
  assert.strictEqual(a([]), null);
  assertPathEqual(a([[0, 1]]), "M0,1L0,0Z");
  assertPathEqual(a([[0, 1], [2, 3]]), "M0,1L1,1L1,3L2,3L2,0L1,0L1,0L0,0Z");
  assertPathEqual(a([[0, 1], [2, 3], [4, 5]]), "M0,1L1,1L1,3L3,3L3,5L4,5L4,0L3,0L3,0L1,0L1,0L0,0Z");
});
