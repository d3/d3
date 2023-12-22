/* eslint-disable */

import {shuffle} from "d3-array";
import {randomLogNormal, randomUniform} from "d3-random";
import {packEnclose} from "../../src/index.js";

let n = 0;
let m = 1000;
let r = randomLogNormal(10);
let x = randomUniform(0, 100);
let y = x;

while (true) {
  if (!(n % 10)) process.stdout.write(".");
  if (!(n % 1000)) process.stdout.write("\n" + n + " ");
  ++n;
  let circles = new Array(20).fill().map(() => ({r: r(), x: x(), y: y()}));
  let circles2;
  let enclose = packEnclose(circles);
  let enclose2;
  if (circles.some(circle => !encloses(enclose, circle))) {
    console.log(JSON.stringify(circles));
  }
  for (let i = 0; i < m; ++i) {
    if (!equals(enclose, enclose2 = packEnclose(circles2 = shuffle(circles.slice())))) {
      console.log(JSON.stringify(enclose));
      console.log(JSON.stringify(enclose2));
      console.log(JSON.stringify(circles));
      console.log(JSON.stringify(circles2));
    }
  }
}

function encloses(a, b) {
  var dr = a.r - b.r + 1e-6, dx = b.x - a.x, dy = b.y - a.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}

function equals(a, b) {
  return Math.abs(a.r - b.r) < 1e-6
      && Math.abs(a.x - b.x) < 1e-6
      && Math.abs(a.y - b.y) < 1e-6;
}
