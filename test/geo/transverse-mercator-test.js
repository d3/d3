require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.geo.transverseMercator");

suite.addBatch({
  "transverseMercator": {
    topic: function() {
      return d3.geo.transverseMercator().translate([0, 0]).scale(50 / Math.PI);
    },
    "San Francisco": function(projection) {
      var point = projection([-122.4183, 37.7750]),
          location = projection.invert(point);
      assert.inDelta(point, [-12.8239467, -34.6315884], 1e-6);
      assert.inDelta(location, [-122.4183, 37.7750], 1e-6);
    },
    "invert observes translation": function() {
      var projection = d3.geo.mercator().translate([123, 99]).scale(100),
          point = projection([-122.4183, 37.7750]),
          location = projection.invert(point);
      assert.inDelta(location, [-122.4183, 37.7750], 1e-6);
    }
  }
});

suite.export(module);
