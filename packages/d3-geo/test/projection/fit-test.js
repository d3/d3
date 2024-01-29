import assert from "assert";
import {readFileSync} from "fs";
import {feature} from "topojson-client";
import {geoAlbersUsa, geoAzimuthalEqualArea, geoAzimuthalEquidistant, geoConicConformal, geoConicEqualArea, geoConicEquidistant, geoEquirectangular, geoGnomonic, geoMercator, geoOrthographic, geoProjection, geoStereographic, geoTransverseMercator} from "../../src/index.js";
import {assertInDelta} from "../asserts.js";

const usTopo = JSON.parse(readFileSync("./test/data/us-10m.json"));
const us = feature(usTopo, usTopo.objects.land);
const worldTopo = JSON.parse(readFileSync("node_modules/world-atlas/world/50m.json"));
const world = feature(worldTopo, worldTopo.objects.land);

it("projection.fitExtent(…) sphere equirectangular", () => {
  const projection = geoEquirectangular();
  projection.fitExtent([[50, 50], [950, 950]], {type: "Sphere"});
  assertInDelta(projection.scale(), 900 / (2 * Math.PI), 1e-6);
  assertInDelta(projection.translate(), [500, 500], 1e-6);
});

it("projection.fitExtent(…) world equirectangular", () => {
  const projection = geoEquirectangular();
  projection.fitExtent([[50, 50], [950, 950]], world);
  assertInDelta(projection.scale(), 143.239449, 1e-6);
  assertInDelta(projection.translate(), [500, 492.000762], 1e-6);
});

it("projection.fitExtent(…) world azimuthalEqualArea", () => {
  const projection = geoAzimuthalEqualArea();
  projection.fitExtent([[50, 50], [950, 950]], world);
  assertInDelta(projection.scale(), 228.357229, 1e-6);
  assertInDelta(projection.translate(), [496.353618, 479.684353], 1e-6);
});

it("projection.fitExtent(…) world azimuthalEquidistant", () => {
  const projection = geoAzimuthalEquidistant();
  projection.fitExtent([[50, 50], [950, 950]], world);
  assertInDelta(projection.scale(), 153.559317, 1e-6);
  assertInDelta(projection.translate(), [485.272493, 452.093375], 1e-6);
});

it("projection.fitExtent(…) world conicConformal", () => {
  const projection = geoConicConformal().clipAngle(30).parallels([30, 60]).rotate([0, -45]);
  projection.fitExtent([[50, 50], [950, 950]], world);
  assertInDelta(projection.scale(), 626.111027, 1e-6);
  assertInDelta(projection.translate(), [444.395951, 410.223799], 1e-6);
});

it("projection.fitExtent(…) world conicEqualArea", () => {
  const projection = geoConicEqualArea();
  projection.fitExtent([[50, 50], [950, 950]], world);
  assertInDelta(projection.scale(), 145.862346, 1e-6);
  assertInDelta(projection.translate(), [500, 498.0114265], 1e-6);
});

it("projection.fitExtent(…) world conicEquidistant", () => {
  const projection = geoConicEquidistant();
  projection.fitExtent([[50, 50], [950, 950]], world);
  assertInDelta(projection.scale(), 123.085587, 1e-6);
  assertInDelta(projection.translate(), [500, 498.598401], 1e-6);
});

it("projection.fitSize(…) world equirectangular", () => {
  const projection = geoEquirectangular();
  projection.fitSize([900, 900], world);
  assertInDelta(projection.scale(), 143.239449, 1e-6);
  assertInDelta(projection.translate(), [450, 442.000762], 1e-6);
});

it("projection.fitExtent(…) world gnomonic", () => {
  const projection = geoGnomonic().clipAngle(45);
  projection.fitExtent([[50, 50], [950, 950]], world);
  assertInDelta(projection.scale(), 450.348233, 1e-6);
  assertInDelta(projection.translate(), [500.115138, 556.522620], 1e-6);
});

it("projection.fitExtent(…) world mercator", () => {
  const projection = geoMercator();
  projection.fitExtent([[50, 50], [950, 950]], world);
  assertInDelta(projection.scale(), 143.239449, 1e-6);
  assertInDelta(projection.translate(), [500, 481.549457], 1e-6);
});

it("projection.fitExtent(…) world orthographic", () => {
  const projection = geoOrthographic();
  projection.fitExtent([[50, 50], [950, 950]], world);
  assertInDelta(projection.scale(), 451.406773, 1e-6);
  assertInDelta(projection.translate(), [503.769179, 498.593227], 1e-6);
});

it("projection.fitSize(…) world orthographic", () => {
  const projection = geoOrthographic();
  projection.fitSize([900, 900], world);
  assertInDelta(projection.scale(), 451.406773, 1e-6);
  assertInDelta(projection.translate(), [453.769179, 448.593227], 1e-6);
});

it("projection.fitExtent(…) world stereographic", () => {
  const projection = geoStereographic();
  projection.fitExtent([[50, 50], [950, 950]], world);
  assertInDelta(projection.scale(), 162.934379, 1e-6);
  assertInDelta(projection.translate(), [478.546293, 432.922534], 1e-6);
});

it("projection.fitExtent(…) world transverseMercator", () => {
  const projection = geoTransverseMercator();
  projection.fitExtent([[50, 50], [950, 950]], world);
  assertInDelta(projection.scale(), 143.239449, 1e-6);
  assertInDelta(projection.translate(), [473.829551, 500], 1e-6);
});

it("projection.fitExtent(…) USA albersUsa", () => {
  const projection = geoAlbersUsa();
  projection.fitExtent([[50, 50], [950, 950]], us);
  assertInDelta(projection.scale(), 1152.889035, 1e-6);
  assertInDelta(projection.translate(), [533.52541, 496.232028], 1e-6);
});

it("projection.fitExtent(…) null geometries - Feature", () => {
  const projection = geoEquirectangular();
  projection.fitExtent([[50, 50], [950, 950]], {type: "Feature", geometry: null});
  const s = projection.scale(), t = projection.translate();
  assert(!s);
  assert(isNaN(t[0]));
  assert(isNaN(t[1]));
});

it("projection.fitExtent(…) null geometries - MultiPoint", () => {
  const projection = geoEquirectangular();
  projection.fitExtent([[50, 50], [950, 950]], {type: "MultiPoint", coordinates: []});
  const s = projection.scale(), t = projection.translate();
  assert(!s);
  assert(isNaN(t[0]));
  assert(isNaN(t[1]));
});

it("projection.fitExtent(…) null geometries - MultiLineString", () => {
  const projection = geoEquirectangular();
  projection.fitExtent([[50, 50], [950, 950]], {type: "MultiLineString", coordinates: []});
  const s = projection.scale(), t = projection.translate();
  assert(!s);
  assert(isNaN(t[0]));
  assert(isNaN(t[1]));
});

it("projection.fitExtent(…) null geometries - MultiPolygon", () => {
  const projection = geoEquirectangular();
  projection.fitExtent([[50, 50], [950, 950]], {type: "MultiPolygon", coordinates: []});
  const s = projection.scale(), t = projection.translate();
  assert(!s);
  assert(isNaN(t[0]));
  assert(isNaN(t[1]));
});

it("projection.fitExtent(…) custom projection", () => {
  const projection = geoProjection(function(x, y) { return [x, Math.pow(y, 3)]; });
  projection.fitExtent([[50, 50], [950, 950]], world);
  assertInDelta(projection.scale(), 128.903525, 1e-6);
  assertInDelta(projection.translate(), [500, 450.414357], 1e-6);
});

it("projection.fitSize(…) ignore clipExtent - world equirectangular", () => {
  const p1 = geoEquirectangular().fitSize([1000, 1000], world);
  const s1 = p1.scale();
  const t1 = p1.translate();
  const c1 = p1.clipExtent();
  const p2 = geoEquirectangular().clipExtent([[100, 200], [700, 600]]).fitSize([1000, 1000], world);
  const s2 = p2.scale();
  const t2 = p2.translate();
  const c2 = p2.clipExtent();
  assertInDelta(s1, s2, 1e-6);
  assertInDelta(t1, t2, 1e-6);
  assert.strictEqual(c1, null);
  assert.deepStrictEqual(c2, [[100, 200], [700, 600]]);
});

it("projection.fitExtent(…) chaining - world transverseMercator", () => {
  const projection = geoTransverseMercator().fitExtent([[50, 50], [950, 950]], world).scale(500);
  assert.strictEqual(projection.scale(), 500);
  assertInDelta(projection.translate(), [473.829551, 500], 1e-6);
});

it("projection.fitSize(…) resampling - world mercator", () => {
  const box = {"type": "Polygon", "coordinates": [[[-135, 45], [-45, 45], [-45, -45], [-135, -45], [-135, 45]]]};
  const p1 = geoMercator().precision(0.1).fitSize([1000, 1000], box);
  const p2 = geoMercator().precision(0).fitSize([1000, 1000], box);
  const t1 = p1.translate();
  const t2 = p2.translate();
  assert.strictEqual(p1.precision(), 0.1);
  assert.strictEqual(p2.precision(), 0);
  assertInDelta(p1.scale(), 436.218018, 1e-6);
  assertInDelta(p2.scale(), 567.296328, 1e-6);
  assertInDelta(t1[0], 1185.209661, 1e-6);
  assertInDelta(t2[0], 1391.106989, 1e-6);
  assertInDelta(t1[1], 500, 1e-6);
  assertInDelta(t1[1], t2[1], 1e-6);
});

it("projection.fitWidth(…) world equirectangular", () => {
  const projection = geoEquirectangular();
  projection.fitWidth(900, world);
  assertInDelta(projection.scale(), 143.239449, 1e-6);
  assertInDelta(projection.translate(), [450, 208.999023], 1e-6);
});

it("projection.fitWidth(…) world transverseMercator", () => {
  const projection = geoTransverseMercator();
  projection.fitWidth(900, world);
  assertInDelta(projection.scale(), 166.239257, 1e-6);
  assertInDelta(projection.translate(), [419.627390, 522.256029], 1e-6);
});

it("projection.fitWidth(…) USA albersUsa", () => {
  const projection = geoAlbersUsa();
  projection.fitWidth(900, us);
  assertInDelta(projection.scale(), 1152.889035, 1e-6);
  assertInDelta(projection.translate(), [483.52541, 257.736905], 1e-6);
});

it("projection.fitHeight(…) world equirectangular", () => {
  const projection = geoEquirectangular();
  projection.fitHeight(900, world);
  assertInDelta(projection.scale(), 297.042711, 1e-6);
  assertInDelta(projection.translate(), [933.187199, 433.411585], 1e-6);
});

it("projection.fitHeight(…) world transverseMercator", () => {
  const projection = geoTransverseMercator();
  projection.fitHeight(900, world);
  assertInDelta(projection.scale(), 143.239449, 1e-6);
  assertInDelta(projection.translate(), [361.570408, 450], 1e-6);
});

it("projection.fitHeight(…) USA albersUsa", () => {
  const projection = geoAlbersUsa();
  projection.fitHeight(900, us);
  assertInDelta(projection.scale(), 1983.902059, 1e-6);
  assertInDelta(projection.translate(), [832.054974, 443.516038], 1e-6);
});
