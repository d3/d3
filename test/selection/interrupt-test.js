var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("selection.interrupt");

suite.addBatch({
  "interrupt": {
    topic: load("selection/interrupt").document(),
    "returns the current selection": function(d3) {
      var selection = d3.select("body").append("div");
      assert.strictEqual(selection.interrupt(), selection);
    },
    "increments the active transition": function(d3) {
      var selection = d3.select("body").append("div"),
          transition = selection.transition();
      assert.equal(selection.node().__transition__.active, 0); // transition hasn’t yet started
      d3.timer.flush();
      assert.equal(selection.node().__transition__.active, transition.id); // transition has started
      selection.interrupt();
      assert.equal(selection.node().__transition__.active, transition.id + 1); // transition was interrupted
    },
    "does nothing if there is no active transition": function(d3) {
      var selection = d3.select("body").append("div");
      assert.isUndefined(selection.node().__transition__); // no transition scheduled
      selection.interrupt();
      assert.isUndefined(selection.node().__transition__); // still no transition scheduled
    }
  }
});

suite.export(module);
