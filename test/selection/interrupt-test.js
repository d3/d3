var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("selection.interrupt");

suite.addBatch({
  "interrupt": {
    topic: load("transition/transition").document(),
    "returns the current selection": function(d3) {
      var selection = d3.select("body").append("div");
      assert.strictEqual(selection.interrupt(), selection);
    },
    "interrupts the active transition": function(d3) {
      var selection = d3.select("body").append("div"),
          transition = selection.transition(),
          lock = selection.node().__transition__;
      assert.equal(lock.active, 0); // transition hasn’t yet started
      d3.timer.flush();
      assert.equal(lock.active, transition.id); // transition has started
      selection.interrupt();
      assert.greater(lock.active, transition.id); // transition was interrupted
      assert.lesser(lock.active, transition.id + 1); // future transitions not interrupted
      assert.isUndefined(selection.node().__transition__); // transition was cleared
    },
    "the interrupted transition’s tweens do not receive any further calls": function(d3) {
      var selection = d3.select("body").append("div"),
          ticks = 0,
          transition = selection.transition().tween("test", function() { return function() { ++ticks; }; });
      d3.timer.flush();
      var ticks0 = ticks;
      assert.greater(ticks0, 0);
      d3.timer.flush();
      var ticks1 = ticks;
      assert.greater(ticks, ticks0);
      selection.interrupt();
      d3.timer.flush();
      assert.equal(ticks, ticks1);
    },
    "the interrupted transition does not emit an end event": {
      topic: function(d3) {
        var callback = this.callback,
            selection = d3.select("body").append("div");

        selection.transition()
            .duration(250)
            .each("end", function() { callback(null, "fail"); });

        setTimeout(function() {
          selection.interrupt();
        }, 100);

        setTimeout(function() {
          callback(null, "success");
        }, 750);
      },
      "": function(result) {
        assert.equal(result, "success");
      }
    },
    "does not prevent a future scheduled transition": function(d3) {
      var selection = d3.select("body").append("div"),
          transition0 = selection.transition(),
          transition1 = selection.transition().delay(250);
      assert.equal(selection.node().__transition__.active, 0); // transition0 hasn’t yet started
      d3.timer.flush();
      assert.equal(selection.node().__transition__.active, transition0.id); // transition0 has started
      selection.interrupt();
      assert.ok(selection.node().__transition__.active > transition0.id); // transition0 was interrupted
      assert.ok(selection.node().__transition__.active < transition1.id); // transition1 was not interrupted
      selection.interrupt();
      assert.ok(selection.node().__transition__.active > transition0.id); // transition0 was interrupted
      assert.ok(selection.node().__transition__.active < transition1.id); // transition1 was not interrupted
    },
    "does nothing if there is no active transition": function(d3) {
      var selection = d3.select("body").append("div");
      assert.isUndefined(selection.node().__transition__); // no transition scheduled
      selection.interrupt();
      assert.isUndefined(selection.node().__transition__); // still no transition scheduled
    },
    "dispatches an interrupt event to transitions that have yet started": function(d3) {
      var started = 0,
          interrupted = 0,
          selection = d3.select("body").append("div");
      selection.transition().each("start", function() { ++started; }).each("interrupt", function() { ++interrupted; });
      d3.timer.flush();
      assert.equal(started, 1);
      selection.interrupt();
      assert.equal(interrupted, 1);
    },
    "does not dispatch an interrupt event to transitions that have not yet started": function(d3) {
      var interrupted = 0,
          selection = d3.select("body").append("div");
      selection.transition().each("interrupt", function() { ++interrupted; });
      selection.interrupt();
      assert.equal(interrupted, 0);
    },
    "does not dispatch an interrupt event to transitions that were previously interrupted": function(d3) {
      var started = 0,
          interrupted = 0,
          selection = d3.select("body").append("div");
      selection.transition().each("start", function() { ++started; }).each("interrupt", function() { ++interrupted; });
      d3.timer.flush();
      assert.equal(started, 1);
      selection.interrupt();
      assert.equal(interrupted, 1);
      selection.interrupt();
      assert.equal(interrupted, 1);
    }
  }
});

suite.export(module);
