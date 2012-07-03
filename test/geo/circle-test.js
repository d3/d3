require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.circle");

suite.addBatch({
  "circle": {
    "clip": {
      topic: function() {
        return d3.geo.circle().origin([-71.03, -42.37]).clip;
      },
      "grid component": function(clip) {
        var yStepsBig = d3.range(-90, 90, 10);
        assert.inDelta(clip({type: "LineString", coordinates: yStepsBig.map(function(y) { return [110, y]; })}).coordinates, [
          [110, -90],
          [110, -84],
          [110, -80],
          [110, -74],
          [110, -70],
          [110, -64],
          [110, -60],
          [110, -54],
          [110, -50],
          [110, -47.63539018933809]
        ], 1e-6);
      },
      "can completely clip a LineString": function(clip) {
        assert.isNull(clip({type: "LineString", coordinates: [[90.0, -42.37], [95.0, -42.37], [90.0, -42.37]]}));
      },
      "doesn't insert a duplicate point": function(clip) {
        assert.inDelta(clip({type: "LineString", coordinates: [[0, 0]]}).coordinates, [[0, 0]], 1e-6);
      }
    }
  }
});

suite.export(module);
