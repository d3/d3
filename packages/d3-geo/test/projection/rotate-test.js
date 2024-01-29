import {geoMercator, geoPath} from "../../src/index.js";
import {assertPathEqual} from "../asserts.js";

it("a rotation of a degenerate polygon should not break", () => {
  const projection = geoMercator().rotate([-134.300, 25.776]).scale(750).translate([0, 0]);
  assertPathEqual(geoPath(projection)({
    "type": "Polygon",
    "coordinates": [
      [
        [125.67351590459046, -14.17673705310531],
        [125.67351590459046, -14.173276873687367],
        [125.67351590459046, -14.173276873687367],
        [125.67351590459046, -14.169816694269425],
        [125.67351590459046, -14.17673705310531]
      ]
    ]
  }), "M-111.644162,-149.157654L-111.647235,-149.203744L-111.647235,-149.203744L-111.650307,-149.249835Z");
});
