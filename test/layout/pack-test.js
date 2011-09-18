require("../env");
require("../../d3");
require("../../d3.layout");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.layout.pack");

suite.addBatch({
  "pack": {
    topic: d3.layout.pack,
    "can handle an empty children array": function(pack) {
      assert.deepEqual(pack.nodes({children: [{children: []}, {value: 1}]}).map(layout), [
        {value: 1, depth: 0, x: 0.5, y: 0.5, r: 0.5},
        {value: 0, depth: 1, x: 0.0, y: 0.5, r: 0.0},
        {value: 1, depth: 1, x: 0.5, y: 0.5, r: 0.5}
      ]);
    },
    "can handle zero-valued nodes": function(pack) {
      assert.deepEqual(pack.nodes({children: [{value: 0}, {value: 1}]}).map(layout), [
        {value: 1, depth: 0, x: 0.5, y: 0.5, r: 0.5},
        {value: 0, depth: 1, x: 0.0, y: 0.5, r: 0.0},
        {value: 1, depth: 1, x: 0.5, y: 0.5, r: 0.5}
      ]);
    },
    "can handle residual floating point error": function(pack) {
      var result = pack.nodes({children: [
        {value: 0.005348322447389364},
        {value: 0.8065882022492588},
        {value: 0}
      ]}).map(layout);
      assert.isFalse(result.map(function(d) { return d.depth; }).some(isNaN));
      assert.isFalse(result.map(function(d) { return d.value; }).some(isNaN));
      assert.isFalse(result.map(function(d) { return d.x; }).some(isNaN));
      assert.isFalse(result.map(function(d) { return d.y; }).some(isNaN));
      assert.isFalse(result.map(function(d) { return d.r; }).some(isNaN));
    },
    "avoids coincident circles": function(pack) {
      var result = pack({children: [
        {children: [{value: 17010}, {value: 5842}, {value: 0}, {value: 0}]},
        {children: [
          {children: [{value: 721}, {value: 4294}, {value: 9800}, {value: 1314}, {value: 2220}]},
          {value: 1759}, {value: 2165}, {value: 586}, {value: 3331}, {value: 772}, {value: 3322}
        ]}
      ]}).map(layout);
      result.sort(function(a, b) {
        return a.x < b.x && a.y < b.y ? -1 : 1;
      });
      assert.isFalse(result.slice(1).some(function(d, i) {
        return d.x === result[i].x && d.y === result[i].y && d.value > 0;
      }));
    }
  }
});

function layout(node) {
  return {
    value: node.value,
    depth: node.depth,
    r: node.r,
    x: node.x,
    y: node.y
  };
}

suite.export(module);
