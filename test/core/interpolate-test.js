require("../env");
require("../../d3");

var vows = require("vows"),
    assert = require("assert");

var suite = vows.describe("d3.interpolate");

suite.addBatch({
  "interpolate": {
    topic: function() {
      return d3.interpolate;
    },
    "interpolates numbers": function(interpolate) {
      assert.equal(interpolate(2, 12)(.4), 6);
    },
    "interpolates colors": function(interpolate) {
      assert.equal(interpolate("#abcdef", "#fedcba")(.4), "#ccd3da");
    },
    "interpolates strings": function(interpolate) {
      assert.equal(interpolate("width:10px;", "width:50px;")(.2), "width:18px;");
    },
    "interpolates arrays": function(interpolate) {
      assert.deepEqual(interpolate([2, 4], [12, 24])(.4), [6, 12]);
    },
    "interpolates objects": function(interpolate) {
      assert.deepEqual(interpolate({foo: 2}, {foo: 12})(.4), {foo: 6});
    }
  }
});

suite.addBatch({
  "interpolateNumber": {
    topic: function() {
      return d3.interpolateNumber;
    },
    "interpolates numbers": function(interpolate) {
      assert.equal(interpolate(2, 12)(.4), 6);
      assert.equal(interpolate(2, 12)(.6), 8);
    }
  }
});

suite.addBatch({
  "interpolateRound": {
    topic: function() {
      return d3.interpolateRound;
    },
    "interpolates integers": function(interpolate) {
      assert.equal(interpolate(2, 12)(.456), 7);
      assert.equal(interpolate(2, 12)(.678), 9);
    }
  }
});

suite.addBatch({
  "interpolateString": {
    topic: function() {
      return d3.interpolateString;
    },
    "interpolates matching numbers in both strings": function(interpolate) {
      assert.equal(interpolate(" 10/20 30", "50/10 100 ")(.2), "18/18 44 ");
      assert.equal(interpolate(" 10/20 30", "50/10 100 ")(.4), "26/16 58 ");
    },
    "preserves non-numbers in string b": function(interpolate) {
      assert.equal(interpolate(" 10/20 30", "50/10 foo ")(.2), "18/18 foo ");
      assert.equal(interpolate(" 10/20 30", "50/10 foo ")(.4), "26/16 foo ");
    },
    "preserves non-matching numbers in string b": function(interpolate) {
      assert.equal(interpolate(" 10/20 foo", "50/10 100 ")(.2), "18/18 100 ");
      assert.equal(interpolate(" 10/20 bar", "50/10 100 ")(.4), "26/16 100 ");
    },
    "preserves equal-value numbers in both strings": function(interpolate) {
      assert.equal(interpolate(" 10/20 100 20", "50/10 100, 20 ")(.2), "18/18 100, 20 ");
      assert.equal(interpolate(" 10/20 100 20", "50/10 100, 20 ")(.4), "26/16 100, 20 ");
    }
  }
});

suite.addBatch({
  "interpolateRgb": {
    topic: function() {
      return d3.interpolateRgb;
    },
    "parses string input": function(interpolate) {
      assert.equal(interpolate("steelblue", "#f00")(.2), "#6b6890");
      assert.equal(interpolate("steelblue", "#f00")(.6), "#b53448");
    },
    "parses d3.rgb input": function(interpolate) {
      assert.equal(interpolate(d3.rgb("steelblue"), "#f00")(.2), "#6b6890");
      assert.equal(interpolate("steelblue", d3.rgb(255, 0, 0))(.6), "#b53448");
    },
    "parses d3.hsl input": function(interpolate) {
      assert.equal(interpolate(d3.hsl("steelblue"), "#f00")(.2), "#6b6890");
      assert.equal(interpolate("steelblue", d3.hsl(0, 1, .5))(.6), "#b53448");
    },
    "interpolates in RGB color space": function(interpolate) {
      assert.equal(interpolate("steelblue", "#f00")(.2), "#6b6890");
    },
    "outputs an RGB string": function(interpolate) {
      assert.equal(interpolate("steelblue", "#f00")(.2), "#6b6890");
    }
  }
});

suite.addBatch({
  "interpolateHsl": {
    topic: function() {
      return d3.interpolateHsl;
    },
    "parses string input": function(interpolate) {
      assert.equal(interpolate("steelblue", "#f00")(.2), "#38c3a2");
      assert.equal(interpolate("steelblue", "#f00")(.6), "#96e11c");
    },
    "parses d3.hsl input": function(interpolate) {
      assert.equal(interpolate(d3.hsl("steelblue"), "#f00")(.2), "#38c3a2");
      assert.equal(interpolate("steelblue", d3.hsl(0, 1, .5))(.6), "#96e11c");
    },
    "parses d3.rgb input": function(interpolate) {
      assert.equal(interpolate(d3.rgb("steelblue"), "#f00")(.2), "#38c3a2");
      assert.equal(interpolate("steelblue", d3.rgb(255, 0, 0))(.6), "#96e11c");
    },
    "interpolates in HSL color space": function(interpolate) {
      assert.equal(interpolate("steelblue", "#f00")(.2), "#38c3a2");
    },
    "outputs a hexadecimal string": function(interpolate) {
      assert.equal(interpolate("steelblue", "#f00")(.2), "#38c3a2");
    }
  }
});

suite.addBatch({
  "interpolateArray": {
    topic: function() {
      return d3.interpolateArray;
    },
    "interpolates defined elements": function(interpolate) {
      assert.deepEqual(interpolate([2, 12], [4, 24])(.5), [3, 18]);
    },
    "interpolates nested objects and arrays": function(interpolate) {
      assert.deepEqual(interpolate([[2, 12]], [[4, 24]])(.5), [[3, 18]]);
      assert.deepEqual(interpolate([{foo: [2, 12]}], [{foo: [4, 24]}])(.5), [{foo: [3, 18]}]);
    },
    "merges non-shared elements": function(interpolate) {
      assert.deepEqual(interpolate([2, 12], [4, 24, 12])(.5), [3, 18, 12]);
      assert.deepEqual(interpolate([2, 12, 12], [4, 24])(.5), [3, 18, 12]);
    }
  }
});

suite.addBatch({
  "interpolateObject": {
    topic: function() {
      return d3.interpolateObject;
    },
    "interpolates defined properties": function(interpolate) {
      assert.deepEqual(interpolate({a: 2, b: 12}, {a: 4, b: 24})(.5), {a: 3, b: 18});
    },
    "interpolates inherited properties": function(interpolate) {
      function a(a) { this.a = a; }
      a.prototype.b = 12;
      assert.deepEqual(interpolate(new a(2), new a(4))(.5), {a: 3, b: 12});
    },
    "interpolates color properties as rgb": function(interpolate) {
      assert.deepEqual(interpolate({background: "red"}, {background: "green"})(.5), {background: "#804000"});
      assert.deepEqual(interpolate({fill: "red"}, {fill: "green"})(.5), {fill: "#804000"});
      assert.deepEqual(interpolate({stroke: "red"}, {stroke: "green"})(.5), {stroke: "#804000"});
      assert.deepEqual(interpolate({color: "red"}, {color: "green"})(.5), {color: "#804000"});
    },
    "interpolates nested objects and arrays": function(interpolate) {
      assert.deepEqual(interpolate({foo: [2, 12]}, {foo: [4, 24]})(.5), {foo: [3, 18]});
      assert.deepEqual(interpolate({foo: {bar: [2, 12]}}, {foo: {bar: [4, 24]}})(.5), {foo: {bar: [3, 18]}});
    },
    "merges non-shared properties": function(interpolate) {
      assert.deepEqual(interpolate({foo: 2}, {foo: 4, bar: 12})(.5), {foo: 3, bar: 12});
      assert.deepEqual(interpolate({foo: 2, bar: 12}, {foo: 4})(.5), {foo: 3, bar: 12});
    }
  }
});

suite.addBatch({
  "interpolators": {
    topic: function() {
      return d3.interpolate;
    },
    "can register a custom interpolator": function(interpolate) {
      try {
        d3.interpolators.push(function(a, b) {
          return a == "one" && b == "two" && d3.interpolateNumber(1, 2);
        });
        assert.equal(interpolate("one", "two")(-.5), .5);
        assert.equal(interpolate("one", "two")(0), 1);
        assert.equal(interpolate("one", "two")(.5), 1.5);
        assert.equal(interpolate("one", "two")(1), 2);
        assert.equal(interpolate("one", "two")(1.5), 2.5);
      } finally {
        d3.interpolators.pop();
      }
    }
  }
});

suite.export(module);
