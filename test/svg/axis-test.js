var vows = require("vows"),
    _ = require("../../"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.svg.axis");

suite.addBatch({
  "axis": {
    topic: load("svg/axis").document(),

    "scale": {
      "defaults to a linear scale": function(d3) {
        var a = d3.svg.axis(),
            x = a.scale();
        assert.deepEqual(x.domain(), [0, 1]);
        assert.deepEqual(x.range(), [0, 1]);
        assert.equal(x(0.5), 0.5);
      },
      "can be defined as a scale object": function(d3) {
        var x = _.scale.linear(),
            a = d3.svg.axis().scale(x);
        assert.equal(a.scale(), x);
      },
      "can be a polylinear scale": function(d3) {
        var x = _.scale.linear().domain([0, 1, 10]).range([2, 20, 200]),
            a = d3.svg.axis().scale(x),
            g = d3.select("body").html("").append("g").call(a),
            path = g.selectAll("path");
        assert.inDelta(g.selectAll(".tick").data(), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1e-4);
        assert.inDelta(g.selectAll(".tick").data().map(x), [2, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200], 1e-4);
        assert.equal(path.attr("d"), "M2,6V0H200V6");
      },
      "can be an ordinal scale": function(d3) {
        var x = _.scale.ordinal().domain(["A", "B", "C"]).rangeBands([10, 90]),
            a = d3.svg.axis().scale(x),
            g = d3.select("body").html("").append("g").call(a),
            path = g.selectAll("path");
        assert.deepEqual(g.selectAll(".tick").data(), ["A", "B", "C"]);
        assert.inDelta(g.selectAll(".tick").data().map(x), [10, 36.6667, 63.3333], 1e-4);
        assert.equal(path.attr("d"), "M10,6V0H90V6");
      },
      "can be an ordinal scale with explicit range": function(d3) {
        var x = _.scale.ordinal().domain(["A", "B", "C"]).range([10, 50, 90]),
            a = d3.svg.axis().scale(x),
            g = d3.select("body").html("").append("g").call(a),
            path = g.selectAll("path");
        assert.deepEqual(g.selectAll(".tick").data(), ["A", "B", "C"]);
        assert.deepEqual(g.selectAll(".tick").data().map(x), [10, 50, 90]);
        assert.equal(path.attr("d"), "M10,6V0H90V6");
      },
      "can be a quantize scale": function(d3) {
        var x = _.scale.quantize().domain([0, 10]).range([10, 50, 90]),
            a = d3.svg.axis().scale(x),
            g = d3.select("body").html("").append("g").call(a);
        assert.inDelta(g.selectAll(".tick").data(), [0, 10], 1e-4);
        assert.deepEqual(g.selectAll(".tick").data().map(x), [10, 90]);
        assert.equal(g.select("path").attr("d"), "M10,6V0H90V6");
      },
      "can be a quantile scale": function(d3) {
        var x = _.scale.quantile().domain([6, 3, 5, 2, 7, 8, 4, 0, 1, 9]).range([10, 50, 90]),
            a = d3.svg.axis().scale(x),
            g = d3.select("body").html("").append("g").call(a);
        assert.inDelta(g.selectAll(".tick").data(), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1e-4);
        assert.inDelta(g.selectAll(".tick").data().map(x), [10, 10, 10, 50, 50, 50, 90, 90, 90, 90], 1e-4);
        assert.equal(g.select("path").attr("d"), "M10,6V0H90V6");
      },
      "can be a threshold scale": function(d3) {
        var x = _.scale.threshold().domain([4, 5, 6]).range([0, 30, 60, 90]),
            a = d3.svg.axis().scale(x),
            g = d3.select("body").html("").append("g").call(a);
        assert.inDelta(g.selectAll(".tick").data(), [4, 5, 6], 1e-4);
        assert.inDelta(g.selectAll(".tick").data().map(x), [30, 60, 90], 1e-4);
        assert.equal(g.select("path").attr("d"), "M0,6V0H90V6");
      }
    },

    "orient": {
      "defaults to bottom": function(d3) {
        var a = d3.svg.axis();
        assert.equal(a.orient(), "bottom");
      },
      "defaults to bottom when an invalid orientation is specified": function(d3) {
        var a = d3.svg.axis().orient("invalid");
        assert.equal(a.orient(), "bottom");
      },
      "coerces to a string": function(d3) {
        var a = d3.svg.axis().orient({toString: function() { return "left"; }});
        assert.equal(a.orient(), "left");
      },
      "supports top orientation": function(d3) {
        var a = d3.svg.axis().orient("top"),
            g = d3.select("body").html("").append("g").call(a),
            tick = g.select("g:nth-child(3)"),
            text = tick.select("text"),
            line = tick.select("line"),
            path = g.select("path.domain");
        assert.equal(tick.attr("transform"), "translate(0.2,0)");
        assert.equal(text.attr("y"), -9);
        assert.equal(text.attr("dy"), "0em");
        assert.equal(text.style("text-anchor"), "middle");
        assert.equal(text.text(), "0.2");
        assert.equal(line.attr("y2"), -6);
        assert.equal(path.attr("d"), "M0,-6V0H1V-6");
      },
      "supports right orientation": function(d3) {
        var a = d3.svg.axis().orient("right"),
            g = d3.select("body").html("").append("g").call(a),
            tick = g.select("g:nth-child(3)"),
            text = tick.select("text"),
            line = tick.select("line"),
            path = g.select("path.domain");
        assert.equal(tick.attr("transform"), "translate(0,0.2)");
        assert.equal(text.attr("x"), 9);
        assert.equal(text.attr("dy"), ".32em");
        assert.equal(text.style("text-anchor"), "start");
        assert.equal(text.text(), "0.2");
        assert.equal(line.attr("x2"), 6);
        assert.equal(path.attr("d"), "M6,0H0V1H6");
      },
      "supports bottom orientation": function(d3) {
        var a = d3.svg.axis().orient("bottom"),
            g = d3.select("body").html("").append("g").call(a),
            tick = g.select("g:nth-child(3)"),
            text = tick.select("text"),
            line = tick.select("line"),
            path = g.select("path.domain");
        assert.equal(tick.attr("transform"), "translate(0.2,0)");
        assert.equal(text.attr("y"), 9);
        assert.equal(text.attr("dy"), ".71em");
        assert.equal(text.style("text-anchor"), "middle");
        assert.equal(text.text(), "0.2");
        assert.equal(line.attr("y2"), 6);
        assert.equal(path.attr("d"), "M0,6V0H1V6");
      },
      "supports left orientation": function(d3) {
        var a = d3.svg.axis().orient("left"),
            g = d3.select("body").html("").append("g").call(a),
            tick = g.select("g:nth-child(3)"),
            text = tick.select("text"),
            line = tick.select("line"),
            path = g.select("path.domain");
        assert.equal(tick.attr("transform"), "translate(0,0.2)");
        assert.equal(text.attr("x"), -9);
        assert.equal(text.attr("dy"), ".32em");
        assert.equal(text.style("text-anchor"), "end");
        assert.equal(text.text(), "0.2");
        assert.equal(line.attr("x2"), -6);
        assert.equal(path.attr("d"), "M-6,0H0V1H-6");
      }
    },

    "tickSize": {
      "defaults to six pixels": function(d3) {
        var a = d3.svg.axis();
        assert.equal(a.tickSize(), 6);
      },
      "can be defined as a number": function(d3) {
        var a = d3.svg.axis().tickSize(3);
        assert.equal(a.tickSize(), 3);
      },
      "coerces input value to a number": function(d3) {
        var a = d3.svg.axis().tickSize("3");
        assert.strictEqual(a.tickSize(), 3);
      },
      "affects the generated domain path": function(d3) {
        var a = d3.svg.axis().tickSize(3),
            g = d3.select("body").html("").append("g").call(a),
            path = g.select("path.domain");
        assert.equal(path.attr("d"), "M0,3V0H1V3");
      },
      "affects the generated tick lines": function(d3) {
        var a = d3.svg.axis().tickSize(3),
            g = d3.select("body").html("").append("g").call(a),
            line = g.selectAll("g line");
        line.each(function() {
          assert.equal(d3.select(this).attr("y2"), 3);
        });
      },
      "if negative, labels are placed on the opposite end": function(d3) {
        var a = d3.svg.axis().tickSize(-80),
            g = d3.select("body").html("").append("g").call(a),
            line = g.selectAll("g line"),
            text = g.selectAll("g text");
        line.each(function() {
          assert.equal(d3.select(this).attr("y2"), -80);
        });
        text.each(function() {
          assert.equal(d3.select(this).attr("y"), 3);
        });
      },
      "with two arguments, specifies end tick size": function(d3) {
        var a = d3.svg.axis().tickSize(6, 3),
            g = d3.select("body").html("").append("g").call(a),
            path = g.selectAll("path");
        assert.equal(path.attr("d"), "M0,3V0H1V3");
      },
      "with three arguments, specifies end and minor tick sizes": function(d3) {
        var a = d3.svg.axis().tickSubdivide(3).tickSize(6, 3, 9),
            g = d3.select("body").html("").append("g").call(a),
            path = g.selectAll("path"),
            line = g.select(".minor");
        assert.equal(path.attr("d"), "M0,9V0H1V9");
        assert.equal(line.attr("y2"), "3");
      }
    },

    "tickPadding": {
      "defaults to three pixels": function(d3) {
        var a = d3.svg.axis();
        assert.equal(a.tickPadding(), 3);
      },
      "can be defined as a number": function(d3) {
        var a = d3.svg.axis().tickPadding(6);
        assert.equal(a.tickPadding(), 6);
      },
      "coerces input value to a number": function(d3) {
        var a = d3.svg.axis().tickPadding("6");
        assert.strictEqual(a.tickPadding(), 6);
      },
      "affects the generated tick labels": function(d3) {
        var a = d3.svg.axis().tickSize(2).tickPadding(7),
            g = d3.select("body").html("").append("g").call(a),
            text = g.selectAll("g text");
        text.each(function() {
          assert.equal(d3.select(this).attr("y"), 9);
        });
      }
    },

    "ticks": {
      "defaults to [10]": function(d3) {
        var a = d3.svg.axis();
        assert.deepEqual(a.ticks(), [10]);
      },
      "can be defined as any arguments": function(d3) {
        var b = {}, a = d3.svg.axis().ticks(b, 42), t = a.ticks();
        assert.equal(t[0], b);
        assert.equal(t[1], 42);
        assert.equal(t.length, 2);
      },
      "passes any arguments to the scale's ticks function": function(d3) {
        var x = _.scale.linear(), b = {}, a = d3.svg.axis().ticks(b, "%").scale(x), aa = [],
            g = d3.select("body").html("").append("g");
        x.ticks = function() { aa.push(arguments); return [42]; };
        g.call(a);
        assert.equal(aa.length, 1);
        assert.equal(aa[0].length, 2);
        assert.equal(aa[0][0], b);
        assert.equal(aa[0][1], "%");
      },
      "passes any arguments to the scale's tickFormat function": function(d3) {
        var b = {},
            x = _.scale.linear(),
            a = d3.svg.axis().scale(x).ticks(b, "%"),
            g = d3.select("body").html("").append("g"),
            aa = [];

        x.tickFormat = function() {
          aa.push(arguments);
          return String;
        };

        g.call(a);
        assert.equal(aa.length, 1);
        assert.equal(aa[0].length, 2);
        assert.equal(aa[0][0], b);
        assert.equal(aa[0][1], "%");
      },
      "affects the generated ticks": function(d3) {
        var a = d3.svg.axis().ticks(20, "%"),
            g = d3.select("body").html("").append("g").call(a),
            t = g.selectAll("g");
        assert.equal(t[0].length, 21);
        assert.equal(t[0][0].textContent, "0%");
      },
      "only substitutes precision if not specified": function(d3) {
        var a = d3.svg.axis().ticks(20, ".5%"),
            g = d3.select("body").html("").append("g").call(a),
            t = g.selectAll("g");
        assert.equal(t[0].length, 21);
        assert.equal(t[0][0].textContent, "0.00000%");
      }
    },

    "tickValues": {
      "defaults to null": function(d3) {
        var a = d3.svg.axis().tickValues();
        assert.isNull(a);
      },
      "can be given as array of positions": function(d3) {
        var l = [1, 2.5, 3], a = d3.svg.axis().tickValues(l), t = a.tickValues();
        assert.equal(t, l);
        assert.equal(t.length, 3);
      },
      "does not change the tick arguments": function(d3) {
        var b = {}, a = d3.svg.axis().ticks(b, 42).tickValues([10]), t = a.ticks();
        assert.equal(t[0], b);
        assert.equal(t[1], 42);
        assert.equal(t.length, 2);
      },
      "does not change the arguments passed to the scale's tickFormat function": function(d3) {
        var x = _.scale.linear(),
            a = d3.svg.axis().scale(x).ticks(10).tickValues([1, 2, 3]),
            g = d3.select("body").html("").append("g"),
            aa = [];

        x.tickFormat = function() {
          aa.push(arguments);
          return String;
        };

        g.call(a);
        assert.equal(aa.length, 1);
        assert.equal(aa[0].length, 1);
        assert.equal(aa[0][0], 10);
      },
      "affects the generated ticks": function(d3) {
        var a = d3.svg.axis().ticks(20),
            g = d3.select("body").html("").append("g").call(a),
            t = g.selectAll("g");
        assert.equal(t[0].length, 21);
      }
    },

    "tickSubdivide": {
      "defaults to zero": function(d3) {
        var a = d3.svg.axis();
        assert.equal(a.tickSubdivide(), 0);
      },
      "coerces input value to a number": function(d3) {
        var a = d3.svg.axis().tickSubdivide(true);
        assert.strictEqual(a.tickSubdivide(), 1);
      },
      "does not generate minor ticks when zero": function(d3) {
        var g = d3.select("body").html("").append("g").call(d3.svg.axis());
        assert.isTrue(g.selectAll(".minor").empty());
      },
      "affects the generated minor ticks": function(d3) {
        var a = d3.svg.axis().tickSubdivide(3),
            g = d3.select("body").html("").append("g").call(a),
            t = g.selectAll("line.tick.minor");
        assert.equal(t[0].length, 30);
        assert.equal(t[0][1].getAttribute("transform"), "translate(0.05,0)");
      }
    },

    "tickFormat": {
      "defaults to null": function(d3) {
        var a = d3.svg.axis();
        assert.isTrue(a.tickFormat() == null);
      },
      "when null, uses the scale's tick format": function(d3) {
        var x = _.scale.linear(), a = d3.svg.axis().scale(x),
            g = d3.select("body").html("").append("g");

        x.tickFormat = function() {
          return function(d) {
            return "foo-" + d;
          };
        };

        g.call(a);
        var t = g.selectAll("g text");
        assert.equal(t.text(), "foo-0");
      },
      "affects the generated tick labels": function(d3) {
        var a = d3.svg.axis().tickFormat(d3.format("+.2%")),
            g = d3.select("body").html("").append("g").call(a),
            t = g.selectAll("g text");
        assert.equal(t.text(), "+0.00%");
      },
      "can be set to a constant": function(d3) {
        var a = d3.svg.axis().tickFormat("I'm a tick!"),
            g = d3.select("body").html("").append("g").call(a),
            t = g.selectAll("g text");
        assert.equal(t.text(), "I'm a tick!");
      },
      "can be set to a falsey constant": function(d3) {
        var a = d3.svg.axis().tickFormat(""),
            g = d3.select("body").html("").append("g").call(a),
            t = g.selectAll("g text");
        assert.equal(t.text(), "");
      }
    },

    "enter": {
      "generates a new domain path": function(d3) {
        var a = d3.svg.axis(),
            g = d3.select("body").html("").append("g").call(a),
            path = g.selectAll("path.domain");
        assert.equal(path[0].length, 1);
        assert.equal(path.attr("d"), "M0,6V0H1V6");
        assert.isNull(path.node().nextSibling);
      },
      "generates new tick marks with labels": function(d3) {
        var a = d3.svg.axis(),
            g = d3.select("body").html("").append("g").call(a),
            x = _.scale.linear(),
            tick = g.selectAll("g"),
            ticks = x.ticks(10),
            tickFormat = x.tickFormat(10);
        assert.equal(tick[0].length, ticks.length);
        tick.each(function(d, i) {
          var t = d3.select(this);
          assert.isFalse(t.select("line").empty());
          assert.isFalse(t.select("text").empty());
          assert.equal(t.select("text").text(), tickFormat(ticks[i]));
        });
      }
    },

    "update": {
      "updates the domain path": function(d3) {
        var a = d3.svg.axis(),
            g = d3.select("body").html("").append("g").call(a);
        a.scale().domain([0, 2]).range([1, 2]);
        a.tickSize(3);
        g.call(a);
        var path = g.selectAll("path.domain");
        assert.equal(path[0].length, 1);
        assert.equal(path.attr("d"), "M1,3V0H2V3");
        assert.domEqual(path.node().nextSibling, null);
      },
      "enters, exits and updates tick marks": function(d3) {
        var a = d3.svg.axis(),
            g = d3.select("body").html("").append("g").call(a),
            x = d3.scale.linear().domain([1, 1.5]);
        a.scale().domain(x.domain());
        a.tickSize(3).tickPadding(9);
        g.call(a);
        var tick = g.selectAll("g"),
            ticks = x.ticks(10),
            tickFormat = x.tickFormat(10);
        assert.equal(tick[0].length, ticks.length);
        tick.each(function(d, i) {
          var t = d3.select(this);
          assert.isFalse(t.select("line").empty());
          assert.isFalse(t.select("text").empty());
          assert.equal(t.select("text").text(), tickFormat(ticks[i]));
        });
      }
    }
  }
});

suite.export(module);
