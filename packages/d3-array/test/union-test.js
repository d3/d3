import {union} from "../src/index.js";
import {assertSetEqual} from "./asserts.js";

it("union(values) returns a set of values", () => {
  assertSetEqual(union([1, 2, 3, 2, 1]), [1, 2, 3]);
});

it("union(values, other) returns a set of values", () => {
  assertSetEqual(union([1, 2], [2, 3, 1]), [1, 2, 3]);
});

it("union(...values) returns a set of values", () => {
  assertSetEqual(union([1], [2], [2, 3], [1]), [1, 2, 3]);
});

it("union(...values) accepts iterables", () => {
  assertSetEqual(union(new Set([1, 2, 3])), [1, 2, 3]);
  assertSetEqual(union(Uint8Array.of(1, 2, 3)), [1, 2, 3]);
});

it("union(...values) performs interning", () => {
  assertSetEqual(union([new Date("2021-01-01"), new Date("2021-01-01"), new Date("2021-01-02")]), [new Date("2021-01-01"), new Date("2021-01-02")]);
  assertSetEqual(union([new Date("2021-01-01"), new Date("2021-01-03")], [new Date("2021-01-01"), new Date("2021-01-02")]), [new Date("2021-01-01"), new Date("2021-01-02"), new Date("2021-01-03")]);
});
