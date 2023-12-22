import {median, range} from "d3-array";
import {randomCauchy, randomLcg} from "../src/index.js";
import {assertInDelta} from "./asserts.js";

// Since the Cauchy distribution is "pathological" in that no integral moments exist,
// we simply test for the median, equivalent to the location parameter.

it("randomCauchy(a, b) returns random numbers with a median of a", () => {
  const r = randomCauchy.source(randomLcg(0.42));
  assertInDelta(median(range(10000).map(r())), 0, 0.05);
  assertInDelta(median(range(10000).map(r(5))), 5, 0.05);
  assertInDelta(median(range(10000).map(r(0, 4))), 0, 0.1);
  assertInDelta(median(range(10000).map(r(1, 3))), 1, 0.1);
  assertInDelta(median(range(10000).map(r(3, 1))), 3, 0.05);
});
