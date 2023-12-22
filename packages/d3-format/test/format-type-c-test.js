import assert from "assert";
import {format, formatLocale} from "../src/index.js";

it("format(\"c\") unicode character", () => {
  assert.strictEqual(format("c")("☃"), "☃");
  assert.strictEqual(format("020c")("☃"),  "0000000000000000000☃");
  assert.strictEqual(format(" ^20c")("☃"), "         ☃          ");
  assert.strictEqual(format("$c")("☃"), "$☃");
});

it("format(\"c\") does not localize a decimal point", () => {
  assert.strictEqual(formatLocale({decimal: "/"}).format("c")("."), ".");
});
