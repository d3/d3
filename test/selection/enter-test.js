var vows = require("vows"),
    d3 = require("../../"),
    load = require("../load"),
    assert = require("../env-assert"),
    document = d3.selection().node()._ownerDocument,
    window = document.defaultView;

var suite = vows.describe("selection.enter");

suite.addBatch({
  "selectAll(div)": {
    topic: load("selection/call").sandbox({
      document: document,
      window: window
    }),
    "is an instanceof d3.selection.enter": function(d3) {
      var enter = d3.select("body").html("").selectAll("div").data([0, 1]).enter();
      assert.instanceOf(enter, d3.selection.enter);
    },
    "selection prototype can be extended": function(d3) {
      var enter = d3.select("body").html("").selectAll("div").data([0, 1]).enter();
      d3.selection.enter.prototype.foo = function() { return this.append("foo"); };
      var selection = enter.foo();
      assert.equal(document.body.innerHTML, "<foo></foo><foo></foo>");
      delete d3.selection.enter.prototype.foo;
    }
  }
});

suite.export(module);
