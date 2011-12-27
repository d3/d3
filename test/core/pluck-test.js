require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.pluck");

suite.addBatch({
  "pluck": {
    topic: function() {
      return d3.pluck;
    },
    "enumerates every item property": function(pluck) {
      assert.deepEqual(pluck([{a: 1, b: 2}, {a: 3, b: 4}, {a: 5}], 'a'), [1, 3, 5]);
    },
    "enumerates array items by index": function(pluck){
      assert.deepEqual(pluck([[1,2],[3,4],[5,6]], 1), [2, 4, 6]); 
    },
    "injects a default value if the property is undefined": function(pluck){
      assert.deepEqual(pluck([{a: 1, b: 2}, {a: 3}, {a: 4, b: 5}], 'b', 0), [2, 0, 5]);
    }
  }
});

suite.export(module);
