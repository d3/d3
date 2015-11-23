var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.geo.greatArc");

suite.addBatch({
  "greatArc": {
    topic: load("geo/greatArc").expression("d3.geo.greatArc"),
    "distance": function(arc) {
      var a = arc();
      assert.equal(a.distance({source: [0, 0], target: [0, 0]}), 0);
      assert.inDelta(a.distance({
        source: [118 + 24 / 60, 33 + 57 / 60],
        target: [ 73 + 47 / 60, 40 + 38 / 60]
      }), 3973 / 6371, 0.5);
    },
    "source and target can be set as constants": function(arc) {
      var a = arc().source([5, 52]).target([-120, 37]);
      assert.inDelta(a().coordinates, [
        [   5,        52      ],
        [-120,        37      ]
      ], 0.5);
    },
    "geodesic": function(arc) {
      var a = arc();
      assert.inDelta(a({source: [5, 52], target: [-120, 37]}).coordinates, [
        [   5,        52      ],
        [-120,        37      ]
      ], 0.5);
    }
  }
});

suite.export(module);
