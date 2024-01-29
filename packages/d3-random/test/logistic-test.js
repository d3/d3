import {mean, range, variance} from "d3-array";
import {randomLcg, randomLogistic} from "../src/index.js";
import {skewness, kurtosis} from "./statistics.js";
import {assertInDelta} from "./asserts.js";

function dvariance(a, b) {
  return Math.pow(Math.PI * b, 2) / 3;
}

it("randomLogistic(a, b) returns random numbers with a mean of a", () => {
  const r = randomLogistic.source(randomLcg(0.8792712826844997));
  assertInDelta(mean(range(10000).map(r())), 0, 0.05);
  assertInDelta(mean(range(10000).map(r(5))), 5, 0.05);
  assertInDelta(mean(range(10000).map(r(0, 4))), 0, 0.1);
  assertInDelta(mean(range(10000).map(r(1, 3))), 1, 0.1);
  assertInDelta(mean(range(10000).map(r(3, 1))), 3, 0.05);
});

it("randomLogistic(a, b) returns random numbers with a variance of (b * pi)^2 / 3", () => {
  const r = randomLogistic.source(randomLcg(0.5768515852192524));
  assertInDelta(variance(range(10000).map(r())), dvariance(0, 1), 0.2);
  assertInDelta(variance(range(10000).map(r(5))), dvariance(5, 1), 0.2);
  assertInDelta(variance(range(10000).map(r(0, 4))), dvariance(0, 4), 2);
  assertInDelta(variance(range(10000).map(r(1, 3))), dvariance(1, 3), 2);
  assertInDelta(variance(range(10000).map(r(3, 1))), dvariance(3, 1), 2);
});

it("randomLogistic(a, b) returns random numbers with a skewness of zero", () => {
  const r = randomLogistic.source(randomLcg(0.8835033777589203));
  assertInDelta(skewness(range(10000).map(r())), 0, 0.1);
  assertInDelta(skewness(range(10000).map(r(5))), 0, 0.1);
  assertInDelta(skewness(range(10000).map(r(0, 4))), 0, 0.1);
  assertInDelta(skewness(range(10000).map(r(1, 3))), 0, 0.1);
  assertInDelta(skewness(range(10000).map(r(3, 1))), 0, 0.1);
});

it("randomLogistic(a, b) returns random numbers with an excess kurtosis of 1.2", () => {
  const r = randomLogistic.source(randomLcg(0.8738996292947383));
  assertInDelta(kurtosis(range(10000).map(r())), 1.2, 0.6);
  assertInDelta(kurtosis(range(10000).map(r(5))), 1.2, 0.6);
  assertInDelta(kurtosis(range(10000).map(r(0, 4))), 1.2, 0.6);
  assertInDelta(kurtosis(range(10000).map(r(1, 3))), 1.2, 0.6);
  assertInDelta(kurtosis(range(10000).map(r(3, 1))), 1.2, 0.6);
});
