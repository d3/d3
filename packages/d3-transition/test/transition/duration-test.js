import assert from "assert";
import {select, selectAll} from "d3-selection";
import "../../src/index.js";
import it from "../jsdom.js";

it("transition.duration() returns the duration for the first non-null node", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const t1 = select(one).transition();
  const t2 = select(two).transition().duration(50);
  assert.strictEqual(one.__transition[t1._id].duration, 250);
  assert.strictEqual(two.__transition[t2._id].duration, 50);
  assert.strictEqual(t1.duration(), 250);
  assert.strictEqual(t2.duration(), 50);
  assert.strictEqual(select(one).transition(t1).duration(), 250);
  assert.strictEqual(select(two).transition(t2).duration(), 50);
  assert.strictEqual(selectAll([null, one]).transition(t1).duration(), 250);
  assert.strictEqual(selectAll([null, two]).transition(t2).duration(), 50);
});

it("transition.duration(number) sets the duration for each selected element to the specified number", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const t = selectAll([one, two]).transition().duration(50);
  assert.strictEqual(one.__transition[t._id].duration, 50);
  assert.strictEqual(two.__transition[t._id].duration, 50);
});

it("transition.duration(value) coerces the specified value to a number", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const t = selectAll([one, two]).transition().duration("50");
  assert.strictEqual(one.__transition[t._id].duration, 50);
  assert.strictEqual(two.__transition[t._id].duration, 50);
});

it("transition.duration(function) passes the expected arguments and context to the function", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const result = [];
  const s = selectAll([one, two]).data(["one", "two"]);
  const t = s.transition().duration(function(d, i, nodes) { result.push([d, i, nodes, this]); });
  assert.deepStrictEqual(result, [
    ["one", 0, t._groups[0], one],
    ["two", 1, t._groups[0], two]
  ]);
});

it("transition.duration(function) sets the duration for each selected element to the number returned by the specified function", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const t = selectAll([one, two]).transition().duration(function(d, i) { return i * 20; });
  assert.strictEqual(one.__transition[t._id].duration, 0);
  assert.strictEqual(two.__transition[t._id].duration, 20);
});

it("transition.duration(function) coerces the value returned by the specified function to a number", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const t = selectAll([one, two]).transition().duration(function(d, i) { return i * 20 + ""; });
  assert.strictEqual(one.__transition[t._id].duration, 0);
  assert.strictEqual(two.__transition[t._id].duration, 20);
});
