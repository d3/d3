require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("selection.map");

suite.addBatch({
  "select(body)": {
    topic: function() {
      return d3.select("body").html("");
    },
    "updates the data according to the map function": function(body) {
      body.data([42]).map(function(d, i) { return d + i; });
      assert.equal(document.body.__data__, 42);
    },
    "returns the current selection": function(body) {
      assert.isTrue(body.map(function() { return 1; }) === body);
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: function() {
      return d3.select("body").html("").selectAll("div").data(d3.range(2)).enter().append("div");
    },
    "updates the data according to the map function": function(div) {
      div.data([42, 43]).map(function(d, i) { return d + i; });
      assert.equal(div[0][0].__data__, 42);
      assert.equal(div[0][1].__data__, 44);
    },
    "returns the current selection": function(div) {
      assert.isTrue(div.map(function() { return 1; }) === div);
    },
    "ignores null nodes": function(div) {
      var some = d3.selectAll("div").data([42, 43]);
      some[0][1] = null;
      some.map(function() { return 1; });
      assert.equal(div[0][0].__data__, 1);
      assert.equal(div[0][1].__data__, 43);
    }
  }
});

suite.export(module);
