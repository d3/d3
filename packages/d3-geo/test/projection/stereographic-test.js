import {geoStereographic} from "../../src/index.js";
import {assertProjectionEqual} from "./asserts.js";

it("stereographic(point) returns the expected result", () => {
  const stereographic = geoStereographic().translate([0, 0]).scale(1);
  assertProjectionEqual(stereographic, [  0,   0], [ 0,  0]);
  assertProjectionEqual(stereographic, [-90,   0], [-1,  0]);
  assertProjectionEqual(stereographic, [ 90,   0], [ 1,  0]);
  assertProjectionEqual(stereographic, [  0, -90], [ 0,  1]);
  assertProjectionEqual(stereographic, [  0,  90], [ 0, -1]);
});
