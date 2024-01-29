import assert from "assert";
import {csvParse} from "d3-dsv";
import {readFile} from "fs/promises";
import {bin, extent, histogram, thresholdSturges, ticks} from "../src/index.js";

it("histogram is a deprecated alias for bin", () => {
  assert.strictEqual(histogram, bin);
});

it("bin() returns a default bin generator", () => {
  const h = bin();
  assert.strictEqual(h.value()(42), 42);
  assert.strictEqual(h.domain(), extent);
  assert.deepStrictEqual(h.thresholds(), thresholdSturges);
});

it("bin(data) computes bins of the specified array of data", () => {
  const h = bin();
  assert.deepStrictEqual(h([0, 0, 0, 10, 20, 20]), [
    box([0, 0, 0], 0, 5),
    box([], 5, 10),
    box([10], 10, 15),
    box([], 15, 20),
    box([20, 20], 20, 25)
  ]);
});

it("bin(iterable) is equivalent to bin(array)", () => {
  const h = bin();
  assert.deepStrictEqual(h(iterable([0, 0, 0, 10, 20, 20])), [
    box([0, 0, 0], 0, 5),
    box([], 5, 10),
    box([10], 10, 15),
    box([], 15, 20),
    box([20, 20], 20, 25)
  ]);
});

it("bin.value(number) sets the constant value", () => {
  const h = bin().value(12); // Pointless, but for consistency.
  assert.deepStrictEqual(h([0, 0, 0, 1, 2, 2]), [
    box([0, 0, 0, 1, 2, 2], 12, 12),
  ]);
});

it("bin(data) does not bin null, undefined, or NaN", () => {
  const h = bin();
  assert.deepStrictEqual(h([0, null, undefined, NaN, 10, 20, 20]), [
    box([0], 0, 5),
    box([], 5, 10),
    box([10], 10, 15),
    box([], 15, 20),
    box([20, 20], 20, 25)
  ]);
});

it("bin.value(function) sets the value accessor", () => {
  const h = bin().value((d) => d.value);
  const a = {value: 0};
  const b = {value: 10};
  const c = {value: 20};
  assert.deepStrictEqual(h([a, a, a, b, c, c]), [
    box([a, a, a], 0, 5),
    box([], 5, 10),
    box([b], 10, 15),
    box([], 15, 20),
    box([c, c], 20, 25)
  ]);
});

it("bin.domain(array) sets the domain", () => {
  const h = bin().domain([0, 20]);
  assert.deepStrictEqual(h.domain()(), [0, 20]);
  assert.deepStrictEqual(h([1, 2, 2, 10, 18, 18]), [
    box([1, 2, 2], 0, 5),
    box([], 5, 10),
    box([10], 10, 15),
    box([18, 18], 15, 20)
  ]);
});

it("bin.domain(function) sets the domain accessor", () => {
  let actual;
  const values = [1, 2, 2, 10, 18, 18];
  const domain = (values) => { actual = values; return [0, 20]; };
  const h = bin().domain(domain);
  assert.strictEqual(h.domain(), domain);
  assert.deepStrictEqual(h(values), [
    box([1, 2, 2], 0, 5),
    box([], 5, 10),
    box([10], 10, 15),
    box([18, 18], 15, 20)
  ]);
  assert.deepStrictEqual(actual, values);
});

it("bin.thresholds(number) sets the approximate number of bin thresholds", () => {
  const h = bin().thresholds(3);
  assert.deepStrictEqual(h([0, 0, 0, 10, 30, 30]), [
    box([0, 0, 0], 0, 10),
    box([10], 10, 20),
    box([], 20, 30),
    box([30, 30], 30, 40)
  ]);
});

it("bin.thresholds(array) sets the bin thresholds", () => {
  const h = bin().thresholds([10, 20]);
  assert.deepStrictEqual(h([0, 0, 0, 10, 30, 30]), [
    box([0, 0, 0], 0, 10),
    box([10], 10, 20),
    box([30, 30], 20, 30)
  ]);
});

it("bin.thresholds(array) ignores thresholds outside the domain", () => {
  const h = bin().thresholds([0, 1, 2, 3, 4]);
  assert.deepStrictEqual(h([0, 1, 2, 3]), [
    box([0], 0, 1),
    box([1], 1, 2),
    box([2], 2, 3),
    box([3], 3, 3)
  ]);
});

it("bin.thresholds(function) sets the bin thresholds accessor", () => {
  let actual;
  const values = [0, 0, 0, 10, 30, 30];
  const h = bin().thresholds((values, x0, x1) => { actual = [values, x0, x1]; return [10, 20]; });
  assert.deepStrictEqual(h(values), [
    box([0, 0, 0], 0, 10),
    box([10], 10, 20),
    box([30, 30], 20, 30)
  ]);
  assert.deepStrictEqual(actual, [values, 0, 30]);
  assert.deepStrictEqual(h.thresholds(() => 5)(values), [
    box([0, 0, 0], 0, 5),
    box([], 5, 10),
    box([10], 10, 15),
    box([], 15, 20),
    box([], 20, 25),
    box([], 25, 30),
    box([30, 30], 30, 35)
  ]);
});

it("bin(data) uses nice thresholds", () => {
  const h = bin().domain([0, 1]).thresholds(5);
  assert.deepStrictEqual(h([]).map(b => [b.x0, b.x1]), [
    [0.0, 0.2],
    [0.2, 0.4],
    [0.4, 0.6],
    [0.6, 0.8],
    [0.8, 1.0]
  ]);
});

it("bin()() returns bins whose rightmost bin is not too wide", () => {
  const h = bin();
  assert.deepStrictEqual(h([9.8, 10, 11, 12, 13, 13.2]), [
    box([9.8], 9, 10),
    box([10], 10, 11),
    box([11], 11, 12),
    box([12], 12, 13),
    box([13, 13.2], 13, 14)
  ]);
});

it("bin(data) handles fractional step correctly", () => {
  const h = bin().thresholds(10);
  assert.deepStrictEqual(h([9.8, 10, 11, 12, 13, 13.2]), [
    box([9.8], 9.5, 10),
    box([10], 10, 10.5),
    box([], 10.5, 11),
    box([11], 11, 11.5),
    box([], 11.5, 12),
    box([12], 12, 12.5),
    box([], 12.5, 13),
    box([13, 13.2], 13, 13.5)
  ]);
});

it("bin(data) handles fractional step correctly with a custom, non-aligned domain", () => {
  const h = bin().thresholds(10).domain([9.7, 13.3]);
  assert.deepStrictEqual(h([9.8, 10, 11, 12, 13, 13.2]), [
    box([9.8], 9.7, 10),
    box([10], 10, 10.5),
    box([], 10.5, 11),
    box([11], 11, 11.5),
    box([], 11.5, 12),
    box([12], 12, 12.5),
    box([], 12.5, 13),
    box([13, 13.2], 13, 13.3)
  ]);
});

it("bin(data) handles fractional step correctly with a custom, aligned domain", () => {
  const h = bin().thresholds(10).domain([9.5, 13.5]);
  assert.deepStrictEqual(h([9.8, 10, 11, 12, 13, 13.2]), [
    box([9.8], 9.5, 10),
    box([10], 10, 10.5),
    box([], 10.5, 11),
    box([11], 11, 11.5),
    box([], 11.5, 12),
    box([12], 12, 12.5),
    box([], 12.5, 13),
    box([13, 13.2], 13, 13.5)
  ]);
});

it("bin(data) coerces values to numbers as expected", () => {
  const h = bin().thresholds(10);
  assert.deepStrictEqual(h(["1", "2", "3", "4", "5"]), [
    box(["1"], 1, 1.5),
    box([], 1.5, 2),
    box(["2"], 2, 2.5),
    box([], 2.5, 3),
    box(["3"], 3, 3.5),
    box([], 3.5, 4),
    box(["4"], 4, 4.5),
    box([], 4.5, 5),
    box(["5"], 5, 5.5)
  ]);
});

it("bin(athletes) produces the expected result", async () => {
  const height = csvParse(await readFile("./test/data/athletes.csv", "utf8")).filter(d => d.height).map(d => +d.height);
  const bins = bin().thresholds(57)(height);
  assert.deepStrictEqual(bins.map(b => b.length), [1, 0, 0, 0, 0, 0, 2, 1, 2, 1, 1, 4, 11, 7, 13, 39, 78, 93, 119, 193, 354, 393, 573, 483, 651, 834, 808, 763, 627, 648, 833, 672, 578, 498, 395, 425, 278, 235, 182, 128, 91, 69, 43, 29, 21, 23, 3, 3, 1, 1, 1]);
});

it("bin(data) assigns floating point values to the correct bins", () => {
  for (const n of [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000]) {
    assert.ok(bin().thresholds(n)(ticks(1, 2, n)).every(d => d.length === 1));
  }
});

it("bin(data) assigns integer values to the correct bins", () => {
  assert.deepStrictEqual(bin().domain([4, 5])([5]), [box([5], 4, 5)]);
  const eights = [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8];
  assert.deepStrictEqual(bin().domain([3, 8])(eights), [box([], 3, 4), box([], 4, 5), box([], 5, 6), box([], 6, 7), box(eights, 7, 8)]);
});

it("bin(data) does not mutate user-supplied thresholds as an array", () => {
  const thresholds = [3, 4, 5, 6];
  const b = bin().domain([4, 5]).thresholds(thresholds);
  assert.deepStrictEqual(b([5]), [box([], 4, 5), box([5], 5, 5)]);
  assert.deepStrictEqual(thresholds, [3, 4, 5, 6]);
  assert.deepStrictEqual(b.thresholds()(), [3, 4, 5, 6]);
});

it("bin(data) does not mutate user-supplied thresholds as a function", () => {
  const thresholds = [3, 4, 5, 6];
  const b = bin().domain([4, 5]).thresholds(() => thresholds);
  assert.deepStrictEqual(b([5]), [box([], 4, 5), box([5], 5, 5)]);
  assert.deepStrictEqual(thresholds, [3, 4, 5, 6]);
  assert.deepStrictEqual(b.thresholds()(), [3, 4, 5, 6]);
});

function box(bin, x0, x1)  {
  bin.x0 = x0;
  bin.x1 = x1;
  return bin;
}

function* iterable(array) {
  yield* array;
}
