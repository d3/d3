import assert from "assert";

export function assertInDelta(actual, expected, delta) {
  assert(expected - delta <= actual && actual <= expected + delta, `${actual} should be within ${delta} of ${expected}`);
}
