import assert from "assert";

export function assertInDelta(actual, expected, delta = 1e-6) {
  assert(inDelta(actual, expected, delta));
}

function inDelta(actual, expected, delta) {
  return (Array.isArray(expected) ? inDeltaArray : inDeltaNumber)(actual, expected, delta);
}

function inDeltaArray(actual, expected, delta) {
  const n = expected.length;
  if (actual.length !== n) return false;
  for (let i = 0; i < n; ++i) if (!inDelta(actual[i], expected[i], delta)) return false;
  return true;
}

function inDeltaNumber(actual, expected, delta) {
  return actual >= expected - delta && actual <= expected + delta;
}
