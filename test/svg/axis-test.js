require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.svg.axis");

suite.addBatch({
  "axis": {
    topic: function() {
      return d3.svg.axis;
    },

    "scale": {
      "defaults to a linear scale": function(axis) {
        var a = axis(), x = a.scale();
        assert.deepEqual(x.domain(), [0, 1]);
        assert.deepEqual(x.range(), [0, 1]);
        assert.equal(x(0.5), 0.5);
      },
      "can be defined as a scale object": function(axis) {
        var x = d3.scale.linear(), a = axis().scale(x);
        assert.equal(a.scale(), x);
      },
      "can be a polylinear scale": function(axis) {
        var a = axis().scale(d3.scale.linear().domain([0, 1, 10]).range([2, 20, 200])),
            g = d3.select("body").html("").append("svg:g").call(a),
            path = g.selectAll("path");
        assert.equal(path.attr("d"), "M2,6V0H200V6");
      },
      "can be an ordinal scale": function(axis) {
        var a = axis().scale(d3.scale.ordinal().domain(["A", "B", "C"]).rangeBands([10, 90])),
            g = d3.select("body").html("").append("svg:g").call(a),
            path = g.selectAll("path");
        assert.equal(path.attr("d"), "M10,6V0H90V6");
      },
      "can be an ordinal scale with explicit range": function(axis) {
        var a = axis().scale(d3.scale.ordinal().domain(["A", "B", "C"]).range([10, 50, 90])),
            g = d3.select("body").html("").append("svg:g").call(a),
            path = g.selectAll("path");
        assert.equal(path.attr("d"), "M10,6V0H90V6");
      }
    },

    "orient": {
      "defaults to bottom": function(axis) {
        var a = axis();
        assert.equal(a.orient(), "bottom");
      },
      "defaults to bottom when an invalid orientation is specified": function(axis) {
        var a = axis().orient("invalid");
        assert.equal(a.orient(), "bottom");
      },
      "coerces to a string": function(axis) {
        var a = axis().orient({toString: function() { return "left"; }});
        assert.equal(a.orient(), "left");
      },
      "supports top orientation": function(axis) {
        var a = axis().orient("top"),
            g = d3.select("body").html("").append("svg:g").call(a),
            tick = g.select("g:nth-child(3)"),
            text = tick.select("text"),
            line = tick.select("line"),
            path = g.select("path.domain");
        assert.equal(tick.attr("transform"), "translate(0.2,0)");
        assert.equal(text.attr("y"), -9)
        assert.equal(text.attr("dy"), "0em");
        assert.equal(text.style("text-anchor"), "middle");
        assert.equal(text.text(), "0.2");
        assert.equal(line.attr("y2"), -6);
        assert.equal(path.attr("d"), "M0,-6V0H1V-6");
      },
      "supports right orientation": function(axis) {
        var a = axis().orient("right"),
            g = d3.select("body").html("").append("svg:g").call(a),
            tick = g.select("g:nth-child(3)"),
            text = tick.select("text"),
            line = tick.select("line"),
            path = g.select("path.domain");
        assert.equal(tick.attr("transform"), "translate(0,0.2)");
        assert.equal(text.attr("x"), 9)
        assert.equal(text.attr("dy"), ".32em");
        assert.equal(text.style("text-anchor"), "start");
        assert.equal(text.text(), "0.2");
        assert.equal(line.attr("x2"), 6);
        assert.equal(path.attr("d"), "M6,0H0V1H6");
      },
      "supports bottom orientation": function(axis) {
        var a = axis().orient("bottom"),
            g = d3.select("body").html("").append("svg:g").call(a),
            tick = g.select("g:nth-child(3)"),
            text = tick.select("text"),
            line = tick.select("line"),
            path = g.select("path.domain");
        assert.equal(tick.attr("transform"), "translate(0.2,0)");
        assert.equal(text.attr("y"), 9)
        assert.equal(text.attr("dy"), ".71em");
        assert.equal(text.style("text-anchor"), "middle");
        assert.equal(text.text(), "0.2");
        assert.equal(line.attr("y2"), 6);
        assert.equal(path.attr("d"), "M0,6V0H1V6");
      },
      "supports left orientation": function(axis) {
        var a = axis().orient("left"),
            g = d3.select("body").html("").append("svg:g").call(a),
            tick = g.select("g:nth-child(3)"),
            text = tick.select("text"),
            line = tick.select("line"),
            path = g.select("path.domain");
        assert.equal(tick.attr("transform"), "translate(0,0.2)");
        assert.equal(text.attr("x"), -9)
        assert.equal(text.attr("dy"), ".32em");
        assert.equal(text.style("text-anchor"), "end");
        assert.equal(text.text(), "0.2");
        assert.equal(line.attr("x2"), -6);
        assert.equal(path.attr("d"), "M-6,0H0V1H-6");
      }
    },

    "tickSize": {
      "defaults to six pixels": function(axis) {
        var a = axis();
        assert.equal(a.tickSize(), 6);
      },
      "can be defined as a number": function(axis) {
        var a = axis().tickSize(3);
        assert.equal(a.tickSize(), 3);
      },
      "coerces input value to a number": function(axis) {
        var a = axis().tickSize("3");
        assert.strictEqual(a.tickSize(), 3);
      },
      "affects the generated domain path": function(axis) {
        var a = axis().tickSize(3),
            g = d3.select("body").html("").append("svg:g").call(a),
            path = g.select("path.domain");
        assert.equal(path.attr("d"), "M0,3V0H1V3");
      },
      "affects the generated tick lines": function(axis) {
        var a = axis().tickSize(3),
            g = d3.select("body").html("").append("svg:g").call(a),
            line = g.selectAll("g line");
        line.each(function() {
          assert.equal(d3.select(this).attr("y2"), 3);
        });
      },
      "if negative, labels are placed on the opposite end": function(axis) {
        var a = axis().tickSize(-80),
            g = d3.select("body").html("").append("svg:g").call(a),
            line = g.selectAll("g line"),
            text = g.selectAll("g text");
        line.each(function() {
          assert.equal(d3.select(this).attr("y2"), -80);
        });
        text.each(function() {
          assert.equal(d3.select(this).attr("y"), 3);
        });
      },
      "with two arguments, specifies end tick size": function(axis) {
        var a = axis().tickSize(6, 3),
            g = d3.select("body").html("").append("svg:g").call(a),
            path = g.selectAll("path");
        assert.equal(path.attr("d"), "M0,3V0H1V3");
      },
      "with three arguments, specifies end and minor tick sizes": function(axis) {
        var a = axis().tickSubdivide(3).tickSize(6, 3, 9),
            g = d3.select("body").html("").append("svg:g").call(a),
            path = g.selectAll("path"),
            line = g.select(".minor");
        assert.equal(path.attr("d"), "M0,9V0H1V9");
        assert.equal(line.attr("y2"), "3");
      }
    },

    "tickPadding": {
      "defaults to three pixels": function(axis) {
        var a = axis();
        assert.equal(a.tickPadding(), 3);
      },
      "can be defined as a number": function(axis) {
        var a = axis().tickPadding(6);
        assert.equal(a.tickPadding(), 6);
      },
      "coerces input value to a number": function(axis) {
        var a = axis().tickPadding("6");
        assert.strictEqual(a.tickPadding(), 6);
      },
      "affects the generated tick labels": function(axis) {
        var a = axis().tickSize(2).tickPadding(7),
            g = d3.select("body").html("").append("svg:g").call(a),
            text = g.selectAll("g text");
        text.each(function() {
          assert.equal(d3.select(this).attr("y"), 9);
        });
      }
    },

    "ticks": {
      "defaults to [10]": function(axis) {
        var a = axis();
        assert.deepEqual(a.ticks(), [10]);
      },
      "can be defined as any arguments": function(axis) {
        var b = {}, a = axis().ticks(b, 42), t = a.ticks();
        assert.equal(t[0], b);
        assert.equal(t[1], 42);
        assert.equal(t.length, 2);
      },
      "passes any arguments to the scale's ticks function": function(axis) {
        var x = d3.scale.linear(), b = {}, a = axis().ticks(b, 42).scale(x), aa = [],
            g = d3.select("body").html("").append("svg:g");
        x.ticks = function() { aa.push(arguments); return [42]; };
        g.call(a);
        assert.equal(aa.length, 1);
        assert.equal(aa[0].length, 2);
        assert.equal(aa[0][0], b);
        assert.equal(aa[0][1], 42);
      },
      "passes any arguments to the scale's tickFormat function": function(axis) {
        var b = {},
            x = d3.scale.linear(),
            a = axis().scale(x).ticks(b, 42),
            g = d3.select("body").html("").append("svg:g"),
            aa = [];

        x.tickFormat = function() {
          aa.push(arguments);
          return String;
        };

        g.call(a);
        assert.equal(aa.length, 1);
        assert.equal(aa[0].length, 2);
        assert.equal(aa[0][0], b);
        assert.equal(aa[0][1], 42);
      },
      "affects the generated ticks": function(axis) {
        var a = axis().ticks(20),
            g = d3.select("body").html("").append("svg:g").call(a),
            t = g.selectAll("g");
        assert.equal(t[0].length, 21);
      }
    },

    "tickValues": {
      "defaults to null": function(axis) {
        var a = axis().tickValues();
        assert.isNull(a);
      },
      "can be given as array of positions": function(axis) {
        var l = [1, 2.5, 3], a = axis().tickValues(l), t = a.tickValues();
        assert.equal(t, l);
        assert.equal(t.length, 3);
      },
      "does not change the tick arguments": function(axis) {
        var b = {}, a = axis().ticks(b, 42).tickValues([10]), t = a.ticks();
        assert.equal(t[0], b);
        assert.equal(t[1], 42);
        assert.equal(t.length, 2);
      },
      "does not change the arguments passed to the scale's tickFormat function": function(axis) {
        var x = d3.scale.linear(),
            a = axis().scale(x).ticks(10).tickValues([1, 2, 3]),
            g = d3.select("body").html("").append("svg:g"),
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
      "affects the generated ticks": function(axis) {
        var a = axis().ticks(20),
            g = d3.select("body").html("").append("svg:g").call(a),
            t = g.selectAll("g");
        assert.equal(t[0].length, 21);
      }
    },

    "tickSubdivide": {
      "defaults to zero": function(axis) {
        var a = axis();
        assert.equal(a.tickSubdivide(), 0);
      },
      "coerces input value to a number": function(axis) {
        var a = axis().tickSubdivide(true);
        assert.strictEqual(a.tickSubdivide(), 1);
      },
      "does not generate minor ticks when zero": function(axis) {
        var g = d3.select("body").html("").append("svg:g").call(axis());
        assert.isTrue(g.selectAll(".minor").empty());
      },
      "affects the generated minor ticks": function(axis) {
        var a = axis().tickSubdivide(3),
            g = d3.select("body").html("").append("svg:g").call(a),
            t = g.selectAll("line.tick.minor");
        assert.equal(t[0].length, 30);
        assert.equal(t[0][1].getAttribute("transform"), "translate(0.05,0)");
      }
    },

    "tickFormat": {
      "defaults to null": function(axis) {
        var a = axis();
        assert.isTrue(a.tickFormat() == null);
      },
      "when null, uses the scale's tick format": function(axis) {
        var x = d3.scale.linear(), a = axis().scale(x),
            g = d3.select("body").html("").append("svg:g");

        x.tickFormat = function() {
          return function(d) {
            return "foo-" + d;
          };
        };

        g.call(a);
        var t = g.selectAll("g text");
        assert.equal(t.text(), "foo-0");
      },
      "affects the generated tick labels": function(axis) {
        var a = axis().tickFormat(d3.format("+.2%")),
            g = d3.select("body").html("").append("svg:g").call(a),
            t = g.selectAll("g text");
        assert.equal(t.text(), "+0.00%");
      },
      "can be set to a constant": function(axis) {
        var a = axis().tickFormat("I'm a tick!"),
            g = d3.select("body").html("").append("svg:g").call(a),
            t = g.selectAll("g text");
        assert.equal(t.text(), "I'm a tick!");
      },
      "can be set to a falsey constant": function(axis) {
        var a = axis().tickFormat(""),
            g = d3.select("body").html("").append("svg:g").call(a),
            t = g.selectAll("g text");
        assert.equal(t.text(), "");
      }
    },

    "enter": {
      "generates a new domain path": function(axis) {
        var a = axis(),
            g = d3.select("body").html("").append("svg:g").call(a),
            path = g.selectAll("path.domain");
        assert.equal(path[0].length, 1);
        assert.equal(path.attr("d"), "M0,6V0H1V6");
        assert.isNull(path.node().nextSibling);
      },
      "generates new tick marks with labels": function(axis) {
        var a = axis(),
            g = d3.select("body").html("").append("svg:g").call(a),
            x = d3.scale.linear(),
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
      "updates the domain path": function(axis) {
        var a = axis(),
            g = d3.select("body").html("").append("svg:g").call(a);
        a.scale().domain([0, 2]).range([1, 2]);
        a.tickSize(3);
        g.call(a);
        var path = g.selectAll("path.domain");
        assert.equal(path[0].length, 1);
        assert.equal(path.attr("d"), "M1,3V0H2V3");
        assert.domEqual(path.node().nextSibling, null);
      },
      "enters, exits and updates tick marks": function(axis) {
        var a = axis(),
            g = d3.select("body").html("").append("svg:g").call(a),
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
