require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.xyz");

suite.addBatch({
  "xyz": {
    topic: function() {
      return d3.xyz;
    },
    "exposes x, y and z properties": function(xyz) {
      assert.xyzEqual(xyz("#abc"), 45.246971009995335, 48.44632879252148, 64.09304697440157);
    },
    "can convert from XYZ": function(xyz) {
      assert.xyzEqual(xyz(d3.xyz(40, 50, 60)), 40, 50, 60);
    },
    "can convert from RGB": function(xyz) {
      assert.xyzEqual(d3.rgb("#abc").xyz(), 45.246971009995335, 48.44632879252148, 64.09304697440157);
    },
    "can convert from HSL": function(xyz) {
      assert.xyzEqual(d3.hsl("#abc").xyz(), 45.246971009995335, 48.44632879252148, 64.09304697440157);
    },
    "can initialize with RGB": function(xyz) {
      assert.xyzEqual(xyz(d3.rgb(30, 40, 50)), 1.8699354618049604, 2.0238922484735156, 3.309705799692103);
    },
    "can initialize with HSL": function(xyz) {
      assert.xyzEqual(xyz("hsl(0, 100%, 50%)"), 41.24, 21.26, 1.93);
    },
    "can convert to RGB": function(xyz) {
      assert.rgbEqual(xyz(d3.rgb(30, 40, 50)).rgb(), 30, 40, 50);
    },
    "can convert to HSL": function(xyz) {
      assert.hslEqual(xyz(d3.rgb("red")).hsl(), 0, 1, .5);
    },
  }
});

suite.export(module);
