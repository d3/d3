import assert from "assert";
import {pointer, pointers} from "../src/index.js";
import it from "./jsdom.js";

it("pointer(mousemove) returns an array of coordinates", "<div>", () => {
  const target = document.querySelector("div");
  assert.deepStrictEqual(pointer(mousemove(10, 20)), [10, 20]);
  assert.deepStrictEqual(pointer(mousemove(10, 20, target), target), [10, 20]);
});

it("pointer(touch, target) returns an array of coordinates", "<div>", () => {
  const target = document.querySelector("div");
  assert.deepStrictEqual(pointer(touch(10, 20), target), [10, 20]);
});

it("pointers(mousemove) returns an array of arrays of coordinates", "<div>", () => {
  const target = document.querySelector("div");
  assert.deepStrictEqual(pointers(mousemove(10, 20)), [[10, 20]]);
  assert.deepStrictEqual(pointers(mousemove(10, 20, target)), [[10, 20]]);
});

it("pointers(touchmove) returns an array of arrays of coordinates", "<div>", () => {
  const target = document.querySelector("div");
  assert.deepStrictEqual(pointers(touchmove(10, 20)), [[10, 20]]);
  assert.deepStrictEqual(pointers(touchmove(10, 20, target)), [[10, 20]]);
});

it("pointers(touches) returns an array of arrays of coordinates", "<div>", () => {
  assert.deepStrictEqual(pointers([touch(10, 20)]), [[10, 20]]);
});

function mousemove(x, y, target = document.body) {
  return {
    pageX: x,
    pageY: y,
    clientX: x,
    clientY: y,
    type: "mousemove",
    target: target,
    currentTarget: target
  };
}

function touchmove(x, y, target = document.body) {
  return {
    type: "touchmove",
    target: target,
    currentTarget: target,
    touches: [touch(x, y)]
  };
}

function touch(x, y) {
  return {
    pageX: x,
    pageY: y,
    clientX: x,
    clientY: y
  };
}
