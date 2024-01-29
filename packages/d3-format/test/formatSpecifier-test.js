import assert from "assert";
import {format, formatSpecifier, FormatSpecifier} from "../src/index.js";

it("formatSpecifier(specifier) throws an error for invalid formats", () => {
  assert.throws(() => { formatSpecifier("foo"); }, /invalid format: foo/);
  assert.throws(() => { formatSpecifier(".-2s"); }, /invalid format: \.-2s/);
  assert.throws(() => { formatSpecifier(".f"); }, /invalid format: \.f/);
});

it("formatSpecifier(specifier) returns an instanceof formatSpecifier", () => {
  const s = formatSpecifier("");
  assert.strictEqual(s instanceof formatSpecifier, true);
});

it("formatSpecifier(\"\") has the expected defaults", () => {
  const s = formatSpecifier("");
  assert.strictEqual(s.fill, " ");
  assert.strictEqual(s.align, ">");
  assert.strictEqual(s.sign, "-");
  assert.strictEqual(s.symbol, "");
  assert.strictEqual(s.zero, false);
  assert.strictEqual(s.width, undefined);
  assert.strictEqual(s.comma, false);
  assert.strictEqual(s.precision, undefined);
  assert.strictEqual(s.trim, false);
  assert.strictEqual(s.type, "");
});

it("formatSpecifier(specifier) preserves unknown types", () => {
  const s = formatSpecifier("q");
  assert.strictEqual(s.trim, false);
  assert.strictEqual(s.type, "q");
});

it("formatSpecifier(specifier) preserves shorthand", () => {
  const s = formatSpecifier("");
  assert.strictEqual(s.trim, false);
  assert.strictEqual(s.type, "");
});

it("formatSpecifier(specifier).toString() reflects current field values", () => {
  const s = formatSpecifier("");
  assert.strictEqual((s.fill = "_", s) + "", "_>-");
  assert.strictEqual((s.align = "^", s) + "", "_^-");
  assert.strictEqual((s.sign = "+", s) + "", "_^+");
  assert.strictEqual((s.symbol = "$", s) + "", "_^+$");
  assert.strictEqual((s.zero = true, s) + "", "_^+$0");
  assert.strictEqual((s.width = 12, s) + "", "_^+$012");
  assert.strictEqual((s.comma = true, s) + "", "_^+$012,");
  assert.strictEqual((s.precision = 2, s) + "", "_^+$012,.2");
  assert.strictEqual((s.type = "f", s) + "", "_^+$012,.2f");
  assert.strictEqual((s.trim = true, s) + "", "_^+$012,.2~f");
  assert.strictEqual(format(s)(42), "+$0,000,000,042");
});

it("formatSpecifier(specifier).toString() clamps precision to zero", () => {
  const s = formatSpecifier("");
  assert.strictEqual((s.precision = -1, s) + "", " >-.0");
});

it("formatSpecifier(specifier).toString() clamps width to one", () => {
  const s = formatSpecifier("");
  assert.strictEqual((s.width = -1, s) + "", " >-1");
});

it("new FormatSpecifier({}) has the expected defaults", () => {
  const s = new FormatSpecifier({});
  assert.strictEqual(s.fill, " ");
  assert.strictEqual(s.align, ">");
  assert.strictEqual(s.sign, "-");
  assert.strictEqual(s.symbol, "");
  assert.strictEqual(s.zero, false);
  assert.strictEqual(s.width, undefined);
  assert.strictEqual(s.comma, false);
  assert.strictEqual(s.precision, undefined);
  assert.strictEqual(s.trim, false);
  assert.strictEqual(s.type, "");
});

it("new FormatSpecifier({…}) coerces all inputs to the expected types", () => {
  const s = new FormatSpecifier({
    fill: 1,
    align: 2,
    sign: 3,
    symbol: 4,
    zero: 5,
    width: 6,
    comma: 7,
    precision: 8,
    trim: 9,
    type: 10
  });
  assert.strictEqual(s.fill, "1");
  assert.strictEqual(s.align, "2");
  assert.strictEqual(s.sign, "3");
  assert.strictEqual(s.symbol, "4");
  assert.strictEqual(s.zero, true);
  assert.strictEqual(s.width, 6);
  assert.strictEqual(s.comma, true);
  assert.strictEqual(s.precision, 8);
  assert.strictEqual(s.trim, true);
  assert.strictEqual(s.type, "10");
});
