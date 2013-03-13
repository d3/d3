require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("selection.order");

suite.addBatch({
  "selectAll(div)": {
    topic: function() {
      return d3.select("body").html("").selectAll("div")
          .data([1, 2, 10, 20])
        .enter().append("div")
          .attr("id", String);
    },
    "orders elements by data": function(div) {
      div = div.data([1, 10, 20, 2], String).order();
      assert.domNull(div[0][0].previousSibling);
      assert.domEqual(div[0][1].previousSibling, div[0][0]);
      assert.domEqual(div[0][2].previousSibling, div[0][1]);
      assert.domEqual(div[0][3].previousSibling, div[0][2]);
      assert.domNull(div[0][3].nextSibling);
    },
    "returns the current selection": function(span) {
      span = d3.select("body"); // https://github.com/tmpvar/jsdom/issues/277
      assert.isTrue(span.order() === span);
    }
  }
});

suite.export(module);
