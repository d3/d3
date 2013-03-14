var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.round");

suite.addBatch({
  "round": {
    topic: load("format/round"),
    "returns a number": function(d3) {
      assert.isNumber(d3.round(42));
    },
    "returns zero for zero": function(d3) {
      assert.equal(d3.round(0), 0);
    },
    "ignores degenerate input": function(d3) {
      assert.isNaN(d3.round(NaN));
      assert.equal(d3.round(Infinity), Infinity);
      assert.equal(d3.round(-Infinity), -Infinity);
    },
    "returns integers by default": function(d3) {
      assert.equal(d3.round(10.6), 11);
      assert.equal(d3.round(10.4), 10);
      assert.equal(d3.round(0.6), 1);
      assert.equal(d3.round(0.4), 0);
      assert.equal(d3.round(-0.6), -1);
      assert.equal(d3.round(-0.4), 0);
      assert.equal(d3.round(-10.6), -11);
      assert.equal(d3.round(-10.4), -10);
    },
    "rounds to the specified decimal place": function(d3) {
      assert.inDelta(d3.round(10.56, 1), 10.6, 1e-6);
      assert.inDelta(d3.round(10.54, 1), 10.5, 1e-6);
      assert.inDelta(d3.round(0.56, 1), 0.6, 1e-6);
      assert.inDelta(d3.round(0.54, 1), 0.5, 1e-6);
      assert.inDelta(d3.round(-0.56, 1), -0.6, 1e-6);
      assert.inDelta(d3.round(-0.54, 1), -0.5, 1e-6);
      assert.inDelta(d3.round(-10.56, 1), -10.6, 1e-6);
      assert.inDelta(d3.round(-10.54, 1), -10.5, 1e-6);
      assert.inDelta(d3.round(10.556, 2), 10.56, 1e-6);
      assert.inDelta(d3.round(10.554, 2), 10.55, 1e-6);
      assert.inDelta(d3.round(0.556, 2), 0.56, 1e-6);
      assert.inDelta(d3.round(0.554, 2), 0.55, 1e-6);
      assert.inDelta(d3.round(-0.556, 2), -0.56, 1e-6);
      assert.inDelta(d3.round(-0.554, 2), -0.55, 1e-6);
      assert.inDelta(d3.round(-10.556, 2), -10.56, 1e-6);
      assert.inDelta(d3.round(-10.554, 2), -10.55, 1e-6);
    },
    "rounds to the specified significant digits": function(d3) {
      assert.equal(d3.round(123.45, -1), 120);
      assert.equal(d3.round(345.67, -1), 350);
      assert.equal(d3.round(-123.45, -1), -120);
      assert.equal(d3.round(-345.67, -1), -350);
      assert.equal(d3.round(123.45, -2), 100);
      assert.equal(d3.round(456.78, -2), 500);
      assert.equal(d3.round(-123.45, -2), -100);
      assert.equal(d3.round(-456.78, -2), -500);
      assert.equal(d3.round(123.45, -3), 0);
      assert.equal(d3.round(567.89, -3), 1000);
      assert.equal(d3.round(-123.45, -3), 0);
      assert.equal(d3.round(-567.89, -3), -1000);
    }
  }
});

suite.export(module);
