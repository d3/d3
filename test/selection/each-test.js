var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("selection.each");

suite.addBatch({
  "select(body)": {
    topic: load("selection/each").document(),
    "on a simple page": {
      topic: function(d3) {
        return d3.select("body");
      },
      "calls the function once per element": function(body) {
        var count = 0;
        body.each(function() { ++count; });
        assert.equal(count, 1);
      },
      "passes the data and index to the function": function(body) {
        var data = new Object(), dd, ii;
        body.data([data]).each(function(d, i) { dd = d; ii = i; });
        assert.isTrue(dd === data);
        assert.isTrue(ii === 0);
      },
      "uses the node as the context": function(body) {
        var node;
        body.each(function() { node = this; });
        assert.isTrue(node === body.node());
      },
      "returns the same selection": function(body) {
        assert.isTrue(body.each(function() {}) === body);
      },
      "returns the current selection": function(body) {
        assert.isTrue(body.each(function() {}) === body);
      },
      "ignores null nodes": function(body) {
        var count = 0;
        body[0][0] = null;
        body.each(function() { ++count; });
        assert.equal(count, 0);
      }
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: load("selection/each").document(),
    "on a simple page": {
      topic: function(d3) {
        return d3.select("body").selectAll("div").data([0, 1]).enter().append("div");
      },
      "calls the function once per element": function(div) {
        var count = 0;
        div.each(function() { ++count; });
        assert.equal(count, 2);
      },
      "passes the data and index to the function": function(div) {
        var data = [new Object(), new Object()], dd = [], ii = [];
        div.data(data).each(function(d, i) { dd.push(d); ii.push(i); });
        assert.deepEqual(dd, data);
        assert.deepEqual(ii, [0, 1]);
      },
      "uses the node as the context": function(div) {
        var nodes = [];
        div.each(function() { nodes.push(this); });
        assert.equal(nodes.length, 2);
        assert.isTrue(div[0][0] == nodes[0]);
        assert.isTrue(div[0][1] == nodes[1]);
      },
      "returns the same selection": function(div) {
        assert.isTrue(div.each(function() {}) === div);
      },
      "returns the current selection": function(div) {
        assert.isTrue(div.each(function() {}) === div);
      },
      "ignores null nodes": function(div) {
        var count = 0;
        div[0][0] = null;
        div.each(function() { ++count; });
        assert.equal(count, 1);
      }
    }
  }
});

suite.export(module);
