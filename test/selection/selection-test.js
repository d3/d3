var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.selection");

suite.addBatch({
  "selection": {
    topic: load("selection/selection").document(),
    "selects the document": function(d3) {
      var selection = d3.selection();
      assert.equal(selection.length, 1);
      assert.equal(selection[0].length, 1);
      assert.equal(selection[0][0].nodeType, 9);
    },
    "is an instanceof d3.selection": function(d3) {
      assert.instanceOf(d3.selection(), d3.selection);
    },
    "subselections are also instanceof d3.selection": function(d3) {
      assert.instanceOf(d3.selection().select("body"), d3.selection);
      assert.instanceOf(d3.selection().selectAll("body"), d3.selection);
    },
    "selection prototype can be extended": function(d3) {
      d3.selection.prototype.foo = function(v) { return this.attr("foo", v); };
      var body = d3.selection().select("body").foo(42);
      assert.equal(body.attr("foo"), "42");
      delete d3.selection.prototype.foo;
    }
  }
});

suite.export(module);
