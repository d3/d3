import assert from "assert";
import {forceCollide, forceSimulation} from "../src/index.js";
import {assertNodeEqual} from "./asserts.js";

it("forceCollide collides nodes", () => {
  const collide = forceCollide(1);
  const f = forceSimulation().force("collide", collide).stop();
  const a = {}, b = {}, c = {};
  f.nodes([a, b, c]);
  f.tick(10);
  assertNodeEqual(a, {index: 0, x: 7.0710678118654755, y: 0, vy: 0, vx: 0});
  assertNodeEqual(b, {index: 1, x: -9.03088751750192, y: 8.27303273571596, vy: 0, vx: 0});
  assertNodeEqual(c, {index: 2, x: 1.3823220809823638, y: -15.750847141167634, vy: 0, vx: 0});
  collide.radius(100);
  f.tick(10);
  assertNodeEqual(a, {index: 0, x: 174.08616723117228, y: 66.51743051995625, vy: 0.26976816231064354, vx: 0.677346615710878});
  assertNodeEqual(b, {index: 1, x: -139.73606544743998, y: 95.69860503079263, vy: 0.3545632444404687, vx: -0.5300880593105067});
  assertNodeEqual(c, {index: 2, x: -34.9275994083864, y: -169.69384995620052, vy: -0.6243314067511122, vx: -0.1472585564003713});
});


it("forceCollide respects fixed positions", () => {
  const collide = forceCollide(1);
  const f = forceSimulation().force("collide", collide).stop();
  const a = {fx: 0, fy: 0}, b = {}, c = {};
  f.nodes([a, b, c]);
  f.tick(10);
  assertNodeEqual(a, {fx: 0, fy: 0, index: 0, x: 0, y: 0, vy: 0, vx: 0});
  collide.radius(100);
  f.tick(10);
  assertNodeEqual(a, {fx: 0, fy: 0, index: 0, x: 0, y: 0, vy: 0, vx: 0});
});

it("forceCollide jiggles equal positions", () => {
  const collide = forceCollide(1);
  const f = forceSimulation().force("collide", collide).stop();
  const a = {x: 0, y: 0}, b = {x: 0, y: 0};
  f.nodes([a, b]);
  f.tick();
  assert(a.x !== b.x);
  assert(a.y !== b.y);
  assert.strictEqual(a.vx, -b.vx);
  assert.strictEqual(a.vy, -b.vy);
});

it("forceCollide jiggles in a reproducible way", () => {
  const nodes = Array.from({length:10}, () => ({x: 0, y: 0}));
  forceSimulation().nodes(nodes).force("collide", forceCollide()).stop().tick(50);
  assertNodeEqual(nodes[0], {x: -5.371433857229194, y: -2.6644608278592576, index: 0, vy: 0, vx: 0});
});
