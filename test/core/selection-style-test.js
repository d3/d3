require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("selection.style");

suite.addBatch({
  "select(body)": {
    topic: function() {
      return d3.select("body").html("");
    },
    "sets a property as a string": function(body) {
      body.style("background-color", "red");
      assert.equal(document.body.style["background-color"], "red");
    },
    "sets a property as a number": function(body) {
      body.style("opacity", .3);
      assert.equal(document.body.style["opacity"], "0.3");
    },
    "sets a property as a function": function(body) {
      body.style("background-color", function() { return "orange"; });
      assert.equal(document.body.style["background-color"], "orange");
    },
    "gets a property value": function(body) {
      document.body.style.setProperty("background-color", "yellow", "");
      assert.equal(body.style("background-color"), "yellow");
    },
    "observes the specified priority": function(body) {
      body.style("background-color", "green", "important");
      assert.equal(document.body.style.getPropertyPriority("background-color"), "important");
    },
    "removes a property as null": function(body) {
      body.style("background-color", "green").style("background-color", null);
      assert.equal(body.style("background-color"), "");
    },
    "removes a property as a function": function(body) {
      body.style("background-color", "green").style("background-color", function() { return null; });
      assert.equal(body.style("background-color"), "");
    },
    "returns the current selection": function(body) {
      assert.isTrue(body.style("background-color", "green") === body);
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: function() {
      return d3.select("body").html("").selectAll("div").data(d3.range(2)).enter().append("div");
    },
    "sets a property as a string": function(div) {
      div.style("background-color", "red");
      assert.equal(div[0][0].style["background-color"], "red");
      assert.equal(div[0][1].style["background-color"], "red");
    },
    "sets a property as a number": function(div) {
      div.style("opacity", .5);
      assert.equal(div[0][0].style["opacity"], "0.5");
      assert.equal(div[0][1].style["opacity"], "0.5");
    },
    "sets a property as a function": function(div) {
      div.style("background-color", d3.interpolateRgb("orange", "yellow"));
      assert.equal(div[0][0].style["background-color"], "#ffa500");
      assert.equal(div[0][1].style["background-color"], "#ffff00");
    },
    "gets a property value": function(div) {
      div[0][0].style.setProperty("background-color", "green", "");
      assert.equal(div.style("background-color"), "green");
    },
    "observes the specified priority": function(div) {
      div.style("background-color", "blue", "important");
      assert.equal(div[0][0].style.getPropertyPriority("background-color"), "important");
      assert.equal(div[0][1].style.getPropertyPriority("background-color"), "important");
    },
    "removes a property as null": function(div) {
      div.style("background-color", "red").style("background-color", null);
      assert.equal(div[0][0].style["background-color"], "");
      assert.equal(div[0][1].style["background-color"], "");
    },
    "removes a property as a function": function(div) {
      div.style("background-color", "red").style("background-color", function() { return null; });
      assert.equal(div[0][0].style["background-color"], "");
      assert.equal(div[0][1].style["background-color"], "");
    },
    "ignores null nodes": function(div) {
      var some = d3.selectAll("div");
      some[0][1] = null;
      some.style("background-color", null).style("background-color", "red");
      assert.equal(div[0][0].style["background-color"], "red");
      assert.equal(div[0][1].style["background-color"], "");
    },
    "returns the current selection": function(div) {
      assert.isTrue(div.style("background-color", "green") === div);
    }
  }
});

suite.export(module);
