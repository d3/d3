require("../env");
require("../../d3");
require("../../d3.chart");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.chart.axis");

suite.addBatch({
  "axis": {
    topic: d3.chart.axis,

    "scale": {
      "defaults to a linear scale": function(axis) {
        var x = axis.scale();
        assert.deepEqual(x.domain(), [0, 1]);
        assert.deepEqual(x.range(), [0, 1]);
        assert.equal(x(0.5), 0.5);
      },
      "can be defined as a scale object": function(axis) {
        var x = d3.scale.linear();
        axis.scale(x);
        assert.equal(axis.scale(), x);
      }
    },

    "generates a domain path": function(axis) {
      var g = d3.select("body").html("").append("svg:g").call(axis),
          path = g.select("path.domain");
      assert.isFalse(path.empty());
      assert.equal(path.attr("d"), "M0,6V0H1V6");
      assert.isNull(path.node().nextSibling);
    },
    "generates tick marks with labels": function(axis) {
      var g = d3.select("body").html("").append("svg:g").call(axis),
          tick = g.selectAll("g.tick");
      assert.equal(tick[0].length, 11);
      tick.each(function(d, i) {
        var t = d3.select(this);
        assert.isFalse(t.select("line").empty());
        assert.isFalse(t.select("text").empty());
        assert.inDelta(t.select("text").text(), d, 1e-6);
      });
    }
  }
});

suite.export(module);
