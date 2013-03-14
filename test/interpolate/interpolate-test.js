var vows = require("vows"),
    load = require("../load"),
    assert = require("../env-assert");

var suite = vows.describe("d3.interpolate");

suite.addBatch({
  "interpolate": {
    topic: load("interpolate/interpolate").sandbox({
      document: null,
      window: null
    }),
    "interpolates numbers": function(d3) {
      assert.equal(d3.interpolate(2, 12)(.4), 6);
      assert.equal(d3.interpolate("2px", 12)(.4), 6);
    },
    "interpolates colors": function(d3) {
      assert.equal(d3.interpolate("#abcdef", "#fedcba")(.4), "#ccd3da");
      assert.equal(d3.interpolate("#abcdef", d3.rgb("#fedcba"))(.4), "#ccd3da");
      assert.equal(d3.interpolate("#abcdef", d3.hsl("#fedcba"))(.4), "#ccd3da");
      assert.equal(d3.interpolate("#abcdef", d3.lab("#fedcba"))(.4), "#ccd3da");
    },
    "interpolates strings": function(d3) {
      assert.equal(d3.interpolate("width:10px;", "width:50px;")(.2), "width:18px;");
      assert.equal(d3.interpolate(2, "12px")(.4), "6px");
    },
    "interpolates arrays": function(d3) {
      assert.deepEqual(d3.interpolate([2, 4], [12, 24])(.4), [6, 12]);
    },
    "interpolates objects": function(d3) {
      assert.deepEqual(d3.interpolate({foo: 2}, {foo: 12})(.4), {foo: 6});
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
    },

    "interpolateNumber": {
      "interpolates numbers": function(d3) {
        assert.equal(d3.interpolateNumber(2, 12)(.4), 6);
        assert.equal(d3.interpolateNumber(2, 12)(.6), 8);
      }
    },

    "interpolateRound": {
      "interpolates integers": function(d3) {
        assert.equal(d3.interpolateRound(2, 12)(.456), 7);
        assert.equal(d3.interpolateRound(2, 12)(.678), 9);
      }
    },

    "interpolateString": {
      "interpolates matching numbers in both strings": function(d3) {
        assert.equal(d3.interpolateString(" 10/20 30", "50/10 100 ")(.2), "18/18 44 ");
        assert.equal(d3.interpolateString(" 10/20 30", "50/10 100 ")(.4), "26/16 58 ");
      },
      "preserves non-numbers in string b": function(d3) {
        assert.equal(d3.interpolateString(" 10/20 30", "50/10 foo ")(.2), "18/18 foo ");
        assert.equal(d3.interpolateString(" 10/20 30", "50/10 foo ")(.4), "26/16 foo ");
      },
      "preserves non-matching numbers in string b": function(d3) {
        assert.equal(d3.interpolateString(" 10/20 foo", "50/10 100 ")(.2), "18/18 100 ");
        assert.equal(d3.interpolateString(" 10/20 bar", "50/10 100 ")(.4), "26/16 100 ");
      },
      "preserves equal-value numbers in both strings": function(d3) {
        assert.equal(d3.interpolateString(" 10/20 100 20", "50/10 100, 20 ")(.2), "18/18 100, 20 ");
        assert.equal(d3.interpolateString(" 10/20 100 20", "50/10 100, 20 ")(.4), "26/16 100, 20 ");
      },
      "interpolates decimal notation correctly": function(d3) {
        assert.equal(d3.interpolateString("1.", "2.")(.5), "1.5");
      },
      "interpolates exponent notation correctly": function(d3) {
        assert.equal(d3.interpolateString("1e+3", "1e+4")(.5), "5500");
        assert.equal(d3.interpolateString("1e-3", "1e-4")(.5), "0.00055");
        assert.equal(d3.interpolateString("1.e-3", "1.e-4")(.5), "0.00055");
        assert.equal(d3.interpolateString("-1.e-3", "-1.e-4")(.5), "-0.00055");
        assert.equal(d3.interpolateString("+1.e-3", "+1.e-4")(.5), "0.00055");
        assert.equal(d3.interpolateString(".1e-2", ".1e-3")(.5), "0.00055");
      }
    },

    "interpolateRgb": {
      "parses string input": function(d3) {
        assert.equal(d3.interpolateRgb("steelblue", "#f00")(.2), "#6b6890");
        assert.equal(d3.interpolateRgb("steelblue", "#f00")(.6), "#b53448");
      },
      "parses d3.rgb input": function(d3) {
        assert.equal(d3.interpolateRgb(d3.rgb("steelblue"), "#f00")(.2), "#6b6890");
        assert.equal(d3.interpolateRgb("steelblue", d3.rgb(255, 0, 0))(.6), "#b53448");
      },
      "parses d3.hsl input": function(d3) {
        assert.equal(d3.interpolateRgb(d3.hsl("steelblue"), "#f00")(.2), "#6b6890");
        assert.equal(d3.interpolateRgb("steelblue", d3.hsl(0, 1, .5))(.6), "#b53448");
      },
      "interpolates in RGB color space": function(d3) {
        assert.equal(d3.interpolateRgb("steelblue", "#f00")(.2), "#6b6890");
      },
      "outputs an RGB string": function(d3) {
        assert.equal(d3.interpolateRgb("steelblue", "#f00")(.2), "#6b6890");
      }
    },

    "interpolateHsl": {
      "parses string input": function(d3) {
        assert.equal(d3.interpolateHsl("steelblue", "#f00")(.2), "#383dc3");
        assert.equal(d3.interpolateHsl("steelblue", "#f00")(.6), "#dd1ce1");
      },
      "parses d3.hsl input": function(d3) {
        assert.equal(d3.interpolateHsl(d3.hsl("steelblue"), "#f00")(.2), "#383dc3");
        assert.equal(d3.interpolateHsl("steelblue", d3.hsl(0, 1, .5))(.6), "#dd1ce1");
      },
      "parses d3.rgb input": function(d3) {
        assert.equal(d3.interpolateHsl(d3.rgb("steelblue"), "#f00")(.2), "#383dc3");
        assert.equal(d3.interpolateHsl("steelblue", d3.rgb(255, 0, 0))(.6), "#dd1ce1");
      },
      "interpolates in HSL color space": function(d3) {
        assert.equal(d3.interpolateHsl("steelblue", "#f00")(.2), "#383dc3");
      },
      "outputs a hexadecimal string": function(d3) {
        assert.equal(d3.interpolateHsl("steelblue", "#f00")(.2), "#383dc3");
      }
    },

    "interpolateArray": {
      "interpolates defined elements": function(d3) {
        assert.deepEqual(d3.interpolateArray([2, 12], [4, 24])(.5), [3, 18]);
      },
      "interpolates nested objects and arrays": function(d3) {
        assert.deepEqual(d3.interpolateArray([[2, 12]], [[4, 24]])(.5), [[3, 18]]);
        assert.deepEqual(d3.interpolateArray([{foo: [2, 12]}], [{foo: [4, 24]}])(.5), [{foo: [3, 18]}]);
      },
      "merges non-shared elements": function(d3) {
        assert.deepEqual(d3.interpolateArray([2, 12], [4, 24, 12])(.5), [3, 18, 12]);
        assert.deepEqual(d3.interpolateArray([2, 12, 12], [4, 24])(.5), [3, 18, 12]);
      }
    },

    "interpolateObject": {
      "interpolates defined properties": function(d3) {
        assert.deepEqual(d3.interpolateObject({a: 2, b: 12}, {a: 4, b: 24})(.5), {a: 3, b: 18});
      },
      "interpolates inherited properties": function(d3) {
        function a(a) { this.a = a; }
        a.prototype.b = 12;
        assert.deepEqual(d3.interpolateObject(new a(2), new a(4))(.5), {a: 3, b: 12});
      },
      "interpolates color properties as rgb": function(d3) {
        assert.deepEqual(d3.interpolateObject({background: "red"}, {background: "green"})(.5), {background: "#804000"});
        assert.deepEqual(d3.interpolateObject({fill: "red"}, {fill: "green"})(.5), {fill: "#804000"});
        assert.deepEqual(d3.interpolateObject({stroke: "red"}, {stroke: "green"})(.5), {stroke: "#804000"});
        assert.deepEqual(d3.interpolateObject({color: "red"}, {color: "green"})(.5), {color: "#804000"});
      },
      "interpolates nested objects and arrays": function(d3) {
        assert.deepEqual(d3.interpolateObject({foo: [2, 12]}, {foo: [4, 24]})(.5), {foo: [3, 18]});
        assert.deepEqual(d3.interpolateObject({foo: {bar: [2, 12]}}, {foo: {bar: [4, 24]}})(.5), {foo: {bar: [3, 18]}});
      },
      "merges non-shared properties": function(d3) {
        assert.deepEqual(d3.interpolateObject({foo: 2}, {foo: 4, bar: 12})(.5), {foo: 3, bar: 12});
        assert.deepEqual(d3.interpolateObject({foo: 2, bar: 12}, {foo: 4})(.5), {foo: 3, bar: 12});
      }
    },

    "interpolators": {
      "can register a custom interpolator": function(d3) {
        try {
          d3.interpolators.push(function(a, b) {
            return a == "one" && b == "two" && d3.interpolateNumber(1, 2);
          });
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
  }
});

suite.export(module);
