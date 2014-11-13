var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.layout.pie");

function round(n) {
    return Math.round(n * 1000000000000) / 1000000000000;
}

suite.addBatch({
  "pie": {
    topic: load("layout/pie").expression("d3.layout.pie"),
    "arcs are in same order as original data": function(pie) {
      var p = pie();
      assert.deepEqual(p([5, 30, 15]).map(function(d) { return d.data; }), [
        5, 30, 15
      ]);
      assert.deepEqual(p([
        84, 90, 48, 61, 58, 8, 6, 31, 45, 18
      ]).map(function(d) { return d.data; }), [
        84, 90, 48, 61, 58, 8, 6, 31, 45, 18
      ]);
    },
    "can compute arcs for circle without padding": function(pie) {
      var dataDeg = 2*Math.PI;
      var p = pie()
          .sort(null);
      assert.deepEqual(p([5, 30, 15]).map(function(d) { return {s: round(d.startAngle), e: round(d.endAngle)}; }), [
        {
          s: 0,
          e: round(5/50 * dataDeg)
        },
        {
          s: round(5/50 * dataDeg),
          e: round(35/50 * dataDeg)
        },
        {
          s: round(35/50 * dataDeg),
          e: round(dataDeg)
        }
      ]);
    },
    "can layout padding after each arc in a circle": function(pie) {
      var padding = 0.1;
      var dataDeg = 2*Math.PI - 3*padding;
      var p = pie()
          .sort(null)
          .padding(padding);
      assert.deepEqual(p([5, 30, 15]).map(function(d) { return {s: round(d.startAngle), e: round(d.endAngle)}; }), [
        {
          s: 0,
          e: round(5/50 * dataDeg)
        },
        {
          s: round(5/50 * dataDeg + padding),
          e: round(35/50 * dataDeg + padding)
        },
        {
          s: round(35/50 * dataDeg + 2*padding),
          e: round(2*Math.PI - padding)
        }
      ]);
    },
    "can ignore padding when there is only one arc": function(pie) {
      var p = pie()
          .sort(null)
          .padding(0.5);
      assert.deepEqual(p([5]).map(function(d) { return {s: round(d.startAngle), e: round(d.endAngle)}; }), [
        {
          s: 0,
          e: round(2*Math.PI)
        }
      ]);
    },
    "can return empty array when there are no arcs": function(pie) {
      var p = pie()
          .sort(null)
          .padding(0.5);
      assert.deepEqual(p([]), []);
    },
    "can layout spaces after each arc except the last one in a semicircle": function(pie) {
      var padding = 0.1;
      var dataDeg = Math.PI - 2*padding;
      var p = pie()
          .sort(null)
          .endAngle(Math.PI)
          .padding(padding);
      assert.deepEqual(p([5, 30, 15]).map(function(d) { return {s: round(d.startAngle), e: round(d.endAngle)}; }), [
        {
          s: 0,
          e: round(5/50 * dataDeg)
        },
        {
          s: round(5/50 * dataDeg + padding),
          e: round(35/50 * dataDeg + padding)
        },
        {
          s: round(35/50 * dataDeg + 2*padding),
          e: round(Math.PI)
        }
      ]);
    }
  }
});

suite.export(module);
