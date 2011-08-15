require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.scale.pow");

suite.addBatch({
  "pow": {
    topic: function() {
      return d3.scale.pow;
    },
    "has the default domain [0, 1]": function(pow) {
      var x = pow();
      assert.deepEqual(x.domain(), [0, 1]);
      assert.inDelta(x(.5), .5, 1e-6);
    },
    "has the default range [0, 1]": function(pow) {
      var x = pow();
      assert.deepEqual(x.range(), [0, 1]);
      assert.inDelta(x.invert(.5), .5, 1e-6);
    },
    "has the default exponent 1": function(pow) {
      var x = pow();
      assert.equal(x.exponent(), 1);
    },
    "has the default interpolator d3.interpolate": function(pow) {
      var x = pow().range(["red", "blue"]);
      assert.equal(x.interpolate(), d3.interpolate);
      assert.equal(x(.5), "rgb(128,0,128)");
    },
    "does not clamp by default": function(pow) {
      var x = pow();
      assert.isFalse(x.clamp());
      assert.inDelta(x(-.5), -.5, 1e-6);
      assert.inDelta(x(1.5), 1.5, 1e-6);
    },
    "maps a number to a number": function(pow) {
      var x = pow().domain([1, 2]);
      assert.inDelta(x(.5), -.5, 1e-6);
      assert.inDelta(x(1), 0, 1e-6);
      assert.inDelta(x(1.5), .5, 1e-6);
      assert.inDelta(x(2), 1, 1e-6);
      assert.inDelta(x(2.5), 1.5, 1e-6);
    },
    "observes the specified exponent": function(pow) {
      var x = pow().exponent(.5).domain([1, 2]);
      assert.inDelta(x(1), 0, 1e-6);
      assert.inDelta(x(1.5), 0.5425821, 1e-6);
      assert.inDelta(x(2), 1, 1e-6);
      var x = pow().exponent(2).domain([1, 2]);
      assert.inDelta(x(1), 0, 1e-6);
      assert.inDelta(x(1.5), .41666667, 1e-6);
      assert.inDelta(x(2), 1, 1e-6);
      var x = pow().exponent(-1).domain([1, 2]);
      assert.inDelta(x(1), 0, 1e-6);
      assert.inDelta(x(1.5), .6666667, 1e-6);
      assert.inDelta(x(2), 1, 1e-6);
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
    "does not coerce range to numbers": function(pow) {
      var x = pow().range(["0", "2"]);
      assert.equal(typeof x.range()[0], "string");
      assert.equal(typeof x.range()[1], "string");
    },
    "coerces range value to number on invert": function(pow) {
      var x = pow().range(["0", "2"]);
      assert.inDelta(x.invert("1"), .5, 1e-6);
      var x = pow().range([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
      assert.inDelta(x.invert(new Date(1990, 6, 2, 13)), .5, 1e-6);
      var x = pow().range(["#000", "#fff"]);
      assert.isNaN(x.invert("#999"));
    },
    "can specify range values as colors": function(pow) {
      var x = pow().range(["red", "blue"]);
      assert.equal(x(.5), "rgb(128,0,128)");
      var x = pow().range(["#ff0000", "#0000ff"]);
      assert.equal(x(.5), "rgb(128,0,128)");
      var x = pow().range(["#f00", "#00f"]);
      assert.equal(x(.5), "rgb(128,0,128)");
      var x = pow().range([d3.rgb(255,0,0), d3.hsl(240,1,.5)]);
      assert.equal(x(.5), "rgb(128,0,128)");
      var x = pow().range(["hsl(0,100%,50%)", "hsl(240,100%,50%)"]);
      assert.equal(x(.5), "rgb(128,0,128)");
    },
    "can specify range values as arrays or objects": function(pow) {
      var x = pow().range([{color: "red"}, {color: "blue"}]);
      assert.deepEqual(x(.5), {color: "rgb(128,0,128)"});
      var x = pow().range([["red"], ["blue"]]);
      assert.deepEqual(x(.5), ["rgb(128,0,128)"]);
    },
    "can specify a custom interpolator": function(pow) {
      var x = pow().range(["red", "blue"]).interpolate(d3.interpolateHsl);
      assert.equal(x(.5), "#00ff00");
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
    },
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
    },
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
    },
    "can specify a polypower domain and range": function(pow) {
      var x = pow().domain([-10, 0, 100]).range(["red", "white", "green"]);
      assert.equal(x(-5), "rgb(255,128,128)");
      assert.equal(x(50), "rgb(128,192,128)");
      assert.equal(x(75), "rgb(64,160,64)");
    },
    "nicing a polypower domain only affects the extent": function(pow) {
      var x = pow().domain([1.1, 1, 2, 3, 10.9]).nice();
      assert.deepEqual(x.domain(), [1, 1, 2, 3, 11]);
      var x = pow().domain([123.1, 1, 2, 3, -.9]).nice();
      assert.deepEqual(x.domain(), [130, 1, 2, 3, -10]);
    }
  },
  "sqrt": {
    topic: function() {
      return d3.scale.sqrt;
    },
    "has the default domain [0, 1]": function(sqrt) {
      var x = sqrt();
      assert.deepEqual(x.domain(), [0, 1]);
      assert.inDelta(x(.5), 0.7071068, 1e-6);
    },
    "has the default range [0, 1]": function(sqrt) {
      var x = sqrt();
      assert.deepEqual(x.range(), [0, 1]);
      assert.inDelta(x.invert(.5), .25, 1e-6);
    },
    "has the default exponent .5": function(sqrt) {
      var x = sqrt();
      assert.equal(x.exponent(), .5);
    },
    "has the default interpolator d3.interpolate": function(sqrt) {
      var x = sqrt().range(["red", "blue"]);
      assert.equal(x.interpolate(), d3.interpolate);
      assert.equal(x(.5), "rgb(75,0,180)");
    },
    "does not clamp by default": function(sqrt) {
      var x = sqrt();
      assert.isFalse(x.clamp());
      assert.inDelta(x(-.5), -0.7071068, 1e-6);
      assert.inDelta(x(1.5), 1.22474487, 1e-6);
    },
    "maps a number to a number": function(sqrt) {
      var x = sqrt().domain([1, 2]);
      assert.inDelta(x(.5), -0.7071068, 1e-6);
      assert.inDelta(x(1), 0, 1e-6);
      assert.inDelta(x(1.5), 0.5425821, 1e-6);
      assert.inDelta(x(2), 1, 1e-6);
      assert.inDelta(x(2.5), 1.4029932, 1e-6);
    },
    "observes the specified exponent": function(sqrt) {
      var x = sqrt().exponent(.5).domain([1, 2]);
      assert.inDelta(x(1), 0, 1e-6);
      assert.inDelta(x(1.5), 0.5425821, 1e-6);
      assert.inDelta(x(2), 1, 1e-6);
      var x = sqrt().exponent(2).domain([1, 2]);
      assert.inDelta(x(1), 0, 1e-6);
      assert.inDelta(x(1.5), .41666667, 1e-6);
      assert.inDelta(x(2), 1, 1e-6);
      var x = sqrt().exponent(-1).domain([1, 2]);
      assert.inDelta(x(1), 0, 1e-6);
      assert.inDelta(x(1.5), .6666667, 1e-6);
      assert.inDelta(x(2), 1, 1e-6);
    },
    "changing the exponent does not change the domain or range": function(sqrt) {
      var x = sqrt().domain([1, 2]).range([3, 4]), f = d3.format(".6f");
      x.exponent(.5);
      assert.deepEqual(x.domain().map(f), [1, 2]);
      assert.deepEqual(x.range(), [3, 4]);
      x.exponent(2);
      assert.deepEqual(x.domain().map(f), [1, 2]);
      assert.deepEqual(x.range(), [3, 4]);
      x.exponent(-1);
      assert.deepEqual(x.domain().map(f), [1, 2]);
      assert.deepEqual(x.range(), [3, 4]);
    },
    "coerces domain to numbers": function(sqrt) {
      var x = sqrt().domain([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
      assert.equal(typeof x.domain()[0], "number");
      assert.equal(typeof x.domain()[1], "number");
      assert.inDelta(x(new Date(1989, 09, 20)), -.2, 1e-2);
      assert.inDelta(x(new Date(1990, 00, 01)), 0, 1e-2);
      assert.inDelta(x(new Date(1990, 02, 15)), .2, 1e-2);
      assert.inDelta(x(new Date(1990, 04, 27)), .4, 1e-2);
      assert.inDelta(x(new Date(1991, 00, 01)), 1, 1e-2);
      assert.inDelta(x(new Date(1991, 02, 15)), 1.2, 1e-2);
      var x = sqrt().domain(["0", "1"]);
      assert.equal(typeof x.domain()[0], "number");
      assert.equal(typeof x.domain()[1], "number");
      assert.inDelta(x(.5), 0.7071068, 1e-6);
      var x = sqrt().domain([new Number(0), new Number(1)]);
      assert.equal(typeof x.domain()[0], "number");
      assert.equal(typeof x.domain()[1], "number");
      assert.inDelta(x(.5), 0.7071068, 1e-6);
    },
    "does not coerce range to numbers": function(sqrt) {
      var x = sqrt().range(["0", "2"]);
      assert.equal(typeof x.range()[0], "string");
      assert.equal(typeof x.range()[1], "string");
    },
    "coerces range value to number on invert": function(sqrt) {
      var x = sqrt().range(["0", "2"]);
      assert.inDelta(x.invert("1"), .25, 1e-6);
      var x = sqrt().range([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
      assert.inDelta(x.invert(new Date(1990, 6, 2, 13)), .25, 1e-6);
      var x = sqrt().range(["#000", "#fff"]);
      assert.isNaN(x.invert("#999"));
    },
    "can specify range values as colors": function(sqrt) {
      var x = sqrt().range(["red", "blue"]);
      assert.equal(x(.25), "rgb(128,0,128)");
      var x = sqrt().range(["#ff0000", "#0000ff"]);
      assert.equal(x(.25), "rgb(128,0,128)");
      var x = sqrt().range(["#f00", "#00f"]);
      assert.equal(x(.25), "rgb(128,0,128)");
      var x = sqrt().range([d3.rgb(255,0,0), d3.hsl(240,1,.5)]);
      assert.equal(x(.25), "rgb(128,0,128)");
      var x = sqrt().range(["hsl(0,100%,50%)", "hsl(240,100%,50%)"]);
      assert.equal(x(.25), "rgb(128,0,128)");
    },
    "can specify range values as arrays or objects": function(sqrt) {
      var x = sqrt().range([{color: "red"}, {color: "blue"}]);
      assert.deepEqual(x(.25), {color: "rgb(128,0,128)"});
      var x = sqrt().range([["red"], ["blue"]]);
      assert.deepEqual(x(.25), ["rgb(128,0,128)"]);
    },
    "can specify a custom interpolator": function(sqrt) {
      var x = sqrt().range(["red", "blue"]).interpolate(d3.interpolateHsl);
      assert.equal(x(.25), "#00ff00");
    },
    "can clamp to the domain": function(sqrt) {
      var x = sqrt().clamp(true);
      assert.inDelta(x(-.5), 0, 1e-6);
      assert.inDelta(x(.25), .5, 1e-6);
      assert.inDelta(x(1.5), 1, 1e-6);
      var x = sqrt().domain([1, 0]).clamp(true);
      assert.inDelta(x(-.5), 1, 1e-6);
      assert.inDelta(x(.25), .5, 1e-6);
      assert.inDelta(x(1.5), 0, 1e-6);
    },
    "can generate ticks of varying degree": function(sqrt) {
      var x = sqrt();
      assert.deepEqual(x.ticks(1).map(x.tickFormat(1)), [0, 1]);
      assert.deepEqual(x.ticks(2).map(x.tickFormat(2)), [0, .5, 1]);
      assert.deepEqual(x.ticks(5).map(x.tickFormat(5)), [0, .2, .4, .6, .8, 1]);
      assert.deepEqual(x.ticks(10).map(x.tickFormat(10)), [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]);
      var x = sqrt().domain([1, 0]);
      assert.deepEqual(x.ticks(1).map(x.tickFormat(1)), [0, 1]);
      assert.deepEqual(x.ticks(2).map(x.tickFormat(2)), [0, .5, 1]);
      assert.deepEqual(x.ticks(5).map(x.tickFormat(5)), [0, .2, .4, .6, .8, 1]);
      assert.deepEqual(x.ticks(10).map(x.tickFormat(10)), [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]);
    },
    "can nice the domain, extending it to round numbers": function(sqrt) {
      var x = sqrt().domain([1.1, 10.9]).nice(), f = d3.format(".6f");
      assert.deepEqual(x.domain().map(f), [1, 11]);
      var x = sqrt().domain([10.9, 1.1]).nice();
      assert.deepEqual(x.domain().map(f), [11, 1]);
      var x = sqrt().domain([.7, 11.001]).nice();
      assert.deepEqual(x.domain().map(f), [0, 12]);
      var x = sqrt().domain([123.1, 6.7]).nice();
      assert.deepEqual(x.domain().map(f), [130, 0]);
      var x = sqrt().domain([0, .49]).nice();
      assert.deepEqual(x.domain().map(f), [0, .5]);
    },
    "can specify a polypower domain and range": function(sqrt) {
      var x = sqrt().domain([-10, 0, 100]).range(["red", "white", "green"]);
      assert.equal(x(-5), "rgb(255,75,75)");
      assert.equal(x(50), "rgb(75,165,75)");
      assert.equal(x(75), "rgb(34,145,34)");
    },
    "nicing a polypower domain only affects the extent": function(sqrt) {
      var x = sqrt().domain([1.1, 1, 2, 3, 10.9]).nice(), f = d3.format(".6f");
      assert.deepEqual(x.domain().map(f), [1, 1, 2, 3, 11]);
      var x = sqrt().domain([123.1, 1, 2, 3, -.9]).nice();
      assert.deepEqual(x.domain().map(f), [130, 1, 2, 3, "−10.000000"]);
    }
  }
});

suite.export(module);
