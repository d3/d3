var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("selection.empty");

suite.addBatch({
  "select(body)": {
    topic: load("selection/empty").document(),
    "on a simple page": {
      topic: function(d3) {
        return d3.select("body");
      },
      "returns true for empty selections": function(body) {
        assert.isTrue(body.select("foo").empty());
      },
      "returns false for non-empty selections": function(body) {
        assert.isFalse(body.empty());
      },
      "ignores null nodes": function(body) {
        body[0][0] = null;
        assert.isTrue(body.empty());
      }
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: load("selection/empty").document(),
    "on a simple page": {
      topic: function(d3) {
        var body = d3.select("body");
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
        div[0][0] = null;
        assert.isTrue(div.select("span").empty());
      }
    }
  }
});

suite.export(module);
