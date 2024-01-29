import assert from "assert";
import {geoGnomonic, geoIdentity} from "../../src/index.js";
import {assertInDelta} from "../asserts.js";
import {assertProjectionEqual} from "./asserts.js";

it("projection.angle(…) defaults to zero", () => {
  const projection = geoGnomonic().scale(1).translate([0, 0]);
  assert.strictEqual(projection.angle(), 0);
  assertProjectionEqual(projection, [0, 0], [0, 0]);
  assertProjectionEqual(projection, [10, 0], [0.17632698070846498, 0]);
  assertProjectionEqual(projection, [-10, 0], [-0.17632698070846498, 0]);
  assertProjectionEqual(projection, [0, 10], [0, -0.17632698070846498]);
  assertProjectionEqual(projection, [0, -10], [0, 0.17632698070846498]);
  assertProjectionEqual(projection, [10, 10], [0.17632698070846495, -0.17904710860483972]);
  assertProjectionEqual(projection, [10, -10], [0.17632698070846495, 0.17904710860483972]);
  assertProjectionEqual(projection, [-10, 10], [-0.17632698070846495, -0.17904710860483972]);
  assertProjectionEqual(projection, [-10, -10], [-0.17632698070846495, 0.17904710860483972]);
});

it("projection.angle(…) rotates by the specified degrees after projecting", () => {
  const projection = geoGnomonic().scale(1).translate([0, 0]).angle(30);
  assertInDelta(projection.angle(), 30);
  assertProjectionEqual(projection, [0, 0], [0, 0]);
  assertProjectionEqual(projection, [10, 0], [0.1527036446661393, -0.08816349035423247]);
  assertProjectionEqual(projection, [-10, 0], [-0.1527036446661393, 0.08816349035423247]);
  assertProjectionEqual(projection, [0, 10], [-0.08816349035423247, -0.1527036446661393]);
  assertProjectionEqual(projection, [0, -10], [0.08816349035423247, 0.1527036446661393]);
  assertProjectionEqual(projection, [10, 10], [0.06318009036371944, -0.24322283488017502]);
  assertProjectionEqual(projection, [10, -10], [0.24222719896855913, 0.0668958541717101]);
  assertProjectionEqual(projection, [-10, 10], [-0.24222719896855913, -0.0668958541717101]);
  assertProjectionEqual(projection, [-10, -10], [-0.06318009036371944, 0.24322283488017502]);
});

it("projection.angle(…) rotates by the specified degrees after projecting", () => {
  const projection = geoGnomonic().scale(1).translate([0, 0]).angle(-30);
  assertInDelta(projection.angle(), -30);
  assertProjectionEqual(projection, [0, 0], [0, 0]);
  assertProjectionEqual(projection, [10, 0], [0.1527036446661393, 0.08816349035423247]);
  assertProjectionEqual(projection, [-10, 0], [-0.1527036446661393, -0.08816349035423247]);
  assertProjectionEqual(projection, [0, 10], [0.08816349035423247, -0.1527036446661393]);
  assertProjectionEqual(projection, [0, -10], [-0.08816349035423247, 0.1527036446661393]);
  assertProjectionEqual(projection, [10, 10], [0.24222719896855913, -0.0668958541717101]);
  assertProjectionEqual(projection, [10, -10], [0.06318009036371944, 0.24322283488017502]);
  assertProjectionEqual(projection, [-10, 10], [-0.06318009036371944, -0.24322283488017502]);
  assertProjectionEqual(projection, [-10, -10], [-0.24222719896855913, 0.0668958541717101]);
});

it("projection.angle(…) wraps around 360°", () => {
  const projection = geoGnomonic().scale(1).translate([0, 0]).angle(360);
  assert.strictEqual(projection.angle(), 0);
});

it("identity.angle(…) rotates geoIdentity", () => {
  const projection = geoIdentity().angle(-45), SQRT2_2 = Math.sqrt(2) / 2;
  assertInDelta(projection.angle(), -45);
  assertProjectionEqual(projection, [0, 0], [0, 0]);
  assertProjectionEqual(projection, [1, 0], [SQRT2_2, SQRT2_2]);
  assertProjectionEqual(projection, [-1, 0], [-SQRT2_2, -SQRT2_2]);
  assertProjectionEqual(projection, [0, 1], [-SQRT2_2, SQRT2_2]);
});
