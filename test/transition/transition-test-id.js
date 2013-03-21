var assert = require("../assert");

module.exports = {
  topic: function(d3) {
    return d3; // bug in vows where topic is not propagated automatically
  },
  "on a new transition": {
    topic: function(d3) {
      return d3.select("body").append("div").transition();
    },
    "has a positive integer id": function(transition) {
      var id = transition.id;
      assert.isTrue(id > 0);
      assert.equal(~~id, id);
    }
  },
  "increases monotonically across transitions": function(d3) {
    var t0 = d3.select("body").append("div").transition(),
        t1 = d3.select("body").append("div").transition();
    assert.isTrue(t1.id > t0.id);
  }
};
