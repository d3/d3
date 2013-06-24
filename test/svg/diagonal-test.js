

var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.svg.diagonal");

suite.addBatch({
  "diagonal": {
    topic: load("svg/diagonal").expression("d3.svg.diagonal"),

    "x defaults to a function accessor": function(diagonal) {
      var d = diagonal();
    },
  }
});

suite.export(module);
