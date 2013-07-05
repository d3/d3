var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.interpolateHcl");

suite.addBatch({
  "interpolateHcl": {
    topic: load("interpolate/hcl"), // beware instanceof d3_Color
    "parses string input": function(d3) {
      assert.hclEqual(d3.interpolateHcl("steelblue", "#f00")(.2), -69.78, 46.87, 52.62);
      assert.hclEqual(d3.interpolateHcl("steelblue", "#f00")(.6), -14.89, 75.71, 52.93);
    },
    "parses d3.hsl input": function(d3) {
      assert.hclEqual(d3.interpolateHcl(d3.hsl("steelblue"), "#f00")(.2), -69.78, 46.87, 52.62);
      assert.hclEqual(d3.interpolateHcl("steelblue", d3.hsl(0, 1, .5))(.6), -14.89, 75.71, 52.93);
    },
    "parses d3.rgb input": function(d3) {
      assert.hclEqual(d3.interpolateHcl(d3.rgb("steelblue"), "#f00")(.2), -69.78, 46.87, 52.62);
      assert.hclEqual(d3.interpolateHcl("steelblue", d3.rgb(255, 0, 0))(.6), -14.89, 75.71, 52.93);
    },
    "interpolates in HSL color space": function(d3) {
      assert.hclEqual(d3.interpolateHcl("steelblue", "#f00")(.2), -69.78, 46.87, 52.62);
    },
    "uses source hue when destination hue is undefined": function(d3) {
      assert.hclEqual(d3.interpolateHcl("#f60", "#000")(.5), 52.36, 90.07, 31.16);
      assert.hclEqual(d3.interpolateHcl("#6f0", "#000")(.5), 131.26, 112.84, 44.54);
    },
    "uses destination hue when source hue is undefined": function(d3) {
      assert.hclEqual(d3.interpolateHcl("#000", "#f60")(.5), 52.36, 90.07, 31.16);
      assert.hclEqual(d3.interpolateHcl("#000", "#6f0")(.5), 131.26, 112.84, 44.54);
    },
    "uses source chroma when destination chroma is undefined": function(d3) {
      assert.hclEqual(d3.interpolateHcl("#ccc", "#000")(.5), 158.20, 0.00, 41.02);
      assert.hclEqual(d3.interpolateHcl("#f00", "#000")(.5), 40.00, 104.55, 26.62);
    },
    "uses destination chroma when source chroma is undefined": function(d3) {
      assert.hclEqual(d3.interpolateHcl("#000", "#ccc")(.5), 158.20, 0.00, 41.02);
      assert.hclEqual(d3.interpolateHcl("#000", "#f00")(.5), 40.00, 104.55, 26.62);
    },
    "returns an instanceof d3.hcl": function(d3) {
      assert.hclEqual(d3.interpolateHcl("steelblue", "#f00")(.2), -69.78, 46.87, 52.62);
    }
  }
});

suite.export(module);
