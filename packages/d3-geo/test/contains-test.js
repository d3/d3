import assert from "assert";
import {geoCircle, geoContains, geoInterpolate} from "../src/index.js";

it("a sphere contains any point", () => {
  assert.strictEqual(geoContains({type: "Sphere"}, [0, 0]), true);
});

it("a point contains itself (and not some other point)", () => {
  assert.strictEqual(geoContains({type: "Point", coordinates: [0, 0]}, [0, 0]), true);
  assert.strictEqual(geoContains({type: "Point", coordinates: [1, 2]}, [1, 2]), true);
  assert.strictEqual(geoContains({type: "Point", coordinates: [0, 0]}, [0, 1]), false);
  assert.strictEqual(geoContains({type: "Point", coordinates: [1, 1]}, [1, 0]), false);
});

it("a MultiPoint contains any of its points", () => {
  assert.strictEqual(geoContains({type: "MultiPoint", coordinates: [[0, 0], [1,2]]}, [0, 0]), true);
  assert.strictEqual(geoContains({type: "MultiPoint", coordinates: [[0, 0], [1,2]]}, [1, 2]), true);
  assert.strictEqual(geoContains({type: "MultiPoint", coordinates: [[0, 0], [1,2]]}, [1, 3]), false);
});

it("a LineString contains any point on the Great Circle path", () => {
  assert.strictEqual(geoContains({type: "LineString", coordinates: [[0, 0], [1,2]]}, [0, 0]), true);
  assert.strictEqual(geoContains({type: "LineString", coordinates: [[0, 0], [1,2]]}, [1, 2]), true);
  assert.strictEqual(geoContains({type: "LineString", coordinates: [[0, 0], [1,2]]}, geoInterpolate([0, 0], [1,2])(0.3)), true);
  assert.strictEqual(geoContains({type: "LineString", coordinates: [[0, 0], [1,2]]}, geoInterpolate([0, 0], [1,2])(1.3)), false);
  assert.strictEqual(geoContains({type: "LineString", coordinates: [[0, 0], [1,2]]}, geoInterpolate([0, 0], [1,2])(-0.3)), false);
});

it("a LineString with 2+ points contains those points", () => {
  const points = [[0, 0], [1,2], [3, 4], [5, 6]];
  const feature = {type: "LineString", coordinates: points};
  points.forEach(point => {
    assert.strictEqual(geoContains(feature, point), true);
  });
});

it("a LineString contains epsilon-distant points", () => {
  const epsilon = 1e-6;
  const line = [[0, 0], [0, 10], [10, 10], [10, 0]];
  const points = [[0, 5], [epsilon * 1, 5], [0, epsilon], [epsilon * 1, epsilon]];
  points.forEach(point => {
    assert(geoContains({type:"LineString", coordinates: line}, point));
  });
});

it("a LineString does not contain 10*epsilon-distant points", () => {
  const epsilon = 1e-6;
  const line = [[0, 0], [0, 10], [10, 10], [10, 0]];
  const points = [[epsilon * 10, 5], [epsilon * 10, epsilon]];
  points.forEach(point => {
    assert(!geoContains({type:"LineString", coordinates: line}, point));
  });
});

it("a MultiLineString contains any point on one of its components", () => {
  assert.strictEqual(geoContains({type: "MultiLineString", coordinates: [[[0, 0], [1,2]], [[2, 3], [4,5]]]}, [2, 3]), true);
  assert.strictEqual(geoContains({type: "MultiLineString", coordinates: [[[0, 0], [1,2]], [[2, 3], [4,5]]]}, [5, 6]), false);
});

it("a Polygon contains a point", () => {
  const polygon = geoCircle().radius(60)();
  assert.strictEqual(geoContains(polygon, [1, 1]), true);
  assert.strictEqual(geoContains(polygon, [-180, 0]), false);
});

it("a Polygon with a hole doesn't contain a point", () => {
  const outer = geoCircle().radius(60)().coordinates[0],
      inner = geoCircle().radius(3)().coordinates[0],
      polygon = {type:"Polygon", coordinates: [outer, inner]};
  assert.strictEqual(geoContains(polygon, [1, 1]), false);
  assert.strictEqual(geoContains(polygon, [5, 0]), true);
  assert.strictEqual(geoContains(polygon, [65, 0]), false);
});

it("a MultiPolygon contains a point", () => {
  const p1 = geoCircle().radius(6)().coordinates,
      p2 = geoCircle().radius(6).center([90,0])().coordinates,
      polygon = {type:"MultiPolygon", coordinates: [p1, p2]};
  assert.strictEqual(geoContains(polygon, [1, 0]), true);
  assert.strictEqual(geoContains(polygon, [90, 1]), true);
  assert.strictEqual(geoContains(polygon, [90, 45]), false);
});

it("a GeometryCollection contains a point", () => {
  const collection = {
    type: "GeometryCollection", geometries: [
      {type: "GeometryCollection", geometries: [{type: "LineString", coordinates: [[-45, 0], [0, 0]]}]},
      {type: "LineString", coordinates: [[0, 0], [45, 0]]}
    ]
  };
  assert.strictEqual(geoContains(collection, [-45, 0]), true);
  assert.strictEqual(geoContains(collection, [45, 0]), true);
  assert.strictEqual(geoContains(collection, [12, 25]), false);
});

it("a Feature contains a point", () => {
  const feature = {
    type: "Feature", geometry: {
      type: "LineString", coordinates: [[0, 0], [45, 0]]
    }
  };
  assert.strictEqual(geoContains(feature, [45, 0]), true);
  assert.strictEqual(geoContains(feature, [12, 25]), false);
});

it("a FeatureCollection contains a point", () => {
  const feature1 = {
    type: "Feature", geometry: {
      type: "LineString", coordinates: [[0, 0], [45, 0]]
    }
  },
  feature2 = {
    type: "Feature", geometry: {
      type: "LineString", coordinates: [[-45, 0], [0, 0]]
    }
  },
  featureCollection = {
    type: "FeatureCollection",
    features: [ feature1, feature2 ]
  };
  assert.strictEqual(geoContains(featureCollection, [45, 0]), true);
  assert.strictEqual(geoContains(featureCollection, [-45, 0]), true);
  assert.strictEqual(geoContains(featureCollection, [12, 25]), false);
});

it("null contains nothing", () => {
  assert.strictEqual(geoContains(null, [0, 0]), false);
});

