import assert from "assert";

export function assertInRange(actual, expectedMin, expectedMax) {
  assert(expectedMin <= actual && actual <= expectedMax,
    `${actual} should be in range of [${expectedMin}, ${expectedMax}]`
  );
}
