require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("selection.node");

suite.addBatch({
  "select(body)": {
    topic: function() {
      return d3.select("body").html("");
    },
    "returns null for empty selections": function(body) {
      assert.isNull(body.select("foo").node());
    },
    "returns the first element for non-empty selections": function(body) {
      assert.isTrue(body.node() === document.body);
    },
    "ignores null nodes": function(body) {
      var some = d3.select("body");
      some[0][0] = null;
      assert.isNull(some.node());
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
    "returns null for empty selections": function(div) {
      assert.isNull(div.select("foo").node());
    },
    "returns the first element for non-empty selections": function(div) {
      assert.isTrue(div.node() === div[0][0]);
    },
    "ignores null nodes": function(div) {
      var some = d3.selectAll("div");
      some[0][0] = null;
      assert.isTrue(some.node() === div[0][1]);
    }
  }
});

suite.export(module);
