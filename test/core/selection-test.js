require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.selection");

suite.addBatch({
  "selection": {
    topic: function() {
      return d3.selection();
    },
    "selects the document": function(selection) {
      assert.equal(selection.length, 1);
      assert.equal(selection[0].length, 1);
      assert.equal(selection[0][0], document);
    },
    "is an instanceof d3.selection": function(selection) {
      assert.isTrue(selection instanceof d3.selection);
    },
    "subselections are also instanceof d3.selection": function(selection) {
      assert.isTrue(selection.select("body") instanceof d3.selection);
      assert.isTrue(selection.selectAll("body") instanceof d3.selection);
    },
    "selection prototype can be extended": function(selection) {
      d3.selection.prototype.foo = function(v) { return this.attr("foo", v); };
      selection.select("body").foo(42);
      assert.equal(document.body.getAttribute("foo"), "42");
      delete d3.selection.prototype.foo;
    }
  }
});

suite.export(module);
