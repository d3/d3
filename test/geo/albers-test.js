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
      "has the rotation 96°, 0°": function(p) {
        assert.inDelta(p.rotate(), [96, 0, 0], 1e-6);
      },
      "has the center -0.6°, 38.7°": function(p) {
        assert.inDelta(p.center(), [-0.6, 38.7], 1e-6);
      },
      "has the scale 1070": function(p) {
        assert.inDelta(p.scale(), 1070, 1e-6);
      }
    }, {
      "Washington, DC":    [[-120.50000000,   47.50000000], [ 181.00023857,   45.12748866]],
      "San Francisco, CA": [[-122.42000000,   37.78000000], [ 107.44485839,  214.04820561]],
      "the North Pole":    [[   0.00000000,   90.00000000], [1062.11670525, -761.71949818]]
    }),
    "translated to 0,0 and at scale 1": projectionTestSuite({
      topic: function(projection) { return projection().translate([0, 0]).scale(1); }
    }, {
      "Washington, DC":    [[-120.50000000,   47.50000000], [  -0.27943903,   -0.19146964]],
      "San Francisco, CA": [[-122.42000000,   37.78000000], [  -0.34818238,   -0.03359981]],
      "the North Pole":    [[   0.00000000,   90.00000000], [   0.54403430,   -0.94553224]]
    })
  }
});

suite.export(module);
