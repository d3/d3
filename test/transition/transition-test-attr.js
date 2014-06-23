var assert = require("../assert");

module.exports = {
  topic: function(d3) {
    var s = d3.select("body").append("div")
        .attr("display", "none")
        .attr("font-size", "20px")
        .attr("width", 20)
        .attr("background", "#ff0")
        .attr("color", "red")
        .attr("xlink:type", "simple")
        .attr("xlink:href", "http://mbostock.github.com/d3/");

    var t = s.transition()
        .attr("display", null)
        .attr("font-size", function() { return null; })
        .attr("display", null)
        .attr("width", 100)
        .attr("width", 200)
        .attr("color", function() { return "green"; })
        .attr("xlink:href", null)
        .attr("xlink:type", function() { return null; });

    return {selection: s, transition: t};
  },
  "defines the corresponding attr tween": function(result) {
    assert.typeOf(result.transition.tween("attr.width"), "function");
    assert.typeOf(result.transition.tween("attr.color"), "function");
  },
  "getter returns the target attribute value for the first node": function(result) {
    assert.isNull(result.transition.attr("display"));
    assert.isNull(result.transition.attr("font-size"));
    assert.equal(result.transition.attr("width"), 200);
    assert.equal(result.transition.attr("color"), "green");
    assert.isNull(result.transition.attr("xlink:href"));
    assert.isNull(result.transition.attr("xlink:type"));
  },
  "getter returns the current attribute value of the first node if it is not being transitioned": function(result) {
    assert.equal(result.transition.attr("background"), "#ff0");
  },
  "on end": {
    topic: function(result) {
      var cb = this.callback;
      result.transition.each("end", function() { cb(null, result); });
    },
    "the last attr operator takes precedence": function(result) {
      assert.equal(result.selection.attr("width"), "200");
    },
    "sets an attribute as a number": function(result) {
      assert.equal(result.selection.attr("width"), "200");
    },
    "sets an attribute as a function": function(result) {
      assert.equal(result.selection.attr("color"), "#008000");
    },
    "removes an attribute using a constant null": function(result) {
      assert.isNull(result.selection.attr("display"));
    },
    "removes an attribute using a function null": function(result) {
      assert.isNull(result.selection.attr("font-size"));
    },
    "removes a namespaced attribute using a constant null": function(result) {
      assert.isNull(result.selection.attr("xlink:href"));
    },
    "removes a namespaced attribute using a function null": function(result) {
      assert.isNull(result.selection.attr("xlink:type"));
    }
  }
};
