import assert from "assert";
import {geoAzimuthalEqualArea, geoAzimuthalEquidistant} from "../../src/index.js";

it("azimuthal projections don't crash on the antipode", () => {
  for (const p of [
    geoAzimuthalEqualArea()([180, 0]),
    geoAzimuthalEqualArea()([-180, 0]),
    geoAzimuthalEquidistant()([180, 0])
  ]) {
    assert(Math.abs(p[0]) < Infinity);
    assert(Math.abs(p[1]) < Infinity);
  }
});
