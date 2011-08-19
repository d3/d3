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

    "tickSize": {
      "defaults to six pixels": function(axis) {
        assert.equal(axis.tickSize(), 6);
      },
      "can be defined as a number": function(axis) {
        axis.tickSize(3);
        assert.equal(axis.tickSize(), 3);
      },
      "coerces input value to a number": function(axis) {
        axis.tickSize("3");
        assert.strictEqual(axis.tickSize(), 3);
      },
      "affects the generated domain path": function(axis) {
        axis.tickSize(3);
        var g = d3.select("body").html("").append("svg:g").call(axis),
            path = g.select("path.domain");
        assert.equal(path.attr("d"), "M0,3V0H1V3");
      },
      "affects the generated tick lines": function(axis) {
        axis.tickSize(3);
        var g = d3.select("body").html("").append("svg:g").call(axis),
            line = g.selectAll("g.tick line");
        line.each(function() {
          assert.equal(d3.select(this).attr("y2"), 3);
        });
      }
    },

    "tickPadding": {
      "defaults to three pixels": function(axis) {
        assert.equal(axis.tickPadding(), 3);
      },
      "can be defined as a number": function(axis) {
        axis.tickPadding(6);
        assert.equal(axis.tickPadding(), 6);
      },
      "coerces input value to a number": function(axis) {
        axis.tickPadding("6");
        assert.strictEqual(axis.tickPadding(), 6);
      },
      "affects the generated tick labels": function(axis) {
        axis.tickSize(2).tickPadding(7);
        var g = d3.select("body").html("").append("svg:g").call(axis),
            text = g.selectAll("g.tick text");
        text.each(function() {
          assert.equal(d3.select(this).attr("y"), 9);
        });
      }
    },

    "generates a domain path": function(axis) {
      var g = d3.select("body").html("").append("svg:g").call(axis),
          path = g.selectAll("path.domain");
      assert.equal(path[0].length, 1);
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
