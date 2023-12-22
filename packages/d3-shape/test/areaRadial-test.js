import assert from "assert";
import {areaRadial, curveCardinal, curveLinear} from "../src/index.js";
import {assertPathEqual} from "./asserts.js";

it("areaRadial() returns a default radial area shape", () => {
  const a = areaRadial();
  assert.strictEqual(a.startAngle()([42, 34]), 42);
  assert.strictEqual(a.endAngle(), null);
  assert.strictEqual(a.innerRadius()([42, 34]), 0);
  assert.strictEqual(a.outerRadius()([42, 34]), 34);
  assert.strictEqual(a.defined()([42, 34]), true);
  assert.strictEqual(a.curve(), curveLinear);
  assert.strictEqual(a.context(), null);
  assertPathEqual(a([[0, 1], [2, 3], [4, 5]]), "M0,-1L2.727892,1.248441L-3.784012,3.268218L0,0L0,0L0,0Z");
});

it("areaRadial.lineStartAngle() returns a line derived from the area", () => {
  const defined = function() { return true; };
  const curve = curveCardinal;
  const context = {};
  const startAngle = function() {};
  const endAngle = function() {};
  const radius = function() {};
  const a = areaRadial().defined(defined).curve(curve).context(context).radius(radius).startAngle(startAngle).endAngle(endAngle);
  const l = a.lineStartAngle();
  assert.strictEqual(l.defined(), defined);
  assert.strictEqual(l.curve(), curve);
  assert.strictEqual(l.context(), context);
  assert.strictEqual(l.angle(), startAngle);
  assert.strictEqual(l.radius(), radius);
});

it("areaRadial.lineEndAngle() returns a line derived from the area", () => {
  const defined = function() { return true; };
  const curve = curveCardinal;
  const context = {};
  const startAngle = function() {};
  const endAngle = function() {};
  const radius = function() {};
  const a = areaRadial().defined(defined).curve(curve).context(context).radius(radius).startAngle(startAngle).endAngle(endAngle);
  const l = a.lineEndAngle();
  assert.strictEqual(l.defined(), defined);
  assert.strictEqual(l.curve(), curve);
  assert.strictEqual(l.context(), context);
  assert.strictEqual(l.angle(), endAngle);
  assert.strictEqual(l.radius(), radius);
});

it("areaRadial.lineInnerRadius() returns a line derived from the area", () => {
  const defined = function() { return true; };
  const curve = curveCardinal;
  const context = {};
  const angle = function() {};
  const innerRadius = function() {};
  const outerRadius = function() {};
  const a = areaRadial().defined(defined).curve(curve).context(context).angle(angle).innerRadius(innerRadius).outerRadius(outerRadius);
  const l = a.lineInnerRadius();
  assert.strictEqual(l.defined(), defined);
  assert.strictEqual(l.curve(), curve);
  assert.strictEqual(l.context(), context);
  assert.strictEqual(l.angle(), angle);
  assert.strictEqual(l.radius(), innerRadius);
});

it("areaRadial.lineOuterRadius() returns a line derived from the area", () => {
  const defined = function() { return true; };
  const curve = curveCardinal;
  const context = {};
  const angle = function() {};
  const innerRadius = function() {};
  const outerRadius = function() {};
  const a = areaRadial().defined(defined).curve(curve).context(context).angle(angle).innerRadius(innerRadius).outerRadius(outerRadius);
  const l = a.lineOuterRadius();
  assert.strictEqual(l.defined(), defined);
  assert.strictEqual(l.curve(), curve);
  assert.strictEqual(l.context(), context);
  assert.strictEqual(l.angle(), angle);
  assert.strictEqual(l.radius(), outerRadius);
});
