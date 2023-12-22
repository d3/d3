import assert from "assert";
import {area, line, curveMonotoneX} from "../../src/index.js";
import {assertPathEqual} from "../asserts.js";

it("line.curve(curveMonotoneX)(data) generates the expected path", () => {
  const l = line().curve(curveMonotoneX);
  assert.strictEqual(l([]), null);
  assertPathEqual(l([[0, 1]]), "M0,1Z");
  assertPathEqual(l([[0, 1], [1, 3]]), "M0,1L1,3");
  assertPathEqual(l([[0, 1], [1, 3], [2, 1]]), "M0,1C0.333333,2,0.666667,3,1,3C1.333333,3,1.666667,2,2,1");
  assertPathEqual(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0.333333,2,0.666667,3,1,3C1.333333,3,1.666667,1,2,1C2.333333,1,2.666667,2,3,3");
});

it("line.curve(curveMonotoneX)(data) preserves monotonicity in y", () => {
  const l = line().curve(curveMonotoneX);
  assertPathEqual(l([[0, 200], [100, 100], [200, 100], [300, 300], [400, 300]]), "M0,200C33.333333,150,66.666667,100,100,100C133.333333,100,166.666667,100,200,100C233.333333,100,266.666667,300,300,300C333.333333,300,366.666667,300,400,300");
});

it("line.curve(curveMonotoneX)(data) handles duplicate x-values", () => {
  const l = line().curve(curveMonotoneX);
  assertPathEqual(l([[0, 200], [0, 100], [100, 100], [200, 0]]), "M0,200C0,200,0,100,0,100C33.333333,100,66.666667,100,100,100C133.333333,100,166.666667,50,200,0");
  assertPathEqual(l([[0, 200], [100, 100], [100, 0], [200, 0]]), "M0,200C33.333333,183.333333,66.666667,166.666667,100,100C100,100,100,0,100,0C133.333333,0,166.666667,0,200,0");
  assertPathEqual(l([[0, 200], [100, 100], [200, 100], [200, 0]]), "M0,200C33.333333,150,66.666667,100,100,100C133.333333,100,166.666667,100,200,100C200,100,200,0,200,0");
});

it("line.curve(curveMonotoneX)(data) handles segments of infinite slope", () => {
  const l = line().curve(curveMonotoneX);
  assertPathEqual(l([[0, 200], [100, 150], [100, 50], [200, 0]]), "M0,200C33.333333,191.666667,66.666667,183.333333,100,150C100,150,100,50,100,50C133.333333,16.666667,166.666667,8.333333,200,0");
  assertPathEqual(l([[200, 0], [100, 50], [100, 150], [0, 200]]), "M200,0C166.666667,8.333333,133.333333,16.666667,100,50C100,50,100,150,100,150C66.666667,183.333333,33.333333,191.666667,0,200");
});

it("line.curve(curveMonotoneX)(data) ignores coincident points", () => {
  const l = line().curve(curveMonotoneX);
  const p = l([[0, 200], [50, 200], [100, 100], [150, 0], [200, 0]]);
  assert.strictEqual(l([[0, 200], [0, 200], [50, 200], [100, 100], [150, 0], [200, 0]]), p);
  assert.strictEqual(l([[0, 200], [50, 200], [50, 200], [100, 100], [150, 0], [200, 0]]), p);
  assert.strictEqual(l([[0, 200], [50, 200], [100, 100], [100, 100], [150, 0], [200, 0]]), p);
  assert.strictEqual(l([[0, 200], [50, 200], [100, 100], [150, 0], [150, 0], [200, 0]]), p);
  assert.strictEqual(l([[0, 200], [50, 200], [100, 100], [150, 0], [200, 0], [200, 0]]), p);
});

it("area.curve(curveMonotoneX)(data) generates the expected path", () => {
  const a = area().curve(curveMonotoneX);
  assert.strictEqual(a([]), null);
  assertPathEqual(a([[0, 1]]), "M0,1L0,0Z");
  assertPathEqual(a([[0, 1], [1, 3]]), "M0,1L1,3L1,0L0,0Z");
  assertPathEqual(a([[0, 1], [1, 3], [2, 1]]), "M0,1C0.333333,2,0.666667,3,1,3C1.333333,3,1.666667,2,2,1L2,0C1.666667,0,1.333333,0,1,0C0.666667,0,0.333333,0,0,0Z");
  assertPathEqual(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0.333333,2,0.666667,3,1,3C1.333333,3,1.666667,1,2,1C2.333333,1,2.666667,2,3,3L3,0C2.666667,0,2.333333,0,2,0C1.666667,0,1.333333,0,1,0C0.666667,0,0.333333,0,0,0Z");
});
