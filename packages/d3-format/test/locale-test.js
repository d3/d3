import assert from "assert";
import {readdirSync, readFileSync} from "fs";
import {join} from "path";
import {formatLocale} from "../src/index.js";

function locale(locale) {
  return formatLocale(JSON.parse(readFileSync(`./locale/${locale}.json`, "utf8")));
}

it("formatLocale({decimal: decimal}) observes the specified decimal point", () => {
  assert.strictEqual(formatLocale({decimal: "|"}).format("06.2f")(2), "002|00");
  assert.strictEqual(formatLocale({decimal: "/"}).format("06.2f")(2), "002/00");
});

it("formatLocale({currency: [prefix, suffix]}) observes the specified currency prefix and suffix", () => {
  assert.strictEqual(formatLocale({decimal: ".", currency: ["฿", ""]}).format("$06.2f")(2), "฿02.00");
  assert.strictEqual(formatLocale({decimal: ".", currency: ["", "฿"]}).format("$06.2f")(2), "02.00฿");
});

it("formatLocale({currency: [prefix, suffix]}) places the currency suffix after the SI suffix", () => {
  assert.strictEqual(formatLocale({decimal: ",", currency: ["", " €"]}).format("$.3s")(1.2e9), "1,20G €");
});

it("formatLocale({grouping: undefined}) does not perform any grouping", () => {
  assert.strictEqual(formatLocale({decimal: "."}).format("012,.2f")(2), "000000002.00");
});

it("formatLocale({grouping: [sizes…]}) observes the specified group sizes", () => {
  assert.strictEqual(formatLocale({decimal: ".", grouping: [3], thousands: ","}).format("012,.2f")(2), "0,000,002.00");
  assert.strictEqual(formatLocale({decimal: ".", grouping: [2], thousands: ","}).format("012,.2f")(2), "0,00,00,02.00");
  assert.strictEqual(formatLocale({decimal: ".", grouping: [2, 3], thousands: ","}).format("012,.2f")(2), "00,000,02.00");
  assert.strictEqual(formatLocale({decimal: ".", grouping: [3, 2, 2, 2, 2, 2, 2], thousands: ","}).format(",d")(1e12), "10,00,00,00,00,000");
});

it("formatLocale(…) can format numbers using the Indian numbering system.", () => {
  const format = locale("en-IN").format(",");
  assert.strictEqual(format(10), "10");
  assert.strictEqual(format(100), "100");
  assert.strictEqual(format(1000), "1,000");
  assert.strictEqual(format(10000), "10,000");
  assert.strictEqual(format(100000), "1,00,000");
  assert.strictEqual(format(1000000), "10,00,000");
  assert.strictEqual(format(10000000), "1,00,00,000");
  assert.strictEqual(format(10000000.4543), "1,00,00,000.4543");
  assert.strictEqual(format(1000.321), "1,000.321");
  assert.strictEqual(format(10.5), "10.5");
  assert.strictEqual(format(-10), "−10");
  assert.strictEqual(format(-100), "−100");
  assert.strictEqual(format(-1000), "−1,000");
  assert.strictEqual(format(-10000), "−10,000");
  assert.strictEqual(format(-100000), "−1,00,000");
  assert.strictEqual(format(-1000000), "−10,00,000");
  assert.strictEqual(format(-10000000), "−1,00,00,000");
  assert.strictEqual(format(-10000000.4543), "−1,00,00,000.4543");
  assert.strictEqual(format(-1000.321), "−1,000.321");
  assert.strictEqual(format(-10.5), "−10.5");
});

it("formatLocale({thousands: separator}) observes the specified group separator", () => {
  assert.strictEqual(formatLocale({decimal: ".", grouping: [3], thousands: " "}).format("012,.2f")(2), "0 000 002.00");
  assert.strictEqual(formatLocale({decimal: ".", grouping: [3], thousands: "/"}).format("012,.2f")(2), "0/000/002.00");
});

it("formatLocale({percent: percent}) observes the specified percent sign", () => {
  assert.strictEqual(formatLocale({decimal: ".", percent: "!"}).format("06.2%")(2), "200.00!");
  assert.strictEqual(formatLocale({decimal: ".", percent: "﹪"}).format("06.2%")(2), "200.00﹪");
});

it("formatLocale({minus: minus}) observes the specified minus sign", () => {
  assert.strictEqual(formatLocale({decimal: ".", minus: "-"}).format("06.2f")(-2), "-02.00");
  assert.strictEqual(formatLocale({decimal: ".", minus: "−"}).format("06.2f")(-2), "−02.00");
  assert.strictEqual(formatLocale({decimal: ".", minus: "➖"}).format("06.2f")(-2), "➖02.00");
  assert.strictEqual(formatLocale({decimal: "."}).format("06.2f")(-2), "−02.00");
});

it("formatLocale({nan: nan}) observes the specified not-a-number representation", () => {
  assert.strictEqual(formatLocale({nan: "N/A"}).format("6.2f")(undefined), "   N/A");
  assert.strictEqual(formatLocale({nan: "-"}).format("<6.2g")(undefined), "-     ");
  assert.strictEqual(formatLocale({}).format(" 6.2f")(undefined), "   NaN");
});

it("locale data is valid", async () => {
  for (const file of readdirSync("locale")) {
    if (!/\.json$/i.test(file)) continue;
    const locale = JSON.parse(readFileSync(join("locale", file), "utf8"));
    assert.strictEqual("currency" in locale, true);
    assert.strictEqual("decimal" in locale, true);
    assert.strictEqual("grouping" in locale, true);
    assert.strictEqual("thousands" in locale, true);
    formatLocale(locale);
  }
});
