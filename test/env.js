document = require("jsdom").jsdom("<html><head></head><body></body></html>");
window = document.createWindow();
navigator = window.navigator;

require("../lib/sizzle/sizzle");
Sizzle = window.Sizzle;

process.env.TZ = "America/Los_Angeles";

var assert = require("assert");

assert.domNull = function(actual, message) {
  if (actual !== null) {
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
    assert.fail(actual+"", "hsl(" + h + "," + (s * 100) + "%," + (l * 100) + "%)", message || "expected {expected}, got {actual}", null, assert.hslEqual);
  }
};

assert.pathEqual = function(actual, expected, message) {
  if (!pathEqual(actual, expected)) {
    assert.fail(actual, expected, message || "expected {expected}, got {actual}", null, assert.pathEqual);
  }
};

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

function parsePath(path) {
  var re = /[-+]?(?:\d+\.\d+|\d+\.|\.\d+|\d+)(?:[eE][-]?\d+)?/g, parts = [];
  for (var i = 0, s0 = 0, s1, m; m = re.exec(path); ++i) {
    if (m.index) {
      var part = path.substring(s0, s1 = m.index);
      if (!/^[, ]$/.test(part)) parts.push(part);
    }
    parts.push(parseFloat(m[0]));
    s0 = re.lastIndex;
  }
  if (s0 < path.length) parts.push(path.substring(s0));
  return parts;
}
