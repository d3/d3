import assert from "assert";

export function assertPathEqual(actual, expected) {
  assert.strictEqual(normalizePath(actual + ""), normalizePath(expected + ""));
}

const reNumber = /[-+]?(?:\d+\.\d+|\d+\.|\.\d+|\d+)(?:[eE][-]?\d+)?/g;

function normalizePath(path) {
  return path.replace(reNumber, formatNumber);
}

function formatNumber(s) {
  return Math.abs((s = +s) - Math.round(s)) < 1e-6 ? Math.round(s) : s.toFixed(6);
}
