var assert = require("assert");

assert = module.exports = Object.create(assert);

assert.inDelta = function(actual, expected, delta, message) {
  if (!inDelta(actual, expected, delta)) {
    assert.fail(actual, expected, message || "expected {actual} to be in within *" + delta + "* of {expected}", null, assert.inDelta);
  }
};

assert.domNull = function(actual, message) {
  if (actual != null) {
    assert.fail(actual+"", null, message || "expected null, got {actual}", "===", assert.domNull);
  }
};

assert.domEqual = function(actual, expected, message) {
  if (actual !== expected) {
    assert.fail(actual+"", expected+"", message || "expected {expected}, got {actual}", "===", assert.domEqual);
  }
};

assert.rgbEqual = function(actual, r, g, b, message) {
  if (actual.r !== r || actual.g !== g || actual.b !== b) {
    assert.fail("rgb(" + actual.r + "," + actual.g + "," + actual.b + ")", "rgb(" + r + ", " + g + ", " + b + ")", message || "expected {expected}, got {actual}", "===", assert.rgbEqual);
  }
};

assert.hslEqual = function(actual, h, s, l, message) {
  if (Math.abs(actual.h - h) > 1e-6 || Math.abs(actual.s - s) > 1e-6 || Math.abs(actual.l - l) > 1e-6) {
    assert.fail("hsl(" + actual.h + "," + (actual.s * 100) + "%," + (actual.l * 100) + "%)", "hsl(" + h + "," + (s * 100) + "%," + (l * 100) + "%)", message || "expected {expected}, got {actual}", null, assert.hslEqual);
  }
};

assert.pathEqual = function(actual, expected, message) {
  if (!pathEqual(actual, expected)) {
    assert.fail(formatPath(actual), formatPath(expected), message || "expected {expected}, got {actual}", null, assert.pathEqual);
  }
};

function inDelta(actual, expected, delta) {
  return (Array.isArray(expected) ? inDeltaArray : inDeltaNumber)(actual, expected, delta);
}

function inDeltaArray(actual, expected, delta) {
  var n = expected.length, i = -1;
  if (actual.length !== n) return false;
  while (++i < n) if (!inDelta(actual[i], expected[i], delta)) return false;
  return true;
}

function inDeltaNumber(actual, expected, delta) {
  return actual >= expected - delta && actual <= expected + delta;
}

function pathEqual(a, b) {
  a = parsePath(a);
  b = parsePath(b);
  var n = a.length, i = -1, x, y;
  if (n !== b.length) return false;
  while (++i < n) {
    x = a[i];
    y = b[i];
    if (typeof x === "string") {
      if (x !== y) return false;
    } else if (typeof y !== "number") {
      return false;
    } else if (Math.abs(x - y) > 1e-6) {
      return false;
    }
  }
  return true;
}

var reNumber = /[-+]?(?:\d+\.\d+|\d+\.|\.\d+|\d+)(?:[eE][-]?\d+)?/g;

function parsePath(path) {
  var parts = [];
  reNumber.lastIndex = 0;
  for (var i = 0, s0 = 0, s1, m; m = reNumber.exec(path); ++i) {
    if (m.index) {
      var part = path.substring(s0, s1 = m.index);
      if (!/^[, ]$/.test(part)) parts.push(part);
    }
    parts.push(parseFloat(m[0]));
    s0 = reNumber.lastIndex;
  }
  if (s0 < path.length) parts.push(path.substring(s0));
  return parts;
}

function formatPath(path) {
  return path.replace(reNumber, formatNumber);
}

function formatNumber(s) {
  return Math.abs((s = +s) - Math.floor(s)) < 1e-6 ? Math.floor(s) : s.toFixed(6);
}
