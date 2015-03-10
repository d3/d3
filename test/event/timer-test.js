var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.timer");

suite.addBatch({
  "timer": {
    topic: load("event/timer").expression("d3.timer").document(),

    "with no delay": {
      topic: delay(),
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
      topic: delay(250),
      "first calls after the delay": function(info) {
        assert.inDelta(info.start - info.scheduled, 250, 20);
      },
      "calls until the function returns true": function(info) {
        assert.equal(info.count, 4);
      },
      "calls every 17 ms": function(info) {
        assert.inDelta(info.stop - info.start, 17 * 3, 20);
      }
    },

    "with multiple registered tasks": {
      topic: function(timer) {
        var callback = this.callback,
            results = [];
        timer(function() { results.push("A"); return true; });
        timer(function() { results.push("B"); return true; });
        timer(function() { results.push("C"); return true; });
        timer(function() { callback(null, results); return true; })
      },
      "invokes tasks in the order they were registered": function(results) {
        assert.deepEqual(results, ["A", "B", "C"]);
      }
    }
  }
});

function delay(delay) {
  var args = Array.prototype.slice.call(arguments);
  return function(timer) {
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

    timer.apply(this, args);
  };
}

suite.export(module);
