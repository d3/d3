import assert from "assert";
import {selectAll} from "../../src/index.js";
import it from "../jsdom.js";

it("selection.dispatch(type) dispatches a custom event of the specified type to each selected element in order", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  let event;
  const result = [];
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const selection = selectAll([one, two]).datum((d, i) => `node-${i}`).on("bang", function(e, d) { event = e; result.push(this, d); });
  assert.strictEqual(selection.dispatch("bang"), selection);
  assert.deepStrictEqual(result, [one, "node-0", two, "node-1"]);
  assert.strictEqual(event.type, "bang");
  assert.strictEqual(event.bubbles, false);
  assert.strictEqual(event.cancelable, false);
  assert.strictEqual(event.detail, null);
});

it("selection.dispatch(type, params) dispatches a custom event with the specified constant parameters", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  let event;
  const result = [];
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const selection = selectAll([one, two]).datum((d, i) => `node-${i}`).on("bang", function(e, d) { event = e; result.push(this, d); });
  assert.strictEqual(selection.dispatch("bang", {bubbles: true, cancelable: true, detail: "loud"}), selection);
  assert.deepStrictEqual(result, [one, "node-0", two, "node-1"]);
  assert.strictEqual(event.type, "bang");
  assert.strictEqual(event.bubbles, true);
  assert.strictEqual(event.cancelable, true);
  assert.strictEqual(event.detail, "loud");
});

it("selection.dispatch(type, function) dispatches a custom event with the specified parameter function", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  const result = [];
  const events = [];
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const selection = selectAll([one, two]).datum((d, i) => `node-${i}`).on("bang", function(e, d) { events.push(e); result.push(this, d); });
  assert.strictEqual(selection.dispatch("bang", (d, i) => ({bubbles: true, cancelable: true, detail: "loud-" + i})), selection);
  assert.deepStrictEqual(result, [one, "node-0", two, "node-1"]);
  assert.strictEqual(events[0].type, "bang");
  assert.strictEqual(events[0].bubbles, true);
  assert.strictEqual(events[0].cancelable, true);
  assert.strictEqual(events[0].detail, "loud-0");
  assert.strictEqual(events[1].type, "bang");
  assert.strictEqual(events[1].bubbles, true);
  assert.strictEqual(events[1].cancelable, true);
  assert.strictEqual(events[1].detail, "loud-1");
});

it("selection.dispatch(type) skips missing elements", "<h1 id='one'></h1><h1 id='two'></h1>", () => {
  let event;
  const result = [];
  const one = document.querySelector("#one");
  const two = document.querySelector("#two");
  const selection = selectAll([, one,, two]).datum((d, i) => `node-${i}`).on("bang", function(e, d) { event = e; result.push(this, d); });
  assert.strictEqual(selection.dispatch("bang"), selection);
  assert.deepStrictEqual(result, [one, "node-1", two, "node-3"]);
  assert.strictEqual(event.type, "bang");
  assert.strictEqual(event.detail, null);
});
