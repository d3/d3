require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.svg.line.variable");

suite.addBatch({
  "line.variable": {
    topic: function() {
      return d3.svg.line.variable;
    },

    "w defaults to 5": function(line) {
      var l = line();
      assert.pathEqual(l([[0, 5], [1, 5]]), "M0,2.5L1,2.5L1,7.5L0,7.5Z");
      assert.equal(l.w(), 5);
    },
    "w can be defined as a constant": function(line) {
      var l = line().w(0);
      assert.pathEqual(l([[0, 5], [1, 5]]), "M0,5L1,5L1,5L0,5Z");
      assert.equal(l.w(), 0);
    },
    "w can be defined as a function": function(line) {
      var l = line().w(function(d) { return 3; });
      assert.pathEqual(l([[0, 5], [1, 5]]), "M0,3.5L1,3.5L1,6.5L0,6.5Z");
    },

    "interpolate defaults to linear": function(line) {
      assert.equal(line().interpolate(), "linear");
    },

    "tension defaults to .7": function(line) {
      assert.equal(line().tension(), .7);
    },

    "returns null if input points array is empty": function(line) {
      assert.isNull(line()([]));
    }
  }
});

suite.export(module);
