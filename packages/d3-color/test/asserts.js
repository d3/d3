import assert from "assert";
import {hcl, hsl, lab, rgb} from "../src/index.js";

export function assertRgbEqual(actual, r, g, b, opacity) {
  assert(actual instanceof rgb
    && (isNaN(r) ? isNaN(actual.r) && actual.r !== actual.r : actual.r === r)
    && (isNaN(g) ? isNaN(actual.g) && actual.g !== actual.g : actual.g === g)
    && (isNaN(b) ? isNaN(actual.b) && actual.b !== actual.b : actual.b === b)
    && (isNaN(opacity) ? isNaN(actual.opacity) && actual.opacity !== actual.opacity : actual.opacity === opacity)
  );
}

export function assertRgbApproxEqual(actual, r, g, b, opacity) {
  assert(actual instanceof rgb
    && (isNaN(r) ? isNaN(actual.r) && actual.r !== actual.r : Math.round(actual.r) === Math.round(r))
    && (isNaN(g) ? isNaN(actual.g) && actual.g !== actual.g : Math.round(actual.g) === Math.round(g))
    && (isNaN(b) ? isNaN(actual.b) && actual.b !== actual.b : Math.round(actual.b) === Math.round(b))
    && (isNaN(opacity) ? isNaN(actual.opacity) && actual.opacity !== actual.opacity : actual.opacity === opacity)
  );
}
export function assertHclEqual(actual, h, c, l, opacity) {
  assert(actual instanceof hcl
    && (isNaN(h) ? isNaN(actual.h) && actual.h !== actual.h : h - 1e-6 <= actual.h && actual.h <= h + 1e-6)
    && (isNaN(c) ? isNaN(actual.c) && actual.c !== actual.c : c - 1e-6 <= actual.c && actual.c <= c + 1e-6)
    && (isNaN(l) ? isNaN(actual.l) && actual.l !== actual.l : l - 1e-6 <= actual.l && actual.l <= l + 1e-6)
    && (isNaN(opacity) ? isNaN(actual.opacity) && actual.opacity !== actual.opacity : actual.opacity === opacity)
  );
}

export function assertHslEqual(actual, h, s, l, opacity) {
  assert(actual instanceof hsl
    && (isNaN(h) ? isNaN(actual.h) && actual.h !== actual.h : h - 1e-6 <= actual.h && actual.h <= h +   1e-6)
    && (isNaN(s) ? isNaN(actual.s) && actual.s !== actual.s : s - 1e-6 <= actual.s && actual.s <= s +   1e-6)
    && (isNaN(l) ? isNaN(actual.l) && actual.l !== actual.l : l - 1e-6 <= actual.l && actual.l <= l +   1e-6)
    && (isNaN(opacity) ? isNaN(actual.opacity) && actual.opacity !== actual.opacity : actual.opacity === opacity)
  );
}

export function assertLabEqual(actual, l, a, b, opacity) {
  assert(actual instanceof lab
    && (isNaN(l) ? isNaN(actual.l) && actual.l !== actual.l : l - 1e-6 <= actual.l && actual.l <= l + 1e-6)
    && (isNaN(a) ? isNaN(actual.a) && actual.a !== actual.a : a - 1e-6 <= actual.a && actual.a <= a + 1e-6)
    && (isNaN(b) ? isNaN(actual.b) && actual.b !== actual.b : b - 1e-6 <= actual.b && actual.b <= b + 1e-6)
    && (isNaN(opacity) ? isNaN(actual.opacity) && actual.opacity !== actual.opacity : actual.opacity === opacity)
  );
}
