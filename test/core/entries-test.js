require("../env");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.entries");

suite.addBatch({
  "entries": {
    topic: function() {
      return d3.entries;
    },
    "enumerates every entry": function(entries) {
      assert.deepEqual(entries({a: 1, b: 2}), [
        {key: "a", value: 1},
        {key: "b", value: 2}
      ]);
    },
    "includes entries defined on prototypes": function(entries) {
      function abc() {
        this.a = 1;
        this.b = 2;
      }
      abc.prototype.c = 3;
      assert.deepEqual(entries(new abc()), [
        {key: "a", value: 1},
        {key: "b", value: 2},
        {key: "c", value: 3}
      ]);
    },
    "includes null or undefined values": function(entries) {
      var v = entries({a: undefined, b: null, c: NaN});
      assert.equal(v.length, 3);
      assert.deepEqual(v[0], {key: "a", value: undefined});
      assert.deepEqual(v[1], {key: "b", value: null});
      assert.equal(v[2].key, "c");
      assert.isNaN(v[2].value);
    }
  }
});

suite.export(module);
