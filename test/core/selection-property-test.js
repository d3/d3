require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("selection.property");

suite.addBatch({
  "select(body)": {
    topic: function() {
      return d3.select("body").html("");
    },
    "sets a property as a string": function(body) {
      body.property("bgcolor", "red");
      assert.equal(document.body.bgcolor, "red");
    },
    "sets a property as a number": function(body) {
      body.property("opacity", 1);
      assert.equal(document.body.opacity, "1");
    },
    "sets a property as a function": function(body) {
      body.property("bgcolor", function() { return "orange"; });
      assert.equal(document.body.bgcolor, "orange");
    },
    "gets a property value": function(body) {
      document.body.bgcolor = "yellow";
      assert.equal(body.property("bgcolor"), "yellow");
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: function() {
      return d3.select("body").html("").selectAll("div").data(d3.range(2)).enter().append("div");
    },
    "sets a property as a string": function(div) {
      div.property("bgcolor", "red");
      assert.equal(div[0][0].bgcolor, "red");
      assert.equal(div[0][1].bgcolor, "red");
    },
    "sets a property as a number": function(div) {
      div.property("opacity", 0.4);
      assert.equal(div[0][0].opacity, "0.4");
      assert.equal(div[0][1].opacity, "0.4");
    },
    "sets a property as a function": function(div) {
      div.property("bgcolor", d3.interpolateRgb("brown", "steelblue"));
      assert.equal(div[0][0].bgcolor, "rgb(165,42,42)");
      assert.equal(div[0][1].bgcolor, "rgb(70,130,180)");
    },
    "gets a property value": function(div) {
      div[0][0].bgcolor = "purple";
      assert.equal(div.property("bgcolor"), "purple");
    }
  }
});

suite.export(module);
