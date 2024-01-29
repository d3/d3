import assert from "assert";
import {select} from "../../src/index.js";
import {assertSelection, enterNode} from "../asserts.js";
import it from "../jsdom.js";

it("selection.enter() returns an empty selection before a data-join", "<h1>hello</h1>", () => {
  const s = select(document.body);
  assertSelection(s.enter(), {groups: [[, ]], parents: [null]});
});

it("selection.enter() contains EnterNodes", () => {
  const s = select(document.body).selectAll("div").data([1, 2, 3]);
  assert.strictEqual(s.enter().node()._parent, document.body);
});

it("selection.enter() shares the update selection’s parents", "<h1>hello</h1>", () => {
  const s = select(document.body);
  assert.strictEqual(s.enter()._parents, s._parents);
});

it("selection.enter() returns the same selection each time", "<h1>hello</h1>", () => {
  const s = select(document.body);
  assert.deepStrictEqual(s.enter(), s.enter());
});

it("selection.enter() contains unbound data after a data-join", "<div id='one'></div><div id='two'></div>", () => {
  const s = select(document.body).selectAll("div").data(["foo", "bar", "baz"]);
  assertSelection(s.enter(), {
    groups: [[,, enterNode(document.body, "baz")]],
    parents: [document.body]
  });
});

it("selection.enter() uses the order of the data", "<div id='one'></div><div id='two'></div><div id='three'></div>", () => {
  const selection = select(document.body).selectAll("div").data(["one", "four", "three", "five"], function(d) { return d || this.id; });
  assertSelection(selection.enter(), {
    groups: [[, enterNode(document.body, "four", "#three"),, enterNode(document.body, "five")]],
    parents: [document.body]
  });
});

it("enter.append(…) inherits the namespaceURI from the parent", () => {
  const root = select(document.body).append("div");
  const svg = root.append("svg");
  const g = svg.selectAll("g").data(["foo"]).enter().append("g");
  assert.strictEqual(root.node().namespaceURI, "http://www.w3.org/1999/xhtml");
  assert.strictEqual(svg.node().namespaceURI, "http://www.w3.org/2000/svg");
  assert.strictEqual(g.node().namespaceURI, "http://www.w3.org/2000/svg");
});

it("enter.append(…) does not override an explicit namespace", () => {
  const root = select(document.body).append("div");
  const svg = root.append("svg");
  const g = svg.selectAll("g").data(["foo"]).enter().append("xhtml:g");
  assert.strictEqual(root.node().namespaceURI, "http://www.w3.org/1999/xhtml");
  assert.strictEqual(svg.node().namespaceURI, "http://www.w3.org/2000/svg");
  assert.strictEqual(g.node().namespaceURI, "http://www.w3.org/1999/xhtml");
});

it("enter.append(…) inserts entering nodes before the next node in the update selection", () => {
  const identity = function(d) { return d; };
  let p = select(document.body).selectAll("p");
  p = p.data([1, 3], identity);
  p = p.enter().append("p").text(identity).merge(p);
  p = p.data([0, 1, 2, 3, 4], identity);
  p = p.enter().append("p").text(identity).merge(p);
  p;
  assert.strictEqual(document.body.innerHTML, "<p>0</p><p>1</p><p>2</p><p>3</p><p>4</p>");
});

it("enter.insert(…, before) inserts entering nodes before the sibling matching the specified selector", "<hr>", () => {
  const identity = function(d) { return d; };
  let p = select(document.body).selectAll("p");
  p = p.data([1, 3], identity);
  p = p.enter().insert("p", "hr").text(identity).merge(p);
  p = p.data([0, 1, 2, 3, 4], identity);
  p = p.enter().insert("p", "hr").text(identity).merge(p);
  p;
  assert.strictEqual(document.body.innerHTML, "<p>1</p><p>3</p><p>0</p><p>2</p><p>4</p><hr>");
});

it("enter.insert(…, null) inserts entering nodes after the last child", () => {
  const identity = function(d) { return d; };
  let p = select(document.body).selectAll("p");
  p = p.data([1, 3], identity);
  p = p.enter().insert("p", null).text(identity).merge(p);
  p = p.data([0, 1, 2, 3, 4], identity);
  p = p.enter().insert("p", null).text(identity).merge(p);
  p;
  assert.strictEqual(document.body.innerHTML, "<p>1</p><p>3</p><p>0</p><p>2</p><p>4</p>");
});
