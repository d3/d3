import assert from "assert";
import {geoEquirectangular, geoPath} from "../../src/index.js";
import {assertInDelta} from "../asserts.js";

const equirectangular = geoEquirectangular()
    .scale(900 / Math.PI)
    .precision(0);

function testCentroid(projection, object) {
  return geoPath()
      .projection(projection)
      .centroid(object);
}

it("geoPath.centroid(…) of a point", () => {
  assert.deepStrictEqual(testCentroid(equirectangular, {type: "Point", coordinates: [0, 0]}), [480, 250]);
});

it("geoPath.centroid(…) of an empty multipoint", () => {
  assert.strictEqual(testCentroid(equirectangular, {type: "MultiPoint", coordinates: []}).every(isNaN), true);
});

it("geoPath.centroid(…) of a singleton multipoint", () => {
  assert.deepStrictEqual(testCentroid(equirectangular, {type: "MultiPoint", coordinates: [[0, 0]]}), [480, 250]);
});

it("geoPath.centroid(…) of a multipoint with two points", () => {
  assert.deepStrictEqual(testCentroid(equirectangular, {type: "MultiPoint", coordinates: [[-122, 37], [-74, 40]]}), [-10, 57.5]);
});

it("geoPath.centroid(…) of an empty linestring", () => {
  assert.strictEqual(testCentroid(equirectangular, {type: "LineString", coordinates: []}).every(isNaN), true);
});

it("geoPath.centroid(…) of a linestring with two points", () => {
  assert.deepStrictEqual(testCentroid(equirectangular, {type: "LineString", coordinates: [[100, 0], [0, 0]]}), [730, 250]);
  assert.deepStrictEqual(testCentroid(equirectangular, {type: "LineString", coordinates: [[0, 0], [100, 0], [101, 0]]}), [732.5, 250]);
});

it("geoPath.centroid(…) of a linestring with two points, one unique", () => {
  assert.deepStrictEqual(testCentroid(equirectangular, {type: "LineString", coordinates: [[-122, 37], [-122, 37]]}), [-130, 65]);
  assert.deepStrictEqual(testCentroid(equirectangular, {type: "LineString", coordinates: [[-74, 40], [-74, 40]]}), [110, 50]);
});

it("geoPath.centroid(…) of a linestring with three points; two unique", () => {
  assert.deepStrictEqual(testCentroid(equirectangular, {type: "LineString", coordinates: [[-122, 37], [-74, 40], [-74, 40]]}), [-10, 57.5]);
});

it("geoPath.centroid(…) of a linestring with three points", () => {
  assertInDelta(testCentroid(equirectangular, {type: "LineString", coordinates: [[-122, 37], [-74, 40], [-100, 0]]}), [17.389135, 103.563545], 1e-6);
});

it("geoPath.centroid(…) of a multilinestring", () => {
  assert.deepStrictEqual(testCentroid(equirectangular, {type: "MultiLineString", coordinates: [[[100, 0], [0, 0]], [[-10, 0], [0, 0]]]}), [705, 250]);
});

it("geoPath.centroid(…) of a single-ring polygon", () => {
  assert.deepStrictEqual(testCentroid(equirectangular, {type: "Polygon", coordinates: [[[100, 0], [100, 1], [101, 1], [101, 0], [100, 0]]]}), [982.5, 247.5]);
});

it("geoPath.centroid(…) of a zero-area polygon", () => {
  assert.deepStrictEqual(testCentroid(equirectangular, {type: "Polygon", coordinates: [[[1, 0], [2, 0], [3, 0], [1, 0]]]}), [490, 250]);
});

it("geoPath.centroid(…) of a polygon with two rings, one with zero area", () => {
  assert.deepStrictEqual(testCentroid(equirectangular, {type: "Polygon", coordinates: [
    [[100,   0], [100,   1], [101,   1], [101,   0], [100, 0]],
    [[100.1, 0], [100.2, 0], [100.3, 0], [100.1, 0]
  ]]}), [982.5, 247.5]);
});

it("geoPath.centroid(…) of a polygon with clockwise exterior and anticlockwise interior", () => {
  assertInDelta(testCentroid(equirectangular, {
    type: "Polygon",
    coordinates: [
      [[-2, -2], [2, -2], [2, 2], [-2, 2], [-2, -2]].reverse(),
      [[ 0, -1], [1, -1], [1, 1], [ 0, 1], [ 0, -1]]
    ]
  }), [479.642857, 250], 1e-6);
});

it("geoPath.centroid(…) of an empty multipolygon", () => {
  assert.strictEqual(testCentroid(equirectangular, {type: "MultiPolygon", coordinates: []}).every(isNaN), true);
});

it("geoPath.centroid(…) of a singleton multipolygon", () => {
  assert.deepStrictEqual(testCentroid(equirectangular, {type: "MultiPolygon", coordinates: [[[[100, 0], [100, 1], [101, 1], [101, 0], [100, 0]]]]}), [982.5, 247.5]);
});

it("geoPath.centroid(…) of a multipolygon with two polygons", () => {
  assert.deepStrictEqual(testCentroid(equirectangular, {type: "MultiPolygon", coordinates: [
    [[[100, 0], [100, 1], [101, 1], [101, 0], [100, 0]]],
    [[[0, 0], [1, 0], [1, -1], [0, -1], [0, 0]]]
  ]}), [732.5, 250]);
});

it("geoPath.centroid(…) of a multipolygon with two polygons, one zero area", () => {
  assert.deepStrictEqual(testCentroid(equirectangular, {type: "MultiPolygon", coordinates: [
    [[[100, 0], [100, 1], [101, 1], [101, 0], [100, 0]]],
    [[[0, 0], [1, 0], [2, 0], [0, 0]]]
  ]}), [982.5, 247.5]);
});

it("geoPath.centroid(…) of a geometry collection with a single point", () => {
  assert.deepStrictEqual(testCentroid(equirectangular, {type: "GeometryCollection", geometries: [{type: "Point", coordinates: [0, 0]}]}), [480, 250]);
});

it("geoPath.centroid(…) of a geometry collection with a point and a linestring", () => {
  assert.deepStrictEqual(testCentroid(equirectangular, {type: "GeometryCollection", geometries: [
    {type: "LineString", coordinates: [[179, 0], [180, 0]]},
    {type: "Point", coordinates: [0, 0]}
  ]}), [1377.5, 250]);
});

it("geoPath.centroid(…) of a geometry collection with a point, linestring and polygon", () => {
  assert.deepStrictEqual(testCentroid(equirectangular, {type: "GeometryCollection", geometries: [
    {type: "Polygon", coordinates: [[[-180, 0], [-180, 1], [-179, 1], [-179, 0], [-180, 0]]]},
    {type: "LineString", coordinates: [[179, 0], [180, 0]]},
    {type: "Point", coordinates: [0, 0]}
  ]}), [-417.5, 247.5]);
});

it("geoPath.centroid(…) of a feature collection with a point", () => {
  assert.deepStrictEqual(testCentroid(equirectangular, {type: "FeatureCollection", features: [{type: "Feature", geometry: {type: "Point", coordinates: [0, 0]}}]}), [480, 250]);
});

it("geoPath.centroid(…) of a feature collection with a point and a line string", () => {
  assert.deepStrictEqual(testCentroid(equirectangular, {type: "FeatureCollection", features: [
    {type: "Feature", geometry: {type: "LineString", coordinates: [[179, 0], [180, 0]]}},
    {type: "Feature", geometry: {type: "Point", coordinates: [0, 0]}}
  ]}), [1377.5, 250]);
});

it("geoPath.centroid(…) of a feature collection with a point, line string and polygon", () => {
  assert.deepStrictEqual(testCentroid(equirectangular, {type: "FeatureCollection", features: [
    {type: "Feature", geometry: {type: "Polygon", coordinates: [[[-180, 0], [-180, 1], [-179, 1], [-179, 0], [-180, 0]]]}},
    {type: "Feature", geometry: {type: "LineString", coordinates: [[179, 0], [180, 0]]}},
    {type: "Feature", geometry: {type: "Point", coordinates: [0, 0]}}
  ]}), [-417.5, 247.5]);
});

it("geoPath.centroid(…) of a sphere", () => {
  assert.deepStrictEqual(testCentroid(equirectangular, {type: "Sphere"}), [480, 250]);
});
