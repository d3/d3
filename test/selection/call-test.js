var vows = require("vows"),
    d3 = require("../../"),
    load = require("../load"),
    assert = require("../env-assert"),
    document = d3.selection().node()._ownerDocument,
    window = document.defaultView;

var suite = vows.describe("selection.call");

suite.addBatch({
  "select(body)": {
    topic: load("selection/call").sandbox({
      document: document,
      window: window
    }),
    "on a simple page": {
      topic: function(d3) {
        return d3.select("body").html("");
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
    topic: load("selection/call").sandbox({
      document: document,
      window: window
    }).expression("d3.select"),
    "on a simple page": {
      topic: function(select) {
        return select("body").html("").selectAll("div").data(d3.range(2)).enter().append("div");
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
