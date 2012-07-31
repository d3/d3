require("../env");
require("../../d3.v2");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.rotate");

suite.addBatch({
  "x-, y- and x-axes": {
    "Inversion": {
      topic: function() {
        return d3.geo.rotate(23, 17, 13);
      },
      "project(invert(point)) equals point": function(rotate) {
        for (var i = -1; i < 20; ++i) {
          var point = [Math.random() * 10 + 100, Math.random() * 10 + 50];
          assert.inDelta(point, rotate(rotate.invert(point)), 1e-6);
        }
      }
    }
  },
  "zero": {
    "Inversion": {
      topic: d3.geo.rotate,
      "project(invert(point)) equals point": function(rotate) {
        for (var i = -1; i < 20; ++i) {
          var point = [Math.random() * 360 - 180, Math.random() * 180 - 90];
          assert.inDelta(point, rotate(rotate.invert(point)), 1e-6);
        }
      }
    }
  }
});

suite.export(module);
