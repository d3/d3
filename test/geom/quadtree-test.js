require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.geom.quadtree");

suite.addBatch({
  "can create an empty quadtree": function() {
    var q = d3.geom.quadtree([], 8, 10, 56, 47),
        n = 0;
    q.visit(function(node, x1, y1, x2, y2) {
      assert.isNull(node.point);
      assert.isUndefined(node[0]);
      assert.isUndefined(node[1]);
      assert.isUndefined(node[2]);
      assert.isUndefined(node[3]);
      assert.isTrue(node.leaf);
      ++n;
    });
    assert.strictEqual(n, 1, "number of visits");
  },
  "squarifies the input dimensions": function() {
    var ox1 = 8,
        oy1 = 10,
        ox2 = 56,
        oy2 = 47,
        q = d3.geom.quadtree([], ox1, oy1, ox2, oy2),
        n = 0;
    q.visit(function(node, x1, y1, x2, y2) {
      assert.strictEqual(x1, ox1);
      assert.strictEqual(y1, oy1);
      assert.strictEqual(x2, Math.max(ox2 - ox1, oy2 - oy1) + x1);
      assert.strictEqual(y2, Math.max(ox2 - ox1, oy2 - oy1) + y1);
      ++n;
    });
    assert.strictEqual(n, 1, "number of visits");
  },
  "with three arguments, x1 and y1 are 0,0": function() {
    var dx = 56,
        dy = 47,
        q = d3.geom.quadtree([], dx, dy),
        n = 0;
    q.visit(function(node, x1, y1, x2, y2) {
      assert.strictEqual(x1, 0);
      assert.strictEqual(y1, 0);
      assert.strictEqual(x2, Math.max(dx, dy));
      assert.strictEqual(y2, Math.max(dx, dy));
      ++n;
    });
    assert.strictEqual(n, 1, "number of visits");
  },
  "visit": {
    "uses pre-order traversal": function() {
      var a = {x: 100, y: 100},
          b = {x: 200, y: 200},
          c = {x: 300, y: 300},
          q = d3.geom.quadtree([a, b, c], 960, 500),
          expected = [
            {point: null, x1:   0, y1:   0, x2: 960, y2: 960},
            {point: null, x1:   0, y1:   0, x2: 480, y2: 480},
            {point: null, x1:   0, y1:   0, x2: 240, y2: 240},
            {point:    a, x1:   0, y1:   0, x2: 120, y2: 120},
            {point:    b, x1: 120, y1: 120, x2: 240, y2: 240},
            {point:    c, x1: 240, y1: 240, x2: 480, y2: 480}
          ];
      q.visit(function(node, x1, y1, x2, y2) {
        assert.deepEqual({point: node.point, x1: x1, y1: y1, x2: x2, y2: y2}, expected.shift());
        assert.equal(!!node.point, node.leaf);
      });
      assert.isEmpty(expected);
    },
    "does not recurse if the callback returns truthy": function() {
      var a = {x: 100, y: 100},
          b = {x: 700, y: 700},
          c = {x: 800, y: 800},
          q = d3.geom.quadtree([a, b, c], 960, 500),
          n = 0;
      q.visit(function(node, x1, y1, x2, y2) {
        ++n;
        return x1 > 0;
      });
      assert.equal(n, 3);
    }
  }
});

suite.export(module);
