import assert from "assert";
import {namespaces, select, selectAll} from "../../src/index.js";
import it from "../jsdom.js";

it("selection.attr(name) returns the value of the attribute with the specified name on the first selected element", "<h1 class='c1 c2'>hello</h1><h1 class='c3'></h1>", () => {
  assert.strictEqual(select(document).select("h1").attr("class"), "c1 c2");
  assert.strictEqual(selectAll([null, document]).select("h1").attr("class"), "c1 c2");
});

it("selection.attr(name) coerces the specified name to a string", "<h1 class='c1 c2'>hello</h1><h1 class='c3'></h1>", () => {
  assert.strictEqual(select(document).select("h1").attr({toString() { return "class"; }}), "c1 c2");
});

it("selection.attr(name) observes the namespace prefix, if any", () => {
  const selection = select({
    getAttribute(name) {
      return name === "foo" ? "bar" : null;
    },
    getAttributeNS(url, name) {
      return url === "http://www.w3.org/2000/svg" && name === "foo" ? "svg:bar" : null;
    }
  });
  assert.strictEqual(selection.attr("foo"), "bar");
  assert.strictEqual(selection.attr("svg:foo"), "svg:bar");
});

it("selection.attr(name) observes a custom namespace prefix, if any", () => {
  const selection = select({
    getAttributeNS(url, name) {
      return url === "https://d3js.org/2016/namespace" && name === "pie" ? "tasty" : null;
    }
  });
  try {
    namespaces.d3js = "https://d3js.org/2016/namespace";
    assert.strictEqual(selection.attr("d3js:pie"), "tasty");
  } finally {
    delete namespaces.d3js;
  }
});

it("selection.attr(name, value) observes the namespace prefix, if any", () => {
  let result;
  const selection = select({
    setAttribute(name, value) {
      result = name === "foo" ? value : null;
    },
    setAttributeNS(url, name, value) {
      result = url === "http://www.w3.org/2000/svg" && name === "foo" ? value : null;
    }
  });
  assert.strictEqual((result = undefined, selection.attr("foo", "bar"), result), "bar");
  assert.strictEqual((result = undefined, selection.attr("svg:foo", "svg:bar"), result), "svg:bar");
  assert.strictEqual((result = undefined, selection.attr("foo", function() { return "bar"; }), result), "bar");
  assert.strictEqual((result = undefined, selection.attr("svg:foo", function() { return "svg:bar"; }), result), "svg:bar");
});

it("selection.attr(name, null) observes the namespace prefix, if any", () => {
  let result;
  const selection = select({
    removeAttribute(name) {
      result = name === "foo" ? "foo" : null;
    },
    removeAttributeNS(url, name) {
      result = url === "http://www.w3.org/2000/svg" && name === "foo" ? "svg:foo" : null;
    }
  });
  assert.strictEqual((result = undefined, selection.attr("foo", null), result), "foo");
  assert.strictEqual((result = undefined, selection.attr("svg:foo", null), result), "svg:foo");
  assert.strictEqual((result = undefined, selection.attr("foo", function() { return null; }), result), "foo");
  assert.strictEqual((result = undefined, selection.attr("svg:foo", function() { return null; }), result), "svg:foo");
});

it("selection.attr(name, value) sets the value of the attribute with the specified name on the selected elements", "<h1 id='one' class='c1 c2'>hello</h1><h1 id='two' class='c3'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const s = selectAll([one, two]);
  assert.strictEqual(s.attr("foo", "bar"), s);
  assert.strictEqual(one.getAttribute("foo"), "bar");
  assert.strictEqual(two.getAttribute("foo"), "bar");
});

it("selection.attr(name, null) removes the attribute with the specified name on the selected elements", "<h1 id='one' foo='bar' class='c1 c2'>hello</h1><h1 id='two' foo='bar' class='c3'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const s = selectAll([one, two]);
  assert.strictEqual(s.attr("foo", null), s);
  assert.strictEqual(one.hasAttribute("foo"), false);
  assert.strictEqual(two.hasAttribute("foo"), false);
});

it("selection.attr(name, function) sets the value of the attribute with the specified name on the selected elements", "<h1 id='one' class='c1 c2'>hello</h1><h1 id='two' class='c3'></h1>", () => {
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const selection = selectAll([one, two]);
  assert.strictEqual(selection.attr("foo", function(d, i) { return i ? "bar-" + i : null; }), selection);
  assert.strictEqual(one.hasAttribute("foo"), false);
  assert.strictEqual(two.getAttribute("foo"), "bar-1");
});

it("selection.attr(name, function) passes the value function data, index and group", "<parent id='one'><child id='three'></child><child id='four'></child></parent><parent id='two'><child id='five'></child></parent>", () => {
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
      .attr("foo", function(d, i, nodes) { results.push([this, d, i, nodes]); });

  assert.deepStrictEqual(results, [
    [three, "child-0-0", 0, [three, four]],
    [four, "child-0-1", 1, [three, four]],
    [five, "child-1-0", 0, [five,, ]]
  ]);
});
