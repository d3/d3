var vows = require("vows"),
    _ = require("../../"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.geo.circle");

suite.addBatch({
  "circle": {
    topic: load("geo/circle").expression("d3.geo.circle"),
    "generates a Polygon": function(circle) {
      var o = circle()();
      assert.equal(o.type, "Polygon");
      assert.inDelta(o.coordinates, [[[-78.690067, -90], [-90, -84], [-90, -78], [-90, -72], [-90, -66], [-90, -60], [-90, -54], [-90, -48], [-90, -42], [-90, -36], [-90, -30], [-90, -24], [-90, -18], [-90, -12], [-90, -6], [-90, 0], [-90, 6], [-90, 12], [-90, 18], [-90, 24], [-90, 30], [-90, 36], [-90, 42], [-90, 48], [-90, 54], [-90, 60], [-90, 66], [-90, 72], [-90, 78], [-90, 84], [-89.596672, 90], [90, 84], [90, 78], [90, 72], [90, 66], [90, 60], [90, 54], [90, 48], [90, 42], [90, 36], [90, 30], [90, 24], [90, 18], [90, 12], [90, 6], [90, 0], [90, -6], [90, -12], [90, -18], [90, -24], [90, -30], [90, -36], [90, -42], [90, -48], [90, -54], [90, -60], [90, -66], [90, -72], [90, -78], [90, -84], [89.569782, -90]]], 1e-6);
    },
    "origin([0, 90])": function(circle) {
      var o = circle().origin([0, 90])();
      assert.equal(o.type, "Polygon");
      assert.inDelta(o.coordinates, [_.range(360, -1, -6).map(function(x) { return [x >= 180 ? x - 360 : x, 0]; })], 1e-6);
    },
    "origin([45, 45])": function(circle) {
      var o = circle().origin([45, 45]).angle(0)();
      assert.equal(o.type, "Polygon");
      assert.inDelta(o.coordinates[0][0], [45, 45], 1e-6);
    },
    "first and last points are coincident": function(circle) {
      var o = circle().origin([0, 0]).angle(.02).precision(45)();
      assert.inDelta(o.coordinates[0][0], o.coordinates[0].pop(), 1e-6);
    }
  }
});

suite.export(module);
