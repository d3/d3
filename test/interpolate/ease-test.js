var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.ease");

suite.addBatch({
  "ease": {
    topic: load("interpolate/ease"),
    "supports linear easing": function(d3) {
      var e = d3.ease("linear");
      assert.inDelta(e(.5), .5, 1e-6);
    },
    "supports polynomial easing": function(d3) {
      var e = d3.ease("poly", 2);
      assert.inDelta(e(.5), .25, 1e-6);
    },
    "supports quadratic easing": function(d3) {
      var e = d3.ease("quad");
      assert.inDelta(e(.5), .25, 1e-6);
    },
    "supports cubic easing": function(d3) {
      var e = d3.ease("cubic");
      assert.inDelta(e(.5), .125, 1e-6);
    },
    "supports sinusoidal easing": function(d3) {
      var e = d3.ease("sin");
      assert.inDelta(e(.5), 1 - Math.cos(Math.PI / 4), 1e-6);
    },
    "supports exponential easing": function(d3) {
      var e = d3.ease("exp");
      assert.inDelta(e(.5), 0.03125, 1e-6);
    },
    "supports circular easing": function(d3) {
      var e = d3.ease("circle");
      assert.inDelta(e(.5), 0.133975, 1e-6);
    },
    "supports elastic easing": function(d3) {
      var e = d3.ease("elastic");
      assert.inDelta(e(.5), 0.976061, 1e-6);
    },
    "supports back easing": function(d3) {
      var e = d3.ease("back");
      assert.inDelta(e(.5), -0.0876975, 1e-6);
    },
    "supports bounce easing": function(d3) {
      var e = d3.ease("bounce");
      assert.inDelta(e(.5), 0.765625, 1e-6);
    },
    "invalid eases and modes default to linear-in": function(d3) {
      var e = d3.ease("__proto__-__proto__");
      assert.equal(e(0), 0);
      assert.equal(e(.5), .5);
      assert.equal(e(1), 1);
      var e = d3.ease("hasOwnProperty-constructor");
      assert.equal(e(0), 0);
      assert.equal(e(.5), .5);
      assert.equal(e(1), 1);
    },
    "all easing functions return exactly 0 for t = 0": function(d3) {
      assert.equal(d3.ease("linear")(0), 0);
      assert.equal(d3.ease("poly", 2)(0), 0);
      assert.equal(d3.ease("quad")(0), 0);
      assert.equal(d3.ease("cubic")(0), 0);
      assert.equal(d3.ease("sin")(0), 0);
      assert.equal(d3.ease("exp")(0), 0);
      assert.equal(d3.ease("circle")(0), 0);
      assert.equal(d3.ease("elastic")(0), 0);
      assert.equal(d3.ease("back")(0), 0);
      assert.equal(d3.ease("bounce")(0), 0);
    },
    "all easing functions return exactly 1 for t = 1": function(d3) {
      assert.equal(d3.ease("linear")(1), 1);
      assert.equal(d3.ease("poly", 2)(1), 1);
      assert.equal(d3.ease("quad")(1), 1);
      assert.equal(d3.ease("cubic")(1), 1);
      assert.equal(d3.ease("sin")(1), 1);
      assert.equal(d3.ease("exp")(1), 1);
      assert.equal(d3.ease("circle")(1), 1);
      assert.equal(d3.ease("elastic")(1), 1);
      assert.equal(d3.ease("back")(1), 1);
      assert.equal(d3.ease("bounce")(1), 1);
    },
    "the -in suffix returns the identity": function(d3) {
      assert.inDelta(d3.ease("linear-in")(.25), d3.ease("linear")(.25), 1e-6);
      assert.inDelta(d3.ease("quad-in")(.75), d3.ease("quad")(.75), 1e-6);
    },
    "the -out suffix returns the reverse": function(d3) {
      assert.inDelta(d3.ease("sin-out")(.25), 1 - d3.ease("sin-in")(.75), 1e-6);
      assert.inDelta(d3.ease("bounce-out")(.25), 1 - d3.ease("bounce-in")(.75), 1e-6);
      assert.inDelta(d3.ease("elastic-out")(.25), 1 - d3.ease("elastic-in")(.75), 1e-6);
    },
    "the -in-out suffix returns the reflection": function(d3) {
      assert.inDelta(d3.ease("sin-in-out")(.25), .5 * d3.ease("sin-in")(.5), 1e-6);
      assert.inDelta(d3.ease("bounce-in-out")(.25), .5 * d3.ease("bounce-in")(.5), 1e-6);
      assert.inDelta(d3.ease("elastic-in-out")(.25), .5 * d3.ease("elastic-in")(.5), 1e-6);
    },
    "the -out-in suffix returns the reverse reflection": function(d3) {
      assert.inDelta(d3.ease("sin-out-in")(.25), .5 * d3.ease("sin-out")(.5), 1e-6);
      assert.inDelta(d3.ease("bounce-out-in")(.25), .5 * d3.ease("bounce-out")(.5), 1e-6);
      assert.inDelta(d3.ease("elastic-out-in")(.25), .5 * d3.ease("elastic-out")(.5), 1e-6);
    },
    "clamps input time": function(d3) {
      var e = d3.ease("linear");
      assert.inDelta(e(-1), 0, 1e-6);
      assert.inDelta(e(2), 1, 1e-6);
    },
    "poly": {
      "supports an optional polynomial": function(d3) {
        var e = d3.ease("poly", 1);
        assert.inDelta(e(.5), .5, 1e-6);
        var e = d3.ease("poly", .5);
        assert.inDelta(e(.5), Math.SQRT1_2, 1e-6);
      }
    },
    "elastic": {
      "supports an optional amplifier (>1)": function(d3) {
        var e = d3.ease("elastic", 1.5);
        assert.inDelta(e(.5), 0.998519, 1e-6);
      },
      "supports an optional amplifier (>1) and period (>0)": function(d3) {
        var e = d3.ease("elastic", 1.5, .5);
        assert.inDelta(e(.5), 0.96875, 1e-6);
      }
    },
    "back": {
      "supports an optional speed": function(d3) {
        var e = d3.ease("back", 2);
        assert.inDelta(e(.5), -0.125, 1e-6);
      }
    }
  }
});

suite.export(module);
