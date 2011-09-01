require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.ease");

suite.addBatch({
  "ease": {
    topic: function() {
      return d3.ease;
    },
    "supports linear easing": function(ease) {
      var e = ease("linear");
      assert.inDelta(e(.5), .5, 1e-6);
    },
    "supports polynomial easing": function(ease) {
      var e = ease("poly", 2);
      assert.inDelta(e(.5), .25, 1e-6);
    },
    "supports quadratic easing": function(ease) {
      var e = ease("quad");
      assert.inDelta(e(.5), .25, 1e-6);
    },
    "supports cubic easing": function(ease) {
      var e = ease("cubic");
      assert.inDelta(e(.5), .125, 1e-6);
    },
    "supports sinusoidal easing": function(ease) {
      var e = ease("sin");
      assert.inDelta(e(.5), 1 - Math.cos(Math.PI / 4), 1e-6);
    },
    "supports exponential easing": function(ease) {
      var e = ease("exp");
      assert.inDelta(e(.5), 0.03125, 1e-6);
    },
    "supports circular easing": function(ease) {
      var e = ease("circle");
      assert.inDelta(e(.5), 0.133975, 1e-6);
    },
    "supports elastic easing": function(ease) {
      var e = ease("elastic");
      assert.inDelta(e(.5), 0.976061, 1e-6);
    },
    "supports back easing": function(ease) {
      var e = ease("back");
      assert.inDelta(e(.5), -0.0876975, 1e-6);
    },
    "supports bounce easing": function(ease) {
      var e = ease("bounce");
      assert.inDelta(e(.5), 0.765625, 1e-6);
    },
    "all easing functions return exactly 0 for t = 0": function(ease) {
      assert.equal(ease("linear")(0), 0);
      assert.equal(ease("poly", 2)(0), 0);
      assert.equal(ease("quad")(0), 0);
      assert.equal(ease("cubic")(0), 0);
      assert.equal(ease("sin")(0), 0);
      assert.equal(ease("exp")(0), 0);
      assert.equal(ease("circle")(0), 0);
      assert.equal(ease("elastic")(0), 0);
      assert.equal(ease("back")(0), 0);
      assert.equal(ease("bounce")(0), 0);
    },
    "all easing functions return exactly 1 for t = 1": function(ease) {
      assert.equal(ease("linear")(1), 1);
      assert.equal(ease("poly", 2)(1), 1);
      assert.equal(ease("quad")(1), 1);
      assert.equal(ease("cubic")(1), 1);
      assert.equal(ease("sin")(1), 1);
      assert.equal(ease("exp")(1), 1);
      assert.equal(ease("circle")(1), 1);
      assert.equal(ease("elastic")(1), 1);
      assert.equal(ease("back")(1), 1);
      assert.equal(ease("bounce")(1), 1);
    },
    "the -in suffix returns the identity": function(ease) {
      assert.inDelta(ease("linear-in")(.25), ease("linear")(.25), 1e-6);
      assert.inDelta(ease("quad-in")(.75), ease("quad")(.75), 1e-6);
    },
    "the -out suffix returns the reverse": function(ease) {
      assert.inDelta(ease("sin-out")(.25), 1 - ease("sin-in")(.75), 1e-6);
      assert.inDelta(ease("bounce-out")(.25), 1 - ease("bounce-in")(.75), 1e-6);
      assert.inDelta(ease("elastic-out")(.25), 1 - ease("elastic-in")(.75), 1e-6);
    },
    "the -in-out suffix returns the reflection": function(ease) {
      assert.inDelta(ease("sin-in-out")(.25), .5 * ease("sin-in")(.5), 1e-6);
      assert.inDelta(ease("bounce-in-out")(.25), .5 * ease("bounce-in")(.5), 1e-6);
      assert.inDelta(ease("elastic-in-out")(.25), .5 * ease("elastic-in")(.5), 1e-6);
    },
    "the -out-in suffix returns the reverse reflection": function(ease) {
      assert.inDelta(ease("sin-out-in")(.25), .5 * ease("sin-out")(.5), 1e-6);
      assert.inDelta(ease("bounce-out-in")(.25), .5 * ease("bounce-out")(.5), 1e-6);
      assert.inDelta(ease("elastic-out-in")(.25), .5 * ease("elastic-out")(.5), 1e-6);
    },
    "clamps input time": function(ease) {
      var e = ease("linear");
      assert.inDelta(e(-1), 0, 1e-6);
      assert.inDelta(e(2), 1, 1e-6);
    },
    "poly": {
      "supports an optional polynomial": function(ease) {
        var e = ease("poly", 1);
        assert.inDelta(e(.5), .5, 1e-6);
        var e = ease("poly", .5);
        assert.inDelta(e(.5), Math.SQRT1_2, 1e-6);
      }
    },
    "elastic": {
      "supports an optional amplifier (>1)": function(ease) {
        var e = ease("elastic", 1.5);
        assert.inDelta(e(.5), 0.998519, 1e-6);
      },
      "supports an optional amplifier (>1) and period (>0)": function(ease) {
        var e = ease("elastic", 1.5, .5);
        assert.inDelta(e(.5), 0.96875, 1e-6);
      }
    },
    "back": {
      "supports an optional speed": function(ease) {
        var e = ease("back", 2);
        assert.inDelta(e(.5), -0.125, 1e-6);
      }
    }
  }
});

suite.export(module);
