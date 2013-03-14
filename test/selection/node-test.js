var vows = require("vows"),
    d3 = require("../../"),
    load = require("../load"),
    assert = require("../env-assert"),
    document = d3.selection().node()._ownerDocument,
    window = document.defaultView;

var suite = vows.describe("selection.node");

suite.addBatch({
  "select(body)": {
    topic: load("selection/node").sandbox({
      document: document,
      window: window
    }),
    "on a simple page": {
      topic: function(d3) {
        return d3.select("body").html("");
      },
      "returns null for empty selections": function(body) {
        assert.isNull(body.select("foo").node());
      },
      "returns the first element for non-empty selections": function(body) {
        assert.isTrue(body.node() === document.body);
      }
    },
    "ignores null nodes": function(d3) {
      var some = d3.select("body");
      some[0][0] = null;
      assert.isNull(some.node());
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: load("selection/node").sandbox({
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
      "returns null for empty selections": function(div) {
        assert.isNull(div.select("foo").node());
      },
      "returns the first element for non-empty selections": function(div) {
        assert.isTrue(div.node() === div[0][0]);
      },
    },
    "ignores null nodes": function(d3) {
      var body = d3.select("body").html("");
      body.append("div").append("span");
      body.append("div");
      var some = body.selectAll("div");
      some[0][0] = null;
      assert.isTrue(some.node() === some[0][1]);
    }
  }
});

suite.export(module);
