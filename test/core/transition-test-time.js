require("../env");

var assert = require("assert");

module.exports = {
  topic: function() {
    return d3.select("body").append("div").transition();
  },
  "is approximately equal to now": function(transition) {
    var time = transition.time;
    assert.inDelta(time, Date.now(), 20);
  },
  "increases monotonically across transitions": function(transition) {
    var now = Date.now, then = Date.now();
    try {
      Date.now = function() { return ++then; };
      var t0 = d3.select("body").append("div").transition(),
          t1 = d3.select("body").append("div").transition();
      assert.isTrue(t1.time > t0.time);
    } finally {
      Date.now = now;
    }
  },
  "is inherited by subtransitions": function(transition) {
    var now = Date.now, then = Date.now();
    try {
      Date.now = function() { return ++then; };
      var t0 = d3.select("body").append("div").transition(),
          t1 = t0.transition();
      assert.equal(t1.time, t0.time);
    } finally {
      Date.now = now;
    }
  }
};
