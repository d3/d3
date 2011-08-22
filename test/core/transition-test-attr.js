require("../env");
require("../../d3");

var assert = require("assert");

module.exports = {
  topic: function() {
    var cb = this.callback;

    var s = d3.select("body").append("div")
        .attr("width", 20)
        .attr("color", "red");

    var t = s.transition()
        .attr("width", 100)
        .attr("width", 200)
        .attr("color", function() { return "green"; })
        .each("end", function() { cb(null, {selection: s, transition: t}); });
  },
  "defines the corresponding attr tween": function(result) {
    assert.typeOf(result.transition.tween("attr.width"), "function");
    assert.typeOf(result.transition.tween("attr.color"), "function");
  },
  "the last attr operator takes precedence": function(result) {
    assert.equal(result.selection.attr("width"), "200");
  },
  "sets an attribute as a number": function(result) {
    assert.equal(result.selection.attr("width"), "200");
  },
  "sets an attribute as a function": function(result) {
    assert.equal(result.selection.attr("color"), "rgb(0,128,0)");
  }
};
