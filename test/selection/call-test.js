var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("selection.call");

suite.addBatch({
  "select(body)": {
    topic: load("selection/call").document(),
    "on a simple page": {
      topic: function(d3) {
        return d3.select("body");
      },
      "calls the function once": function(body) {
        var count = 0;
        body.call(function() { ++count; });
        assert.equal(count, 1);
      },
      "passes any optional arguments": function(body) {
        var abc;
        body.call(function(selection, a, b, c) { abc = [a, b, c]; }, "a", "b", "c");
        assert.deepEqual(abc, ["a", "b", "c"]);
      },
      "passes the selection as the first argument": function(body) {
        var s;
        body.call(function(selection) { s = selection; });
        assert.isTrue(s === body);
      },
      "uses the selection as the context": function(body) {
        var s;
        body.call(function() { s = this; });
        assert.isTrue(s === body);
      },
      "returns the current selection": function(body) {
        assert.isTrue(body.call(function() {}) === body);
      }
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: load("selection/call").document(),
    "on a simple page": {
      topic: function(d3) {
        return d3.select("body").selectAll("div").data([0, 1]).enter().append("div");
      },
      "calls the function once": function(div) {
        var count = 0;
        div.call(function() { ++count; });
        assert.equal(count, 1);
      },
      "passes any optional arguments": function(div) {
        var abc;
        div.call(function(selection, a, b, c) { abc = [a, b, c]; }, "a", "b", "c");
        assert.deepEqual(abc, ["a", "b", "c"]);
      },
      "passes the selection as the first argument": function(div) {
        var s;
        div.call(function(selection) { s = selection; });
        assert.isTrue(s === div);
      },
      "uses the selection as the context": function(div) {
        var s;
        div.call(function() { s = this; });
        assert.isTrue(s === div);
      },
      "returns the current selection": function(div) {
        assert.isTrue(div.call(function() {}) === div);
      }
    }
  }
});

suite.export(module);
