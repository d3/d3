require("../env");
require("../../d3");

var assert = require("assert");

module.exports = {
  topic: function() {
    var cb = this.callback;

    var s = d3.select("body").append("div")
        .style("background-color", "white")
        .style("color", "red")
        .style("display", "none")
        .style("font-size", "20px");

    var t = s.transition()
        .style("display", null)
        .style("font-size", function() { return null; })
        .style("display", null)
        .style("background-color", "green")
        .style("background-color", "red")
        .style("color", function() { return "green"; }, "important")
        .each("end", function() { cb(null, {selection: s, transition: t}); });
  },
  "defines the corresponding style tween": function(result) {
    assert.typeOf(result.transition.tween("style.background-color"), "function");
    assert.typeOf(result.transition.tween("style.color"), "function");
  },
  "the last style operator takes precedence": function(result) {
    assert.equal(result.selection.style("background-color"), "#ff0000");
  },
  "sets a property as a string": function(result) {
    assert.equal(result.selection.style("background-color"), "#ff0000");
  },
  "sets a property as a function": function(result) {
    assert.equal(result.selection.style("color"), "#008000");
  },
  "observes the specified priority": function(result) {
    var style = result.selection.node().style;
    assert.equal(style.getPropertyPriority("background-color"), "");
    assert.equal(style.getPropertyPriority("color"), "important");
  },
  "removes a property using a constant null": function(result) {
    assert.equal(result.selection.style("display"), "");
  },
  "removes a property using a function null": function(result) {
    assert.equal(result.selection.style("font-size"), "");
  }
};
