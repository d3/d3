require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.scale.pow");

suite.addBatch({
  "pow": {
    topic: function() {
      return d3.scale.pow;
    },

    "domain": {
      "defaults to [0, 1]": function(pow) {
        var x = pow();
        assert.deepEqual(x.domain(), [0, 1]);
        assert.inDelta(x(.5), .5, 1e-6);
      },
      "coerces domain to numbers": function(pow) {
        var x = pow().domain([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
        assert.equal(typeof x.domain()[0], "number");
        assert.equal(typeof x.domain()[1], "number");
        assert.inDelta(x(new Date(1989, 09, 20)), -.2, 1e-2);
        assert.inDelta(x(new Date(1990, 00, 01)), 0, 1e-2);
        assert.inDelta(x(new Date(1990, 02, 15)), .2, 1e-2);
        assert.inDelta(x(new Date(1990, 04, 27)), .4, 1e-2);
        assert.inDelta(x(new Date(1991, 00, 01)), 1, 1e-2);
        assert.inDelta(x(new Date(1991, 02, 15)), 1.2, 1e-2);
        var x = pow().domain(["0", "1"]);
        assert.equal(typeof x.domain()[0], "number");
        assert.equal(typeof x.domain()[1], "number");
        assert.inDelta(x(.5), .5, 1e-6);
        var x = pow().domain([new Number(0), new Number(1)]);
        assert.equal(typeof x.domain()[0], "number");
        assert.equal(typeof x.domain()[1], "number");
        assert.inDelta(x(.5), .5, 1e-6);
      },
      "can specify a polypower domain and range": function(pow) {
        var x = pow().domain([-10, 0, 100]).range(["red", "white", "green"]);
        assert.equal(x(-5), "#ff8080");
        assert.equal(x(50), "#80c080");
        assert.equal(x(75), "#40a040");
      }
    },

    "range": {
      "defaults to [0, 1]": function(pow) {
        var x = pow();
        assert.deepEqual(x.range(), [0, 1]);
        assert.inDelta(x.invert(.5), .5, 1e-6);
      },
      "does not coerce range values to numbers": function(pow) {
        var x = pow().range(["0", "2"]);
        assert.equal(typeof x.range()[0], "string");
        assert.equal(typeof x.range()[1], "string");
      },
      "coerces range values to number on invert": function(pow) {
        var x = pow().range(["0", "2"]);
        assert.inDelta(x.invert("1"), .5, 1e-6);
        var x = pow().range([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
        assert.inDelta(x.invert(new Date(1990, 6, 2, 13)), .5, 1e-6);
        var x = pow().range(["#000", "#fff"]);
        assert.isNaN(x.invert("#999"));
      },
      "can specify range values as colors": function(pow) {
        var x = pow().range(["red", "blue"]);
        assert.equal(x(.5), "#800080");
        var x = pow().range(["#ff0000", "#0000ff"]);
        assert.equal(x(.5), "#800080");
        var x = pow().range(["#f00", "#00f"]);
        assert.equal(x(.5), "#800080");
        var x = pow().range([d3.rgb(255,0,0), d3.hsl(240,1,.5)]);
        assert.equal(x(.5), "#800080");
        var x = pow().range(["hsl(0,100%,50%)", "hsl(240,100%,50%)"]);
        assert.equal(x(.5), "#800080");
      },
      "can specify range values as arrays or objects": function(pow) {
        var x = pow().range([{color: "red"}, {color: "blue"}]);
        assert.deepEqual(x(.5), {color: "#800080"});
        var x = pow().range([["red"], ["blue"]]);
        assert.deepEqual(x(.5), ["#800080"]);
      }
    },

    "exponent": {
      "defaults to one": function(pow) {
        var x = pow();
        assert.equal(x.exponent(), 1);
      },
      "observes the specified exponent": function(pow) {
        var x = pow().exponent(.5).domain([1, 2]);
        assert.inDelta(x(1), 0, 1e-6);
        assert.inDelta(x(1.5), 0.5425821, 1e-6);
        assert.inDelta(x(2), 1, 1e-6);
        assert.equal(x.exponent(), .5);
        var x = pow().exponent(2).domain([1, 2]);
        assert.inDelta(x(1), 0, 1e-6);
        assert.inDelta(x(1.5), .41666667, 1e-6);
        assert.inDelta(x(2), 1, 1e-6);
        assert.equal(x.exponent(), 2);
        var x = pow().exponent(-1).domain([1, 2]);
        assert.inDelta(x(1), 0, 1e-6);
        assert.inDelta(x(1.5), .6666667, 1e-6);
        assert.inDelta(x(2), 1, 1e-6);
        assert.equal(x.exponent(), -1);
      },
      "changing the exponent does not change the domain or range": function(pow) {
        var x = pow().domain([1, 2]).range([3, 4]), f = d3.format(".6f");
        x.exponent(.5);
        assert.deepEqual(x.domain().map(f), [1, 2]);
        assert.deepEqual(x.range(), [3, 4]);
        x.exponent(2);
        assert.deepEqual(x.domain().map(f), [1, 2]);
        assert.deepEqual(x.range(), [3, 4]);
        x.exponent(-1);
        assert.deepEqual(x.domain().map(f), [1, 2]);
        assert.deepEqual(x.range(), [3, 4]);
      }
    },

    "interpolate": {
      "defaults to d3.interpolate": function(pow) {
        var x = pow().range(["red", "blue"]);
        assert.equal(x.interpolate(), d3.interpolate);
        assert.equal(x(.5), "#800080");
      },
      "can specify a custom interpolator": function(pow) {
        var x = pow().range(["red", "blue"]).interpolate(d3.interpolateHsl);
        assert.equal(x(.5), "#ff00ff");
      }
    },

    "clamp": {
      "does not clamp by default": function(pow) {
        var x = pow();
        assert.isFalse(x.clamp());
        assert.inDelta(x(-.5), -.5, 1e-6);
        assert.inDelta(x(1.5), 1.5, 1e-6);
      },
      "can clamp to the domain": function(pow) {
        var x = pow().clamp(true);
        assert.inDelta(x(-.5), 0, 1e-6);
        assert.inDelta(x(.5), .5, 1e-6);
        assert.inDelta(x(1.5), 1, 1e-6);
        var x = pow().domain([1, 0]).clamp(true);
        assert.inDelta(x(-.5), 1, 1e-6);
        assert.inDelta(x(.5), .5, 1e-6);
        assert.inDelta(x(1.5), 0, 1e-6);
      }
    },

    "maps a number to a number": function(pow) {
      var x = pow().domain([1, 2]);
      assert.inDelta(x(.5), -.5, 1e-6);
      assert.inDelta(x(1), 0, 1e-6);
      assert.inDelta(x(1.5), .5, 1e-6);
      assert.inDelta(x(2), 1, 1e-6);
      assert.inDelta(x(2.5), 1.5, 1e-6);
    },

    "ticks": {
      "can generate ticks of varying degree": function(pow) {
        var x = pow();
        assert.deepEqual(x.ticks(1).map(x.tickFormat(1)), [0, 1]);
        assert.deepEqual(x.ticks(2).map(x.tickFormat(2)), [0, .5, 1]);
        assert.deepEqual(x.ticks(5).map(x.tickFormat(5)), [0, .2, .4, .6, .8, 1]);
        assert.deepEqual(x.ticks(10).map(x.tickFormat(10)), [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]);
        var x = pow().domain([1, 0]);
        assert.deepEqual(x.ticks(1).map(x.tickFormat(1)), [0, 1]);
        assert.deepEqual(x.ticks(2).map(x.tickFormat(2)), [0, .5, 1]);
        assert.deepEqual(x.ticks(5).map(x.tickFormat(5)), [0, .2, .4, .6, .8, 1]);
        assert.deepEqual(x.ticks(10).map(x.tickFormat(10)), [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]);
      }
    },

    "nice": {
      "can nice the domain, extending it to round numbers": function(pow) {
        var x = pow().domain([1.1, 10.9]).nice();
        assert.deepEqual(x.domain(), [1, 11]);
        var x = pow().domain([10.9, 1.1]).nice();
        assert.deepEqual(x.domain(), [11, 1]);
        var x = pow().domain([.7, 11.001]).nice();
        assert.deepEqual(x.domain(), [0, 12]);
        var x = pow().domain([123.1, 6.7]).nice();
        assert.deepEqual(x.domain(), [130, 0]);
        var x = pow().domain([0, .49]).nice();
        assert.deepEqual(x.domain(), [0, .5]);
        var x = pow().domain([0, 0]).nice();
        assert.deepEqual(x.domain(), [0, 0]);
        var x = pow().domain([.5, .5]).nice();
        assert.deepEqual(x.domain(), [.5, .5]);
      },
      "nicing a polypower domain only affects the extent": function(pow) {
        var x = pow().domain([1.1, 1, 2, 3, 10.9]).nice();
        assert.deepEqual(x.domain(), [1, 1, 2, 3, 11]);
        var x = pow().domain([123.1, 1, 2, 3, -.9]).nice();
        assert.deepEqual(x.domain(), [130, 1, 2, 3, -10]);
      }
    },

    "copy": {
      "changes to the domain are isolated": function(pow) {
        var x = pow(), y = x.copy();
        x.domain([1, 2]);
        assert.deepEqual(y.domain(), [0, 1]);
        assert.equal(x(1), 0);
        assert.equal(y(1), 1);
        y.domain([2, 3]);
        assert.equal(x(2), 1);
        assert.equal(y(2), 0);
        assert.deepEqual(x.domain(), [1, 2]);
        assert.deepEqual(y.domain(), [2, 3]);
      },
      "changes to the range are isolated": function(pow) {
        var x = pow(), y = x.copy();
        x.range([1, 2]);
        assert.equal(x.invert(1), 0);
        assert.equal(y.invert(1), 1);
        assert.deepEqual(y.range(), [0, 1]);
        y.range([2, 3]);
        assert.equal(x.invert(2), 1);
        assert.equal(y.invert(2), 0);
        assert.deepEqual(x.range(), [1, 2]);
        assert.deepEqual(y.range(), [2, 3]);
      },
      "changes to the exponent are isolated": function(pow) {
        var x = pow().exponent(2), y = x.copy();
        x.exponent(.5);
        assert.inDelta(x(.5), Math.SQRT1_2, 1e-6);
        assert.inDelta(y(.5), 0.25, 1e-6);
        assert.equal(x.exponent(), .5);
        assert.equal(y.exponent(), 2);
        y.exponent(3);
        assert.inDelta(x(.5), Math.SQRT1_2, 1e-6);
        assert.inDelta(y(.5), 0.125, 1e-6);
        assert.equal(x.exponent(), .5);
        assert.equal(y.exponent(), 3);
      },
      "changes to the interpolator are isolated": function(pow) {
        var x = pow().range(["red", "blue"]), y = x.copy();
        x.interpolate(d3.interpolateHsl);
        assert.equal(x(0.5), "#ff00ff");
        assert.equal(y(0.5), "#800080");
        assert.equal(y.interpolate(), d3.interpolate);
      },
      "changes to clamping are isolated": function(pow) {
        var x = pow().clamp(true), y = x.copy();
        x.clamp(false);
        assert.equal(x(2), 2);
        assert.equal(y(2), 1);
        assert.isTrue(y.clamp());
        y.clamp(false);
        assert.equal(x(2), 2);
        assert.equal(y(2), 2);
        assert.isFalse(x.clamp());
      }
    }
  }
});

suite.export(module);
