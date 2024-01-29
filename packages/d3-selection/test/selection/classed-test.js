import assert from "assert";
import {select, selectAll} from "../../src/index.js";
import it from "../jsdom.js";

it("selection.classed(classes) returns true if and only if the first element has the specified classes", "<h1 class='c1 c2'>hello</h1><h1 class='c3'></h1>", () => {
  assert.strictEqual(select(document).select("h1").classed(""), true);
  assert.strictEqual(select(document).select("h1").classed("c1"), true);
  assert.strictEqual(select(document).select("h1").classed("c2"), true);
  assert.strictEqual(select(document).select("h1").classed("c3"), false);
  assert.strictEqual(select(document).select("h1").classed("c1 c2"), true);
  assert.strictEqual(select(document).select("h1").classed("c2 c1"), true);
  assert.strictEqual(select(document).select("h1").classed("c1 c3"), false);
  assert.strictEqual(selectAll([null, document]).select("h1").classed("c1"), true);
  assert.strictEqual(selectAll([null, document]).select("h1").classed("c2"), true);
  assert.strictEqual(selectAll([null, document]).select("h1").classed("c3"), false);
});

it("selection.classed(classes) coerces the specified classes to a string", "<h1 class='c1 c2'>hello</h1><h1 class='c3'></h1>", () => {
  assert.strictEqual(select(document).select("h1").classed({toString: function() { return "c1 c2"; }}), true);
});

it("selection.classed(classes) gets the class attribute if classList is not supported", () => {
  const node = new MockNode("c1 c2");
  assert.strictEqual(select(node).classed(""), true);
  assert.strictEqual(select(node).classed("c1"), true);
  assert.strictEqual(select(node).classed("c2"), true);
  assert.strictEqual(select(node).classed("c3"), false);
  assert.strictEqual(select(node).classed("c1 c2"), true);
  assert.strictEqual(select(node).classed("c2 c1"), true);
  assert.strictEqual(select(node).classed("c1 c3"), false);
});

it("selection.classed(classes, value) sets whether the selected elements have the specified classes", () => {
  const s = select(document.body);
  assert.strictEqual(s.classed("c1"), false);
  assert.strictEqual(s.attr("class"), null);
  assert.strictEqual(s.classed("c1", true), s);
  assert.strictEqual(s.classed("c1"), true);
  assert.strictEqual(s.attr("class"), "c1");
  assert.strictEqual(s.classed("c1 c2", true), s);
  assert.strictEqual(s.classed("c1"), true);
  assert.strictEqual(s.classed("c2"), true);
  assert.strictEqual(s.classed("c1 c2"), true);
  assert.strictEqual(s.attr("class"), "c1 c2");
  assert.strictEqual(s.classed("c1", false), s);
  assert.strictEqual(s.classed("c1"), false);
  assert.strictEqual(s.classed("c2"), true);
  assert.strictEqual(s.classed("c1 c2"), false);
  assert.strictEqual(s.attr("class"), "c2");
  assert.strictEqual(s.classed("c1 c2", false), s);
  assert.strictEqual(s.classed("c1"), false);
  assert.strictEqual(s.classed("c2"), false);
  assert.strictEqual(s.attr("class"), "");
});

it("selection.classed(classes, function) sets whether the selected elements have the specified classes", () => {
  const s = select(document.body);
  assert.strictEqual(s.classed("c1 c2", () => true), s);
  assert.strictEqual(s.attr("class"), "c1 c2");
  assert.strictEqual(s.classed("c1 c2", () => false), s);
  assert.strictEqual(s.attr("class"), "");
});

it("selection.classed(classes, function) passes the value function data, index and group", "<parent id='one'><child id='three'></child><child id='four'></child></parent><parent id='two'><child id='five'></child></parent>", () => {
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
      .classed("c1 c2", function(d, i, nodes) { results.push([this, d, i, nodes]); });

  assert.deepStrictEqual(results, [
    [three, "child-0-0", 0, [three, four]],
    [four, "child-0-1", 1, [three, four]],
    [five, "child-1-0", 0, [five,, ]]
  ]);
});

it("selection.classed(classes, value) sets the class attribute if classList is not supported", () => {
  const node = new MockNode(null);
  const s = select(node);
  assert.strictEqual(s.classed("c1"), false);
  assert.strictEqual(s.attr("class"), null);
  assert.strictEqual(s.classed("c1", true), s);
  assert.strictEqual(s.classed("c1"), true);
  assert.strictEqual(s.attr("class"), "c1");
  assert.strictEqual(s.classed("c1 c2", true), s);
  assert.strictEqual(s.classed("c1"), true);
  assert.strictEqual(s.classed("c2"), true);
  assert.strictEqual(s.classed("c1 c2"), true);
  assert.strictEqual(s.attr("class"), "c1 c2");
  assert.strictEqual(s.classed("c1", false), s);
  assert.strictEqual(s.classed("c1"), false);
  assert.strictEqual(s.classed("c2"), true);
  assert.strictEqual(s.classed("c1 c2"), false);
  assert.strictEqual(s.attr("class"), "c2");
  assert.strictEqual(s.classed("c1 c2", false), s);
  assert.strictEqual(s.classed("c1"), false);
  assert.strictEqual(s.classed("c2"), false);
  assert.strictEqual(s.attr("class"), "");
});

it("selection.classed(classes, value) coerces the specified classes to a string", "<h1>hello</h1>", () => {
  const s = select(document).select("h1");
  assert.strictEqual(s.classed("c1 c2"), false);
  assert.strictEqual(s.classed({toString: function() { return "c1 c2"; }}, true), s);
  assert.strictEqual(s.classed("c1 c2"), true);
});

class MockNode {
  constructor(classes) {
    this._classes = classes;
  }
  getAttribute(name) {
    return name === "class" ? this._classes : null;
  }
  setAttribute(name, value) {
    if (name === "class") this._classes = value;
  }
}
