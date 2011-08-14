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
    assert.fail("rgb(" + actual.r + ", " + actual.g + ", " + actual.b + ")", "rgb(" + r + ", " + g + ", " + b + ")", message || "expected {expected}, got {actual}", "===", assert.rgbEqual);
  }
};

assert.hslEqual = function(actual, h, s, l, message) {
  if (actual.h !== h || actual.s !== s || actual.l !== l) {
    assert.fail(actual+"", "hsl(" + h + ", " + (s * 100) + "%, " + (l * 100) + "%)", message || "expected {expected}, got {actual}", "===", assert.hslEqual);
  }
};
