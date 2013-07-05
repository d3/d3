var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.interpolateRgb");

suite.addBatch({
  "interpolateRgb": {
    topic: load("interpolate/rgb"), // beware instanceof d3_Color
    "parses string input": function(d3) {
      assert.rgbEqual(d3.interpolateRgb("steelblue", "#f00")(.2), 107, 104, 144);
      assert.rgbEqual(d3.interpolateRgb("steelblue", "#f00")(.6), 181, 52, 72);
    },
    "parses d3.rgb input": function(d3) {
      assert.rgbEqual(d3.interpolateRgb(d3.rgb("steelblue"), "#f00")(.2), 107, 104, 144);
      assert.rgbEqual(d3.interpolateRgb("steelblue", d3.rgb(255, 0, 0))(.6), 181, 52, 72);
    },
    "parses d3.hsl input": function(d3) {
      assert.rgbEqual(d3.interpolateRgb(d3.hsl("steelblue"), "#f00")(.2), 107, 104, 144);
      assert.rgbEqual(d3.interpolateRgb("steelblue", d3.hsl(0, 1, .5))(.6), 181, 52, 72);
    },
    "interpolates in RGB color space": function(d3) {
      assert.rgbEqual(d3.interpolateRgb("steelblue", "#f00")(.2), 107, 104, 144);
    },
    "returns an instanceof d3.rgb": function(d3) {
      assert.rgbEqual(d3.interpolateRgb("steelblue", "#f00")(.2), 107, 104, 144);
    }
  }
});

suite.export(module);
