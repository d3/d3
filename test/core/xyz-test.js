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
    }
  }
});

suite.export(module);
