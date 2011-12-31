require("../env");
require("../../d3");

var assert = require("assert");

module.exports = {
  topic: function() {
    var cb = this.callback;

    var s = d3.select("body").append("div")
        .attr("display", "none")
        .attr("font-size", "20px")
        .attr("width", 20)
        .attr("color", "red")
        .attr("xlink:type", "simple")
        .attr("xlink:href", "http://mbostock.github.com/d3/")
        .attr({
          height: 0,
          foo: 0,
          bar: 1,
          baz: 1
        });

    var t = s.transition()
        .attr("display", null)
        .attr("font-size", function() { return null; })
        .attr("display", null)
        .attr("width", 100)
        .attr("width", 200)
        .attr("color", function() { return "green"; })
        .attr("xlink:href", null)
        .attr("xlink:type", function() { return null; })
        .attr({
          height: 100,
          foo: function() { return 1; },
          bar: null,
          baz: function() { return null; }
        })
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
    assert.equal(result.selection.attr("color"), "#008000");
  },
  "sets an attribute as a map of numbers": function(result) {
    assert.equal(result.selection.attr("height"), "100");
  },
  "sets an attribute as a map of functions": function(result) {
    assert.equal(result.selection.attr("foo"), "1");
  },
  "removes an attribute using a constant null": function(result) {
    assert.equal(result.selection.attr("display"), "");
  },
  "removes an attribute using a function null": function(result) {
    assert.equal(result.selection.attr("font-size"), "");
  },
  "removes a namespaced attribute using a constant null": function(result) {
    assert.equal(result.selection.attr("xlink:href"), "");
  },
  "removes a namespaced attribute using a function null": function(result) {
    assert.equal(result.selection.attr("xlink:type"), "");
  },
  "removes an attribute using a map of constant nulls": function(result) {
    assert.equal(result.selection.attr("bar"), "");
  },
  "removes an attribute using a map of function nulls": function(result) {
    assert.equal(result.selection.attr("baz"), "");
  }
};
