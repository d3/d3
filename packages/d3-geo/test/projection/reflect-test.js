import assert from "assert";
import {geoGnomonic, geoMercator} from "../../src/index.js";
import {assertInDelta} from "../asserts.js";
import {assertProjectionEqual} from "./asserts.js";

it("projection.reflectX(…) defaults to false", () => {
  const projection = geoGnomonic().scale(1).translate([0, 0]);
  assert.strictEqual(projection.reflectX(), false);
  assert.strictEqual(projection.reflectY(), false);
  assertProjectionEqual(projection, [0, 0], [0, 0]);
  assertProjectionEqual(projection, [10, 0], [0.17632698070846498, 0]);
  assertProjectionEqual(projection, [0, 10], [0, -0.17632698070846498]);
});

it("projection.reflectX(…) mirrors x after projecting", () => {
  const projection = geoGnomonic().scale(1).translate([0, 0]).reflectX(true);
  assert.strictEqual(projection.reflectX(), true);
  assertProjectionEqual(projection, [0, 0], [0, 0]);
  assertProjectionEqual(projection, [10, 0], [-0.17632698070846498, 0]);
  assertProjectionEqual(projection, [0, 10], [0, -0.17632698070846498]);
  projection.reflectX(false).reflectY(true);
  assert.strictEqual(projection.reflectX(), false);
  assert.strictEqual(projection.reflectY(), true);
  assertProjectionEqual(projection, [0, 0], [0, 0]);
  assertProjectionEqual(projection, [10, 0], [0.17632698070846498, 0]);
  assertProjectionEqual(projection, [0, 10], [0, 0.17632698070846498]);
});

it("projection.reflectX(…) works with projection.angle()", () => {
  const projection = geoMercator().scale(1).translate([10, 20]).reflectX(true).angle(45);
  assert.strictEqual(projection.reflectX(), true);
  assertInDelta(projection.angle(), 45);
  assertProjectionEqual(projection, [0, 0], [10, 20]);
  assertProjectionEqual(projection, [10, 0], [9.87658658, 20.12341341]);
  assertProjectionEqual(projection, [0, 10], [9.87595521, 19.87595521]);
});
