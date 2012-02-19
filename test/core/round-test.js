require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.round");

suite.addBatch({
  "round": {
    topic: function() {
      return d3.round;
    },
    "returns a number": function(round) {
      assert.isNumber(round(42));
    },
    "returns zero for zero": function(round) {
      assert.equal(round(0), 0);
    },
    "ignores degenerate input": function(round) {
      assert.isNaN(round(NaN));
      assert.equal(round(Infinity), Infinity);
      assert.equal(round(-Infinity), -Infinity);
    },
    "returns integers by default": function(round) {
      assert.equal(round(10.6), 11);
      assert.equal(round(10.4), 10);
      assert.equal(round(0.6), 1);
      assert.equal(round(0.4), 0);
      assert.equal(round(-0.6), -1);
      assert.equal(round(-0.4), 0);
      assert.equal(round(-10.6), -11);
      assert.equal(round(-10.4), -10);
    },
    "rounds to the specified decimal place": function(round) {
      assert.inDelta(round(10.56, 1), 10.6, 1e-6);
      assert.inDelta(round(10.54, 1), 10.5, 1e-6);
      assert.inDelta(round(0.56, 1), 0.6, 1e-6);
      assert.inDelta(round(0.54, 1), 0.5, 1e-6);
      assert.inDelta(round(-0.56, 1), -0.6, 1e-6);
      assert.inDelta(round(-0.54, 1), -0.5, 1e-6);
      assert.inDelta(round(-10.56, 1), -10.6, 1e-6);
      assert.inDelta(round(-10.54, 1), -10.5, 1e-6);
      assert.inDelta(round(10.556, 2), 10.56, 1e-6);
      assert.inDelta(round(10.554, 2), 10.55, 1e-6);
      assert.inDelta(round(0.556, 2), 0.56, 1e-6);
      assert.inDelta(round(0.554, 2), 0.55, 1e-6);
      assert.inDelta(round(-0.556, 2), -0.56, 1e-6);
      assert.inDelta(round(-0.554, 2), -0.55, 1e-6);
      assert.inDelta(round(-10.556, 2), -10.56, 1e-6);
      assert.inDelta(round(-10.554, 2), -10.55, 1e-6);
    },
    "rounds to the specified significant digits": function(round) {
      assert.equal(round(123.45, -1), 120);
      assert.equal(round(345.67, -1), 350);
      assert.equal(round(-123.45, -1), -120);
      assert.equal(round(-345.67, -1), -350);
      assert.equal(round(123.45, -2), 100);
      assert.equal(round(456.78, -2), 500);
      assert.equal(round(-123.45, -2), -100);
      assert.equal(round(-456.78, -2), -500);
      assert.equal(round(123.45, -3), 0);
      assert.equal(round(567.89, -3), 1000);
      assert.equal(round(-123.45, -3), 0);
      assert.equal(round(-567.89, -3), -1000);
    }
  }
});

suite.export(module);
