var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.scale.linear");

suite.addBatch({
  "linear": {
    topic: load("scale/linear", "interpolate/hsl"), // beware instanceof d3_Color

    "domain": {
      "defaults to [0, 1]": function(d3) {
        var x = d3.scale.linear();
        assert.deepEqual(x.domain(), [0, 1]);
        assert.inDelta(x(.5), .5, 1e-6);
      },
      "coerces domain values to numbers": function(d3) {
        var x = d3.scale.linear().domain([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
        assert.equal(typeof x.domain()[0], "number");
        assert.equal(typeof x.domain()[1], "number");
        assert.inDelta(x(new Date(1989, 09, 20)), -.2, 1e-2);
        assert.inDelta(x(new Date(1990, 00, 01)), 0, 1e-2);
        assert.inDelta(x(new Date(1990, 02, 15)), .2, 1e-2);
        assert.inDelta(x(new Date(1990, 04, 27)), .4, 1e-2);
        assert.inDelta(x(new Date(1991, 00, 01)), 1, 1e-2);
        assert.inDelta(x(new Date(1991, 02, 15)), 1.2, 1e-2);
        var x = d3.scale.linear().domain(["0", "1"]);
        assert.equal(typeof x.domain()[0], "number");
        assert.equal(typeof x.domain()[1], "number");
        assert.inDelta(x(.5), .5, 1e-6);
        var x = d3.scale.linear().domain([new Number(0), new Number(1)]);
        assert.equal(typeof x.domain()[0], "number");
        assert.equal(typeof x.domain()[1], "number");
        assert.inDelta(x(.5), .5, 1e-6);
      },
      "can specify a polylinear domain and range": function(d3) {
        var x = d3.scale.linear().domain([-10, 0, 100]).range(["red", "white", "green"]);
        assert.equal(x(-5), "#ff8080");
        assert.equal(x(50), "#80c080");
        assert.equal(x(75), "#40a040");
      },
      "the smaller of the domain or range is observed": function(d3) {
        var x = d3.scale.linear().domain([-10, 0]).range(["red", "white", "green"]).clamp(true);
        assert.equal(x(-5), "#ff8080");
        assert.equal(x(50), "#ffffff");
        var x = d3.scale.linear().domain([-10, 0, 100]).range(["red", "white"]).clamp(true);
        assert.equal(x(-5), "#ff8080");
        assert.equal(x(50), "#ffffff");
      },
      "an empty domain maps to the range start": function(d3) {
        var x = d3.scale.linear().domain([0, 0]).range(["red", "green"]);
        assert.equal(x(0), "#ff0000");
        assert.equal(x(-1), "#ff0000");
        assert.equal(x(1), "#ff0000");
      }
    },

    "range": {
      "defaults to [0, 1]": function(d3) {
        var x = d3.scale.linear();
        assert.deepEqual(x.range(), [0, 1]);
        assert.inDelta(x.invert(.5), .5, 1e-6);
      },
      "does not coerce range to numbers": function(d3) {
        var x = d3.scale.linear().range(["0", "2"]);
        assert.equal(typeof x.range()[0], "string");
        assert.equal(typeof x.range()[1], "string");
      },
      "can specify range values as colors": function(d3) {
        var x = d3.scale.linear().range(["red", "blue"]);
        assert.equal(x(.5), "#800080");
        var x = d3.scale.linear().range(["#ff0000", "#0000ff"]);
        assert.equal(x(.5), "#800080");
        var x = d3.scale.linear().range(["#f00", "#00f"]);
        assert.equal(x(.5), "#800080");
        var x = d3.scale.linear().range([d3.rgb(255,0,0), d3.hsl(240,1,.5)]);
        assert.equal(x(.5), "#800080");
        var x = d3.scale.linear().range(["hsl(0,100%,50%)", "hsl(240,100%,50%)"]);
        assert.equal(x(.5), "#800080");
      },
      "can specify range values as arrays or objects": function(d3) {
        var x = d3.scale.linear().range([{color: "red"}, {color: "blue"}]);
        assert.deepEqual(x(.5), {color: "#800080"});
        var x = d3.scale.linear().range([["red"], ["blue"]]);
        assert.deepEqual(x(.5), ["#800080"]);
      }
    },

    "interpolate": {
      "defaults to d3.interpolate": function(d3) {
        var x = d3.scale.linear().range(["red", "blue"]);
        assert.equal(x.interpolate(), d3.interpolate);
        assert.equal(x(.5), "#800080");
      },
      "can specify a custom interpolator": function(d3) {
        var x = d3.scale.linear().range(["red", "blue"]).interpolate(d3.interpolateHsl);
        assert.equal(x(.5), "#ff00ff");
      }
    },

    "clamp": {
      "defaults to false": function(d3) {
        var x = d3.scale.linear();
        assert.isFalse(x.clamp());
        assert.inDelta(x(-.5), -.5, 1e-6);
        assert.inDelta(x(1.5), 1.5, 1e-6);
      },
      "can clamp to the domain": function(d3) {
        var x = d3.scale.linear().clamp(true);
        assert.inDelta(x(-.5), 0, 1e-6);
        assert.inDelta(x(.5), .5, 1e-6);
        assert.inDelta(x(1.5), 1, 1e-6);
        var x = d3.scale.linear().domain([1, 0]).clamp(true);
        assert.inDelta(x(-.5), 1, 1e-6);
        assert.inDelta(x(.5), .5, 1e-6);
        assert.inDelta(x(1.5), 0, 1e-6);
      },
      "can clamp to the range": function(d3) {
        var x = d3.scale.linear().clamp(true);
        assert.inDelta(x.invert(-.5), 0, 1e-6);
        assert.inDelta(x.invert(.5), .5, 1e-6);
        assert.inDelta(x.invert(1.5), 1, 1e-6);
        var x = d3.scale.linear().range([1, 0]).clamp(true);
        assert.inDelta(x.invert(-.5), 1, 1e-6);
        assert.inDelta(x.invert(.5), .5, 1e-6);
        assert.inDelta(x.invert(1.5), 0, 1e-6);
      }
    },

    "maps a number to a number": function(d3) {
      var x = d3.scale.linear().domain([1, 2]);
      assert.inDelta(x(.5), -.5, 1e-6);
      assert.inDelta(x(1), 0, 1e-6);
      assert.inDelta(x(1.5), .5, 1e-6);
      assert.inDelta(x(2), 1, 1e-6);
      assert.inDelta(x(2.5), 1.5, 1e-6);
    },

    "invert": {
      "maps a number to a number": function(d3) {
        var x = d3.scale.linear().range([1, 2]);
        assert.inDelta(x.invert(.5), -.5, 1e-6);
        assert.inDelta(x.invert(1), 0, 1e-6);
        assert.inDelta(x.invert(1.5), .5, 1e-6);
        assert.inDelta(x.invert(2), 1, 1e-6);
        assert.inDelta(x.invert(2.5), 1.5, 1e-6);
      },
      "coerces range value to numbers": function(d3) {
        var x = d3.scale.linear().range(["0", "2"]);
        assert.inDelta(x.invert("1"), .5, 1e-6);
        var x = d3.scale.linear().range([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
        assert.inDelta(x.invert(new Date(1990, 6, 2, 13)), .5, 1e-6);
        var x = d3.scale.linear().range(["#000", "#fff"]);
        assert.isNaN(x.invert("#999"));
      },
      "can invert a polylinear descending domain": function(d3) {
        var x = d3.scale.linear().domain([4, 2, 1]).range([1, 2, 4]);
        assert.inDelta(x(1.5), 3, 1e-6);
        assert.inDelta(x(3), 1.5, 1e-6);
        assert.inDelta(x.invert(1.5), 3, 1e-6);
        assert.inDelta(x.invert(3), 1.5, 1e-6);
      },
      "can invert a polylinear descending range": function(d3) {
        var x = d3.scale.linear().domain([1, 2, 4]).range([4, 2, 1]);
        assert.inDelta(x(1.5), 3, 1e-6);
        assert.inDelta(x(3), 1.5, 1e-6);
        assert.inDelta(x.invert(1.5), 3, 1e-6);
        assert.inDelta(x.invert(3), 1.5, 1e-6);
      }
    },

    "ticks": {
      "generates ticks of varying degree": function(d3) {
        var x = d3.scale.linear();
        assert.deepEqual(x.ticks(1).map(x.tickFormat(1)), [0, 1]);
        assert.deepEqual(x.ticks(2).map(x.tickFormat(2)), [0, .5, 1]);
        assert.deepEqual(x.ticks(5).map(x.tickFormat(5)), [0, .2, .4, .6, .8, 1]);
        assert.deepEqual(x.ticks(10).map(x.tickFormat(10)), [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]);
        var x = d3.scale.linear().domain([1, 0]);
        assert.deepEqual(x.ticks(1).map(x.tickFormat(1)), [0, 1]);
        assert.deepEqual(x.ticks(2).map(x.tickFormat(2)), [0, .5, 1]);
        assert.deepEqual(x.ticks(5).map(x.tickFormat(5)), [0, .2, .4, .6, .8, 1]);
        assert.deepEqual(x.ticks(10).map(x.tickFormat(10)), [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]);
      },
      "formats ticks with the appropriate precision": function(d3) {
        var x = d3.scale.linear().domain([.123456789, 1.23456789]);
        assert.strictEqual(x.tickFormat(1)(x.ticks(1)[0]), "1");
        assert.strictEqual(x.tickFormat(2)(x.ticks(2)[0]), "0.5");
        assert.strictEqual(x.tickFormat(4)(x.ticks(4)[0]), "0.2");
        assert.strictEqual(x.tickFormat(8)(x.ticks(8)[0]), "0.2");
        assert.strictEqual(x.tickFormat(16)(x.ticks(16)[0]), "0.2");
        assert.strictEqual(x.tickFormat(32)(x.ticks(32)[0]), "0.15");
        assert.strictEqual(x.tickFormat(64)(x.ticks(64)[0]), "0.14");
        assert.strictEqual(x.tickFormat(128)(x.ticks(128)[0]), "0.13");
        assert.strictEqual(x.tickFormat(256)(x.ticks(256)[0]), "0.125");
        var x = d3.scale.linear().domain([0.01, 0.09]);
        assert.strictEqual(x.tickFormat(10,"g")(x.ticks(10)[0]), "0.01")
        assert.strictEqual(x.tickFormat(20,"g")(x.ticks(20)[0]), "0.010")
        assert.strictEqual(x.tickFormat(10,"r")(x.ticks(10)[0]), "0.01")
        assert.strictEqual(x.tickFormat(20,"r")(x.ticks(20)[0]), "0.010")
        assert.strictEqual(x.tickFormat(10,"e")(x.ticks(10)[0]), "1e-2")
        assert.strictEqual(x.tickFormat(20,"e")(x.ticks(20)[0]), "1.0e-2")
        assert.strictEqual(x.tickFormat(10,"%")(x.ticks(10)[0]), "1%")
        assert.strictEqual(x.tickFormat(20,"%")(x.ticks(10)[0]), "1.0%")
        assert.strictEqual(x.tickFormat(10,"p")(x.ticks(10)[0]), "1%")
        assert.strictEqual(x.tickFormat(20,"p")(x.ticks(10)[0]), "1.0%")
        var x = d3.scale.linear().domain([1000, 1001]);
        assert.strictEqual(x.tickFormat(3)(x.ticks(3)[1]), "1,000.5");
        assert.strictEqual(x.tickFormat(3,",g")(x.ticks(3)[1]), "1,000.5");
        assert.strictEqual(x.tickFormat(3,"g")(x.ticks(3)[1]), "1000.5");
        assert.strictEqual(x.tickFormat(3,"e")(x.ticks(3)[1]), "1.0005e+3");
        assert.strictEqual(x.tickFormat(3,"s")(x.ticks(3)[1]), "1.0005k");
      }
    },

    "tickFormat": {
      "applies automatic precision when not explicitly specified": function(d3) {
        var x = d3.scale.linear();
        assert.strictEqual(x.tickFormat(10, "f")(Math.PI), "3.1");
        assert.strictEqual(x.tickFormat(100, "f")(Math.PI), "3.14");
        assert.strictEqual(x.tickFormat(100, "$f")(Math.PI), "$3.14");
        assert.strictEqual(x.domain([0, 100]).tickFormat(100, "%")(Math.PI), "314%");
      },
      "applies fixed-scale SI-prefix notation": function(d3) {
        var x = d3.scale.linear().domain([0, 1e6]);
        assert.deepEqual(x.ticks(10).map(x.tickFormat(10, "s")), ["0.0M", "0.1M", "0.2M", "0.3M", "0.4M", "0.5M", "0.6M", "0.7M", "0.8M", "0.9M", "1.0M"]);
        assert.deepEqual(x.ticks(10).map(x.tickFormat(10, ".2s")), ["0.00M", "0.10M", "0.20M", "0.30M", "0.40M", "0.50M", "0.60M", "0.70M", "0.80M", "0.90M", "1.00M"]);
        assert.deepEqual(x.ticks(10).map(x.tickFormat(10, "+$s")), ["+$0.0M", "+$0.1M", "+$0.2M", "+$0.3M", "+$0.4M", "+$0.5M", "+$0.6M", "+$0.7M", "+$0.8M", "+$0.9M", "+$1.0M"]);
        var x = d3.scale.linear().domain([0, 1e5]);
        assert.deepEqual(x.ticks(10).map(x.tickFormat(10, "s")), ["0k", "10k", "20k", "30k", "40k", "50k", "60k", "70k", "80k", "90k", "100k"]);
        var x = d3.scale.linear().domain([0, 1e-4]);
        assert.deepEqual(x.ticks(10).map(x.tickFormat(10, "s")), ["0µ", "10µ", "20µ", "30µ", "40µ", "50µ", "60µ", "70µ", "80µ", "90µ", "100µ"]);
      },
      "if count is not specified, defaults to 10": function(d3) {
        var x = d3.scale.linear();
        assert.strictEqual(x.tickFormat()(Math.PI), "3.1");
        assert.strictEqual(x.tickFormat(1)(Math.PI), "3");
        assert.strictEqual(x.tickFormat(10)(Math.PI), "3.1");
        assert.strictEqual(x.tickFormat(100)(Math.PI), "3.14");
      }
    },

    "nice": {
      "nices the domain, extending it to round numbers": function(d3) {
        var x = d3.scale.linear().domain([1.1, 10.9]).nice();
        assert.deepEqual(x.domain(), [1, 11]);
        var x = d3.scale.linear().domain([10.9, 1.1]).nice();
        assert.deepEqual(x.domain(), [11, 1]);
        var x = d3.scale.linear().domain([.7, 11.001]).nice();
        assert.deepEqual(x.domain(), [0, 12]);
        var x = d3.scale.linear().domain([123.1, 6.7]).nice();
        assert.deepEqual(x.domain(), [130, 0]);
        var x = d3.scale.linear().domain([0, .49]).nice();
        assert.deepEqual(x.domain(), [0, .5]);
      },
      "has no effect on degenerate domains": function(d3) {
        var x = d3.scale.linear().domain([0, 0]).nice();
        assert.deepEqual(x.domain(), [0, 0]);
        var x = d3.scale.linear().domain([.5, .5]).nice();
        assert.deepEqual(x.domain(), [.5, .5]);
      },
      "nicing a polylinear domain only affects the extent": function(d3) {
        var x = d3.scale.linear().domain([1.1, 1, 2, 3, 10.9]).nice();
        assert.deepEqual(x.domain(), [1, 1, 2, 3, 11]);
        var x = d3.scale.linear().domain([123.1, 1, 2, 3, -.9]).nice();
        assert.deepEqual(x.domain(), [130, 1, 2, 3, -10]);
      },
      "accepts a tick count to control nicing step": function(d3) {
        var x = d3.scale.linear().domain([12, 87]).nice(5);
        assert.deepEqual(x.domain(), [0, 100]);
        var x = d3.scale.linear().domain([12, 87]).nice(10);
        assert.deepEqual(x.domain(), [10, 90]);
        var x = d3.scale.linear().domain([12, 87]).nice(100);
        assert.deepEqual(x.domain(), [12, 87]);
      }
    },

    "copy": {
      "changes to the domain are isolated": function(d3) {
        var x = d3.scale.linear(), y = x.copy();
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
      "changes to the range are isolated": function(d3) {
        var x = d3.scale.linear(), y = x.copy();
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
      "changes to the interpolator are isolated": function(d3) {
        var x = d3.scale.linear().range(["red", "blue"]), y = x.copy();
        x.interpolate(d3.interpolateHsl);
        assert.equal(x(0.5), "#ff00ff");
        assert.equal(y(0.5), "#800080");
        assert.equal(y.interpolate(), d3.interpolate);
      },
      "changes to clamping are isolated": function(d3) {
        var x = d3.scale.linear().clamp(true), y = x.copy();
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
