import {deviation, mean, range} from "d3-array";
import {randomLcg, randomLogNormal} from "../src/index.js";
import {assertInDelta} from "./asserts.js";

it("randomLogNormal() returns random numbers with a log-mean of zero", () => {
  const r = randomLogNormal.source(randomLcg(0.9575554996277458));
  assertInDelta(mean(range(10000).map(r()), Math.log), 0, 0.05);
});

it("randomLogNormal() returns random numbers with a log-standard deviation of one", () => {
  const r = randomLogNormal.source(randomLcg(0.7369869597887295));
  assertInDelta(deviation(range(10000).map(r()), Math.log), 1, 0.05);
});

it("randomLogNormal(mu) returns random numbers with the specified log-mean", () => {
  const r = randomLogNormal.source(randomLcg(0.2083455771760374));
  assertInDelta(mean(range(10000).map(r(42)), Math.log), 42, 0.05);
  assertInDelta(mean(range(10000).map(r(-2)), Math.log), -2, 0.05);
});

it("randomLogNormal(mu) returns random numbers with a log-standard deviation of 1", () => {
  const r = randomLogNormal.source(randomLcg(0.7805370705171648));
  assertInDelta(deviation(range(10000).map(r(42)), Math.log), 1, 0.05);
  assertInDelta(deviation(range(10000).map(r(-2)), Math.log), 1, 0.05);
});

it("randomLogNormal(mu, sigma) returns random numbers with the specified log-mean and log-standard deviation", () => {
  const r = randomLogNormal.source(randomLcg(0.5178163416754684));
  assertInDelta(mean(range(10000).map(r(42, 2)), Math.log), 42, 0.05);
  assertInDelta(mean(range(10000).map(r(-2, 2)), Math.log), -2, 0.05);
  assertInDelta(deviation(range(10000).map(r(42, 2)), Math.log), 2, 0.05);
  assertInDelta(deviation(range(10000).map(r(-2, 2)), Math.log), 2, 0.05);
});
