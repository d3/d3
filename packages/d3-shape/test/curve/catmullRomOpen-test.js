import assert from "assert";
import {area, line, curveCatmullRomOpen} from "../../src/index.js";
import {assertPathEqual} from "../asserts.js";

it("line.curve(curveCatmullRomOpen)(data) generates the expected path", () => {
  const l = line().curve(curveCatmullRomOpen);
  assert.strictEqual(l([]), null);
  assert.strictEqual(l([[0, 1]]), null);
  assert.strictEqual(l([[0, 1], [1, 3]]), null);
  assertPathEqual(l([[0, 1], [1, 3], [2, 1]]), "M1,3Z");
  assertPathEqual(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.333333,3,1.666667,1,2,1");
});

it("line.curve(curveCatmullRomOpen.alpha(1))(data) generates the expected path", () => {
  const l = line().curve(curveCatmullRomOpen.alpha(1));
  assert.strictEqual(l([]), null);
  assert.strictEqual(l([[0, 1]]), null);
  assert.strictEqual(l([[0, 1], [1, 3]]), null);
  assertPathEqual(l([[0, 1], [1, 3], [2, 1]]), "M1,3Z");
  assertPathEqual(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.333333,3,1.666667,1,2,1");
});

it("line.curve(curveCatmullRomOpen) uses a default alpha of 0.5 (centripetal)", () => {
  const l = line().curve(curveCatmullRomOpen.alpha(0.5));
  assert.strictEqual(line().curve(curveCatmullRomOpen)([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
});

it("line.curve(curveCatmullRomOpen.alpha(alpha)) coerces the specified alpha to a number", () => {
  const l = line().curve(curveCatmullRomOpen.alpha("0.5"));
  assert.strictEqual(line().curve(curveCatmullRomOpen.alpha(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
});

it("area.curve(curveCatmullRomOpen.alpha(0.5))(data) generates the expected path", () => {
  const a = area().curve(curveCatmullRomOpen, 0.5);
  assert.strictEqual(a([]), null);
  assert.strictEqual(a([[0, 1]]), null);
  assert.strictEqual(a([[0, 1], [1, 3]]), null);
  assertPathEqual(a([[0, 1], [1, 3], [2, 1]]), "M1,3L1,0Z");
  assertPathEqual(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.333333,3,1.666667,1,2,1L2,0C1.666667,0,1.333333,0,1,0Z");
});

it("area.curve(curveCatmullRomOpen) uses a default alpha of 0.5 (centripetal)", () => {
  const a = area().curve(curveCatmullRomOpen, 0.5);
  assert.strictEqual(area().curve(curveCatmullRomOpen)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
});

it("area.curve(curveCatmullRomOpen.alpha(alpha)) coerces the specified alpha to a number", () => {
  const a = area().curve(curveCatmullRomOpen.alpha("0.5"));
  assert.strictEqual(area().curve(curveCatmullRomOpen.alpha(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
});
