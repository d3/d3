require("../env");
require("../../d3");
require("../../d3.layout");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.layout.partition");

suite.addBatch({
  "partition": {
    topic: function() {
      return d3.layout.partition;
    },
    "ignores zero values": function(partition) {
      var p = partition().size([3, 3]);
      assert.deepEqual(p({children: [{value: 1}, {value: 0}, {value: 2}, {children: [{value: 0}, {value: 0}]}]}).map(metadata), [
        {x: 0, y: 0, dx: 3, dy: 1},
        {x: 2, y: 1, dx: 1, dy: 1},
        {x: 3, y: 1, dx: 0, dy: 1},
        {x: 0, y: 1, dx: 2, dy: 1},
        {x: 3, y: 1, dx: 0, dy: 1},
        {x: 3, y: 2, dx: 0, dy: 1},
        {x: 3, y: 2, dx: 0, dy: 1}
      ]);
    }
  }
});

function metadata(node) {
  var metadata = {};
  if ("x" in node) metadata.x = node.x;
  if ("y" in node) metadata.y = node.y;
  if ("dx" in node) metadata.dx = node.dx;
  if ("dy" in node) metadata.dy = node.dy;
  return metadata;
}

suite.export(module);
