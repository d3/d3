import assert from "assert";
import {select} from "d3-selection";
import {zoom, zoomIdentity} from "../src/index.js";
import ZoomEvent from "../src/event.js";
import it from "./jsdom.js";

it("zoom.on('zoom') callback", () => {
  const div = select(document.body).append("div").datum("hello");
  const z = zoom();
  div.call(z);
  let a;
  z.on("zoom", function(event, d) { a = {event, d, that: this}; });
  div.call(z.transform, zoomIdentity);
  const event = new ZoomEvent("zoom", {sourceEvent: null, target: z, transform: zoomIdentity});
  assert.deepStrictEqual(a, {event, d: "hello", that: div.node()});
  a = {};
  z.on("zoom", null);
  assert.deepStrictEqual(a, {});
});

it("zoom.on('start') callback", () => {
  const div = select(document.body).append("div").datum("hello");
  const z = zoom();
  div.call(z);
  let a;
  z.on("start", function(event, d) { a = {event, d, that: this}; });
  div.call(z.transform, zoomIdentity);
  const event = new ZoomEvent("start", {sourceEvent: null, target: z, transform: zoomIdentity});
  assert.deepStrictEqual(a, {event, d: "hello", that: div.node()});
  a = {};
  z.on("start", null);
  assert.deepStrictEqual(a, {});
});

it("zoom.on('end') callback", () => {
  const div = select(document.body).append("div").datum("hello");
  const z = zoom();
  div.call(z);
  let a;
  z.on("end", function(event, d) { a = {event, d, that: this}; });
  div.call(z.transform, zoomIdentity);
  const event = new ZoomEvent("end", {sourceEvent: null, target: z, transform: zoomIdentity});
  assert.deepStrictEqual(a, {event, d: "hello", that: div.node()});
  a = {};
  z.on("end", null);
  assert.deepStrictEqual(a, {});
});

it("zoom.on('start zoom end') callback order", () => {
  const div = select(document.body).append("div").datum("hello");
  const z = zoom();
  div.call(z);
  let a = [];
  z.on("start zoom end", function(event) { a.push(event.type); });
  div.call(z.transform, zoomIdentity);
  assert.deepStrictEqual(a, ["start", "zoom", "end"]);
  z.on("start zoom end", null);
});
