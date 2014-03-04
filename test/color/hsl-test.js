var vows = require("vows"),
    _ = require("../../"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.hsl");

suite.addBatch({
  "hsl": {
    topic: load("color/hsl").expression("d3.hsl"),
    "does not clamp channel values": function(hsl) {
      assert.hslEqual(hsl(-100, -1, -2), -100, -1, -2);
      assert.hslEqual(hsl(400, 2, 3), 400, 2, 3);
    },
    "converts string channel values to numbers": function(hsl) {
      assert.hslEqual(hsl("180", ".5", ".6"), 180, .5, .6);
    },
    "converts null channel values to zero": function(hsl) {
      assert.hslEqual(hsl(null, null, null), 0, 0, 0);
    },
    "exposes h, s and l properties": function(hsl) {
      assert.hslEqual(hsl("hsl(180, 50%, 60%)"), 180, .5, .6);
    },
    "changing h, s or l affects the string format": function(hsl) {
      var color = hsl("hsl(180, 50%, 60%)");
      color.h++;
      color.s += .1;
      color.l += .1;
      assert.equal(color + "", "#85dfe0");
    },
    "parses hexadecimal shorthand format (e.g., \"#abc\")": function(hsl) {
      assert.hslEqual(hsl("#abc"), 210, .25, .733333);
    },
    "parses hexadecimal format (e.g., \"#abcdef\")": function(hsl) {
      assert.hslEqual(hsl("#abcdef"), 210, .68, .803922);
    },
    "parses HSL format (e.g., \"hsl(210, 64%, 13%)\")": function(hsl) {
      assert.hslEqual(hsl("hsl(210, 64.7058%, 13.33333%)"), 210, .647058, .133333);
    },
    "parses color names (e.g., \"moccasin\")": function(hsl) {
      assert.hslEqual(hsl("moccasin"), 38.108108, 1, .854902);
      assert.hslEqual(hsl("aliceblue"), 208, 1, .970588);
      assert.hslEqual(hsl("yellow"), 60, 1, .5);
    },
    "parses and converts RGB format (e.g., \"rgb(102, 102, 0)\")": function(hsl) {
      assert.hslEqual(hsl("rgb(102, 102, 0)"), 60, 1, .2);
    },
    "can convert from RGB": function(hsl) {
      assert.hslEqual(hsl(_.rgb(12, 34, 56)), 210, .647058, .133333);
    },
    "can convert from HSL": function(hsl) {
      assert.hslEqual(hsl(hsl(20, .8, .3)), 20, .8, .3);
    },
    "can convert to RGB": function(hsl) {
      assert.rgbEqual(hsl("steelblue").rgb(), 70, 130, 180);
    },
    "can derive a brighter color": function(hsl) {
      assert.hslEqual(hsl("steelblue").brighter(), 207.272727, .44, .7002801);
      assert.hslEqual(hsl("steelblue").brighter(.5), 207.272727, .44, .5858964);
      assert.hslEqual(hsl("steelblue").brighter(1), 207.272727, .44, .7002801);
      assert.hslEqual(hsl("steelblue").brighter(2), 207.272727, .44, 1.0004002);
    },
    "can derive a darker color": function(hsl) {
      assert.hslEqual(hsl("lightsteelblue").darker(), 213.913043, .4107143, .5462745);
      assert.hslEqual(hsl("lightsteelblue").darker(.5), 213.913043, .4107143, .6529229);
      assert.hslEqual(hsl("lightsteelblue").darker(1), 213.913043, .4107143, .5462745);
      assert.hslEqual(hsl("lightsteelblue").darker(2), 213.913043, .4107143, .38239216);
    },
    "string coercion returns RGB format": function(hsl) {
      assert.strictEqual(hsl("hsl(60, 100%, 20%)") + "", "#666600");
      assert.strictEqual(hsl(hsl(60, 1, .2)) + "", "#666600");
    },
    "h is preserved when explicitly specified, even for grayscale colors": function(hsl) {
      assert.hslEqual(hsl(0, 0, 0), 0, 0, 0);
      assert.hslEqual(hsl(42, 0, .5), 42, 0, .5);
      assert.hslEqual(hsl(118, 0, 1), 118, 0, 1);
    },
    "h is undefined when not explicitly specified for grayscale colors": function(hsl) {
      assert.hslEqual(hsl("#000"), NaN, NaN, 0);
      assert.hslEqual(hsl("black"), NaN, NaN, 0);
      assert.hslEqual(hsl(_.rgb("black")), NaN, NaN, 0);
      assert.hslEqual(hsl("#ccc"), NaN, 0, .8);
      assert.hslEqual(hsl("gray"), NaN, 0, .5);
      assert.hslEqual(hsl(_.rgb("gray")), NaN, 0, .5);
      assert.hslEqual(hsl("#fff"), NaN, NaN, 1);
      assert.hslEqual(hsl("white"), NaN, NaN, 1);
      assert.hslEqual(hsl(_.rgb("white")), NaN, NaN, 1);
    },
    "s is preserved when explicitly specified, even for white or black": function(hsl) {
      assert.hslEqual(hsl(0, 0, 0), 0, 0, 0);
      assert.hslEqual(hsl(0, .18, 0), 0, .18, 0);
      assert.hslEqual(hsl(0, .42, 1), 0, .42, 1);
      assert.hslEqual(hsl(0, 1, 1), 0, 1, 1);
    },
    "s is zero for grayscale colors (but not white and black)": function(hsl) {
      assert.hslEqual(hsl("#ccc"), NaN, 0, .8);
      assert.hslEqual(hsl("#777"), NaN, 0, .47);
    },
    "s is undefined when not explicitly specified for white or black": function(hsl) {
      assert.hslEqual(hsl("#000"), NaN, NaN, 0);
      assert.hslEqual(hsl("black"), NaN, NaN, 0);
      assert.hslEqual(hsl(_.rgb("black")), NaN, NaN, 0);
      assert.hslEqual(hsl("#fff"), NaN, NaN, 1);
      assert.hslEqual(hsl("white"), NaN, NaN, 1);
      assert.hslEqual(hsl(_.rgb("white")), NaN, NaN, 1);
    },
    "can convert grayscale colors (with undefined hue) to RGB": function(hsl) {
      assert.strictEqual(hsl(NaN, 0, .2) + "", "#333333");
      assert.strictEqual(hsl(NaN, 0, .6) + "", "#999999");
    },
    "can convert white and black (with undefined hue and saturation) to RGB": function(hsl) {
      assert.strictEqual(hsl(NaN, NaN, 0) + "", "#000000");
      assert.strictEqual(hsl(NaN, NaN, 1) + "", "#ffffff");
    }
  },
  "interpolateHsl": {
    topic: load("color/hsl"), // beware instanceof d3_Color
    "parses string input": function(d3) {
      assert.strictEqual(d3.interpolateHsl("steelblue", "#f00")(.2), "#383dc3");
      assert.strictEqual(d3.interpolateHsl("steelblue", "#f00")(.6), "#dd1ce1");
    },
    "parses d3.hsl input": function(d3) {
      assert.strictEqual(d3.interpolateHsl(d3.hsl("steelblue"), "#f00")(.2), "#383dc3");
      assert.strictEqual(d3.interpolateHsl("steelblue", d3.hsl(0, 1, .5))(.6), "#dd1ce1");
    },
    "parses d3.rgb input": function(d3) {
      assert.strictEqual(d3.interpolateHsl(d3.rgb("steelblue"), "#f00")(.2), "#383dc3");
      assert.strictEqual(d3.interpolateHsl("steelblue", d3.rgb(255, 0, 0))(.6), "#dd1ce1");
    },
    "interpolates in HSL color space": function(d3) {
      assert.strictEqual(d3.interpolateHsl("steelblue", "#f00")(.2), "#383dc3");
    },
    "uses source hue when destination hue is undefined": function(d3) {
      assert.equal(d3.interpolateHsl("#f60", "#000")(.5), "#803300");
      assert.equal(d3.interpolateHsl("#6f0", "#fff")(.5), "#b3ff80");
    },
    "uses destination hue when source hue is undefined": function(d3) {
      assert.equal(d3.interpolateHsl("#000", "#f60")(.5), "#803300");
      assert.equal(d3.interpolateHsl("#fff", "#6f0")(.5), "#b3ff80");
    },
    "uses source saturation when destination saturation is undefined": function(d3) {
      assert.equal(d3.interpolateHsl("#ccc", "#000")(.5), "#666666");
      assert.equal(d3.interpolateHsl("#f00", "#000")(.5), "#800000");
    },
    "uses destination saturation when source saturation is undefined": function(d3) {
      assert.equal(d3.interpolateHsl("#000", "#ccc")(.5), "#666666");
      assert.equal(d3.interpolateHsl("#000", "#f00")(.5), "#800000");
    },
    "outputs a hexadecimal string": function(d3) {
      assert.strictEqual(d3.interpolateHsl("steelblue", "#f00")(.2), "#383dc3");
    }
  }
});

suite.export(module);
