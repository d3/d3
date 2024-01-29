import assert from "assert";
import {format} from "../src/index.js";

it("format(\"~r\") trims insignificant zeros", () => {
  const f = format("~r");
  assert.strictEqual(f(1), "1");
  assert.strictEqual(f(0.1), "0.1");
  assert.strictEqual(f(0.01), "0.01");
  assert.strictEqual(f(10.0001), "10.0001");
  assert.strictEqual(f(123.45), "123.45");
  assert.strictEqual(f(123.456), "123.456");
  assert.strictEqual(f(123.4567), "123.457");
  assert.strictEqual(f(0.000009), "0.000009");
  assert.strictEqual(f(0.0000009), "0.0000009");
  assert.strictEqual(f(0.00000009), "0.00000009");
  assert.strictEqual(f(0.111119), "0.111119");
  assert.strictEqual(f(0.1111119), "0.111112");
  assert.strictEqual(f(0.11111119), "0.111111");
});

it("format(\"~e\") trims insignificant zeros", () => {
  const f = format("~e");
  assert.strictEqual(f(0), "0e+0");
  assert.strictEqual(f(42), "4.2e+1");
  assert.strictEqual(f(42000000), "4.2e+7");
  assert.strictEqual(f(0.042), "4.2e-2");
  assert.strictEqual(f(-4), "−4e+0");
  assert.strictEqual(f(-42), "−4.2e+1");
  assert.strictEqual(f(42000000000), "4.2e+10");
  assert.strictEqual(f(0.00000000042), "4.2e-10");
});

it("format(\".4~e\") trims insignificant zeros", () => {
  const f = format(".4~e");
  assert.strictEqual(f(0.00000000012345), "1.2345e-10");
  assert.strictEqual(f(0.00000000012340), "1.234e-10");
  assert.strictEqual(f(0.00000000012300), "1.23e-10");
  assert.strictEqual(f(-0.00000000012345), "−1.2345e-10");
  assert.strictEqual(f(-0.00000000012340), "−1.234e-10");
  assert.strictEqual(f(-0.00000000012300), "−1.23e-10");
  assert.strictEqual(f(12345000000), "1.2345e+10");
  assert.strictEqual(f(12340000000), "1.234e+10");
  assert.strictEqual(f(12300000000), "1.23e+10");
  assert.strictEqual(f(-12345000000), "−1.2345e+10");
  assert.strictEqual(f(-12340000000), "−1.234e+10");
  assert.strictEqual(f(-12300000000), "−1.23e+10");
});

it("format(\"~s\") trims insignificant zeros", () => {
  const f = format("~s");
  assert.strictEqual(f(0), "0");
  assert.strictEqual(f(1), "1");
  assert.strictEqual(f(10), "10");
  assert.strictEqual(f(100), "100");
  assert.strictEqual(f(999.5), "999.5");
  assert.strictEqual(f(999500), "999.5k");
  assert.strictEqual(f(1000), "1k");
  assert.strictEqual(f(1400), "1.4k");
  assert.strictEqual(f(1500), "1.5k");
  assert.strictEqual(f(1500.5), "1.5005k");
  assert.strictEqual(f(1e-15), "1f");
  assert.strictEqual(f(1e-12), "1p");
  assert.strictEqual(f(1e-9), "1n");
  assert.strictEqual(f(1e-6), "1µ");
  assert.strictEqual(f(1e-3), "1m");
  assert.strictEqual(f(1e0), "1");
  assert.strictEqual(f(1e3), "1k");
  assert.strictEqual(f(1e6), "1M");
  assert.strictEqual(f(1e9), "1G");
  assert.strictEqual(f(1e12), "1T");
  assert.strictEqual(f(1e15), "1P");
});

it("format(\"~%\") trims insignificant zeros", () => {
  const f = format("~%");
  assert.strictEqual(f(0), "0%");
  assert.strictEqual(f(0.1), "10%");
  assert.strictEqual(f(0.01), "1%");
  assert.strictEqual(f(0.001), "0.1%");
  assert.strictEqual(f(0.0001), "0.01%");
});

it("trimming respects commas", () => {
  const f = format(",~g");
  assert.strictEqual(f(10000.0), "10,000");
  assert.strictEqual(f(10000.1), "10,000.1");
});
