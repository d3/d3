import {mean, range, variance} from "d3-array";
import {randomBinomial, randomLcg} from "../src/index.js";
import {skewness, kurtosis} from "./statistics.js";
import {assertInDelta} from "./asserts.js";

function dmean(n, p) {
  return n * p;
}

function dvariance(n, p) {
  return n * p * (1 - p);
}

function skew(n, p) {
  return (1 - 2 * p) / Math.sqrt(dvariance(n, p));
}

function kurt(n, p) {
  return (6 * Math.pow(p, 2) - 6 * p + 1) / (dvariance(n, p));
}

it("randomBinomial(n, p) returns random binomial distributed numbers with a mean of n * p", () => {
  const r = randomBinomial.source(randomLcg(0.3994478770613372));
  assertInDelta(mean(range(10000).map(r(100, 1))), dmean(100, 1), dvariance(100, 1));
  assertInDelta(mean(range(10000).map(r(100, 0.5))), dmean(100, 0.5), dvariance(100, 0.5));
  assertInDelta(mean(range(10000).map(r(100, 0.25))), dmean(100, 0.25), dvariance(100, 0.25));
  assertInDelta(mean(range(10000).map(r(100, 0))), dmean(100, 0), dvariance(100, 0));
  assertInDelta(mean(range(10000).map(r(0, 0))), dmean(0, 0), dvariance(0, 0));
});

it("randomBinomial(n, p) returns random binomial distributed numbers with a variance of n * p * (1 - p)", () => {
  const r = randomBinomial.source(randomLcg(0.7214876234380256));
  assertInDelta(variance(range(10000).map(r(100, 1))), dvariance(100, 1), 0);
  assertInDelta(variance(range(10000).map(r(100, 0.5))), dvariance(100, 0.5), 0.5);
  assertInDelta(variance(range(10000).map(r(100, 0.25))), dvariance(100, 0.25), 1);
  assertInDelta(variance(range(10000).map(r(100, 0))), dvariance(100, 0), 0);
  assertInDelta(variance(range(10000).map(r(0, 0))), dvariance(0, 0), 0);
});

it("randomBinomial(n, p) returns random binomial distributed numbers with a skewness of (1 - 2 * p) / sqrt(n * p * (1 - p))", () => {
  const r = randomBinomial.source(randomLcg(0.0646181509291679));
  assertInDelta(skewness(range(10000).map(r(100, 0.05))), skew(100, 0.05), 0.05);
  assertInDelta(skewness(range(10000).map(r(100, 0.10))), skew(100, 0.10), 0.05);
  assertInDelta(skewness(range(10000).map(r(100, 0.15))), skew(100, 0.15), 0.05);
  assertInDelta(skewness(range(10000).map(r(100, 0.20))), skew(100, 0.20), 0.05);
  assertInDelta(skewness(range(10000).map(r(100, 0.25))), skew(100, 0.25), 0.05);
  assertInDelta(skewness(range(10000).map(r(100, 0.30))), skew(100, 0.30), 0.05);
  assertInDelta(skewness(range(10000).map(r(100, 0.35))), skew(100, 0.35), 0.05);
  assertInDelta(skewness(range(10000).map(r(100, 0.40))), skew(100, 0.40), 0.05);
  assertInDelta(skewness(range(10000).map(r(100, 0.45))), skew(100, 0.45), 0.05);
});

it("randomBinomial(n, p) returns random binomial distributed numbers with a kurtosis excess of (6 * p^2 - 6 * p - 1) / (n * p * (1 - p))", () => {
  const r = randomBinomial.source(randomLcg(0.6451552018202751));
  assertInDelta(kurtosis(range(10000).map(r(100, 0.05))), kurt(100, 0.05), 0.2);
  assertInDelta(kurtosis(range(10000).map(r(100, 0.10))), kurt(100, 0.10), 0.1);
  assertInDelta(kurtosis(range(10000).map(r(100, 0.15))), kurt(100, 0.15), 0.1);
  assertInDelta(kurtosis(range(10000).map(r(100, 0.20))), kurt(100, 0.20), 0.1);
  assertInDelta(kurtosis(range(10000).map(r(100, 0.25))), kurt(100, 0.25), 0.1);
  assertInDelta(kurtosis(range(10000).map(r(100, 0.30))), kurt(100, 0.30), 0.1);
  assertInDelta(kurtosis(range(10000).map(r(100, 0.35))), kurt(100, 0.35), 0.1);
  assertInDelta(kurtosis(range(10000).map(r(100, 0.40))), kurt(100, 0.40), 0.1);
  assertInDelta(kurtosis(range(10000).map(r(100, 0.45))), kurt(100, 0.45), 0.05);
});
