require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.geo.conicConformal");

suite.addBatch({
  "default conicConformal": {
    topic: function() {
      return d3.geo.conicConformal();
    },
    "projects a point to the expected location": function(projection) {
      assert.inDelta(projection([-122.4183, 37.7750]), [303.356117, 49.517957], 1e-6);
    },
    "inverts a location to the expected point": function(projection) {
      assert.inDelta(projection.invert([303.356117, 49.517957]), [-122.4183, 37.7750], 1e-3);
    }
  }
});

suite.export(module);
