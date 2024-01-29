import assert from "assert";
import {forceSimulation} from "../src/index.js";

it("simulation.find finds a node", () => {
  const f = forceSimulation().stop();
  const a = {x: 5, y: 0}, b = {x: 10, y: 16}, c = {x: -10, y: -4};
  f.nodes([a, b, c]);
  assert.strictEqual(f.find(0, 0), a);
  assert.strictEqual(f.find(0, 20), b);
});

it("simulation.find(x, y, radius) finds a node within radius", () => {
  const f = forceSimulation().stop();
  const a = {x: 5, y: 0}, b = {x: 10, y: 16}, c = {x: -10, y: -4};
  f.nodes([a, b, c]);
  assert.strictEqual(f.find(0, 0), a);
  assert.strictEqual(f.find(0, 0, 1), undefined);
  assert.strictEqual(f.find(0, 20), b);
});
