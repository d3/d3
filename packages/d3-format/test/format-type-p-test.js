import assert from "assert";
import {format} from "../src/index.js";

it("format(\"p\") can output a percentage", () => {
  const f = format("p");
  assert.strictEqual(f(.00123), "0.123000%");
  assert.strictEqual(f(.0123), "1.23000%");
  assert.strictEqual(f(.123), "12.3000%");
  assert.strictEqual(f(.234), "23.4000%");
  assert.strictEqual(f(1.23), "123.000%");
  assert.strictEqual(f(-.00123), "−0.123000%");
  assert.strictEqual(f(-.0123), "−1.23000%");
  assert.strictEqual(f(-.123), "−12.3000%");
  assert.strictEqual(f(-1.23), "−123.000%");
});

it("format(\"+p\") can output a percentage with rounding and sign", () => {
  const f = format("+.2p");
  assert.strictEqual(f(.00123), "+0.12%");
  assert.strictEqual(f(.0123), "+1.2%");
  assert.strictEqual(f(.123), "+12%");
  assert.strictEqual(f(1.23), "+120%");
  assert.strictEqual(f(-.00123), "−0.12%");
  assert.strictEqual(f(-.0123), "−1.2%");
  assert.strictEqual(f(-.123), "−12%");
  assert.strictEqual(f(-1.23), "−120%");
});
