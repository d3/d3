var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("selection.size");

suite.addBatch({
  "select(body)": {
    topic: load("selection/size").document(),
    "on a simple page": {
      topic: function(d3) {
        return d3.select("body");
      },
      "returns zero for empty selections": function(body) {
        assert.equal(body.select("foo").size(), 0);
      },
      "returns one for a singleton selection": function(body) {
        assert.equal(body.size(), 1);
      },
      "does not count null nodes": function(body) {
        body[0][0] = null;
        assert.equal(body.size(), 0);
      }
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: load("selection/size").document(),
    "on a simple page": {
      topic: function(d3) {
        var body = d3.select("body");
        body.append("div").append("span");
        body.append("div");
        return body.selectAll("div");
      },
      "returns null for empty selections": function(div) {
        assert.equal(div.select("foo").size(), 0);
      },
      "returns the number of non-null nodes": function(div) {
        assert.equal(div.size(), 2);
      },
      "does not count null nodes": function(div) {
        div[0][0] = null;
        assert.equal(div.size(), 1);
      }
    }
  }
});

suite.export(module);
