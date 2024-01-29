import {difference} from "../src/index.js";
import {assertSetEqual} from "./asserts.js";

it("difference(values, other) returns a set of values", () => {
  assertSetEqual(difference([1, 2, 3], [2, 1]), [3]);
  assertSetEqual(difference([1, 2], [2, 3, 1]), []);
  assertSetEqual(difference([2, 1, 3], [4, 3, 1]), [2]);
});

it("difference(...values) accepts iterables", () => {
  assertSetEqual(difference(new Set([1, 2, 3]), new Set([1])), [2, 3]);
});

it("difference(values, other) performs interning", () => {
  assertSetEqual(difference([new Date("2021-01-01"), new Date("2021-01-02"), new Date("2021-01-03")], [new Date("2021-01-02"), new Date("2021-01-01")]), [new Date("2021-01-03")]);
  assertSetEqual(difference([new Date("2021-01-01"), new Date("2021-01-02")], [new Date("2021-01-02"), new Date("2021-01-03"), new Date("2021-01-01")]), []);
  assertSetEqual(difference([new Date("2021-01-02"), new Date("2021-01-01"), new Date("2021-01-03")], [new Date("2021-01-04"), new Date("2021-01-03"), new Date("2021-01-01")]), [new Date("2021-01-02")]);
});
