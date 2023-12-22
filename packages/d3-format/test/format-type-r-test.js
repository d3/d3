import assert from "assert";
import {format} from "../src/index.js";

it("format(\"r\") can round to significant digits", () => {
  assert.strictEqual(format(".2r")(0), "0.0");
  assert.strictEqual(format(".1r")(0.049), "0.05");
  assert.strictEqual(format(".1r")(-0.049), "−0.05");
  assert.strictEqual(format(".1r")(0.49), "0.5");
  assert.strictEqual(format(".1r")(-0.49), "−0.5");
  assert.strictEqual(format(".2r")(0.449), "0.45");
  assert.strictEqual(format(".3r")(0.4449), "0.445");
  assert.strictEqual(format(".3r")(1.00), "1.00");
  assert.strictEqual(format(".3r")(0.9995), "1.00");
  assert.strictEqual(format(".5r")(0.444449), "0.44445");
  assert.strictEqual(format("r")(123.45), "123.450");
  assert.strictEqual(format(".1r")(123.45), "100");
  assert.strictEqual(format(".2r")(123.45), "120");
  assert.strictEqual(format(".3r")(123.45), "123");
  assert.strictEqual(format(".4r")(123.45), "123.5");
  assert.strictEqual(format(".5r")(123.45), "123.45");
  assert.strictEqual(format(".6r")(123.45), "123.450");
  assert.strictEqual(format(".1r")(.9), "0.9");
  assert.strictEqual(format(".1r")(.09), "0.09");
  assert.strictEqual(format(".1r")(.949), "0.9");
  assert.strictEqual(format(".1r")(.0949), "0.09");
  assert.strictEqual(format(".1r")(.0000000129), "0.00000001");
  assert.strictEqual(format(".2r")(.0000000129), "0.000000013");
  assert.strictEqual(format(".2r")(.00000000129), "0.0000000013");
  assert.strictEqual(format(".3r")(.00000000129), "0.00000000129");
  assert.strictEqual(format(".4r")(.00000000129), "0.000000001290");
  assert.strictEqual(format(".10r")(.9999999999), "0.9999999999");
  assert.strictEqual(format(".15r")(.999999999999999), "0.999999999999999");
});

it("format(\"r\") can round very small numbers", () => {
  const f = format(".2r");
  assert.strictEqual(f(1e-22), "0.00000000000000000000010");
});
