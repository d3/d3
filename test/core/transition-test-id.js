require("../env");
require("../../d3");

var assert = require("assert");

module.exports = {
  topic: function() {
    return d3.select("body").append("div").transition();
  },
  "has a positive integer id": function(transition) {
    var id = transition.id;
    assert.isTrue(id > 0);
    assert.equal(~~id, id);
  },
  "increases monotonically across transitions": function(transition) {
    var t0 = d3.select("body").append("div").transition(),
        t1 = d3.select("body").append("div").transition();
    assert.isTrue(t1.id > t0.id);
  }
};
