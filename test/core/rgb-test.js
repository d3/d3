require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.rgb");

suite.addBatch({
  "rgb": {
    topic: function() {
      return d3.rgb;
    },
    "floors channel values": function(rgb) {
      assert.rgbEqual(rgb(1.2, 2.6, 42.9), 1, 2, 42);
    },
    "does not clamp channel values": function(rgb) {
      assert.rgbEqual(rgb(-10, -20, -30), -10, -20, -30);
      assert.rgbEqual(rgb(300, 400, 500), 300, 400, 500);
    },
    "converts string channel values to numbers": function(rgb) {
      assert.rgbEqual(rgb("12", "34", "56"), 12, 34, 56);
    },
    "converts null channel values to zero": function(rgb) {
      assert.rgbEqual(rgb(null, null, null), 0, 0, 0);
    },
    "exposes r, g and b properties": function(rgb) {
      var color = rgb("#abc");
      assert.equal(color.r, 170);
      assert.equal(color.g, 187);
      assert.equal(color.b, 204);
    },
    "changing r, g or b affects the string format": function(rgb) {
      var color = rgb("#abc");
      color.r++;
      color.g++;
      color.b++;
      assert.equal(color + "", "#abbccd");
    },
    "parses hexadecimal shorthand format (e.g., \"#abc\")": function(rgb) {
      assert.rgbEqual(rgb("#abc"), 170, 187, 204);
    },
    "parses hexadecimal format (e.g., \"#abcdef\")": function(rgb) {
      assert.rgbEqual(rgb("#abcdef"), 171, 205, 239);
    },
    "parses RGB format (e.g., \"rgb(12, 34, 56)\")": function(rgb) {
      assert.rgbEqual(rgb("rgb(12, 34, 56)"), 12, 34, 56);
    },
    "parses color names (e.g., \"moccasin\")": function(rgb) {
      assert.rgbEqual(rgb("moccasin"), 255, 228, 181);
      assert.rgbEqual(rgb("aliceblue"), 240, 248, 255);
      assert.rgbEqual(rgb("yellow"), 255, 255, 0);
    },
    "parses and converts HSL format (e.g., \"hsl(60, 100%, 20%)\")": function(rgb) {
      assert.rgbEqual(rgb("hsl(60, 100%, 20%)"), 102, 102, 0);
    },
    "can convert from RGB": function(rgb) {
      assert.rgbEqual(rgb(d3.rgb(12, 34, 56)), 12, 34, 56);
    },
    "can convert from HSL": function(rgb) {
      assert.rgbEqual(rgb(d3.hsl(0, 1, .5)), 255, 0, 0);
    },
    "can convert to HSL": function(rgb) {
      assert.hslEqual(rgb("red").hsl(), 0, 1, .5);
    },
    "can derive a brighter color": function(rgb) {
      assert.rgbEqual(rgb("brown").brighter(), 235, 60, 60);
      assert.rgbEqual(rgb("brown").brighter(.5), 197, 50, 50);
      assert.rgbEqual(rgb("brown").brighter(1), 235, 60, 60);
      assert.rgbEqual(rgb("brown").brighter(2), 255, 85, 85);
    },
    "can derive a darker color": function(rgb) {
      assert.rgbEqual(rgb("coral").darker(), 178, 88, 56);
      assert.rgbEqual(rgb("coral").darker(.5), 213, 106, 66);
      assert.rgbEqual(rgb("coral").darker(1), 178, 88, 56);
      assert.rgbEqual(rgb("coral").darker(2), 124, 62, 39);
    },
    "string coercion returns hexadecimal format": function(rgb) {
      assert.strictEqual(rgb("#abcdef") + "", "#abcdef");
      assert.strictEqual(rgb("moccasin") + "", "#ffe4b5");
      assert.strictEqual(rgb("hsl(60, 100%, 20%)") + "", "#666600");
      assert.strictEqual(rgb("rgb(12, 34, 56)") + "", "#0c2238");
      assert.strictEqual(rgb(d3.rgb(12, 34, 56)) + "", "#0c2238");
      assert.strictEqual(rgb(d3.hsl(60, 1, .2)) + "", "#666600");
    }
  }
});

suite.export(module);
