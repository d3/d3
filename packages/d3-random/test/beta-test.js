import {mean, range, variance} from "d3-array";
import {randomBeta, randomLcg} from "../src/index.js";
import {assertInDelta} from "./asserts.js";

function dmean(alpha, beta) {
  return alpha / (alpha + beta);
}

function dvariance(alpha, beta) {
  return (alpha * beta) / Math.pow(alpha + beta, 2) / (alpha + beta + 1);
}

it("randomBeta(alpha, beta) returns random numbers with a mean of alpha / (alpha + beta)", () => {
  const r = randomBeta.source(randomLcg(0.8275880644751501));
  assertInDelta(mean(range(10000).map(r(1, 1))), dmean(1, 1), 0.05);
  assertInDelta(mean(range(10000).map(r(1, 2))), dmean(1, 2), 0.05);
  assertInDelta(mean(range(10000).map(r(2, 1))), dmean(2, 1), 0.05);
  assertInDelta(mean(range(10000).map(r(3, 4))), dmean(3, 4), 0.05);
  assertInDelta(mean(range(10000).map(r(0.5, 0.5))), dmean(0.5, 0.5), 0.05);
  assertInDelta(mean(range(10000).map(r(2.7, 0.3))), dmean(2.7, 0.3), 0.05);
});

it("randomBeta(alpha, beta) returns random numbers with a variance of (alpha * beta) / (alpha + beta)^2 / (alpha + beta + 1)", () => {
  const r = randomBeta.source(randomLcg(0.8272345925494458));
  assertInDelta(variance(range(10000).map(r(1, 1))), dvariance(1, 1), 0.05);
  assertInDelta(variance(range(10000).map(r(1, 2))), dvariance(1, 2), 0.05);
  assertInDelta(variance(range(10000).map(r(2, 1))), dvariance(2, 1), 0.05);
  assertInDelta(variance(range(10000).map(r(3, 4))), dvariance(3, 4), 0.05);
  assertInDelta(variance(range(10000).map(r(0.5, 0.5))), dvariance(0.5, 0.5), 0.05);
  assertInDelta(variance(range(10000).map(r(2.7, 0.3))), dvariance(2.7, 0.3), 0.05);
});
