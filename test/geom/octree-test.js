var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert"),
    _ = require("../../");

var suite = vows.describe("d3.geom.octree");

suite.addBatch({
  "octree": {
    topic: load("geom/octree").expression("d3.geom.octree"),
    "the default octree layout": {
      topic: function(octree) {
        return octree();
      },
      "has no defined size": function(q) {
        assert.isNull(q.size());
      },
      "has no defined extent": function(q) {
        assert.isNull(q.extent());
      },
      "has the default x-accessor, d[0]": function(q) {
        assert.strictEqual(q.x()([42, 43, 44]), 42);
      },
      "has the default y-accessor, d[1]": function(q) {
        assert.strictEqual(q.y()([42, 43, 44]), 43);
      },
      "has the default z-accessor, d[2]": function(q) {
        assert.strictEqual(q.z()([42, 43, 44]), 44);
      },
      "can create a single-node octree with no bounds": function(q) {
        var point = [0, 0, 0],
            q = q([point]),
            n = 0;
        q.visit(function(node, x1, y1, z1, x2, y2, z2) {
          assert.deepEqual(node.point, point);
          for(var i = 0; i < 8; i++)
            assert.isUndefined(node.nodes[i]);
          assert.isTrue(node.leaf);
          ++n;
        });
        assert.strictEqual(n, 1, "number of visits");
      },
      "find locates the closest point to a given point": function(q) {
        var dx = 17, dy = 17, dz = 17,
            points = _.range(dx * dy * dz).map(function(i) { return [i % dx, (i / dx | 0) % dy, i / (dx * dy) | 0]; });
        q = q(points);
        assert.deepEqual(q.find([.1, .1, .1]), [0, 0, 0]);
        assert.deepEqual(q.find([7.5, 7.5, 7.5]), [7, 7, 7]);
        assert.deepEqual(q.find([.1, 15.9, .1]), [0, 16, 0]);
        assert.deepEqual(q.find([.1, 15.9, 15.9]), [0, 16, 16]);
        assert.deepEqual(q.find([15.9, 15.9, 15.9]), [16, 16, 16]);
      },
      "can find with accessors": function(q) {
        q.x(function(d) { return d.x; });
        q.y(function(d) { return d.y; });
        q.z(function(d) { return d.z; });

        var point = {x: 0, y: 1, z: 2, arbitrary: 27};
        q = q([point]);
        assert.deepEqual(q.find([0, 0, 0]), point);
      }
    },
    "the octree applied directly": {
      "can create a single-node octree with no bounds": function(octree) {
        var point = {x: 0, y: 0, z: 0},
            q = octree([point]),
            n = 0;
        q.visit(function(node, x1, y1, z1, x2, y2, z2) {
          assert.deepEqual(node.point, point);
          for(var i = 0; i < 8; i++)
            assert.isUndefined(node.nodes[i]);
          assert.isTrue(node.leaf);
          ++n;
        });
        assert.strictEqual(n, 1, "number of visits");
      },
      "can create an empty octree": function(octree) {
        var q = octree([], 8, 10, 12, 56, 47, 28),
            n = 0;
        q.visit(function(node, x1, y1, z1, x2, y2, z2) {
          assert.isNull(node.point);
          for(var i = 0; i < 8; i++)
            assert.isUndefined(node.nodes[i]);
          assert.isTrue(node.leaf);
          ++n;
        });
        assert.strictEqual(n, 1, "number of visits");
      },
      "squarifies the input dimensions": function(octree) {
        var ox1 = 8,
            oy1 = 10,
            oz1 = 12,
            ox2 = 56,
            oy2 = 47,
            oz2 = 28,
            q = octree([], ox1, oy1, oz1, ox2, oy2, oz2),
            n = 0;
        q.visit(function(node, x1, y1, z1, x2, y2, z2) {
          assert.strictEqual(x1, ox1);
          assert.strictEqual(y1, oy1);
          assert.strictEqual(z1, oz1);
          assert.strictEqual(x2, Math.max(ox2 - ox1, oy2 - oy1, oz2 - oz1) + x1);
          assert.strictEqual(y2, Math.max(ox2 - ox1, oy2 - oy1, oz2 - oz1) + y1);
          assert.strictEqual(z2, Math.max(ox2 - ox1, oy2 - oy1, oz2 - oz1) + z1);
          ++n;
        });
        assert.strictEqual(n, 1, "number of visits");
      },
      "with three arguments, x1 and y1 are 0,0": function(octree) {
        var dx = 56,
            dy = 47,
            dz = 28,
            q = octree([], dx, dy, dz),
            n = 0;
        q.visit(function(node, x1, y1, z1, x2, y2, z2) {
          assert.strictEqual(x1, 0);
          assert.strictEqual(y1, 0);
          assert.strictEqual(z1, 0);
          assert.strictEqual(x2, Math.max(dx, dy, dz));
          assert.strictEqual(y2, Math.max(dx, dy, dz));
          assert.strictEqual(z2, Math.max(dx, dy, dz));
          ++n;
        });
        assert.strictEqual(n, 1, "number of visits");
      },
      "visit": {
        "uses pre-order traversal": function(octree) {
          var a = {x: 100, y: 100, z: 100},
              b = {x: 200, y: 200, z: 200},
              c = {x: 300, y: 300, z: 300},
              q = octree([a, b, c], 960, 500, 640),
              expected = [
                {point: null, x1:   0, y1:   0, z1:   0, x2: 960, y2: 960, z2: 960},
                {point: null, x1:   0, y1:   0, z1:   0, x2: 480, y2: 480, z2: 480},
                {point: null, x1:   0, y1:   0, z1:   0, x2: 240, y2: 240, z2: 240},
                {point:    a, x1:   0, y1:   0, z1:   0, x2: 120, y2: 120, z2: 120},
                {point:    b, x1: 120, y1: 120, z1: 120, x2: 240, y2: 240, z2: 240},
                {point:    c, x1: 240, y1: 240, z1: 240, x2: 480, y2: 480, z2: 480}
              ];
          q.visit(function(node, x1, y1, z1, x2, y2, z2) {
            assert.deepEqual({point: node.point, x1: x1, y1: y1, z1: z1, x2: x2, y2: y2, z2: z2}, expected.shift());
            assert.equal(!!node.point, node.leaf);
          });
          assert.isEmpty(expected);
        },
        "does not recurse if the callback returns truthy": function(octree) {
          var a = {x: 100, y: 100, z: 100},
              b = {x: 700, y: 700, z: 700},
              c = {x: 800, y: 800, z: 800},
              q = octree([a, b, c], 960, 500, 640),
              n = 0;
          q.visit(function(node, x1, y1, z1, x2, y2, z2) {
            ++n;
            return x1 > 0;
          });
          assert.equal(n, 3);
        }
      }
    }
  }
});

suite.export(module);

