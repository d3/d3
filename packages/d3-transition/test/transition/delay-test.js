import assert from "assert";
import {select, selectAll} from "d3-selection";
import it from "../jsdom.js";
import "../../src/index.js";

it("transition.delay() returns the delay for the first non-null node", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const t1 = select(one).transition();
  const t2 = select(two).transition().delay(50);
  assert.strictEqual(one.__transition[t1._id].delay, 0);
  assert.strictEqual(two.__transition[t2._id].delay, 50);
  assert.strictEqual(t1.delay(), 0);
  assert.strictEqual(t2.delay(), 50);
  assert.strictEqual(select(one).transition(t1).delay(), 0);
  assert.strictEqual(select(two).transition(t2).delay(), 50);
  assert.strictEqual(selectAll([null, one]).transition(t1).delay(), 0);
  assert.strictEqual(selectAll([null, two]).transition(t2).delay(), 50);
});

it("transition.delay(number) sets the delay for each selected element to the specified number", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const t = selectAll([one, two]).transition().delay(50);
  assert.strictEqual(one.__transition[t._id].delay, 50);
  assert.strictEqual(two.__transition[t._id].delay, 50);
});

it("transition.delay(value) coerces the specified value to a number", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const t = selectAll([one, two]).transition().delay("50");
  assert.strictEqual(one.__transition[t._id].delay, 50);
  assert.strictEqual(two.__transition[t._id].delay, 50);
});

it("transition.delay(function) passes the expected arguments and context to the function", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const result = [];
  const s = selectAll([one, two]).data(["one", "two"]);
  const t = s.transition().delay(function(d, i, nodes) { result.push([d, i, nodes, this]); });
  assert.deepStrictEqual(result, [
    ["one", 0, t._groups[0], one],
    ["two", 1, t._groups[0], two]
  ]);
});

it("transition.delay(function) sets the delay for each selected element to the number returned by the specified function", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const t = selectAll([one, two]).transition().delay(function(d, i) { return i * 20; });
  assert.strictEqual(one.__transition[t._id].delay, 0);
  assert.strictEqual(two.__transition[t._id].delay, 20);
});

it("transition.delay(function) coerces the value returned by the specified function to a number", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const t = selectAll([one, two]).transition().delay(function(d, i) { return i * 20 + ""; });
  assert.strictEqual(one.__transition[t._id].delay, 0);
  assert.strictEqual(two.__transition[t._id].delay, 20);
});
