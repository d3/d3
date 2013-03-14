var vows = require("vows"),
    _ = require("../../"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.nest");

suite.addBatch({
  "entries": {
    topic: load("arrays/nest").expression("d3.nest"),
    "returns an array of each distinct key in arbitrary order": function(nest) {
      var keys = nest()
          .key(function(d) { return d.foo; })
          .entries([{foo: 1}, {foo: 1}, {foo: 2}])
          .map(function(d) { return d.key; })
          .sort(_.ascending);
      assert.deepEqual(keys, ["1", "2"]);
    },
    "each entry is a key-values object, with values in input order": function(nest) {
      var entries = nest()
          .key(function(d) { return d.foo; })
          .entries([{foo: 1, bar: 0}, {foo: 2}, {foo: 1, bar: 1}]);
      assert.deepEqual(entries, [
        {key: "1", values: [{foo: 1, bar: 0}, {foo: 1, bar: 1}]},
        {key: "2", values: [{foo: 2}]}
      ]);
    },
    "keys can be sorted using an optional comparator": function(nest) {
      var keys = nest()
          .key(function(d) { return d.foo; }).sortKeys(_.descending)
          .entries([{foo: 1}, {foo: 1}, {foo: 2}])
          .map(function(d) { return d.key; });
      assert.deepEqual(keys, ["2", "1"]);
    },
    "values can be sorted using an optional comparator": function(nest) {
      var entries = nest()
          .key(function(d) { return d.foo; })
          .sortValues(function(a, b) { return a.bar - b.bar; })
          .entries([{foo: 1, bar: 2}, {foo: 1, bar: 0}, {foo: 1, bar: 1}, {foo: 2}]);
      assert.deepEqual(entries, [
        {key: "1", values: [{foo: 1, bar: 0}, {foo: 1, bar: 1}, {foo: 1, bar: 2}]},
        {key: "2", values: [{foo: 2}]}
      ]);
    },
    "values can be aggregated using an optional rollup": function(nest) {
      var entries = nest()
          .key(function(d) { return d.foo; })
          .rollup(function(values) { return _.sum(values, function(d) { return d.bar; }); })
          .entries([{foo: 1, bar: 2}, {foo: 1, bar: 0}, {foo: 1, bar: 1}, {foo: 2}]);
      assert.deepEqual(entries, [
        {key: "1", values: 3},
        {key: "2", values: 0}
      ]);
    },
    "multiple key functions can be specified": function(nest) {
      var entries = nest()
          .key(function(d) { return d[0]; }).sortKeys(_.ascending)
          .key(function(d) { return d[1]; }).sortKeys(_.ascending)
          .entries([[0, 1], [0, 2], [1, 1], [1, 2], [0, 2]]);
      assert.deepEqual(entries, [
        {key: "0", values: [
          {key: "1", values: [[0, 1]]},
          {key: "2", values: [[0, 2], [0, 2]]}
        ]},
        {key: "1", values: [
          {key: "1", values: [[1, 1]]},
          {key: "2", values: [[1, 2]]}
        ]}
      ]);
    },
    "the rollup function only applies to leaf values": function(nest) {
      var entries = nest()
          .key(function(d) { return d[0]; }).sortKeys(_.ascending)
          .key(function(d) { return d[1]; }).sortKeys(_.ascending)
          .rollup(function(values) { return values.length; })
          .entries([[0, 1], [0, 2], [1, 1], [1, 2], [0, 2]]);
      assert.deepEqual(entries, [
        {key: "0", values: [
          {key: "1", values: 1},
          {key: "2", values: 2}
        ]},
        {key: "1", values: [
          {key: "1", values: 1},
          {key: "2", values: 1}
        ]}
      ]);
    },
    "the value comparator only applies to leaf values": function(nest) {
      var entries = nest()
          .key(function(d) { return d[0]; }).sortKeys(_.ascending)
          .key(function(d) { return d[1]; }).sortKeys(_.ascending)
          .sortValues(function(a, b) { return a[2] - b[2]; })
          .entries([[0, 1], [0, 2, 1], [1, 1], [1, 2], [0, 2, 0]]);
      assert.deepEqual(entries, [
        {key: "0", values: [
          {key: "1", values: [[0, 1]]},
          {key: "2", values: [[0, 2, 0], [0, 2, 1]]}
        ]},
        {key: "1", values: [
          {key: "1", values: [[1, 1]]},
          {key: "2", values: [[1, 2]]}
        ]}
      ]);
    },
    "the key comparator only applies to the last-specified key": function(nest) {
      var entries = nest()
          .key(function(d) { return d[0]; }).sortKeys(_.ascending)
          .key(function(d) { return d[1]; }).sortKeys(_.descending)
          .entries([[0, 1], [0, 2], [1, 1], [1, 2], [0, 2]]);
      assert.deepEqual(entries, [
        {key: "0", values: [
          {key: "2", values: [[0, 2], [0, 2]]},
          {key: "1", values: [[0, 1]]}
        ]},
        {key: "1", values: [
          {key: "2", values: [[1, 2]]},
          {key: "1", values: [[1, 1]]}
        ]}
      ]);
      var entries = nest()
          .key(function(d) { return d[0]; }).sortKeys(_.descending)
          .key(function(d) { return d[1]; }).sortKeys(_.ascending)
          .entries([[0, 1], [0, 2], [1, 1], [1, 2], [0, 2]]);
      assert.deepEqual(entries, [
        {key: "1", values: [
          {key: "1", values: [[1, 1]]},
          {key: "2", values: [[1, 2]]}
        ]},
        {key: "0", values: [
          {key: "1", values: [[0, 1]]},
          {key: "2", values: [[0, 2], [0, 2]]}
        ]}
      ]);
    },
    "if no keys are specified, the input array is returned": function(nest) {
      var array = [new Object()];
      assert.strictEqual(nest().entries(array), array);
    }
  }
});

suite.addBatch({
  "map": {
    topic: load("arrays/nest").expression("d3.nest"),
    "returns a map of each distinct key": function(nest) {
      var map = nest()
          .key(function(d) { return d.foo; })
          .map([{foo: 1, bar: 0}, {foo: 2}, {foo: 1, bar: 1}]);
      assert.deepEqual(map, {
        "1": [{foo: 1, bar: 0}, {foo: 1, bar: 1}],
        "2": [{foo: 2}]
      });
    },
    "values can be sorted using an optional comparator": function(nest) {
      var map = nest()
          .key(function(d) { return d.foo; })
          .sortValues(function(a, b) { return a.bar - b.bar; })
          .map([{foo: 1, bar: 2}, {foo: 1, bar: 0}, {foo: 1, bar: 1}, {foo: 2}]);
      assert.deepEqual(map, {
        "1": [{foo: 1, bar: 0}, {foo: 1, bar: 1}, {foo: 1, bar: 2}],
        "2": [{foo: 2}]
      });
    },
    "values can be aggregated using an optional rollup": function(nest) {
      var map = nest()
          .key(function(d) { return d.foo; })
          .rollup(function(values) { return _.sum(values, function(d) { return d.bar; }); })
          .map([{foo: 1, bar: 2}, {foo: 1, bar: 0}, {foo: 1, bar: 1}, {foo: 2}]);
      assert.deepEqual(map, {
        "1": 3,
        "2": 0
      });
    },
    "multiple key functions can be specified": function(nest) {
      var map = nest()
          .key(function(d) { return d[0]; }).sortKeys(_.ascending)
          .key(function(d) { return d[1]; }).sortKeys(_.ascending)
          .map([[0, 1], [0, 2], [1, 1], [1, 2], [0, 2]]);
      assert.deepEqual(map, {
        "0": {
          "1": [[0, 1]],
          "2": [[0, 2], [0, 2]]
        },
        "1": {
          "1": [[1, 1]],
          "2": [[1, 2]]
        }
      });
    },
    "the rollup function only applies to leaf values": function(nest) {
      var map = nest()
          .key(function(d) { return d[0]; }).sortKeys(_.ascending)
          .key(function(d) { return d[1]; }).sortKeys(_.ascending)
          .rollup(function(values) { return values.length; })
          .map([[0, 1], [0, 2], [1, 1], [1, 2], [0, 2]]);
      assert.deepEqual(map, {
        "0": {
          "1": 1,
          "2": 2
        },
        "1": {
          "1": 1,
          "2": 1
        }
      });
    },
    "the value comparator only applies to leaf values": function(nest) {
      var map = nest()
          .key(function(d) { return d[0]; }).sortKeys(_.ascending)
          .key(function(d) { return d[1]; }).sortKeys(_.ascending)
          .sortValues(function(a, b) { return a[2] - b[2]; })
          .map([[0, 1], [0, 2, 1], [1, 1], [1, 2], [0, 2, 0]]);
      assert.deepEqual(map, {
        "0": {
          "1": [[0, 1]],
          "2": [[0, 2, 0], [0, 2, 1]]
        },
        "1": {
          "1": [[1, 1]],
          "2": [[1, 2]]
        }
      });
    },
    "if no keys are specified, the input array is returned": function(nest) {
      var array = [new Object()];
      assert.strictEqual(nest().map(array), array);
    },
    "handles keys that are built-in prototype properties": function(nest) {
      var map = nest()
          .key(String)
          .map(["hasOwnProperty"]); // but note __proto__ wouldn’t work!
      assert.deepEqual(map, {hasOwnProperty: ["hasOwnProperty"]});
    },
    "a custom map implementation can be specified": function(nest) {
      var map = nest()
          .key(String)
          .map(["hasOwnProperty", "__proto__"], _.map);
      assert.deepEqual(map.entries(), [
        {key: "hasOwnProperty", value: ["hasOwnProperty"]},
        {key: "__proto__", value: ["__proto__"]}
      ]);
    },
    "the custom map implementation works on multiple levels of nesting": function(nest) {
      var map = nest()
          .key(function(d) { return d.foo; })
          .key(function(d) { return d.bar; })
          .map([{foo: 42, bar: "red"}], _.map);
      assert.deepEqual(map.keys(), ["42"]);
      assert.deepEqual(map.get("42").keys(), ["red"]);
      assert.deepEqual(map.get("42").values(), [[{foo: 42, bar: "red"}]]);
      assert.deepEqual(map.get("42").entries(), [{key: "red", value: [{foo: 42, bar: "red"}]}]);
    }
  }
});

suite.export(module);
