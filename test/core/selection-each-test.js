require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("selection.each");

suite.addBatch({
  "select(body)": {
    topic: function() {
      return d3.select("body").html("");
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
      assert.isTrue(node === document.body);
    },
    "returns the same selection": function(body) {
      assert.isTrue(body.each(function() {}) === body);
    },
    "ignores null nodes": function() {
      var count = 0, body = d3.select("body");
      body[0][0] = null;
      body.each(function() { ++count; });
      assert.equal(count, 0);
    },
    "returns the current selection": function(body) {
      assert.isTrue(body.each(function() {}) === body);
    }
  }
});

suite.addBatch({
  "selectAll(div)": {
    topic: function() {
      return d3.select("body").html("").selectAll("div").data(d3.range(2)).enter().append("div");
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
    "ignores null nodes": function(div) {
      var count = 0, some = d3.selectAll("div");
      some[0][0] = null;
      some.each(function() { ++count; });
      assert.equal(count, 1);
    },
    "returns the current selection": function(div) {
      assert.isTrue(div.each(function() {}) === div);
    }
  }
});

suite.export(module);
