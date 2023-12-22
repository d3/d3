/* eslint-disable */

import {randomLogNormal} from "d3-random";
import {packSiblings} from "../../src/index.js";

let n = 0;
let r = randomLogNormal(4);

while (true) {
  if (!(n % 100)) process.stdout.write(".");
  if (!(n % 10000)) process.stdout.write("\n" + n + " ");
  ++n;
  let radii = new Array(20).fill().map(r).map(Math.ceil);
  try {
    if (intersectsAny(packSiblings(radii.map(r => ({r: r}))))) {
      throw new Error("overlap");
    }
  } catch (error) {
    process.stdout.write("\n");
    process.stdout.write(JSON.stringify(radii));
    process.stdout.write("\n");
    throw error;
  }
}

function intersectsAny(circles) {
  for (let i = 0, n = circles.length; i < n; ++i) {
    for (let j = i + 1, ci = circles[i], cj; j < n; ++j) {
      if (intersects(ci, cj = circles[j])) {
        return true;
      }
    }
  }
  return false;
}

function intersects(a, b) {
  let dr = a.r + b.r - 1e-6, dx = b.x - a.x, dy = b.y - a.y;
  return dr * dr > dx * dx + dy * dy;
}
