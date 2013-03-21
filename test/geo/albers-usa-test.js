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
      "has the scale 1000": function(p) {
        assert.inDelta(p.scale(), 1000, 1e-6);
      }
    }, {
      "Washington, DC":    [[-120.50000000,   47.50000000], [ 215.47899724,   51.97649392]],
      "San Francisco, CA": [[-122.42000000,   37.78000000], [ 150.07267740,  211.25782936]],
      "Juneau, AK":        [[-134.22000000,   58.43000000], [ 217.36659042,  409.49851773]],
      "Honolulu, HI":      [[-157.82000000,   21.30000000], [ 325.69600300,  427.27882479]],
      "San Juan, PR":      [[ -66.07000000,   18.45000000], [ 909.15925090,  456.39482719]]
    }),
    "translated to 0,0 and at scale 1": projectionTestSuite({
      topic: function(projection) { return projection().translate([0, 0]).scale(1); }
    }, {
      "Washington, DC":    [[-120.50000000,   47.50000000], [  -0.26452100,   -0.19802351]],
      "San Francisco, CA": [[-122.42000000,   37.78000000], [  -0.32992732,   -0.03874217]],
      "Juneau, AK":        [[-134.22000000,   58.43000000], [  -0.26263341,    0.15949852]],
      "Honolulu, HI":      [[-157.82000000,   21.30000000], [  -0.15430400,    0.17727882]],
      "San Juan, PR":      [[ -66.07000000,   18.45000000], [   0.42915925,    0.20639483]]
    })
  }
});

suite.export(module);
