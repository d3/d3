var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.interpolateLab");

suite.addBatch({
  "interpolateLab": {
    topic: load("interpolate/lab"), // beware instanceof d3_Color
    "parses string input": function(d3) {
      assert.labEqual(d3.interpolateLab("steelblue", "#f00")(.2), 52.62, 12.76, -12.31);
      assert.labEqual(d3.interpolateLab("steelblue", "#f00")(.6), 52.93, 46.42, 27.45);
    },
    "parses d3.hsl input": function(d3) {
      assert.labEqual(d3.interpolateLab(d3.hsl("steelblue"), "#f00")(.2), 52.62, 12.76, -12.31);
      assert.labEqual(d3.interpolateLab("steelblue", d3.hsl(0, 1, .5))(.6), 52.93, 46.42, 27.45);
    },
    "parses d3.rgb input": function(d3) {
      assert.labEqual(d3.interpolateLab(d3.rgb("steelblue"), "#f00")(.2), 52.62, 12.76, -12.31);
      assert.labEqual(d3.interpolateLab("steelblue", d3.rgb(255, 0, 0))(.6), 52.93, 46.42, 27.45);
    },
    "interpolates in HSL color space": function(d3) {
      assert.labEqual(d3.interpolateLab("steelblue", "#f00")(.2), 52.62, 12.76, -12.31);
    },
    "returns an instanceof d3.lab": function(d3) {
      assert.labEqual(d3.interpolateLab("steelblue", "#f00")(.2), 52.62, 12.76, -12.31);
    }
  }
});

suite.export(module);
