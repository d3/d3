require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("selection.filter");

suite.addBatch({
  "selectAll(div)": {
    topic: function() {
      return d3.select("body").html("").selectAll("div")
          .data([0, 1])
        .enter().append("div")
        .selectAll("span")
          .data(function(d) { d <<= 1; return [d, d + 1]; })
        .enter().append("span");
    },
    "preserves matching elements": function(span) {
      var some = span.filter(function(d, i) { return i === 0; });
      assert.isTrue(some[0][0] === span[0][0]);
      assert.isTrue(some[1][0] === span[1][0]);
    },
    "removes non-matching elements": function(span) {
      var some = d3.merge(span.filter(function(d, i) { return d & 1; }));
      assert.equal(some.indexOf(span[0][0]), -1);
      assert.equal(some.indexOf(span[1][0]), -1);
    },
    "preserves data": function(span) {
      var some = span.filter(function(d, i) { return d & 1; });
      assert.equal(some[0][0].__data__, 1);
      assert.equal(some[1][0].__data__, 3);
    },
    "preserves grouping": function(span) {
      var some = span.filter(function(d, i) { return d & 1; });
      assert.equal(some.length, 2);
      assert.equal(some[0].length, 1);
      assert.equal(some[1].length, 1);
    },
    "preserves parent node": function(span) {
      var some = span.filter(function(d, i) { return d & 1; });
      assert.isTrue(some[0].parentNode === span[0].parentNode);
      assert.isTrue(some[1].parentNode === span[1].parentNode);
    },
    "does not preserve index": function(span) {
      var indexes = [];
      span.filter(function(d, i) { return d & 1; }).each(function(d, i) { indexes.push(i); });
      assert.deepEqual(indexes, [0, 0]);
    },
    "ignores null nodes": function() {
      var span = d3.selectAll("span");
      span[0][1] = null;
      var some = span.filter(function(d, i) { return d & 1; });
      assert.isTrue(some[0][0] === span[0][3]);
      assert.equal(some.length, 1);
    },
    "can be specified as a selector": function(span) {
      span.classed("foo", function(d, i) { return d & 1; });
      var some = span.filter(".foo");
      assert.equal(some.length, 2);
      assert.equal(some[0].length, 1);
      assert.equal(some[1].length, 1);
    },
    "returns a new selection": function(span) {
      assert.isFalse(span.filter(function() { return 1; }) === span);
    }
  }
});

suite.export(module);
