import assert from "assert";
import {hsl, rgb} from "d3-color";
import {interpolate, interpolateHsl} from "d3-interpolate";
import {format} from "d3-format";
import {scaleLog} from "../src/index.js";
import {assertInDelta} from "./asserts.js";

it("scaleLog() has the expected defaults", () => {
  const x = scaleLog();
  assert.deepStrictEqual(x.domain(), [1, 10]);
  assert.deepStrictEqual(x.range(), [0, 1]);
  assert.strictEqual(x.clamp(), false);
  assert.strictEqual(x.base(), 10);
  assert.strictEqual(x.interpolate(), interpolate);
  assert.deepStrictEqual(x.interpolate()({array: ["red"]}, {array: ["blue"]})(0.5), {array: ["rgb(128, 0, 128)"]});
  assertInDelta(x(5), 0.69897);
  assertInDelta(x.invert(0.69897), 5);
  assertInDelta(x(3.162278), 0.5);
  assertInDelta(x.invert(0.5), 3.162278);
});

it("log.domain(…) coerces values to numbers", () => {
  const x = scaleLog().domain([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
  assert.strictEqual(typeof x.domain()[0], "number");
  assert.strictEqual(typeof x.domain()[1], "number");
  assertInDelta(x(new Date(1989,  9, 20)), -0.2061048);
  assertInDelta(x(new Date(1990,  0,  1)),  0.0000000);
  assertInDelta(x(new Date(1990,  2, 15)),  0.2039385);
  assertInDelta(x(new Date(1990,  4, 27)),  0.4057544);
  assertInDelta(x(new Date(1991,  0,  1)),  1.0000000);
  assertInDelta(x(new Date(1991,  2, 15)),  1.1942797);
  x.domain(["1", "10"]);
  assert.strictEqual(typeof x.domain()[0], "number");
  assert.strictEqual(typeof x.domain()[1], "number");
  assertInDelta(x(5), 0.69897);
  x.domain([new Number(1), new Number(10)]);
  assert.strictEqual(typeof x.domain()[0], "number");
  assert.strictEqual(typeof x.domain()[1], "number");
  assertInDelta(x(5), 0.69897);
});

it("log.domain(…) can take negative values", () => {
  const x = scaleLog().domain([-100, -1]);
  assert.deepStrictEqual(x.ticks().map(x.tickFormat(Infinity)), [
    "−100",
    "−90", "−80", "−70", "−60", "−50", "−40", "−30", "−20", "−10",
    "−9", "−8", "−7", "−6", "−5", "−4", "−3", "−2", "−1"
  ]);
  assertInDelta(x(-50), 0.150515);
});

it("log.domain(…).range(…) can take more than two values", () => {
  const x = scaleLog().domain([0.1, 1, 100]).range(["red", "white", "green"]);
  assert.strictEqual(x(0.5), "rgb(255, 178, 178)");
  assert.strictEqual(x(50), "rgb(38, 147, 38)");
  assert.strictEqual(x(75), "rgb(16, 136, 16)");
});

it("log.domain(…) preserves specified domain exactly, with no floating point error", () => {
  const x = scaleLog().domain([0.1, 1000]);
  assert.deepStrictEqual(x.domain(), [0.1, 1000]);
});

it("log.ticks(…) returns exact ticks, with no floating point error", () => {
  assert.deepStrictEqual(scaleLog().domain([0.15, 0.68]).ticks(), [0.2, 0.3, 0.4, 0.5, 0.6]);
  assert.deepStrictEqual(scaleLog().domain([0.68, 0.15]).ticks(), [0.6, 0.5, 0.4, 0.3, 0.2]);
  assert.deepStrictEqual(scaleLog().domain([-0.15, -0.68]).ticks(), [-0.2, -0.3, -0.4, -0.5, -0.6]);
  assert.deepStrictEqual(scaleLog().domain([-0.68, -0.15]).ticks(), [-0.6, -0.5, -0.4, -0.3, -0.2]);
});

it("log.range(…) does not coerce values to numbers", () => {
  const x = scaleLog().range(["0", "2"]);
  assert.strictEqual(typeof x.range()[0], "string");
  assert.strictEqual(typeof x.range()[1], "string");
});

it("log.range(…) can take colors", () => {
  const x = scaleLog().range(["red", "blue"]);
  assert.strictEqual(x(5), "rgb(77, 0, 178)");
  x.range(["#ff0000", "#0000ff"]);
  assert.strictEqual(x(5), "rgb(77, 0, 178)");
  x.range(["#f00", "#00f"]);
  assert.strictEqual(x(5), "rgb(77, 0, 178)");
  x.range([rgb(255, 0, 0), hsl(240, 1, 0.5)]);
  assert.strictEqual(x(5), "rgb(77, 0, 178)");
  x.range(["hsl(0,100%,50%)", "hsl(240,100%,50%)"]);
  assert.strictEqual(x(5), "rgb(77, 0, 178)");
});

it("log.range(…) can take arrays or objects", () => {
  const x = scaleLog().range([{color: "red"}, {color: "blue"}]);
  assert.deepStrictEqual(x(5), {color: "rgb(77, 0, 178)"});
  x.range([["red"], ["blue"]]);
  assert.deepStrictEqual(x(5), ["rgb(77, 0, 178)"]);
});

it("log.interpolate(f) sets the interpolator", () => {
  const x = scaleLog().range(["red", "blue"]);
  assert.strictEqual(x.interpolate(), interpolate);
  assert.strictEqual(x(5), "rgb(77, 0, 178)");
  x.interpolate(interpolateHsl);
  assert.strictEqual(x(5), "rgb(154, 0, 255)");
});

it("log(x) does not clamp by default", () => {
  const x = scaleLog();
  assert.strictEqual(x.clamp(), false);
  assertInDelta(x(0.5), -0.3010299);
  assertInDelta(x(15), 1.1760913);
});

it("log.clamp(true)(x) clamps to the domain", () => {
  const x = scaleLog().clamp(true);
  assertInDelta(x(-1), 0);
  assertInDelta(x(5), 0.69897);
  assertInDelta(x(15), 1);
  x.domain([10, 1]);
  assertInDelta(x(-1), 1);
  assertInDelta(x(5), 0.30103);
  assertInDelta(x(15), 0);
});

it("log.clamp(true).invert(y) clamps to the range", () => {
  const x = scaleLog().clamp(true);
  assertInDelta(x.invert(-0.1), 1);
  assertInDelta(x.invert(0.69897), 5);
  assertInDelta(x.invert(1.5), 10);
  x.domain([10, 1]);
  assertInDelta(x.invert(-0.1), 10);
  assertInDelta(x.invert(0.30103), 5);
  assertInDelta(x.invert(1.5), 1);
});

it("log(x) maps a number x to a number y", () => {
  const x = scaleLog().domain([1, 2]);
  assertInDelta(x(0.5), -1.0000000);
  assertInDelta(x(1.0),  0.0000000);
  assertInDelta(x(1.5),  0.5849625);
  assertInDelta(x(2.0),  1.0000000);
  assertInDelta(x(2.5),  1.3219281);
});

it("log.invert(y) maps a number y to a number x", () => {
  const x = scaleLog().domain([1, 2]);
  assertInDelta(x.invert(-1.0000000), 0.5);
  assertInDelta(x.invert( 0.0000000), 1.0);
  assertInDelta(x.invert( 0.5849625), 1.5);
  assertInDelta(x.invert( 1.0000000), 2.0);
  assertInDelta(x.invert( 1.3219281), 2.5);
});

it("log.invert(y) coerces y to number", () => {
  const x = scaleLog().range(["0", "2"]);
  assertInDelta(x.invert("1"), 3.1622777);
  x.range([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
  assertInDelta(x.invert(new Date(1990, 6, 2, 13)), 3.1622777);
  x.range(["#000", "#fff"]);
  assert(Number.isNaN(x.invert("#999")));
});

it("log.base(b) sets the log base, changing the ticks", () => {
  const x = scaleLog().domain([1, 32]);
  assert.deepStrictEqual(x.base(2).ticks().map(x.tickFormat()), ["1", "2", "4", "8", "16", "32"]);
  assert.deepStrictEqual(x.base(Math.E).ticks().map(x.tickFormat()), ["1", "2.71828182846", "7.38905609893", "20.0855369232"]);
});

it("log.nice() nices the domain, extending it to powers of ten", () => {
  const x = scaleLog().domain([1.1, 10.9]).nice();
  assert.deepStrictEqual(x.domain(), [1, 100]);
  x.domain([10.9, 1.1]).nice();
  assert.deepStrictEqual(x.domain(), [100, 1]);
  x.domain([0.7, 11.001]).nice();
  assert.deepStrictEqual(x.domain(), [0.1, 100]);
  x.domain([123.1, 6.7]).nice();
  assert.deepStrictEqual(x.domain(), [1000, 1]);
  x.domain([0.01, 0.49]).nice();
  assert.deepStrictEqual(x.domain(), [0.01, 1]);
  x.domain([1.5, 50]).nice();
  assert.deepStrictEqual(x.domain(), [1, 100]);
  assertInDelta(x(1), 0);
  assertInDelta(x(100), 1);
});

it("log.nice() works on degenerate domains", () => {
  const x = scaleLog().domain([0, 0]).nice();
  assert.deepStrictEqual(x.domain(), [0, 0]);
  x.domain([0.5, 0.5]).nice();
  assert.deepStrictEqual(x.domain(), [0.1, 1]);
});

it("log.nice() on a polylog domain only affects the extent", () => {
  const x = scaleLog().domain([1.1, 1.5, 10.9]).nice();
  assert.deepStrictEqual(x.domain(), [1, 1.5, 100]);
  x.domain([-123.1, -1.5, -0.5]).nice();
  assert.deepStrictEqual(x.domain(), [-1000, -1.5, -0.1]);
});

it("log.copy() isolates changes to the domain", () => {
  const x = scaleLog(), y = x.copy();
  x.domain([10, 100]);
  assert.deepStrictEqual(y.domain(), [1, 10]);
  assertInDelta(x(10), 0);
  assertInDelta(y(1), 0);
  y.domain([100, 1000]);
  assertInDelta(x(100), 1);
  assertInDelta(y(100), 0);
  assert.deepStrictEqual(x.domain(), [10, 100]);
  assert.deepStrictEqual(y.domain(), [100, 1000]);
});

it("log.copy() isolates changes to the domain via nice", () => {
  const x = scaleLog().domain([1.5, 50]), y = x.copy().nice();
  assert.deepStrictEqual(x.domain(), [1.5, 50]);
  assertInDelta(x(1.5), 0);
  assertInDelta(x(50), 1);
  assertInDelta(x.invert(0), 1.5);
  assertInDelta(x.invert(1), 50);
  assert.deepStrictEqual(y.domain(), [1, 100]);
  assertInDelta(y(1), 0);
  assertInDelta(y(100), 1);
  assertInDelta(y.invert(0), 1);
  assertInDelta(y.invert(1), 100);
});

it("log.copy() isolates changes to the range", () => {
  const x = scaleLog(), y = x.copy();
  x.range([1, 2]);
  assertInDelta(x.invert(1), 1);
  assertInDelta(y.invert(1), 10);
  assert.deepStrictEqual(y.range(), [0, 1]);
  y.range([2, 3]);
  assertInDelta(x.invert(2), 10);
  assertInDelta(y.invert(2), 1);
  assert.deepStrictEqual(x.range(), [1, 2]);
  assert.deepStrictEqual(y.range(), [2, 3]);
});

it("log.copy() isolates changes to the interpolator", () => {
  const x = scaleLog().range(["red", "blue"]), y = x.copy();
  x.interpolate(interpolateHsl);
  assert.strictEqual(x(5), "rgb(154, 0, 255)");
  assert.strictEqual(y(5), "rgb(77, 0, 178)");
  assert.strictEqual(y.interpolate(), interpolate);
});

it("log.copy() isolates changes to clamping", () => {
  const x = scaleLog().clamp(true), y = x.copy();
  x.clamp(false);
  assertInDelta(x(0.5), -0.30103);
  assertInDelta(y(0.5), 0);
  assert.strictEqual(y.clamp(), true);
  y.clamp(false);
  assertInDelta(x(20), 1.30103);
  assertInDelta(y(20), 1.30103);
  assert.strictEqual(x.clamp(), false);
});

it("log.ticks() generates the expected power-of-ten for ascending ticks", () => {
  const s = scaleLog();
  assert.deepStrictEqual(s.domain([1e-1, 1e1]).ticks().map(round), [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.deepStrictEqual(s.domain([1e-1, 1e0]).ticks().map(round), [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]);
  assert.deepStrictEqual(s.domain([-1e0, -1e-1]).ticks().map(round), [-1, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1]);
});


it("log.ticks() generates the expected power-of-ten ticks for descending domains", () => {
  const s = scaleLog();
  assert.deepStrictEqual(s.domain([-1e-1, -1e1]).ticks().map(round), [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1].reverse());
  assert.deepStrictEqual(s.domain([-1e-1, -1e0]).ticks().map(round), [-1, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1].reverse());
  assert.deepStrictEqual(s.domain([1e0, 1e-1]).ticks().map(round), [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].reverse());
});

it("log.ticks() generates the expected power-of-ten ticks for small domains", () => {
  const s = scaleLog();
  assert.deepStrictEqual(s.domain([1, 5]).ticks(), [1, 2, 3, 4, 5]);
  assert.deepStrictEqual(s.domain([5, 1]).ticks(), [5, 4, 3, 2, 1]);
  assert.deepStrictEqual(s.domain([-1, -5]).ticks(), [-1, -2, -3, -4, -5]);
  assert.deepStrictEqual(s.domain([-5, -1]).ticks(), [-5, -4, -3, -2, -1]);
  assert.deepStrictEqual(s.domain([286.9252014, 329.4978332]).ticks(1), [300]);
  assert.deepStrictEqual(s.domain([286.9252014, 329.4978332]).ticks(2), [300]);
  assert.deepStrictEqual(s.domain([286.9252014, 329.4978332]).ticks(3), [300, 320]);
  assert.deepStrictEqual(s.domain([286.9252014, 329.4978332]).ticks(4), [290, 300, 310, 320]);
  assert.deepStrictEqual(s.domain([286.9252014, 329.4978332]).ticks(), [290, 295, 300, 305, 310, 315, 320, 325]);
});

it("log.ticks() generates linear ticks when the domain extent is small", () => {
  const s = scaleLog();
  assert.deepStrictEqual(s.domain([41, 42]).ticks(), [41, 41.1, 41.2, 41.3, 41.4, 41.5, 41.6, 41.7, 41.8, 41.9, 42]);
  assert.deepStrictEqual(s.domain([42, 41]).ticks(), [42, 41.9, 41.8, 41.7, 41.6, 41.5, 41.4, 41.3, 41.2, 41.1, 41]);
  assert.deepStrictEqual(s.domain([1600, 1400]).ticks(), [1600, 1580, 1560, 1540, 1520, 1500, 1480, 1460, 1440, 1420, 1400]);
});

it("log.base(base).ticks() generates the expected power-of-base ticks", () => {
  const s = scaleLog().base(Math.E);
  assert.deepStrictEqual(s.domain([0.1, 100]).ticks().map(round), [0.135335283237, 0.367879441171, 1, 2.718281828459, 7.389056098931, 20.085536923188, 54.598150033144]);
});

it("log.tickFormat() is equivalent to log.tickFormat(10)", () => {
  const s = scaleLog();
  assert.deepStrictEqual(s.domain([1e-1, 1e1]).ticks().map(s.tickFormat()), ["100m", "200m", "300m", "400m", "500m", "", "", "", "", "1", "2", "3", "4", "5", "", "", "", "", "10"]);
});

it("log.tickFormat(count) returns a filtered \"s\" format", () => {
  const s = scaleLog(), t = s.domain([1e-1, 1e1]).ticks();
  assert.deepStrictEqual(t.map(s.tickFormat(10)), ["100m", "200m", "300m", "400m", "500m", "", "", "", "", "1", "2", "3", "4", "5", "", "", "", "", "10"]);
 assert.deepStrictEqual(t.map(s.tickFormat(5)), ["100m", "200m", "", "", "", "", "", "", "", "1", "2", "", "", "", "", "", "", "", "10"]);
 assert.deepStrictEqual(t.map(s.tickFormat(1)), ["100m", "", "", "", "", "", "", "", "", "1", "", "", "", "", "", "", "", "", "10"]);
 assert.deepStrictEqual(t.map(s.tickFormat(0)), ["100m", "", "", "", "", "", "", "", "", "1", "", "", "", "", "", "", "", "", "10"]);
});

it("log.tickFormat(count, format) returns the specified format, filtered", () => {
  const s = scaleLog(), t = s.domain([1e-1, 1e1]).ticks();
  assert.deepStrictEqual(t.map(s.tickFormat(10, "+")), ["+0.1", "+0.2", "+0.3", "+0.4", "+0.5", "", "", "", "", "+1", "+2", "+3", "+4", "+5", "", "", "", "", "+10"]);
});

it("log.base(base).tickFormat() returns the \",\" format", () => {
  const s = scaleLog().base(Math.E);
  assert.deepStrictEqual(s.domain([1e-1, 1e1]).ticks().map(s.tickFormat()), ["0.135335283237", "0.367879441171", "1", "2.71828182846", "7.38905609893"]);
});

it("log.base(base).tickFormat(count) returns a filtered \",\" format", () => {
  const s = scaleLog().base(16), t = s.domain([1e-1, 1e1]).ticks();
  assert.deepStrictEqual(t.map(s.tickFormat(10)), ["0.125", "0.1875", "0.25", "0.3125", "0.375", "", "", "", "", "", "", "", "", "", "1", "2", "3", "4", "5", "6", "", "", "", ""]);
  assert.deepStrictEqual(t.map(s.tickFormat(5)), ["0.125", "0.1875", "", "", "", "", "", "", "", "", "", "", "", "", "1", "2", "3", "", "", "", "", "", "", ""]);
  assert.deepStrictEqual(t.map(s.tickFormat(1)), ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "1", "", "", "", "", "", "", "", "", ""]);
});

it("log.ticks() generates log ticks", () => {
  const x = scaleLog();
  assert.deepStrictEqual(x.ticks().map(x.tickFormat(Infinity)), [
    "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "10"
  ]);
  x.domain([100, 1]);
  assert.deepStrictEqual(x.ticks().map(x.tickFormat(Infinity)), [
    "100",
    "90", "80", "70", "60", "50", "40", "30", "20", "10",
    "9", "8", "7", "6", "5", "4", "3", "2", "1"
  ]);
  x.domain([0.49999, 0.006029505943610648]);
  assert.deepStrictEqual(x.ticks().map(x.tickFormat(Infinity)), [
    "400m", "300m", "200m", "100m",
    "90m", "80m", "70m", "60m", "50m", "40m", "30m", "20m", "10m",
    "9m", "8m", "7m"
  ]);
  x.domain([0.95, 1.05e8]);
  assert.deepStrictEqual(x.ticks().map(x.tickFormat(8)).filter(String), [
    "1", "10", "100", "1k", "10k", "100k", "1M", "10M", "100M"
  ]);
});

it("log.tickFormat(count) filters ticks to about count", () => {
  const x = scaleLog();
  assert.deepStrictEqual(x.ticks().map(x.tickFormat(5)), [
    "1", "2", "3", "4", "5", "", "", "", "",
    "10"
  ]);
  x.domain([100, 1]);
  assert.deepStrictEqual(x.ticks().map(x.tickFormat(10)), [
    "100",
    "", "", "", "", "50", "40", "30", "20", "10",
    "", "", "", "", "5", "4", "3", "2", "1"
  ]);
});

it("log.ticks(count) filters powers-of-ten ticks for huge domains", () => {
  const x = scaleLog().domain([1e10, 1]);
  assert.deepStrictEqual(x.ticks().map(x.tickFormat()), ["10G", "1G", "100M", "10M", "1M", "100k", "10k", "1k", "100", "10", "1"]);
  x.domain([1e-29, 1e-1]);
  assert.deepStrictEqual(x.ticks().map(x.tickFormat()), ["0.0001y", "0.01y", "1y", "100y", "10z", "1a", "100a", "10f", "1p", "100p", "10n", "1µ", "100µ", "10m"]);
});

it("log.ticks() generates ticks that cover the domain", () => {
  const x = scaleLog().domain([0.01, 10000]);
  assert.deepStrictEqual(x.ticks(20).map(x.tickFormat(20)), [
    "10m", "20m", "30m", "", "", "", "", "", "",
    "100m", "200m", "300m", "", "", "", "", "", "",
    "1", "2", "3", "", "", "", "", "", "",
    "10", "20", "30", "", "", "", "", "", "",
    "100", "200", "300", "", "", "", "", "", "",
    "1k", "2k", "3k", "", "", "", "", "", "",
    "10k"
  ]);
});

it("log.ticks() generates ticks that cover the niced domain", () => {
  const x = scaleLog().domain([0.0124123, 1230.4]).nice();
  assert.deepStrictEqual(x.ticks(20).map(x.tickFormat(20)), [
    "10m", "20m", "30m", "", "", "", "", "", "",
    "100m", "200m", "300m", "", "", "", "", "", "",
    "1", "2", "3", "", "", "", "", "", "",
    "10", "20", "30", "", "", "", "", "", "",
    "100", "200", "300", "", "", "", "", "", "",
    "1k", "2k", "3k", "", "", "", "", "", "",
    "10k"
  ]);
});

it("log.tickFormat(count, format) returns a filtered format", () => {
  const x = scaleLog().domain([1000.1, 1]);
  assert.deepStrictEqual(x.ticks().map(x.tickFormat(10, format("+,d"))), [
    "+1,000",
    "", "", "", "", "", "", "+300", "+200", "+100",
    "", "", "", "", "", "", "+30", "+20", "+10",
    "", "", "", "", "", "", "+3", "+2", "+1"
  ]);
});

it("log.tickFormat(count, specifier) returns a filtered format", () => {
  const x = scaleLog().domain([1000.1, 1]);
  assert.deepStrictEqual(x.ticks().map(x.tickFormat(10, "s")), [
    "1k",
    "", "", "", "", "", "", "300", "200", "100",
    "", "", "", "", "", "", "30", "20", "10",
    "", "", "", "", "", "", "3", "2", "1"
  ]);
});

it("log.tickFormat(count, specifier) trims trailing zeroes by default", () => {
  const x = scaleLog().domain([100.1, 0.02]);
  assert.deepStrictEqual(x.ticks().map(x.tickFormat(10, "f")), [
    "100",
    "", "", "", "", "", "", "", "20", "10",
    "", "", "", "", "", "", "", "2", "1",
    "", "", "", "", "", "", "", "0.2", "0.1",
    "", "", "", "", "", "", "", "0.02"
  ]);
});

it("log.tickFormat(count, specifier) with base two trims trailing zeroes by default", () => {
  const x = scaleLog().base(2).domain([100.1, 0.02]);
  assert.deepStrictEqual(x.ticks().map(x.tickFormat(10, "f")), [
    "64", "32", "16", "8", "4", "2", "1", "0.5", "0.25", "0.125", "0.0625", "0.03125"
  ]);
});

it("log.tickFormat(count, specifier) preserves trailing zeroes if needed", () => {
  const x = scaleLog().domain([100.1, 0.02]);
  assert.deepStrictEqual(x.ticks().map(x.tickFormat(10, ".1f")), [
    "100.0",
    "", "", "", "", "", "", "", "20.0", "10.0",
    "", "", "", "", "", "", "", "2.0", "1.0",
    "", "", "", "", "", "", "", "0.2", "0.1",
    "", "", "", "", "", "", "", "0.0"
  ]);
});

it("log.ticks() returns the empty array when the domain is degenerate", () => {
  const x = scaleLog();
  assert.deepStrictEqual(x.domain([0, 1]).ticks(), []);
  assert.deepStrictEqual(x.domain([1, 0]).ticks(), []);
  assert.deepStrictEqual(x.domain([0, -1]).ticks(), []);
  assert.deepStrictEqual(x.domain([-1, 0]).ticks(), []);
  assert.deepStrictEqual(x.domain([-1, 1]).ticks(), []);
  assert.deepStrictEqual(x.domain([0, 0]).ticks(), []);
});

function round(x) {
  return Math.round(x * 1e12) / 1e12;
}
