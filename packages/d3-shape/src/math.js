export const abs = Math.abs;
export const atan2 = Math.atan2;
export const cos = Math.cos;
export const max = Math.max;
export const min = Math.min;
export const sin = Math.sin;
export const sqrt = Math.sqrt;

export const epsilon = 1e-12;
export const pi = Math.PI;
export const halfPi = pi / 2;
export const tau = 2 * pi;

export function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

export function asin(x) {
  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
}
