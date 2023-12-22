import assert from "assert";
import {readFileSync} from "fs";
import {range} from "d3-array";
import {geoCentroid, geoCircle} from "../src/index.js";
import {assertInDelta} from "./asserts.js";

it("the centroid of a point is itself", () => {
  assertInDelta(geoCentroid({type: "Point", coordinates: [0, 0]}), [0, 0], 1e-6);
  assertInDelta(geoCentroid({type: "Point", coordinates: [1, 1]}), [1, 1], 1e-6);
  assertInDelta(geoCentroid({type: "Point", coordinates: [2, 3]}), [2, 3], 1e-6);
  assertInDelta(geoCentroid({type: "Point", coordinates: [-4, -5]}), [-4, -5], 1e-6);
});

it("the centroid of a set of points is the (spherical) average of its constituent members", () => {
  assertInDelta(geoCentroid({type: "GeometryCollection", geometries: [{type: "Point", coordinates: [0, 0]}, {type: "Point", coordinates: [1, 2]}]}), [0.499847, 1.000038], 1e-6);
  assertInDelta(geoCentroid({type: "MultiPoint", coordinates: [[0, 0], [1, 2]]}), [0.499847, 1.000038], 1e-6);
  assertInDelta(geoCentroid({type: "MultiPoint", coordinates: [[179, 0], [-179, 0]]}), [180, 0], 1e-6);
});

it("the centroid of a set of points and their antipodes is ambiguous", () => {
  assert(geoCentroid({type: "MultiPoint", coordinates: [[0, 0], [180, 0]]}).every(isNaN));
  assert(geoCentroid({type: "MultiPoint", coordinates: [[0, 0], [90, 0], [180, 0], [-90, 0]]}).every(isNaN));
  assert(geoCentroid({type: "MultiPoint", coordinates: [[0, 0], [0, 90], [180, 0], [0, -90]]}).every(isNaN));
});

it("the centroid of the empty set of points is ambiguous", () => {
  assert(geoCentroid({type: "MultiPoint", coordinates: []}).every(isNaN));
});

it("the centroid of a line string is the (spherical) average of its constituent great arc segments", () => {
  assertInDelta(geoCentroid({type: "LineString", coordinates: [[0, 0], [1, 0]]}), [0.5, 0], 1e-6);
  assertInDelta(geoCentroid({type: "LineString", coordinates: [[0, 0], [0, 90]]}), [0, 45], 1e-6);
  assertInDelta(geoCentroid({type: "LineString", coordinates: [[0, 0], [0, 45], [0, 90]]}), [0, 45], 1e-6);
  assertInDelta(geoCentroid({type: "LineString", coordinates: [[-1, -1], [1, 1]]}), [0, 0], 1e-6);
  assertInDelta(geoCentroid({type: "LineString", coordinates: [[-60, -1], [60, 1]]}), [0, 0], 1e-6);
  assertInDelta(geoCentroid({type: "LineString", coordinates: [[179, -1], [-179, 1]]}), [180, 0], 1e-6);
  assertInDelta(geoCentroid({type: "LineString", coordinates: [[-179, 0], [0, 0], [179, 0]]}), [0, 0], 1e-6);
  assertInDelta(geoCentroid({type: "LineString", coordinates: [[-180, -90], [0, 0], [0, 90]]}), [0, 0], 1e-6);
});

it("the centroid of a great arc from a point to its antipode is ambiguous", () => {
  assert(geoCentroid({type: "LineString", coordinates: [[180, 0], [0, 0]]}).every(isNaN));
  assert(geoCentroid({type: "MultiLineString", coordinates: [[[0, -90], [0, 90]]]}).every(isNaN));
});

it("the centroid of a set of line strings is the (spherical) average of its constituent great arc segments", () => {
  assertInDelta(geoCentroid({type: "MultiLineString", coordinates: [[[0, 0], [0, 2]]]}), [0, 1], 1e-6);
});

it("a line of zero length is treated as points", () => {
  assertInDelta(geoCentroid({type: "LineString", coordinates: [[1, 1], [1, 1]]}), [1, 1], 1e-6);
  assertInDelta(geoCentroid({type: "GeometryCollection", geometries: [{type: "Point", coordinates: [0, 0]}, {type: "LineString", coordinates: [[1, 2], [1, 2]]}]}), [0.666534, 1.333408], 1e-6);
});

it("an empty polygon with non-zero extent is treated as a line", () => {
  assertInDelta(geoCentroid({type: "Polygon", coordinates: [[[1, 1], [2, 1], [3, 1], [2, 1], [1, 1]]]}), [2, 1.000076], 1e-6);
  assertInDelta(geoCentroid({type: "GeometryCollection", geometries: [{type: "Point", coordinates: [0, 0]}, {type: "Polygon", coordinates: [[[1, 2], [1, 2], [1, 2], [1, 2]]]}]}), [0.799907, 1.600077], 1e-6);
});

it("an empty polygon with zero extent is treated as a point", () => {
  assertInDelta(geoCentroid({type: "Polygon", coordinates: [[[1, 1], [1, 1], [1, 1], [1, 1]]]}), [1, 1], 1e-6);
  assertInDelta(geoCentroid({type: "GeometryCollection", geometries: [{type: "Point", coordinates: [0, 0]}, {type: "Polygon", coordinates: [[[1, 2], [1, 2], [1, 2], [1, 2]]]}]}), [0.799907, 1.600077], 1e-6);
});

it("the centroid of the equator is ambiguous", () => {
  assert(geoCentroid({type: "LineString", coordinates: [[0, 0], [120, 0], [-120, 0], [0, 0]]}).every(isNaN));
});

it("the centroid of a polygon is the (spherical) average of its surface", () => {
  assertInDelta(geoCentroid({type: "Polygon", coordinates: [[[0, -90], [0, 0], [0, 90], [1, 0], [0, -90]]]}), [0.5, 0], 1e-6);
  assertInDelta(geoCentroid({type: "Polygon", coordinates: [range(-180, 180 + 1 / 2, 1).map(function(x) { return [x, -60]; })]})[1], -90, 1e-6);
  assertInDelta(geoCentroid({type: "Polygon", coordinates: [[[0, -10], [0, 10], [10, 10], [10, -10], [0, -10]]]}), [5, 0], 1e-6);
});

it("the centroid of a set of polygons is the (spherical) average of its surface", () => {
  const circle = geoCircle();
  assertInDelta(geoCentroid({
    type: "MultiPolygon",
    coordinates: [
      circle.radius(45).center([90, 0])().coordinates,
      circle.radius(60).center([-90, 0])().coordinates
    ]
  }), [-90, 0], 1e-6);
});

it("the centroid of a lune is the (spherical) average of its surface", () => {
  assertInDelta(geoCentroid({type: "Polygon", coordinates: [[[0, -90], [0, 0], [0, 90], [1, 0], [0, -90]]]}), [0.5, 0], 1e-6);
});

it("the centroid of a small circle is its center: 5°", () => {
  assertInDelta(geoCentroid(geoCircle().radius(5).center([30, 45])()), [30, 45], 1e-6);
});

it("the centroid of a small circle is its center: 135°", () => {
  assertInDelta(geoCentroid(geoCircle().radius(135).center([30, 45])()), [30, 45], 1e-6);
});

it("the centroid of a small circle is its center: South Pole", () => {
  assert.strictEqual(geoCentroid({type: "Polygon", coordinates: [range(-180, 180 + 1 / 2, 1).map(function(x) { return [x, -60]; })]})[1], -90);
});

it("the centroid of a small circle is its center: equator", () => {
  assertInDelta(geoCentroid({type: "Polygon", coordinates: [[[0, -10], [0, 10], [10, 10], [10, -10], [0, -10]]]}), [5, 0], 1e-6);
});

it("the centroid of a small circle is its center: equator with coincident points", () => {
  assertInDelta(geoCentroid({type: "Polygon", coordinates: [[[0, -10], [0, 10], [0, 10], [10, 10], [10, -10], [0, -10]]]}), [5, 0], 1e-6);
});

it("the centroid of a small circle is its center: other", () => {
  assertInDelta(geoCentroid({type: "Polygon", coordinates: [[[-180, 0], [-180, 10], [-179, 10], [-179, 0], [-180, 0]]]}), [-179.5, 4.987448], 1e-6);
});

it("the centroid of a small circle is its center: concentric rings", () => {
  const circle = geoCircle().center([0, 45]),
      coordinates = circle.radius(60)().coordinates;
  coordinates.push(circle.radius(45)().coordinates[0].reverse());
  assertInDelta(geoCentroid({type: "Polygon", coordinates: coordinates}), [0, 45], 1e-6);
});

it("the centroid of a spherical square on the equator", () => {
  assertInDelta(geoCentroid({type: "Polygon", coordinates: [[[0, -10], [0, 10], [10, 10], [10, -10], [0, -10]]]}), [5, 0], 1e-6);
});

it("the centroid of a spherical square touching the antimeridian", () => {
  assertInDelta(geoCentroid({type: "Polygon", coordinates: [[[-180, 0], [-180, 10], [-179, 10], [-179, 0], [-180, 0]]]}), [-179.5, 4.987448], 1e-6);
});

it("concentric rings", () => {
  const circle = geoCircle().center([0, 45]),
      coordinates = circle.radius(60)().coordinates;
  coordinates.push(circle.radius(45)().coordinates[0].reverse());
  assertInDelta(geoCentroid({type: "Polygon", coordinates: coordinates}), [0, 45], 1e-6);
});

it("the centroid of a sphere is ambiguous", () => {
  assert(geoCentroid({type: "Sphere"}).every(isNaN));
});

it("the centroid of a feature is the centroid of its constituent geometry", () => {
  assertInDelta(geoCentroid({type: "Feature", geometry: {type: "LineString", coordinates: [[1, 1], [1, 1]]}}), [1, 1], 1e-6);
  assertInDelta(geoCentroid({type: "Feature", geometry: {type: "Point", coordinates: [1, 1]}}), [1, 1], 1e-6);
  assertInDelta(geoCentroid({type: "Feature", geometry: {type: "Polygon", coordinates: [[[0, -90], [0, 0], [0, 90], [1, 0], [0, -90]]]}}), [0.5, 0], 1e-6);
});

it("the centroid of a feature collection is the centroid of its constituent geometry", () => {
  assertInDelta(geoCentroid({type: "FeatureCollection", features: [
    {type: "Feature", geometry: {type: "LineString", coordinates: [[179, 0], [180, 0]]}},
    {type: "Feature", geometry: {type: "Point", coordinates: [0, 0]}}
  ]}), [179.5, 0], 1e-6);
});

it("the centroid of a non-empty line string and a point only considers the line string", () => {
  assertInDelta(geoCentroid({type: "GeometryCollection", geometries: [
    {type: "LineString", coordinates: [[179, 0], [180, 0]]},
    {type: "Point", coordinates: [0, 0]}
  ]}), [179.5, 0], 1e-6);
});

it("the centroid of a non-empty polygon, a non-empty line string and a point only considers the polygon", () => {
  assertInDelta(geoCentroid({type: "GeometryCollection", geometries: [
    {type: "Polygon", coordinates: [[[-180, 0], [-180, 1], [-179, 1], [-179, 0], [-180, 0]]]},
    {type: "LineString", coordinates: [[179, 0], [180, 0]]},
    {type: "Point", coordinates: [0, 0]}
  ]}), [-179.5, 0.500006], 1e-6);
  assertInDelta(geoCentroid({type: "GeometryCollection", geometries: [
    {type: "Point", coordinates: [0, 0]},
    {type: "LineString", coordinates: [[179, 0], [180, 0]]},
    {type: "Polygon", coordinates: [[[-180, 0], [-180, 1], [-179, 1], [-179, 0], [-180, 0]]]}
  ]}), [-179.5, 0.500006], 1e-6);
});

it("the centroid of the sphere and a point is the point", () => {
  assert.deepStrictEqual(geoCentroid({type: "GeometryCollection", geometries: [
    {type: "Sphere"},
    {type: "Point", coordinates: [0, 0]}
  ]}), [0, 0]);
  assert.deepStrictEqual(geoCentroid({type: "GeometryCollection", geometries: [
    {type: "Point", coordinates: [0, 0]},
    {type: "Sphere"}
  ]}), [0, 0]);
});

it("the centroid of a detailed feature is correct", () => {
  const ny = JSON.parse(readFileSync("./test/data/ny.json"));
  assertInDelta(geoCentroid(ny), [-73.93079, 40.69447], 1e-5);
});
