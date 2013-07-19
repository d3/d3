var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.interpolateHsl");

suite.addBatch({
  "interpolateHsl": {
    topic: load("interpolate/hsl"), // beware instanceof d3_Color
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
