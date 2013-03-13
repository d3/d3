require("../env");

var assert = require("../env-assert");

module.exports = {
  topic: function() {
    return d3.select("body").append("div").transition()
        .delay(101)
        .duration(152)
        .ease("bounce");
  },

  "starts immediately after the previous transition ends": function(t1) {
    var t2 = t1.transition();
    assert.equal(t2[0][0].__transition__[t2.id].delay, 253);
  },
  "inherits the previous transition's duration": function(t1) {
    var t2 = t1.transition();
    assert.equal(t2[0][0].__transition__[t2.id].duration, 152);
  },
  "inherits easing": function(t1) {
    // TODO how to test this?
  },
  "gets a new transition id": function(t1) {
    var t2 = t1.transition();
    assert.isTrue(t2.id > t1.id);
  },

  "while transitioning": {
    topic: function(t1) {
      var t2 = t1.transition(),
          cb = this.callback;
      t2.each("start", function() {
        d3.timer(function() {
          cb(null, t2);
          return true;
        });
      });
    },
    "increments the lock's reference count": function(t2) {
      assert.isTrue(t2[0][0].__transition__.count > 1);
    }
  },

  "after transitioning": {
    topic: function(t1) {
      var cb = this.callback;
      var t2 = t1.transition();
      t2.each("end", function() {
        d3.timer(function() {
          cb(null, t2);
          return true;
        }, 50);
      });
    },
    "decrements the lock's reference count": function(t2) {
      assert.isFalse("__transition__" in t2[0][0]);
    }
  }
};
