import assert from "assert";

export function assertInDelta(actual, expected) {
  assert(expected - 1e-6 < actual && actual < expected + 1e-6);
}
