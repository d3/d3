var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    projectionTestSuite = require("./projection-test-suite");

var suite = vows.describe("d3.geo.albers");

suite.addBatch({
  "albers": {
    topic: load("geo/albers").expression("d3.geo.albers"),
    "default": projectionTestSuite({
      topic: function(projection) { return projection(); },
      "has the parallels 29.5°, 45.5°": function(p) {
        assert.inDelta(p.parallels(), [29.5, 45.5], 1e-6);
      },
      "has the rotation 98°, 0°": function(p) {
        assert.inDelta(p.rotate(), [98, 0, 0], 1e-6);
      },
      "has the center 0°, 38°": function(p) {
        assert.inDelta(p.center(), [0, 38], 1e-6);
      },
      "has the scale 1000": function(p) {
        assert.inDelta(p.scale(), 1000, 1e-6);
      }
    }, {
      "Washington, DC":    [[-120.50000000,   47.50000000], [ 215.47899724,   51.97649392]],
      "San Francisco, CA": [[-122.42000000,   37.78000000], [ 150.07267740,  211.25782936]]
    }),
    "translated to 0,0 and at scale 1": projectionTestSuite({
      topic: function(projection) { return projection().translate([0, 0]).scale(1); }
    }, {
      "Washington, DC":    [[-120.50000000,   47.50000000], [  -0.26452100,   -0.19802351]],
      "San Francisco, CA": [[-122.42000000,   37.78000000], [  -0.32992732,   -0.03874217]]
    })
  }
});

suite.export(module);
