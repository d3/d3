// https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
const a = 1664525;
const c = 1013904223;
const m = 4294967296; // 2^32

export default function() {
  let s = 1;
  return () => (s = (a * s + c) % m) / m;
}
