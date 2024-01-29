import assert from "assert";
import {isoFormat} from "../src/index.js";
import {utc} from "./date.js";

it("isoFormat(date) returns an ISO 8601 UTC string", () => {
  assert.strictEqual(isoFormat(utc(1990, 0, 1, 0, 0, 0)), "1990-01-01T00:00:00.000Z");
  assert.strictEqual(isoFormat(utc(2011, 11, 31, 23, 59, 59)), "2011-12-31T23:59:59.000Z");
});
