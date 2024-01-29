import assert from "assert";
import {geoEquirectangular, geoPath} from "../../src/index.js";

const equirectangular = geoEquirectangular()
    .scale(900 / Math.PI)
    .precision(0);

function testBounds(projection, object) {
  return geoPath()
      .projection(projection)
      .bounds(object);
}

it("geoPath.bounds(…) of a polygon with no holes", () => {
  assert.deepStrictEqual(testBounds(equirectangular, {
    type: "Polygon",
    coordinates: [[[100, 0], [100, 1], [101, 1], [101, 0], [100, 0]]]
  }), [[980, 245], [985, 250]]);
});

it("geoPath.bounds(…) of a polygon with holes", () => {
  assert.deepStrictEqual(testBounds(equirectangular, {
    type: "Polygon",
    coordinates: [[[100, 0], [100, 1], [101, 1], [101, 0], [100, 0]], [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]]
  }), [[980, 245], [985, 250]]);
});

it("geoPath.bounds(…) of a sphere", () => {
  assert.deepStrictEqual(testBounds(equirectangular, {
    type: "Sphere"
  }), [[-420, -200], [1380, 700]]);
});
