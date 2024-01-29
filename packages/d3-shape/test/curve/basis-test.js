import assert from "assert";
import {area, line, curveBasis} from "../../src/index.js";
import {assertPathEqual} from "../asserts.js";

it("line.curve(curveBasis)(data) generates the expected path", () => {
  const l = line().curve(curveBasis);
  assert.strictEqual(l([]), null);
  assertPathEqual(l([[0, 1]]), "M0,1Z");
  assertPathEqual(l([[0, 1], [1, 3]]), "M0,1L1,3");
  assertPathEqual(l([[0, 1], [1, 3], [2, 1]]), "M0,1L0.166667,1.333333C0.333333,1.666667,0.666667,2.333333,1,2.333333C1.333333,2.333333,1.666667,1.666667,1.833333,1.333333L2,1");
});

it("area.curve(curveBasis)(data) generates the expected path", () => {
  const a = area().curve(curveBasis);
  assert.strictEqual(a([]), null);
  assertPathEqual(a([[0, 1]]), "M0,1L0,0Z");
  assertPathEqual(a([[0, 1], [1, 3]]), "M0,1L1,3L1,0L0,0Z");
  assertPathEqual(a([[0, 1], [1, 3], [2, 1]]), "M0,1L0.166667,1.333333C0.333333,1.666667,0.666667,2.333333,1,2.333333C1.333333,2.333333,1.666667,1.666667,1.833333,1.333333L2,1L2,0L1.833333,0C1.666667,0,1.333333,0,1,0C0.666667,0,0.333333,0,0.166667,0L0,0Z");
});
