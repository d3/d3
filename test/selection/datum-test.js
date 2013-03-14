var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("selection.datum");

suite.addBatch({
  "select(body)": {
    topic: load("selection/datum").document(),
    "on a simple page": {
      topic: function(d3) {
        return d3.select("body");
      },
      "updates the data according to the specified function": function(body) {
        body.data([42]).datum(function(d, i) { return d + i; });
        assert.equal(body.node().__data__, 42);
      },
      "updates the data to the specified constant": function(body) {
        body.datum(43);
        assert.equal(body.node().__data__, 43);
      },
      "deletes the data if the function returns null": function(body) {
        body.data([42]).datum(function() { return null; });
        assert.isFalse("__data__" in body.node());
      },
      "deletes the data if the constant is null": function(body) {
        body.data([42]).datum(null);
        assert.isFalse("__data__" in body.node());
      },
      "returns the current selection": function(body) {
        assert.isTrue(body.datum(function() { return 1; }) === body);
        assert.isTrue(body.datum(2) === body);
      },
      "with no arguments, returns the first node's datum": function(body) {
        body.data([42]);
        assert.equal(body.datum(), 42);
      }
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: load("selection/datum").document(),
    "on a simple page": {
      topic: function(d3) {
        return d3.select("body").selectAll("div").data([0, 1]).enter().append("div");
      },
      "updates the data according to the specified function": function(div) {
        div.data([42, 43]).datum(function(d, i) { return d + i; });
        assert.equal(div[0][0].__data__, 42);
        assert.equal(div[0][1].__data__, 44);
      },
      "updates the data to the specified constant": function(div) {
        div.datum(44);
        assert.equal(div[0][0].__data__, 44);
        assert.equal(div[0][1].__data__, 44);
      },
      "deletes the data if the function returns null": function(div) {
        div.datum(function() { return null; });
        assert.isFalse("__data__" in div[0][0]);
        assert.isFalse("__data__" in div[0][1]);
      },
      "deletes the data if the constant is null": function(div) {
        div.datum(null);
        assert.isFalse("__data__" in div[0][0]);
        assert.isFalse("__data__" in div[0][1]);
      },
      "returns the current selection": function(div) {
        assert.isTrue(div.datum(function() { return 1; }) === div);
        assert.isTrue(div.datum(2) === div);
      },
      "ignores null nodes": function(div) {
        var node = div[0][1];
        div[0][1] = null;
        div.datum(function() { return 1; });
        assert.equal(div[0][0].__data__, 1);
        assert.equal(node.__data__, 2);
        div.datum(43);
        assert.equal(div[0][0].__data__, 43);
        assert.equal(node.__data__, 2);
      }
    }
  }
});

suite.export(module);
