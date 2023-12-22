import assert from "assert";
import {autoType} from "../src/index.js";

it("autoType(object) mutates in-place", () => {
  const object = {foo: "4.2"};
  assert.strictEqual(autoType(object), object);
  assert.deepStrictEqual(object, {foo: 4.2});
});

it("autoType(object) detects numbers", () => {
  assert.deepStrictEqual(autoType({foo: "4.2"}), {foo: 4.2});
  assert.deepStrictEqual(autoType({foo: "04.2"}), {foo: 4.2});
  assert.deepStrictEqual(autoType({foo: "-4.2"}), {foo: -4.2});
  assert.deepStrictEqual(autoType({foo: "1e4"}), {foo: 10000});
});

it("autoType(object) detects NaN", () => {
  assert.strictEqual(Number.isNaN(autoType({foo: "NaN"}).foo), true);
});

// https://www.ecma-international.org/ecma-262/9.0/index.html#sec-date-time-string-format
// When the time zone offset is absent, date-only forms are interpreted as a UTC time and date-time forms are interpreted as a local time.
// YYYY is ambiguous with number, so the number takes priority.
it("autoType(object) detects dates", () => {
  assert.deepStrictEqual(autoType({foo: "2018-01"}), {foo: new Date("2018-01-01T00:00:00.000Z")});
  assert.deepStrictEqual(autoType({foo: "2018-01-01"}), {foo: new Date("2018-01-01T00:00:00.000Z")});
});

it("autoType(object) detects extended years", () => {
  assert.deepStrictEqual(autoType({foo: "-010001-01-01T00:00:00Z"}), {foo: new Date("-010001-01-01T00:00:00Z")});
  assert.deepStrictEqual(autoType({foo: "+010001-01-01T00:00:00Z"}), {foo: new Date("+010001-01-01T00:00:00Z")});
});

it("autoType(object) detects date-times", () => {
  assert.deepStrictEqual(autoType({foo: "2018T00:00Z"}), {foo: new Date("2018-01-01T00:00:00.000Z")});
  assert.deepStrictEqual(autoType({foo: "2018T00:00+08:00"}), {foo: new Date("2017-12-31T16:00:00.000Z")});
  assert.deepStrictEqual(autoType({foo: "2018-01T12:23"}), {foo: new Date("2018-01-01T12:23:00.000")});
  assert.deepStrictEqual(autoType({foo: "2018-01T12:23Z"}), {foo: new Date("2018-01-01T12:23:00.000Z")});
  assert.deepStrictEqual(autoType({foo: "2018-01T12:23+00:00"}), {foo: new Date("2018-01-01T12:23:00.000Z")});
  assert.deepStrictEqual(autoType({foo: "2018-01-01T00:00"}), {foo: new Date("2018-01-01T00:00:00.000")});
  assert.deepStrictEqual(autoType({foo: "2018-01-01T00:00+00:00"}), {foo: new Date("2018-01-01T00:00:00.000Z")});
  assert.deepStrictEqual(autoType({foo: "2018-01-01T00:00-00:00"}), {foo: new Date("2018-01-01T00:00:00.000Z")});
});

it("autoType(object) detects booleans", () => {
  assert.deepStrictEqual(autoType({foo: "true"}), {foo: true});
  assert.deepStrictEqual(autoType({foo: "false"}), {foo: false});
});

it("autoType(object) detects null", () => {
  assert.deepStrictEqual(autoType({foo: ""}), {foo: null});
});

it("autoType(object) detects strings", () => {
  assert.deepStrictEqual(autoType({foo: "yes"}), {foo: "yes"});
  assert.deepStrictEqual(autoType({foo: "no"}), {foo: "no"});
  assert.deepStrictEqual(autoType({foo: "01/01/2018"}), {foo: "01/01/2018"});
  assert.deepStrictEqual(autoType({foo: "January 1, 2018"}), {foo: "January 1, 2018"});
  assert.deepStrictEqual(autoType({foo: "1,431"}), {foo: "1,431"});
  assert.deepStrictEqual(autoType({foo: "$1.00"}), {foo: "$1.00"});
  assert.deepStrictEqual(autoType({foo: "(1.00)"}), {foo: "(1.00)"});
  assert.deepStrictEqual(autoType({foo: "Nan"}), {foo: "Nan"});
  assert.deepStrictEqual(autoType({foo: "True"}), {foo: "True"});
  assert.deepStrictEqual(autoType({foo: "False"}), {foo: "False"});
  assert.deepStrictEqual(autoType({foo: "TRUE"}), {foo: "TRUE"});
  assert.deepStrictEqual(autoType({foo: "FALSE"}), {foo: "FALSE"});
  assert.deepStrictEqual(autoType({foo: "NAN"}), {foo: "NAN"});
  assert.deepStrictEqual(autoType({foo: "nan"}), {foo: "nan"});
  assert.deepStrictEqual(autoType({foo: "NA"}), {foo: "NA"});
  assert.deepStrictEqual(autoType({foo: "na"}), {foo: "na"});
});

it("autoType(object) ignores leading and trailing whitespace", () => {
  assert.deepStrictEqual(autoType({foo: " 4.2 "}), {foo: 4.2});
  assert.deepStrictEqual(autoType({foo: " -4.2 "}), {foo: -4.2});
  assert.deepStrictEqual(autoType({foo: " 1e4 "}), {foo: 10000});
  assert.deepStrictEqual(autoType({foo: " 2018-01 "}), {foo: new Date("2018-01-01T00:00:00.000Z")});
  assert.deepStrictEqual(autoType({foo: " 2018T00:00Z "}), {foo: new Date("2018-01-01T00:00:00.000Z")});
  assert.strictEqual(Number.isNaN(autoType({foo: " NaN "}).foo), true);
  assert.deepStrictEqual(autoType({foo: " true "}), {foo: true});
  assert.deepStrictEqual(autoType({foo: " "}), {foo: null});
});

it("autoType(array) mutates in-place", () => {
  const array = ["4.2"];
  assert.strictEqual(autoType(array), array);
  assert.deepStrictEqual(array, [4.2]);
});

it("autoType(array) can take an array", () => {
  assert.deepStrictEqual(autoType(["4.2", " 2018-01 "]), [4.2, new Date("2018-01-01T00:00:00.000Z")]);
});
