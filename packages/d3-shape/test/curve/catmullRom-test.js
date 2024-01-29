import assert from "assert";
import {area, line, curveCatmullRom} from "../../src/index.js";
import {assertPathEqual} from "../asserts.js";

it("line.curve(curveCatmullRom)(data) generates the expected path", () => {
  const l = line().curve(curveCatmullRom);
  assert.strictEqual(l([]), null);
  assertPathEqual(l([[0, 1]]), "M0,1Z");
  assertPathEqual(l([[0, 1], [1, 3]]), "M0,1L1,3");
  assertPathEqual(l([[0, 1], [1, 3], [2, 1]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,2,1,2,1");
  assertPathEqual(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,1.666667,1,2,1C2.333333,1,3,3,3,3");
});

it("line.curve(curveCatmullRom.alpha(1))(data) generates the expected path", () => {
  const l = line().curve(curveCatmullRom.alpha(1));
  assert.strictEqual(l([]), null);
  assertPathEqual(l([[0, 1]]), "M0,1Z");
  assertPathEqual(l([[0, 1], [1, 3]]), "M0,1L1,3");
  assertPathEqual(l([[0, 1], [1, 3], [2, 1]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,2,1,2,1");
  assertPathEqual(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,1.666667,1,2,1C2.333333,1,3,3,3,3");
});

it("line.curve(curveCatmullRom) uses a default alpha of 0.5 (centripetal)", () => {
  const l = line().curve(curveCatmullRom.alpha(0.5));
  assert.strictEqual(line().curve(curveCatmullRom)([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
});

it("line.curve(curveCatmullRom.alpha(alpha)) coerces the specified alpha to a number", () => {
  const l = line().curve(curveCatmullRom.alpha("0.5"));
  assert.strictEqual(line().curve(curveCatmullRom.alpha(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
});

it("area.curve(curveCatmullRom.alpha(0))(data) generates the expected path", () => {
  const a = area().curve(curveCatmullRom.alpha(0));
  assert.strictEqual(a([]), null);
  assertPathEqual(a([[0, 1]]), "M0,1L0,0Z");
  assertPathEqual(a([[0, 1], [1, 3]]), "M0,1L1,3L1,0L0,0Z");
  assertPathEqual(a([[0, 1], [1, 3], [2, 1]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,2,1,2,1L2,0C2,0,1.333333,0,1,0C0.666667,0,0,0,0,0Z");
  assertPathEqual(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,1.666667,1,2,1C2.333333,1,3,3,3,3L3,0C3,0,2.333333,0,2,0C1.666667,0,1.333333,0,1,0C0.666667,0,0,0,0,0Z");
});

it("area.curve(curveCatmullRom) uses a default alpha of 0.5 (centripetal)", () => {
  const a = area().curve(curveCatmullRom.alpha(0.5));
  assert.strictEqual(area().curve(curveCatmullRom)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
});

it("area.curve(curveCatmullRom.alpha(alpha)) coerces the specified alpha to a number", () => {
  const a = area().curve(curveCatmullRom.alpha("0.5"));
  assert.strictEqual(area().curve(curveCatmullRom.alpha(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
});
