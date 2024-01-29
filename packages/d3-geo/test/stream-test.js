import assert from "assert";
import {geoStream} from "../src/index.js";

it("geoStream(object) ignores unknown types", () => {
  geoStream({type: "Unknown"}, {});
  geoStream({type: "Feature", geometry: {type: "Unknown"}}, {});
  geoStream({type: "FeatureCollection", features: [{type: "Feature", geometry: {type: "Unknown"}}]}, {});
  geoStream({type: "GeometryCollection", geometries: [{type: "Unknown"}]}, {});
});

it("geoStream(object) ignores null geometries", () => {
  geoStream(null, {});
  geoStream({type: "Feature", geometry: null }, {});
  geoStream({type: "FeatureCollection", features: [{type: "Feature", geometry: null }]}, {});
  geoStream({type: "GeometryCollection", geometries: [null]}, {});
});

it("geoStream(object) returns void", () => {
  assert.strictEqual(geoStream({type: "Point", coordinates: [1, 2]}, {point: function() { return true; }}), undefined);
});

it("geoStream(object) allows empty multi-geometries", () => {
  geoStream({type: "MultiPoint", coordinates: []}, {});
  geoStream({type: "MultiLineString", coordinates: []}, {});
  geoStream({type: "MultiPolygon", coordinates: []}, {});
});

it("geoStream(Sphere) ↦ sphere", () => {
  let calls = 0;
  geoStream({type: "Sphere"}, {
    sphere: function() {
      assert.strictEqual(arguments.length, 0);
      assert.strictEqual(++calls, 1);
    }
  });
  assert.strictEqual(calls, 1);
});

it("geoStream(Point) ↦ point", () => {
  let calls = 0, coordinates = 0;
  geoStream({type: "Point", coordinates: [1, 2, 3]}, {
    point: function(x, y, z) {
      assert.strictEqual(arguments.length, 3);
      assert.strictEqual(x, ++coordinates);
      assert.strictEqual(y, ++coordinates);
      assert.strictEqual(z, ++coordinates);
      assert.strictEqual(++calls, 1);
    }
  });
  assert.strictEqual(calls, 1);
});

it("geoStream(MultiPoint) ↦ point*", () => {
  let calls = 0, coordinates = 0;
  geoStream({type: "MultiPoint", coordinates: [[1, 2, 3], [4, 5, 6]]}, {
    point: function(x, y, z) {
      assert.strictEqual(arguments.length, 3);
      assert.strictEqual(x, ++coordinates);
      assert.strictEqual(y, ++coordinates);
      assert.strictEqual(z, ++coordinates);
      assert.strictEqual(1 <= ++calls && calls <= 2, true);
    }
  });
  assert.strictEqual(calls, 2);
});

it("geoStream(LineString) ↦ lineStart, point{2,}, lineEnd", () => {
  let calls = 0, coordinates = 0;
  geoStream({type: "LineString", coordinates: [[1, 2, 3], [4, 5, 6]]}, {
    lineStart: function() {
      assert.strictEqual(arguments.length, 0);
      assert.strictEqual(++calls, 1);
    },
    point: function(x, y, z) {
      assert.strictEqual(arguments.length, 3);
      assert.strictEqual(x, ++coordinates);
      assert.strictEqual(y, ++coordinates);
      assert.strictEqual(z, ++coordinates);
      assert.strictEqual(2 <= ++calls && calls <= 3, true);
    },
    lineEnd: function() {
      assert.strictEqual(arguments.length, 0);
      assert.strictEqual(++calls, 4);
    }
  });
  assert.strictEqual(calls, 4);
});

it("geoStream(MultiLineString) ↦ (lineStart, point{2,}, lineEnd)*", () => {
  let calls = 0, coordinates = 0;
  geoStream({type: "MultiLineString", coordinates: [[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]]]}, {
    lineStart: function() {
      assert.strictEqual(arguments.length, 0);
      assert.strictEqual(++calls === 1 || calls === 5, true);
    },
    point: function(x, y, z) {
      assert.strictEqual(arguments.length, 3);
      assert.strictEqual(x, ++coordinates);
      assert.strictEqual(y, ++coordinates);
      assert.strictEqual(z, ++coordinates);
      assert.strictEqual(2 <= ++calls && calls <= 3 || 6 <= calls && calls <= 7, true);
    },
    lineEnd: function() {
      assert.strictEqual(arguments.length, 0);
      assert.strictEqual(++calls === 4 || calls === 8, true);
    }
  });
  assert.strictEqual(calls, 8);
});

it("geoStream(Polygon) ↦ polygonStart, lineStart, point{2,}, lineEnd, polygonEnd", () => {
  let calls = 0, coordinates = 0;
  geoStream({type: "Polygon", coordinates: [[[1, 2, 3], [4, 5, 6], [1, 2, 3]], [[7, 8, 9], [10, 11, 12], [7, 8, 9]]]}, {
    polygonStart: function() {
      assert.strictEqual(arguments.length, 0);
      assert.strictEqual(++calls === 1, true);
    },
    lineStart: function() {
      assert.strictEqual(arguments.length, 0);
      assert.strictEqual(++calls === 2 || calls === 6, true);
    },
    point: function(x, y, z) {
      assert.strictEqual(arguments.length, 3);
      assert.strictEqual(x, ++coordinates);
      assert.strictEqual(y, ++coordinates);
      assert.strictEqual(z, ++coordinates);
      assert.strictEqual(3 <= ++calls && calls <= 4 || 7 <= calls && calls <= 8, true);
    },
    lineEnd: function() {
      assert.strictEqual(arguments.length, 0);
      assert.strictEqual(++calls === 5 || calls === 9, true);
    },
    polygonEnd: function() {
      assert.strictEqual(arguments.length, 0);
      assert.strictEqual(++calls === 10, true);
    }
  });
  assert.strictEqual(calls, 10);
});

it("geoStream(MultiPolygon) ↦ (polygonStart, lineStart, point{2,}, lineEnd, polygonEnd)*", () => {
  let calls = 0, coordinates = 0;
  geoStream({type: "MultiPolygon", coordinates: [[[[1, 2, 3], [4, 5, 6], [1, 2, 3]]], [[[7, 8, 9], [10, 11, 12], [7, 8, 9]]]]}, {
    polygonStart: function() {
      assert.strictEqual(arguments.length, 0);
      assert.strictEqual(++calls === 1 || calls === 7, true);
    },
    lineStart: function() {
      assert.strictEqual(arguments.length, 0);
      assert.strictEqual(++calls === 2 || calls === 8, true);
    },
    point: function(x, y, z) {
      assert.strictEqual(arguments.length, 3);
      assert.strictEqual(x, ++coordinates);
      assert.strictEqual(y, ++coordinates);
      assert.strictEqual(z, ++coordinates);
      assert.strictEqual(3 <= ++calls && calls <= 4 || 9 <= calls && calls <= 10, true);
    },
    lineEnd: function() {
      assert.strictEqual(arguments.length, 0);
      assert.strictEqual(++calls === 5 || calls === 11, true);
    },
    polygonEnd: function() {
      assert.strictEqual(arguments.length, 0);
      assert.strictEqual(++calls === 6 || calls === 12, true);
    }
  });
  assert.strictEqual(calls, 12);
});

it("geoStream(Feature) ↦ .*", () => {
  let calls = 0, coordinates = 0;
  geoStream({type: "Feature", geometry: {type: "Point", coordinates: [1, 2, 3]}}, {
    point: function(x, y, z) {
      assert.strictEqual(arguments.length, 3);
      assert.strictEqual(x, ++coordinates);
      assert.strictEqual(y, ++coordinates);
      assert.strictEqual(z, ++coordinates);
      assert.strictEqual(++calls, 1);
    }
  });
  assert.strictEqual(calls, 1);
});

it("geoStream(FeatureCollection) ↦ .*", () => {
  let calls = 0, coordinates = 0;
  geoStream({type: "FeatureCollection", features: [{type: "Feature", geometry: {type: "Point", coordinates: [1, 2, 3]}}]}, {
    point: function(x, y, z) {
      assert.strictEqual(arguments.length, 3);
      assert.strictEqual(x, ++coordinates);
      assert.strictEqual(y, ++coordinates);
      assert.strictEqual(z, ++coordinates);
      assert.strictEqual(++calls, 1);
    }
  });
  assert.strictEqual(calls, 1);
});

it("geoStream(GeometryCollection) ↦ .*", () => {
  let calls = 0, coordinates = 0;
  geoStream({type: "GeometryCollection", geometries: [{type: "Point", coordinates: [1, 2, 3]}]}, {
    point: function(x, y, z) {
      assert.strictEqual(arguments.length, 3);
      assert.strictEqual(x, ++coordinates);
      assert.strictEqual(y, ++coordinates);
      assert.strictEqual(z, ++coordinates);
      assert.strictEqual(++calls, 1);
    }
  });
  assert.strictEqual(calls, 1);
});
