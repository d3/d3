import assert from "assert";
import {range} from "d3-array";
import {geoCircle} from "../src/index.js";
import {assertInDelta} from "./asserts.js";

it("circle generates a Polygon", () => {
  const o = geoCircle()();
  assert.strictEqual(o.type, "Polygon");
  assertInDelta(o.coordinates, [[[-78.69007,-90],[-90,-84],[-90,-78],[-90,-72],[-90,-66],[-90,-60],[-90,-54],[-90,-48],[-90,-42],[-90,-36],[-90,-30],[-90,-24],[-90,-18],[-90,-12],[-90,-6],[-90,0],[-90,6],[-90,12],[-90,18],[-90,24],[-90,30],[-90,36],[-90,42],[-90,48],[-90,54],[-90,60],[-90,66],[-90,72],[-90,78],[-90,84],[-89.59666,90],[90,84],[90,78],[90,72],[90,66],[90,60],[90,54],[90,48],[90,42],[90,36],[90,30],[90,24],[90,18],[90,12],[90,6],[90,0],[90,-6],[90,-12],[90,-18],[90,-24],[90,-30],[90,-36],[90,-42],[90,-48],[90,-54],[90,-60],[90,-66],[90,-72],[90,-78],[90,-84],[89.56977,-90]]], 1e-5);
});

it("circle.center([0, 90])", () => {
  const o = geoCircle().center([0, 90])();
  assert.strictEqual(o.type, "Polygon");
  assertInDelta(o.coordinates, [range(360, -1, -6).map(function(x) { return [x >= 180 ? x - 360 : x, 0]; })], 1e-6);
});

it("circle.center([45, 45])", () => {
  const o = geoCircle().center([45, 45]).radius(0)();
  assert.strictEqual(o.type, "Polygon");
  assertInDelta(o.coordinates[0][0], [45, 45], 1e-6);
});

it("circle: first and last points are coincident", () => {
  const o = geoCircle().center([0, 0]).radius(0.02).precision(45)();
  assertInDelta(o.coordinates[0][0], o.coordinates[0].pop(), 1e-6);
});
