import assert from "assert";
import {format} from "../src/index.js";

it("format(\"s\") outputs SI-prefix notation with default precision 6", () => {
  const f = format("s");
  assert.strictEqual(f(0), "0.00000");
  assert.strictEqual(f(1), "1.00000");
  assert.strictEqual(f(10), "10.0000");
  assert.strictEqual(f(100), "100.000");
  assert.strictEqual(f(999.5), "999.500");
  assert.strictEqual(f(999500), "999.500k");
  assert.strictEqual(f(1000), "1.00000k");
  assert.strictEqual(f(100), "100.000");
  assert.strictEqual(f(1400), "1.40000k");
  assert.strictEqual(f(1500.5), "1.50050k");
  assert.strictEqual(f(.00001), "10.0000µ");
  assert.strictEqual(f(.000001), "1.00000µ");
});

it("format(\"[.precision]s\") outputs SI-prefix notation with precision significant digits", () => {
  const f1 = format(".3s");
  assert.strictEqual(f1(0), "0.00");
  assert.strictEqual(f1(1), "1.00");
  assert.strictEqual(f1(10), "10.0");
  assert.strictEqual(f1(100), "100");
  assert.strictEqual(f1(999.5), "1.00k");
  assert.strictEqual(f1(999500), "1.00M");
  assert.strictEqual(f1(1000), "1.00k");
  assert.strictEqual(f1(1500.5), "1.50k");
  assert.strictEqual(f1(145500000), "146M");
  assert.strictEqual(f1(145999999.99999347), "146M");
  assert.strictEqual(f1(1e26), "100Y");
  assert.strictEqual(f1(.000001), "1.00µ");
  assert.strictEqual(f1(.009995), "10.0m");
  const f2 = format(".4s");
  assert.strictEqual(f2(999.5), "999.5");
  assert.strictEqual(f2(999500), "999.5k");
  assert.strictEqual(f2(.009995), "9.995m");
});

it("format(\"s\") formats numbers smaller than 1e-24 with yocto", () => {
  const f = format(".8s");
  assert.strictEqual(f(1.29e-30), "0.0000013y"); // Note: rounded!
  assert.strictEqual(f(1.29e-29), "0.0000129y");
  assert.strictEqual(f(1.29e-28), "0.0001290y");
  assert.strictEqual(f(1.29e-27), "0.0012900y");
  assert.strictEqual(f(1.29e-26), "0.0129000y");
  assert.strictEqual(f(1.29e-25), "0.1290000y");
  assert.strictEqual(f(1.29e-24), "1.2900000y");
  assert.strictEqual(f(1.29e-23), "12.900000y");
  assert.strictEqual(f(1.29e-22), "129.00000y");
  assert.strictEqual(f(1.29e-21), "1.2900000z");
  assert.strictEqual(f(-1.29e-30), "−0.0000013y"); // Note: rounded!
  assert.strictEqual(f(-1.29e-29), "−0.0000129y");
  assert.strictEqual(f(-1.29e-28), "−0.0001290y");
  assert.strictEqual(f(-1.29e-27), "−0.0012900y");
  assert.strictEqual(f(-1.29e-26), "−0.0129000y");
  assert.strictEqual(f(-1.29e-25), "−0.1290000y");
  assert.strictEqual(f(-1.29e-24), "−1.2900000y");
  assert.strictEqual(f(-1.29e-23), "−12.900000y");
  assert.strictEqual(f(-1.29e-22), "−129.00000y");
  assert.strictEqual(f(-1.29e-21), "−1.2900000z");
});

it("format(\"s\") formats numbers larger than 1e24 with yotta", () => {
  const f = format(".8s");
  assert.strictEqual(f(1.23e+21), "1.2300000Z");
  assert.strictEqual(f(1.23e+22), "12.300000Z");
  assert.strictEqual(f(1.23e+23), "123.00000Z");
  assert.strictEqual(f(1.23e+24), "1.2300000Y");
  assert.strictEqual(f(1.23e+25), "12.300000Y");
  assert.strictEqual(f(1.23e+26), "123.00000Y");
  assert.strictEqual(f(1.23e+27), "1230.0000Y");
  assert.strictEqual(f(1.23e+28), "12300.000Y");
  assert.strictEqual(f(1.23e+29), "123000.00Y");
  assert.strictEqual(f(1.23e+30), "1230000.0Y");
  assert.strictEqual(f(-1.23e+21), "−1.2300000Z");
  assert.strictEqual(f(-1.23e+22), "−12.300000Z");
  assert.strictEqual(f(-1.23e+23), "−123.00000Z");
  assert.strictEqual(f(-1.23e+24), "−1.2300000Y");
  assert.strictEqual(f(-1.23e+25), "−12.300000Y");
  assert.strictEqual(f(-1.23e+26), "−123.00000Y");
  assert.strictEqual(f(-1.23e+27), "−1230.0000Y");
  assert.strictEqual(f(-1.23e+28), "−12300.000Y");
  assert.strictEqual(f(-1.23e+29), "−123000.00Y");
  assert.strictEqual(f(-1.23e+30), "−1230000.0Y");
});

it("format(\"$s\") outputs SI-prefix notation with a currency symbol", () => {
  const f1 = format("$.2s");
  assert.strictEqual(f1(0), "$0.0");
  assert.strictEqual(f1(2.5e5), "$250k");
  assert.strictEqual(f1(-2.5e8), "−$250M");
  assert.strictEqual(f1(2.5e11), "$250G");
  const f2 = format("$.3s");
  assert.strictEqual(f2(0), "$0.00");
  assert.strictEqual(f2(1), "$1.00");
  assert.strictEqual(f2(10), "$10.0");
  assert.strictEqual(f2(100), "$100");
  assert.strictEqual(f2(999.5), "$1.00k");
  assert.strictEqual(f2(999500), "$1.00M");
  assert.strictEqual(f2(1000), "$1.00k");
  assert.strictEqual(f2(1500.5), "$1.50k");
  assert.strictEqual(f2(145500000), "$146M");
  assert.strictEqual(f2(145999999.9999347), "$146M");
  assert.strictEqual(f2(1e26), "$100Y");
  assert.strictEqual(f2(.000001), "$1.00µ");
  assert.strictEqual(f2(.009995), "$10.0m");
  const f3 = format("$.4s");
  assert.strictEqual(f3(999.5), "$999.5");
  assert.strictEqual(f3(999500), "$999.5k");
  assert.strictEqual(f3(.009995), "$9.995m");
});

it("format(\"s\") SI-prefix notation precision is consistent for small and large numbers", () => {
  const f1 = format(".0s");
  assert.strictEqual(f1(1e-5), "10µ");
  assert.strictEqual(f1(1e-4), "100µ");
  assert.strictEqual(f1(1e-3), "1m");
  assert.strictEqual(f1(1e-2), "10m");
  assert.strictEqual(f1(1e-1), "100m");
  assert.strictEqual(f1(1e+0), "1");
  assert.strictEqual(f1(1e+1), "10");
  assert.strictEqual(f1(1e+2), "100");
  assert.strictEqual(f1(1e+3), "1k");
  assert.strictEqual(f1(1e+4), "10k");
  assert.strictEqual(f1(1e+5), "100k");
  const f2 = format(".4s");
  assert.strictEqual(f2(1e-5), "10.00µ");
  assert.strictEqual(f2(1e-4), "100.0µ");
  assert.strictEqual(f2(1e-3), "1.000m");
  assert.strictEqual(f2(1e-2), "10.00m");
  assert.strictEqual(f2(1e-1), "100.0m");
  assert.strictEqual(f2(1e+0), "1.000");
  assert.strictEqual(f2(1e+1), "10.00");
  assert.strictEqual(f2(1e+2), "100.0");
  assert.strictEqual(f2(1e+3), "1.000k");
  assert.strictEqual(f2(1e+4), "10.00k");
  assert.strictEqual(f2(1e+5), "100.0k");
});

it("format(\"0[width],s\") will group thousands due to zero fill", () => {
  const f = format("020,s");
  assert.strictEqual(f(42),    "000,000,000,042.0000");
  assert.strictEqual(f(42e12), "00,000,000,042.0000T");
});

it("format(\",s\") will group thousands for very large numbers", () => {
  const f = format(",s");
  assert.strictEqual(f(42e30), "42,000,000Y");
});
