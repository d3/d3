require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("selection.attr");

suite.addBatch({
  "select": {
    topic: function() {
      return d3.select("body");
    },
    "sets an attribute as a string": function(body) {
      body.attr("bgcolor", "red");
      assert.equal(body[0][0].getAttribute("bgcolor"), "red");
    },
    "sets an attribute as a number": function(body) {
      body.attr("opacity", 1);
      assert.equal(body[0][0].getAttribute("opacity"), "1");
    },
    "sets an attribute as a function": function(body) {
      body.attr("bgcolor", function() { return "orange"; });
      assert.equal(body[0][0].getAttribute("bgcolor"), "orange");
    },
    "sets an attribute as a function of data": function(body) {
      body.data(["cyan"]).attr("bgcolor", String);
      assert.equal(body[0][0].getAttribute("bgcolor"), "cyan");
    },
    "sets an attribute as a function of index": function(body) {
      body.attr("bgcolor", function(d, i) { return "orange-" + i; });
      assert.equal(body[0][0].getAttribute("bgcolor"), "orange-0");
    },
    "gets an attribute value": function(body) {
      body[0][0].setAttribute("bgcolor", "yellow");
      assert.equal(body.attr("bgcolor"), "yellow");
    }
  }
});

suite.addBatch({
  "selectAll": {
    topic: function() {
      return d3.select("body").html("").selectAll("div").data(d3.range(2)).enter().append("div");
    },
    "sets an attribute as a string": function(div) {
      div.attr("bgcolor", "red");
      assert.equal(div[0][0].getAttribute("bgcolor"), "red");
      assert.equal(div[0][1].getAttribute("bgcolor"), "red");
    },
    "sets an attribute as a number": function(div) {
      div.attr("opacity", 0.4);
      assert.equal(div[0][0].getAttribute("opacity"), "0.4");
      assert.equal(div[0][1].getAttribute("opacity"), "0.4");
    },
    "sets an attribute as a function": function(div) {
      div.attr("bgcolor", function() { return "coral"; });
      assert.equal(div[0][0].getAttribute("bgcolor"), "coral");
      assert.equal(div[0][1].getAttribute("bgcolor"), "coral");
    },
    "sets an attribute as a function of data": function(div) {
      div.attr("bgcolor", d3.interpolateRgb("brown", "steelblue"));
      assert.equal(div[0][0].getAttribute("bgcolor"), "rgb(165,42,42)");
      assert.equal(div[0][1].getAttribute("bgcolor"), "rgb(70,130,180)");
    },
    "sets an attribute as a function of index": function(div) {
      div.attr("bgcolor", function(d, i) { return "color-" + i; });
      assert.equal(div[0][0].getAttribute("bgcolor"), "color-0");
      assert.equal(div[0][1].getAttribute("bgcolor"), "color-1");
    },
    "gets an attribute value": function(div) {
      div[0][0].setAttribute("bgcolor", "purple");
      assert.equal(div.attr("bgcolor"), "purple");
    }
  }
});

suite.export(module);
