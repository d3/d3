import assert from "assert";
import {line, curveBundle} from "../../src/index.js";
import {assertPathEqual} from "../asserts.js";

it("line.curve(curveBundle) uses a default beta of 0.85", () => {
  const l = line().curve(curveBundle.beta(0.85));
  assert.strictEqual(line().curve(curveBundle)([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
});

it("line.curve(curveBundle.beta(beta)) uses the specified beta", () => {
  assertPathEqual(line().curve(curveBundle.beta(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), "M0,1L0.166667,1.222222C0.333333,1.444444,0.666667,1.888889,1,2C1.333333,2.111111,1.666667,1.888889,2,2C2.333333,2.111111,2.666667,2.555556,2.833333,2.777778L3,3");
});

it("line.curve(curveBundle.beta(beta)) coerces the specified beta to a number", () => {
  const l = line().curve(curveBundle.beta("0.5"));
  assert.strictEqual(line().curve(curveBundle.beta(0.5))([[0, 1], [1, 3], [2, 1], [3, 3]]), l([[0, 1], [1, 3], [2, 1], [3, 3]]));
});
