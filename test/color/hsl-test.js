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
      var color = hsl("hsl(180, 50%, 60%)");
      assert.equal(color.h, 180);
      assert.equal(color.s, .5);
      assert.equal(color.l, .6);
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
      assert.strictEqual(hsl(0, 0, 0).h, 0);
      assert.strictEqual(hsl(42, 0, .5).h, 42);
      assert.strictEqual(hsl(118, 0, 1).h, 118);
    },
    "h is undefined when not explicitly specified for grayscale colors": function(hsl) {
      assert.isNaN(hsl("#000").h);
      assert.isNaN(hsl("black").h);
      assert.isNaN(hsl(_.rgb("black")).h);
      assert.isNaN(hsl("#ccc").h);
      assert.isNaN(hsl("gray").h);
      assert.isNaN(hsl(_.rgb("gray")).h);
      assert.isNaN(hsl("#fff").h);
      assert.isNaN(hsl("white").h);
      assert.isNaN(hsl(_.rgb("white")).h);
    },
    "s is preserved when explicitly specified, even for white or black": function(hsl) {
      assert.strictEqual(hsl(0, 0, 0).s, 0);
      assert.strictEqual(hsl(0, .18, 0).s, .18);
      assert.strictEqual(hsl(0, .42, 1).s, .42);
      assert.strictEqual(hsl(0, 1, 1).s, 1);
    },
    "s is zero for grayscale colors (but not white and black)": function(hsl) {
      assert.strictEqual(hsl("#ccc").s, 0);
      assert.strictEqual(hsl("#777").s, 0);
    },
    "s is undefined when not explicitly specified for white or black": function(hsl) {
      assert.isNaN(hsl("#000").s);
      assert.isNaN(hsl("black").s);
      assert.isNaN(hsl(_.rgb("black")).s);
      assert.isNaN(hsl("#fff").s);
      assert.isNaN(hsl("white").s);
      assert.isNaN(hsl(_.rgb("white")).s);
    },
    "can convert grayscale colors (with undefined hue) to RGB": function(hsl) {
      assert.strictEqual(hsl(NaN, 0, .2) + "", "#333333");
      assert.strictEqual(hsl(NaN, 0, .6) + "", "#999999");
    },
    "can convert white and black (with undefined hue and saturation) to RGB": function(hsl) {
      assert.strictEqual(hsl(NaN, NaN, 0) + "", "#000000");
      assert.strictEqual(hsl(NaN, NaN, 1) + "", "#ffffff");
    }
  }
});

suite.export(module);
