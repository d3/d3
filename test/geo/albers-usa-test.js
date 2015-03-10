var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    projectionTestSuite = require("./projection-test-suite");

var suite = vows.describe("d3.geo.albersUsa");

suite.addBatch({
  "albersUsa": {
    topic: load("geo/albers-usa").expression("d3.geo.albersUsa"),
    "default": projectionTestSuite({
      topic: function(projection) { return projection(); },
      "has the scale 1070": function(p) {
        assert.inDelta(p.scale(), 1070, 1e-6);
      }
    }, {
      "Washington, DC":    [[-120.50000000,   47.50000000], [ 181.00023857,   45.12748866]],
      "San Francisco, CA": [[-122.42000000,   37.78000000], [ 107.44485839,  214.04820561]],
      "Juneau, AK":        [[-134.22000000,   58.43000000], [ 224.79015007,  455.65860760]],
      "Honolulu, HI":      [[-157.82000000,   21.30000000], [ 299.14918225,  451.11762634]]
    }),
    "translated to 0,0 and at scale 1": projectionTestSuite({
      topic: function(projection) { return projection().translate([0, 0]).scale(1); }
    }, {
      "Washington, DC":    [[-120.50000000,   47.50000000], [  -0.27943903,   -0.19146964]],
      "San Francisco, CA": [[-122.42000000,   37.78000000], [  -0.34818238,   -0.03359981]],
      "Juneau, AK":        [[-134.22000000,   58.43000000], [  -0.23851388,    0.19220431]],
      "Honolulu, HI":      [[-157.82000000,   21.30000000], [  -0.16901946,    0.18796040]]
    })
  }
});

suite.export(module);
