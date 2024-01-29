import assert from "assert";
import {disjoint} from "../src/index.js";

it("disjoint(values, other) returns true if sets are disjoint", () => {
  assert.strictEqual(disjoint([1], [2]), true);
  assert.strictEqual(disjoint([2, 3], [3, 4]), false);
  assert.strictEqual(disjoint([1], []), true);
});

it("disjoint(values, other) allows values to be infinite", () => {
  assert.strictEqual(disjoint(odds(), [0, 2, 4, 5]), false);
});

it("disjoint(values, other) allows other to be infinite", () => {
  assert.strictEqual(disjoint([2], repeat(1, 3, 2)), false);
});

it("disjoint(values, other) performs interning", () => {
  assert.strictEqual(disjoint([new Date("2021-01-01")], [new Date("2021-01-02")]), true);
  assert.strictEqual(disjoint([new Date("2021-01-02"), new Date("2021-01-03")], [new Date("2021-01-03"), new Date("2021-01-04")]), false);
  assert.strictEqual(disjoint([new Date("2021-01-01")], []), true);
});

function* odds() {
  for (let i = 1; true; i += 2) {
    yield i;
  }
}

function* repeat(...values) {
  while (true) {
    yield* values;
  }
}
