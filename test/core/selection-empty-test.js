require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("selection.empty");

suite.addBatch({
  "select(body)": {
    topic: function() {
      return d3.select("body").html("");
    },
    "returns true for empty selections": function(body) {
      assert.isTrue(body.select("foo").empty());
    },
    "returns false for non-empty selections": function(body) {
      assert.isFalse(body.empty());
    },
    "ignores null nodes": function(body) {
      var some = d3.select("body");
      some[0][0] = null;
      assert.isTrue(some.empty());
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: function() {
      var body = d3.select("body").html("");
      body.append("div").append("span");
      body.append("div");
      return body.selectAll("div");
    },
    "returns true for empty selections": function(div) {
      assert.isTrue(div.select("foo").empty());
    },
    "returns false for non-empty selections": function(div) {
      assert.isFalse(div.empty());
      assert.isFalse(div.select("span").empty());
    },
    "ignores null nodes": function(div) {
      var some = d3.selectAll("div");
      some[0][0] = null;
      assert.isTrue(some.select("span").empty());
    }
  }
});

suite.export(module);
