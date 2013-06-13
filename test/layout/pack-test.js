var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.layout.pack");

suite.addBatch({
  "pack": {
    topic: load("layout/pack").expression("d3.layout.pack"),
    "can handle an empty children array": function(pack) {
      var p = pack();
      assert.deepEqual(p.nodes({children: [{children: []}, {value: 1}]}).map(layout), [
        {value: 1, depth: 0, x: 0.5, y: 0.5, r: 0.5},
        {value: 0, depth: 1, x: 0.0, y: 0.5, r: 0.0},
        {value: 1, depth: 1, x: 0.5, y: 0.5, r: 0.5}
      ]);
    },
    "can handle zero-valued nodes": function(pack) {
      var p = pack();
      assert.deepEqual(p.nodes({children: [{value: 0}, {value: 1}]}).map(layout), [
        {value: 1, depth: 0, x: 0.5, y: 0.5, r: 0.5},
        {value: 0, depth: 1, x: 0.0, y: 0.5, r: 0.0},
        {value: 1, depth: 1, x: 0.5, y: 0.5, r: 0.5}
      ]);
    },
    "can handle small nodes": function(pack) {
      assert.deepEqual(pack().sort(null).nodes({children: [
        {value: .01},
        {value: 2},
        {value: 2},
        {value: 1}
      ]}).map(layout), [
        {y: 0.5, x: 0.5, value: 5.01, r: 0.5, depth: 0},
        {y: 0.5084543199854831, x: 0.4682608366855136, value: 0.01, r: 0.016411496513964046, depth: 1},
        {y: 0.5084543199854831, x: 0.7167659426883449, value: 2, r: 0.23209360948886723, depth: 1},
        {y: 0.34256315498862167, x: 0.2832340573116551, value: 2, r: 0.23209360948886723, depth: 1},
        {y: 0.7254154893606051, x: 0.38524055061025186, value: 1, r: 0.16411496513964044, depth: 1}
      ]);
      assert.deepEqual(pack().sort(null).nodes({children: [
        {value: 2},
        {value: 2},
        {value: 1},
        {value: .01}
      ]}).map(layout), [
        {y: 0.5, x: 0.5, value: 5.01, r: 0.5, depth: 0},
        {y: 0.6274712284943809, x: 0.26624891409386664, value: 2, r: 0.23375108590613333, depth: 1},
        {y: 0.6274712284943809, x: 0.7337510859061334, value: 2, r: 0.23375108590613333, depth: 1},
        {y: 0.30406466355343187, x: 0.5, value: 1, r: 0.1652869779539461, depth: 1},
        {y: 0.3878967195987758, x: 0.3386645534068854, value: 0.01, r: 0.01652869779539461, depth: 1}
      ]);
    },
    "can handle residual floating point error": function(pack) {
      var p = pack();
      var result = p.nodes({children: [
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
      var p = pack();
      var result = p({children: [
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
    },
    "radius defaults to automatic scaling": function(pack) {
      assert.equal(pack().radius(), null);
    },
    "radius can be specified using a custom function of value": function(pack) {
      var p = pack().radius(function(value) { return Math.sqrt(value) * 10; });
      assert.deepEqual(p.nodes({children: [{value: 1}]}).map(layout), [
        {value: 1, depth: 0, x: 0.5, y: 0.5, r: 10},
        {value: 1, depth: 1, x: 0.5, y: 0.5, r: 10}
      ]);
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
