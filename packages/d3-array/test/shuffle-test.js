import assert from "assert";
import {randomLcg} from "d3-random";
import {pairs, shuffler} from "../src/index.js";

it("shuffle(array) shuffles the array in-place", () => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffle = shuffler(randomLcg(0.9051667019185816));
  assert.strictEqual(shuffle(numbers), numbers);
  assert(pairs(numbers).some(([a, b]) => a > b)); // shuffled
});

it("shuffler(random)(array) shuffles the array in-place", () => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffle = shuffler(randomLcg(0.9051667019185816));
  assert.strictEqual(shuffle(numbers), numbers);
  assert.deepStrictEqual(numbers, [7, 4, 5, 3, 9, 0, 6, 1, 2, 8]);
});

it("shuffler(random)(array, start) shuffles the subset array[start:] in-place", () => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffle = shuffler(randomLcg(0.9051667019185816));
  assert.strictEqual(shuffle(numbers, 4), numbers);
  assert.deepStrictEqual(numbers, [0, 1, 2, 3, 8, 7, 6, 4, 5, 9]);
});

it("shuffler(random)(array, start, end) shuffles the subset array[start:end] in-place", () => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffle = shuffler(randomLcg(0.9051667019185816));
  assert.strictEqual(shuffle(numbers, 3, 8), numbers);
  assert.deepStrictEqual(numbers, [0, 1, 2, 5, 6, 3, 4, 7, 8, 9]);
});
