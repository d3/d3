require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.transition");

suite.addBatch({
  "transition.style": {
    topic: function() {
      var callback = this.callback,
          div = d3.select("body").append("div");

      div
          .style("background-color", "white")
        .transition()
          .style("background-color", "red")
          .each("end", function() { callback(null, div); });
    },
    "sets a property as a string": function(div) {
      assert.equal(div.style("background-color"), "rgb(255,0,0)");
    }
  },
  "transition.attr": {
    topic: function() {
      var callback = this.callback,
          div = d3.select("body").append("div");

      div
          .attr("width", 20)
        .transition()
          .attr("width", 200)
          .each("end", function() { callback(null, div); });
    },
    "sets an attribute as a number": function(div) {
      assert.equal(div.attr("width"), "200");
    }
  }
});

// TODO There's a lot more to test here!

suite.export(module);
