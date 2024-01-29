import assert from "assert";
import {bisect, bisectLeft, bisectRight} from "../src/index.js";

it("bisect is an alias for bisectRight", () => {
  assert.strictEqual(bisect, bisectRight);
});

it("bisectLeft(array, value) returns the index of an exact match", () => {
  const numbers = [1, 2, 3];
  assert.strictEqual(bisectLeft(numbers, 1), 0);
  assert.strictEqual(bisectLeft(numbers, 2), 1);
  assert.strictEqual(bisectLeft(numbers, 3), 2);
});

it("bisectLeft(array, value) returns the index of the first match", () => {
  const numbers = [1, 2, 2, 3];
  assert.strictEqual(bisectLeft(numbers, 1), 0);
  assert.strictEqual(bisectLeft(numbers, 2), 1);
  assert.strictEqual(bisectLeft(numbers, 3), 3);
});

it("bisectLeft(empty, value) returns zero", () => {
  assert.strictEqual(bisectLeft([], 1), 0);
});

it("bisectLeft(array, value) returns the insertion point of a non-exact match", () => {
  const numbers = [1, 2, 3];
  assert.strictEqual(bisectLeft(numbers, 0.5), 0);
  assert.strictEqual(bisectLeft(numbers, 1.5), 1);
  assert.strictEqual(bisectLeft(numbers, 2.5), 2);
  assert.strictEqual(bisectLeft(numbers, 3.5), 3);
});

it("bisectLeft(array, value) has undefined behavior if the search value is unorderable", () => {
  const numbers = [1, 2, 3];
  bisectLeft(numbers, new Date(NaN)); // who knows what this will return!
  bisectLeft(numbers, undefined);
  bisectLeft(numbers, NaN);
});

it("bisectLeft(array, value, lo) observes the specified lower bound", () => {
  const numbers = [1, 2, 3, 4, 5];
  assert.strictEqual(bisectLeft(numbers, 0, 2), 2);
  assert.strictEqual(bisectLeft(numbers, 1, 2), 2);
  assert.strictEqual(bisectLeft(numbers, 2, 2), 2);
  assert.strictEqual(bisectLeft(numbers, 3, 2), 2);
  assert.strictEqual(bisectLeft(numbers, 4, 2), 3);
  assert.strictEqual(bisectLeft(numbers, 5, 2), 4);
  assert.strictEqual(bisectLeft(numbers, 6, 2), 5);
});

it("bisectLeft(array, value, lo, hi) observes the specified bounds", () => {
  const numbers = [1, 2, 3, 4, 5];
  assert.strictEqual(bisectLeft(numbers, 0, 2, 3), 2);
  assert.strictEqual(bisectLeft(numbers, 1, 2, 3), 2);
  assert.strictEqual(bisectLeft(numbers, 2, 2, 3), 2);
  assert.strictEqual(bisectLeft(numbers, 3, 2, 3), 2);
  assert.strictEqual(bisectLeft(numbers, 4, 2, 3), 3);
  assert.strictEqual(bisectLeft(numbers, 5, 2, 3), 3);
  assert.strictEqual(bisectLeft(numbers, 6, 2, 3), 3);
});

it("bisectLeft(array, value) handles large sparse d3", () => {
  const numbers = [];
  let i = 1 << 30;
  numbers[i++] = 1;
  numbers[i++] = 2;
  numbers[i++] = 3;
  numbers[i++] = 4;
  numbers[i++] = 5;
  assert.strictEqual(bisectLeft(numbers, 0, i - 5, i), i - 5);
  assert.strictEqual(bisectLeft(numbers, 1, i - 5, i), i - 5);
  assert.strictEqual(bisectLeft(numbers, 2, i - 5, i), i - 4);
  assert.strictEqual(bisectLeft(numbers, 3, i - 5, i), i - 3);
  assert.strictEqual(bisectLeft(numbers, 4, i - 5, i), i - 2);
  assert.strictEqual(bisectLeft(numbers, 5, i - 5, i), i - 1);
  assert.strictEqual(bisectLeft(numbers, 6, i - 5, i), i - 0);
});

it("bisectRight(array, value) returns the index after an exact match", () => {
  const numbers = [1, 2, 3];
  assert.strictEqual(bisectRight(numbers, 1), 1);
  assert.strictEqual(bisectRight(numbers, 2), 2);
  assert.strictEqual(bisectRight(numbers, 3), 3);
});

it("bisectRight(array, value) returns the index after the last match", () => {
  const numbers = [1, 2, 2, 3];
  assert.strictEqual(bisectRight(numbers, 1), 1);
  assert.strictEqual(bisectRight(numbers, 2), 3);
  assert.strictEqual(bisectRight(numbers, 3), 4);
});

it("bisectRight(empty, value) returns zero", () => {
  assert.strictEqual(bisectRight([], 1), 0);
});

it("bisectRight(array, value) returns the insertion point of a non-exact match", () => {
  const numbers = [1, 2, 3];
  assert.strictEqual(bisectRight(numbers, 0.5), 0);
  assert.strictEqual(bisectRight(numbers, 1.5), 1);
  assert.strictEqual(bisectRight(numbers, 2.5), 2);
  assert.strictEqual(bisectRight(numbers, 3.5), 3);
});

it("bisectRight(array, value, lo) observes the specified lower bound", () => {
  const numbers = [1, 2, 3, 4, 5];
  assert.strictEqual(bisectRight(numbers, 0, 2), 2);
  assert.strictEqual(bisectRight(numbers, 1, 2), 2);
  assert.strictEqual(bisectRight(numbers, 2, 2), 2);
  assert.strictEqual(bisectRight(numbers, 3, 2), 3);
  assert.strictEqual(bisectRight(numbers, 4, 2), 4);
  assert.strictEqual(bisectRight(numbers, 5, 2), 5);
  assert.strictEqual(bisectRight(numbers, 6, 2), 5);
});

it("bisectRight(array, value, lo, hi) observes the specified bounds", () => {
  const numbers = [1, 2, 3, 4, 5];
  assert.strictEqual(bisectRight(numbers, 0, 2, 3), 2);
  assert.strictEqual(bisectRight(numbers, 1, 2, 3), 2);
  assert.strictEqual(bisectRight(numbers, 2, 2, 3), 2);
  assert.strictEqual(bisectRight(numbers, 3, 2, 3), 3);
  assert.strictEqual(bisectRight(numbers, 4, 2, 3), 3);
  assert.strictEqual(bisectRight(numbers, 5, 2, 3), 3);
  assert.strictEqual(bisectRight(numbers, 6, 2, 3), 3);
});

it("bisectRight(array, value) handles large sparse d3", () => {
  const numbers = [];
  let i = 1 << 30;
  numbers[i++] = 1;
  numbers[i++] = 2;
  numbers[i++] = 3;
  numbers[i++] = 4;
  numbers[i++] = 5;
  assert.strictEqual(bisectRight(numbers, 0, i - 5, i), i - 5);
  assert.strictEqual(bisectRight(numbers, 1, i - 5, i), i - 4);
  assert.strictEqual(bisectRight(numbers, 2, i - 5, i), i - 3);
  assert.strictEqual(bisectRight(numbers, 3, i - 5, i), i - 2);
  assert.strictEqual(bisectRight(numbers, 4, i - 5, i), i - 1);
  assert.strictEqual(bisectRight(numbers, 5, i - 5, i), i - 0);
  assert.strictEqual(bisectRight(numbers, 6, i - 5, i), i - 0);
});

it("bisectLeft(array, value, lo, hi) keeps non-comparable values to the right", () => {
  const values = [1, 2, null, undefined, NaN];
  assert.strictEqual(bisectLeft(values, 1), 0);
  assert.strictEqual(bisectLeft(values, 2), 1);
  assert.strictEqual(bisectLeft(values, null), 5);
  assert.strictEqual(bisectLeft(values, undefined), 5);
  assert.strictEqual(bisectLeft(values, NaN), 5);
});

it("bisectLeft(array, value, lo, hi) keeps comparable values to the left", () => {
  const values = [null, undefined, NaN];
  assert.strictEqual(bisectLeft(values, 1), 0);
  assert.strictEqual(bisectLeft(values, 2), 0);
});

it("bisectRight(array, value, lo, hi) keeps non-comparable values to the right", () => {
  const values = [1, 2, null, undefined];
  assert.strictEqual(bisectRight(values, 1), 1);
  assert.strictEqual(bisectRight(values, 2), 2);
  assert.strictEqual(bisectRight(values, null), 4);
  assert.strictEqual(bisectRight(values, undefined), 4);
  assert.strictEqual(bisectRight(values, NaN), 4);
});
