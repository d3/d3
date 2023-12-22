import assert from "assert";
import {area, line, curveCardinalOpen} from "../../src/index.js";
import {assertPathEqual} from "../asserts.js";

it("line.curve(curveCardinalOpen)(data) generates the expected path", () => {
  const l = line().curve(curveCardinalOpen);
  assert.strictEqual(l([]), null);
  assert.strictEqual(l([[0, 1]]), null);
  assert.strictEqual(l([[0, 1], [1, 3]]), null);
  assertPathEqual(l([[0, 1], [1, 3], [2, 1]]), "M1,3Z");
  assertPathEqual(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.333333,3,1.666667,1,2,1");
});

it("line.curve(curveCardinalOpen) uses a default tension of zero", () => {
  const l = line().curve(curveCardinalOpen.tension(0));
  assert.strictEqual(line().curve(curveCardinalOpen)([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
});

it("line.curve(curveCardinalOpen.tension(tension)) uses the specified tension", () => {
  assertPathEqual(line().curve(curveCardinalOpen.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.166667,3,1.833333,1,2,1");
});

it("line.curve(curveCardinalOpen.tension(tension)) coerces the specified tension to a number", () => {
  const l = line().curve(curveCardinalOpen.tension("0.5"));
  assert.strictEqual(line().curve(curveCardinalOpen.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
});

it("area.curve(curveCardinalOpen)(data) generates the expected path", () => {
  const a = area().curve(curveCardinalOpen);
  assert.strictEqual(a([]), null);
  assert.strictEqual(a([[0, 1]]), null);
  assert.strictEqual(a([[0, 1], [1, 3]]), null);
  assertPathEqual(a([[0, 1], [1, 3], [2, 1]]), "M1,3L1,0Z");
  assertPathEqual(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.333333,3,1.666667,1,2,1L2,0C1.666667,0,1.333333,0,1,0Z");
});

it("area.curve(curveCardinalOpen) uses a default tension of zero", () => {
  const a = area().curve(curveCardinalOpen.tension(0));
  assert.strictEqual(area().curve(curveCardinalOpen)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
});

it("area.curve(curveCardinalOpen.tension(tension)) uses the specified tension", () => {
  assertPathEqual(area().curve(curveCardinalOpen.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), "M1,3C1.166667,3,1.833333,1,2,1L2,0C1.833333,0,1.166667,0,1,0Z");
});

it("area.curve(curveCardinalOpen.tension(tension)) coerces the specified tension to a number", () => {
  const a = area().curve(curveCardinalOpen.tension("0.5"));
  assert.strictEqual(area().curve(curveCardinalOpen.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
});
