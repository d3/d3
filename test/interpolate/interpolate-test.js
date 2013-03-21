var vows = require("vows"),
    load = require("../load"),
    assert = require("../assert");

var suite = vows.describe("d3.interpolate");

suite.addBatch({
  "interpolate": {
    topic: load("interpolate/interpolate").document(),
    "interpolates numbers": function(d3) {
      assert.equal(d3.interpolate(2, 12)(.4), 6);
      assert.equal(d3.interpolate("2px", 12)(.4), 6);
    },
    "interpolates colors": function(d3) { // beware instanceof d3_Color
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
    }
  },
  "interpolators": {
    topic: load("interpolate/interpolate").document(),
    "can register a custom interpolator": function(d3) {
      d3.interpolators.push(function(a, b) {
        return a == "one" && b == "two" && d3.interpolateNumber(1, 2);
      });
      assert.equal(d3.interpolate("one", "two")(-.5), .5);
      assert.equal(d3.interpolate("one", "two")(0), 1);
      assert.equal(d3.interpolate("one", "two")(.5), 1.5);
      assert.equal(d3.interpolate("one", "two")(1), 2);
      assert.equal(d3.interpolate("one", "two")(1.5), 2.5);
    }
  }
});

suite.export(module);
