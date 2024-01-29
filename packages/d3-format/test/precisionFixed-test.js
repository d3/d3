import assert from "assert";
import {precisionFixed} from "../src/index.js";

it("precisionFixed(number) returns the expected value", () => {
  assert.strictEqual(precisionFixed(8.9), 0);
  assert.strictEqual(precisionFixed(1.1), 0);
  assert.strictEqual(precisionFixed(0.89), 1);
  assert.strictEqual(precisionFixed(0.11), 1);
  assert.strictEqual(precisionFixed(0.089), 2);
  assert.strictEqual(precisionFixed(0.011), 2);
});
