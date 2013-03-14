var vows = require("vows"),
    d3 = require("../../"),
    load = require("../load"),
    assert = require("../env-assert"),
    document = d3.selection().node()._ownerDocument,
    window = document.defaultView;

var suite = vows.describe("selection.filter");

suite.addBatch({
  "selectAll(div)": {
    topic: load("selection/filter").sandbox({
      document: document,
      window: window
    }),
    "on a simple page": {
      topic: function(d3) {
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
    },
    "ignores null nodes": function(d3) {
      d3.select("body").html("").selectAll("div")
          .data([0, 1])
        .enter().append("div")
        .selectAll("span")
          .data(function(d) { d <<= 1; return [d, d + 1]; })
        .enter().append("span");
      var span = d3.selectAll("span");
      span[0][1] = null;
      var some = span.filter(function(d, i) { return d & 1; });
      assert.isTrue(some[0][0] === span[0][3]);
      assert.equal(some.length, 1);
    }
  }
});

suite.export(module);
