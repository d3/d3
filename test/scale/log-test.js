var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.scale.log");

suite.addBatch({
  "log": {
    topic: load("scale/log", "interpolate/hsl").document(), // beware instanceof d3_Color

    "domain": {
      "defaults to [1, 10], exactly": function(d3) {
        var x = d3.scale.log();
        assert.deepEqual(x.domain(), [1, 10]);
        assert.inDelta(x(5), 0.69897, 1e-6);
      },
      "coerces domain values to numbers": function(d3) {
        var x = d3.scale.log().domain([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
        assert.equal(typeof x.domain()[0], "number");
        assert.equal(typeof x.domain()[1], "number");
        assert.inDelta(x(new Date(1989, 09, 20)), -.2, 1e-2);
        assert.inDelta(x(new Date(1990, 00, 01)), 0, 1e-2);
        assert.inDelta(x(new Date(1990, 02, 15)), .2, 1e-2);
        assert.inDelta(x(new Date(1990, 04, 27)), .4, 1e-2);
        assert.inDelta(x(new Date(1991, 00, 01)), 1, 1e-2);
        assert.inDelta(x(new Date(1991, 02, 15)), 1.2, 1e-2);
        var x = d3.scale.log().domain(["1", "10"]);
        assert.equal(typeof x.domain()[0], "number");
        assert.equal(typeof x.domain()[1], "number");
        assert.inDelta(x(5), 0.69897, 1e-6);
        var x = d3.scale.log().domain([new Number(1), new Number(10)]);
        assert.equal(typeof x.domain()[0], "number");
        assert.equal(typeof x.domain()[1], "number");
        assert.inDelta(x(5), 0.69897, 1e-6);
      },
      "can specify negative domain values": function(d3) {
        var x = d3.scale.log().domain([-100, -1]);
        assert.deepEqual(x.ticks().map(x.tickFormat()), [
          "-1e+2",
          "-9e+1", "-8e+1", "-7e+1", "-6e+1", "-5e+1", "-4e+1", "-3e+1", "-2e+1", "-1e+1",
          "-9e+0", "-8e+0", "-7e+0", "-6e+0", "-5e+0", "-4e+0", "-3e+0", "-2e+0", "-1e+0"
        ]);
        assert.inDelta(x(-50), 0.150515, 1e-6);
      },
      "can specify a polylog domain and range": function(d3) {
        var x = d3.scale.log().domain([.1, 1, 100]).range(["red", "white", "green"]);
        assert.equal(x(.5), "#ffb2b2");
        assert.equal(x(50), "#269326");
        assert.equal(x(75), "#108810");
      },
      "preserves specified domain exactly, with no floating point error": function(d3) {
        var x = d3.scale.log().domain([.1, 1000]);
        assert.deepEqual(x.domain(), [.1, 1000]);
      }
    },

    "range": {
      "defaults to [0, 1]": function(d3) {
        var x = d3.scale.log();
        assert.deepEqual(x.range(), [0, 1]);
        assert.inDelta(x.invert(.5), 3.162278, 1e-6);
      },
      "does not coerce range to numbers": function(d3) {
        var x = d3.scale.log().range(["0", "2"]);
        assert.equal(typeof x.range()[0], "string");
        assert.equal(typeof x.range()[1], "string");
      },
      "can specify range values as colors": function(d3) {
        var x = d3.scale.log().range(["red", "blue"]);
        assert.equal(x(5), "#4d00b2");
        var x = d3.scale.log().range(["#ff0000", "#0000ff"]);
        assert.equal(x(5), "#4d00b2");
        var x = d3.scale.log().range(["#f00", "#00f"]);
        assert.equal(x(5), "#4d00b2");
        var x = d3.scale.log().range([d3.rgb(255,0,0), d3.hsl(240,1,.5)]);
        assert.equal(x(5), "#4d00b2");
        var x = d3.scale.log().range(["hsl(0,100%,50%)", "hsl(240,100%,50%)"]);
        assert.equal(x(5), "#4d00b2");
      },
      "can specify range values as arrays or objects": function(d3) {
        var x = d3.scale.log().range([{color: "red"}, {color: "blue"}]);
        assert.deepEqual(x(5), {color: "#4d00b2"});
        var x = d3.scale.log().range([["red"], ["blue"]]);
        assert.deepEqual(x(5), ["#4d00b2"]);
      }
    },

    "interpolate": {
      "defaults to d3.interpolate": function(d3) {
        var x = d3.scale.log().range(["red", "blue"]);
        assert.equal(x.interpolate(), d3.interpolate);
        assert.equal(x(5), "#4d00b2");
      },
      "can specify a custom interpolator": function(d3) {
        var x = d3.scale.log().range(["red", "blue"]).interpolate(d3.interpolateHsl);
        assert.equal(x(5), "#9a00ff");
      }
    },

    "clamp": {
      "defaults to false": function(d3) {
        var x = d3.scale.log();
        assert.isFalse(x.clamp());
        assert.inDelta(x(.5), -0.3010299, 1e-6);
        assert.inDelta(x(15), 1.1760913, 1e-6);
      },
      "can clamp to the domain": function(d3) {
        var x = d3.scale.log().clamp(true);
        assert.inDelta(x(-1), 0, 1e-6);
        assert.inDelta(x(5), 0.69897, 1e-6);
        assert.inDelta(x(15), 1, 1e-6);
        var x = d3.scale.log().domain([10, 1]).clamp(true);
        assert.inDelta(x(-1), 1, 1e-6);
        assert.inDelta(x(5), 0.30103, 1e-6);
        assert.inDelta(x(15), 0, 1e-6);
      },
      "can clamp to the range": function(d3) {
        var x = d3.scale.log().clamp(true);
        assert.inDelta(x.invert(-.1), 1, 1e-6);
        assert.inDelta(x.invert(0.69897), 5, 1e-6);
        assert.inDelta(x.invert(1.5), 10, 1e-6);
        var x = d3.scale.log().domain([10, 1]).clamp(true);
        assert.inDelta(x.invert(-.1), 10, 1e-6);
        assert.inDelta(x.invert(0.30103), 5, 1e-6);
        assert.inDelta(x.invert(1.5), 1, 1e-6);
      }
    },

    "maps a number to a number": function(d3) {
      var x = d3.scale.log().domain([1, 2]);
      assert.inDelta(x(.5), -1, 1e-6);
      assert.inDelta(x(1), 0, 1e-6);
      assert.inDelta(x(1.5), 0.5849625, 1e-6);
      assert.inDelta(x(2), 1, 1e-6);
      assert.inDelta(x(2.5), 1.3219281, 1e-6);
    },

    "invert": {
      "maps a number to a number": function(d3) {
        var x = d3.scale.log().domain([1, 2]);
        assert.inDelta(x.invert(-1), .5, 1e-6);
        assert.inDelta(x.invert(0), 1, 1e-6);
        assert.inDelta(x.invert(0.5849625), 1.5, 1e-6);
        assert.inDelta(x.invert(1), 2, 1e-6);
        assert.inDelta(x.invert(1.3219281), 2.5, 1e-6);
      },
      "coerces range value to number on invert": function(d3) {
        var x = d3.scale.log().range(["0", "2"]);
        assert.inDelta(x.invert("1"), 3.1622777, 1e-6);
        var x = d3.scale.log().range([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
        assert.inDelta(x.invert(new Date(1990, 6, 2, 13)), 3.1622777, 1e-6);
        var x = d3.scale.log().range(["#000", "#fff"]);
        assert.isNaN(x.invert("#999"));
      }
    },

    "ticks": {
      "can generate ticks": function(d3) {
        var x = d3.scale.log();
        assert.deepEqual(x.ticks().map(x.tickFormat()), [
          "1e+0", "2e+0", "3e+0", "4e+0", "5e+0", "6e+0", "7e+0", "8e+0", "9e+0",
          "1e+1"
        ]);
        var x = d3.scale.log().domain([100, 1]);
        assert.deepEqual(x.ticks().map(x.tickFormat()), [
          "1e+0", "2e+0", "3e+0", "4e+0", "5e+0", "6e+0", "7e+0", "8e+0", "9e+0",
          "1e+1", "2e+1", "3e+1", "4e+1", "5e+1", "6e+1", "7e+1", "8e+1", "9e+1",
          "1e+2"
        ]);
        var x = d3.scale.log().domain([0.49999, 0.006029505943610648]);
        assert.deepEqual(x.ticks().map(x.tickFormat()), [
          "7e-3", "8e-3", "9e-3", "1e-2", "2e-2", "3e-2", "4e-2", "5e-2",
          "6e-2", "7e-2", "8e-2", "9e-2", "1e-1", "2e-1", "3e-1", "4e-1"
        ]);
        var x = d3.scale.log().domain([.95, 1.05e8]);
        assert.deepEqual(x.ticks().map(x.tickFormat(8)).filter(String), [
          '1e+0', '1e+1', '1e+2', '1e+3', '1e+4', '1e+5', '1e+6', '1e+7', '1e+8'
        ]);
      },
      "can generate fewer ticks, if desired": function(d3) {
        var x = d3.scale.log();
        assert.deepEqual(x.ticks().map(x.tickFormat(5)), [
          "1e+0", "2e+0", "3e+0", "4e+0", "5e+0", "", "", "", "",
          "1e+1"
        ]);
        var x = d3.scale.log().domain([100, 1]);
        assert.deepEqual(x.ticks().map(x.tickFormat(10)), [
          "1e+0", "2e+0", "3e+0", "4e+0", "5e+0", "", "", "", "",
          "1e+1", "2e+1", "3e+1", "4e+1", "5e+1", "", "", "", "",
          "1e+2"
        ]);
      },
      "generates powers-of-ten ticks, even for huge domains": function(d3) {
        var x = d3.scale.log().domain([1e10, 1]);
        assert.deepEqual(x.ticks().map(x.tickFormat(10)), [
          "1e+0", "", "", "", "", "", "", "", "",
          "1e+1", "", "", "", "", "", "", "", "",
          "1e+2", "", "", "", "", "", "", "", "",
          "1e+3", "", "", "", "", "", "", "", "",
          "1e+4", "", "", "", "", "", "", "", "",
          "1e+5", "", "", "", "", "", "", "", "",
          "1e+6", "", "", "", "", "", "", "", "",
          "1e+7", "", "", "", "", "", "", "", "",
          "1e+8", "", "", "", "", "", "", "", "",
          "1e+9", "", "", "", "", "", "", "", "",
          "1e+10"
        ]);
      },
      "can override the tick format": function(d3) {
        var x = d3.scale.log().domain([1000.1, 1]);
        assert.deepEqual(x.ticks().map(x.tickFormat(10, d3.format("+,d"))), [
          "+1", "+2", "+3", "", "", "", "", "", "",
          "+10", "+20", "+30", "", "", "", "", "", "",
          "+100", "+200", "+300", "", "", "", "", "", "",
          "+1,000"
        ]);
      },
      "can override the tick format as string": function(d3) {
        var x = d3.scale.log().domain([1000.1, 1]);
        assert.deepEqual(x.ticks().map(x.tickFormat(10, ".1s")), [
          "1", "2", "3", "", "", "", "", "", "",
          "10", "20", "30", "", "", "", "", "", "",
          "100", "200", "300", "", "", "", "", "", "",
          "1k"
        ]);
      }
    },

    "base two": {
      topic: function(d3) {
        return d3.scale.log().domain([1, 32]).base(2);
      },
      "with a suitable tick format": {
        topic: function(x, d3) {
          return x.ticks().map(x.tickFormat(10, d3.format("+,d")));
        },
        "generates ticks at powers of two": function(ticks) {
          assert.deepEqual(ticks, [
            "+1", "+2", "+4", "+8", "+16", "+32"
          ]);
        }
      }
    },

    "base e": {
      topic: function(d3) {
        return d3.scale.log().domain([1, 32]).base(Math.E);
      },
      "with a suitable tick format": {
        topic: function(x, d3) {
          return x.ticks().map(x.tickFormat(10, d3.format("+.6r")));
        },
        "generates ticks at powers of e": function(ticks) {
          assert.deepEqual(ticks, [
            "+1.00000", "+2.71828", "+7.38906", "+20.0855"
          ]);
        }
      }
    },

    "nice": {
      "can nice the domain, extending it to powers of ten": function(d3) {
        var x = d3.scale.log().domain([1.1, 10.9]).nice();
        assert.inDelta(x.domain(), [1, 100], 1e-6);
        var x = d3.scale.log().domain([10.9, 1.1]).nice();
        assert.inDelta(x.domain(), [100, 1], 1e-6);
        var x = d3.scale.log().domain([.7, 11.001]).nice();
        assert.inDelta(x.domain(), [.1, 100], 1e-6);
        var x = d3.scale.log().domain([123.1, 6.7]).nice();
        assert.inDelta(x.domain(), [1000, 1], 1e-6);
        var x = d3.scale.log().domain([.01, .49]).nice();
        assert.inDelta(x.domain(), [.01, 1], 1e-6);
      },
      "works on degenerate domains": function(d3) {
        var x = d3.scale.log().domain([0, 0]).nice();
        assert.inDelta(x.domain(), [0, 0], 1e-6);
        var x = d3.scale.log().domain([.5, .5]).nice();
        assert.inDelta(x.domain(), [.1, 1], 1e-6);
      },
      "nicing a polylog domain only affects the extent": function(d3) {
        var x = d3.scale.log().domain([1.1, 1.5, 10.9]).nice();
        assert.inDelta(x.domain(), [1, 1.5, 100], 1e-6);
        var x = d3.scale.log().domain([-123.1, -1.5, -.5]).nice();
        assert.inDelta(x.domain(), [-1000, -1.5, -.1], 1e-6);
      }
    },

    "copy": {
      "changes to the domain are isolated": function(d3) {
        var x = d3.scale.log(), y = x.copy();
        x.domain([10, 100]);
        assert.inDelta(y.domain(), [1, 10], 1e-6);
        assert.inDelta(x(10), 0, 1e-6);
        assert.inDelta(y(1), 0, 1e-6);
        y.domain([100, 1000]);
        assert.inDelta(x(100), 1, 1e-6);
        assert.inDelta(y(100), 0, 1e-6);
        assert.inDelta(x.domain(), [10, 100], 1e-6);
        assert.inDelta(y.domain(), [100, 1000], 1e-6);
      },
      "changes to the range are isolated": function(d3) {
        var x = d3.scale.log(), y = x.copy();
        x.range([1, 2]);
        assert.inDelta(x.invert(1), 1, 1e-6);
        assert.inDelta(y.invert(1), 10, 1e-6);
        assert.deepEqual(y.range(), [0, 1]);
        y.range([2, 3]);
        assert.inDelta(x.invert(2), 10, 1e-6);
        assert.inDelta(y.invert(2), 1, 1e-6);
        assert.deepEqual(x.range(), [1, 2]);
        assert.deepEqual(y.range(), [2, 3]);
      },
      "changes to the interpolator are isolated": function(d3) {
        var x = d3.scale.log().range(["red", "blue"]), y = x.copy();
        x.interpolate(d3.interpolateHsl);
        assert.equal(x(5), "#9a00ff");
        assert.equal(y(5), "#4d00b2");
        assert.equal(y.interpolate(), d3.interpolate);
      },
      "changes to clamping are isolated": function(d3) {
        var x = d3.scale.log().clamp(true), y = x.copy();
        x.clamp(false);
        assert.inDelta(x(.5), -0.30103, 1e-6);
        assert.inDelta(y(.5), 0, 1e-6);
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
