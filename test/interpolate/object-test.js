var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.interpolateObject");

suite.addBatch({
  "interpolateObject": {
    topic: load("interpolate/object").expression("d3.interpolateObject"),
    "interpolates defined properties": function(interpolate) {
      assert.deepEqual(interpolate({a: 2, b: 12}, {a: 4, b: 24})(0.5), {a: 3, b: 18});
    },
    "interpolates inherited properties": function(interpolate) {
      function a(a) { this.a = a; }
      a.prototype.b = 12;
      assert.deepEqual(interpolate(new a(2), new a(4))(0.5), {a: 3, b: 12});
    },
    "interpolates color properties as rgb": function(interpolate) {
      assert.deepEqual(interpolate({background: "red"}, {background: "green"})(0.5), {background: "#804000"});
      assert.deepEqual(interpolate({fill: "red"}, {fill: "green"})(0.5), {fill: "#804000"});
      assert.deepEqual(interpolate({stroke: "red"}, {stroke: "green"})(0.5), {stroke: "#804000"});
      assert.deepEqual(interpolate({color: "red"}, {color: "green"})(0.5), {color: "#804000"});
    },
    "interpolates nested objects and arrays": function(interpolate) {
      assert.deepEqual(interpolate({foo: [2, 12]}, {foo: [4, 24]})(0.5), {foo: [3, 18]});
      assert.deepEqual(interpolate({foo: {bar: [2, 12]}}, {foo: {bar: [4, 24]}})(0.5), {foo: {bar: [3, 18]}});
    },
    "merges non-shared properties": function(interpolate) {
      assert.deepEqual(interpolate({foo: 2}, {foo: 4, bar: 12})(0.5), {foo: 3, bar: 12});
      assert.deepEqual(interpolate({foo: 2, bar: 12}, {foo: 4})(0.5), {foo: 3, bar: 12});
    }
  }
});

suite.export(module);
