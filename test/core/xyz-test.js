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
      var color = xyz("#abc");
      assert.xyzEqual(color, 45.246971009995335, 48.44632879252148, 64.09304697440157);
    },
    "can convert from XYZ": function(xyz) {
      var color = xyz(d3.xyz(40, 50, 60));
      assert.xyzEqual(color, 40, 50, 60);
    },
    "can convert from RGB": function(xyz) {
      var color = d3.rgb("#abc").xyz();
      assert.xyzEqual(color, 45.246971009995335, 48.44632879252148, 64.09304697440157);
    },
    "can convert from HSL": function(xyz) {
      var color = d3.hsl("#abc").xyz();
      assert.xyzEqual(color, 45.246971009995335, 48.44632879252148, 64.09304697440157);
    },
    "can initialize with RGB": function(xyz) {
      var color = xyz(d3.rgb(30, 40, 50));
      assert.xyzEqual(color, 1.8699354618049604, 2.0238922484735156, 3.309705799692103);
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
