require("../env");
require("../../d3");
require("../../d3.geo");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.greatCircle");

suite.addBatch({
  "greatCircle": {
    topic: function() {
      return d3.geo.greatCircle()
          .n(12);
    },
    "distance": function(circle) {
      assert.equal(circle.distance({source: [0, 0], target: [0, 0]}), 0);
      assert.inDelta(circle.distance({
        source: [118 + 24 / 60, 33 + 57 / 60],
        target: [ 73 + 47 / 60, 40 + 38 / 60]
      }), 3973, .5);
    },
    "geodesic": function(circle) {
      assert.inDelta(circle({source: [5, 52], target: [-120, 37]}), [
        [   5,        52      ],
        [  -3.805036, 57.05083],
        [ -15.122869, 61.30118],
        [ -29.396213, 64.34584],
        [ -46.132729, 65.72409],
        [ -63.394401, 65.15597],
        [ -78.854311, 62.76337],
        [ -91.401599, 58.96701],
        [-101.190927, 54.21333],
        [-108.843633, 48.83586],
        [-114.961152, 43.05231],
        [-120,        37      ]
      ], .5);
    }
  }
});

suite.export(module);
