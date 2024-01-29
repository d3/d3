import assert from "assert";
import {mean, min, range} from "d3-array";
import {randomLcg, randomUniform} from "../src/index.js";
import {assertInDelta} from "./asserts.js";

it("randomUniform() returns random numbers with a mean of 0.5", () => {
  const r = randomUniform.source(randomLcg(0.5233099016390388));
  assertInDelta(mean(range(10000).map(r())), 0.5, 0.05);
});

it("randomUniform() returns random numbers within the range [0,1)", () => {
  const r = randomUniform.source(randomLcg(0.6458793845385908));
  assert(min(range(10000).map(r())) >= 0);
  assert(min(range(10000).map(r())) < 1);
});

it("randomUniform(max) returns random numbers with a mean of max / 2", () => {
  const r = randomUniform.source(randomLcg(0.678948531603278));
  assertInDelta(mean(range(10000).map(r(42))), 21, 0.5);
});

it("randomUniform(max) returns random numbers within the range [0,max)", () => {
  const r = randomUniform.source(randomLcg(0.48468185818988196));
  assert(min(range(10000).map(r(42))) >= 0);
  assert(min(range(10000).map(r(42))) < 42);
});

it("randomUniform(min, max) returns random numbers with a mean of (min + max) / 2", () => {
  const r = randomUniform.source(randomLcg(0.23751000425183233));
  assertInDelta(mean(range(10000).map(r(10, 42))), 26, 0.5);
});

it("randomUniform(min, max) returns random numbers within the range [min,max)", () => {
  const r = randomUniform.source(randomLcg(0.3607454145271254));
  assert(min(range(10000).map(r(10, 42))) >= 10);
  assert(min(range(10000).map(r(10, 42))) < 42);
});
