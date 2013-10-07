import "../math/trigonometry";

// Liang–Barsky line clipping.
function d3_geom_clipLine(x0, y0, x1, y1) {
  return function(line) {
    var a = line.a,
        b = line.b,
        ax = a.x,
        ay = a.y,
        bx = b.x,
        by = b.y,
        t0 = 0,
        t1 = 1,
        dx = bx - ax,
        dy = by - ay,
        q,
        r;

    q = ax - x0;
    if (!dx && q < 0) return;
    r = -q / dx;
    if (dx < 0) {
      if (r < t0) return;
      else if (r < t1) t1 = r;
    } else if (dx > 0) {
      if (r > t1) return;
      else if (r > t0) t0 = r;
    }

    q = x1 - ax;
    if (!dx && q < 0) return;
    r = q / dx;
    if (dx < 0) {
      if (r > t1) return;
      else if (r > t0) t0 = r;
    } else if (dx > 0) {
      if (r < t0) return;
      else if (r < t1) t1 = r;
    }

    q = ay - y0;
    if (!dy && q < 0) return;
    r = -q / dy;
    if (dy < 0) {
      if (r < t0) return;
      else if (r < t1) t1 = r;
    } else if (dy > 0) {
      if (r > t1) return;
      else if (r > t0) t0 = r;
    }

    q = y1 - ay;
    if (!dy && q < 0) return;
    r = q / dy;
    if (dy < 0) {
      if (r > t1) return;
      else if (r > t0) t0 = r;
    } else if (dy > 0) {
      if (r < t0) return;
      else if (r < t1) t1 = r;
    }

    if (t0 > 0) line.a = {x: ax + t0 * dx, y: ay + t0 * dy};
    if (t1 < 1) line.b = {x: ax + t1 * dx, y: ay + t1 * dy};
    return line;
  };
}
