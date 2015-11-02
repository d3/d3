var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.hsl");

suite.addBatch({
  "hsl": {
    topic: load("color/hsl", "color/rgb").expression("d3"),
    "does not clamp channel values": function(d3) {
      assert.hslEqual(d3.hsl(-100, -1, -2), -100, -1, -2);
      assert.hslEqual(d3.hsl(400, 2, 3), 400, 2, 3);
    },
    "converts string channel values to numbers": function(d3) {
      assert.hslEqual(d3.hsl("180", ".5", ".6"), 180, 0.5, 0.6);
    },
    "converts null channel values to zero": function(d3) {
      assert.hslEqual(d3.hsl(null, null, null), 0, 0, 0);
    },
    "exposes h, s and l properties": function(d3) {
      assert.hslEqual(d3.hsl("hsl(180, 50%, 60%)"), 180, 0.5, 0.6);
    },
    "changing h, s or l affects the string format": function(d3) {
      var color = d3.hsl("hsl(180, 50%, 60%)");
      color.h++;
      color.s += 0.1;
      color.l += 0.1;
      assert.equal(color + "", "#85dfe0");
    },
    "parses hexadecimal shorthand format (e.g., \"#abc\")": function(d3) {
      assert.hslEqual(d3.hsl("#abc"), 210, 0.25, 0.733333);
    },
    "parses hexadecimal format (e.g., \"#abcdef\")": function(d3) {
      assert.hslEqual(d3.hsl("#abcdef"), 210, 0.68, 0.803922);
    },
    "parses HSL format (e.g., \"hsl(210, 64%, 13%)\")": function(d3) {
      assert.hslEqual(d3.hsl("hsl(210, 64.7058%, 13.33333%)"), 210, 0.647058, 0.133333);
    },
    "parses color names (e.g., \"moccasin\")": function(d3) {
      assert.hslEqual(d3.hsl("moccasin"), 38.108108, 1, 0.854902);
      assert.hslEqual(d3.hsl("aliceblue"), 208, 1, 0.970588);
      assert.hslEqual(d3.hsl("yellow"), 60, 1, 0.5);
      assert.hslEqual(d3.hsl("Moccasin"), 38.108108, 1, 0.854902);
      assert.hslEqual(d3.hsl("Aliceblue"), 208, 1, 0.970588);
      assert.hslEqual(d3.hsl("Yellow"), 60, 1, 0.5);
    },
    "parses and converts RGB format (e.g., \"rgb(102, 102, 0)\")": function(d3) {
      assert.hslEqual(d3.hsl("rgb(102, 102, 0)"), 60, 1, 0.2);
    },
    "can convert from RGB": function(d3) {
      assert.hslEqual(d3.hsl(d3.rgb(12, 34, 56)), 210, 0.647058, 0.133333);
    },
    "can convert from HSL": function(d3) {
      assert.hslEqual(d3.hsl(d3.hsl(20, 0.8, 0.3)), 20, 0.8, 0.3);
    },
    "can convert to RGB": function(d3) {
      assert.rgbEqual(d3.hsl("steelblue").rgb(), 70, 130, 180);
    },
    "can derive a brighter color": function(d3) {
      assert.hslEqual(d3.hsl("steelblue").brighter(), 207.272727, 0.44, 0.7002801);
      assert.hslEqual(d3.hsl("steelblue").brighter(0.5), 207.272727, 0.44, 0.5858964);
      assert.hslEqual(d3.hsl("steelblue").brighter(1), 207.272727, 0.44, 0.7002801);
      assert.hslEqual(d3.hsl("steelblue").brighter(2), 207.272727, 0.44, 1.0004002);
    },
    "can derive a darker color": function(d3) {
      assert.hslEqual(d3.hsl("lightsteelblue").darker(), 213.913043, 0.4107143, 0.5462745);
      assert.hslEqual(d3.hsl("lightsteelblue").darker(0.5), 213.913043, 0.4107143, 0.6529229);
      assert.hslEqual(d3.hsl("lightsteelblue").darker(1), 213.913043, 0.4107143, 0.5462745);
      assert.hslEqual(d3.hsl("lightsteelblue").darker(2), 213.913043, 0.4107143, 0.38239216);
    },
    "string coercion returns RGB format": function(d3) {
      assert.strictEqual(d3.hsl("hsl(60, 100%, 20%)") + "", "#666600");
      assert.strictEqual(d3.hsl(d3.hsl(60, 1, 0.2)) + "", "#666600");
    },
    "h is preserved when explicitly specified, even for grayscale colors": function(d3) {
      assert.hslEqual(d3.hsl(0, 0, 0), 0, 0, 0);
      assert.hslEqual(d3.hsl(42, 0, 0.5), 42, 0, 0.5);
      assert.hslEqual(d3.hsl(118, 0, 1), 118, 0, 1);
    },
    "h is undefined when not explicitly specified for grayscale colors": function(d3) {
      assert.hslEqual(d3.hsl("#000"), NaN, NaN, 0);
      assert.hslEqual(d3.hsl("black"), NaN, NaN, 0);
      assert.hslEqual(d3.hsl(d3.rgb("black")), NaN, NaN, 0);
      assert.hslEqual(d3.hsl("#ccc"), NaN, 0, 0.8);
      assert.hslEqual(d3.hsl("gray"), NaN, 0, 0.5);
      assert.hslEqual(d3.hsl(d3.rgb("gray")), NaN, 0, 0.5);
      assert.hslEqual(d3.hsl("#fff"), NaN, NaN, 1);
      assert.hslEqual(d3.hsl("white"), NaN, NaN, 1);
      assert.hslEqual(d3.hsl(d3.rgb("white")), NaN, NaN, 1);
    },
    "s is preserved when explicitly specified, even for white or black": function(d3) {
      assert.hslEqual(d3.hsl(0, 0, 0), 0, 0, 0);
      assert.hslEqual(d3.hsl(0, 0.18, 0), 0, 0.18, 0);
      assert.hslEqual(d3.hsl(0, 0.42, 1), 0, 0.42, 1);
      assert.hslEqual(d3.hsl(0, 1, 1), 0, 1, 1);
    },
    "s is zero for grayscale colors (but not white and black)": function(d3) {
      assert.hslEqual(d3.hsl("#ccc"), NaN, 0, 0.8);
      assert.hslEqual(d3.hsl("#777"), NaN, 0, 0.47);
    },
    "s is undefined when not explicitly specified for white or black": function(d3) {
      assert.hslEqual(d3.hsl("#000"), NaN, NaN, 0);
      assert.hslEqual(d3.hsl("black"), NaN, NaN, 0);
      assert.hslEqual(d3.hsl(d3.rgb("black")), NaN, NaN, 0);
      assert.hslEqual(d3.hsl("#fff"), NaN, NaN, 1);
      assert.hslEqual(d3.hsl("white"), NaN, NaN, 1);
      assert.hslEqual(d3.hsl(d3.rgb("white")), NaN, NaN, 1);
    },
    "can convert grayscale colors (with undefined hue) to RGB": function(d3) {
      assert.strictEqual(d3.hsl(NaN, 0, 0.2) + "", "#333333");
      assert.strictEqual(d3.hsl(NaN, 0, 0.6) + "", "#999999");
    },
    "can convert white and black (with undefined hue and saturation) to RGB": function(d3) {
      assert.strictEqual(d3.hsl(NaN, NaN, 0) + "", "#000000");
      assert.strictEqual(d3.hsl(NaN, NaN, 1) + "", "#ffffff");
    }
  }
});

suite.export(module);
