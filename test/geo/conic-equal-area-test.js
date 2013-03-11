require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.geo.conicEqualArea");

suite.addBatch({
  "default conicEqualArea": {
    topic: function() {
      return d3.geo.conicEqualArea();
    },
    "projects a point to the expected location": function(projection) {
      assert.inDelta(projection([-122.4183, 37.7750]), [290.412731, 46.409073], 1e-6);
    },
    "inverts a location to the expected point": function(projection) {
      assert.inDelta(projection.invert([290.412731, 46.409073]), [-122.4183, 37.7750], 1e-3);
    }
  }
});

suite.export(module);
