// Performs in-place Gauss-Jordan elimination.
//
// Based on Jarno Elonen's Python version (public domain):
// http://elonen.iki.fi/code/misc-notes/python-gaussj/index.html
d3.vector.gaussjordan = function(m, eps) {
  if (!eps) eps = 1e-10;

  var h = m.length,
      w = m[0].length,
      y = -1,
      y2,
      x;

  while (++y < h) {
    var maxrow = y;

    // Find max pivot.
    y2 = y; while (++y2 < h) {
      if (Math.abs(m[y2][y]) > Math.abs(m[maxrow][y]))
        maxrow = y2;
    }

    // Swap.
    var tmp = m[y];
    m[y] = m[maxrow];
    m[maxrow] = tmp;

    // Singular?
    if (Math.abs(m[y][y]) <= eps) return false;

    // Eliminate column y.
    y2 = y; while (++y2 < h) {
      var c = m[y2][y] / m[y][y];
      x = y - 1; while (++x < w) {
        m[y2][x] -= m[y][x] * c;
      }
    }
  }

  // Backsubstitute.
  y = h; while (--y >= 0) {
    var c = m[y][y];
    y2 = -1; while (++y2 < y) {
      x = w; while (--x >= y) {
        m[y2][x] -=  m[y][x] * m[y2][y] / c;
      }
    }
    m[y][y] /= c;
    // Normalize row y.
    x = h - 1; while (++x < w) {
      m[y][x] /= c;
    }
  }
  return true;
};
