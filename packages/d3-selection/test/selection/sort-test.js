import assert from "assert";
import {selectAll} from "../../src/index.js";
import {assertSelection} from "../asserts.js";
import it from "../jsdom.js";

it("selection.sort(…) returns a new selection, sorting each group’s data, and then ordering the elements to match", "<h1 id='one' data-value='1'></h1><h1 id='two' data-value='0'></h1><h1 id='three' data-value='2'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const three = document.querySelector("#three");
  const selection0 = selectAll([two, three, one]).datum(function() { return +this.getAttribute("data-value"); });
  const selection1 = selection0.sort(function(a, b) { return a - b; });
  assertSelection(selection0, {groups: [[two, three, one]], parents: [null]});
  assertSelection(selection1, {groups: [[two, one, three]], parents: [null]});
  assert.strictEqual(two.nextSibling, one);
  assert.strictEqual(one.nextSibling, three);
  assert.strictEqual(three.nextSibling, null);
});

it("selection.sort(…) sorts each group separately", "<div id='one'><h1 id='three' data-value='1'></h1><h1 id='four' data-value='0'></h1></div><div id='two'><h1 id='five' data-value='3'></h1><h1 id='six' data-value='-1'></h1></div>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const three = document.querySelector("#three");
  const four = document.querySelector("#four");
  const five = document.querySelector("#five");
  const six = document.querySelector("#six");
  const selection = selectAll([one, two]).selectAll("h1").datum(function() { return +this.getAttribute("data-value"); });
  assertSelection(selection.sort(function(a, b) { return a - b; }), {groups: [[four, three], [six, five]], parents: [one, two]});
  assert.strictEqual(four.nextSibling, three);
  assert.strictEqual(three.nextSibling, null);
  assert.strictEqual(six.nextSibling, five);
  assert.strictEqual(five.nextSibling, null);
});

it("selection.sort() uses natural ascending order", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const selection = selectAll([two, one]).datum(function(d, i) { i; });
  assertSelection(selection.sort(), {groups: [[two, one]], parents: [null]});
  assert.strictEqual(one.nextSibling, null);
  assert.strictEqual(two.nextSibling, one);
});

it("selection.sort() puts missing elements at the end of each group", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  selectAll([two, one]).datum(function(d, i) { return i; });
  assertSelection(selectAll([, one,, two]).sort(), {groups: [[two, one,,, ]], parents: [null]});
  assert.strictEqual(two.nextSibling, one);
  assert.strictEqual(one.nextSibling, null);
});

it("selection.sort(function) puts missing elements at the end of each group", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  selectAll([two, one]).datum(function(d, i) { return i; });
  assertSelection(selectAll([, one,, two]).sort(function(a, b) { return b - a; }), {groups: [[one, two,,, ]], parents: [null]});
  assert.strictEqual(one.nextSibling, two);
  assert.strictEqual(two.nextSibling, null);
});

it("selection.sort(function) uses the specified data comparator function", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const selection = selectAll([two, one]).datum(function(d, i) { return i; });
  assertSelection(selection.sort(function(a, b) { return b - a; }), {groups: [[one, two]], parents: [null]});
  assert.strictEqual(one.nextSibling, two);
  assert.strictEqual(two.nextSibling, null);
});

it("selection.sort(function) returns a new selection, and does not modify the groups array in-place", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const selection0 = selectAll([one, two]).datum(function(d, i) { return i; });
  const selection1 = selection0.sort(function(a, b) { return b - a; });
  const selection2 = selection1.sort();
  assertSelection(selection0, {groups: [[one, two]], parents: [null]});
  assertSelection(selection1, {groups: [[two, one]], parents: [null]});
  assertSelection(selection2, {groups: [[one, two]], parents: [null]});
});
