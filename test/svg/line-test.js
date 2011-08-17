require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.svg.line");

suite.addBatch({
  "line": {
    topic: function() {
      return d3.svg.line;
    },
    "default accessors assume tuple input": function(line) {
      var a = line();
      assert.pathEqual(a([[0, 0]]), "M0,0");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M0,0L1,1");
      assert.pathEqual(a([[0, 0], [1, 1], [2, 0]]), "M0,0L1,1L2,0");
    },
    "can specify x-accessor as a function": function(line) {
      var i = 0, a = line().x(function() { return ++i; });
      assert.pathEqual(a([[0, 0]]), "M1,0");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M2,0L3,1");
      assert.pathEqual(a([[0, 0], [1, 1], [2, 0]]), "M4,0L5,1L6,0");
    },
    "can specify y-accessor as a function": function(line) {
      var i = 0, a = line().y(function() { return ++i; });
      assert.pathEqual(a([[0, 0]]), "M0,1");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M0,2L1,3");
      assert.pathEqual(a([[0, 0], [1, 1], [2, 0]]), "M0,4L1,5L2,6");
    },
    "can specify y-accessor as a constant": function(line) {
      var a = line().y(-1);
      assert.pathEqual(a([[0, 0]]), "M0,-1");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M0,-1L1,-1");
      assert.pathEqual(a([[0, 0], [1, 1], [2, 0]]), "M0,-1L1,-1L2,-1");
    },
    "supports step-before interpolation": function(line) {
      var a = line().interpolate("step-before");
      assert.pathEqual(a([[0, 0]]), "M0,0");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M0,0V1H1");
      assert.pathEqual(a([[0, 0], [1, 1], [2, 0]]), "M0,0V1H1V0H2");
    },
    "supports step-after interpolation": function(line) {
      var a = line().interpolate("step-after");
      assert.pathEqual(a([[0, 0]]), "M0,0");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M0,0H1V1");
      assert.pathEqual(a([[0, 0], [1, 1], [2, 0]]), "M0,0H1V1H2V0");
    },
    "supports basis interpolation": function(line) {
      var a = line().interpolate("basis");
      assert.pathEqual(a([[0, 0]]), "M0,0");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M0,0L1,1");
      assert.pathEqual(a([[0, 0], [1, 1], [2, 0]]), "M0,0C0,0,0,0,0.16666666666666666,0.16666666666666666C0.3333333333333333,0.3333333333333333,0.6666666666666666,0.6666666666666666,1,0.6666666666666666C1.3333333333333333,0.6666666666666666,1.6666666666666665,0.3333333333333333,1.8333333333333333,0.16666666666666666C2,0,2,0,1.9999999999999998,0");
    },
    "supports basis-closed interpolation": function(line) {
      var a = line().interpolate("basis-closed");
      assert.pathEqual(a([[0, 0]]), "M0,0C0,0,0,0,0,0");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M0.3333333333333333,0.3333333333333333C0.3333333333333333,0.3333333333333333,0.6666666666666666,0.6666666666666666,0.6666666666666666,0.6666666666666666C0.6666666666666666,0.6666666666666666,0.3333333333333333,0.3333333333333333,0.3333333333333333,0.3333333333333333");
      assert.pathEqual(a([[0, 0], [1, 1], [2, 0]]), "M1.5,0.16666666666666666C1.3333333333333333,0,0.6666666666666666,0,0.5,0.16666666666666666C0.3333333333333333,0.3333333333333333,0.6666666666666666,0.6666666666666666,1,0.6666666666666666C1.3333333333333333,0.6666666666666666,1.6666666666666665,0.3333333333333333,1.5,0.16666666666666666");
    },
    "supports cardinal interpolation": function(line) {
      var a = line().interpolate("cardinal");
      assert.pathEqual(a([[0, 0]]), "M0,0");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M0,0L1,1");
      assert.pathEqual(a([[0, 0], [1, 1], [2, 0]]), "M0,0Q0.7999999999999999,1,1,1Q1.2,1,2,0");
    },
    "supports cardinal-closed interpolation": function(line) {
      var a = line().interpolate("cardinal-closed");
      assert.pathEqual(a([[0, 0]]), "M0,0");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M0,0L1,1");
      assert.pathEqual(a([[0, 0], [1, 1], [2, 0]]), "M0,0C-0.15000000000000002,0.15000000000000002,0.7,1,1,1S2.15,0.15000000000000002,2,0S0.15000000000000002,-0.15000000000000002,0,0");
    },
    "supports monotone interpolation": function(line) {
      var a = line().interpolate("monotone");
      assert.pathEqual(a([[0, 0]]), "M0,0");
      assert.pathEqual(a([[0, 0], [1, 1]]), "M0,0L1,1");
      assert.pathEqual(a([[0, 0], [1, 1], [2, 0]]), "M0,0C0.08333333333333333,0.08333333333333333,0.6666666666666667,1,1,1S1.9166666666666667,0.08333333333333333,2,0");
    }
  }
});

suite.export(module);
