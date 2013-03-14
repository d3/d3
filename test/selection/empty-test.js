var vows = require("vows"),
    d3 = require("../../"),
    load = require("../load"),
    assert = require("../env-assert"),
    document = d3.selection().node()._ownerDocument,
    window = document.defaultView;

var suite = vows.describe("selection.empty");

suite.addBatch({
  "select(body)": {
    topic: load("selection/empty").sandbox({
      document: document,
      window: window
    }),
    "on a simple page": {
      topic: function(d3) {
        return d3.select("body").html("");
      },
      "returns true for empty selections": function(body) {
        assert.isTrue(body.select("foo").empty());
      },
      "returns false for non-empty selections": function(body) {
        assert.isFalse(body.empty());
      },
    },
    "ignores null nodes": function(d3) {
      var some = d3.select("body");
      some[0][0] = null;
      assert.isTrue(some.empty());
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: load("selection/empty").sandbox({
      document: document,
      window: window
    }),
    "on a simple page": {
      topic: function(d3) {
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
      }
    },
    "ignores null nodes": function(d3) {
      var body = d3.select("body").html("");
      body.append("div").append("span");
      body.append("div");
      var some = d3.selectAll("div");
      some[0][0] = null;
      assert.isTrue(some.select("span").empty());
    }
  }
});

suite.export(module);
