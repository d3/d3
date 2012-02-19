require("../env");

var assert = require("assert");

module.exports = {
  topic: function() {
    return d3.select("body").append("div").transition()
        .delay(100)
        .duration(150)
        .ease("bounce");
  },

  "inherits the delay": function(t1) {
    var t2 = t1.transition();
    assert.equal(t2[0][0].delay, 100);
  },
  "inherits the duration": function(t1) {
    var t2 = t1.transition();
    assert.equal(t2[0][0].duration, 150);
  },
  "inherits easing": function(t1) {
    // TODO how to test this?
  },
  "inherits the transition id": function(t1) {
    var t2 = t1.transition();
    assert.equal(t2.id, t1.id);
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
      assert.isTrue(t2[0][0].node.__transition__.count > 1);
    }
  },

  "after transitioning": {
    topic: function(t1) {
      var cb = this.callback;
      t1.each("end", function() {
        d3.timer(function() {
          cb(null, t1);
          return true;
        }, 50);
      });
    },
    "decrements the lock's reference count": function(t1) {
      assert.isFalse("__transition__" in t1[0][0].node);
    }
  }
};
