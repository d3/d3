require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.select");

suite.addBatch({
  "style": {
    topic: function() {
      return d3.select("body");
    },
    "can set a property as a string": function(body) {
      body.style("background-color", "red");
      assert.equal(body[0][0].style["background-color"], "red");
    },
    "can set a property as a number": function(body) {
      body.style("opacity", .3);
      assert.equal(body[0][0].style["opacity"], ".3");
    },
    "can set a property as a function": function(body) {
      body.style("background-color", function() { return "orange"; });
      assert.equal(body[0][0].style["background-color"], "orange");
    },
    "can get a property value": function(body) {
      body[0][0].style.setProperty("background-color", "yellow", "");
      assert.equal(body.style("background-color"), "yellow");
    },
    "observes the specified priority": function(body) {
      body.style("background-color", "green", "important");
      assert.equal(body[0][0].style.getPropertyPriority("background-color"), "important");
    }
  },
  "attr": {
    topic: function() {
      return d3.select("body");
    },
    "can set an attribute as a string": function(body) {
      body.attr("bgcolor", "red");
      assert.equal(body[0][0].getAttribute("bgcolor"), "red");
    },
    "can set an attribute as a number": function(body) {
      body.attr("opacity", 1);
      assert.equal(body[0][0].getAttribute("opacity"), "1");
    },
    "can set an attribute as a function": function(body) {
      body.attr("bgcolor", function() { return "orange"; });
      assert.equal(body[0][0].getAttribute("bgcolor"), "orange");
    },
    "can get an attribute value": function(body) {
      body[0][0].setAttribute("bgcolor", "yellow");
      assert.equal(body.attr("bgcolor"), "yellow");
    }
  }
});

suite.export(module);
