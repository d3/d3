var vows = require("vows"),
    d3 = require("../../"),
    load = require("../load"),
    assert = require("../env-assert"),
    document = d3.selection().node()._ownerDocument,
    window = document.defaultView;

var suite = vows.describe("selection.remove");

suite.addBatch({
  "select(body)": {
    topic: load("selection/remove").sandbox({
      document: document,
      window: window
    }),
    "removes the matching elements": function(d3) {
      var div = d3.select("body").append("div");
      div.remove();
      assert.domNull(div[0][0].parentNode);
    },
    "does not remove non-matching elements": function(d3) {
      var div1 = d3.select("body").append("div"),
          div2 = d3.select("body").append("div");
      div1.remove();
      assert.domEqual(div2[0][0].parentNode, document.body);
    },
    "ignores null nodes": function(d3) {
      var div = d3.select("body").html("").selectAll("div").data([0, 1]).enter().append("div"),
          some = d3.selectAll("div");
      some[0][0] = null;
      some.remove();
      assert.domEqual(div[0][0].parentNode, document.body);
      assert.domNull(div[0][1].parentNode);
    },
    "returns the current selection": function(d3) {
      var div = d3.select("body").append("div");
      assert.isTrue(div.remove() === div);
    }
  }
});

suite.export(module);
