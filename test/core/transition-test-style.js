require("../env");
require("../../d3");

var assert = require("assert");

module.exports = {
  topic: function() {
    var callback = this.callback,
        div = d3.select("body").append("div");

    div
        .style("background-color", "white")
        .style("color", "red")
      .transition()
        .style("background-color", "red")
        .style("color", "green", "important")
        .each("end", function() { callback(null, div); });
  },
  "sets a property as a string": function(div) {
    assert.equal(div.style("background-color"), "rgb(255,0,0)");
  },
  "observes the specified priority": function(div) {
    var style = div.node().style;
    assert.equal(style.getPropertyPriority("background-color"), "");
    assert.equal(style.getPropertyPriority("color"), "important");
  }
};
