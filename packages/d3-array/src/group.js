import {InternMap} from "internmap";
import identity from "./identity.js";

export default function group(values, ...keys) {
  return nest(values, identity, identity, keys);
}

export function groups(values, ...keys) {
  return nest(values, Array.from, identity, keys);
}

function flatten(groups, keys) {
  for (let i = 1, n = keys.length; i < n; ++i) {
    groups = groups.flatMap(g => g.pop().map(([key, value]) => [...g, key, value]));
  }
  return groups;
}

export function flatGroup(values, ...keys) {
  return flatten(groups(values, ...keys), keys);
}

export function flatRollup(values, reduce, ...keys) {
  return flatten(rollups(values, reduce, ...keys), keys);
}

export function rollup(values, reduce, ...keys) {
  return nest(values, identity, reduce, keys);
}

export function rollups(values, reduce, ...keys) {
  return nest(values, Array.from, reduce, keys);
}

export function index(values, ...keys) {
  return nest(values, identity, unique, keys);
}

export function indexes(values, ...keys) {
  return nest(values, Array.from, unique, keys);
}

function unique(values) {
  if (values.length !== 1) throw new Error("duplicate key");
  return values[0];
}

function nest(values, map, reduce, keys) {
  return (function regroup(values, i) {
    if (i >= keys.length) return reduce(values);
    const groups = new InternMap();
    const keyof = keys[i++];
    let index = -1;
    for (const value of values) {
      const key = keyof(value, ++index, values);
      const group = groups.get(key);
      if (group) group.push(value);
      else groups.set(key, [value]);
    }
    for (const [key, values] of groups) {
      groups.set(key, regroup(values, i));
    }
    return map(groups);
  })(values, 0);
}
