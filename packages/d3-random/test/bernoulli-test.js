import {mean, range, variance} from "d3-array";
import {randomBernoulli, randomLcg} from "../src/index.js";
import {skewness, kurtosis} from "./statistics.js";
import {assertInDelta} from "./asserts.js";

function dmean(p) {
  return p;
}

function dvariance(p) {
  return p * (1 - p);
}

function skew(p) {
  return (1 - 2 * p) / Math.sqrt(dvariance(p));
}

function kurt(p) {
  return (6 * Math.pow(p, 2) - 6 * p + 1) / (dvariance(p));
}

it("randomBernoulli(p) returns random bernoulli distributed numbers with a mean of p", () => {
  const r = randomBernoulli.source(randomLcg(0.48444190806583465));
  assertInDelta(mean(range(10000).map(r(1))), dmean(1), dvariance(1));
  assertInDelta(mean(range(10000).map(r(0.5))), dmean(0.5), dvariance(0.5));
  assertInDelta(mean(range(10000).map(r(0.25))), dmean(0.25), dvariance(0.25));
  assertInDelta(mean(range(10000).map(r(0))), dmean(0), dvariance(0));
});

it("randomBernoulli(p) returns random bernoulli distributed numbers with a variance of p * (1 - p)", () => {
  const r = randomBernoulli.source(randomLcg(0.9781605192898934));
  assertInDelta(variance(range(10000).map(r(1))), dvariance(1), 0);
  assertInDelta(variance(range(10000).map(r(0.5))), dvariance(0.5), 0.05);
  assertInDelta(variance(range(10000).map(r(0.25))), dvariance(0.25), 0.05);
  assertInDelta(variance(range(10000).map(r(0))), dvariance(0), 0);
});

it("randomBernoulli(p) returns random bernoulli distributed numbers with a skewness of (1 - 2 * p) / sqrt(p * (1 - p)).", () => {
  const r = randomBernoulli.source(randomLcg(0.9776249148208429));
  assertInDelta(skewness(range(10000).map(r(0.5))), skew(0.5), 0.08);
  assertInDelta(skewness(range(10000).map(r(0.25))), skew(0.25), 0.05);
});

it("randomBernoulli(p) returns random bernoulli distributed numbers with a kurtosis excess of (6 * p^2 - 6 * p - 1) / (p * (1 - p)).", () => {
  const r = randomBernoulli.source(randomLcg(0.8260973119979638));
  assertInDelta(kurtosis(range(10000).map(r(0.05))), kurt(0.05), kurt(0.05) * 0.2);
  assertInDelta(kurtosis(range(10000).map(r(0.10))), kurt(0.10), kurt(0.10) * 0.2);
  assertInDelta(kurtosis(range(10000).map(r(0.15))), kurt(0.15), kurt(0.15) * 0.2);
  assertInDelta(kurtosis(range(50000).map(r(0.20))), kurt(0.20), kurt(0.20) * 0.4);
});
