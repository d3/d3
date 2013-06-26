var assert = require("../assert");

module.exports = {
  "with a single element selected": {
    topic: function(d3) {
      return d3.select("body").transition();
    },
    "returns zero for empty subselections": function(body) {
      assert.equal(body.select("foo").size(), 0);
    },
    "returns one for a singleton selection": function(body) {
      assert.equal(body.size(), 1);
    },
    "does not count null nodes": function(body) {
      body[0][0] = null;
      assert.equal(body.size(), 0);
    }
  },
  "with multiple elements selected": {
    topic: function(d3) {
      var body = d3.select("body").html(null);
      body.append("div").append("span");
      body.append("div");
      return body.selectAll("div").transition();
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
};
