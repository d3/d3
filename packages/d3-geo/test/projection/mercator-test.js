import assert from "assert";
import {geoMercator, geoPath} from "../../src/index.js";
import {assertPathEqual} from "../asserts.js";

it("mercator.clipExtent(null) sets the default automatic clip extent", () => {
  const projection = geoMercator().translate([0, 0]).scale(1).clipExtent(null).precision(0);
  assertPathEqual(geoPath(projection)({type: "Sphere"}), "M3.141593,-3.141593L3.141593,0L3.141593,3.141593L3.141593,3.141593L-3.141593,3.141593L-3.141593,3.141593L-3.141593,0L-3.141593,-3.141593L-3.141593,-3.141593L3.141593,-3.141593Z");
  assert.strictEqual(projection.clipExtent(), null);
});

it("mercator.center(center) sets the correct automatic clip extent", () => {
  const projection = geoMercator().translate([0, 0]).scale(1).center([10, 10]).precision(0);
  assertPathEqual(geoPath(projection)({type: "Sphere"}), "M2.967060,-2.966167L2.967060,0.175426L2.967060,3.317018L2.967060,3.317018L-3.316126,3.317018L-3.316126,3.317019L-3.316126,0.175426L-3.316126,-2.966167L-3.316126,-2.966167L2.967060,-2.966167Z");
  assert.strictEqual(projection.clipExtent(), null);
});

it("mercator.clipExtent(extent) intersects the specified clip extent with the automatic clip extent", () => {
  const projection = geoMercator().translate([0, 0]).scale(1).clipExtent([[-10, -10], [10, 10]]).precision(0);
  assertPathEqual(geoPath(projection)({type: "Sphere"}), "M3.141593,-10L3.141593,0L3.141593,10L3.141593,10L-3.141593,10L-3.141593,10L-3.141593,0L-3.141593,-10L-3.141593,-10L3.141593,-10Z");
  assert.deepStrictEqual(projection.clipExtent(), [[-10, -10], [10, 10]]);
});

it("mercator.clipExtent(extent).scale(scale) updates the intersected clip extent", () => {
  const projection = geoMercator().translate([0, 0]).clipExtent([[-10, -10], [10, 10]]).scale(1).precision(0);
  assertPathEqual(geoPath(projection)({type: "Sphere"}), "M3.141593,-10L3.141593,0L3.141593,10L3.141593,10L-3.141593,10L-3.141593,10L-3.141593,0L-3.141593,-10L-3.141593,-10L3.141593,-10Z");
  assert.deepStrictEqual(projection.clipExtent(), [[-10, -10], [10, 10]]);
});

it("mercator.clipExtent(extent).translate(translate) updates the intersected clip extent", () => {
  const projection = geoMercator().scale(1).clipExtent([[-10, -10], [10, 10]]).translate([0, 0]).precision(0);
  assertPathEqual(geoPath(projection)({type: "Sphere"}), "M3.141593,-10L3.141593,0L3.141593,10L3.141593,10L-3.141593,10L-3.141593,10L-3.141593,0L-3.141593,-10L-3.141593,-10L3.141593,-10Z");
  assert.deepStrictEqual(projection.clipExtent(), [[-10, -10], [10, 10]]);
});

it("mercator.rotate(…) does not affect the automatic clip extent", () => {
  const projection = geoMercator(), object = {
    type: "MultiPoint",
    coordinates: [
      [-82.35024908550241, 29.649391549778745],
      [-82.35014449996858, 29.65075946917633],
      [-82.34916073446641, 29.65070265688781],
      [-82.3492653331286, 29.64933474064504]
    ]
  };
  projection.fitExtent([[0, 0], [960, 600]], object);
  assert.deepStrictEqual(projection.scale(), 20969742.365692537);
  assert.deepStrictEqual(projection.translate(), [30139734.76760269, 11371473.949706702]);
  projection.rotate([0, 95]).fitExtent([[0, 0], [960, 600]], object);
  assert.deepStrictEqual(projection.scale(), 35781690.650920525);
  assert.deepStrictEqual(projection.translate(), [75115911.95344563, 2586046.4116968135]);
});
