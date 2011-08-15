require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.scale.linear");

suite.addBatch({
  "linear": {
    topic: function() {
      return d3.scale.linear;
    },
    "has the default domain [0, 1]": function(linear) {
      var x = linear();
      assert.deepEqual(x.domain(), [0, 1]);
      assert.inDelta(x(.5), .5, 1e-6);
    },
    "has the default range [0, 1]": function(linear) {
      var x = linear();
      assert.deepEqual(x.range(), [0, 1]);
      assert.inDelta(x.invert(.5), .5, 1e-6);
    },
    "has the default interpolator d3.interpolate": function(linear) {
      var x = linear().range(["red", "blue"]);
      assert.equal(x.interpolate(), d3.interpolate);
      assert.equal(x(.5), "rgb(128,0,128)");
    },
    "does not clamp by default": function(linear) {
      var x = linear();
      assert.isFalse(x.clamp());
      assert.inDelta(x(-.5), -.5, 1e-6);
      assert.inDelta(x(1.5), 1.5, 1e-6);
    },
    "maps a number to a number": function(linear) {
      var x = linear().domain([1, 2]);
      assert.inDelta(x(.5), -.5, 1e-6);
      assert.inDelta(x(1), 0, 1e-6);
      assert.inDelta(x(1.5), .5, 1e-6);
      assert.inDelta(x(2), 1, 1e-6);
      assert.inDelta(x(2.5), 1.5, 1e-6);
    },
    "coerces domain to numbers": function(linear) {
      var x = linear().domain([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
      assert.equal(typeof x.domain()[0], "number");
      assert.equal(typeof x.domain()[1], "number");
      assert.inDelta(x(new Date(1989, 09, 20)), -.2, 1e-2);
      assert.inDelta(x(new Date(1990, 00, 01)), 0, 1e-2);
      assert.inDelta(x(new Date(1990, 02, 15)), .2, 1e-2);
      assert.inDelta(x(new Date(1990, 04, 27)), .4, 1e-2);
      assert.inDelta(x(new Date(1991, 00, 01)), 1, 1e-2);
      assert.inDelta(x(new Date(1991, 02, 15)), 1.2, 1e-2);
      var x = linear().domain(["0", "1"]);
      assert.equal(typeof x.domain()[0], "number");
      assert.equal(typeof x.domain()[1], "number");
      assert.inDelta(x(.5), .5, 1e-6);
      var x = linear().domain([new Number(0), new Number(1)]);
      assert.equal(typeof x.domain()[0], "number");
      assert.equal(typeof x.domain()[1], "number");
      assert.inDelta(x(.5), .5, 1e-6);
    },
    "does not coerce range to numbers": function(linear) {
      var x = linear().range(["0", "2"]);
      assert.equal(typeof x.range()[0], "string");
      assert.equal(typeof x.range()[1], "string");
    },
    "coerces range value to number on invert": function(linear) {
      var x = linear().range(["0", "2"]);
      assert.inDelta(x.invert("1"), .5, 1e-6);
      var x = linear().range([new Date(1990, 0, 1), new Date(1991, 0, 1)]);
      assert.inDelta(x.invert(new Date(1990, 6, 2, 13)), .5, 1e-6);
      var x = linear().range(["#000", "#fff"]);
      assert.isNaN(x.invert("#999"));
    },
    "can specify range values as colors": function(linear) {
      var x = linear().range(["red", "blue"]);
      assert.equal(x(.5), "rgb(128,0,128)");
      var x = linear().range(["#ff0000", "#0000ff"]);
      assert.equal(x(.5), "rgb(128,0,128)");
      var x = linear().range(["#f00", "#00f"]);
      assert.equal(x(.5), "rgb(128,0,128)");
      var x = linear().range([d3.rgb(255,0,0), d3.hsl(240,1,.5)]);
      assert.equal(x(.5), "rgb(128,0,128)");
      var x = linear().range(["hsl(0,100%,50%)", "hsl(240,100%,50%)"]);
      assert.equal(x(.5), "rgb(128,0,128)");
    },
    "can specify range values as arrays or objects": function(linear) {
      var x = linear().range([{color: "red"}, {color: "blue"}]);
      assert.deepEqual(x(.5), {color: "rgb(128,0,128)"});
      var x = linear().range([["red"], ["blue"]]);
      assert.deepEqual(x(.5), ["rgb(128,0,128)"]);
    },
    "can specify a custom interpolator": function(linear) {
      var x = linear().range(["red", "blue"]).interpolate(d3.interpolateHsl);
      assert.equal(x(.5), "#00ff00");
    },
    "can clamp to the domain": function(linear) {
      var x = linear().clamp(true);
      assert.inDelta(x(-.5), 0, 1e-6);
      assert.inDelta(x(.5), .5, 1e-6);
      assert.inDelta(x(1.5), 1, 1e-6);
      var x = linear().domain([1, 0]).clamp(true);
      assert.inDelta(x(-.5), 1, 1e-6);
      assert.inDelta(x(.5), .5, 1e-6);
      assert.inDelta(x(1.5), 0, 1e-6);
    },
    "can generate ticks of varying degree": function(linear) {
      var x = linear();
      assert.deepEqual(x.ticks(1).map(x.tickFormat(1)), [0, 1]);
      assert.deepEqual(x.ticks(2).map(x.tickFormat(2)), [0, .5, 1]);
      assert.deepEqual(x.ticks(5).map(x.tickFormat(5)), [0, .2, .4, .6, .8, 1]);
      assert.deepEqual(x.ticks(10).map(x.tickFormat(10)), [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]);
      var x = linear().domain([1, 0]);
      assert.deepEqual(x.ticks(1).map(x.tickFormat(1)), [0, 1]);
      assert.deepEqual(x.ticks(2).map(x.tickFormat(2)), [0, .5, 1]);
      assert.deepEqual(x.ticks(5).map(x.tickFormat(5)), [0, .2, .4, .6, .8, 1]);
      assert.deepEqual(x.ticks(10).map(x.tickFormat(10)), [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]);
    },
    "can nice the domain, extending it to round numbers": function(linear) {
      var x = linear().domain([1.1, 10.9]).nice();
      assert.deepEqual(x.domain(), [1, 11]);
      var x = linear().domain([10.9, 1.1]).nice();
      assert.deepEqual(x.domain(), [11, 1]);
      var x = linear().domain([.7, 11.001]).nice();
      assert.deepEqual(x.domain(), [0, 12]);
      var x = linear().domain([123.1, 6.7]).nice();
      assert.deepEqual(x.domain(), [130, 0]);
      var x = linear().domain([0, .49]).nice();
      assert.deepEqual(x.domain(), [0, .5]);
    },
    "can specify a polylinear domain and range": function(linear) {
      var x = linear().domain([-10, 0, 100]).range(["red", "white", "green"]);
      assert.equal(x(-5), "rgb(255,128,128)");
      assert.equal(x(50), "rgb(128,192,128)");
      assert.equal(x(75), "rgb(64,160,64)");
    },
    "nicing a polylinear domain only affects the extent": function(linear) {
      var x = linear().domain([1.1, 1, 2, 3, 10.9]).nice();
      assert.deepEqual(x.domain(), [1, 1, 2, 3, 11]);
      var x = linear().domain([123.1, 1, 2, 3, -.9]).nice();
      assert.deepEqual(x.domain(), [130, 1, 2, 3, -10]);
    }
  }
});

suite.export(module);
