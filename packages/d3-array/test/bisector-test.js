import assert from "assert";
import {ascending, bisector} from "../src/index.js";

it("bisector(comparator).left(array, value) returns the index of an exact match", () => {
  const boxes = [1, 2, 3].map(box);
  const bisectLeft = bisector(ascendingBox).left;
  assert.strictEqual(bisectLeft(boxes, box(1)), 0);
  assert.strictEqual(bisectLeft(boxes, box(2)), 1);
  assert.strictEqual(bisectLeft(boxes, box(3)), 2);
});

it("bisector(comparator).left(array, value) returns the index of the first match", () => {
  const boxes = [1, 2, 2, 3].map(box);
  const bisectLeft = bisector(ascendingBox).left;
  assert.strictEqual(bisectLeft(boxes, box(1)), 0);
  assert.strictEqual(bisectLeft(boxes, box(2)), 1);
  assert.strictEqual(bisectLeft(boxes, box(3)), 3);
});

it("bisector(comparator).left(empty, value) returns zero", () => {
  assert.strictEqual(bisector(() => { throw new Error(); }).left([], 1), 0);
});

it("bisector(comparator).left(array, value) returns the insertion point of a non-exact match", () => {
  const boxes = [1, 2, 3].map(box);
  const bisectLeft = bisector(ascendingBox).left;
  assert.strictEqual(bisectLeft(boxes, box(0.5)), 0);
  assert.strictEqual(bisectLeft(boxes, box(1.5)), 1);
  assert.strictEqual(bisectLeft(boxes, box(2.5)), 2);
  assert.strictEqual(bisectLeft(boxes, box(3.5)), 3);
});

it("bisector(comparator).left(array, value) has undefined behavior if the search value is unorderable", () => {
  const boxes = [1, 2, 3].map(box);
  const bisectLeft = bisector(ascendingBox).left;
  bisectLeft(boxes, box(new Date(NaN))); // who knows what this will return!
  bisectLeft(boxes, box(undefined));
  bisectLeft(boxes, box(NaN));
});

it("bisector(comparator).left(array, value, lo) observes the specified lower bound", () => {
  const boxes = [1, 2, 3, 4, 5].map(box);
  const bisectLeft = bisector(ascendingBox).left;
  assert.strictEqual(bisectLeft(boxes, box(0), 2), 2);
  assert.strictEqual(bisectLeft(boxes, box(1), 2), 2);
  assert.strictEqual(bisectLeft(boxes, box(2), 2), 2);
  assert.strictEqual(bisectLeft(boxes, box(3), 2), 2);
  assert.strictEqual(bisectLeft(boxes, box(4), 2), 3);
  assert.strictEqual(bisectLeft(boxes, box(5), 2), 4);
  assert.strictEqual(bisectLeft(boxes, box(6), 2), 5);
});

it("bisector(comparator).left(array, value, lo, hi) observes the specified bounds", () => {
  const boxes = [1, 2, 3, 4, 5].map(box);
  const bisectLeft = bisector(ascendingBox).left;
  assert.strictEqual(bisectLeft(boxes, box(0), 2, 3), 2);
  assert.strictEqual(bisectLeft(boxes, box(1), 2, 3), 2);
  assert.strictEqual(bisectLeft(boxes, box(2), 2, 3), 2);
  assert.strictEqual(bisectLeft(boxes, box(3), 2, 3), 2);
  assert.strictEqual(bisectLeft(boxes, box(4), 2, 3), 3);
  assert.strictEqual(bisectLeft(boxes, box(5), 2, 3), 3);
  assert.strictEqual(bisectLeft(boxes, box(6), 2, 3), 3);
});

it("bisector(comparator).left(array, value) handles large sparse d3", () => {
  const boxes = [];
  const bisectLeft = bisector(ascendingBox).left;
  let i = 1 << 30;
  boxes[i++] = box(1);
  boxes[i++] = box(2);
  boxes[i++] = box(3);
  boxes[i++] = box(4);
  boxes[i++] = box(5);
  assert.strictEqual(bisectLeft(boxes, box(0), i - 5, i), i - 5);
  assert.strictEqual(bisectLeft(boxes, box(1), i - 5, i), i - 5);
  assert.strictEqual(bisectLeft(boxes, box(2), i - 5, i), i - 4);
  assert.strictEqual(bisectLeft(boxes, box(3), i - 5, i), i - 3);
  assert.strictEqual(bisectLeft(boxes, box(4), i - 5, i), i - 2);
  assert.strictEqual(bisectLeft(boxes, box(5), i - 5, i), i - 1);
  assert.strictEqual(bisectLeft(boxes, box(6), i - 5, i), i - 0);
});

it("bisector(comparator).right(array, value) returns the index after an exact match", () => {
  const boxes = [1, 2, 3].map(box);
  const bisectRight = bisector(ascendingBox).right;
  assert.strictEqual(bisectRight(boxes, box(1)), 1);
  assert.strictEqual(bisectRight(boxes, box(2)), 2);
  assert.strictEqual(bisectRight(boxes, box(3)), 3);
});

it("bisector(comparator).right(array, value) returns the index after the last match", () => {
  const boxes = [1, 2, 2, 3].map(box);
  const bisectRight = bisector(ascendingBox).right;
  assert.strictEqual(bisectRight(boxes, box(1)), 1);
  assert.strictEqual(bisectRight(boxes, box(2)), 3);
  assert.strictEqual(bisectRight(boxes, box(3)), 4);
});

it("bisector(comparator).right(empty, value) returns zero", () => {
  assert.strictEqual(bisector(() => { throw new Error(); }).right([], 1), 0);
});

it("bisector(comparator).right(array, value) returns the insertion point of a non-exact match", () => {
  const boxes = [1, 2, 3].map(box);
  const bisectRight = bisector(ascendingBox).right;
  assert.strictEqual(bisectRight(boxes, box(0.5)), 0);
  assert.strictEqual(bisectRight(boxes, box(1.5)), 1);
  assert.strictEqual(bisectRight(boxes, box(2.5)), 2);
  assert.strictEqual(bisectRight(boxes, box(3.5)), 3);
});

it("bisector(comparator).right(array, value, lo) observes the specified lower bound", () => {
  const boxes = [1, 2, 3, 4, 5].map(box);
  const bisectRight = bisector(ascendingBox).right;
  assert.strictEqual(bisectRight(boxes, box(0), 2), 2);
  assert.strictEqual(bisectRight(boxes, box(1), 2), 2);
  assert.strictEqual(bisectRight(boxes, box(2), 2), 2);
  assert.strictEqual(bisectRight(boxes, box(3), 2), 3);
  assert.strictEqual(bisectRight(boxes, box(4), 2), 4);
  assert.strictEqual(bisectRight(boxes, box(5), 2), 5);
  assert.strictEqual(bisectRight(boxes, box(6), 2), 5);
});

it("bisector(comparator).right(array, value, lo, hi) observes the specified bounds", () => {
  const boxes = [1, 2, 3, 4, 5].map(box);
  const bisectRight = bisector(ascendingBox).right;
  assert.strictEqual(bisectRight(boxes, box(0), 2, 3), 2);
  assert.strictEqual(bisectRight(boxes, box(1), 2, 3), 2);
  assert.strictEqual(bisectRight(boxes, box(2), 2, 3), 2);
  assert.strictEqual(bisectRight(boxes, box(3), 2, 3), 3);
  assert.strictEqual(bisectRight(boxes, box(4), 2, 3), 3);
  assert.strictEqual(bisectRight(boxes, box(5), 2, 3), 3);
  assert.strictEqual(bisectRight(boxes, box(6), 2, 3), 3);
});

it("bisector(comparator).right(array, value) handles large sparse d3", () => {
  const boxes = [];
  const bisectRight = bisector(ascendingBox).right;
  let i = 1 << 30;
  boxes[i++] = box(1);
  boxes[i++] = box(2);
  boxes[i++] = box(3);
  boxes[i++] = box(4);
  boxes[i++] = box(5);
  assert.strictEqual(bisectRight(boxes, box(0), i - 5, i), i - 5);
  assert.strictEqual(bisectRight(boxes, box(1), i - 5, i), i - 4);
  assert.strictEqual(bisectRight(boxes, box(2), i - 5, i), i - 3);
  assert.strictEqual(bisectRight(boxes, box(3), i - 5, i), i - 2);
  assert.strictEqual(bisectRight(boxes, box(4), i - 5, i), i - 1);
  assert.strictEqual(bisectRight(boxes, box(5), i - 5, i), i - 0);
  assert.strictEqual(bisectRight(boxes, box(6), i - 5, i), i - 0);
});

it("bisector(comparator).left(array, value) supports an asymmetric (object, value) comparator", () => {
  const boxes = [1, 2, 3].map(box);
  const bisectLeft = bisector(ascendingBoxValue).left;
  assert.strictEqual(bisectLeft(boxes, 1), 0);
  assert.strictEqual(bisectLeft(boxes, 2), 1);
  assert.strictEqual(bisectLeft(boxes, 3), 2);
});

// This is not possible because the bisector has no way of knowing whether the
// given comparator is symmetric or asymmetric, and if the comparator is
// asymmetric it cannot be used to test the search value for orderability.
it.skip("bisector(comparator).left(array, value) keeps non-comparable values to the right", () => {
  const boxes = [1, 2, null, undefined, NaN].map(box);
  const bisectLeft = bisector(ascendingBox).left;
  assert.strictEqual(bisectLeft(boxes, box(1)), 0);
  assert.strictEqual(bisectLeft(boxes, box(2)), 1);
  assert.strictEqual(bisectLeft(boxes, box(null)), 5);
  assert.strictEqual(bisectLeft(boxes, box(undefined)), 5);
  assert.strictEqual(bisectLeft(boxes, box(NaN)), 5);
});

it("bisector(accessor).left(array, value) keeps non-comparable values to the right", () => {
  const boxes = [1, 2, null, undefined, NaN].map(box);
  const bisectLeft = bisector(unbox).left;
  assert.strictEqual(bisectLeft(boxes, 1), 0);
  assert.strictEqual(bisectLeft(boxes, 2), 1);
  assert.strictEqual(bisectLeft(boxes, null), 5);
  assert.strictEqual(bisectLeft(boxes, undefined), 5);
  assert.strictEqual(bisectLeft(boxes, NaN), 5);
});

it("bisector(accessor).left(array, value) returns the index of an exact match", () => {
  const boxes = [1, 2, 3].map(box);
  const bisectLeft = bisector(unbox).left;
  assert.strictEqual(bisectLeft(boxes, 1), 0);
  assert.strictEqual(bisectLeft(boxes, 2), 1);
  assert.strictEqual(bisectLeft(boxes, 3), 2);
});

it("bisector(accessor).left(array, value) returns the index of the first match", () => {
  const boxes = [1, 2, 2, 3].map(box);
  const bisectLeft = bisector(unbox).left;
  assert.strictEqual(bisectLeft(boxes, 1), 0);
  assert.strictEqual(bisectLeft(boxes, 2), 1);
  assert.strictEqual(bisectLeft(boxes, 3), 3);
});

it("bisector(accessor).left(array, value) returns the insertion point of a non-exact match", () => {
  const boxes = [1, 2, 3].map(box);
  const bisectLeft = bisector(unbox).left;
  assert.strictEqual(bisectLeft(boxes, 0.5), 0);
  assert.strictEqual(bisectLeft(boxes, 1.5), 1);
  assert.strictEqual(bisectLeft(boxes, 2.5), 2);
  assert.strictEqual(bisectLeft(boxes, 3.5), 3);
});

it("bisector(accessor).left(array, value) has undefined behavior if the search value is unorderable", () => {
  const boxes = [1, 2, 3].map(box);
  const bisectLeft = bisector(unbox).left;
  bisectLeft(boxes, new Date(NaN)); // who knows what this will return!
  bisectLeft(boxes, undefined);
  bisectLeft(boxes, NaN);
});

it("bisector(accessor).left(array, value, lo) observes the specified lower bound", () => {
  const boxes = [1, 2, 3, 4, 5].map(box);
  const bisectLeft = bisector(unbox).left;
  assert.strictEqual(bisectLeft(boxes, 0, 2), 2);
  assert.strictEqual(bisectLeft(boxes, 1, 2), 2);
  assert.strictEqual(bisectLeft(boxes, 2, 2), 2);
  assert.strictEqual(bisectLeft(boxes, 3, 2), 2);
  assert.strictEqual(bisectLeft(boxes, 4, 2), 3);
  assert.strictEqual(bisectLeft(boxes, 5, 2), 4);
  assert.strictEqual(bisectLeft(boxes, 6, 2), 5);
});

it("bisector(accessor).left(array, value, lo, hi) observes the specified bounds", () => {
  const boxes = [1, 2, 3, 4, 5].map(box);
  const bisectLeft = bisector(unbox).left;
  assert.strictEqual(bisectLeft(boxes, 0, 2, 3), 2);
  assert.strictEqual(bisectLeft(boxes, 1, 2, 3), 2);
  assert.strictEqual(bisectLeft(boxes, 2, 2, 3), 2);
  assert.strictEqual(bisectLeft(boxes, 3, 2, 3), 2);
  assert.strictEqual(bisectLeft(boxes, 4, 2, 3), 3);
  assert.strictEqual(bisectLeft(boxes, 5, 2, 3), 3);
  assert.strictEqual(bisectLeft(boxes, 6, 2, 3), 3);
});

it("bisector(accessor).left(array, value) handles large sparse d3", () => {
  const boxes = [];
  const bisectLeft = bisector(unbox).left;
  let i = 1 << 30;
  boxes[i++] = box(1);
  boxes[i++] = box(2);
  boxes[i++] = box(3);
  boxes[i++] = box(4);
  boxes[i++] = box(5);
  assert.strictEqual(bisectLeft(boxes, 0, i - 5, i), i - 5);
  assert.strictEqual(bisectLeft(boxes, 1, i - 5, i), i - 5);
  assert.strictEqual(bisectLeft(boxes, 2, i - 5, i), i - 4);
  assert.strictEqual(bisectLeft(boxes, 3, i - 5, i), i - 3);
  assert.strictEqual(bisectLeft(boxes, 4, i - 5, i), i - 2);
  assert.strictEqual(bisectLeft(boxes, 5, i - 5, i), i - 1);
  assert.strictEqual(bisectLeft(boxes, 6, i - 5, i), i - 0);
});

it("bisector(accessor).right(array, value) returns the index after an exact match", () => {
  const boxes = [1, 2, 3].map(box);
  const bisectRight = bisector(unbox).right;
  assert.strictEqual(bisectRight(boxes, 1), 1);
  assert.strictEqual(bisectRight(boxes, 2), 2);
  assert.strictEqual(bisectRight(boxes, 3), 3);
});

it("bisector(accessor).right(array, value) returns the index after the last match", () => {
  const boxes = [1, 2, 2, 3].map(box);
  const bisectRight = bisector(unbox).right;
  assert.strictEqual(bisectRight(boxes, 1), 1);
  assert.strictEqual(bisectRight(boxes, 2), 3);
  assert.strictEqual(bisectRight(boxes, 3), 4);
});

it("bisector(accessor).right(array, value) returns the insertion point of a non-exact match", () => {
  const boxes = [1, 2, 3].map(box);
  const bisectRight = bisector(unbox).right;
  assert.strictEqual(bisectRight(boxes, 0.5), 0);
  assert.strictEqual(bisectRight(boxes, 1.5), 1);
  assert.strictEqual(bisectRight(boxes, 2.5), 2);
  assert.strictEqual(bisectRight(boxes, 3.5), 3);
});

it("bisector(accessor).right(array, value, lo) observes the specified lower bound", () => {
  const boxes = [1, 2, 3, 4, 5].map(box);
  const bisectRight = bisector(unbox).right;
  assert.strictEqual(bisectRight(boxes, 0, 2), 2);
  assert.strictEqual(bisectRight(boxes, 1, 2), 2);
  assert.strictEqual(bisectRight(boxes, 2, 2), 2);
  assert.strictEqual(bisectRight(boxes, 3, 2), 3);
  assert.strictEqual(bisectRight(boxes, 4, 2), 4);
  assert.strictEqual(bisectRight(boxes, 5, 2), 5);
  assert.strictEqual(bisectRight(boxes, 6, 2), 5);
});

it("bisector(accessor).right(array, value, lo, hi) observes the specified bounds", () => {
  const boxes = [1, 2, 3, 4, 5].map(box);
  const bisectRight = bisector(unbox).right;
  assert.strictEqual(bisectRight(boxes, 0, 2, 3), 2);
  assert.strictEqual(bisectRight(boxes, 1, 2, 3), 2);
  assert.strictEqual(bisectRight(boxes, 2, 2, 3), 2);
  assert.strictEqual(bisectRight(boxes, 3, 2, 3), 3);
  assert.strictEqual(bisectRight(boxes, 4, 2, 3), 3);
  assert.strictEqual(bisectRight(boxes, 5, 2, 3), 3);
  assert.strictEqual(bisectRight(boxes, 6, 2, 3), 3);
});

it("bisector(accessor).right(array, value) handles large sparse d3", () => {
  const boxes = [];
  const bisectRight = bisector(unbox).right;
  let i = 1 << 30;
  boxes[i++] = box(1);
  boxes[i++] = box(2);
  boxes[i++] = box(3);
  boxes[i++] = box(4);
  boxes[i++] = box(5);
  assert.strictEqual(bisectRight(boxes, 0, i - 5, i), i - 5);
  assert.strictEqual(bisectRight(boxes, 1, i - 5, i), i - 4);
  assert.strictEqual(bisectRight(boxes, 2, i - 5, i), i - 3);
  assert.strictEqual(bisectRight(boxes, 3, i - 5, i), i - 2);
  assert.strictEqual(bisectRight(boxes, 4, i - 5, i), i - 1);
  assert.strictEqual(bisectRight(boxes, 5, i - 5, i), i - 0);
  assert.strictEqual(bisectRight(boxes, 6, i - 5, i), i - 0);
});

it("bisector(accessor).center(array, value) returns the closest index", () => {
  const data = [0, 1, 2, 3, 4];
  const bisectCenter = bisector(d => +d).center;
  assert.strictEqual(bisectCenter(data, 2), 2);
  assert.strictEqual(bisectCenter(data, 2.2), 2);
  assert.strictEqual(bisectCenter(data, 2.6), 3);
  assert.strictEqual(bisectCenter(data, 3), 3);
  assert.strictEqual(bisectCenter(data, 4), 4);
  assert.strictEqual(bisectCenter(data, 4.5), 4);
});

it("bisector(comparator).center(array, value) returns the closest index", () => {
  const data = [0, 1, 2, 3, 4];
  const bisectCenter = bisector((d, x) => +d - x).center;
  assert.strictEqual(bisectCenter(data, 2), 2);
  assert.strictEqual(bisectCenter(data, 2.2), 2);
  assert.strictEqual(bisectCenter(data, 2.6), 3);
  assert.strictEqual(bisectCenter(data, 3), 3);
});

it("bisector(comparator).center(empty, value) returns zero", () => {
  assert.strictEqual(bisector(() => { throw new Error(); }).center([], 1), 0);
});

it("bisector(ascending).center(array, value) returns the left value", () => {
  const data = [0, 1, 2, 3, 4];
  const bisectCenter = bisector(ascending).center;
  assert.strictEqual(bisectCenter(data, 2.0), 2);
  assert.strictEqual(bisectCenter(data, 2.2), 3);
  assert.strictEqual(bisectCenter(data, 2.6), 3);
  assert.strictEqual(bisectCenter(data, 3.0), 3);
});

it("bisector(ordinalAccessor).center(array, value) returns the left value", () => {
  const data = ["aa", "bb", "cc", "dd", "ee"];
  const bisectCenter = bisector(d => d).center;
  assert.strictEqual(bisectCenter(data, "cc"), 2);
  assert.strictEqual(bisectCenter(data, "ce"), 3);
  assert.strictEqual(bisectCenter(data, "cf"), 3);
  assert.strictEqual(bisectCenter(data, "dd"), 3);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}

function ascendingBox(a, b) {
  return ascending(a.value, b.value);
}

function ascendingBoxValue(a, value) {
  return ascending(a.value, value);
}
