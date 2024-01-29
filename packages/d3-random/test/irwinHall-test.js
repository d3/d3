import {mean, range, variance} from "d3-array";
import {randomIrwinHall, randomLcg} from "../src/index.js";
import {skewness, kurtosis} from "./statistics.js";
import {assertInDelta} from "./asserts.js";

it("randomIrwinHall(n) returns random numbers with a mean of n / 2", () => {
  const r = randomIrwinHall.source(randomLcg(0.028699383123896194));
  assertInDelta(mean(range(10000).map(r(1))), 1 / 2, 0.05);
  assertInDelta(mean(range(10000).map(r(10))), 10 / 2, 0.05);
  assertInDelta(mean(range(10000).map(r(1.5))), 1.5 / 2, 0.05);
  assertInDelta(mean(range(10000).map(r(4.2))), 4.2 / 2, 0.05);
});

it("randomIrwinHall(n) returns random numbers with a variance of n / 12", () => {
  const r = randomIrwinHall.source(randomLcg(0.1515471143624345));
  assertInDelta(variance(range(10000).map(r(1))), 1 / 12, 0.05);
  assertInDelta(variance(range(10000).map(r(10))), 10 / 12, 0.05);
  assertInDelta(variance(range(10000).map(r(1.5))), 1.5 / 12, 0.05);
  assertInDelta(variance(range(10000).map(r(4.2))), 4.2 / 12, 0.05);
});

it("randomIrwinHall(n) returns random numbers with a skewness of 0", () => {
  const r = randomIrwinHall.source(randomLcg(0.47334122849782845));
  assertInDelta(skewness(range(10000).map(r(1))), 0, 0.05);
  assertInDelta(skewness(range(10000).map(r(10))), 0, 0.05);
  assertInDelta(skewness(range(10000).map(r(1.5))), 0, 0.05);
  assertInDelta(skewness(range(10000).map(r(4.2))), 0, 0.05);
});

it("randomIrwinHall(n) returns random numbers with a kurtosis of -6 / (5 * n)", () => {
  const r = randomIrwinHall.source(randomLcg(0.8217913599574529));
  assertInDelta(kurtosis(range(10000).map(r(1))), -6 / 5, 0.1);
  assertInDelta(kurtosis(range(10000).map(r(10))), -6 / 50, 0.1);
  assertInDelta(kurtosis(range(10000).map(r(1.5))), -6 / 7.5, 0.05);
  assertInDelta(kurtosis(range(10000).map(r(4.2))), -6 / 21, 0.05);
});
