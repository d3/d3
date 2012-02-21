require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.hsv");

suite.addBatch({
  "hsv": {
    topic: function() {
      return d3.hsv;
    },
    "converts string channel values to numbers": function(hsv) {
      assert.hsvEqual(hsv("180", ".5", ".6"), 180, .5, .6);
    },
    "converts null channel values to zero": function(hsv) {
      assert.hsvEqual(hsv(null, null, null), 0, 0, 0);
    },
    "exposes h, s, and v property": function(hsv) {
      var color = hsv("hsv(180, 50%, 60%)");
      assert.equal(color.h, 180);
      assert.equal(color.s, .5);
      assert.equal(color.v, .6);
    },
    "changing h, s, or v affects the string format": function(hsv) {
      var color = hsv("hsl(180, 50%, 60%)");
      color.h++;
      color.s += .1;
      color.v += .1;
      assert.rgbEqual(color.rgb(), 92, 227, 230);
      assert.equal(color + "", "#5ce3e6");
    },
    "parses and converts RGB format (e.g., \"rgb(102, 102, 0)\")": function(hsv) {
      assert.hsvEqual(hsv("rgb(102, 102, 0)"), 60, 1, .4);
    },
    "can convert from RGB": function(hsv) {
      assert.hsvEqual(hsv(d3.rgb(12, 34, 56)), 210, .785714, .2196078);
    },
    "can convert to RGB": function(hsv) {
      assert.rgbEqual(hsv("steelblue").rgb(), 70, 130, 180);
      assert.rgbEqual(hsv(180, .5, .6).rgb(), 77, 153, 153);
      assert.rgbEqual(hsv(181, .6, .7).rgb(), 71, 177, 179);
    },
  }
});

suite.export(module);