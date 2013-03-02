require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.svg.line.radial");

suite.addBatch({
  "line.radial": {
    topic: function() {
      return d3.svg.line.radial;
    },

    "radius defaults to a function accessor": function(line) {
      var l = line();
      assert.pathEqual(l([[10, 0], [20, 1], [20, 2], [10, 3]]), "M0,-10L16.82941969615793,-10.806046117362794L18.185948536513635,8.32293673094285L1.4112000805986715,9.899924966004454");
      assert.typeOf(l.radius(), "function");
    },
    "radius can be defined as a constant": function(line) {
      var l = line().radius(30);
      assert.pathEqual(l([[10, 0], [20, 1], [20, 2], [10, 3]]), "M0,-30L25.244129544236895,-16.20906917604419L27.278922804770453,12.484405096414275L4.233600241796014,29.699774898013363");
      assert.equal(l.radius(), 30);
    },
    "radius can be defined as a function": function(line) {
      var l = line().radius(f), t = {}, dd = [], ii = [], tt = [];
      function f(d, i) { dd.push(d); ii.push(i); tt.push(this); return 30; }
      assert.pathEqual(l.call(t, [[10, 0], [20, 1], [20, 2], [10, 3]]), "M0,-30L25.244129544236895,-16.20906917604419L27.278922804770453,12.484405096414275L4.233600241796014,29.699774898013363");
      assert.deepEqual(dd, [[10, 0], [20, 1], [20, 2], [10, 3]], "expected data, got {actual}");
      assert.deepEqual(ii, [0, 1, 2, 3], "expected index, got {actual}");
      assert.deepEqual(tt, [t, t, t, t], "expected this, got {actual}");
    },

    "angle defaults to a function accessor": function(line) {
      var l = line();
      assert.pathEqual(l([[10, 0], [20, 1], [20, 2], [10, 3]]), "M0,-10L16.82941969615793,-10.806046117362794L18.185948536513635,8.32293673094285L1.4112000805986715,9.899924966004454");
      assert.typeOf(l.angle(), "function");
    },
    "angle can be defined as a constant": function(line) {
      var l = line().angle(Math.PI / 2);
      assert.pathEqual(l([[10, 0], [20, 1], [20, 2], [10, 3]]), "M10,0L20,0L20,0L10,0");
      assert.equal(l.angle(), Math.PI / 2);
    },
    "angle can be defined as a function": function(line) {
      var l = line().angle(f), t = {}, dd = [], ii = [], tt = [];
      function f(d, i) { dd.push(d); ii.push(i); tt.push(this); return Math.PI / 2; }
      assert.pathEqual(l.call(t, [[10, 0], [20, 1], [20, 2], [10, 3]]), "M10,0L20,0L20,0L10,0");
      assert.deepEqual(dd, [[10, 0], [20, 1], [20, 2], [10, 3]], "expected data, got {actual}");
      assert.deepEqual(ii, [0, 1, 2, 3], "expected index, got {actual}");
      assert.deepEqual(tt, [t, t, t, t], "expected this, got {actual}");
    },
    "angle is defined in radians, with zero at 12 o'clock": function(line) {
      var l = line().angle(0);
      assert.pathEqual(l([[10, Math.PI], [20, Math.PI / 3]]), "M0,-10L0,-20");
      assert.equal(l.angle(), 0);
    },

    "interpolate defaults to linear": function(line) {
      assert.equal(line().interpolate(), "linear");
    },
    "interpolate can be defined as a constant": function(line) {
      var l = line().interpolate("cardinal");
      assert.pathEqual(l([[10, 0], [20, 1], [20, 2], [10, 3]]), "M0,-10Q15.010824842506567,-12.638339790457078,16.82941969615793,-10.806046117362794C19.557311976634978,-8.057605607721365,20.498681478847523,5.217041068437762,18.185948536513635,8.32293673094285Q16.64412657495771,10.393533839279574,1.4112000805986715,9.899924966004454");
      assert.equal(l.interpolate(), "cardinal");
    },

    "tension defaults to .7": function(line) {
      assert.equal(line().tension(), .7);
    },
    "tension can be specified as a constant": function(line) {
      var l = line().tension(.5);
      assert.equal(l.tension(), .5);
    },

    "returns null if input points array is empty": function(line) {
      assert.isNull(line()([]));
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
      "supports basis-open interpolation": testInterpolation("basis-open"),
      "supports basis-closed interpolation": testInterpolation("basis-closed")
    },

    "interpolate(bundle)": {
      "supports bundle interpolation": testInterpolation("bundle")
    },

    "interpolate(cardinal)": {
      "supports cardinal interpolation": testInterpolation("cardinal"),
      "supports cardinal-open interpolation": testInterpolation("cardinal-open"),
      "supports cardinal-closed interpolation": testInterpolation("cardinal-closed")
    },

    "interpolate(monotone)": {
      "supports monotone interpolation": testInterpolation("monotone")
    }
  }
});

// A radial line is just a transformation of a Cartesian line.
function testInterpolation(interpolate) {
  var data = [[10, 0], [20, 1], [20, 2], [10, 3]];

  var radial = d3.svg.line.radial();

  var cartesian = d3.svg.line()
      .x(function(d) { return d[0] * Math.cos(d[1] - Math.PI / 2); })
      .y(function(d) { return d[0] * Math.sin(d[1] - Math.PI / 2); });

  return function() {
    assert.pathEqual(radial.interpolate(interpolate)(data), cartesian.interpolate(interpolate)(data));
  };
}

suite.export(module);
