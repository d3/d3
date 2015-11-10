var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.ease");

suite.addBatch({
  "ease": {
    topic: load("interpolate/ease").expression("d3.ease"),
    "supports linear easing": function(ease) {
      var e = ease("linear");
      assert.inDelta(e(0.5), 0.5, 1e-6);
    },
    "supports polynomial easing": function(ease) {
      var e = ease("poly", 2);
      assert.inDelta(e(0.5), 0.25, 1e-6);
    },
    "supports quadratic easing": function(ease) {
      var e = ease("quad");
      assert.inDelta(e(0.5), 0.25, 1e-6);
    },
    "supports cubic easing": function(ease) {
      var e = ease("cubic");
      assert.inDelta(e(0.5), 0.125, 1e-6);
    },
    "supports sinusoidal easing": function(ease) {
      var e = ease("sin");
      assert.inDelta(e(0.5), 1 - Math.cos(Math.PI / 4), 1e-6);
    },
    "supports exponential easing": function(ease) {
      var e = ease("exp");
      assert.inDelta(e(0.5), 0.03125, 1e-6);
    },
    "supports circular easing": function(ease) {
      var e = ease("circle");
      assert.inDelta(e(0.5), 0.133975, 1e-6);
    },
    "supports elastic easing": function(ease) {
      var e = ease("elastic");
      assert.inDelta(e(0.5), 0.976061, 1e-6);
    },
    "supports back easing": function(ease) {
      var e = ease("back");
      assert.inDelta(e(0.5), -0.0876975, 1e-6);
    },
    "supports bounce easing": function(ease) {
      var e = ease("bounce");
      assert.inDelta(e(0.5), 0.765625, 1e-6);
    },
    "invalid eases and modes default to linear-in": function(ease) {
      var e = ease("__proto__-__proto__");
      assert.strictEqual(e(0), 0);
      assert.strictEqual(e(0.5), 0.5);
      assert.strictEqual(e(1), 1);
      var e = ease("hasOwnProperty-constructor");
      assert.strictEqual(e(0), 0);
      assert.strictEqual(e(0.5), 0.5);
      assert.strictEqual(e(1), 1);
    },
    "all easing functions return exactly 0 for t = 0": function(ease) {
      assert.strictEqual(ease("linear")(0), 0);
      assert.strictEqual(ease("poly", 2)(0), 0);
      assert.strictEqual(ease("quad")(0), 0);
      assert.strictEqual(ease("cubic")(0), 0);
      assert.strictEqual(ease("sin")(0), 0);
      assert.strictEqual(ease("exp")(0), 0);
      assert.strictEqual(ease("circle")(0), 0);
      assert.strictEqual(ease("elastic")(0), 0);
      assert.strictEqual(ease("back")(0), 0);
      assert.strictEqual(ease("bounce")(0), 0);
    },
    "all easing functions return exactly 1 for t = 1": function(ease) {
      assert.strictEqual(ease("linear")(1), 1);
      assert.strictEqual(ease("poly", 2)(1), 1);
      assert.strictEqual(ease("quad")(1), 1);
      assert.strictEqual(ease("cubic")(1), 1);
      assert.strictEqual(ease("sin")(1), 1);
      assert.strictEqual(ease("exp")(1), 1);
      assert.strictEqual(ease("circle")(1), 1);
      assert.strictEqual(ease("elastic")(1), 1);
      assert.strictEqual(ease("back")(1), 1);
      assert.strictEqual(ease("bounce")(1), 1);
    },
    "the -in suffix returns the identity": function(ease) {
      assert.inDelta(ease("linear-in")(0.25), ease("linear")(0.25), 1e-6);
      assert.inDelta(ease("quad-in")(0.75), ease("quad")(0.75), 1e-6);
    },
    "the -out suffix returns the reverse": function(ease) {
      assert.inDelta(ease("sin-out")(0.25), 1 - ease("sin-in")(0.75), 1e-6);
      assert.inDelta(ease("bounce-out")(0.25), 1 - ease("bounce-in")(0.75), 1e-6);
      assert.inDelta(ease("elastic-out")(0.25), 1 - ease("elastic-in")(0.75), 1e-6);
    },
    "the -in-out suffix returns the reflection": function(ease) {
      assert.inDelta(ease("sin-in-out")(0.25), 0.5 * ease("sin-in")(0.5), 1e-6);
      assert.inDelta(ease("bounce-in-out")(0.25), 0.5 * ease("bounce-in")(0.5), 1e-6);
      assert.inDelta(ease("elastic-in-out")(0.25), 0.5 * ease("elastic-in")(0.5), 1e-6);
    },
    "the -out-in suffix returns the reverse reflection": function(ease) {
      assert.inDelta(ease("sin-out-in")(0.25), 0.5 * ease("sin-out")(0.5), 1e-6);
      assert.inDelta(ease("bounce-out-in")(0.25), 0.5 * ease("bounce-out")(0.5), 1e-6);
      assert.inDelta(ease("elastic-out-in")(0.25), 0.5 * ease("elastic-out")(0.5), 1e-6);
    },
    "clamps input time": function(ease) {
      var e = ease("linear");
      assert.inDelta(e(-1), 0, 1e-6);
      assert.inDelta(e(2), 1, 1e-6);
    },
    "poly": {
      "supports an optional polynomial": function(ease) {
        var e = ease("poly", 1);
        assert.inDelta(e(0.5), 0.5, 1e-6);
        var e = ease("poly", 0.5);
        assert.inDelta(e(0.5), Math.SQRT1_2, 1e-6);
      }
    },
    "elastic": {
      "supports an optional amplifier (>1)": function(ease) {
        var e = ease("elastic", 1.5);
        assert.inDelta(e(0.5), 0.998519, 1e-6);
      },
      "supports an optional amplifier (>1) and period (>0)": function(ease) {
        var e = ease("elastic", 1.5, 0.5);
        assert.inDelta(e(0.5), 0.96875, 1e-6);
      }
    },
    "back": {
      "supports an optional speed": function(ease) {
        var e = ease("back", 2);
        assert.inDelta(e(0.5), -0.125, 1e-6);
      }
    }
  }
});

suite.export(module);
