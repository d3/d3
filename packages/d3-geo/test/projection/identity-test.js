import assert from "assert";
import {geoIdentity, geoPath} from "../../src/index.js";
import {assertProjectionEqual} from "./asserts.js";

it("identity(point) returns the point", () => {
  const identity = geoIdentity().translate([0, 0]).scale(1);
  assertProjectionEqual(identity, [   0,   0], [   0,   0]);
  assertProjectionEqual(identity, [-180,   0], [-180,   0]);
  assertProjectionEqual(identity, [ 180,   0], [ 180,   0]);
  assertProjectionEqual(identity, [  30,  30], [  30,  30]);
});


it("identity(point).scale(…).translate(…) returns the transformed point", () => {
  const identity = geoIdentity().translate([100, 10]).scale(2);
  assertProjectionEqual(identity, [   0,   0], [ 100,  10]);
  assertProjectionEqual(identity, [-180,   0], [-260,  10]);
  assertProjectionEqual(identity, [ 180,   0], [ 460,  10]);
  assertProjectionEqual(identity, [  30,  30], [ 160,  70]);
});


it("identity(point).reflectX(…) and reflectY() return the transformed point", () => {
  const identity = geoIdentity().translate([100, 10]).scale(2)
    .reflectX(false).reflectY(false);
  assertProjectionEqual(identity, [   3,   7], [ 106,  24]);
  assertProjectionEqual(identity.reflectX(true), [   3,   7], [ 94,  24]);
  assertProjectionEqual(identity.reflectY(true), [   3,   7], [ 94,  -4]);
  assertProjectionEqual(identity.reflectX(false), [   3,   7], [ 106,  -4]);
  assertProjectionEqual(identity.reflectY(false), [   3,   7], [ 106,  24]);
});

it("geoPath(identity) returns the path", () => {
  const identity = geoIdentity().translate([0, 0]).scale(1),
    path = geoPath().projection(identity);
  assert.strictEqual(path({type:"LineString", coordinates: [[0,0], [10,10]]}), "M0,0L10,10");
  identity.translate([30,90]).scale(2).reflectY(true);
  assert.strictEqual(path({type:"LineString", coordinates: [[0,0], [10,10]]}), "M30,90L50,70");
});

it("geoPath(identity) respects clipExtent", () => {
  const identity = geoIdentity().translate([0, 0]).scale(1),
    path = geoPath().projection(identity);
  identity.clipExtent([[5,5], [40, 80]]);
  assert.strictEqual(path({type:"LineString", coordinates: [[0,0], [10,10]]}), "M5,5L10,10");
  identity.translate([30,90]).scale(2).reflectY(true).clipExtent([[35,76], [45, 86]]);
  assert.strictEqual(path({type:"LineString", coordinates: [[0,0], [10,10]]}), "M35,85L44,76");
});
