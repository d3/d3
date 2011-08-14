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
