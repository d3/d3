import assert from "assert";
import {selection} from "../src/index.js";
import {EnterNode} from "../src/selection/enter.js";

export function assertSelection(actual, expected) {
  let expectedGroups, expectedParents, expectedEnter, expectedExit, expectedRest;
  if (expected instanceof selection) {
    ({
      _groups: expectedGroups,
      _parents: expectedParents,
      _enter: expectedEnter,
      _exit: expectedExit,
      ...expectedRest
    } = expected);
  } else {
    ({
      groups: expectedGroups,
      parents: expectedParents = Array.from(expectedGroups, () => null),
      enter: expectedEnter,
      exit: expectedExit,
      ...expectedRest
    } = expected);
  }
  assert(actual instanceof selection);
  const {
    _groups: actualGroups,
    _parents: actualParents,
    _enter: actualEnter,
    _exit: actualExit,
    ...actualRest
  } = actual;
  assert.deepStrictEqual({
    groups: Array.from(actualGroups, group => Array.from(group)),
    parents: Array.from(actualParents),
    enter: actualEnter,
    exit: actualExit,
    ...actualRest
  }, {
    groups: Array.from(expectedGroups, group => Array.from(group)),
    parents: expectedParents,
    enter: expectedEnter,
    exit: expectedExit,
    ...expectedRest
  });
}

export function enterNode(parent, data, next = null) {
  if (typeof parent === "string") parent = document.querySelector(parent);
  if (typeof next === "string") next = document.querySelector(next);
  const node = new EnterNode(parent, data);
  node._next = next;
  return node;
}
