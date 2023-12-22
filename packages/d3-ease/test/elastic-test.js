import assert from "assert";
import {easeElastic, easeElasticIn, easeElasticInOut, easeElasticOut} from "../src/index.js";
import {out, inOut} from "./generic.js";
import {assertInDelta} from "./asserts.js";

it("easeElastic is an alias for easeElasticOut", () => {
  assert.strictEqual(easeElastic, easeElasticOut);
});

it("easeElasticIn(t) returns the expected results", () => {
  assert.strictEqual(Math.abs(easeElasticIn(0.0)), 0.000000);
  assertInDelta(easeElasticIn(0.1),  0.000978);
  assertInDelta(easeElasticIn(0.2), -0.001466);
  assertInDelta(easeElasticIn(0.3), -0.003421);
  assertInDelta(easeElasticIn(0.4),  0.014663);
  assertInDelta(easeElasticIn(0.5), -0.015152);
  assertInDelta(easeElasticIn(0.6), -0.030792);
  assertInDelta(easeElasticIn(0.7),  0.124145);
  assertInDelta(easeElasticIn(0.8), -0.124633);
  assertInDelta(easeElasticIn(0.9), -0.249756);
  assert.strictEqual(easeElasticIn(1.0),  1.000000);
});

it("easeElasticIn(t) coerces t to a number", () => {
  assert.strictEqual(easeElasticIn(".9"), easeElasticIn(0.9));
  assert.strictEqual(easeElasticIn({valueOf: function() { return 0.9; }}), easeElasticIn(0.9));
});

it("easeElasticIn(t) is the same as elasticIn.amplitude(1).period(0.3)(t)", () => {
  assert.strictEqual(easeElasticIn(0.1), easeElasticIn.amplitude(1).period(0.3)(0.1));
  assert.strictEqual(easeElasticIn(0.2), easeElasticIn.amplitude(1).period(0.3)(0.2));
  assert.strictEqual(easeElasticIn(0.3), easeElasticIn.amplitude(1).period(0.3)(0.3));
});

it("easeElasticIn.amplitude(a)(t) is the same as elasticIn(t) if a <= 1", () => {
  assert.strictEqual(easeElasticIn.amplitude(-1.0)(0.1), easeElasticIn(0.1));
  assert.strictEqual(easeElasticIn.amplitude(+0.4)(0.2), easeElasticIn(0.2));
  assert.strictEqual(easeElasticIn.amplitude(+0.8)(0.3), easeElasticIn(0.3));
});

it("easeElasticIn.amplitude(a).period(p)(t) coerces t, a and p to numbers", () => {
  assert.strictEqual(easeElasticIn.amplitude("1.3").period("0.2")(".9"), easeElasticIn.amplitude(1.3).period(0.2)(.9));
  assert.strictEqual(easeElasticIn.amplitude({valueOf: function() { return 1.3; }}).period({valueOf: function() { return 0.2; }})({valueOf: function() { return .9; }}), easeElasticIn.amplitude(1.3).period(0.2)(.9));
});

it("easeElasticIn.amplitude(1.3)(t) returns the expected results", () => {
  assert.strictEqual(easeElasticIn.amplitude(1.3)(0.0),  0.000000);
  assertInDelta(easeElasticIn.amplitude(1.3)(0.1),  0.000978);
  assertInDelta(easeElasticIn.amplitude(1.3)(0.2), -0.003576);
  assertInDelta(easeElasticIn.amplitude(1.3)(0.3),  0.001501);
  assertInDelta(easeElasticIn.amplitude(1.3)(0.4),  0.014663);
  assertInDelta(easeElasticIn.amplitude(1.3)(0.5), -0.036951);
  assertInDelta(easeElasticIn.amplitude(1.3)(0.6),  0.013510);
  assertInDelta(easeElasticIn.amplitude(1.3)(0.7),  0.124145);
  assertInDelta(easeElasticIn.amplitude(1.3)(0.8), -0.303950);
  assertInDelta(easeElasticIn.amplitude(1.3)(0.9),  0.109580);
  assert.strictEqual(easeElasticIn.amplitude(1.3)(1.0),  1.000000);
});

it("easeElasticIn.amplitude(1.5).period(1)(t) returns the expected results", () => {
  assert.strictEqual(easeElasticIn.amplitude(1.5).period(1)(0.0),  0.000000);
  assertInDelta(easeElasticIn.amplitude(1.5).period(1)(0.1),  0.000148);
  assertInDelta(easeElasticIn.amplitude(1.5).period(1)(0.2), -0.002212);
  assertInDelta(easeElasticIn.amplitude(1.5).period(1)(0.3), -0.009390);
  assertInDelta(easeElasticIn.amplitude(1.5).period(1)(0.4), -0.021498);
  assertInDelta(easeElasticIn.amplitude(1.5).period(1)(0.5), -0.030303);
  assertInDelta(easeElasticIn.amplitude(1.5).period(1)(0.6), -0.009352);
  assertInDelta(easeElasticIn.amplitude(1.5).period(1)(0.7),  0.093642);
  assertInDelta(easeElasticIn.amplitude(1.5).period(1)(0.8),  0.342077);
  assertInDelta(easeElasticIn.amplitude(1.5).period(1)(0.9),  0.732374);
  assert.strictEqual(easeElasticIn.amplitude(1.5).period(1)(1.0),  1.000000);
});

it("easeElasticOut(t) returns the expected results", () => {
  const elasticOut = out(easeElasticIn);
  assert.strictEqual(easeElasticOut(0.0), elasticOut(0.0));
  assertInDelta(easeElasticOut(0.1), elasticOut(0.1));
  assertInDelta(easeElasticOut(0.2), elasticOut(0.2));
  assertInDelta(easeElasticOut(0.3), elasticOut(0.3));
  assertInDelta(easeElasticOut(0.4), elasticOut(0.4));
  assertInDelta(easeElasticOut(0.5), elasticOut(0.5));
  assertInDelta(easeElasticOut(0.6), elasticOut(0.6));
  assertInDelta(easeElasticOut(0.7), elasticOut(0.7));
  assertInDelta(easeElasticOut(0.8), elasticOut(0.8));
  assertInDelta(easeElasticOut(0.9), elasticOut(0.9));
  assert.strictEqual(easeElasticOut(1.0), elasticOut(1.0));
});

it("easeElasticOut.amplitude(a).period(p)(t) coerces t, a and p to numbers", () => {
  assert.strictEqual(easeElasticOut.amplitude("1.3").period("0.2")(".9"), easeElasticOut.amplitude(1.3).period(0.2)(.9));
  assert.strictEqual(easeElasticOut.amplitude({valueOf: function() { return 1.3; }}).period({valueOf: function() { return 0.2; }})({valueOf: function() { return .9; }}), easeElasticOut.amplitude(1.3).period(0.2)(.9));
});

it("easeElasticInOut(t) returns the expected results", () => {
  const elasticInOut = inOut(easeElasticIn);
  assert.strictEqual(easeElasticInOut(0.0), elasticInOut(0.0));
  assertInDelta(easeElasticInOut(0.1), elasticInOut(0.1));
  assertInDelta(easeElasticInOut(0.2), elasticInOut(0.2));
  assertInDelta(easeElasticInOut(0.3), elasticInOut(0.3));
  assertInDelta(easeElasticInOut(0.4), elasticInOut(0.4));
  assertInDelta(easeElasticInOut(0.5), elasticInOut(0.5));
  assertInDelta(easeElasticInOut(0.6), elasticInOut(0.6));
  assertInDelta(easeElasticInOut(0.7), elasticInOut(0.7));
  assertInDelta(easeElasticInOut(0.8), elasticInOut(0.8));
  assertInDelta(easeElasticInOut(0.9), elasticInOut(0.9));
  assert.strictEqual(easeElasticInOut(1.0), elasticInOut(1.0));
});

it("easeElasticInOut.amplitude(a).period(p)(t) coerces t, a and p to numbers", () => {
  assert.strictEqual(easeElasticInOut.amplitude("1.3").period("0.2")(".9"), easeElasticInOut.amplitude(1.3).period(0.2)(.9));
  assert.strictEqual(easeElasticInOut.amplitude({valueOf: function() { return 1.3; }}).period({valueOf: function() { return 0.2; }})({valueOf: function() { return .9; }}), easeElasticInOut.amplitude(1.3).period(0.2)(.9));
});
