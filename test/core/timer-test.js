require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.timer");

suite.addBatch({
  "timer": {
    topic: function() {
      return d3.timer;
    },
    "with no delay": {
      topic: timer(),
      "first calls after 17 ms or less": function(info) {
        assert.inDelta(info.start - info.scheduled, 17, 20);
      },
      "calls until the function returns true": function(info) {
        assert.equal(info.count, 4);
      },
      "calls every 17 ms": function(info) {
        assert.inDelta(info.stop - info.start, 17 * 3, 20);
      }
    },
    "with a specified delay": {
      topic: timer(250),
      "first calls after the delay": function(info) {
        assert.inDelta(info.start - info.scheduled, 250, 20);
      },
      "calls until the function returns true": function(info) {
        assert.equal(info.count, 4);
      },
      "calls every 17 ms": function(info) {
        assert.inDelta(info.stop - info.start, 17 * 3, 20);
      }
    }
  }
});

function timer(delay) {
  var args = Array.prototype.slice.call(arguments);
  return function() {
    var cb = this.callback,
        info = {scheduled: Date.now(), count: 0};

    args.unshift(function() {
      var count = ++info.count;
      if (count === 1) {
        info.start = Date.now();
      } else if (count === 4) {
        info.stop = Date.now();
        cb(null, info);
        return true;
      }
    });

    d3.timer.apply(this, args);
  };
}

suite.export(module);
