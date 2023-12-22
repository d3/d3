import assert from "assert";
import {hsl, rgb} from "d3-color";
import {interpolate} from "../src/index.js";

it("interpolate(a, b) interpolates strings if b is a string and not a color", () => {
  assert.strictEqual(interpolate("foo", "bar")(0.5), "bar");
});

it("interpolate(a, b) interpolates strings if b is a string and not a color, even if b is coercible to a number", () => {
  assert.strictEqual(interpolate("1", "2")(0.5), "1.5");
  assert.strictEqual(interpolate(" 1", " 2")(0.5), " 1.5");
});

it("interpolate(a, b) interpolates RGB colors if b is a string and a color", () => {
  assert.strictEqual(interpolate("red", "blue")(0.5), "rgb(128, 0, 128)");
  assert.strictEqual(interpolate("#ff0000", "#0000ff")(0.5), "rgb(128, 0, 128)");
  assert.strictEqual(interpolate("#f00", "#00f")(0.5), "rgb(128, 0, 128)");
  assert.strictEqual(interpolate("rgb(255, 0, 0)", "rgb(0, 0, 255)")(0.5), "rgb(128, 0, 128)");
  assert.strictEqual(interpolate("rgba(255, 0, 0, 1.0)", "rgba(0, 0, 255, 1.0)")(0.5), "rgb(128, 0, 128)");
  assert.strictEqual(interpolate("rgb(100%, 0%, 0%)", "rgb(0%, 0%, 100%)")(0.5), "rgb(128, 0, 128)");
  assert.strictEqual(interpolate("rgba(100%, 0%, 0%, 1.0)", "rgba(0%, 0%, 100%, 1.0)")(0.5), "rgb(128, 0, 128)");
  assert.strictEqual(interpolate("rgba(100%, 0%, 0%, 0.5)", "rgba(0%, 0%, 100%, 0.7)")(0.5), "rgba(128, 0, 128, 0.6)");
});

it("interpolate(a, b) interpolates RGB colors if b is a color", () => {
  assert.strictEqual(interpolate("red", rgb("blue"))(0.5), "rgb(128, 0, 128)");
  assert.strictEqual(interpolate("red", hsl("blue"))(0.5), "rgb(128, 0, 128)");
});

it("interpolate(a, b) interpolates arrays if b is an array", () => {
  assert.deepStrictEqual(interpolate(["red"], ["blue"])(0.5), ["rgb(128, 0, 128)"]);
});

it("interpolate(a, b) interpolates arrays if b is an array, even if b is coercible to a number", () => {
  assert.deepStrictEqual(interpolate([1], [2])(0.5), [1.5]);
});

it("interpolate(a, b) interpolates numbers if b is a number", () => {
  assert.strictEqual(interpolate(1, 2)(0.5), 1.5);
  assert(isNaN(interpolate(1, NaN)(0.5)));
});

it("interpolate(a, b) interpolates objects if b is an object that is not coercible to a number", () => {
  assert.deepStrictEqual(interpolate({color: "red"}, {color: "blue"})(0.5), {color: "rgb(128, 0, 128)"});
});

it("interpolate(a, b) interpolates numbers if b is an object that is coercible to a number", () => {
  assert.strictEqual(interpolate(1, new Number(2))(0.5), 1.5);
  assert.strictEqual(interpolate(1, new String("2"))(0.5), 1.5);
});

it("interpolate(a, b) interpolates dates if b is a date", () => {
  const i = interpolate(new Date(2000, 0, 1), new Date(2000, 0, 2));
  const d = i(0.5);
  assert.strictEqual(d instanceof Date, true);
  assert.strictEqual(+i(0.5), +new Date(2000, 0, 1, 12));
});

it("interpolate(a, b) returns the constant b if b is null, undefined or a boolean", () => {
  assert.strictEqual(interpolate(0, null)(0.5), null);
  assert.strictEqual(interpolate(0, undefined)(0.5), undefined);
  assert.strictEqual(interpolate(0, true)(0.5), true);
  assert.strictEqual(interpolate(0, false)(0.5), false);
});

it("interpolate(a, b) interpolates objects without prototype", () => {
  assert.deepStrictEqual(interpolate(noproto({foo: 0}), noproto({foo: 2}))(0.5), {foo: 1});
});

it("interpolate(a, b) interpolates objects with numeric valueOf as numbers", () => {
  const proto = {valueOf: foo};
  assert.deepStrictEqual(interpolate(noproto({foo: 0}, proto), noproto({foo: 2}, proto))(0.5), 1);
});

it("interpolate(a, b) interpolates objects with string valueOf as numbers if valueOf result is coercible to number", () => {
  const proto = {valueOf: fooString};
  assert.deepStrictEqual(interpolate(noproto({foo: 0}, proto), noproto({foo: 2}, proto))(0.5), 1);
});

// valueOf appears here as object because:
// - we use for-in loop and it will ignore only fields coming from built-in prototypes;
// - we replace functions with objects.
it("interpolate(a, b) interpolates objects with string valueOf as objects if valueOf result is not coercible to number", () => {
  const proto = {valueOf: fooString};
  assert.deepStrictEqual(interpolate(noproto({foo: "bar"}, proto), noproto({foo: "baz"}, proto))(0.5), {foo: "baz", valueOf: {}});
});

it("interpolate(a, b) interpolates objects with toString as numbers if toString result is coercible to number", () => {
  const proto = {toString: fooString};
  assert.deepStrictEqual(interpolate(noproto({foo: 0}, proto), noproto({foo: 2}, proto))(0.5), 1);
});

// toString appears here as object because:
// - we use for-in loop and it will ignore only fields coming from built-in prototypes;
// - we replace functions with objects.
it("interpolate(a, b) interpolates objects with toString as objects if toString result is not coercible to number", () => {
  const proto = {toString: fooString};
  assert.deepStrictEqual(interpolate(noproto({foo: "bar"}, proto), noproto({foo: "baz"}, proto))(0.5), {foo: "baz", toString: {}});
});

it("interpolate(a, b) interpolates number arrays if b is a typed array", () => {
  assert.deepStrictEqual(interpolate([0, 0], Float64Array.of(-1, 1))(0.5), Float64Array.of(-0.5, 0.5));
  assert(interpolate([0, 0], Float64Array.of(-1, 1))(0.5) instanceof Float64Array);
  assert.deepStrictEqual(interpolate([0, 0], Float32Array.of(-1, 1))(0.5), Float32Array.of(-0.5, 0.5));
  assert(interpolate([0, 0], Float32Array.of(-1, 1))(0.5) instanceof Float32Array);
  assert.deepStrictEqual(interpolate([0, 0], Uint32Array.of(-2, 2))(0.5), Uint32Array.of(Math.pow(2, 31) - 1, 1));
  assert(interpolate([0, 0], Uint32Array.of(-1, 1))(0.5) instanceof Uint32Array);
  assert.deepStrictEqual(interpolate([0, 0], Uint8Array.of(-2, 2))(0.5), Uint8Array.of(Math.pow(2, 7) - 1, 1));
  assert(interpolate([0, 0], Uint8Array.of(-1, 1))(0.5) instanceof Uint8Array);
});

function noproto(properties, proto = null) {
  return Object.assign(Object.create(proto), properties);
}

function foo() {
  return this.foo;
}

function fooString() {
  return String(this.foo);
}
