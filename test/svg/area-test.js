require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.svg.area");

suite.addBatch({
  "area": {
    topic: function() {
      return d3.svg.area;
    },

    "x is an alias for setting x0 and x1": function(area) {
      var a = area().x(f);
      function f() {}
      assert.equal(a.x(), f);
      assert.equal(a.x0(), f);
      assert.equal(a.x1(), f);
    },
    "x is an alias for getting x1": function(area) {
      var a = area().x1(f);
      function f() {}
      assert.equal(a.x(), f);
    },

    "y is an alias for setting y0 and y1": function(area) {
      var a = area().y(f);
      function f() {}
      assert.equal(a.y(), f);
      assert.equal(a.y0(), f);
      assert.equal(a.y1(), f);
    },
    "y is an alias for getting x1": function(area) {
      var a = area().y1(f);
      function f() {}
      assert.equal(a.y(), f);
    },

    "x0 defaults to a function accessor": function(area) {
      var a = area();
      assert.pathEqual(a([[1, 2], [4, 3]]), "M1,2L4,3L4,0L1,0Z");
      assert.typeOf(a.x0(), "function");
    },
    "x0 can be defined as a constant": function(area) {
      var a = area().x0(0);
      assert.pathEqual(a([[1, 2], [4, 3]]), "M1,2L4,3L0,0L0,0Z");
      assert.equal(a.x0(), 0);
    },
    "x0 can be defined as a function": function(area) {
      var a = area().x0(f), t = {}, dd = [], ii = [], tt = [];
      function f(d, i) { dd.push(d); ii.push(i); tt.push(this); return 0; }
      assert.pathEqual(a.call(t, [[1, 2], [4, 3]]), "M1,2L4,3L0,0L0,0Z");
      assert.deepEqual(dd, [[1, 2], [4, 3]], "expected data, got {actual}");
      assert.deepEqual(ii, [0, 1], "expected index, got {actual}");
      assert.deepEqual(tt, [t, t], "expected this, got {actual}");
    },

    "x1 defaults to a function accessor": function(area) {
      var a = area();
      assert.pathEqual(a([[1, 2], [4, 3]]), "M1,2L4,3L4,0L1,0Z");
      assert.typeOf(a.x1(), "function");
    },
    "x1 can be defined as a constant": function(area) {
      var a = area().x1(0);
      assert.pathEqual(a([[1, 2], [4, 3]]), "M0,2L0,3L4,0L1,0Z");
      assert.equal(a.x1(), 0);
    },
    "x1 can be defined as a function": function(area) {
      var a = area().x1(f), t = {}, dd = [], ii = [], tt = [];
      function f(d, i) { dd.push(d); ii.push(i); tt.push(this); return 0; }
      assert.pathEqual(a.call(t, [[1, 2], [4, 3]]), "M0,2L0,3L4,0L1,0Z");
      assert.deepEqual(dd, [[1, 2], [4, 3]], "expected data, got {actual}");
      assert.deepEqual(ii, [0, 1], "expected index, got {actual}");
      assert.deepEqual(tt, [t, t], "expected this, got {actual}");
    },

    "y0 defaults to zero": function(area) {
      var a = area();
      assert.pathEqual(a([[1, 2], [4, 3]]), "M1,2L4,3L4,0L1,0Z");
      assert.equal(a.y0(), 0);
    },
    "y0 can be defined as a constant": function(area) {
      var a = area().y0(1);
      assert.pathEqual(a([[1, 2], [4, 3]]), "M1,2L4,3L4,1L1,1Z");
      assert.equal(a.y0(), 1);
    },
    "y0 can be defined as a function": function(area) {
      var a = area().y0(f), t = {}, dd = [], ii = [], tt = [];
      function f(d, i) { dd.push(d); ii.push(i); tt.push(this); return 1; }
      assert.pathEqual(a.call(t, [[1, 2], [4, 3]]), "M1,2L4,3L4,1L1,1Z");
      assert.deepEqual(dd, [[1, 2], [4, 3]], "expected data, got {actual}");
      assert.deepEqual(ii, [0, 1], "expected index, got {actual}");
      assert.deepEqual(tt, [t, t], "expected this, got {actual}");
    },

    "y1 defaults to a function accessor": function(area) {
      var a = area();
      assert.pathEqual(a([[1, 2], [4, 3]]), "M1,2L4,3L4,0L1,0Z");
      assert.typeOf(a.y1(), "function");
    },
    "y1 can be defined as a constant": function(area) {
      var a = area().y1(1);
      assert.pathEqual(a([[1, 2], [4, 3]]), "M1,1L4,1L4,0L1,0Z");
      assert.equal(a.y1(), 1);
    },
    "y1 can be defined as a function": function(area) {
      var a = area().y1(f), t = {}, dd = [], ii = [], tt = [];
      function f(d, i) { dd.push(d); ii.push(i); tt.push(this); return 1; }
      assert.pathEqual(a.call(t, [[1, 2], [4, 3]]), "M1,1L4,1L4,0L1,0Z");
      assert.deepEqual(dd, [[1, 2], [4, 3]], "expected data, got {actual}");
      assert.deepEqual(ii, [0, 1], "expected index, got {actual}");
      assert.deepEqual(tt, [t, t], "expected this, got {actual}");
    },

    "if x0 === x1, x is only evaluated once per point": function(area) {
      var a = area().x(f), t = {}, dd = [], ii = [], tt = [];
      function f(d, i) { dd.push(d); ii.push(i); tt.push(this); return 0; }
      assert.pathEqual(a.call(t, [[1, 2], [4, 3]]), "M0,2L0,3L0,0L0,0Z");
      assert.deepEqual(dd, [[1, 2], [4, 3]], "expected data, got {actual}");
      assert.deepEqual(ii, [0, 1], "expected index, got {actual}");
      assert.deepEqual(tt, [t, t], "expected this, got {actual}");
    },
    "if y0 === y1, y is only evaluated once per point": function(area) {
      var a = area().y(f), t = {}, dd = [], ii = [], tt = [];
      function f(d, i) { dd.push(d); ii.push(i); tt.push(this); return 1; }
      assert.pathEqual(a.call(t, [[1, 2], [4, 3]]), "M1,1L4,1L4,1L1,1Z");
      assert.deepEqual(dd, [[1, 2], [4, 3]], "expected data, got {actual}");
      assert.deepEqual(ii, [0, 1], "expected index, got {actual}");
      assert.deepEqual(tt, [t, t], "expected this, got {actual}");
    },

    "interpolate defaults to linear": function(area) {
      assert.equal(area().interpolate(), "linear");
    },
    "interpolate can be defined as a constant": function(area) {
      var a = area().interpolate("step-before");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M0,0V1H1L1,0H0V0Z");
      assert.equal(a.interpolate(), "step-before");
    },
    "invalid interpolates fallback to linear": function(area) {
      assert.equal(area().interpolate("__proto__").interpolate(), "linear");
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
      "supports step-before interpolation": testInterpolation("step-before", "step-after"),
      "supports step-after interpolation": testInterpolation("step-after", "step-before")
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

// An area is just two lines, with one reversed.
function testInterpolation(i0, i1) {
  if (arguments.length < 2) i1 = i0;
  return function(area) {
    var a = area().interpolate(i0),
        d = [[0, 0], [1, 1], [2, 0], [3, 1], [4, 0]],
        l0 = d3.svg.line().interpolate(i1).x(a.x0()).y(a.y0()),
        l1 = d3.svg.line().interpolate(i0).x(a.x1()).y(a.y1());
    assert.pathEqual(a(d), l1(d) + "L" + l0(d.reverse()).substring(1) + "Z");
  };
}

suite.export(module);
