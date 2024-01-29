import assert from "assert";
import {format, formatPrefix, formatDefaultLocale} from "../src/index.js";

const enUs = {
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
};

const frFr = {
  decimal: ",",
  thousands: ".",
  grouping: [3],
  currency: ["", "\u00a0€"],
  percent: "\u202f%"
};

it("formatDefaultLocale(definition) returns the new default locale", () => {
  const locale = formatDefaultLocale(frFr);
  try {
    assert.strictEqual(locale.format("$,.2f")(12345678.90), "12.345.678,90 €");
    assert.strictEqual(locale.format(",.0%")(12345678.90), "1.234.567.890\u202f%");
  } finally {
    formatDefaultLocale(enUs);
  }
});

it("formatDefaultLocale(definition) affects format", () => {
  const locale = formatDefaultLocale(frFr);
  try {
    assert.strictEqual(format, locale.format);
    assert.strictEqual(format("$,.2f")(12345678.90), "12.345.678,90 €");
  } finally {
    formatDefaultLocale(enUs);
  }
});

it("formatDefaultLocale(definition) affects formatPrefix", () => {
  const locale = formatDefaultLocale(frFr);
  try {
    assert.strictEqual(formatPrefix, locale.formatPrefix);
    assert.strictEqual(formatPrefix(",.2", 1e3)(12345678.90), "12.345,68k");
  } finally {
    formatDefaultLocale(enUs);
  }
});
