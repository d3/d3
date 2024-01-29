export function out(easeIn) {
  return t => 1 - easeIn(1 - t);
}

export function inOut(easeIn) {
  return t => (t < 0.5 ? easeIn(t * 2) : (2 - easeIn((1 - t) * 2))) / 2;
}
