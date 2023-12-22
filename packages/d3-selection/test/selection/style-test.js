import assert from "assert";
import {select, selectAll, style} from "../../src/index.js";
import it from "../jsdom.js";

it("style(node, name) returns the inline value of the style property with the specified name on the first selected element, if present", () => {
  const node = {style: {getPropertyValue: function(name) { return name === "color" ? "red" : ""}}};
  assert.strictEqual(style(node, "color"), "red");
});

it("style(node, name) returns the computed value of the style property with the specified name on the first selected element, if there is no inline style", () => {
  const styles = {getPropertyValue: function(name) { return name === "color" ? "rgb(255, 0, 0)" : ""}};
  const node = {style: {getPropertyValue: function() { return ""; }}, ownerDocument: {defaultView: {getComputedStyle: function(n) { return n === node ? styles : null; }}}};
  assert.strictEqual(style(node, "color"), "rgb(255, 0, 0)");
});

it("selection.style(name) returns the inline value of the style property with the specified name on the first selected element, if present", () => {
  const node = {style: {getPropertyValue: function(name) { return name === "color" ? "red" : ""}}};
  assert.strictEqual(select(node).style("color"), "red");
  assert.strictEqual(selectAll([null, node]).style("color"), "red");
});

it("selection.style(name) returns the computed value of the style property with the specified name on the first selected element, if there is no inline style", () => {
  const style = {getPropertyValue: function(name) { return name === "color" ? "rgb(255, 0, 0)" : ""}};
  const node = {style: {getPropertyValue: function() { return ""; }}, ownerDocument: {defaultView: {getComputedStyle: function(n) { return n === node ? style : null; }}}};
  assert.strictEqual(select(node).style("color"), "rgb(255, 0, 0)");
  assert.strictEqual(selectAll([null, node]).style("color"), "rgb(255, 0, 0)");
});

it("selection.style(name, value) sets the value of the style property with the specified name on the selected elements", "<h1 id='one' class='c1 c2'>hello</h1><h1 id='two' class='c3'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const s = selectAll([one, two]);
  assert.strictEqual(s.style("color", "red"), s);
  assert.strictEqual(one.style.getPropertyValue("color"), "red");
  assert.strictEqual(one.style.getPropertyPriority("color"), "");
  assert.strictEqual(two.style.getPropertyValue("color"), "red");
  assert.strictEqual(two.style.getPropertyPriority("color"), "");
});

it("selection.style(name, value, priority) sets the value and priority of the style property with the specified name on the selected elements", "<h1 id='one' class='c1 c2'>hello</h1><h1 id='two' class='c3'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const s = selectAll([one, two]);
  assert.strictEqual(s.style("color", "red", "important"), s);
  assert.strictEqual(one.style.getPropertyValue("color"), "red");
  assert.strictEqual(one.style.getPropertyPriority("color"), "important");
  assert.strictEqual(two.style.getPropertyValue("color"), "red");
  assert.strictEqual(two.style.getPropertyPriority("color"), "important");
});

it("selection.style(name, null) removes the attribute with the specified name on the selected elements", "<h1 id='one' style='color:red;' class='c1 c2'>hello</h1><h1 id='two' style='color:red;' class='c3'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const s = selectAll([one, two]);
  assert.strictEqual(s.style("color", null), s);
  assert.strictEqual(one.style.getPropertyValue("color"), "");
  assert.strictEqual(one.style.getPropertyPriority("color"), "");
  assert.strictEqual(two.style.getPropertyValue("color"), "");
  assert.strictEqual(two.style.getPropertyPriority("color"), "");
});

it("selection.style(name, function) sets the value of the style property with the specified name on the selected elements", "<h1 id='one' class='c1 c2'>hello</h1><h1 id='two' class='c3'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const s = selectAll([one, two]);
  assert.strictEqual(s.style("color", function(d, i) { return i ? "red" : null; }), s);
  assert.strictEqual(one.style.getPropertyValue("color"), "");
  assert.strictEqual(one.style.getPropertyPriority("color"), "");
  assert.strictEqual(two.style.getPropertyValue("color"), "red");
  assert.strictEqual(two.style.getPropertyPriority("color"), "");
});

it("selection.style(name, function, priority) sets the value and priority of the style property with the specified name on the selected elements", "<h1 id='one' class='c1 c2'>hello</h1><h1 id='two' class='c3'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const s = selectAll([one, two]);
  assert.strictEqual(s.style("color", function(d, i) { return i ? "red" : null; }, "important"), s);
  assert.strictEqual(one.style.getPropertyValue("color"), "");
  assert.strictEqual(one.style.getPropertyPriority("color"), "");
  assert.strictEqual(two.style.getPropertyValue("color"), "red");
  assert.strictEqual(two.style.getPropertyPriority("color"), "important");
});

it("selection.style(name, function) passes the value function data, index and group", "<parent id='one'><child id='three'></child><child id='four'></child></parent><parent id='two'><child id='five'></child></parent>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const three = document.querySelector("#three");
  const four = document.querySelector("#four");
  const five = document.querySelector("#five");
  const results = [];

  selectAll([one, two])
      .datum(function(d, i) { return "parent-" + i; })
    .selectAll("child")
      .data(function(d, i) { return [0, 1].map(function(j) { return "child-" + i + "-" + j; }); })
      .style("color", function(d, i, nodes) { results.push([this, d, i, nodes]); });

  assert.deepStrictEqual(results, [
    [three, "child-0-0", 0, [three, four]],
    [four, "child-0-1", 1, [three, four]],
    [five, "child-1-0", 0, [five,, ]]
  ]);
});
