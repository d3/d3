import "../math/trigonometry";

// Liang–Barsky line clipping.
function d3_geom_clipLine(x0, y0, x1, y1) {
  return function(a, b) {
    var ax = a[0],
        ay = a[1],
        bx = b[0],
        by = b[1],
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

    if (t0 > 0) a[0] = ax + t0 * dx, a[1] = ay + t0 * dy;
    if (t1 < 1) b[0] = ax + t1 * dx, b[1] = ay + t1 * dy;
    return true;
  };
}
