import assert from "assert";
import {deviation, mean, range} from "d3-array";
import {randomLcg, randomPareto} from "../src/index.js";
import {assertInDelta} from "./asserts.js";

function ddeviation(n) {
  return Math.sqrt(n / ((n - 1) * (n - 1) * (n - 2)));
}

it("randomPareto() returns randoms with specified mean", () => {
  const r = randomPareto.source(randomLcg(0.6165632948194271));
  assert.strictEqual(mean(range(10000).map(r(0))), Infinity);
  assert(mean(range(10000).map(r(1))) > 8);
  assertInDelta(mean(range(10000).map(r(3))), 1.5, 0.4);
  assertInDelta(mean(range(10000).map(r(5))), 1.25, 0.1);
  assertInDelta(mean(range(10000).map(r(11))), 1.1, 0.1);
});

it("randomPareto() returns randoms with specified deviation", () => {
  const r = randomPareto.source(randomLcg(0.5733127851951378));
  assert(isNaN(deviation(range(10000).map(r(0)))));
  assert(deviation(range(10000).map(r(1))) > 70);
  assertInDelta(deviation(range(10000).map(r(3))), ddeviation(3), 0.5);
  assertInDelta(deviation(range(10000).map(r(5))), ddeviation(5), 0.05);
  assertInDelta(deviation(range(10000).map(r(11))), ddeviation(11), 0.05);
});

it("randomPareto(3) returns randoms with mean of 1.5 and deviation of 0.9", () => {
  const r = randomPareto.source(randomLcg(0.9341538627900958));
  assertInDelta(deviation(range(10000).map(r(3))), 0.9, 0.2);
  assertInDelta(mean(range(10000).map(r(3))), 1.5, 0.05);
});
