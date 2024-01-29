import {geoEquirectangular, geoPath} from "../../src/index.js";
import {assertPathEqual} from "../asserts.js";

const equirectangular = geoEquirectangular()
    .scale(900 / Math.PI)
    .precision(0);

function testPath(projection, object) {
  return geoPath()
      .projection(projection) (object);
}

it("geoPath(Point) renders a point", () => {
  assertPathEqual(testPath(equirectangular, {
    type: "Point",
    coordinates: [-63, 18]
  }), "M165,160m0,4.500000a4.500000,4.500000 0 1,1 0,-9a4.500000,4.500000 0 1,1 0,9z");
});

it("geoPath.pointRadius(radius)(Point) renders a point of the given radius", () => {
  assertPathEqual(geoPath()
      .projection(equirectangular)
      .pointRadius(10)({
    type: "Point",
    coordinates: [-63, 18]
  }), "M165,160m0,10a10,10 0 1,1 0,-20a10,10 0 1,1 0,20z");
});

it("geoPath(MultiPoint) renders a point", () => {
  assertPathEqual(testPath(equirectangular, {
    type: "MultiPoint",
    coordinates: [[-63, 18], [-62, 18], [-62, 17]]
  }), "M165,160m0,4.500000a4.500000,4.500000 0 1,1 0,-9a4.500000,4.500000 0 1,1 0,9zM170,160m0,4.500000a4.500000,4.500000 0 1,1 0,-9a4.500000,4.500000 0 1,1 0,9zM170,165m0,4.500000a4.500000,4.500000 0 1,1 0,-9a4.500000,4.500000 0 1,1 0,9z");
});

it("geoPath(LineString) renders a line string", () => {
  assertPathEqual(testPath(equirectangular, {
    type: "LineString",
    coordinates: [[-63, 18], [-62, 18], [-62, 17]]
  }), "M165,160L170,160L170,165");
});

it("geoPath(Polygon) renders a polygon", () => {
  assertPathEqual(testPath(equirectangular, {
    type: "Polygon",
    coordinates: [[[-63, 18], [-62, 18], [-62, 17], [-63, 18]]]
  }), "M165,160L170,160L170,165Z");
});

it("geoPath(GeometryCollection) renders a geometry collection", () => {
  assertPathEqual(testPath(equirectangular, {
    type: "GeometryCollection",
    geometries: [{
      type: "Polygon",
      coordinates: [[[-63, 18], [-62, 18], [-62, 17], [-63, 18]]]
    }]
  }), "M165,160L170,160L170,165Z");
});

it("geoPath(Feature) renders a feature", () => {
  assertPathEqual(testPath(equirectangular, {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [[[-63, 18], [-62, 18], [-62, 17], [-63, 18]]]
    }
  }), "M165,160L170,160L170,165Z");
});

it("geoPath(FeatureCollection) renders a feature collection", () => {
  assertPathEqual(testPath(equirectangular, {
    type: "FeatureCollection",
    features: [{
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [[[-63, 18], [-62, 18], [-62, 17], [-63, 18]]]
      }
    }]
  }), "M165,160L170,160L170,165Z");
});

it("geoPath(LineString) then geoPath(Point) does not treat the point as part of a line", () => {
  const path = geoPath().projection(equirectangular);
  assertPathEqual(path({
    type: "LineString",
    coordinates: [[-63, 18], [-62, 18], [-62, 17]]
  }), "M165,160L170,160L170,165");
  assertPathEqual(path({
    type: "Point",
    coordinates: [-63, 18]
  }), "M165,160m0,4.500000a4.500000,4.500000 0 1,1 0,-9a4.500000,4.500000 0 1,1 0,9z");
});
