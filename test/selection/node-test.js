var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("selection.node");

suite.addBatch({
  "select(body)": {
    topic: load("selection/node").document(),
    "on a simple page": {
      topic: function(d3) {
        return d3.select("body");
      },
      "returns null for empty selections": function(body) {
        assert.isNull(body.select("foo").node());
      },
      "returns the first element for non-empty selections": function(body) {
        assert.isTrue(body.node() === body[0][0]);
        assert.equal(body.node().tagName, "BODY");
      },
      "ignores null nodes": function(body) {
        body[0][0] = null;
        assert.isNull(body.node());
      }
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: load("selection/node").document(),
    "on a simple page": {
      topic: function(d3) {
        var body = d3.select("body");
        body.append("div").append("span");
        body.append("div");
        return body.selectAll("div");
      },
      "returns null for empty selections": function(div) {
        assert.isNull(div.select("foo").node());
      },
      "returns the first element for non-empty selections": function(div) {
        assert.isTrue(div.node() === div[0][0]);
        assert.equal(div.node().tagName, "DIV");
      },
      "ignores null nodes": function(div) {
        div[0][0] = null;
        assert.isTrue(div.node() === div[0][1]);
        assert.equal(div.node().tagName, "DIV");
      }
    }
  }
});

suite.export(module);
