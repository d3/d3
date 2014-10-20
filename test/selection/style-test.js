var vows = require("vows"),
    _ = require("../../"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("selection.style");

suite.addBatch({
  "on select(body)": {
    topic: load("selection/style").document(),
    "on an initially-empty page": {
      topic: function(d3) {
        return d3.select("body");
      },
      "sets a property as a string": function(body) {
        body.style("background-color", "red");
        assert.equal(body.node().style.getPropertyValue("background-color"), "red");
      },
      "sets a property as a number": function(body) {
        body.style("opacity", .3);
        assert.equal(body.node().style.getPropertyValue("opacity"), "0.3");
      },
      "sets a property as a function": function(body) {
        body.style("background-color", function() { return "orange"; });
        assert.equal(body.node().style.getPropertyValue("background-color"), "orange");
      },
      "sets properties as a map of constants": function(body) {
        body.style({"background-color": "white", opacity: .42});
        assert.equal(body.node().style.getPropertyValue("background-color"), "white");
        assert.equal(body.node().style.getPropertyValue("opacity"), "0.42");
      },
      "sets properties as a map of functions": function(body) {
        body.data(["orange"]).style({"background-color": String, opacity: function(d, i) { return i; }});
        assert.equal(body.node().style.getPropertyValue("background-color"), "orange");
        assert.equal(body.node().style.getPropertyValue("opacity"), "0");
      },
      "gets a property value": function(body) {
        body.node().style.setProperty("background-color", "yellow", "");
        assert.equal(body.style("background-color"), "yellow");
      },
      "observes the specified priority": function(body) {
        body.style("background-color", "green", "important");
        assert.equal(body.node().style.getPropertyPriority("background-color"), "important");
        body.style({opacity: .52}, "important");
        assert.equal(body.node().style.getPropertyPriority("opacity"), "important");
        body.style({visibility: function() { return "visible"; }}, "important");
        assert.equal(body.node().style.getPropertyPriority("visibility"), "important");
      },
      "removes a property as null": function(body) {
        body.style("background-color", "green").style("background-color", null);
        assert.equal(body.style("background-color"), "");
      },
      "removes a property as a function": function(body) {
        body.style("background-color", "green").style("background-color", function() { return null; });
        assert.equal(body.style("background-color"), "");
      },
      "removes properties as a map of nulls": function(body) {
        body.node().style.setProperty("background-color", "purple");
        body.style({"background-color": null});
        assert.equal(body.style("background-color"), "");
      },
      "removes properties as a map of functions that return null": function(body) {
        body.node().style.setProperty("background-color", "purple");
        body.style({"background-color": function() {}});
        assert.equal(body.style("background-color"), "");
      },
      "returns the current selection": function(body) {
        assert.isTrue(body.style("background-color", "green") === body);
      }
    }
  }
});

suite.addBatch({
  "on selectAll(div)": {
    topic: load("selection/style").document(),
    "on a page with a few divs": {
      topic: function(d3) {
        return d3.select("body").selectAll("div").data([0, 1]).enter().append("div");
      },
      "sets a property as a string": function(div) {
        div.style("background-color", "red");
        assert.equal(div[0][0].style.getPropertyValue("background-color"), "red");
        assert.equal(div[0][1].style.getPropertyValue("background-color"), "red");
      },
      "sets a property as a number": function(div) {
        div.style("opacity", .5);
        assert.equal(div[0][0].style.getPropertyValue("opacity"), "0.5");
        assert.equal(div[0][1].style.getPropertyValue("opacity"), "0.5");
      },
      "sets a property as a function": function(div) {
        div.style("background-color", _.interpolateRgb("orange", "yellow"));
        assert.equal(div[0][0].style.getPropertyValue("background-color"), "rgb(255, 165, 0)");
        assert.equal(div[0][1].style.getPropertyValue("background-color"), "rgb(255, 255, 0)");
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
        assert.equal(div[0][0].style.getPropertyValue("background-color"), "");
        assert.equal(div[0][1].style.getPropertyValue("background-color"), "");
      },
      "removes a property as a function": function(div) {
        div.style("background-color", "red").style("background-color", function() { return null; });
        assert.equal(div[0][0].style.getPropertyValue("background-color"), "");
        assert.equal(div[0][1].style.getPropertyValue("background-color"), "");
      },
      "returns the current selection": function(div) {
        assert.isTrue(div.style("background-color", "green") === div);
      },
      "ignores null nodes": function(div) {
        var node = div[0][1];
        div[0][1] = null;
        div.style("background-color", null).style("background-color", "red");
        assert.equal(div[0][0].style.getPropertyValue("background-color"), "red");
        assert.equal(node.style.getPropertyValue("background-color"), "green");
      }
    }
  }
});

suite.export(module);
