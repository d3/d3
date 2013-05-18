var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("selection.remove");

suite.addBatch({
  "select(body)": {
    topic: load("selection/remove").document(),
    "removes the matching elements": function(d3) {
      var div = d3.select("body").append("div");
      div.remove();
      assert.domNull(div[0][0].parentNode);
    },
    "does not remove non-matching elements": function(d3) {
      var body = d3.select("body"),
          div1 = body.append("div"),
          div2 = body.append("div");
      div1.remove();
      assert.domEqual(div2[0][0].parentNode, body.node());
    },
    "ignores null nodes": function(d3) {
      var div1 = d3.select("body").append("div"),
          div2 = div1.selectAll("div").data([0, 1]).enter().append("div"),
          node = div2[0][0];
      div2[0][0] = null;
      div2.remove();
      assert.domEqual(node.parentNode, div1.node());
      assert.domNull(div2[0][1].parentNode);
    },
    "returns the current selection": function(d3) {
      var div = d3.select("body").append("div");
      assert.isTrue(div.remove() === div);
    }
  }
});

suite.export(module);
