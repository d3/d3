require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.selectAll");

suite.addBatch({
  "style": {
    topic: function() {
      return d3.select("body").selectAll("div").data(d3.range(2)).enter().append("div");
    },
    "can set a property as a string": function(div) {
      div.style("background-color", "red");
      assert.equal(div[0][0].style["background-color"], "red");
      assert.equal(div[0][1].style["background-color"], "red");
    },
    "can set a property as a number": function(div) {
      div.style("opacity", .5);
      assert.equal(div[0][0].style["opacity"], ".5");
      assert.equal(div[0][1].style["opacity"], ".5");
    },
    "can set a property as a function": function(div) {
      div.style("background-color", d3.interpolateRgb("orange", "yellow"));
      assert.equal(div[0][0].style["background-color"], "rgb(255,165,0)");
      assert.equal(div[0][1].style["background-color"], "rgb(255,255,0)");
    },
    "can get a property value": function(div) {
      div[0][0].style.setProperty("background-color", "green", "");
      assert.equal(div.style("background-color"), "green");
    },
    "observes the specified priority": function(div) {
      div.style("background-color", "blue", "important");
      assert.equal(div[0][0].style.getPropertyPriority("background-color"), "important");
      assert.equal(div[0][1].style.getPropertyPriority("background-color"), "important");
    }
  }
});

suite.addBatch({
  "attr": {
    topic: function() {
      return d3.select("body").selectAll("div");
    },
    "can set an attribute as a string": function(div) {
      div.attr("bgcolor", "red");
      assert.equal(div[0][0].getAttribute("bgcolor"), "red");
      assert.equal(div[0][1].getAttribute("bgcolor"), "red");
    },
    "can set an attribute as a number": function(div) {
      div.attr("opacity", 0.4);
      assert.equal(div[0][0].getAttribute("opacity"), "0.4");
      assert.equal(div[0][1].getAttribute("opacity"), "0.4");
    },
    "can set an attribute as a function": function(div) {
      div.attr("bgcolor", d3.interpolateRgb("brown", "steelblue"));
      assert.equal(div[0][0].getAttribute("bgcolor"), "rgb(165,42,42)");
      assert.equal(div[0][1].getAttribute("bgcolor"), "rgb(70,130,180)");
    },
    "can get an attribute value": function(div) {
      div[0][0].setAttribute("bgcolor", "purple");
      assert.equal(div.attr("bgcolor"), "purple");
    }
  }
});

suite.export(module);
