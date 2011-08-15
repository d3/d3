require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.svg.area");

suite.addBatch({
  "area": {
    topic: function() {
      return d3.svg.area;
    },
    "default accessors assume tuple input": function(area) {
      var a = area();
      assert.pathEqual(a([[0, 0]]), "M0,0L0,0Z");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M0,0L1,1L1,0L0,0Z");
      assert.pathEqual(a([[0, 0], [1, 1], [2, 0]]), "M0,0L1,1L2,0L2,0L1,0L0,0Z");
    },
    "can specify x-accessor as a function": function(area) {
      var i = 0, a = area().x(function() { return ++i; });
      assert.pathEqual(a([[0, 0]]), "M1,0L1,0Z");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M2,0L3,1L3,0L2,0Z");
      assert.pathEqual(a([[0, 0], [1, 1], [2, 0]]), "M4,0L5,1L6,0L6,0L5,0L4,0Z");
    },
    "can specify y-accessor as a function": function(area) {
      var i = 0, a = area().y(function() { return ++i; });
      assert.pathEqual(a([[0, 0]]), "M0,1L0,1Z");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M0,2L1,3L1,3L0,2Z");
      assert.pathEqual(a([[0, 0], [1, 1], [2, 0]]), "M0,4L1,5L2,6L2,6L1,5L0,4Z");
    },
    "can specify y0-accessor as a constant": function(area) {
      var a = area().y0(-1);
      assert.pathEqual(a([[0, 0]]), "M0,0L0,-1Z");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M0,0L1,1L1,-1L0,-1Z");
      assert.pathEqual(a([[0, 0], [1, 1], [2, 0]]), "M0,0L1,1L2,0L2,-1L1,-1L0,-1Z");
    },
    "can specify y0-accessor as a function": function(area) {
      var a = area().x(function(d) { return d.x; }).y0(function(d) { return -d.y; }).y1(function(d) { return d.y; });
      assert.pathEqual(a([{x:0,y:0}]), "M0,0L0,0Z");
      assert.pathEqual(a([{x:0,y:0},{x:1,y:1}]), "M0,0L1,1L1,-1L0,0Z");
      assert.pathEqual(a([{x:0,y:0},{x:1,y:1},{x:2,y:0}]), "M0,0L1,1L2,0L2,0L1,-1L0,0Z");
    },
    "can specify y1-accessor as a function": function(area) {
      var a = area().x(function(d) { return d.x; }).y1(function(d) { return d.y; });
      assert.pathEqual(a([{x:0,y:0}]), "M0,0L0,0Z");
      assert.pathEqual(a([{x:0,y:0},{x:1,y:1}]), "M0,0L1,1L1,0L0,0Z");
      assert.pathEqual(a([{x:0,y:0},{x:1,y:1},{x:2,y:0}]), "M0,0L1,1L2,0L2,0L1,0L0,0Z");
    },
    "supports step-before interpolation": function(area) {
      var a = area().interpolate("step-before");
      assert.pathEqual(a([[0, 0]]), "M0,0L0,0Z");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M0,0V1H1L1,0V0H0Z");
      assert.pathEqual(a([[0, 0], [1, 1], [2, 0]]), "M0,0V1H1V0H2L2,0V0H1V0H0Z");
    },
    "supports step-after interpolation": function(area) {
      var a = area().interpolate("step-after");
      assert.pathEqual(a([[0, 0]]), "M0,0L0,0Z");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M0,0H1V1L1,0H0V0Z");
      assert.pathEqual(a([[0, 0], [1, 1], [2, 0]]), "M0,0H1V1H2V0L2,0H1V0H0V0Z");
    },
    "supports basis interpolation": function(area) {
      var a = area().interpolate("basis");
      assert.pathEqual(a([[0, 0]]), "M0,0L0,0Z");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M0,0L1,1L1,0L0,0Z");
      assert.pathEqual(a([[0, 0], [1, 1], [2, 0]]), "M0,0C0,0,0,0,0.16666666666666666,0.16666666666666666C0.3333333333333333,0.3333333333333333,0.6666666666666666,0.6666666666666666,1,0.6666666666666666C1.3333333333333333,0.6666666666666666,1.6666666666666665,0.3333333333333333,1.8333333333333333,0.16666666666666666C2,0,2,0,1.9999999999999998,0L2,0C2,0,2,0,1.8333333333333333,0C1.6666666666666665,0,1.3333333333333333,0,1,0C0.6666666666666666,0,0.3333333333333333,0,0.16666666666666666,0C0,0,0,0,0,0Z");
    },
    "supports basis-closed interpolation": function(area) {
      var a = area().interpolate("basis-closed");
      assert.pathEqual(a([[0, 0]]), "M0,0C0,0,0,0,0,0L0,0C0,0,0,0,0,0Z");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M0.3333333333333333,0.3333333333333333C0.3333333333333333,0.3333333333333333,0.6666666666666666,0.6666666666666666,0.6666666666666666,0.6666666666666666C0.6666666666666666,0.6666666666666666,0.3333333333333333,0.3333333333333333,0.3333333333333333,0.3333333333333333L0.6666666666666666,0C0.6666666666666666,0,0.3333333333333333,0,0.3333333333333333,0C0.3333333333333333,0,0.6666666666666666,0,0.6666666666666666,0Z");
      assert.pathEqual(a([[0, 0], [1, 1], [2, 0]]), "M1.5,0.16666666666666666C1.3333333333333333,0,0.6666666666666666,0,0.5,0.16666666666666666C0.3333333333333333,0.3333333333333333,0.6666666666666666,0.6666666666666666,1,0.6666666666666666C1.3333333333333333,0.6666666666666666,1.6666666666666665,0.3333333333333333,1.5,0.16666666666666666L0.5,0C0.6666666666666666,0,1.3333333333333333,0,1.5,0C1.6666666666666665,0,1.3333333333333333,0,1,0C0.6666666666666666,0,0.3333333333333333,0,0.5,0Z");
    },
    "supports cardinal interpolation": function(area) {
      var a = area().interpolate("cardinal");
      assert.pathEqual(a([[0, 0]]), "M0,0L0,0Z");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M0,0L1,1L1,0L0,0Z");
      assert.pathEqual(a([[0, 0], [1, 1], [2, 0]]), "M0,0Q0.7999999999999999,1,1,1Q1.2,1,2,0L2,0Q1.2,0,1,0Q0.7999999999999999,0,0,0Z");
    },
    "supports cardinal-closed interpolation": function(area) {
      var a = area().interpolate("cardinal-closed");
      assert.pathEqual(a([[0, 0]]), "M0,0L0,0Z");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M0,0L1,1L1,0L0,0Z");
      assert.pathEqual(a([[0, 0], [1, 1], [2, 0]]), "M0,0C-0.15000000000000002,0.15000000000000002,0.7,1,1,1S2.15,0.15000000000000002,2,0S0.15000000000000002,-0.15000000000000002,0,0L2,0C2.15,0,1.3,0,1,0S-0.15000000000000002,0,0,0S1.85,0,2,0Z");
    },
    "supports monotone interpolation": function(area) {
      var a = area().interpolate("monotone");
      assert.pathEqual(a([[0, 0]]), "M0,0L0,0Z");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M0,0L1,1L1,0L0,0Z");
      assert.pathEqual(a([[0, 0], [1, 1], [2, 0]]), "M0,0C0.08333333333333333,0.08333333333333333,0.6666666666666667,1,1,1S1.9166666666666667,0.08333333333333333,2,0L2,0C1.8333333333333333,0,1.3333333333333333,0,1,0S0.16666666666666666,0,0,0Z");
    }
  }
});

suite.export(module);
