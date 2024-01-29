/* eslint-disable */

import benchmark from "benchmark";
import {shuffle} from "d3-array";
import {randomLogNormal, randomUniform} from "d3-random";
import {packSiblings} from "../../src/index.js";

const slice = Array.prototype.slice;

let n = 0;
let m = 1000;
let r = randomLogNormal(10);
let x = randomUniform(0, 100);
let y = x;
let circles0;
let circles1;

function extendBasis(B, p) {
  let i, j;

  if (enclosesWeakAll(p, B)) return [p];

  // If we get here then B must have at least one element.
  for (i = 0; i < B.length; ++i) {
    if (enclosesNot(p, B[i])
        && enclosesWeakAll(encloseBasis2(B[i], p), B)) {
      return [B[i], p];
    }
  }

  // If we get here then B must have at least two elements.
  for (i = 0; i < B.length - 1; ++i) {
    for (j = i + 1; j < B.length; ++j) {
      if (enclosesNot(encloseBasis2(B[i], B[j]), p)
          && enclosesNot(encloseBasis2(B[i], p), B[j])
          && enclosesNot(encloseBasis2(B[j], p), B[i])
          && enclosesWeakAll(encloseBasis3(B[i], B[j], p), B)) {
        return [B[i], B[j], p];
      }
    }
  }

  // If we get here then something is very wrong.
  throw new Error;
}

function enclosesNot(a, b) {
  let dr = a.r - b.r, dx = b.x - a.x, dy = b.y - a.y;
  return dr < 0 || dr * dr < dx * dx + dy * dy;
}

function enclosesWeak(a, b) {
  let dr = a.r - b.r + 1e-6, dx = b.x - a.x, dy = b.y - a.y;
  return dr > 0 && dr * dr > dx * dx + dy * dy;
}

function enclosesWeakAll(a, B) {
  for (let i = 0; i < B.length; ++i) {
    if (!enclosesWeak(a, B[i])) {
      return false;
    }
  }
  return true;
}

function encloseBasis(B) {
  switch (B.length) {
    case 1: return encloseBasis1(B[0]);
    case 2: return encloseBasis2(B[0], B[1]);
    case 3: return encloseBasis3(B[0], B[1], B[2]);
  }
}

function encloseBasis1(a) {
  return {
    x: a.x,
    y: a.y,
    r: a.r
  };
}

function encloseBasis2(a, b) {
  let x1 = a.x, y1 = a.y, r1 = a.r,
      x2 = b.x, y2 = b.y, r2 = b.r,
      x21 = x2 - x1, y21 = y2 - y1, r21 = r2 - r1,
      l = Math.sqrt(x21 * x21 + y21 * y21);
  return {
    x: (x1 + x2 + x21 / l * r21) / 2,
    y: (y1 + y2 + y21 / l * r21) / 2,
    r: (l + r1 + r2) / 2
  };
}

function encloseBasis3(a, b, c) {
  let x1 = a.x, y1 = a.y, r1 = a.r,
      x2 = b.x, y2 = b.y, r2 = b.r,
      x3 = c.x, y3 = c.y, r3 = c.r,
      a2 = x1 - x2,
      a3 = x1 - x3,
      b2 = y1 - y2,
      b3 = y1 - y3,
      c2 = r2 - r1,
      c3 = r3 - r1,
      d1 = x1 * x1 + y1 * y1 - r1 * r1,
      d2 = d1 - x2 * x2 - y2 * y2 + r2 * r2,
      d3 = d1 - x3 * x3 - y3 * y3 + r3 * r3,
      ab = a3 * b2 - a2 * b3,
      xa = (b2 * d3 - b3 * d2) / (ab * 2) - x1,
      xb = (b3 * c2 - b2 * c3) / ab,
      ya = (a3 * d2 - a2 * d3) / (ab * 2) - y1,
      yb = (a2 * c3 - a3 * c2) / ab,
      A = xb * xb + yb * yb - 1,
      B = 2 * (r1 + xa * xb + ya * yb),
      C = xa * xa + ya * ya - r1 * r1,
      r = -(A ? (B + Math.sqrt(B * B - 4 * A * C)) / (2 * A) : C / B);
  return {
    x: x1 + xa + xb * r,
    y: y1 + ya + yb * r,
    r: r
  };
}

function encloseCircular(L) {
  let i = 0, n = L.length, j = 0, B = [], p, e, k = 0;

  if (n) do {
    p = L[i];
    ++k;
    if (!(e && enclosesWeak(e, p))) {
      e = encloseBasis(B = extendBasis(B, p));
      j = i;
    }
    i = (i + 1) % n;
  } while (i != j);

  return e;
}

function encloseCircularShuffle(L) {
  let i = 0, n = shuffle(L = slice.call(L)).length, j = 0, B = [], p, e, k = 0;

  if (n) do {
    p = L[i];
    ++k;
    if (!(e && enclosesWeak(e, p))) {
      e = encloseBasis(B = extendBasis(B, p));
      j = i;
    }
    i = (i + 1) % n;
  } while (i != j);

  return e;
}

function encloseLazyShuffle(L) {
  let i = 0, j, n = (L = slice.call(L)).length, B = [], p, e;

  while (i < n) {
    p = L[j = i + (Math.random() * (n - i) | 0)], L[j] = L[i], L[i] = p;
    if (e && enclosesWeak(e, p)) ++i;
    else e = encloseBasis(B = extendBasis(B, p)), i = 0;
  }

  return e;
}

function encloseNoShuffle(L) {
  let i = 0, n = L.length, B = [], p, e;

  while (i < n) {
    p = L[i];
    if (e && enclosesWeak(e, p)) ++i;
    else e = encloseBasis(B = extendBasis(B, p)), i = 0;
  }

  return e;
}

function encloseShuffle(L) {
  let i = 0, n = shuffle(L = slice.call(L)).length, B = [], p, e;

  while (i < n) {
    p = L[i];
    if (e && enclosesWeak(e, p)) ++i;
    else e = encloseBasis(B = extendBasis(B, p)), i = 0;
  }

  return e;
}

function enclosePrePass(L) {
  let i, n = L.length, B = [], p, e;

  for (i = 0; i < n; ++i) {
    p = L[i];
    if (!(e && enclosesWeak(e, p))) e = encloseBasis(B = extendBasis(B, p));
  }

  for (i = 0; i < n;) {
    p = L[i];
    if (e && enclosesWeak(e, p)) ++i;
    else e = encloseBasis(B = extendBasis(B, p)), i = 0;
  }

  return e;
}

function enclosePrePassThenLazyShuffle(L) {
  let i, j, n = (L = slice.call(L)).length, B = [], p, e;

  for (i = 0; i < n; ++i) {
    p = L[i];
    if (!(e && enclosesWeak(e, p))) e = encloseBasis(B = extendBasis(B, p));
  }

  for (i = 0; i < n;) {
    p = L[j = i + (Math.random() * (n - i) | 0)], L[j] = L[i], L[i] = p;
    if (e && enclosesWeak(e, p)) ++i;
    else e = encloseBasis(B = extendBasis(B, p)), i = 0;
  }

  return e;
}

function encloseShufflePrePass(L) {
  let i, n = shuffle(L = slice.call(L)).length, B = [], p, e;

  for (i = 0; i < n; ++i) {
    p = L[i];
    if (!(e && enclosesWeak(e, p))) e = encloseBasis(B = extendBasis(B, p));
  }

  for (i = 0; i < n;) {
    p = L[i];
    if (e && enclosesWeak(e, p)) ++i;
    else e = encloseBasis(B = extendBasis(B, p)), i = 0;
  }

  return e;
}

function encloseCompletePasses(L) {
  let i, n = L.length, B = [], p, e, dirty = false;

  do {
    for (i = 0, dirty = false; i < n; ++i) {
      p = L[i];
      if (!(e && enclosesWeak(e, p))) e = encloseBasis(B = extendBasis(B, p)), dirty = true;
    }
  } while (dirty);

  return e;
}

function encloseShuffleCompletePasses(L) {
  let i, n = shuffle(L = slice.call(L)).length, B = [], p, e, dirty = false;

  do {
    for (i = 0, dirty = false; i < n; ++i) {
      p = L[i];
      if (!(e && enclosesWeak(e, p))) e = encloseBasis(B = extendBasis(B, p)), dirty = true;
    }
  } while (dirty);

  return e;
}

function recycle(event) {
  circles0 = packSiblings(new Array(10).fill().map(() => ({r: r(), x: x(), y: y()})));
  circles1 = circles0.slice().reverse();
}

(new benchmark.Suite)
    .add("encloseNoShuffle (forward)", {onCycle: recycle, fn: () => encloseNoShuffle(circles0)})
    .add("encloseNoShuffle (reverse)", {onCycle: recycle, fn: () => encloseNoShuffle(circles1)})
    .add("enclosePrePass (forward)", {onCycle: recycle, fn: () => enclosePrePass(circles0)})
    .add("enclosePrePass (reverse)", {onCycle: recycle, fn: () => enclosePrePass(circles1)})
    .add("encloseCompletePasses (forward)", {onCycle: recycle, fn: () => encloseCompletePasses(circles0)})
    .add("encloseCompletePasses (reverse)", {onCycle: recycle, fn: () => encloseCompletePasses(circles1)})
    .add("encloseCircular (forward)", {onCycle: recycle, fn: () => encloseCircular(circles0)})
    .add("encloseCircular (reverse)", {onCycle: recycle, fn: () => encloseCircular(circles1)})
    .add("encloseShufflePrePass (forward)", {onCycle: recycle, fn: () => encloseShufflePrePass(circles0)})
    .add("encloseShufflePrePass (reverse)", {onCycle: recycle, fn: () => encloseShufflePrePass(circles1)})
    .add("encloseShuffleCompletePasses (forward)", {onCycle: recycle, fn: () => encloseShuffleCompletePasses(circles0)})
    .add("encloseShuffleCompletePasses (reverse)", {onCycle: recycle, fn: () => encloseShuffleCompletePasses(circles1)})
    .add("enclosePrePassThenLazyShuffle (forward)", {onCycle: recycle, fn: () => enclosePrePassThenLazyShuffle(circles0)})
    .add("enclosePrePassThenLazyShuffle (reverse)", {onCycle: recycle, fn: () => enclosePrePassThenLazyShuffle(circles1)})
    .add("encloseShuffle (forward)", {onCycle: recycle, fn: () => encloseShuffle(circles0)})
    .add("encloseShuffle (reverse)", {onCycle: recycle, fn: () => encloseShuffle(circles1)})
    .add("encloseLazyShuffle (forward)", {onCycle: recycle, fn: () => encloseLazyShuffle(circles0)})
    .add("encloseLazyShuffle (reverse)", {onCycle: recycle, fn: () => encloseLazyShuffle(circles1)})
    .add("encloseCircularShuffle (forward)", {onCycle: recycle, fn: () => encloseCircularShuffle(circles0)})
    .add("encloseCircularShuffle (reverse)", {onCycle: recycle, fn: () => encloseCircularShuffle(circles1)})
    .on("start", recycle)
    .on("cycle", event => console.log(event.target + ""))
    .run();
