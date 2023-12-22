import assert from "assert";
import {flatRollup} from "../src/index.js";

const data = [
  {name: "jim",   amount: "34.0",   date: "11/12/2015"},
  {name: "carl",  amount: "120.11", date: "11/12/2015"},
  {name: "stacy", amount: "12.01",  date: "01/04/2016"},
  {name: "stacy", amount: "34.05",  date: "01/04/2016"}
];

it("flatRollup(data, reduce, accessor) returns the expected array", () => {
  assert.deepStrictEqual(
    flatRollup(data, v => v.length, d => d.name),
    [
      ['jim', 1],
      ['carl', 1],
      ['stacy', 2]
    ]
  );
});

it("flatRollup(data, reduce, accessor, accessor) returns the expected array", () => {
  assert.deepStrictEqual(
    flatRollup(data, v => v.length, d => d.name, d => d.amount),
    [
      ['jim', '34.0', 1],
      ['carl', '120.11', 1],
      ['stacy', '12.01', 1],
      ['stacy', '34.05', 1]
    ]
  );
});
