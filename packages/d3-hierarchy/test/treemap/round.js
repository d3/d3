export function round(d) {
  return {
    x0: r(d.x0),
    y0: r(d.y0),
    x1: r(d.x1),
    y1: r(d.y1)
  };
}

function r(x) {
  return Math.round(x * 100) / 100;
}
