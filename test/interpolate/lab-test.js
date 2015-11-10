var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.interpolateLab");

suite.addBatch({
  "interpolateLab": {
    topic: load("interpolate/lab"), // beware instanceof d3_Color
    "parses string input": function(d3) {
      assert.strictEqual(d3.interpolateLab("steelblue", "#f00")(0.2), "#8a7793");
      assert.strictEqual(d3.interpolateLab("steelblue", "#f00")(0.6), "#cf5952");
    },
    "parses d3.hsl input": function(d3) {
      assert.strictEqual(d3.interpolateLab(d3.hsl("steelblue"), "#f00")(0.2), "#8a7793");
      assert.strictEqual(d3.interpolateLab("steelblue", d3.hsl(0, 1, 0.5))(0.6), "#cf5952");
    },
    "parses d3.rgb input": function(d3) {
      assert.strictEqual(d3.interpolateLab(d3.rgb("steelblue"), "#f00")(0.2), "#8a7793");
      assert.strictEqual(d3.interpolateLab("steelblue", d3.rgb(255, 0, 0))(0.6), "#cf5952");
    },
    "interpolates in HSL color space": function(d3) {
      assert.strictEqual(d3.interpolateLab("steelblue", "#f00")(0.2), "#8a7793");
    },
    "returns an instanceof d3.lab": function(d3) {
      assert.strictEqual(d3.interpolateLab("steelblue", "#f00")(0.2), "#8a7793");
    }
  }
});

suite.export(module);
