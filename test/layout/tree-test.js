var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.layout.tree");


suite.addBatch({
  "tree": {
    topic: load("layout/tree").expression("d3.layout.tree"),
    "computes a simple tree layout": function(tree) {
      var t = tree();
      assert.deepEqual(t.nodes({
        name: "1",
        children: [
          {name: "1-1"},
          {name: "1-2"},
          {name: "1-3"}
        ]
      }).map(layout), [
        {name: "1",   depth: 0, x: 0.5, y: 0},
        {name: "1-1", depth: 1, x: 0.16666666666666666, y: 1},
        {name: "1-2", depth: 1, x: 0.5, y: 1},
        {name: "1-3", depth: 1, x: 0.8333333333333333, y: 1}
      ]);
    },
    "can handle an empty children array": function(tree) {
      var t = tree();
      assert.deepEqual(t.nodes({children: []}).map(layout), [
        {depth: 0, x: 0.5, y: 0}
      ]);
      assert.deepEqual(t.nodes({children: [
        {children: []},
        {children: [{}]},
        {children: [{}]}
      ]}).map(layout), [
        {depth: 0, x: .5,   y: 0},
        {depth: 1, x: .125, y: 0.5},
        {depth: 1, x: .375, y: 0.5},
        {depth: 2, x: .375, y: 1},
        {depth: 1, x: .875, y: 0.5},
        {depth: 2, x: .875, y: 1}
      ]);
    },
    "can handle a single node": function(tree) {
      var t = tree();
      assert.deepEqual(t.nodes({}).map(layout), [
        {depth: 0, x: 0.5, y: 0}
      ]);
    },

    "can layout a tree, using all defaults": function(tree) {
      var t = tree();
      layoutEqual(
        t.nodes(clone(treedata)).map(layout), 
        [
          { name: "root",  depth: 0, x: 0.55, y: 0, },
          { name: "long",  depth: 1, x: 0.3,  y: 0.5, },
          { name: "leaf0", depth: 2, x: 0.2,  y: 1, },
          { name: "leaf1", depth: 2, x: 0.4,  y: 1, },
          { name: "short", depth: 1, x: 0.8,  y: 0.5, },
          { name: "leaf2", depth: 2, x: 0.8,  y: 1, },
        ]
      );
    },

    "can layout a tree with fixed node width": function(tree) {
      var t = tree().nodeSize([2, 2]);
      layoutEqual(
        t.nodes(clone(treedata)).map(layout), 
        [
          { name: "root",  width: 1, depth: 0, x:  0,   y: 0, },
          { name: "long",  width: 3, depth: 1, x: -2.5, y: 2, },
          { name: "leaf0", width: 1, depth: 2, x: -3.5, y: 4, },
          { name: "leaf1", width: 1, depth: 2, x: -1.5, y: 4, },
          { name: "short", width: 1, depth: 1, x:  2.5, y: 2, },
          { name: "leaf2", width: 1, depth: 2, x:  2.5, y: 4, },
        ]
      );
    },

    "can layout a more complex tree, using separation": function(tree) {
      var t = tree().separation(function() { return 1; });
      layoutEqual(
        t.nodes(clone(treedata)).map(layout), 
        [
          { name: "root",  depth: 0, x:  7/12, y: 0, },
          { name: "long",  depth: 1, x:  4/12,  y: 0.5, },
          { name: "leaf0", depth: 2, x:  2/12,  y: 1, },
          { name: "leaf1", depth: 2, x:  6/12,  y: 1, },
          { name: "short", depth: 1, x: 10/12,  y: 0.5, },
          { name: "leaf2", depth: 2, x: 10/12,  y: 1, },
        ]
      );
    },

    "can use size to scale entire drawing, with custom separation": 
    function(tree) {
      var t = tree()
        .size([10, 10])
        .separation(function() { return 1; });
      layoutEqual(
        t.nodes(clone(treedata)).map(layout), 
        [
          { name: "root",  depth: 0, x:  70/12, y:  0, },
          { name: "long",  depth: 1, x:  40/12, y:  5, },
          { name: "leaf0", depth: 2, x:  20/12, y: 10, },
          { name: "leaf1", depth: 2, x:  60/12, y: 10, },
          { name: "short", depth: 1, x: 100/12, y:  5, },
          { name: "leaf2", depth: 2, x: 100/12, y: 10, },
        ]
      );
    },

    "can use nodeSize to specify node size, with custom separation": 
    function(tree) {
      var t = tree()
        .nodeSize([10, 10])
        .separation(function(a, b) { return a.parent == b.parent ? 1: 1.5; });
      layoutEqual(
        t.nodes(clone(treedata)).map(layout), 
        [
          { name: "root",  depth: 0, x:   0, y:  0, },
          { name: "long",  depth: 1, x: -10, y: 10, },
          { name: "leaf0", depth: 2, x: -15, y: 20, },
          { name: "leaf1", depth: 2, x:  -5, y: 20, },
          { name: "short", depth: 1, x:  10, y: 10, },
          { name: "leaf2", depth: 2, x:  10, y: 20, },
        ]
      );
    },

    // test08
    "can layout a tree with variable node size, zero spacing": 
    function(tree) {
      var layout_engine = tree()
        .nodeSize(function(n) {return [n.x_size, n.y_size]})
        .spacing(function(n) {return 0;});
      var t = clone(tree_h);
      layout_engine.nodes(t);
      assert.ok(tree_equals(t, test08_expected),
        "layout not what was expected");
    },

    // test30
    "can layout a tree with variable node size, custom spacing":
    function(tree) {
      var layout_engine = tree()
        .nodeSize(function(n) {return [n.x_size, n.y_size]})
        .spacing(function(a, b) {
          return a.parent == b.parent ? 
            0 : layout_engine.rootXSize();
        });
      var t = clone(tree_h);
      layout_engine.nodes(t);
      assert.ok(tree_equals(t, test30_expected),
        "layout not what was expected");
    }

  }
});

function layout(node) {
  delete node.children;
  delete node.parent;
  delete node.width;
  return node;
}

function clone(obj) {
  if (obj == null || typeof obj != "object") return obj;
  if (obj instanceof Array) {
    return obj.map(function(e) { return clone(e); });
  }
  var n = {};
  Object.keys(obj).forEach(function(k) {
    n[k] = clone(obj[k]);
  });
  return n;
}

function layoutEqual(actual, expected) {
    assert.equal(actual.length, expected.length, "node length mismatch");
    for (var i = 0; i < actual.length; ++i) {
        var a = actual[i],
            e = expected[i];
        assert.equal(a.name, e.name, "node #" + i + " name mismatch");
        assert.equal(a.depth, e.depth, "node #" + i + " depth mismatch");
        assertAlmostEqual(a.x, e.x, "node #" + i + " x");
        assertAlmostEqual(a.y, e.y, "node #" + i + " y");
    }
}

function assertAlmostEqual(a, e, m) {
    assert.ok(
        (a == 0 && e == 0) || Math.abs((a-e)/a) < 0.0000001,
        m + " mismatch; actual: " + a + ", expected: " + e
    );
}

function almost_equals(a, b) {
  if (a == 0 && b == 0) return true;
  return ( Math.abs((b-a) / (b+a)) < 0.000000000001 );
}

function tree_equals(a, b) {
  if (!almost_equals(a.x, b.x) || !almost_equals(a.y, b.y)) return false;

  var a_num_children = a.children ? a.children.length : 0;
  var b_num_children = b.children ? b.children.length : 0;
  if (a_num_children != b_num_children) return false;
  if (a_num_children > 0) {
    if (a.children.length != b.children.length) return false;
    var i;
    for (i = 0; i < a.children.length; ++i) {
      if (!tree_equals(a.children[i], b.children[i])) return false;
    }
  }
  return true;
}

var treedata = {
  "name": "root",
  "width": 1,
  "children": [
    { "name": "long",
      "width": 3,
      "children": [
        { "name": "leaf0",
          "width": 1, },
        { "name": "leaf1",
          "width": 1, }
      ]
    },
    { "name": "short",
      "width": 1,
      "children": [
        { "name": "leaf2",
          "width": 1, }
      ]
    }
  ]
};

var tree_h = {
    "x_size": 30,
    "y_size": 30,
    "children": [
        {
            "x_size": 30,
            "y_size": 60,
            "children": [
                {
                    "x_size": 150,
                    "y_size": 30
                }
            ]
        },
        {
            "x_size": 30,
            "y_size": 30
        },
        {
            "x_size": 30,
            "y_size": 60
        },
        {
            "x_size": 30,
            "y_size": 30
        },
        {
            "x_size": 30,
            "y_size": 30
        },
        {
            "x_size": 30,
            "y_size": 30,
            "children": [
                {
                    "x_size": 150,
                    "y_size": 30,
                    "children": [
                        {
                            "x_size": 150,
                            "y_size": 30
                        },
                        {
                            "x_size": 150,
                            "y_size": 30
                        }
                    ]
                },
                {
                    "x_size": 150,
                    "y_size": 30
                }
            ]
        }
    ]
};

var test08_expected = {
  "x" : 0.0,
  "y" : 0.0,
  "children" : [ {
    "x" : -150.0,
    "y" : 30.0,
    "children" : [ {
      "x" : -150.0,
      "y" : 90.0
    } ]
  }, {
    "x" : -105.0,
    "y" : 30.0
  }, {
    "x" : -60.0,
    "y" : 30.0
  }, {
    "x" : 10.0,
    "y" : 30.0
  }, {
    "x" : 80.0,
    "y" : 30.0
  }, {
    "x" : 150.0,
    "y" : 30.0,
    "children" : [ {
      "x" : 75.0,
      "y" : 60.0,
      "children" : [ {
        "x" : 0.0,
        "y" : 90.0
      }, {
        "x" : 150.0,
        "y" : 90.0
      } ]
    }, {
      "x" : 225.0,
      "y" : 60.0
    } ]
  } ]
};

var test30_expected = {
  "x" : 0.0,
  "y" : 0.0,
  "children" : [ {
    "x" : -165.0,
    "y" : 30.0,
    "children" : [ {
      "x" : -165.0,
      "y" : 90.0
    } ]
  }, {
    "x" : -120.0,
    "y" : 30.0
  }, {
    "x" : -75.0,
    "y" : 30.0
  }, {
    "x" : 5.0,
    "y" : 30.0
  }, {
    "x" : 85.0,
    "y" : 30.0
  }, {
    "x" : 165.0,
    "y" : 30.0,
    "children" : [ {
      "x" : 90.0,
      "y" : 60.0,
      "children" : [ {
        "x" : 15.0,
        "y" : 90.0
      }, {
        "x" : 165.0,
        "y" : 90.0
      } ]
    }, {
      "x" : 240.0,
      "y" : 60.0
    } ]
  } ]
};

suite.export(module);


