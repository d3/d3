import {deviation, mean, range} from "d3-array";
import {randomLcg, randomNormal} from "../src/index.js";
import {assertInDelta} from "./asserts.js";

it("randomNormal() returns random numbers with a mean of zero", () => {
  const r = randomNormal.source(randomLcg(0.3193923539476107));
  assertInDelta(mean(range(10000).map(r())), 0, 0.05);
});

it("randomNormal() returns random numbers with a standard deviation of one", () => {
  const r = randomNormal.source(randomLcg(0.5618016004747401));
  assertInDelta(deviation(range(10000).map(r())), 1, 0.05);
});

it("randomNormal(mu) returns random numbers with the specified mean", () => {
  const r = randomNormal.source(randomLcg(0.22864660166790118));
  assertInDelta(mean(range(10000).map(r(42))), 42, 0.05);
  assertInDelta(mean(range(10000).map(r(-2))), -2, 0.05);
});

it("randomNormal(mu) returns random numbers with a standard deviation of 1", () => {
  const r = randomNormal.source(randomLcg(0.1274290504810609));
  assertInDelta(deviation(range(10000).map(r(42))), 1, 0.05);
  assertInDelta(deviation(range(10000).map(r(-2))), 1, 0.05);
});

it("randomNormal(mu, sigma) returns random numbers with the specified mean and standard deviation", () => {
  const r = randomNormal.source(randomLcg(0.49113635631389463));
  assertInDelta(mean(range(10000).map(r(42, 2))), 42, 0.05);
  assertInDelta(mean(range(10000).map(r(-2, 2))), -2, 0.05);
  assertInDelta(deviation(range(10000).map(r(42, 2))), 2, 0.05);
  assertInDelta(deviation(range(10000).map(r(-2, 2))), 2, 0.05);
});
