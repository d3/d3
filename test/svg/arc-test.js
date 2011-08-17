require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.svg.arc");

suite.addBatch({
  "arc": {
    topic: function() {
      return d3.svg.arc;
    },
    "default accessors use named properties": function(arc) {
      var a = arc();
      assert.pathEqual(a({innerRadius: 0, outerRadius: 1, startAngle: 0, endAngle: Math.PI}), "M0,-1A1,1 0 1,1 0,1L0,0Z");
      assert.pathEqual(a({innerRadius: 1, outerRadius: 2, startAngle: Math.PI, endAngle: 0}), "M0,2A2,2 0 0,1 0,-2L0,-1A1,1 0 0,0 0,1Z");
    },
    "can define accessors as constants": function(arc) {
      var a = arc().innerRadius(0).outerRadius(1).startAngle(0).endAngle(Math.PI);
      assert.pathEqual(a(), "M0,-1A1,1 0 1,1 0,1L0,0Z");
      var a = arc().innerRadius(1).outerRadius(2).startAngle(Math.PI).endAngle(0);
      assert.pathEqual(a(), "M0,2A2,2 0 0,1 0,-2L0,-1A1,1 0 0,0 0,1Z");
    }
  }
});

suite.export(module);
