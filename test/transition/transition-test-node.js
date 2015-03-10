var assert = require("../assert");

module.exports = {
  "with a single element selected": {
    topic: function(d3) {
      return d3.select("body").transition();
    },
    "returns null for empty subselections": function(body) {
      assert.isNull(body.select("foo").node());
    },
    "returns the selected element": function(body) {
      assert.equal(body.node().tagName, "BODY");
    },
    "returns null if no elements are slected": function(body) {
      body[0][0] = null;
      assert.isNull(body.node());
    }
  },
  "with multiple elements selected": {
    topic: function(d3) {
      var body = d3.select("body").html(null);
      body.append("div").attr("class", "first").append("span");
      body.append("div").attr("class", "second");
      return body.selectAll("div").transition();
    },
    "returns null for empty subselections": function(div) {
      assert.isNull(div.select("foo").node());
    },
    "returns the first selected element": function(div) {
      assert.equal(div.node().className, "first");
      assert.equal(div.node().tagName, "DIV");
    },
    "does not count null nodes": function(div) {
      div[0][0] = null;
      assert.equal(div.node().className, "second");
      assert.equal(div.node().tagName, "DIV");
    }
  }
};
