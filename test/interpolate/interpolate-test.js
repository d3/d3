var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.interpolate");

suite.addBatch({
  "interpolate": {
    topic: load("interpolate/interpolate"),

    "when b is a number": {
      "interpolates numbers": function(d3) {
        assert.strictEqual(d3.interpolate(2, 12)(.4), 6);
      },
      "coerces a to a number": function(d3) {
        assert.strictEqual(d3.interpolate("", 1)(.5), .5);
        assert.strictEqual(d3.interpolate("2", 12)(.4), 6);
        assert.strictEqual(d3.interpolate([2], 12)(.4), 6);
      }
    },

    "when b is a color string": {
      "interpolates RGB values and returns a hexadecimal string": function(d3) {
        assert.strictEqual(d3.interpolate("#ff0000", "#008000")(.4), "#993300");
      },
      "interpolates named colors in RGB": function(d3) {
        assert.strictEqual(d3.interpolate("red", "green")(.4), "#993300");
      },
      "interpolates decimal RGB colors in RGB": function(d3) {
        assert.strictEqual(d3.interpolate("rgb(255,0,0)", "rgb(0,128,0)")(.4), "#993300");
      },
      "interpolates decimal HSL colors in RGB": function(d3) {
        assert.strictEqual(d3.interpolate("hsl(0,100%,50%)", "hsl(120,100%,25%)")(.4), "#993300");
      },
      "coerces a to a color": function(d3) {
        assert.strictEqual(d3.interpolate({toString: function() { return "red"; }}, "green")(.4), "#993300");
      }
    },

    "when b is a color object": {
      "interpolates RGB values and returns a hexadecimal string": function(d3) {
        assert.strictEqual(d3.interpolate(d3.rgb(255, 0, 0), d3.rgb(0, 128, 0))(.4), "#993300");
      },
      "interpolates d3.hsl in RGB": function(d3) {
        assert.strictEqual(d3.interpolate(d3.hsl("red"), d3.hsl("green"))(.4), "#993300");
      },
      "interpolates d3.lab in RGB": function(d3) {
        assert.strictEqual(d3.interpolate(d3.lab("red"), d3.lab("green"))(.4), "#993300");
      },
      "interpolates d3.hcl in RGB": function(d3) {
        assert.strictEqual(d3.interpolate(d3.hcl("red"), d3.hcl("green"))(.4), "#993300");
      },
      "coerces a to a color": function(d3) {
        assert.strictEqual(d3.interpolate({toString: function() { return "red"; }}, "green")(.4), "#993300");
      }
    },

    "when b is a string": {
      "interpolates matching numbers in both strings": function(d3) {
        assert.strictEqual(d3.interpolate(" 10/20 30", "50/10 100 ")(.4), "26/16 58 ");
      },
      "if b is coercible to a number, still returns a string": function(d3) {
        assert.strictEqual(d3.interpolate("1.", "2.")(.5), "1.5");
        assert.strictEqual(d3.interpolate("1e+3", "1e+4")(.5), "5500");
      },
      "preserves non-numbers in string b": function(d3) {
        assert.strictEqual(d3.interpolate(" 10/20 30", "50/10 foo ")(.4), "26/16 foo ");
      },
      "preserves non-matching numbers in string b": function(d3) {
        assert.strictEqual(d3.interpolate(" 10/20 bar", "50/10 100 ")(.4), "26/16 100 ");
      },
      "preserves equal-value numbers in both strings": function(d3) {
        assert.strictEqual(d3.interpolate(" 10/20 100 20", "50/10 100, 20 ")(.4), "26/16 100, 20 ");
      },
      "coerces a to a string": function(d3) {
        assert.strictEqual(d3.interpolate({toString: function() { return "1."; }}, "2.")(.5), "1.5");
      }
    },

    "when b is an array": {
      "interpolates each element in b": function(d3) {
        assert.strictEqual(JSON.stringify(d3.interpolate([2, 4], [12, 24])(.4)), "[6,12]");
      },
      "interpolates arrays, even when both a and b are coercible to numbers": function(d3) {
        assert.strictEqual(JSON.stringify(d3.interpolate([2], [12])(.4)), "[6]");
        assert.strictEqual(JSON.stringify(d3.interpolate([[2]], [[12]])(.4)), "[[6]]");
      },
      "reuses the returned array during interpolation": function(d3) {
        var i = d3.interpolate([2], [12]);
        assert.strictEqual(i(.2), i(.4));
      }
    },

    "when b is an object": {
      "interpolates each property in b": function(d3) {
        assert.deepEqual(d3.interpolate({foo: 2, bar: 4}, {foo: 12, bar: 24})(.4), {foo: 6, bar: 12});
      },
      "interpolates numbers if b is coercible to a number (!isNaN(+b))": function(d3) {
        assert.strictEqual(d3.interpolate(new Number(2), new Number(12))(.4), 6);
        assert.strictEqual(d3.interpolate(new Date(2012, 0, 1), new Date(2013, 0, 1))(.5), +new Date(2012, 6, 2, 1));
        assert.strictEqual(d3.interpolate(1, null)(.4), .6); // +null = 0
        assert.isNaN(d3.interpolate("blue", null)(.4));
      },
      "reuses the returned object during interpolation": function(d3) {
        var i = d3.interpolate({foo: 2, bar: 4}, {foo: 12, bar: 24});
        assert.strictEqual(i(.2), i(.4));
      }
    },

    "may or may not interpolate between enumerable and non-enumerable properties": function(d3) {
      var a = Object.create({}, {foo: {value: 1, enumerable: true}}),
          b = Object.create({}, {foo: {value: 2, enumerable: false}});
      try {
        assert.deepEqual(d3.interpolate(a, b)(1), {});
      } catch (e) {
        assert.deepEqual(d3.interpolate(a, b)(1), {foo: 2});
      }
      try {
        assert.deepEqual(d3.interpolate(b, a)(1), {});
      } catch (e) {
        assert.deepEqual(d3.interpolate(b, a)(1), {foo: 1});
      }
    },
    "interpolates inherited properties of objects": function(d3) {
      var a = Object.create({foo: 0}),
          b = Object.create({foo: 2});
      assert.deepEqual(d3.interpolate(a, b)(.5), {foo: 1});
    },
    "doesn't interpret properties in the default object's prototype chain as RGB": function(d3) {
      assert.equal(d3.interpolate("hasOwnProperty", "hasOwnProperty")(0), "hasOwnProperty");
    }
  },

  "interpolators": {
    topic: load("interpolate/interpolate").document(),
    "can register a custom interpolator": function(d3) {
      d3.interpolators.push(function(a, b) { return a == "one" && b == "two" && d3.interpolateNumber(1, 2); });
      try {
        assert.equal(d3.interpolate("one", "two")(-.5), .5);
        assert.equal(d3.interpolate("one", "two")(0), 1);
        assert.equal(d3.interpolate("one", "two")(.5), 1.5);
        assert.equal(d3.interpolate("one", "two")(1), 2);
        assert.equal(d3.interpolate("one", "two")(1.5), 2.5);
      } finally {
        d3.interpolators.pop();
      }
    }
  }
});

suite.export(module);
