import assert from "assert";
import {zoom, zoomIdentity} from "../src/index.js";
import {select} from "d3-selection";
import it from "./jsdom.js";

it("zoom.filter receives (event, d) and filters", () => {
  const div = select(document.body).append("div").datum("hello");
  const z = zoom();
  div.call(z);
  div.call(z.transform, zoomIdentity);
  z.filter();
  const event = {bubbles: true, cancelable: true, detail: {type: "fake"}};
  let a, b;
  z.on("zoom", function() { b = arguments; }).filter(function() { a = arguments; });
  div.dispatch("dblclick", event);
  assert.strictEqual(a[0].detail.type, "fake");
  assert.strictEqual(a[1], "hello");
  assert.strictEqual(b, undefined); // our fake dblclick was rejected
  // temporary: avoid a crash due to starting a transition
  z.duration(0);
  z.filter(() => true);
  div.dispatch("dblclick", event);
  assert(b !== undefined); // our fake dblclick was accepted
  div.interrupt();
});

it("zoom.extent receives (d)", () => {
  const div = select(document.body).append("div").datum("hello");
  const z = zoom();
  div.call(z);
  div.call(z.transform, zoomIdentity);
  const extent = z.extent();
  const event = {bubbles: true, cancelable: true, detail: {type: "fake"}};
  let a;
  z.extent(function() {
    a = arguments;
    a[-1] = this;
    return extent.apply(this, arguments);
  });
  div.dispatch("dblclick", event);
  assert.strictEqual(a[0], "hello")
  assert.strictEqual(a[-1], div.node());
  div.interrupt();
});
