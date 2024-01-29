import assert from "assert";
import {geoCircle} from "../src/index.js";
import contains from "../src/polygonContains.js";

function polygonContains(polygon, point) {
  return contains(polygon.map(ringRadians), pointRadians(point));
}

it("geoPolygonContains(empty, point) returns false", () => {
  assert.strictEqual(polygonContains([], [0, 0]), 0);
});

it("geoPolygonContains(simple, point) returns the expected value", () => {
  const polygon = [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]];
  assert.strictEqual(polygonContains(polygon, [0.1, 2]), 0);
  assert.strictEqual(polygonContains(polygon, [0.1, 0.1]), 1);
});

it("geoPolygonContains(smallCircle, point) returns the expected value", () => {
  const polygon = geoCircle().radius(60)().coordinates;
  assert.strictEqual(polygonContains(polygon, [-180, 0]), 0);
  assert.strictEqual(polygonContains(polygon, [1, 1]), 1);
});

it("geoPolygonContains wraps longitudes", () => {
  const polygon = geoCircle().center([300, 0])().coordinates;
  assert.strictEqual(polygonContains(polygon, [300, 0]), 1);
  assert.strictEqual(polygonContains(polygon, [-60, 0]), 1);
  assert.strictEqual(polygonContains(polygon, [-420, 0]), 1);
});

it("geoPolygonContains(southPole, point) returns the expected value", () => {
  const polygon = [[[-60, -80], [60, -80], [180, -80], [-60, -80]]];
  assert.strictEqual(polygonContains(polygon, [0, 0]), 0);
  assert.strictEqual(polygonContains(polygon, [0, -85]), 1);
  assert.strictEqual(polygonContains(polygon, [0, -90]), 1);
});

it("geoPolygonContains(northPole, point) returns the expected value", () => {
  const polygon = [[[60, 80], [-60, 80], [-180, 80], [60, 80]]];
  assert.strictEqual(polygonContains(polygon, [0, 0]), 0);
  assert.strictEqual(polygonContains(polygon, [0, 85]), 1);
  assert.strictEqual(polygonContains(polygon, [0, 90]), 1);
  assert.strictEqual(polygonContains(polygon, [-100, 90]), 1);
  assert.strictEqual(polygonContains(polygon, [0, -90]), 0);
});

it("geoPolygonContains(touchingPole, Pole) returns true (issue #105)", () => {
  const polygon = [[[0, -30], [120, -30], [0, -90], [0, -30]]];
  assert.strictEqual(polygonContains(polygon, [0, -90]), 0);
  assert.strictEqual(polygonContains(polygon, [-60, -90]), 0);
  assert.strictEqual(polygonContains(polygon, [60, -90]), 0);
  const polygon2 = [[[0, 30], [-120, 30], [0, 90], [0, 30]]];
  assert.strictEqual(polygonContains(polygon2, [0, 90]), 0);
  assert.strictEqual(polygonContains(polygon2, [-60, 90]), 0);
  assert.strictEqual(polygonContains(polygon2, [60, 90]), 0);
});

it("geoPolygonContains(southHemispherePoly) returns the expected value", () => {
  const polygon = [[[0, 0], [10, -40], [-10, -40], [0, 0]]];
  assert.strictEqual(polygonContains(polygon, [0,-40.2]), 1);
  assert.strictEqual(polygonContains(polygon, [0,-40.5]), 0);
});

it("geoPolygonContains(largeNearOrigin, point) returns the expected value", () => {
  const polygon = [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]];
  assert.strictEqual(polygonContains(polygon, [0.1, 0.1]), 0);
  assert.strictEqual(polygonContains(polygon, [2, 0.1]), 1);
});

it("geoPolygonContains(largeNearSouthPole, point) returns the expected value", () => {
  const polygon = [[[-60, 80], [60, 80], [180, 80], [-60, 80]]];
  assert.strictEqual(polygonContains(polygon, [0, 85]), 0);
  assert.strictEqual(polygonContains(polygon, [0, 0]), 1);
});

it("geoPolygonContains(largeNearNorthPole, point) returns the expected value", () => {
  const polygon = [[[60, -80], [-60, -80], [-180, -80], [60, -80]]];
  assert.strictEqual(polygonContains(polygon, [0, -85]), 0);
  assert.strictEqual(polygonContains(polygon, [0, 0]), 1);
});

it("geoPolygonContains(largeCircle, point) returns the expected value", () => {
  const polygon = geoCircle().radius(120)().coordinates;
  assert.strictEqual(polygonContains(polygon, [-180, 0]), 0);
  assert.strictEqual(polygonContains(polygon, [-90, 0]), 1);
});

it("geoPolygonContains(largeNarrowStripHole, point) returns the expected value", () => {
  const polygon = [[[-170, -1], [0, -1], [170, -1], [170, 1], [0, 1], [-170, 1], [-170, -1]]];
  assert.strictEqual(polygonContains(polygon, [0, 0]), 0);
  assert.strictEqual(polygonContains(polygon, [0, 20]), 1);
});

it("geoPolygonContains(largeNarrowEquatorialHole, point) returns the expected value", () => {
  const circle = geoCircle().center([0, -90]),
      ring0 = circle.radius(90 - 0.01)().coordinates[0],
      ring1 = circle.radius(90 + 0.01)().coordinates[0].reverse(),
      polygon = [ring0, ring1];
  assert.strictEqual(polygonContains(polygon, [0, 0]), 0);
  assert.strictEqual(polygonContains(polygon, [0, -90]), 1);
});

it("geoPolygonContains(largeNarrowEquatorialStrip, point) returns the expected value", () => {
  const circle = geoCircle().center([0, -90]),
      ring0 = circle.radius(90 + 0.01)().coordinates[0],
      ring1 = circle.radius(90 - 0.01)().coordinates[0].reverse(),
      polygon = [ring0, ring1];
  assert.strictEqual(polygonContains(polygon, [0, -90]), 0);
  assert.strictEqual(polygonContains(polygon, [0, 0]), 1);
});

it("geoPolygonContains(ringNearOrigin, point) returns the expected value", () => {
  const ring0 = [[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]],
      ring1 = [[0.4, 0.4], [0.6, 0.4], [0.6, 0.6], [0.4, 0.6], [0.4, 0.4]],
      polygon = [ring0, ring1];
  assert.strictEqual(polygonContains(polygon, [0.5, 0.5]), 0);
  assert.strictEqual(polygonContains(polygon, [0.1, 0.5]), 1);
});

it("geoPolygonContains(ringEquatorial, point) returns the expected value", () => {
  const ring0 = [[0, -10], [-120, -10], [120, -10], [0, -10]],
      ring1 = [[0, 10], [120, 10], [-120, 10], [0, 10]],
      polygon = [ring0, ring1];
  assert.strictEqual(polygonContains(polygon, [0, 20]), 0);
  assert.strictEqual(polygonContains(polygon, [0, 0]), 1);
});

it("geoPolygonContains(ringExcludingBothPoles, point) returns the expected value", () => {
  const ring0 = [[10, 10], [-10, 10], [-10, -10], [10, -10], [10, 10]].reverse(),
      ring1 = [[170, 10], [170, -10], [-170, -10], [-170, 10], [170, 10]].reverse(),
      polygon = [ring0, ring1];
  assert.strictEqual(polygonContains(polygon, [0, 90]), 0);
  assert.strictEqual(polygonContains(polygon, [0, 0]), 1);
});

it("geoPolygonContains(ringContainingBothPoles, point) returns the expected value", () => {
  const ring0 = [[10, 10], [-10, 10], [-10, -10], [10, -10], [10, 10]],
      ring1 = [[170, 10], [170, -10], [-170, -10], [-170, 10], [170, 10]],
      polygon = [ring0, ring1];
  assert.strictEqual(polygonContains(polygon, [0, 0]), 0);
  assert.strictEqual(polygonContains(polygon, [0, 20]), 1);
});

it("geoPolygonContains(ringContainingSouthPole, point) returns the expected value", () => {
  const ring0 = [[10, 10], [-10, 10], [-10, -10], [10, -10], [10, 10]],
      ring1 = [[0, 80], [120, 80], [-120, 80], [0, 80]],
      polygon = [ring0, ring1];
  assert.strictEqual(polygonContains(polygon, [0, 90]), 0);
  assert.strictEqual(polygonContains(polygon, [0, -90]), 1);
});

it("geoPolygonContains(ringContainingNorthPole, point) returns the expected value", () => {
  const ring0 = [[10, 10], [-10, 10], [-10, -10], [10, -10], [10, 10]].reverse(),
      ring1 = [[0, 80], [120, 80], [-120, 80], [0, 80]].reverse(),
      polygon = [ring0, ring1];
  assert.strictEqual(polygonContains(polygon, [0, -90]), 0);
  assert.strictEqual(polygonContains(polygon, [0, 90]), 1);
});

it("geoPolygonContains(selfIntersectingNearOrigin, point) returns the expected value", () => {
  const polygon = [[[0, 0], [1, 0], [1, 3], [3, 3], [3, 1], [0, 1], [0, 0]]];
  assert.strictEqual(polygonContains(polygon, [15, 0.5]), 0);
  assert.strictEqual(polygonContains(polygon, [12, 2]), 0);
  assert.strictEqual(polygonContains(polygon, [0.5, 0.5]), 1);
  assert.strictEqual(polygonContains(polygon, [2, 2]), 1);
});

it("geoPolygonContains(selfIntersectingNearSouthPole, point) returns the expected value", () => {
  const polygon = [[[-10, -80], [120, -80], [-120, -80], [10, -85], [10, -75], [-10, -75], [-10, -80]]];
  assert.strictEqual(polygonContains(polygon, [0, 0]), 0);
  assert.strictEqual(polygonContains(polygon, [0, -76]), 1);
  assert.strictEqual(polygonContains(polygon, [0, -89]), 1);
});

it("geoPolygonContains(selfIntersectingNearNorthPole, point) returns the expected value", () => {
  const polygon = [[[-10, 80], [-10, 75], [10, 75], [10, 85], [-120, 80], [120, 80], [-10, 80]]];
  assert.strictEqual(polygonContains(polygon, [0, 0]), 0);
  assert.strictEqual(polygonContains(polygon, [0, 76]), 1);
  assert.strictEqual(polygonContains(polygon, [0, 89]), 1);
});

it("geoPolygonContains(hemisphereTouchingTheSouthPole, point) returns the expected value", () => {
  const polygon = geoCircle().radius(90)().coordinates;
  assert.strictEqual(polygonContains(polygon, [0, 0]), 1);
});

it("geoPolygonContains(triangleTouchingTheSouthPole, point) returns the expected value", () => {
  const polygon = [[[180, -90], [-45, 0], [45, 0], [180, -90]]];
  assert.strictEqual(polygonContains(polygon, [-46, 0]), 0);
  assert.strictEqual(polygonContains(polygon, [0, 1]), 0);
  assert.strictEqual(polygonContains(polygon, [-90, -80]), 0);
  assert.strictEqual(polygonContains(polygon, [-44, 0]), 1);
  assert.strictEqual(polygonContains(polygon, [0, 0]), 1);
  assert.strictEqual(polygonContains(polygon, [0, -30]), 1);
  assert.strictEqual(polygonContains(polygon, [30, -80]), 1);
});

it("geoPolygonContains(triangleTouchingTheSouthPole2, point) returns the expected value", () => {
  const polygon = [[[-45, 0], [45, 0], [180, -90], [-45, 0]]];
  assert.strictEqual(polygonContains(polygon, [-46, 0]), 0);
  assert.strictEqual(polygonContains(polygon, [0, 1]), 0);
  assert.strictEqual(polygonContains(polygon, [-90, -80]), 0);
  assert.strictEqual(polygonContains(polygon, [-44, 0]), 1);
  assert.strictEqual(polygonContains(polygon, [0, 0]), 1);
  assert.strictEqual(polygonContains(polygon, [0, -30]), 1);
  assert.strictEqual(polygonContains(polygon, [30, -80]), 1);
});

it("geoPolygonContains(triangleTouchingTheSouthPole3, point) returns the expected value", () => {
  const polygon = [[[180, -90], [-135, 0], [135, 0], [180, -90]]];
  assert.strictEqual(polygonContains(polygon, [180, 0]), 0);
  assert.strictEqual(polygonContains(polygon, [150, 0]), 0);
  assert.strictEqual(polygonContains(polygon, [180, -30]), 0);
  assert.strictEqual(polygonContains(polygon, [150, -80]), 0);
  assert.strictEqual(polygonContains(polygon, [0, 0]), 1);
  assert.strictEqual(polygonContains(polygon, [180, 1]), 1);
  assert.strictEqual(polygonContains(polygon, [-90, -80]), 1);
});

it("geoPolygonContains(triangleTouchingTheNorthPole, point) returns the expected value", () => {
  const polygon = [[[180, 90], [45, 0], [-45, 0], [180, 90]]];
  assert.strictEqual(polygonContains(polygon, [-90, 0]), 0);
  assert.strictEqual(polygonContains(polygon, [0, -1]), 0);
  assert.strictEqual(polygonContains(polygon, [0, -80]), 0);
  assert.strictEqual(polygonContains(polygon, [-90, 1]), 0);
  assert.strictEqual(polygonContains(polygon, [-90, 80]), 0);
  assert.strictEqual(polygonContains(polygon, [-44, 10]), 1);
  assert.strictEqual(polygonContains(polygon, [0, 10]), 1);
  assert.strictEqual(polygonContains(polygon, [30, 80]), 1);
});

function ringRadians(ring) {
  return ring = ring.map(pointRadians), ring.pop(), ring;
}

function pointRadians(point) {
  return [point[0] * Math.PI / 180, point[1] * Math.PI / 180];
}
