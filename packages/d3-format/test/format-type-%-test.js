import assert from "assert";
import {format} from "../src/index.js";

it("format(\"%\") can output a whole percentage", () => {
  const f = format(".0%");
  assert.strictEqual(f(0), "0%");
  assert.strictEqual(f(0.042), "4%");
  assert.strictEqual(f(0.42), "42%");
  assert.strictEqual(f(4.2), "420%");
  assert.strictEqual(f(-.042), "−4%");
  assert.strictEqual(f(-.42), "−42%");
  assert.strictEqual(f(-4.2), "−420%");
});

it("format(\".%\") can output a percentage with precision", () => {
  const f1 = format(".1%");
  assert.strictEqual(f1(0.234), "23.4%");
  const f2 = format(".2%");
  assert.strictEqual(f2(0.234), "23.40%");
});

it("format(\"%\") fill respects suffix", () => {
  assert.strictEqual(format("020.0%")(42), "0000000000000004200%");
  assert.strictEqual(format("20.0%")(42), "               4200%");
});

it("format(\"^%\") align center puts suffix adjacent to number", () => {
  assert.strictEqual(format("^21.0%")(0.42),    "         42%         ");
  assert.strictEqual(format("^21,.0%")(422),   "       42,200%       ");
  assert.strictEqual(format("^21,.0%")(-422),  "      −42,200%       ");
});
