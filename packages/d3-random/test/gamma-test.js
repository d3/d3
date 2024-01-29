import {deviation, mean, range, variance} from "d3-array";
import {randomGamma, randomLcg} from "../src/index.js";
import {skewness, kurtosis} from "./statistics.js";
import {assertInDelta} from "./asserts.js";

it("randomGamma(k) returns random numbers with a mean of k", () => {
  const r = randomGamma.source(randomLcg(0.8177609532536807));
  assertInDelta(mean(range(10000).map(r(0.1))), 0.1, 0.01);
  assertInDelta(mean(range(10000).map(r(0.5))), 0.5, 0.05);
  assertInDelta(mean(range(10000).map(r(1))), 1, 0.05);
  assertInDelta(mean(range(10000).map(r(2))), 2, 0.05);
  assertInDelta(mean(range(10000).map(r(10))), 10, 0.05);
});

it("randomGamma(k) returns random numbers with a variance of k", () => {
  const r = randomGamma.source(randomLcg(0.6494198931625885));
  assertInDelta(variance(range(10000).map(r(0.1))), 0.1, 0.005);
  assertInDelta(variance(range(10000).map(r(0.5))), 0.5, 0.05);
  assertInDelta(variance(range(10000).map(r(1))), 1, 0.05);
  assertInDelta(variance(range(10000).map(r(2))), 2, 0.1);
  assertInDelta(variance(range(10000).map(r(10))), 10, 0.5);
});

it("randomGamma(k) returns random numbers with a skewness of 2 / sqrt(k)", () => {
  const r = randomGamma.source(randomLcg(0.02223371708142996));
  assertInDelta(skewness(range(10000).map(r(0.1))), Math.sqrt(40), 1);
  assertInDelta(skewness(range(10000).map(r(0.5))), Math.sqrt(8), 0.25);
  assertInDelta(skewness(range(10000).map(r(1))), 2, 0.1);
  assertInDelta(skewness(range(10000).map(r(2))), Math.sqrt(2), 0.1);
  assertInDelta(skewness(range(10000).map(r(10))), Math.sqrt(0.4), 0.05);
});

it("randomGamma(k) returns random numbers with an excess kurtosis of 6 / k", () => {
  const r = randomGamma.source(randomLcg(0.19568718910927974));
  assertInDelta(kurtosis(range(10000).map(r(0.1))), 60, 15);
  assertInDelta(kurtosis(range(10000).map(r(0.5))), 12, 3);
  assertInDelta(kurtosis(range(10000).map(r(1))), 6, 1.5);
  assertInDelta(kurtosis(range(10000).map(r(2))), 3, 1);
  assertInDelta(kurtosis(range(10000).map(r(10))), 0.6, 0.2);
});

it("randomGamma(k, theta) returns random numbers with a mean of k * theta and a variance of k * theta^2", () => {
  const r = randomGamma.source(randomLcg(0.9608725416165995));
  assertInDelta(mean(range(10000).map(r(1, 2))), 2, 0.05);
  assertInDelta(mean(range(10000).map(r(2, 4))), 8, 0.2);
  assertInDelta(deviation(range(10000).map(r(1, 2))), 2, 0.1);
  assertInDelta(deviation(range(10000).map(r(2, 4))), Math.sqrt(2) * 4, 0.1);
});
