import assert from "assert";
import {deviation, mean, range} from "d3-array";
import {randomLcg, randomWeibull} from "../src/index.js";
import {assertInDelta} from "./asserts.js";

it("randomWeibull() returns random numbers with the specified mean", () => {
  const r = randomWeibull.source(randomLcg(0.28845828610535373));
  assertInDelta(mean(range(10000).map(r(9))), 0.947, 0.1);
  assertInDelta(mean(range(10000).map(r(3))), 0.893, 0.1);
  assertInDelta(mean(range(10000).map(r(1))), 1, 0.1);
  assertInDelta(mean(range(10000).map(r(0.3))), 9.260, 1);
  assertInDelta(mean(range(10000).map(r(0))), 0.577, 0.1);
  assertInDelta(mean(range(10000).map(r(-3))), 1.354, 0.1);
  assertInDelta(mean(range(10000).map(r(-9))), 1.078, 0.1);
  assertInDelta(mean(range(10000).map(r(4, 1, 2))), 2.813, 0.2);
  assertInDelta(mean(range(10000).map(r(-4, 1, 2))), 3.451, 0.2);
});

it("randomWeibull() returns random numbers with the specified deviation", () => {
  const r = randomWeibull.source(randomLcg(0.6675582430306972));
  assertInDelta(deviation(range(10000).map(r(9))), 0.126, 0.02);
  assertInDelta(deviation(range(10000).map(r(3))), 0.324, 0.06);
  assertInDelta(deviation(range(10000).map(r(1))), 1, 0.2);
  assert(deviation(range(10000).map(r(0.3))) > 30);
  assertInDelta(deviation(range(10000).map(r(0))), 1.282, 0.05);
  assertInDelta(deviation(range(10000).map(r(-3))), 0.919, 0.4);
  assertInDelta(deviation(range(10000).map(r(-9))), 0.169, 0.02);
  assertInDelta(deviation(range(10000).map(r(4, 1, 2))), 0.509, 0.1);
  assertInDelta(deviation(range(10000).map(r(-4, 1, 2))), 1.0408, 0.1);
});
