var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.interpolateHsl");

suite.addBatch({
  "interpolateHsl": {
    topic: load("interpolate/hsl"), // beware instanceof d3_Color
    "parses string input": function(d3) {
      assert.hslEqual(d3.interpolateHsl("steelblue", "#f00")(.2), 237.82, 0.5538, 0.4922);
      assert.hslEqual(d3.interpolateHsl("steelblue", "#f00")(.6), 298.91, 0.7787, 0.4961);
    },
    "parses d3.hsl input": function(d3) {
      assert.hslEqual(d3.interpolateHsl(d3.hsl("steelblue"), "#f00")(.2), 237.82, 0.5538, 0.4922);
      assert.hslEqual(d3.interpolateHsl("steelblue", d3.hsl(0, 1, .5))(.6), 298.91, 0.7787, 0.4961);
    },
    "parses d3.rgb input": function(d3) {
      assert.hslEqual(d3.interpolateHsl(d3.rgb("steelblue"), "#f00")(.2), 237.82, 0.5538, 0.4922);
      assert.hslEqual(d3.interpolateHsl("steelblue", d3.rgb(255, 0, 0))(.6), 298.91, 0.7787, 0.4961);
    },
    "interpolates in HSL color space": function(d3) {
      assert.hslEqual(d3.interpolateHsl("steelblue", "#f00")(.2), 237.82, 0.5538, 0.4922);
    },
    "uses source hue when destination hue is undefined": function(d3) {
      assert.hslEqual(d3.interpolateHsl("#f60", "#000")(.5), 24, 1, 0.2510);
      assert.hslEqual(d3.interpolateHsl("#6f0", "#fff")(.5), 96, 1, 0.7510);
    },
    "uses destination hue when source hue is undefined": function(d3) {
      assert.hslEqual(d3.interpolateHsl("#000", "#f60")(.5), 24, 1, 0.2510);
      assert.hslEqual(d3.interpolateHsl("#fff", "#6f0")(.5), 96, 1, 0.7510);
    },
    "uses source saturation when destination saturation is undefined": function(d3) {
      assert.hslEqual(d3.interpolateHsl("#ccc", "#000")(.5), NaN, 0, 0.4);
      assert.hslEqual(d3.interpolateHsl("#f00", "#000")(.5), 0, 1, 0.2510);
    },
    "uses destination saturation when source saturation is undefined": function(d3) {
      assert.hslEqual(d3.interpolateHsl("#000", "#ccc")(.5), NaN, 0, 0.4);
      assert.hslEqual(d3.interpolateHsl("#000", "#f00")(.5), 0, 1, 0.2510);
    },
    "returns an instanceof d3.hsl": function(d3) {
      assert.hslEqual(d3.interpolateHsl("steelblue", "#f00")(.6), 298.91, 0.7787, 0.4961);
    }
  }
});

suite.export(module);
