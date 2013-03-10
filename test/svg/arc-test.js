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
      var a = arc().outerRadius(100).cornerRadius(0).startAngle(0).endAngle(Math.PI);
      assert.pathEqual(a({innerRadius: 0}), "M0,-100A100,100 0 1,1 0,100L0,0Z");
      assert.pathEqual(a({innerRadius: 50}), "M0,-100A100,100 0 1,1 0,100L0,50A50,50 0 1,0 0,-50Z");
    },
    "innerRadius can be defined as a constant": function(arc) {
      var a = arc().outerRadius(100).cornerRadius(0).startAngle(0).endAngle(Math.PI);
      assert.pathEqual(a.innerRadius(0)(), "M0,-100A100,100 0 1,1 0,100L0,0Z");
      assert.pathEqual(a.innerRadius(50)(), "M0,-100A100,100 0 1,1 0,100L0,50A50,50 0 1,0 0,-50Z");
    },
    "innerRadius can be defined as a function of data or index": function(arc) {
      var a = arc().innerRadius(f).outerRadius(100).cornerRadius(0).startAngle(0).endAngle(Math.PI), o = {}, t = {}, dd, ii, tt;
      function f(d, i) { dd = d; ii = i; tt = this; return 42; }
      assert.pathEqual(a.call(t, o, 2), "M0,-100A100,100 0 1,1 0,100L0,42A42,42 0 1,0 0,-42Z");
      assert.equal(dd, o, "expected data, got {actual}");
      assert.equal(ii, 2, "expected index, got {actual}");
      assert.equal(tt, t, "expected this, got {actual}");
    },

    "outerRadius defaults to a function accessor": function(arc) {
      var a = arc().innerRadius(0).cornerRadius(0).startAngle(0).endAngle(Math.PI);
      assert.pathEqual(a({outerRadius: 50}), "M0,-50A50,50 0 1,1 0,50L0,0Z");
      assert.pathEqual(a({outerRadius: 100}), "M0,-100A100,100 0 1,1 0,100L0,0Z");
    },
    "outerRadius can be defined as a constant": function(arc) {
      var a = arc().innerRadius(0).cornerRadius(0).startAngle(0).endAngle(Math.PI);
      assert.pathEqual(a.outerRadius(50)(), "M0,-50A50,50 0 1,1 0,50L0,0Z");
      assert.pathEqual(a.outerRadius(100)(), "M0,-100A100,100 0 1,1 0,100L0,0Z");
    },
    "outerRadius can be defined as a function of data or index": function(arc) {
      var a = arc().innerRadius(0).outerRadius(f).cornerRadius(0).startAngle(0).endAngle(Math.PI), o = {}, t = {}, dd, ii, tt;
      function f(d, i) { dd = d; ii = i; tt = this; return 42; }
      assert.pathEqual(a.call(t, o, 2), "M0,-42A42,42 0 1,1 0,42L0,0Z");
      assert.equal(dd, o, "expected data, got {actual}");
      assert.equal(ii, 2, "expected index, got {actual}");
      assert.equal(tt, t, "expected this, got {actual}");
    },

    "cornerRadius defaults to a function accessor": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100).startAngle(0).endAngle(Math.PI);
      assert.pathEqual(a({cornerRadius: 10}), "M0,-89.442719A10,10 0 0,1 11.111111,-99.380798A100,100 0 0,1 11.111111,99.380798A10,10 0 0,1 0,89.442719L0,0Z");
      assert.pathEqual(a({cornerRadius: 40}), "M0,-44.721359A40,40 0 0,1 66.666666,-74.535599A100,100 0 0,1 66.666666,74.535599A40,40 0 0,1 0,44.721359L0,0Z");
    },
    "cornerRadius can be defined as a constant": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100).startAngle(0).endAngle(Math.PI);
      assert.pathEqual(a.cornerRadius(10)(), "M0,-89.442719A10,10 0 0,1 11.111111,-99.380798A100,100 0 0,1 11.111111,99.380798A10,10 0 0,1 0,89.442719L0,0Z");
      assert.pathEqual(a.cornerRadius(40)(), "M0,-44.721359A40,40 0 0,1 66.666666,-74.535599A100,100 0 0,1 66.666666,74.535599A40,40 0 0,1 0,44.721359L0,0Z");
    },
    "cornerRadius can be defined as a function of data or index": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100).cornerRadius(f).startAngle(0).endAngle(Math.PI), o = {}, t = {}, dd, ii, tt;
      function f(d, i) { dd = d; ii = i; tt = this; return 42; }
      assert.pathEqual(a.call(t, o, 2), "M0,-40A42,42 0 0,1 72.413793,-68.965517A100,100 0 0,1 72.413793,68.965517A42,42 0 0,1 0,40L0,0Z");
      assert.equal(dd, o, "expected data, got {actual}");
      assert.equal(ii, 2, "expected index, got {actual}");
      assert.equal(tt, t, "expected this, got {actual}");
    },

    "startAngle defaults to a function accessor": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100).cornerRadius(0).endAngle(Math.PI);
      assert.pathEqual(a({startAngle: 0}), "M0,-100A100,100 0 1,1 0,100L0,0Z");
      assert.pathEqual(a({startAngle: Math.PI / 2}), "M100,0A100,100 0 0,1 0,100L0,0Z");
    },
    "startAngle can be defined as a constant": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100).cornerRadius(0).endAngle(Math.PI);
      assert.pathEqual(a.startAngle(0)(), "M0,-100A100,100 0 1,1 0,100L0,0Z");
      assert.pathEqual(a.startAngle(Math.PI / 2)(), "M100,0A100,100 0 0,1 0,100L0,0Z");
    },
    "startAngle can be defined as a function of data or index": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100).cornerRadius(0).startAngle(f).endAngle(Math.PI), o = {}, t = {}, dd, ii, tt;
      function f(d, i) { dd = d; ii = i; tt = this; return Math.PI; }
      assert.pathEqual(a.call(t, o, 2), "M0,100A100,100 0 0,1 0,100L0,0Z");
      assert.equal(dd, o, "expected data, got {actual}");
      assert.equal(ii, 2, "expected index, got {actual}");
      assert.equal(tt, t, "expected this, got {actual}");
    },

    "endAngle defaults to a function accessor": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100).cornerRadius(0).startAngle(0);
      assert.pathEqual(a({endAngle: Math.PI / 2}), "M0,-100A100,100 0 0,1 100,0L0,0Z");
      assert.pathEqual(a({endAngle: Math.PI}), "M0,-100A100,100 0 1,1 0,100L0,0Z");
    },
    "endAngle can be defined as a constant": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100).cornerRadius(0).startAngle(0);
      assert.pathEqual(a.endAngle(Math.PI / 2)(), "M0,-100A100,100 0 0,1 100,0L0,0Z");
      assert.pathEqual(a.endAngle(Math.PI)(), "M0,-100A100,100 0 1,1 0,100L0,0Z");
    },
    "endAngle can be defined as a function of data or index": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100).cornerRadius(0).startAngle(0).endAngle(f), o = {}, t = {}, dd, ii, tt;
      function f(d, i) { dd = d; ii = i; tt = this; return Math.PI; }
      assert.pathEqual(a.call(t, o, 2), "M0,-100A100,100 0 1,1 0,100L0,0Z");
      assert.equal(dd, o, "expected data, got {actual}");
      assert.equal(ii, 2, "expected index, got {actual}");
      assert.equal(tt, t, "expected this, got {actual}");
    },

    "startAngle and endAngle are swapped if endAngle is less than startAngle": function(arc) {
      var a = arc().innerRadius(50).outerRadius(100).cornerRadius(0);
      assert.pathEqual(a.startAngle(2 * Math.PI).endAngle(Math.PI)(), a.startAngle(Math.PI).endAngle(2 * Math.PI)());
      assert.pathEqual(a.startAngle(-Math.PI).endAngle(Math.PI)(), a.startAngle(Math.PI).endAngle(-Math.PI)());
    },

    "angles are defined in radians, with zero at 12 o'clock": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100).cornerRadius(0);
      assert.pathEqual(a.startAngle(0).endAngle(Math.PI)(), "M0,-100A100,100 0 1,1 0,100L0,0Z");
      assert.pathEqual(a.startAngle(Math.PI).endAngle(2 * Math.PI)(), "M0,100A100,100 0 1,1 0,-100L0,0Z");
    },
    "radii are defined in local coordinates (typically pixels)": function(arc) {
      var a = arc().startAngle(0).endAngle(Math.PI);
      assert.pathEqual(a.innerRadius(0).outerRadius(100).cornerRadius(0)(), "M0,-100A100,100 0 1,1 0,100L0,0Z");
      assert.pathEqual(a.innerRadius(100).outerRadius(200).cornerRadius(0)(), "M0,-200A200,200 0 1,1 0,200L0,100A100,100 0 1,0 0,-100Z");
      assert.pathEqual(a.innerRadius(0).outerRadius(100).cornerRadius(10)(), "M0,-89.442719A10,10 0 0,1 11.111111,-99.380798A100,100 0 0,1 11.111111,99.380798A10,10 0 0,1 0,89.442719L0,0Z");
      assert.pathEqual(a.innerRadius(100).outerRadius(200).cornerRadius(40)(), "M0,-154.919333A40,40 0 0,1 50,-193.649167A200,200 0 0,1 50,193.649167A40,40 0 0,1 0,154.919333L0,134.164078A40,40 0 0,1 28.571428,95.831484A100,100 0 0,0 28.571428,-95.831484A40,40 0 0,1 0,-134.164078Z");
    },
    "draws a circle when inner radius is zero and angle is approximately 2π": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100).cornerRadius(10);
      assert.pathEqual(a.startAngle(0).endAngle(2 * Math.PI - 1e-9)(), "M0,100A100,100 0 1,1 0,-100A100,100 0 1,1 0,100Z");
      assert.pathEqual(a.startAngle(Math.PI + 1e-9).endAngle(3 * Math.PI - 1e-9)(), "M0,100A100,100 0 1,1 0,-100A100,100 0 1,1 0,100Z");
    },
    "draws a circle when inner radius is zero and angle is greater than 2π": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100).cornerRadius(10);
      assert.pathEqual(a.startAngle(0).endAngle(7)(), "M0,100A100,100 0 1,1 0,-100A100,100 0 1,1 0,100Z");
      assert.pathEqual(a.startAngle(1).endAngle(8)(), "M0,100A100,100 0 1,1 0,-100A100,100 0 1,1 0,100Z");
    },
    "draws a circular sector when inner radius is zero and angle is less than 2π": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100).cornerRadius(0);
      assert.pathEqual(a.startAngle(0).endAngle(Math.PI / 2)(), "M0,-100A100,100 0 0,1 100,0L0,0Z");
      var a = arc().innerRadius(0).outerRadius(100).cornerRadius(10);
      assert.pathEqual(a.startAngle(0).endAngle(Math.PI / 2)(), "M0,-89.442719A10,10 0 0,1 11.111111,-99.380798A100,100 0 0,1 99.380798,-11.111111A10,10 0 0,1 89.442719,0L0,0Z");
    },
    "draws an annulus when inner radius is non-zero and angle is approximately 2π": function(arc) {
      var a = arc().innerRadius(100).outerRadius(200).cornerRadius(10);
      assert.pathEqual(a.startAngle(0).endAngle(2 * Math.PI - 1e-9)(), "M0,200A200,200 0 1,1 0,-200A200,200 0 1,1 0,200M0,100A100,100 0 1,0 0,-100A100,100 0 1,0 0,100Z");
      assert.pathEqual(a.startAngle(Math.PI + 1e-9).endAngle(3 * Math.PI - 1e-9)(), "M0,200A200,200 0 1,1 0,-200A200,200 0 1,1 0,200M0,100A100,100 0 1,0 0,-100A100,100 0 1,0 0,100Z");
    },
    "draws an annulus when inner radius is non-zero and angle is greater than 2π": function(arc) {
      var a = arc().innerRadius(100).outerRadius(200).cornerRadius(10);
      assert.pathEqual(a.startAngle(0).endAngle(7)(), "M0,200A200,200 0 1,1 0,-200A200,200 0 1,1 0,200M0,100A100,100 0 1,0 0,-100A100,100 0 1,0 0,100Z");
      assert.pathEqual(a.startAngle(-1).endAngle(6)(), "M0,200A200,200 0 1,1 0,-200A200,200 0 1,1 0,200M0,100A100,100 0 1,0 0,-100A100,100 0 1,0 0,100Z");
    },
    "draws an annular sector when both radii are non-zero and angle is less than 2π": function(arc) {
      var a = arc().innerRadius(100).outerRadius(200).cornerRadius(0);
      assert.pathEqual(a.startAngle(0).endAngle(Math.PI / 2)(), "M0,-200A200,200 0 0,1 200,0L100,0A100,100 0 0,0 0,-100Z");
      var a = arc().innerRadius(100).outerRadius(200).cornerRadius(40);
      assert.pathEqual(a.startAngle(0).endAngle(Math.PI / 2)(), "M0,-154.919333A40,40 0 0,1 50,-193.649167A200,200 0 0,1 193.649167,-50A40,40 0 0,1 154.919333,0L134.164078,0A40,40 0 0,1 95.831484,-28.571428A100,100 0 0,0 28.571428,-95.831484A40,40 0 0,1 0,-134.164078Z");
    },

    "draws bezier approximation when inner radius is zero and corner radius is too large relative to arc length": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100).cornerRadius(10)
      assert.pathEqual(a.startAngle(0).endAngle(Math.PI / 15)(), "M0,-89.442719C0,-94.931369 4.711523,-100.055626 10.452846,-99.452189C16.194169,-98.848752 19.737341,-92.856890 18.596186,-87.488181L0,0Z");
    },
    "draws inner bezier approximation when inner radius is non-zero and corner radius is too large relative to inner arc length": function(arc) {
      var a = arc().innerRadius(100).outerRadius(200).cornerRadius(40)
      assert.pathEqual(a.startAngle(0).endAngle(Math.PI / 6)(), "M0,-154.919333A40,40 0 0,1 50,-193.649167A200,200 0 0,1 53.523313,-192.705098A40,40 0 0,1 77.459666,-134.164078L67.082039,-116.189500C56.496785,-97.855303 39.689023,-92.892976 25.881904,-96.592582C12.074785,-100.292188 0,-112.993571 0,-134.164078Z");
    },
    "draws full bezier approximation when inner radius is non-zero and corner radius is too large relative to outer arc length": function(arc) {
      var a = arc().innerRadius(100).outerRadius(200).cornerRadius(40)
      assert.pathEqual(a.startAngle(0).endAngle(Math.PI / 10)(), "M0,-154.919333C0,-176.309230 14.220355,-200.240742 31.286893,-197.537668C48.353430,-194.834594 54.482548,-167.680042 47.872706,-147.337041L41.458980,-127.597621C34.916933,-107.463272 24.176715,-97.417297 15.643446,-98.768834C7.110177,-100.120371 0,-112.993571 0,-134.164078Z");
    },

    "throws error when inner radius is zero and corner radius is too large relative to outer radius": function(arc) {
      var a = arc().innerRadius(0).outerRadius(100).cornerRadius(50 + 1e-6);
      assert.throws(a.startAngle(0).endAngle(Math.PI), Error);
    },
    "throws error when inner radius is non-zero and corner radius is too large relative to difference between outer and inner radius": function(arc) {
      var a = arc().innerRadius(100).outerRadius(200).cornerRadius(50 + 1e-6);
      assert.throws(a.startAngle(0).endAngle(Math.PI), Error);
    },

    "computes the centroid as mid-radius and mid-angle": function(arc) {
      var c = arc().innerRadius(0).outerRadius(100).cornerRadius(10).startAngle(0).endAngle(2 * Math.PI).centroid();
      assert.inDelta(c[0], 0, 1e-6);
      assert.inDelta(c[1], 50, 1e-6);
      var c = arc().innerRadius(100).outerRadius(200).cornerRadius(40).startAngle(Math.PI).endAngle(2 * Math.PI).centroid();
      assert.inDelta(c[0], -150, 1e-6);
      assert.inDelta(c[1], 0, 1e-6);
    },
  }
});

suite.export(module);
