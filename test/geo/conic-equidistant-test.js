require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.geo.conicEquidistant");

suite.addBatch({
  "default conicEquidistant": {
    topic: function() {
      return d3.geo.conicEquidistant();
    },
    "projects a point to the expected location": function(projection) {
      assert.inDelta(projection([-122.4183, 37.7750]), [296.554174, 48.474895], 1e-6);
    },
    "inverts a location to the expected point": function(projection) {
      assert.inDelta(projection.invert([296.554174, 48.474895]), [-122.4183, 37.7750], 1e-3);
    }
  }
});

suite.export(module);
