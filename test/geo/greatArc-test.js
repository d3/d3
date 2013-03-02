require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.geo.greatArc");

suite.addBatch({
  "greatArc": {
    topic: function() {
      return d3.geo.greatArc();
    },
    "distance": function(arc) {
      assert.equal(arc.distance({source: [0, 0], target: [0, 0]}), 0);
      assert.inDelta(arc.distance({
        source: [118 + 24 / 60, 33 + 57 / 60],
        target: [ 73 + 47 / 60, 40 + 38 / 60]
      }), 3973 / 6371, .5);
    },
    "source and target can be set as constants": function() {
      var arc = d3.geo.greatArc()
          .source([5, 52])
          .target([-120, 37])
          .precision(7.2);
      assert.inDelta(arc().coordinates, [
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
    },
    "geodesic": function(arc) {
      assert.inDelta(arc.precision(7.2)({source: [5, 52], target: [-120, 37]}).coordinates, [
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
