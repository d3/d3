import "../arrays/map";
import "../core/functor";
import "../core/identity";
import "../core/true";
import "../geom/point";
import "../math/abs";
import "../math/trigonometry";
import "svg";

function d3_svg_line(projection) {
  var x = d3_geom_pointX,
      y = d3_geom_pointY,
      defined = d3_true,
      interpolate = d3_svg_lineLinear,
      interpolateKey = interpolate.key,
      tension = 2 / 3;

  function line(data) {
    var segments = [],
        points = [],
        i = -1,
        n = data.length,
        d,
        fx = d3_functor(x),
        fy = d3_functor(y);

    function segment() {
      segments.push("M", interpolate(projection(points), tension));
    }

    while (++i < n) {
      if (defined.call(this, d = data[i], i)) {
        points.push([+fx.call(this, d, i), +fy.call(this, d, i)]);
      } else if (points.length) {
        segment();
        points = [];
      }
    }

    if (points.length) segment();

    return segments.length ? segments.join("") : null;
  }

  line.x = function(_) {
    if (!arguments.length) return x;
    x = _;
    return line;
  };

  line.y = function(_) {
    if (!arguments.length) return y;
    y = _;
    return line;
  };

  line.defined  = function(_) {
    if (!arguments.length) return defined;
    defined = _;
    return line;
  };

  line.interpolate = function(_) {
    if (!arguments.length) return interpolateKey;
    if (typeof _ === "function") interpolateKey = interpolate = _;
    else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
    return line;
  };

  line.tension = function(_) {
    if (!arguments.length) return tension;
    tension = _;
    return line;
  };

  return line;
}

d3.svg.line = function() {
  return d3_svg_line(d3_identity);
};

// The various interpolators supported by the `line` class.
var d3_svg_lineInterpolators = d3.map({
  "linear": d3_svg_lineLinear,
  "linear-closed": d3_svg_lineLinearClosed,
  "step": d3_svg_lineStep,
  "step-before": d3_svg_lineStepBefore,
  "step-after": d3_svg_lineStepAfter,
  "basis": d3_svg_lineBasis,
  "basis-open": d3_svg_lineBasisOpen,
  "basis-closed": d3_svg_lineBasisClosed,
  "bundle": d3_svg_lineBundle,
  "cardinal": d3_svg_lineCardinal,
  "cardinal-open": d3_svg_lineCardinalOpen,
  "cardinal-closed": d3_svg_lineCardinalClosed,
  "monotone": d3_svg_lineMonotone
});

d3_svg_lineInterpolators.forEach(function(key, value) {
  value.key = key;
  value.closed = /-closed$/.test(key);
});

// Linear interpolation; generates "L" commands.
function d3_svg_lineLinear(points) {
  return points.length > 1 ? points.join("L") : points + "Z";
}

function d3_svg_lineLinearClosed(points) {
  return points.join("L") + "Z";
}

// Step interpolation; generates "H" and "V" commands.
function d3_svg_lineStep(points) {
  var i = 0,
      n = points.length,
      p = points[0],
      path = [p[0], ",", p[1]];
  while (++i < n) path.push("H", (p[0] + (p = points[i])[0]) / 2, "V", p[1]);
  if (n > 1) path.push("H", p[0]);
  return path.join("");
}

// Step interpolation; generates "H" and "V" commands.
function d3_svg_lineStepBefore(points) {
  var i = 0,
      n = points.length,
      p = points[0],
      path = [p[0], ",", p[1]];
  while (++i < n) path.push("V", (p = points[i])[1], "H", p[0]);
  return path.join("");
}

// Step interpolation; generates "H" and "V" commands.
function d3_svg_lineStepAfter(points) {
  var i = 0,
      n = points.length,
      p = points[0],
      path = [p[0], ",", p[1]];
  while (++i < n) path.push("H", (p = points[i])[0], "V", p[1]);
  return path.join("");
}

// Open cardinal spline interpolation; generates "C" commands.
function d3_svg_lineCardinalOpen(points, tension) {
  return points.length < 4
      ? d3_svg_lineLinear(points)
      : points[1] + d3_svg_lineHermite(points.slice(1, -1),
        d3_svg_lineCardinalTangents(points, tension));
}

// Closed cardinal spline interpolation; generates "C" commands.
function d3_svg_lineCardinalClosed(points, tension) {
  return points.length < 3
      ? d3_svg_lineLinearClosed(points)
      : points[0] + d3_svg_lineHermite((points.push(points[0]), points),
        d3_svg_lineCardinalTangents([points[points.length - 2]]
        .concat(points, [points[1]]), tension));
}

// Cardinal spline interpolation; generates "C" commands.
function d3_svg_lineCardinal(points, tension) {
  return points.length < 3
      ? d3_svg_lineLinear(points)
      : points[0] + d3_svg_lineHermite(points,
        d3_svg_lineCardinalTangents(points, tension));
}

// Hermite spline construction; generates "C" commands.
function d3_svg_lineHermite(points, tangents) {
  if (tangents.length < 1
      || (points.length != tangents.length
      && points.length != tangents.length + 2)) {
    return d3_svg_lineLinear(points);
  }

  var quad = points.length != tangents.length,
      path = "",
      p0 = points[0],
      p = points[1],
      t0 = tangents[0],
      t = t0,
      pi = 1;

  if (quad) {
    path += "Q" + (p[0] - t0[0] * 2 / 3) + "," + (p[1] - t0[1] * 2 / 3)
        + "," + p[0] + "," + p[1];
    p0 = points[1];
    pi = 2;
  }

  if (tangents.length > 1) {
    t = tangents[1];
    p = points[pi];
    pi++;
    path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1])
        + "," + (p[0] - t[0]) + "," + (p[1] - t[1])
        + "," + p[0] + "," + p[1];
    for (var i = 2; i < tangents.length; i++, pi++) {
      p = points[pi];
      t = tangents[i];
      path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1])
          + "," + p[0] + "," + p[1];
    }
  }

  if (quad) {
    var lp = points[pi];
    path += "Q" + (p[0] + t[0] * 2 / 3) + "," + (p[1] + t[1] * 2 / 3)
        + "," + lp[0] + "," + lp[1];
  }

  return path;
}

// Generates tangents for a cardinal spline.
function d3_svg_lineCardinalTangents(points, tension) {
  var tangents = [],
      a = (1 - tension) / 2,
      p0,
      p1 = points[0],
      p2 = points[1],
      i = 1,
      n = points.length;
  while (++i < n) {
    p0 = p1;
    p1 = p2;
    p2 = points[i];
    tangents.push([a * (p2[0] - p0[0]), a * (p2[1] - p0[1])]);
  }
  return tangents;
}

// B-spline interpolation; generates "C" commands.
function d3_svg_lineBasis(points) {
  if (points.length < 3) return d3_svg_lineLinear(points);
  var i = 1,
      n = points.length,
      pi = points[0],
      x0 = pi[0],
      y0 = pi[1],
      px = [x0, x0, x0, (pi = points[1])[0]],
      py = [y0, y0, y0, pi[1]],
      path = [x0, ",", y0, "L", d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)];
  points.push(points[n - 1]);
  while (++i <= n) {
    pi = points[i];
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  points.pop();
  path.push("L", pi);
  return path.join("");
}

// Open B-spline interpolation; generates "C" commands.
function d3_svg_lineBasisOpen(points) {
  if (points.length < 4) return d3_svg_lineLinear(points);
  var path = [],
      i = -1,
      n = points.length,
      pi,
      px = [0],
      py = [0];
  while (++i < 3) {
    pi = points[i];
    px.push(pi[0]);
    py.push(pi[1]);
  }
  path.push(d3_svg_lineDot4(d3_svg_lineBasisBezier3, px)
    + "," + d3_svg_lineDot4(d3_svg_lineBasisBezier3, py));
  --i; while (++i < n) {
    pi = points[i];
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  return path.join("");
}

// Closed B-spline interpolation; generates "C" commands.
function d3_svg_lineBasisClosed(points) {
  var path,
      i = -1,
      n = points.length,
      m = n + 4,
      pi,
      px = [],
      py = [];
  while (++i < 4) {
    pi = points[i % n];
    px.push(pi[0]);
    py.push(pi[1]);
  }
  path = [
    d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",",
    d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)
  ];
  --i; while (++i < m) {
    pi = points[i % n];
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  return path.join("");
}

function d3_svg_lineBundle(points, tension) {
  var n = points.length - 1;
  if (n) {
    var x0 = points[0][0],
        y0 = points[0][1],
        dx = points[n][0] - x0,
        dy = points[n][1] - y0,
        i = -1,
        p,
        t;
    while (++i <= n) {
      p = points[i];
      t = i / n;
      p[0] = tension * p[0] + (1 - tension) * (x0 + t * dx);
      p[1] = tension * p[1] + (1 - tension) * (y0 + t * dy);
    }
  }
  return d3_svg_lineBasis(points);
}

// Returns the dot product of the given four-element vectors.
function d3_svg_lineDot4(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

// Matrix to transform basis (b-spline) control points to bezier
// control points. Derived from FvD 11.2.8.
var d3_svg_lineBasisBezier1 = [0, 2/3, 1/3, 0],
    d3_svg_lineBasisBezier2 = [0, 1/3, 2/3, 0],
    d3_svg_lineBasisBezier3 = [0, 1/6, 2/3, 1/6];

// Pushes a "C" Bézier curve onto the specified path array, given the
// two specified four-element arrays which define the control points.
function d3_svg_lineBasisBezier(path, x, y) {
  path.push(
      "C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y));
}

function d3_svg_lineMonotoneTangents(points) {
  var k,
      n = points.length,
      m = new Array(n),
      delta = new Array(n - 1),
      alpha_k,
      beta_k,
      beta_km1,
      tau_k,
      dx,
      tangents = new Array(n);

  // 1. Compute the slopes of the secant lines between successive points.
  for (k = 0; k <= n - 2; ++k) {
    delta[k] = (points[k + 1][1] - points[k][1]) / (points[k + 1][0] - points[k][0]);
  }

  // 2. Initialize the tangents at every point as the average of the secants.
  // If delta_{k - 1} and delta_k have different sign, set m_k = 0.
  for (k = 1; k <= n - 2; ++k) {
    m[k] = (delta[k] < 0) !== (delta[k - 1] < 0) ? 0 : (delta[k - 1] + delta[k]) / 2;
  }

  // For the endpoints, use one-sided differences.
  m[0] = delta[0];
  m[n - 1] = delta[n - 2];

  for (k = 0; k <= n - 2; ++k) {

    // 3. If delta_k = 0, then set m_k = m_{k + 1} = 0, as the spline connecting
    // these points must be flat to preserve monotonicity. Ignore step 4 and 5
    // for those k.
    if (abs(delta[k]) < ε) {
      m[k] = m[k + 1] = 0;
      continue;
    }

    // 4. Let alpha_k = m_k / delta_k and beta_k = m_{k+1} / delta_k.
    alpha_k = m[k] / delta[k];
    // beta_k = m[k + 1] / delta[k];
    beta_km1 = m[k] / delta[k - 1];

    // If alpha_k or beta_{k-1} are computed to be less than zero, then the
    // input data points are not strictly monotone, and (x_k, y_k) is a local
    // extremum. In such cases, piecewise monotone curves can still be generated
    // by choosing m_k = 0, although global strict monotonicity is not possible.
    if (alpha_k < 0 || beta_km1 < 0) {
      m[k] = 0;
    }
  }

  for (k = 0; k <= n - 2; ++k) {

    // 4. Let alpha_k = m_k / delta_k and beta_k = m_{k+1} / delta_k.
    alpha_k = m[k] / delta[k];
    beta_k = m[k + 1] / delta[k];
    // beta_km1 = m[k] / delta[k - 1];

    // 5. To prevent prevent overshoot and ensure monotonicity… restrict the
    // magnitude of vector (alpha_k, beta_k) to a circle of radius 3.
    if (alpha_k * alpha_k + beta_k * beta_k > 9) {
      tau_k = 3 / Math.sqrt(alpha_k * alpha_k + beta_k * beta_k);
      m[k] = tau_k * alpha_k * delta[k];
      m[k + 1] = tau_k * beta_k * delta[k];
    }
  }

  // You can express cubic Hermite interpolation in terms of cubic Bézier curves
  // with respect to the four values p_0, p_0 + m_0 / 3, p_1 - m_1 / 3, p_1.
  for (k = 1; k <= n - 2; ++k) {
    dx = Math.min(points[k][0] - points[k - 1][0], points[k + 1][0] - points[k][0]) / 3;
    tangents[k] = [dx, m[k] * dx];
  }

  dx = (points[1][0] - points[0][0]) / 3;
  tangents[0] = [dx, m[0] * dx];

  dx = (points[n - 1][0] - points[n - 2][0]) / 3;
  tangents[n - 1] = [dx, m[n - 1] * dx];

  return tangents;
}

function d3_svg_lineMonotone(points) {
  return points.length < 3
      ? d3_svg_lineLinear(points)
      : points[0] + d3_svg_lineHermite(points, d3_svg_lineMonotoneTangents(points));
}
