var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.rgb");

suite.addBatch({
  "rgb": {
    topic: load("color/rgb", "color/hsl").expression("d3"),
    "floors channel values": function(d3) {
      assert.rgbEqual(d3.rgb(1.2, 2.6, 42.9), 1, 2, 42);
    },
    "defaults to black for invalid inputs": function(d3) {
      assert.rgbEqual(d3.rgb("invalid"), 0, 0, 0);
      assert.rgbEqual(d3.rgb("hasOwnProperty"), 0, 0, 0);
      assert.rgbEqual(d3.rgb("__proto__"), 0, 0, 0);
    },
    "does not clamp channel values": function(d3) {
      assert.rgbEqual(d3.rgb(-10, -20, -30), -10, -20, -30);
      assert.rgbEqual(d3.rgb(300, 400, 500), 300, 400, 500);
    },
    "converts string channel values to numbers": function(d3) {
      assert.rgbEqual(d3.rgb("12", "34", "56"), 12, 34, 56);
    },
    "converts null channel values to zero": function(d3) {
      assert.rgbEqual(d3.rgb(null, null, null), 0, 0, 0);
    },
    "exposes r, g and b properties": function(d3) {
      var color = d3.rgb("#abc");
      assert.equal(color.r, 170);
      assert.equal(color.g, 187);
      assert.equal(color.b, 204);
    },
    "changing r, g or b affects the string format": function(d3) {
      var color = d3.rgb("#abc");
      color.r++;
      color.g++;
      color.b++;
      assert.equal(color + "", "#abbccd");
    },
    "parses hexadecimal shorthand format (e.g., \"#abc\")": function(d3) {
      assert.rgbEqual(d3.rgb("#abc"), 170, 187, 204);
    },
    "parses hexadecimal format (e.g., \"#abcdef\")": function(d3) {
      assert.rgbEqual(d3.rgb("#abcdef"), 171, 205, 239);
    },
    "parses RGB format (e.g., \"rgb(12, 34, 56)\")": function(d3) {
      assert.rgbEqual(d3.rgb("rgb(12, 34, 56)"), 12, 34, 56);
    },
    "parses color names (e.g., \"moccasin\")": function(d3) {
      assert.rgbEqual(d3.rgb("moccasin"), 255, 228, 181);
      assert.rgbEqual(d3.rgb("aliceblue"), 240, 248, 255);
      assert.rgbEqual(d3.rgb("yellow"), 255, 255, 0);
      assert.rgbEqual(d3.rgb("Moccasin"), 255, 228, 181);
      assert.rgbEqual(d3.rgb("Aliceblue"), 240, 248, 255);
      assert.rgbEqual(d3.rgb("Yellow"), 255, 255, 0);
    },
    "parses \"rebeccapurple\"": function(d3) {
      assert.rgbEqual(d3.rgb("rebeccapurple"), 102, 51, 153);
    },
    "parses and converts HSL format (e.g., \"hsl(60, 100%, 20%)\")": function(d3) {
      assert.rgbEqual(d3.rgb("hsl(60, 100%, 20%)"), 102, 102, 0);
    },
    "can convert from RGB": function(d3) {
      assert.rgbEqual(d3.rgb(d3.rgb(12, 34, 56)), 12, 34, 56);
    },
    "can convert from HSL": function(d3) {
      assert.rgbEqual(d3.rgb(d3.hsl(0, 1, 0.5)), 255, 0, 0);
    },
    "can convert to HSL": function(d3) {
      assert.hslEqual(d3.rgb("red").hsl(), 0, 1, 0.5);
    },
    "can derive a brighter color": function(d3) {
      assert.rgbEqual(d3.rgb("brown").brighter(), 235, 60, 60);
      assert.rgbEqual(d3.rgb("brown").brighter(0.5), 197, 50, 50);
      assert.rgbEqual(d3.rgb("brown").brighter(1), 235, 60, 60);
      assert.rgbEqual(d3.rgb("brown").brighter(2), 255, 85, 85);
    },
    "can derive a darker color": function(d3) {
      assert.rgbEqual(d3.rgb("coral").darker(), 178, 88, 56);
      assert.rgbEqual(d3.rgb("coral").darker(0.5), 213, 106, 66);
      assert.rgbEqual(d3.rgb("coral").darker(1), 178, 88, 56);
      assert.rgbEqual(d3.rgb("coral").darker(2), 124, 62, 39);
    },
    "string coercion returns hexadecimal format": function(d3) {
      assert.strictEqual(d3.rgb("#abcdef") + "", "#abcdef");
      assert.strictEqual(d3.rgb("moccasin") + "", "#ffe4b5");
      assert.strictEqual(d3.rgb("hsl(60, 100%, 20%)") + "", "#666600");
      assert.strictEqual(d3.rgb("rgb(12, 34, 56)") + "", "#0c2238");
      assert.strictEqual(d3.rgb(d3.rgb(12, 34, 56)) + "", "#0c2238");
      assert.strictEqual(d3.rgb(d3.hsl(60, 1, 0.2)) + "", "#666600");
    }
  }
});

suite.export(module);
