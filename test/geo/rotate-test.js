require("../env");
require("../../d3");
require("../../d3.geo");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geo.rotate");

suite.addBatch({
  "Inversion": {
    topic: function() {
      return d3.geo.rotate().x(13).y(17).z(23);
    },
    "project(invert(point)) equals point": function(rotate) {
      for (var i = -1; i < 20; ++i) {
        var point = [Math.random() * 700 + 100, Math.random() * 400 + 50];
        assert.inDelta(point, rotate(rotate.invert(point)), 1e-6);
      }
    }
  }
});

suite.export(module);
