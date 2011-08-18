require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.scale.log");

suite.addBatch({
  "log": {
    topic: function() {
      return d3.scale.log;
    },

    "domain": {
      "defaults to [1, 10]": function(log) {
        var x = log();
        assert.deepEqual(x.domain(), [1, 10]);
        assert.inDelta(x(5), 0.69897, 1e-6);
      },
      "coerces domain values to numbers": function(log) {
        var x = log().domain([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
        assert.equal(typeof x.domain()[0], "number");
        assert.equal(typeof x.domain()[1], "number");
        assert.inDelta(x(new Date(1989, 09, 20)), -.2, 1e-2);
        assert.inDelta(x(new Date(1990, 00, 01)), 0, 1e-2);
        assert.inDelta(x(new Date(1990, 02, 15)), .2, 1e-2);
        assert.inDelta(x(new Date(1990, 04, 27)), .4, 1e-2);
        assert.inDelta(x(new Date(1991, 00, 01)), 1, 1e-2);
        assert.inDelta(x(new Date(1991, 02, 15)), 1.2, 1e-2);
        var x = log().domain(["1", "10"]);
        assert.equal(typeof x.domain()[0], "number");
        assert.equal(typeof x.domain()[1], "number");
        assert.inDelta(x(5), 0.69897, 1e-6);
        var x = log().domain([new Number(1), new Number(10)]);
        assert.equal(typeof x.domain()[0], "number");
        assert.equal(typeof x.domain()[1], "number");
        assert.inDelta(x(5), 0.69897, 1e-6);
      },
      "can specify negative domain values": function(log) {
        var x = log().domain([-100, -1]);
        assert.deepEqual(x.ticks().map(x.tickFormat()), [-100, -90, -80, -70, -60, -50, -40, -30, -20, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1]);
        assert.inDelta(x(-50), 0.150515, 1e-6);
      },
      "can specify a polylog domain and range": function(log) {
        var x = log().domain([.1, 1, 100]).range(["red", "white", "green"]);
        assert.equal(x(.5), "rgb(255,178,178)");
        assert.equal(x(50), "rgb(38,147,38)");
        assert.equal(x(75), "rgb(16,136,16)");
      }
    },

    "range": {
      "defaults to [0, 1]": function(log) {
        var x = log();
        assert.deepEqual(x.range(), [0, 1]);
        assert.inDelta(x.invert(.5), 3.162278, 1e-6);
      },
      "does not coerce range to numbers": function(log) {
        var x = log().range(["0", "2"]);
        assert.equal(typeof x.range()[0], "string");
        assert.equal(typeof x.range()[1], "string");
      },
      "can specify range values as colors": function(log) {
        var x = log().range(["red", "blue"]);
        assert.equal(x(5), "rgb(77,0,178)");
        var x = log().range(["#ff0000", "#0000ff"]);
        assert.equal(x(5), "rgb(77,0,178)");
        var x = log().range(["#f00", "#00f"]);
        assert.equal(x(5), "rgb(77,0,178)");
        var x = log().range([d3.rgb(255,0,0), d3.hsl(240,1,.5)]);
        assert.equal(x(5), "rgb(77,0,178)");
        var x = log().range(["hsl(0,100%,50%)", "hsl(240,100%,50%)"]);
        assert.equal(x(5), "rgb(77,0,178)");
      },
      "can specify range values as arrays or objects": function(log) {
        var x = log().range([{color: "red"}, {color: "blue"}]);
        assert.deepEqual(x(5), {color: "rgb(77,0,178)"});
        var x = log().range([["red"], ["blue"]]);
        assert.deepEqual(x(5), ["rgb(77,0,178)"]);
      }
    },

    "interpolate": {
      "defaults to d3.interpolate": function(log) {
        var x = log().range(["red", "blue"]);
        assert.equal(x.interpolate(), d3.interpolate);
        assert.equal(x(5), "rgb(77,0,178)");
      },
      "can specify a custom interpolator": function(log) {
        var x = log().range(["red", "blue"]).interpolate(d3.interpolateHsl);
        assert.equal(x(5), "#00ffcb");
      }
    },

    "clamp": {
      "defaults to false": function(log) {
        var x = log();
        assert.isFalse(x.clamp());
        assert.inDelta(x(.5), -0.3010299, 1e-6);
        assert.inDelta(x(15), 1.1760913, 1e-6);
      },
      "can clamp to the domain": function(log) {
        var x = log().clamp(true);
        assert.inDelta(x(.5), 0, 1e-6);
        assert.inDelta(x(5), 0.69897, 1e-6);
        assert.inDelta(x(15), 1, 1e-6);
        var x = log().domain([10, 1]).clamp(true);
        assert.inDelta(x(.5), 1, 1e-6);
        assert.inDelta(x(5), 0.30103, 1e-6);
        assert.inDelta(x(15), 0, 1e-6);
      }
    },

    "maps a number to a number": function(log) {
      var x = log().domain([1, 2]);
      assert.inDelta(x(.5), -1, 1e-6);
      assert.inDelta(x(1), 0, 1e-6);
      assert.inDelta(x(1.5), 0.5849625, 1e-6);
      assert.inDelta(x(2), 1, 1e-6);
      assert.inDelta(x(2.5), 1.3219281, 1e-6);
    },

    "invert": {
      "maps a number to a number": function(log) {
        var x = log().domain([1, 2]);
        assert.inDelta(x.invert(-1), .5, 1e-6);
        assert.inDelta(x.invert(0), 1, 1e-6);
        assert.inDelta(x.invert(0.5849625), 1.5, 1e-6);
        assert.inDelta(x.invert(1), 2, 1e-6);
        assert.inDelta(x.invert(1.3219281), 2.5, 1e-6);
      },
      "coerces range value to number on invert": function(log) {
        var x = log().range(["0", "2"]);
        assert.inDelta(x.invert("1"), 3.1622777, 1e-6);
        var x = log().range([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
        assert.inDelta(x.invert(new Date(1990, 6, 2, 13)), 3.1622777, 1e-6);
        var x = log().range(["#000", "#fff"]);
        assert.isNaN(x.invert("#999"));
      }
    },

    "ticks": {
      "can generate ticks": function(log) {
        var x = log();
        assert.deepEqual(x.ticks().map(x.tickFormat()), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        var x = log().domain([100, 1]);
        assert.deepEqual(x.ticks().map(x.tickFormat()), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
      }
    },

    "nice": {
      "can nice the domain, extending it to powers of ten": function(log) {
        var x = log().domain([1.1, 10.9]).nice();
        assert.deepEqual(x.domain(), [1, 100]);
        var x = log().domain([10.9, 1.1]).nice();
        assert.deepEqual(x.domain(), [100, 1]);
        var x = log().domain([.7, 11.001]).nice();
        assert.deepEqual(x.domain(), [.1, 100]);
        var x = log().domain([123.1, 6.7]).nice();
        assert.deepEqual(x.domain(), [1000, 1]);
        var x = log().domain([.01, .49]).nice();
        assert.deepEqual(x.domain(), [.01, 1]);
      },
      "nicing a polylog domain only affects the extent": function(log) {
        var x = log().domain([1.1, 1.5, 10.9]).nice();
        assert.deepEqual(x.domain(), [1, 1.5, 100]);
        var x = log().domain([-123.1, -1.5, -.5]).nice();
        assert.deepEqual(x.domain(), [-1000, -1.5, -.1]);
      }
    },

    "copy": {
      "changes to the domain are isolated": function(log) {
        var x = log(), y = x.copy();
        x.domain([10, 100]);
        assert.deepEqual(y.domain(), [1, 10]);
        assert.equal(x(10), 0);
        assert.equal(y(1), 0);
        y.domain([100, 1000]);
        assert.equal(x(100), 1);
        assert.equal(y(100), 0);
        assert.deepEqual(x.domain(), [10, 100]);
        assert.deepEqual(y.domain().map(Math.round), [100, 1000]);
      },
      "changes to the range are isolated": function(log) {
        var x = log(), y = x.copy();
        x.range([1, 2]);
        assert.equal(x.invert(1), 1);
        assert.equal(y.invert(1), 10);
        assert.deepEqual(y.range(), [0, 1]);
        y.range([2, 3]);
        assert.equal(x.invert(2), 10);
        assert.equal(y.invert(2), 1);
        assert.deepEqual(x.range(), [1, 2]);
        assert.deepEqual(y.range(), [2, 3]);
      },
      "changes to the interpolator are isolated": function(log) {
        var x = log().range(["red", "blue"]), y = x.copy();
        x.interpolate(d3.interpolateHsl);
        assert.equal(x(5), "#00ffcb");
        assert.equal(y(5), "rgb(77,0,178)");
        assert.equal(y.interpolate(), d3.interpolate);
      },
      "changes to clamping are isolated": function(log) {
        var x = log().clamp(true), y = x.copy();
        x.clamp(false);
        assert.inDelta(x(.5), -0.30103, 1e-6);
        assert.equal(y(.5), 0);
        assert.isTrue(y.clamp());
        y.clamp(false);
        assert.inDelta(x(20), 1.30103, 1e-6);
        assert.inDelta(y(20), 1.30103, 1e-6);
        assert.isFalse(x.clamp());
      }
    }
  }
});

suite.export(module);
