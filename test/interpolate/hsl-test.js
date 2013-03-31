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
    "outputs a hexadecimal string": function(d3) {
      assert.strictEqual(d3.interpolateHsl("steelblue", "#f00")(.2), "#383dc3");
    }
  }
});

suite.export(module);
