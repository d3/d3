import assert from "assert";
import {select} from "d3-selection";
import {timeout} from "d3-timer";
import "../../src/index.js";
import it from "../jsdom.js";

it("transition.remove() creates an end listener to remove the element", async () => {
  const root = document.documentElement;
  const body = document.body;
  const s = select(body);
  const t = s.transition().remove().on("start", started).on("end", ended);
  const end = t.end();

  function started() {
    assert.strictEqual(body.parentNode, root);
  }

  function ended() {
    assert.strictEqual(body.parentNode, null);
  }

  await new Promise(resolve => timeout(resolve));
  assert.strictEqual(body.parentNode, root);
  await end;
});

it("transition.remove() creates an end listener named end.remove", async () => {
  const root = document.documentElement;
  const body = document.body;
  const s = select(body);
  const t = s.transition().remove().on("start", started).on("end", ended);
  const end = t.end();

  function started() {
    assert.strictEqual(body.parentNode, root);
  }

  function ended() {
    assert.strictEqual(body.parentNode, root);
  }

  t.on("end.remove").call(body);
  assert.strictEqual(body.parentNode, null);
  t.on("end.remove", null);
  root.appendChild(body);
  await end;
});
