import {mean, range} from "d3-array";
import {randomExponential, randomLcg} from "../src/index.js";
import {assertInDelta} from "./asserts.js";

it("randomExponential(lambda) returns random exponentially distributed numbers with a mean of 1/lambda.", () => {
  const r = randomExponential.source(randomLcg(0.42));
  const period = 20;
  const lambda = 1 / period; // average rate (e.g. 1 per 20 minutes)
  const times = range(10000).map(r(lambda));

  assertInDelta(mean(times), period, period * 0.05);

  // Test cumulative distribution in intervals of 10.
  range(10, 100, 10).forEach(function(elapsed) {
    const within = times.filter(t => t <= elapsed);
    const expected = 1 - Math.exp(-elapsed * lambda);
    assertInDelta(within.length / times.length, expected, expected * 0.02);
  });
});
