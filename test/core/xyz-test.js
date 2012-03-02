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
      assert.equal(color.x, 45.246971009995335);
      assert.equal(color.y, 48.44632879252148);
      assert.equal(color.z, 64.09304697440157);
    },
    "can convert from XYZ": function(xyz) {
      var color = xyz(d3.xyz(40, 50, 60));
      assert.equal(color.x, 40);
      assert.equal(color.y, 50);
      assert.equal(color.z, 60);
    },
    "can convert from RGB": function(xyz) {
      var color = d3.rgb("#abc").xyz();
      assert.equal(color.x, 45.246971009995335);
      assert.equal(color.y, 48.44632879252148);
      assert.equal(color.z, 64.09304697440157);
    },
    "can convert from HSL": function(xyz) {
      var color = d3.hsl("#abc").xyz();
      assert.equal(color.x, 45.246971009995335);
      assert.equal(color.y, 48.44632879252148);
      assert.equal(color.z, 64.09304697440157);
    },


  }
});

suite.export(module);
