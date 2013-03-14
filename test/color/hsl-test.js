var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.hsl");

suite.addBatch({
  "hsl": {
    topic: load("color/hsl"),
    "does not clamp channel values": function(d3) {
      assert.hslEqual(d3.hsl(-100, -1, -2), -100, -1, -2);
      assert.hslEqual(d3.hsl(400, 2, 3), 400, 2, 3);
    },
    "converts string channel values to numbers": function(d3) {
      assert.hslEqual(d3.hsl("180", ".5", ".6"), 180, .5, .6);
    },
    "converts null channel values to zero": function(d3) {
      assert.hslEqual(d3.hsl(null, null, null), 0, 0, 0);
    },
    "exposes h, s and l properties": function(d3) {
      var color = d3.hsl("hsl(180, 50%, 60%)");
      assert.equal(color.h, 180);
      assert.equal(color.s, .5);
      assert.equal(color.l, .6);
    },
    "changing h, s or l affects the string format": function(d3) {
      var color = d3.hsl("hsl(180, 50%, 60%)");
      color.h++;
      color.s += .1;
      color.l += .1;
      assert.equal(color + "", "#85dfe0");
    },
    "parses hexadecimal shorthand format (e.g., \"#abc\")": function(d3) {
      assert.hslEqual(d3.hsl("#abc"), 210, .25, .733333);
    },
    "parses hexadecimal format (e.g., \"#abcdef\")": function(d3) {
      assert.hslEqual(d3.hsl("#abcdef"), 210, .68, .803922);
    },
    "parses HSL format (e.g., \"hsl(210, 64%, 13%)\")": function(d3) {
      assert.hslEqual(d3.hsl("hsl(210, 64.7058%, 13.33333%)"), 210, .647058, .133333);
    },
    "parses color names (e.g., \"moccasin\")": function(d3) {
      assert.hslEqual(d3.hsl("moccasin"), 38.108108, 1, .854902);
      assert.hslEqual(d3.hsl("aliceblue"), 208, 1, .970588);
      assert.hslEqual(d3.hsl("yellow"), 60, 1, .5);
    },
    "parses and converts RGB format (e.g., \"rgb(102, 102, 0)\")": function(d3) {
      assert.hslEqual(d3.hsl("rgb(102, 102, 0)"), 60, 1, .2);
    },
    "can convert from RGB": function(d3) {
      assert.hslEqual(d3.hsl(d3.rgb(12, 34, 56)), 210, .647058, .133333);
    },
    "can convert from HSL": function(d3) {
      assert.hslEqual(d3.hsl(d3.hsl(20, .8, .3)), 20, .8, .3);
    },
    "can convert to RGB": function(d3) {
      assert.rgbEqual(d3.hsl("steelblue").rgb(), 70, 130, 180);
    },
    "can derive a brighter color": function(d3) {
      assert.hslEqual(d3.hsl("steelblue").brighter(), 207.272727, .44, .7002801);
      assert.hslEqual(d3.hsl("steelblue").brighter(.5), 207.272727, .44, .5858964);
      assert.hslEqual(d3.hsl("steelblue").brighter(1), 207.272727, .44, .7002801);
      assert.hslEqual(d3.hsl("steelblue").brighter(2), 207.272727, .44, 1.0004002);
    },
    "can derive a darker color": function(d3) {
      assert.hslEqual(d3.hsl("lightsteelblue").darker(), 213.913043, .4107143, .5462745);
      assert.hslEqual(d3.hsl("lightsteelblue").darker(.5), 213.913043, .4107143, .6529229);
      assert.hslEqual(d3.hsl("lightsteelblue").darker(1), 213.913043, .4107143, .5462745);
      assert.hslEqual(d3.hsl("lightsteelblue").darker(2), 213.913043, .4107143, .38239216);
    },
    "string coercion returns RGB format": function(d3) {
      assert.strictEqual(d3.hsl("hsl(60, 100%, 20%)") + "", "#666600");
      assert.strictEqual(d3.hsl(d3.hsl(60, 1, .2)) + "", "#666600");
    }
  }
});

suite.export(module);
