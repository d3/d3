require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("d3.svg.arc");

suite.addBatch({
  "arc": {
    topic: function() {
      return d3.svg.arc;
    },

    "innerRadius defaults to a function accessor": function(arc) {
      var a = arc().outerRadius(100).startAngle(0).endAngle(Math.PI);
      assert.pathEqual(a({innerRadius: 0}), "M0,-100A100,100 0 1,1 0,100L0,0Z");
      assert.pathEqual(a({innerRadius: 50}), "M0,-100A100,100 0 1,1 0,100L0,50A50,50 0 1,0 0,-50Z");
    },
    "innerRadius can be defined as a constant": function(arc) {
      var a = arc().outerRadius(100).startAngle(0).endAngle(Math.PI);
      assert.pathEqual(a.innerRadius(0)(), "M0,-100A100,100 0 1,1 0,100L0,0Z");
      assert.pathEqual(a.innerRadius(50)(), "M0,-100A100,100 0 1,1 0,100L0,50A50,50 0 1,0 0,-50Z");
    },
    "innerRadius can be defined as a function of data or index": function(arc) {
      var a = arc().innerRadius(f).outerRadius(100).startAngle(0).endAngle(Math.PI), o = {}, t = {}, dd, ii, tt;
      function f(d, i) { dd = d; ii = i; tt = this; return 42; }
      assert.pathEqual(a.call(t, o, 2), "M0,-100A100,100 0 1,1 0,100L0,42A42,42 0 1,0 0,-42Z");
      assert.equal(dd, o, "expected data, got {actual}");
      assert.equal(ii, 2, "expected index, got {actual}");
      assert.equal(tt, t, "expected this, got {actual}");
    },

    "outerRadius defaults to a function accessor": function(arc) {
      var a = arc().innerRadius(0).startAngle(0).endAngle(Math.PI);
      assert.pathEqual(a({outerRadius: 50}), "M0,-50A50,50 0 1,1 0,50L0,0Z");
      assert.pathEqual(a({outerRadius: 100}), "M0,-100A100,100 0 1,1 0,100L0,0Z");
    },
    "outerRadius can be defined as a constant": function(arc) {
      var a = arc().innerRadius(0).startAngle(0).endAngle(Math.PI);
      assert.pathEqual(a.outerRadius(50)(), "M0,-50A50,50 0 1,1 0,50L0,0Z");
      assert.pathEqual(a.outerRadius(100)(), "M0,-100A100,100 0 1,1 0,100L0,0Z");
    },
    "outerRadius can be defined as a function of data or index": function(arc) {
      var a = arc().innerRadius(0).outerRadius(f).startAngle(0).endAngle(Math.PI), o = {}, t = {}, dd, ii, tt;
      function f(d, i) { dd = d; ii = i; tt = this; return 42; }
      assert.pathEqual(a.call(t, o, 2), "M0,-42A42,42 0 1,1 0,42L0,0Z");
      assert.equal(dd, o, "expected data, got {actual}");
      assert.equal(ii, 2, "expected index, got {actual}");
      assert.equal(tt, t, "expected this, got {actual}");
    },

    "startAngle defaults to a function accessor": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100).endAngle(Math.PI);
      assert.pathEqual(a({startAngle: 0}), "M0,-100A100,100 0 1,1 0,100L0,0Z");
      assert.pathEqual(a({startAngle: Math.PI / 2}), "M100,0A100,100 0 0,1 0,100L0,0Z");
    },
    "startAngle can be defined as a constant": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100).endAngle(Math.PI);
      assert.pathEqual(a.startAngle(0)(), "M0,-100A100,100 0 1,1 0,100L0,0Z");
      assert.pathEqual(a.startAngle(Math.PI / 2)(), "M100,0A100,100 0 0,1 0,100L0,0Z");
    },
    "startAngle can be defined as a function of data or index": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100).startAngle(f).endAngle(Math.PI), o = {}, t = {}, dd, ii, tt;
      function f(d, i) { dd = d; ii = i; tt = this; return Math.PI; }
      assert.pathEqual(a.call(t, o, 2), "M0,100A100,100 0 0,1 0,100L0,0Z");
      assert.equal(dd, o, "expected data, got {actual}");
      assert.equal(ii, 2, "expected index, got {actual}");
      assert.equal(tt, t, "expected this, got {actual}");
    },

    "endAngle defaults to a function accessor": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100).startAngle(0);
      assert.pathEqual(a({endAngle: Math.PI / 2}), "M0,-100A100,100 0 0,1 100,0L0,0Z");
      assert.pathEqual(a({endAngle: Math.PI}), "M0,-100A100,100 0 1,1 0,100L0,0Z");
    },
    "endAngle can be defined as a constant": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100).startAngle(0);
      assert.pathEqual(a.endAngle(Math.PI / 2)(), "M0,-100A100,100 0 0,1 100,0L0,0Z");
      assert.pathEqual(a.endAngle(Math.PI)(), "M0,-100A100,100 0 1,1 0,100L0,0Z");
    },
    "endAngle can be defined as a function of data or index": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100).startAngle(0).endAngle(f), o = {}, t = {}, dd, ii, tt;
      function f(d, i) { dd = d; ii = i; tt = this; return Math.PI; }
      assert.pathEqual(a.call(t, o, 2), "M0,-100A100,100 0 1,1 0,100L0,0Z");
      assert.equal(dd, o, "expected data, got {actual}");
      assert.equal(ii, 2, "expected index, got {actual}");
      assert.equal(tt, t, "expected this, got {actual}");
    },

    "startAngle and endAngle are swapped if endAngle is less than startAngle": function(arc) {
      var a = arc().innerRadius(50).outerRadius(100);
      assert.pathEqual(a.startAngle(2 * Math.PI).endAngle(Math.PI)(), a.startAngle(Math.PI).endAngle(2 * Math.PI)());
      assert.pathEqual(a.startAngle(-Math.PI).endAngle(Math.PI)(), a.startAngle(Math.PI).endAngle(-Math.PI)());
    },

    "angles are defined in radians, with zero at 12 o'clock": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100);
      assert.pathEqual(a.startAngle(0).endAngle(Math.PI)(), "M0,-100A100,100 0 1,1 0,100L0,0Z");
      assert.pathEqual(a.startAngle(Math.PI).endAngle(2 * Math.PI)(), "M0,100A100,100 0 1,1 0,-100L0,0Z");
    },
    "radii are defined in local coordinates (typically pixels)": function(arc) {
      var a = arc().startAngle(0).endAngle(Math.PI);
      assert.pathEqual(a.innerRadius(0).outerRadius(100)(), "M0,-100A100,100 0 1,1 0,100L0,0Z");
      assert.pathEqual(a.innerRadius(100).outerRadius(200)(), "M0,-200A200,200 0 1,1 0,200L0,100A100,100 0 1,0 0,-100Z");
    },
    "draws a circle when inner radius is zero and angle is approximately 2π": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100);
      assert.pathEqual(a.startAngle(0).endAngle(2 * Math.PI - 1e-9)(), "M0,100A100,100 0 1,1 0,-100A100,100 0 1,1 0,100Z");
      assert.pathEqual(a.startAngle(Math.PI + 1e-9).endAngle(3 * Math.PI - 1e-9)(), "M0,100A100,100 0 1,1 0,-100A100,100 0 1,1 0,100Z");
    },
    "draws a circle when inner radius is zero and angle is greater than 2π": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100);
      assert.pathEqual(a.startAngle(0).endAngle(7)(), "M0,100A100,100 0 1,1 0,-100A100,100 0 1,1 0,100Z");
      assert.pathEqual(a.startAngle(1).endAngle(8)(), "M0,100A100,100 0 1,1 0,-100A100,100 0 1,1 0,100Z");
    },
    "draws a circular sector when inner radius is zero and angle is less than 2π": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100);
      assert.pathEqual(a.startAngle(0).endAngle(Math.PI / 2)(), "M0,-100A100,100 0 0,1 100,0L0,0Z");
    },
    "draws an annulus when inner radius is non-zero and angle is approximately 2π": function(arc) {
      var a = arc().innerRadius(100).outerRadius(200);
      assert.pathEqual(a.startAngle(0).endAngle(2 * Math.PI - 1e-9)(), "M0,200A200,200 0 1,1 0,-200A200,200 0 1,1 0,200M0,100A100,100 0 1,0 0,-100A100,100 0 1,0 0,100Z");
      assert.pathEqual(a.startAngle(Math.PI + 1e-9).endAngle(3 * Math.PI - 1e-9)(), "M0,200A200,200 0 1,1 0,-200A200,200 0 1,1 0,200M0,100A100,100 0 1,0 0,-100A100,100 0 1,0 0,100Z");
    },
    "draws an annulus when inner radius is non-zero and angle is greater than 2π": function(arc) {
      var a = arc().innerRadius(100).outerRadius(200);
      assert.pathEqual(a.startAngle(0).endAngle(7)(), "M0,200A200,200 0 1,1 0,-200A200,200 0 1,1 0,200M0,100A100,100 0 1,0 0,-100A100,100 0 1,0 0,100Z");
      assert.pathEqual(a.startAngle(-1).endAngle(6)(), "M0,200A200,200 0 1,1 0,-200A200,200 0 1,1 0,200M0,100A100,100 0 1,0 0,-100A100,100 0 1,0 0,100Z");
    },
    "draws an annular sector when both radii are non-zero and angle is less than 2π": function(arc) {
      var a = arc().innerRadius(100).outerRadius(200);
      assert.pathEqual(a.startAngle(0).endAngle(Math.PI / 2)(), "M0,-200A200,200 0 0,1 200,0L100,0A100,100 0 0,0 0,-100Z");
    },

    "computes the centroid as mid-radius and mid-angle": function(arc) {
      var c = arc().innerRadius(0).outerRadius(100).startAngle(0).endAngle(2 * Math.PI).centroid();
      assert.inDelta(c[0], 0, 1e-6);
      assert.inDelta(c[1], 50, 1e-6);
      var c = arc().innerRadius(100).outerRadius(200).startAngle(Math.PI).endAngle(2 * Math.PI).centroid();
      assert.inDelta(c[0], -150, 1e-6);
      assert.inDelta(c[1], 0, 1e-6);
    },
  }
});

suite.export(module);
