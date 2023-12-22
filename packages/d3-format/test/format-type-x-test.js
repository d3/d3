import assert from "assert";
import {format} from "../src/index.js";

it("format(\"x\") returns the expected hexadecimal (lowercase) string", () => {
  assert.strictEqual(format("x")(0xdeadbeef), "deadbeef");
});

it("format(\"#x\") returns the expected hexadecimal (lowercase) string with prefix", () => {
  assert.strictEqual(format("#x")(0xdeadbeef), "0xdeadbeef");
});

it("format(\",x\") groups thousands", () => {
  assert.strictEqual(format(",x")(0xdeadbeef), "de,adb,eef");
});

it("format(\",x\") groups thousands", () => {
  assert.strictEqual(format(",x")(0xdeadbeef), "de,adb,eef");
});

it("format(\"#,x\") does not group the prefix", () => {
  assert.strictEqual(format("#,x")(0xadeadbeef), "0xade,adb,eef");
});

it("format(\"+#x\") puts the sign before the prefix", () => {
  assert.strictEqual(format("+#x")(0xdeadbeef),  "+0xdeadbeef");
  assert.strictEqual(format("+#x")(-0xdeadbeef), "−0xdeadbeef");
  assert.strictEqual(format(" #x")(0xdeadbeef),  " 0xdeadbeef");
  assert.strictEqual(format(" #x")(-0xdeadbeef), "−0xdeadbeef");
});

it("format(\"$,x\") formats hexadecimal currency", () => {
  assert.strictEqual(format("$,x")(0xdeadbeef), "$de,adb,eef");
});

it("format(\"[.precision]x\") always has precision zero", () => {
  assert.strictEqual(format(".2x")(0xdeadbeef), "deadbeef");
  assert.strictEqual(format(".2x")(-4.2), "−4");
});

it("format(\"x\") rounds non-integers", () => {
  assert.strictEqual(format("x")(2.4), "2");
});

it("format(\"x\") can format negative zero as zero", () => {
  assert.strictEqual(format("x")(-0), "0");
  assert.strictEqual(format("x")(-1e-12), "0");
});

it("format(\"x\") does not consider -0xeee to be positive", () => {
  assert.strictEqual(format("x")(-0xeee), "−eee");
});

it("format(\"X\") returns the expected hexadecimal (uppercase) string", () => {
  assert.strictEqual(format("X")(0xdeadbeef), "DEADBEEF");
});

it("format(\"#X\") returns the expected hexadecimal (uppercase) string with prefix", () => {
  assert.strictEqual(format("#X")(0xdeadbeef), "0xDEADBEEF");
});

it("format(\"X\") can format negative zero as zero", () => {
  assert.strictEqual(format("X")(-0), "0");
  assert.strictEqual(format("X")(-1e-12), "0");
});

it("format(\"X\") does not consider -0xeee to be positive", () => {
  assert.strictEqual(format("X")(-0xeee), "−EEE");
});

it("format(\"#[width]x\") considers the prefix", () => {
  assert.strictEqual(format("20x")(0xdeadbeef),   "            deadbeef");
  assert.strictEqual(format("#20x")(0xdeadbeef),  "          0xdeadbeef");
  assert.strictEqual(format("020x")(0xdeadbeef),  "000000000000deadbeef");
  assert.strictEqual(format("#020x")(0xdeadbeef), "0x0000000000deadbeef");
});
