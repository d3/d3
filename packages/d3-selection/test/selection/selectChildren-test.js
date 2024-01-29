import assert from "assert";
import {select, selection} from "../../src/index.js";
import {assertSelection} from "../asserts.js";
import it from "../jsdom.js";

it("select.selectChild(…) selects the first (matching) child", "<h1><span>hello</span>, <span>world<span>!</span></span></h1>", () => {
  const s = select(document).select("h1");
  assert(s.selectChild(() => true) instanceof selection);
  assertSelection(s.selectChild(() => true), s.select("*"));
  assert(s.selectChild() instanceof selection);
  assert(s.selectChild("*") instanceof selection);
  assertSelection(s.selectChild("*"), s.select("*"));
  assertSelection(s.selectChild(), s.select("*"));
  assertSelection(s.selectChild("div"), s.select("div"));
  assert.strictEqual(s.selectChild("span").text(), "hello");
});

it("selectAll.selectChild(…) selects the first (matching) child", "<div><span>hello</span>, <span>world<span>!</span></span></div><div><span>hello2</span>, <span>world2<span>!2</span></span></div>", () => {
  const s = select(document).selectAll("div");
  assert(s.selectChild(() => true) instanceof selection);
  assertSelection(s.selectChild(() => true), s.select("*"));
  assert(s.selectChild() instanceof selection);
  assert(s.selectChild("*") instanceof selection);
  assertSelection(s.selectChild("*"), s.select("*"));
  assertSelection(s.selectChild(), s.select("*"));
  assertSelection(s.selectChild("div"), s.select("div"));
  assert.strictEqual(s.selectChild("span").text(), "hello");
});

it("select.selectChildren(…) selects the matching children", "<h1><span>hello</span>, <span>world<span>!</span></span></h1>", () => {
  const s = select(document).select("h1");
  assert(s.selectChildren("*") instanceof selection);
  assert.strictEqual(s.selectChildren("*").text(), "hello");
  assert.strictEqual(s.selectChildren().size(), 2);
  assert.strictEqual(s.selectChildren("*").size(), 2);
  assertSelection(s.selectChildren(), s.selectChildren("*"));
  assert.strictEqual(s.selectChildren("span").size(), 2);
  assert.strictEqual(s.selectChildren("div").size(), 0);
});

it("selectAll.selectChildren(…) selects the matching children", "<div><span>hello</span>, <span>world<span>!</span></span></div><div><span>hello2</span>, <span>world2<span>!2</span></span></div>", () => {
  const s = select(document).selectAll("div");
  assert(s.selectChildren("*") instanceof selection);
  assert.strictEqual(s.selectChildren("*").text(), "hello");
  assert.strictEqual(s.selectChildren().size(), 4);
  assert.strictEqual(s.selectChildren("*").size(), 4);
  assertSelection(s.selectChildren(), s.selectChildren("*"));
  assert.strictEqual(s.selectChildren("span").size(), 4);
  assert.strictEqual(s.selectChildren("div").size(), 0);
});
