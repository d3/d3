require("../env");
require("../../d3");

var assert = require("assert");

module.exports = {
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
};
