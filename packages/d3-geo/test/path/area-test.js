import assert from "assert";
import {geoEquirectangular, geoPath} from "../../src/index.js";

const equirectangular = geoEquirectangular()
    .scale(900 / Math.PI)
    .precision(0);

function testArea(projection, object) {
  return geoPath()
      .projection(projection)
      .area(object);
}

it("geoPath.area(…) of a polygon with no holes", () => {
  assert.strictEqual(testArea(equirectangular, {
    type: "Polygon",
    coordinates: [[[100, 0], [100, 1], [101, 1], [101, 0], [100, 0]]]
  }), 25);
});

it("geoPath.area(…) of a polygon with holes", () => {
  assert.strictEqual(testArea(equirectangular, {
    type: "Polygon",
    coordinates: [[[100, 0], [100, 1], [101, 1], [101, 0], [100, 0]], [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]]
  }), 16);
});

it("geoPath.area(…) of a sphere", () => {
  assert.strictEqual(testArea(equirectangular, {
    type: "Sphere",
  }), 1620000);
});
