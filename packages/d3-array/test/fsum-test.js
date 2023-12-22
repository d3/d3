import assert from "assert";
import {Adder, fsum} from "../src/index.js";

it("new Adder() returns an Adder", () => {
  assert.strictEqual(typeof new Adder().add, "function");
  assert.strictEqual(typeof new Adder().valueOf, "function");
});

it("+adder can be applied several times", () => {
  const adder = new Adder();
  for (let i = 0; i < 10; ++i) adder.add(0.1);
  assert.strictEqual(+adder, 1);
  assert.strictEqual(+adder, 1);
});

it("fsum(array) is an exact sum", () => {
  assert.strictEqual(fsum([.1, .1, .1, .1, .1, .1, .1, .1, .1, .1]), 1);
  assert.strictEqual(fsum([.3, .3, .3, .3, .3, .3, .3, .3, .3, .3, -.3, -.3, -.3, -.3, -.3, -.3, -.3, -.3, -.3, -.3]), 0);
  assert.strictEqual(fsum(["20", "3"].map(box), unbox), 23);
});

it("fsum(array) returns the fsum of the specified numbers", () => {
  assert.strictEqual(fsum([1]), 1);
  assert.strictEqual(fsum([5, 1, 2, 3, 4]), 15);
  assert.strictEqual(fsum([20, 3]), 23);
  assert.strictEqual(fsum([3, 20]), 23);
});

it("fsum(array) observes values that can be coerced to numbers", () => {
  assert.strictEqual(fsum(["20", "3"]), 23);
  assert.strictEqual(fsum(["3", "20"]), 23);
  assert.strictEqual(fsum(["3", 20]), 23);
  assert.strictEqual(fsum([20, "3"]), 23);
  assert.strictEqual(fsum([3, "20"]), 23);
  assert.strictEqual(fsum(["20", 3]), 23);
});

it("fsum(array) ignores non-numeric values", () => {
  assert.strictEqual(fsum(["a", "b", "c"]), 0);
  assert.strictEqual(fsum(["a", 1, "2"]), 3);
});

it("fsum(array) ignores null, undefined and NaN", () => {
  assert.strictEqual(fsum([NaN, 1, 2, 3, 4, 5]), 15);
  assert.strictEqual(fsum([1, 2, 3, 4, 5, NaN]), 15);
  assert.strictEqual(fsum([10, null, 3, undefined, 5, NaN]), 18);
});

it("fsum(array) returns zero if there are no numbers", () => {
  assert.strictEqual(fsum([]), 0);
  assert.strictEqual(fsum([NaN]), 0);
  assert.strictEqual(fsum([undefined]), 0);
  assert.strictEqual(fsum([undefined, NaN]), 0);
  assert.strictEqual(fsum([undefined, NaN, {}]), 0);
});

it("fsum(array, f) returns the fsum of the specified numbers", () => {
  assert.strictEqual(fsum([1].map(box), unbox), 1);
  assert.strictEqual(fsum([5, 1, 2, 3, 4].map(box), unbox), 15);
  assert.strictEqual(fsum([20, 3].map(box), unbox), 23);
  assert.strictEqual(fsum([3, 20].map(box), unbox), 23);
});

it("fsum(array, f) observes values that can be coerced to numbers", () => {
  assert.strictEqual(fsum(["20", "3"].map(box), unbox), 23);
  assert.strictEqual(fsum(["3", "20"].map(box), unbox), 23);
  assert.strictEqual(fsum(["3", 20].map(box), unbox), 23);
  assert.strictEqual(fsum([20, "3"].map(box), unbox), 23);
  assert.strictEqual(fsum([3, "20"].map(box), unbox), 23);
  assert.strictEqual(fsum(["20", 3].map(box), unbox), 23);
});

it("fsum(array, f) ignores non-numeric values", () => {
  assert.strictEqual(fsum(["a", "b", "c"].map(box), unbox), 0);
  assert.strictEqual(fsum(["a", 1, "2"].map(box), unbox), 3);
});

it("fsum(array, f) ignores null, undefined and NaN", () => {
  assert.strictEqual(fsum([NaN, 1, 2, 3, 4, 5].map(box), unbox), 15);
  assert.strictEqual(fsum([1, 2, 3, 4, 5, NaN].map(box), unbox), 15);
  assert.strictEqual(fsum([10, null, 3, undefined, 5, NaN].map(box), unbox), 18);
});

it("fsum(array, f) returns zero if there are no numbers", () => {
  assert.strictEqual(fsum([].map(box), unbox), 0);
  assert.strictEqual(fsum([NaN].map(box), unbox), 0);
  assert.strictEqual(fsum([undefined].map(box), unbox), 0);
  assert.strictEqual(fsum([undefined, NaN].map(box), unbox), 0);
  assert.strictEqual(fsum([undefined, NaN, {}].map(box), unbox), 0);
});

it("fsum(array, f) passes the accessor d, i, and array", () => {
  const results = [];
  const array = ["a", "b", "c"];
  fsum(array, (d, i, array) => results.push([d, i, array]));
  assert.deepStrictEqual(results, [["a", 0, array], ["b", 1, array], ["c", 2, array]]);
});

it("fsum(array, f) uses the undefined context", () => {
  const results = [];
  fsum([1, 2], function() { results.push(this); });
  assert.deepStrictEqual(results, [undefined, undefined]);
});

function box(value) {
  return {value: value};
}

function unbox(box) {
  return box.value;
}
