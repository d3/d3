import assert from "assert";
import {extent, ticks} from "d3-array";
import {autoType} from "d3-dsv";
import {tsv} from "d3-fetch";
import {polygonCentroid} from "d3-polygon";
import {scaleLinear} from "d3-scale";
import {contourDensity} from "../src/index.js";
import {assertInDelta} from "./asserts.js";
import it from "./jsdom.js";

it("density.size(…) validates the specified size", () => {
  assert.deepStrictEqual(contourDensity().size([1, 2]).size(), [1, 2]);
  assert.deepStrictEqual(contourDensity().size([0, 0]).size(), [0, 0]);
  assert.deepStrictEqual(contourDensity().size([1.5, 2.5]).size(), [1.5, 2.5]);
  assert.throws(() => void contourDensity().size([0, -1]), /invalid size/);
});

it("contourDensity(data) returns the expected result for empty data", () => {
  const c = contourDensity();
  assert.deepStrictEqual(c([]), []);
});

it("contourDensity(data) returns contours centered on a point", () => {
  const c = contourDensity().thresholds([0.00001, 0.0001]);
  for (const p of [[100, 100], [100.5, 102]]) {
    const contour = c([p]);
    assert.strictEqual(contour.length, 2);
    for (const b of contour) {
      const a = polygonCentroid(b.coordinates[0][0]);
      assertInDelta(a[0], p[0], 0.1);
      assertInDelta(a[1], p[1], 0.1);
    }
  }
});

it("contourDensity.thresholds(values[])(data) returns contours for the given values", () => {
  const points = [[1, 0], [0, 1], [1, 1]];
  const c = contourDensity();
  const c1 = c(points);
  const values1 = c1.map(d => d.value);
  const c2 = c.thresholds(values1)(points);
  const values2 = c2.map(d => d.value);
  assert.deepStrictEqual(values1, values2);
});

it("contourDensity.weight(…) accepts NaN weights", () => {
  const points = [[1, 0, 1], [0, 1, -2], [1, 1, NaN]];
  const c = contourDensity().weight(d => d[2])(points);
  assert.strictEqual(c.length, 24);
});

it("contourDensity.thresholds(values[])(data) returns contours for the given values at a different cellSize", () => {
  const points = [[1, 0], [0, 1], [1, 1]];
  const c = contourDensity().cellSize(16);
  const c1 = c(points);
  const values1 = c1.map(d => d.value);
  const c2 = c.thresholds(values1)(points);
  const values2 = c2.map(d => d.value);
  assert.deepStrictEqual(values1, values2);
});

it("contourDensity(data) returns nice default thresholds", async () => {
  const faithful = await tsv("data/faithful.tsv", autoType);

  const width = 960,
        height = 500,
        marginTop = 20,
        marginRight = 30,
        marginBottom = 30,
        marginLeft = 40;

  const x = scaleLinear()
      .domain(extent(faithful, d => d.waiting)).nice()
      .rangeRound([marginLeft, width - marginRight]);

  const y = scaleLinear()
      .domain(extent(faithful, d => d.eruptions)).nice()
      .rangeRound([height - marginBottom, marginTop]);

  const contour = contourDensity()
      .x(d => x(d.waiting))
      .y(d => y(d.eruptions))
      .size([width, height])
      .bandwidth(30)
    (faithful);

  assert.deepStrictEqual(contour.map(c => c.value), ticks(0.0002, 0.0059, 30));
});

it("contourDensity.contours(data) preserves the specified threshold exactly", async () => {
  const faithful = await tsv("data/faithful.tsv", autoType);

  const width = 960,
        height = 500,
        marginTop = 20,
        marginRight = 30,
        marginBottom = 30,
        marginLeft = 40;

  const x = scaleLinear()
      .domain(extent(faithful, d => d.waiting)).nice()
      .rangeRound([marginLeft, width - marginRight]);

  const y = scaleLinear()
      .domain(extent(faithful, d => d.eruptions)).nice()
      .rangeRound([height - marginBottom, marginTop]);

  const contour = contourDensity()
      .x(d => x(d.waiting))
      .y(d => y(d.eruptions))
      .size([width, height])
      .bandwidth(30)
    .contours(faithful);

  for (const value of ticks(0.0002, 0.006, 30)) {
    assert.strictEqual(contour(value).value, value);
  }
});
