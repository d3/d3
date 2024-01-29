import assert from "assert";
import {area, line, curveCardinal} from "../../src/index.js";
import {assertPathEqual} from "../asserts.js";

it("line.curve(curveCardinal)(data) generates the expected path", () => {
  const l = line().curve(curveCardinal);
  assert.strictEqual(l([]), null);
  assertPathEqual(l([[0, 1]]), "M0,1Z");
  assertPathEqual(l([[0, 1], [1, 3]]), "M0,1L1,3");
  assertPathEqual(l([[0, 1], [1, 3], [2, 1]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,2,1,2,1");
  assertPathEqual(l([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,1.666667,1,2,1C2.333333,1,3,3,3,3");
});

it("line.curve(curveCardinal) uses a default tension of zero", () => {
  const l = line().curve(curveCardinal.tension(0));
  assert.strictEqual(line().curve(curveCardinal)([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
});

it("line.curve(curveCardinal.tension(tension)) uses the specified tension", () => {
  assertPathEqual(line().curve(curveCardinal.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.833333,3,1,3C1.166667,3,1.833333,1,2,1C2.166667,1,3,3,3,3");
});

it("line.curve(curveCardinal.tension(tension)) coerces the specified tension to a number", () => {
  const l = line().curve(curveCardinal.tension("0.5"));
  assert.strictEqual(line().curve(curveCardinal.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
});

it("area.curve(curveCardinal)(data) generates the expected path", () => {
  const a = area().curve(curveCardinal);
  assert.strictEqual(a([]), null);
  assertPathEqual(a([[0, 1]]), "M0,1L0,0Z");
  assertPathEqual(a([[0, 1], [1, 3]]), "M0,1L1,3L1,0L0,0Z");
  assertPathEqual(a([[0, 1], [1, 3], [2, 1]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,2,1,2,1L2,0C2,0,1.333333,0,1,0C0.666667,0,0,0,0,0Z");
  assertPathEqual(a([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.666667,3,1,3C1.333333,3,1.666667,1,2,1C2.333333,1,3,3,3,3L3,0C3,0,2.333333,0,2,0C1.666667,0,1.333333,0,1,0C0.666667,0,0,0,0,0Z");
});

it("area.curve(curveCardinal) uses a default tension of zero", () => {
  const a = area().curve(curveCardinal.tension(0));
  assert.strictEqual(area().curve(curveCardinal)([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
});

it("area.curve(curveCardinal.tension(tension)) uses the specified tension", () => {
  assertPathEqual(area().curve(curveCardinal.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1C0,1,0.833333,3,1,3C1.166667,3,1.833333,1,2,1C2.166667,1,3,3,3,3L3,0C3,0,2.166667,0,2,0C1.833333,0,1.166667,0,1,0C0.833333,0,0,0,0,0Z");
});

it("area.curve(curveCardinal.tension(tension)) coerces the specified tension to a number", () => {
  const a = area().curve(curveCardinal.tension("0.5"));
  assert.strictEqual(area().curve(curveCardinal.tension(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), a([[0, 1], [1, 3], [2, 1], [3, 3]]));
});
