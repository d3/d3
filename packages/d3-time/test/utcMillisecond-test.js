import assert from "assert";
import {timeMillisecond, utcMillisecond} from "../src/index.js";

it("utcMillisecond is an alias for timeMillisecond", () => {
  assert.strictEqual(utcMillisecond, timeMillisecond);
});
