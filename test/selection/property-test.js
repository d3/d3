var vows = require("vows"),
    _ = require("../../"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("selection.property");

suite.addBatch({
  "select(body)": {
    topic: load("selection/property").document(),
    "on a simple page": {
      topic: function(d3) {
        return d3.select("body");
      },
      "sets a property as a string": function(body) {
        body.property("bgcolor", "red");
        assert.equal(body.node().bgcolor, "red");
      },
      "sets a property as a number": function(body) {
        body.property("opacity", 1);
        assert.equal(body.node().opacity, "1");
      },
      "sets a property as a function": function(body) {
        body.property("bgcolor", function() { return "orange"; });
        assert.equal(body.node().bgcolor, "orange");
      },
      "sets properties as a map of constants": function(body) {
        body.property({bgcolor: "purple", opacity: .41});
        assert.equal(body.node().bgcolor, "purple");
        assert.equal(body.node().opacity, .41);
      },
      "sets properties as a map of functions": function(body) {
        body.data(["cyan"]).property({bgcolor: String, opacity: function(d, i) { return i; }});
        assert.equal(body.node().bgcolor, "cyan");
        assert.equal(body.node().opacity, 0);
      },
      "gets a property value": function(body) {
        body.node().bgcolor = "yellow";
        assert.equal(body.property("bgcolor"), "yellow");
      },
      "removes a property as null": function(body) {
        body.property("bgcolor", "yellow").property("bgcolor", null);
        assert.isFalse("bgcolor" in body.node());
      },
      "removes a property as a function": function(body) {
        body.property("bgcolor", "yellow").property("bgcolor", function() { return null });
        assert.isFalse("bgcolor" in body.node());
      },
      "removes properties as a map of nulls": function(body) {
        body.node().bgcolor = "red";
        body.property({bgcolor: null});
        assert.isFalse("bgcolor" in body.node());
      },
      "removes properties as a map of functions that return null": function(body) {
        body.node().bgcolor = "red";
        body.property({bgcolor: function() {}});
        assert.isFalse("bgcolor" in body.node());
      },
      "returns the current selection": function(body) {
        assert.isTrue(body.property("bgcolor", "yellow") === body);
      }
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: load("selection/property").document(),
    "on a simple page": {
      topic: function(d3) {
        return d3.select("body").html("").selectAll("div").data([0, 1]).enter().append("div");
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
        div.property("bgcolor", _.interpolateRgb("brown", "steelblue"));
        assert.equal(div[0][0].bgcolor, "#a52a2a");
        assert.equal(div[0][1].bgcolor, "#4682b4");
      },
      "gets a property value": function(div) {
        div[0][0].bgcolor = "purple";
        assert.equal(div.property("bgcolor"), "purple");
      },
      "removes a property as null": function(div) {
        div.property("bgcolor", "yellow").property("bgcolor", null);
        assert.isFalse("bgcolor" in div[0][0]);
        assert.isFalse("bgcolor" in div[0][1]);
      },
      "removes a property as a function": function(div) {
        div.property("bgcolor", "yellow").property("bgcolor", function() { return null });
        assert.isFalse("bgcolor" in div[0][0]);
        assert.isFalse("bgcolor" in div[0][1]);
      },
      "returns the current selection": function(div) {
        assert.isTrue(div.property("bgcolor", "yellow") === div);
      },
      "ignores null nodes": function(div) {
        var node = div[0][1];
        div.property("bgcolor", null);
        div[0][1] = null;
        div.property("bgcolor", "red");
        assert.equal(div[0][0].bgcolor, "red");
        assert.isFalse("bgcolor" in node);
      }
    }
  }
});

suite.export(module);
