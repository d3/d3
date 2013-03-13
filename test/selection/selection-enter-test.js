require("../env");

var vows = require("vows"),
    assert = require("../env-assert");

var suite = vows.describe("selection.enter");

suite.addBatch({
  "selectAll(div)": {
    topic: function() {
      return d3.select("body").html("").selectAll("div").data(d3.range(2)).enter();
    },
    "is an instanceof d3.selection.enter": function(enter) {
      assert.instanceOf(enter, d3.selection.enter);
    },
    "selection prototype can be extended": function(enter) {
      d3.selection.enter.prototype.foo = function() { return this.append("foo"); };
      var selection = enter.foo();
      assert.equal(document.body.innerHTML, "<foo></foo><foo></foo>");
      delete d3.selection.enter.prototype.foo;
    }
  }
});

suite.export(module);
