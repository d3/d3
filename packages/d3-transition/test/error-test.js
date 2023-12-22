import assert from "assert";
import {select} from "d3-selection";
import {timeout} from "d3-timer";
import "../src/index.js";
import it from "./jsdom.js";

describe("with an uncaught error", () => {
  let listeners;

  beforeEach(() => {
    listeners = process.listeners("uncaughtException");
    process.removeAllListeners("uncaughtException");
    process.once("uncaughtException", () => {});
  });

  afterEach(() => {
    for (const listener of listeners) {
      process.on("uncaughtException", listener);
    }
  });

  it("transition.on(\"start\", error) terminates the transition", async () => {
    const root = document.documentElement;
    const s = select(root);
    s.transition().on("start", () => { throw new Error; });
    await new Promise(resolve => timeout(resolve));
    assert.strictEqual(root.__transition, undefined);
  });

  it("transition.on(\"start\", error) with delay terminates the transition", async () => {
    const root = document.documentElement;
    const s = select(root);
    s.transition().delay(50).on("start", () => { throw new Error; });
    await new Promise(resolve => timeout(resolve, 50));
    assert.strictEqual(root.__transition, undefined);
  });

  it("transition.tween(\"foo\", error) terminates the transition", async () => {
    const root = document.documentElement;
    const s = select(root);
    s.transition().tween("foo", () => { throw new Error; });
    await new Promise(resolve => timeout(resolve));
    assert.strictEqual(root.__transition, undefined);
  });

  it("transition.tween(\"foo\", error) with delay terminates the transition", async () => {
    const root = document.documentElement;
    const s = select(root);
    s.transition().delay(50).tween("foo", () => { throw new Error; });
    await new Promise(resolve => timeout(resolve, 50));
    assert.strictEqual(root.__transition, undefined);
  });

  it("transition.tween(\"foo\", deferredError) terminates the transition", async () => {
    const root = document.documentElement;
    const s = select(root);
    s.transition().duration(50).tween("foo", () => { return function(t) { if (t === 1) throw new Error; }; });
    await new Promise(resolve => timeout(resolve, 50));
    assert.strictEqual(root.__transition, undefined);
  });

  it("transition.on(\"end\", error) terminates the transition", async () => {
    const root = document.documentElement;
    const s = select(root);
    s.transition().delay(50).duration(50).on("end", () => { throw new Error; });
    await new Promise(resolve => timeout(resolve, 100));
    assert.strictEqual(root.__transition, undefined);
  });
});
