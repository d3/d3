import assert from "assert";
import {extent} from "d3-array";
import {geoGraticule} from "../src/index.js";

it("graticule.extent() gets precision", () => {
  const g = geoGraticule();
  assert.strictEqual(g.precision(), 2.5);
  g.precision(999);
  assert.strictEqual(g.precision(), 999);
});

it("graticule.extent(…) sets extentMinor and extentMajor", () => {
  const g = geoGraticule().extent([[-90, -45], [90, 45]]);
  assert.deepStrictEqual(g.extentMinor(), [[-90, -45], [90, 45]]);
  assert.deepStrictEqual(g.extentMajor(), [[-90, -45], [90, 45]]);

  const gReversed = geoGraticule().extent([[90, 45], [-90, -45]]);
  assert.deepStrictEqual(gReversed.extentMinor(), [[-90, -45], [90, 45]]);
  assert.deepStrictEqual(gReversed.extentMajor(), [[-90, -45], [90, 45]]);
});

it("graticule.extent() gets extentMinor", () => {
  const g = geoGraticule().extentMinor([[-90, -45], [90, 45]]);
  assert.deepStrictEqual(g.extent(), [[-90, -45], [90, 45]]);
});

it("graticule.extentMajor() default longitude ranges from 180°W (inclusive) to 180°E (exclusive)", () => {
  const e = geoGraticule().extentMajor();
  assert.strictEqual(e[0][0], -180);
  assert.strictEqual(e[1][0], +180);
});

it("graticule.extentMajor() default latitude ranges from 90°S (exclusive) to 90°N (exclusive)", () => {
  const e = geoGraticule().extentMajor();
  assert.strictEqual(e[0][1], -90 + 1e-6);
  assert.strictEqual(e[1][1], +90 - 1e-6);
});

it("graticule.extentMajor(…) coerces input values to numbers", () => {
  const g = geoGraticule().extentMajor([["-90", "-45"], ["+90", "+45"]]);
  const e = g.extentMajor();
  assert.strictEqual(e[0][0], -90);
  assert.strictEqual(e[0][1], -45);
  assert.strictEqual(e[1][0], +90);
  assert.strictEqual(e[1][1], +45);
});

it("graticule.extentMinor() default longitude ranges from 180°W (inclusive) to 180°E (exclusive)", () => {
  const e = geoGraticule().extentMinor();
  assert.strictEqual(e[0][0], -180);
  assert.strictEqual(e[1][0], +180);
});

it("graticule.extentMinor() default latitude ranges from 80°S (inclusive) to 80°N (inclusive)", () => {
  const e = geoGraticule().extentMinor();
  assert.strictEqual(e[0][1], -80 - 1e-6);
  assert.strictEqual(e[1][1], +80 + 1e-6);
});

it("graticule.extentMinor(…) coerces input values to numbers", () => {
  const g = geoGraticule().extentMinor([["-90", "-45"], ["+90", "+45"]]);
  const e = g.extentMinor();
  assert.strictEqual(e[0][0], -90);
  assert.strictEqual(e[0][1], -45);
  assert.strictEqual(e[1][0], +90);
  assert.strictEqual(e[1][1], +45);
});

it("graticule.step(…) sets the minor and major step", () => {
  const g = geoGraticule().step([22.5, 22.5]);
  assert.deepStrictEqual(g.stepMinor(), [22.5, 22.5]);
  assert.deepStrictEqual(g.stepMajor(), [22.5, 22.5]);
});

it("graticule.step() gets the minor step", () => {
  const g = geoGraticule().stepMinor([22.5, 22.5]);
  assert.deepStrictEqual(g.step(), [22.5, 22.5]);
});

it("graticule.stepMinor() defaults to 10°, 10°", () => {
  assert.deepStrictEqual(geoGraticule().stepMinor(), [10, 10]);
});

it("graticule.stepMinor(…) coerces input values to numbers", () => {
  const g = geoGraticule().stepMinor(["45", "11.25"]);
  const s = g.stepMinor();
  assert.strictEqual(s[0], 45);
  assert.strictEqual(s[1], 11.25);
});

it("graticule.stepMajor() defaults to 90°, 360°", () => {
  assert.deepStrictEqual(geoGraticule().stepMajor(), [90, 360]);
});

it("graticule.stepMajor(…) coerces input values to numbers", () => {
  const g = geoGraticule().stepMajor(["45", "11.25"]);
  const s = g.stepMajor();
  assert.strictEqual(s[0], 45);
  assert.strictEqual(s[1], 11.25);
});

it("graticule.lines() default longitude ranges from 180°W (inclusive) to 180°E (exclusive)", () => {
  const lines = geoGraticule().lines()
      .filter((line) => line.coordinates[0][0] === line.coordinates[1][0])
      .sort((a, b) => a.coordinates[0][0] - b.coordinates[0][0]);
  assert.strictEqual(lines[0].coordinates[0][0], -180);
  assert.strictEqual(lines[lines.length - 1].coordinates[0][0], +170);
});

it("graticule.lines() default latitude ranges from 90°S (exclusive) to 90°N (exclusive)", () => {
  const lines = geoGraticule().lines()
      .filter(line => line.coordinates[0][1] === line.coordinates[1][1])
      .sort((a, b) => a.coordinates[0][1] - b.coordinates[0][1]);
  assert.strictEqual(lines[0].coordinates[0][1], -80);
  assert.strictEqual(lines[lines.length - 1].coordinates[0][1], +80);
});

it("graticule.lines() default minor longitude lines extend from 80°S to 80°N", () => {
  const lines = geoGraticule().lines()
      .filter(line => line.coordinates[0][0] === line.coordinates[1][0])
      .filter(line => Math.abs(line.coordinates[0][0] % 90) > 1e-6);
  lines.forEach(function(line) {
    assert.deepStrictEqual(extent(line.coordinates, p => p[1]), [-80 - 1e-6, +80 + 1e-6]);
  });
});

it("graticule.lines() default major longitude lines extend from 90°S to 90°N", () => {
  const lines = geoGraticule().lines()
      .filter(line => line.coordinates[0][0] === line.coordinates[1][0])
      .filter(line => Math.abs(line.coordinates[0][0] % 90) < 1e-6);
  lines.forEach(function(line) {
    assert.deepStrictEqual(extent(line.coordinates, p => p[1]), [-90 + 1e-6, +90 - 1e-6]);
  });
});

it("graticule.lines() default latitude lines extend from 180°W to 180°E", () => {
  const lines = geoGraticule().lines()
      .filter(line => line.coordinates[0][1] === line.coordinates[1][1]);
  lines.forEach(function(line) {
    assert.deepStrictEqual(extent(line.coordinates, p => p[0]), [-180, +180]);
  });
});

it("graticule.lines() returns an array of LineStrings", () => {
  assert.deepStrictEqual(geoGraticule()
      .extent([[-90, -45], [90, 45]])
      .step([45, 45])
      .precision(3)
      .lines(), [
    {type: "LineString", coordinates: [[-90,-45],[-90,45]]}, // meridian
    {type: "LineString", coordinates: [[-45,-45],[-45,45]]}, // meridian
    {type: "LineString", coordinates: [[0,-45],[0,45]]}, // meridian
    {type: "LineString", coordinates: [[45,-45],[45,45]]}, // meridian
    {type: "LineString", coordinates: [[-90,-45],[-87,-45],[-84,-45],[-81,-45],[-78,-45],[-75,-45],[-72,-45],[-69,-45],[-66,-45],[-63,-45],[-60,-45],[-57,-45],[-54,-45],[-51,-45],[-48,-45],[-45,-45],[-42,-45],[-39,-45],[-36,-45],[-33,-45],[-30,-45],[-27,-45],[-24,-45],[-21,-45],[-18,-45],[-15,-45],[-12,-45],[-9,-45],[-6,-45],[-3,-45],[0,-45],[3,-45],[6,-45],[9,-45],[12,-45],[15,-45],[18,-45],[21,-45],[24,-45],[27,-45],[30,-45],[33,-45],[36,-45],[39,-45],[42,-45],[45,-45],[48,-45],[51,-45],[54,-45],[57,-45],[60,-45],[63,-45],[66,-45],[69,-45],[72,-45],[75,-45],[78,-45],[81,-45],[84,-45],[87,-45],[90,-45]]},
    {type: "LineString", coordinates: [[-90,0],[-87,0],[-84,0],[-81,0],[-78,0],[-75,0],[-72,0],[-69,0],[-66,0],[-63,0],[-60,0],[-57,0],[-54,0],[-51,0],[-48,0],[-45,0],[-42,0],[-39,0],[-36,0],[-33,0],[-30,0],[-27,0],[-24,0],[-21,0],[-18,0],[-15,0],[-12,0],[-9,0],[-6,0],[-3,0],[0,0],[3,0],[6,0],[9,0],[12,0],[15,0],[18,0],[21,0],[24,0],[27,0],[30,0],[33,0],[36,0],[39,0],[42,0],[45,0],[48,0],[51,0],[54,0],[57,0],[60,0],[63,0],[66,0],[69,0],[72,0],[75,0],[78,0],[81,0],[84,0],[87,0],[90,0]]}
  ]);
});

it("graticule() returns a MultiLineString of all lines", () => {
  const g = geoGraticule()
      .extent([[-90, -45], [90, 45]])
      .step([45, 45])
      .precision(3);
  assert.deepStrictEqual(g(), {
    type: "MultiLineString",
    coordinates: g.lines().map(line => line.coordinates)
  });
});

it("graticule.outline() returns a Polygon encompassing the major extent", () => {
  assert.deepStrictEqual(geoGraticule()
      .extentMajor([[-90, -45], [90, 45]])
      .precision(3)
      .outline(), {
    type: "Polygon",
    coordinates: [[
      [-90,-45],[-90,45], // meridian
      [-87,45],[-84,45],[-81,45],[-78,45],[-75,45],[-72,45],[-69,45],[-66,45],[-63,45],[-60,45],[-57,45],[-54,45],[-51,45],[-48,45],[-45,45],[-42,45],[-39,45],[-36,45],[-33,45],[-30,45],[-27,45],[-24,45],[-21,45],[-18,45],[-15,45],[-12,45],[-9,45],[-6,45],[-3,45],[0,45],[3,45],[6,45],[9,45],[12,45],[15,45],[18,45],[21,45],[24,45],[27,45],[30,45],[33,45],[36,45],[39,45],[42,45],[45,45],[48,45],[51,45],[54,45],[57,45],[60,45],[63,45],[66,45],[69,45],[72,45],[75,45],[78,45],[81,45],[84,45],[87,45],
      [90,45],[90,-45], // meridian
      [87,-45],[84,-45],[81,-45],[78,-45],[75,-45],[72,-45],[69,-45],[66,-45],[63,-45],[60,-45],[57,-45],[54,-45],[51,-45],[48,-45],[45,-45],[42,-45],[39,-45],[36,-45],[33,-45],[30,-45],[27,-45],[24,-45],[21,-45],[18,-45],[15,-45],[12,-45],[9,-45],[6,-45],[3,-45],[0,-45],[-3,-45],[-6,-45],[-9,-45],[-12,-45],[-15,-45],[-18,-45],[-21,-45],[-24,-45],[-27,-45],[-30,-45],[-33,-45],[-36,-45],[-39,-45],[-42,-45],[-45,-45],[-48,-45],[-51,-45],[-54,-45],[-57,-45],[-60,-45],[-63,-45],[-66,-45],[-69,-45],[-72,-45],[-75,-45],[-78,-45],[-81,-45],[-84,-45],[-87,-45],[-90,-45]
    ]]
  });
});
