import assert from "assert";
import {line, curveLinearClosed} from "../../src/index.js";
import {assertPathEqual} from "../asserts.js";

it("line.curve(curveLinearClosed)(data) generates the expected path", () => {
  const l = line().curve(curveLinearClosed);
  assert.strictEqual(l([]), null);
  assertPathEqual(l([[0, 1]]), "M0,1Z");
  assertPathEqual(l([[0, 1], [2, 3]]), "M0,1L2,3Z");
  assertPathEqual(l([[0, 1], [2, 3], [4, 5]]), "M0,1L2,3L4,5Z");
});
