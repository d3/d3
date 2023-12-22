import assert from "assert";
import {precisionRound} from "../src/index.js";

it("precisionRound(step, max) returns the expected value", () => {
  assert.strictEqual(precisionRound(0.1, 1.1), 2); // "1.0", "1.1"
  assert.strictEqual(precisionRound(0.01, 0.99), 2); // "0.98", "0.99"
  assert.strictEqual(precisionRound(0.01, 1.00), 2); // "0.99", "1.0"
  assert.strictEqual(precisionRound(0.01, 1.01), 3); // "1.00", "1.01"
});
