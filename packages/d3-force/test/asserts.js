import assert from "assert";

export function assertNodeEqual(actual, expected, delta = 1e-6) {
  assert(nodeEqual(actual, expected, delta), `${actual} and ${expected} should be similar`);
}

function nodeEqual(actual, expected, delta) {
  return actual.index == expected.index
      && Math.abs(actual.x - expected.x) < delta
      && Math.abs(actual.vx - expected.vx) < delta
      && Math.abs(actual.y - expected.y) < delta
      && Math.abs(actual.vy - expected.vy) < delta
      && !(Math.abs(actual.fx - expected.fx) > delta)
      && !(Math.abs(actual.fy - expected.fy) > delta);
}
