import assert from "assert";
import {isoParse} from "../src/index.js";
import {utc} from "./date.js";

it("isoParse as ISO 8601", () => {
  assert.deepStrictEqual(isoParse("1990-01-01T00:00:00.000Z"), utc(1990, 0, 1, 0, 0, 0));
  assert.deepStrictEqual(isoParse("2011-12-31T23:59:59.000Z"), utc(2011, 11, 31, 23, 59, 59));
  assert.strictEqual(isoParse("1990-01-01T00:00:00.000X"), null);
});
