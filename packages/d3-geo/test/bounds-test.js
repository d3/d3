import assert from "assert";
import {geoBounds} from "../src/index.js";
import {assertInDelta} from "./asserts.js";

it("bounds: Feature", () => {
  assert.deepStrictEqual(geoBounds({
    type: "Feature",
    geometry: {
      type: "MultiPoint",
      coordinates: [[-123, 39], [-122, 38]]
    }
  }), [[-123, 38], [-122, 39]]);
});

it("bounds: FeatureCollection", () => {
  assert.deepStrictEqual(geoBounds({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-123, 39]
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-122, 38]
        }
      }
    ]
  }), [[-123, 38], [-122, 39]]);
});

it("bounds: GeometryCollection", () => {
  assert.deepStrictEqual(geoBounds({
    type: "GeometryCollection",
    geometries: [
      {
        type: "Point",
        coordinates: [-123, 39]
      },
      {
        type: "Point",
        coordinates: [-122, 38]
      }
    ]
  }), [[-123, 38], [-122, 39]]);
});

it("bounds: LineString - simple", () => {
  assert.deepStrictEqual(geoBounds({
    type: "LineString",
    coordinates: [[-123, 39], [-122, 38]]
  }), [[-123, 38], [-122, 39]]);
});

it("bounds: LineString - symmetry", () => {
  assert.deepStrictEqual(geoBounds({
    type: "LineString",
    coordinates: [[-30, -20], [130, 40]]
  }), geoBounds({
    type: "LineString",
    coordinates: [[-30, -20], [130, 40]].reverse()
  }));
});

it("bounds: LineString - containing coincident points", () => {
  assert.deepStrictEqual(geoBounds({
    type: "LineString",
    coordinates: [[-123, 39], [-122, 38], [-122, 38]]
  }), [[-123, 38], [-122, 39]]);
});

it("bounds: LineString - meridian", () => {
  assert.deepStrictEqual(geoBounds({
    type: "LineString",
    coordinates: [[0, 0], [0, 1], [0, 60]]
  }), [[0, 0], [0, 60]]);
});

it("bounds: LineString - equator", () => {
  assert.deepStrictEqual(geoBounds({
    type: "LineString",
    coordinates: [[0, 0], [1, 0], [60, 0]]
  }), [[0, 0], [60, 0]]);
});

it("bounds: LineString - containing an inflection point in the Northern hemisphere", () => {
  assertInDelta(geoBounds({
    type: "LineString",
    coordinates: [[-45, 60], [45, 60]]
  }), [[-45, 60], [45, 67.792345]], 1e-6);
});

it("bounds: LineString - containing an inflection point in the Southern hemisphere", () => {
  assertInDelta(geoBounds({
    type: "LineString",
    coordinates: [[-45, -60], [45, -60]]
  }), [[-45, -67.792345], [45, -60]], 1e-6);
});

it("bounds: MultiLineString", () => {
  assert.deepStrictEqual(geoBounds({
    type: "MultiLineString",
    coordinates: [[[-123, 39], [-122, 38]]]
  }), [[-123, 38], [-122, 39]]);
});

it("bounds: MultiPoint - simple", () => {
  assert.deepStrictEqual(geoBounds({
    type: "MultiPoint",
    coordinates: [[-123, 39], [-122, 38]]
  }), [[-123, 38], [-122, 39]]);
});

it("bounds: MultiPoint - two points near antimeridian", () => {
  assert.deepStrictEqual(geoBounds({
    type: "MultiPoint",
    coordinates: [[-179, 39], [179, 38]]
  }), [[179, 38], [-179, 39]]);
});

it("bounds: MultiPoint - two points near antimeridian, two points near primary meridian", () => {
  assert.deepStrictEqual(geoBounds({
    type: "MultiPoint",
    coordinates: [[-179, 39], [179, 38], [-1, 0], [1, 0]]
  }), [[-1, 0], [-179, 39]]);
});

it("bounds: MultiPoint - two points near primary meridian, two points near antimeridian", () => {
  assert.deepStrictEqual(geoBounds({
    type: "MultiPoint",
    coordinates: [[-1, 0], [1, 0], [-179, 39], [179, 38]]
  }), [[-1, 0], [-179, 39]]);
});

it("bounds: MultiPoint - four mixed points near primary meridian and antimeridian", () => {
  assert.deepStrictEqual(geoBounds({
    type: "MultiPoint",
    coordinates: [[-1, 0], [-179, 39], [1, 0], [179, 38]]
  }), [[-1, 0], [-179, 39]]);
});

it("bounds: MultiPoint - three points near antimeridian", () => {
  assert.deepStrictEqual(geoBounds({
    type: "MultiPoint",
    coordinates: [[178, 38], [179, 39], [-179, 37]]
  }), [[178, 37], [-179, 39]]);
});

it("bounds: MultiPoint - various points near antimeridian", () => {
  assert.deepStrictEqual(geoBounds({
    type: "MultiPoint",
    coordinates: [[-179, 39], [-179, 38], [178, 39], [-178, 38]]
  }), [[178, 38], [-178, 39]]);
});

it("bounds: MultiPolygon", () => {
  assertInDelta(geoBounds({
    type: "MultiPolygon",
    coordinates: [
      [[[-123, 39], [-122, 39], [-122, 38], [-123, 39]],
      [[10, 20], [20, 20], [20, 10], [10, 10], [10, 20]]]
    ]
  }), [[-123, 10], [20, 39.001067]], 1e-6);
});

it("bounds: Point", () => {
  assert.deepStrictEqual(geoBounds({
    type: "Point",
    coordinates: [-123, 39]
  }), [[-123, 39], [-123, 39]]);
});

it("bounds: Polygon - simple", () => {
  assertInDelta(geoBounds({
    type: "Polygon",
    coordinates: [[[-123, 39], [-122, 39], [-122, 38], [-123, 39]]]
  }), [[-123, 38], [-122, 39.001067]], 1e-6);
});

it("bounds: Polygon - larger than a hemisphere, small, counter-clockwise", () => {
  assert.deepStrictEqual(geoBounds({
    type: "Polygon",
    coordinates: [[[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]]]
  }), [[-180, -90], [180, 90]]);
});

it("bounds: Polygon - larger than a hemisphere, large lat-lon rectangle", () => {
  assertInDelta(geoBounds({
    type: "Polygon",
    coordinates: [[[-170, 80], [0, 80], [170, 80], [170, -80], [0, -80], [-170, -80], [-170, 80]]]
  }), [[-170, -89.119552], [170, 89.119552]], 1e-6);
});

it("bounds: Polygon - larger than a hemisphere, South pole", () => {
  assertInDelta(geoBounds({
    type: "Polygon",
    coordinates: [[[10, 80], [170, 80], [-170, 80], [-10, 80], [10, 80]]]
  }), [[-180, -90], [180, 88.246216]], 1e-6);
});

it("bounds: Polygon - larger than a hemisphere, excluding both poles", () => {
  assertInDelta(geoBounds({
    type: "Polygon",
    coordinates: [[[10, 80], [170, 80], [-170, 80], [-10, 80], [-10, 0], [-10, -80], [-170, -80], [170, -80], [10, -80], [10, 0], [10, 80]]]
  }), [[10, -88.246216], [-10, 88.246216]], 1e-6);
});

it("bounds: Polygon - South pole", () => {
  assert.deepStrictEqual(geoBounds({
    type: "Polygon",
    coordinates: [[[-60, -80], [60, -80], [180, -80], [-60, -80]]]
  }), [[-180, -90], [180, -80]]);
});

it("bounds: Polygon - ring", () => {
  assertInDelta(geoBounds({
    type: "Polygon",
    coordinates: [
      [[-60, -80], [60, -80], [180, -80], [-60, -80]],
      [[-60, -89], [180, -89], [60, -89], [-60, -89]]
    ]
  }), [[-180, -89.499961], [180, -80]], 1e-6);
});

it("bounds: Sphere", () => {
  assert.deepStrictEqual(geoBounds({
    type: "Sphere"
  }), [[-180, -90], [180, 90]]);
});

it("bounds: NestedCollection", () => {
  assert.deepStrictEqual(geoBounds({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "GeometryCollection",
          geometries: [
            {
              type: "Point",
              coordinates: [-120,47]
            },
            {
              type: "Point",
              coordinates: [-119,46]
            }
          ]
        }
      }
    ]
  }), [[-120,46], [-119,47]]);
});

it("bounds: null geometries - Feature", () => {
  const b = geoBounds({type: "Feature", geometry: null});
  assert(isNaN(b[0][0]));
  assert(isNaN(b[0][1]));
  assert(isNaN(b[1][0]));
  assert(isNaN(b[1][1]));
});

it("bounds: null geometries - MultiPoint", () => {
  const b = geoBounds({type: "MultiPoint", coordinates: []});
  assert(isNaN(b[0][0]));
  assert(isNaN(b[0][1]));
  assert(isNaN(b[1][0]));
  assert(isNaN(b[1][1]));
});

it("bounds: null geometries - MultiLineString", () => {
  const b = geoBounds({type: "MultiLineString", coordinates: []});
  assert(isNaN(b[0][0]));
  assert(isNaN(b[0][1]));
  assert(isNaN(b[1][0]));
  assert(isNaN(b[1][1]));
});

it("bounds: null geometries - MultiPolygon", () => {
  const b = geoBounds({type: "MultiPolygon", coordinates: []});
  assert(isNaN(b[0][0]));
  assert(isNaN(b[0][1]));
  assert(isNaN(b[1][0]));
  assert(isNaN(b[1][1]));
});
