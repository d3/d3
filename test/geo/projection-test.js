require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.geo.projection");

suite.addBatch({
  "projection": {
    topic: function() {
      function forward(λ, φ) { return [λ, φ]; }
      forward.invert = function(x, y) {}
      return d3.geo.projection(forward);
    },
    "non-existent inverse": function(projection) {
      assert.isUndefined(projection.invert([0, 0]));
    }
  }
});

suite.export(module);
