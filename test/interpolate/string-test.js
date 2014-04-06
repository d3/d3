var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.interpolateString");

suite.addBatch({
  "interpolateString": {
    topic: load("interpolate/string").expression("d3.interpolateString"),
    "interpolates matching numbers in both strings": function(interpolate) {
      assert.strictEqual(interpolate(" 10/20 30", "50/10 100 ")(.2), "18/18 44 ");
      assert.strictEqual(interpolate(" 10/20 30", "50/10 100 ")(.4), "26/16 58 ");
    },
    "coerces objects to strings": function(interpolate) {
      assert.strictEqual(interpolate({toString: function() { return "2px"; }}, {toString: function() { return "12px"; }})(.4), "6px");
    },
    "preserves non-numbers in string b": function(interpolate) {
      assert.strictEqual(interpolate(" 10/20 30", "50/10 foo ")(.2), "18/18 foo ");
      assert.strictEqual(interpolate(" 10/20 30", "50/10 foo ")(.4), "26/16 foo ");
    },
    "preserves non-matching numbers in string b": function(interpolate) {
      assert.strictEqual(interpolate(" 10/20 foo", "50/10 100 ")(.2), "18/18 100 ");
      assert.strictEqual(interpolate(" 10/20 bar", "50/10 100 ")(.4), "26/16 100 ");
    },
    "preserves equal-value numbers in both strings": function(interpolate) {
      assert.strictEqual(interpolate(" 10/20 100 20", "50/10 100, 20 ")(.2), "18/18 100, 20 ");
      assert.strictEqual(interpolate(" 10/20 100 20", "50/10 100, 20 ")(.4), "26/16 100, 20 ");
    },
    "interpolates decimal notation correctly": function(interpolate) {
      assert.strictEqual(interpolate("1.", "2.")(.5), "1.5");
    },
    "interpolates exponent notation correctly": function(interpolate) {
      assert.strictEqual(interpolate("1e+3", "1e+4")(.5), "5500");
      assert.strictEqual(interpolate("1e-3", "1e-4")(.5), "0.00055");
      assert.strictEqual(interpolate("1.e-3", "1.e-4")(.5), "0.00055");
      assert.strictEqual(interpolate("-1.e-3", "-1.e-4")(.5), "-0.00055");
      assert.strictEqual(interpolate("+1.e-3", "+1.e-4")(.5), "0.00055");
      assert.strictEqual(interpolate(".1e-2", ".1e-3")(.5), "0.00055");
    },
    "with no numbers, returns the target string": function(interpolate) {
      assert.strictEqual(interpolate("foo", "bar")(.5), "bar");
      assert.strictEqual(interpolate("foo", "")(.5), "");
      assert.strictEqual(interpolate("", "bar")(.5), "bar");
      assert.strictEqual(interpolate("", "")(.5), "");
    },
    "with two numerically-equivalent numbers, returns the default format": function(interpolate) {
      assert.strictEqual(interpolate("top: 1000px;", "top: 1e3px;")(.5), "top: 1000px;");
      assert.strictEqual(interpolate("top: 1e3px;", "top: 1000px;")(.5), "top: 1000px;");
    }
  }
});

suite.export(module);
