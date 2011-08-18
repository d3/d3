require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("selection.remove");

suite.addBatch({
  "select(body)": {
    topic: function() {
      return d3.select("body");
    },
    "removes the matching elements": function(body) {
      var div = body.append("div");
      div.remove();
      assert.domNull(div[0][0].parentNode);
    },
    "does not remove non-matching elements": function(body) {
      var div1 = body.append("div"), div2 = body.append("div");
      div1.remove();
      assert.domEqual(div2[0][0].parentNode, document.body);
    },
    "ignores null nodes": function(body) {
      var div = body.html("").selectAll("div").data([0, 1]).enter().append("div"),
          some = d3.selectAll("div");
      some[0][0] = null;
      some.remove();
      assert.domEqual(div[0][0].parentNode, document.body);
      assert.domNull(div[0][1].parentNode);
    },
    "returns the current selection": function(body) {
      var div = body.append("div");
      assert.isTrue(div.remove() === div);
    }
  }
});

suite.export(module);
