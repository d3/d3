import assert from "assert";
import {select, selection} from "../src/index.js";
import {assertSelection} from "./asserts.js";
import it from "./jsdom.js";

it("select(…) returns an instanceof selection", "<h1>hello</h1>", () => {
  assert(select(document) instanceof selection);
});

it("select(string) selects the first element that matches the selector string", "<h1 id='one'>foo</h1><h1 id='two'>bar</h1>", () => {
  assertSelection(select("h1"), {groups: [[document.querySelector("h1")]], parents: [document.documentElement]});
});

it("select(element) selects the given element", "<h1>hello</h1>", () => {
  assertSelection(select(document.body), {groups: [[document.body]]});
  assertSelection(select(document.documentElement), {groups: [[document.documentElement]]});
});

it("select(window) selects the given window", "<h1>hello</h1>", () => {
  assertSelection(select(document.defaultView), {groups: [[document.defaultView]]});
});

it("select(document) selects the given document", "<h1>hello</h1>", () => {
  assertSelection(select(document), {groups: [[document]]});
});

it("select(null) selects null", "<h1>hello</h1><null></null><undefined></undefined>", () => {
  assertSelection(select(null), {groups: [[null]]});
  assertSelection(select(undefined), {groups: [[undefined]]});
  assertSelection(select(), {groups: [[undefined]]});
});

it("select(object) selects an arbitrary object", () => {
  const object = {};
  assertSelection(select(object), {groups: [[object]]});
});
