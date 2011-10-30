require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.svg.area.radial");

suite.addBatch({
  "area.radial": {
    topic: function() {
      return d3.svg.area.radial;
    },

    "radius is an alias for setting innerRadius and outerRadius": function(area) {
      var a = area().radius(f);
      function f() {}
      assert.equal(a.radius(), f);
      assert.equal(a.innerRadius(), f);
      assert.equal(a.outerRadius(), f);
    },
    "radius is an alias for getting outerRadius": function(area) {
      var a = area().outerRadius(f);
      function f() {}
      assert.equal(a.radius(), f);
    },

    "angle is an alias for setting startAngle and endAngle": function(area) {
      var a = area().angle(f);
      function f() {}
      assert.equal(a.angle(), f);
      assert.equal(a.startAngle(), f);
      assert.equal(a.endAngle(), f);
    },
    "angle is an alias for getting endAngle": function(area) {
      var a = area().endAngle(f);
      function f() {}
      assert.equal(a.angle(), f);
    },

    "innerRadius defaults to a function accessor": function(area) {
      var a = area();
      assert.pathEqual(a([[10, 0], [20, 1], [20, 2], [10, 3]]), "M0,-10L16.829420,-10.806046L18.185949,8.322937L1.411200,9.899925L0,-10L0,-20L0,-20L0,-10Z");
      assert.typeOf(a.innerRadius(), "function");
    },
    "innerRadius can be defined as a constant": function(area) {
      var a = area().innerRadius(30);
      assert.pathEqual(a([[10, 0], [20, 1], [20, 2], [10, 3]]), "M0,-10L16.829420,-10.806046L18.185949,8.322937L1.411200,9.899925L0,-30L0,-30L0,-30L0,-30Z");
      assert.equal(a.innerRadius(), 30);
    },
    "innerRadius can be defined as a function": function(area) {
      var a = area().innerRadius(f), t = {}, dd = [], ii = [], tt = [];
      function f(d, i) { dd.push(d); ii.push(i); tt.push(this); return 30; }
      assert.pathEqual(a.call(t, [[10, 0], [20, 1], [20, 2], [10, 3]]), "M0,-10L16.829420,-10.806046L18.185949,8.322937L1.411200,9.899925L0,-30L0,-30L0,-30L0,-30Z");
      assert.deepEqual(dd, [[10, 0], [20, 1], [20, 2], [10, 3]], "expected data, got {actual}");
      assert.deepEqual(ii, [0, 1, 2, 3], "expected index, got {actual}");
      assert.deepEqual(tt, [t, t, t, t], "expected this, got {actual}");
    },

    "outerRadius defaults to a function accessor": function(area) {
      var a = area();
      assert.pathEqual(a([[10, 0], [20, 1], [20, 2], [10, 3]]), "M0,-10L16.829420,-10.806046L18.185949,8.322937L1.411200,9.899925L0,-10L0,-20L0,-20L0,-10Z");
      assert.typeOf(a.outerRadius(), "function");
    },
    "outerRadius can be defined as a constant": function(area) {
      var a = area().outerRadius(30);
      assert.pathEqual(a([[10, 0], [20, 1], [20, 2], [10, 3]]), "M0,-30L25.244130,-16.209069L27.278923,12.484405L4.233600,29.699775L0,-10L0,-20L0,-20L0,-10Z");
      assert.equal(a.outerRadius(), 30);
    },
    "outerRadius can be defined as a function": function(area) {
      var a = area().outerRadius(f), t = {}, dd = [], ii = [], tt = [];
      function f(d, i) { dd.push(d); ii.push(i); tt.push(this); return 30; }
      assert.pathEqual(a.call(t, [[10, 0], [20, 1], [20, 2], [10, 3]]), "M0,-30L25.244130,-16.209069L27.278923,12.484405L4.233600,29.699775L0,-10L0,-20L0,-20L0,-10Z");
      assert.deepEqual(dd, [[10, 0], [20, 1], [20, 2], [10, 3]], "expected data, got {actual}");
      assert.deepEqual(ii, [0, 1, 2, 3], "expected index, got {actual}");
      assert.deepEqual(tt, [t, t, t, t], "expected this, got {actual}");
    },

    "startAngle defaults to zero": function(area) {
      var a = area();
      assert.pathEqual(a([[10, 0], [20, 1], [20, 2], [10, 3]]), "M0,-10L16.829420,-10.806046L18.185949,8.322937L1.411200,9.899925L0,-10L0,-20L0,-20L0,-10Z");
      assert.equal(a.startAngle(), 0);
    },
    "startAngle can be defined as a constant": function(area) {
      var a = area().startAngle(Math.PI / 2);
      assert.pathEqual(a([[10, 0], [20, 1], [20, 2], [10, 3]]), "M0,-10L16.829420,-10.806046L18.185949,8.322937L1.411200,9.899925L10,0L20,0L20,0L10,0Z");
      assert.equal(a.startAngle(), Math.PI / 2);
    },
    "startAngle can be defined as a function": function(area) {
      var a = area().startAngle(f), t = {}, dd = [], ii = [], tt = [];
      function f(d, i) { dd.push(d); ii.push(i); tt.push(this); return Math.PI / 2; }
      assert.pathEqual(a.call(t, [[10, 0], [20, 1], [20, 2], [10, 3]]), "M0,-10L16.829420,-10.806046L18.185949,8.322937L1.411200,9.899925L10,0L20,0L20,0L10,0Z");
      assert.deepEqual(dd, [[10, 0], [20, 1], [20, 2], [10, 3]], "expected data, got {actual}");
      assert.deepEqual(ii, [0, 1, 2, 3], "expected index, got {actual}");
      assert.deepEqual(tt, [t, t, t, t], "expected this, got {actual}");
    },

    "endAngle defaults to a function accessor": function(area) {
      var a = area();
      assert.pathEqual(a([[10, 0], [20, 1], [20, 2], [10, 3]]), "M0,-10L16.829420,-10.806046L18.185949,8.322937L1.411200,9.899925L0,-10L0,-20L0,-20L0,-10Z");
      assert.typeOf(a.endAngle(), "function");
    },
    "endAngle can be defined as a constant": function(area) {
      var a = area().endAngle(Math.PI / 2);
      assert.pathEqual(a([[10, 0], [20, 1], [20, 2], [10, 3]]), "M10,0L20,0L20,0L10,0L0,-10L0,-20L0,-20L0,-10Z");
      assert.equal(a.endAngle(), Math.PI / 2);
    },
    "endAngle can be defined as a function": function(area) {
      var a = area().endAngle(f), t = {}, dd = [], ii = [], tt = [];
      function f(d, i) { dd.push(d); ii.push(i); tt.push(this); return Math.PI / 2; }
      assert.pathEqual(a.call(t, [[10, 0], [20, 1], [20, 2], [10, 3]]), "M10,0L20,0L20,0L10,0L0,-10L0,-20L0,-20L0,-10Z");
      assert.deepEqual(dd, [[10, 0], [20, 1], [20, 2], [10, 3]], "expected data, got {actual}");
      assert.deepEqual(ii, [0, 1, 2, 3], "expected index, got {actual}");
      assert.deepEqual(tt, [t, t, t, t], "expected this, got {actual}");
    },

    "if innerRadius === outerRadius, radius is only evaluated once per point": function(area) {
      var a = area().radius(f), t = {}, dd = [], ii = [], tt = [];
      function f(d, i) { dd.push(d); ii.push(i); tt.push(this); return 30; }
      assert.pathEqual(a.call(t, [[10, 0], [20, 1], [20, 2], [10, 3]]), "M0,-30L25.244130,-16.209069L27.278923,12.484405L4.233600,29.699775L0,-30L0,-30L0,-30L0,-30Z");
      assert.deepEqual(dd, [[10, 0], [20, 1], [20, 2], [10, 3]], "expected data, got {actual}");
      assert.deepEqual(ii, [0, 1, 2, 3], "expected index, got {actual}");
      assert.deepEqual(tt, [t, t, t, t], "expected this, got {actual}");
    },
    "if startAngle === endAngle, angle is only evaluated once per point": function(area) {
      var a = area().angle(f), t = {}, dd = [], ii = [], tt = [];
      function f(d, i) { dd.push(d); ii.push(i); tt.push(this); return Math.PI / 2; }
      assert.pathEqual(a.call(t, [[10, 0], [20, 1], [20, 2], [10, 3]]), "M10,0L20,0L20,0L10,0L10,0L20,0L20,0L10,0Z");
      assert.deepEqual(dd, [[10, 0], [20, 1], [20, 2], [10, 3]], "expected data, got {actual}");
      assert.deepEqual(ii, [0, 1, 2, 3], "expected index, got {actual}");
      assert.deepEqual(tt, [t, t, t, t], "expected this, got {actual}");
    },

    "interpolate defaults to linear": function(area) {
      assert.equal(area().interpolate(), "linear");
    },
    "interpolate can be defined as a constant": function(area) {
      var a = area().interpolate("step-before");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M0,0V-0.540302H0.841471L0,-1H0V0Z");
      assert.equal(a.interpolate(), "step-before");
    },

    "tension defaults to .7": function(area) {
      assert.equal(area().tension(), .7);
    },
    "tension can be specified as a constant": function(area) {
      var a = area().tension(.5);
      assert.equal(a.tension(), .5);
    },

    "returns null if input points array is empty": function(area) {
      assert.isNull(area()([]));
    },

    "interpolate(linear)": {
      "supports linear interpolation": testInterpolation("linear")
    },

    "interpolate(step)": {
      "supports step-before interpolation": testInterpolation("step-before"),
      "supports step-after interpolation": testInterpolation("step-after")
    },

    "interpolate(basis)": {
      "supports basis interpolation": testInterpolation("basis"),
      "supports basis-open interpolation": testInterpolation("basis-open")
    },

    "interpolate(cardinal)": {
      "supports cardinal interpolation": testInterpolation("cardinal"),
      "supports cardinal-open interpolation": testInterpolation("cardinal-open")
    },

    "interpolate(monotone)": {
      "supports monotone interpolation": testInterpolation("monotone")
    }
  }
});

// A radial area is just a transformation of a Cartesian line.
function testInterpolation(interpolate) {
  var data = [[10, 0], [20, 1], [20, 2], [10, 3]];

  var radial = d3.svg.area.radial()
      .innerRadius(function(d) { return d[0]; })
      .outerRadius(function(d) { return d[0] * 2; })
      .angle(function(d) { return d[1]; });

  var cartesian = d3.svg.area()
      .x0(function(d) { return d[0] * Math.cos(d[1] - Math.PI / 2); })
      .x1(function(d) { return 2 * d[0] * Math.cos(d[1] - Math.PI / 2); })
      .y0(function(d) { return d[0] * Math.sin(d[1] - Math.PI / 2); })
      .y1(function(d) { return 2 * d[0] * Math.sin(d[1] - Math.PI / 2); });

  return function() {
    assert.pathEqual(radial.interpolate(interpolate)(data), cartesian.interpolate(interpolate)(data));
  };
}

suite.export(module);
