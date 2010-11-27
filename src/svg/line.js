d3["svg"]["line"] = function() {
  var x = d3_svg_lineX,
      y = d3_svg_lineY,
      interpolate = "linear",
      interpolator = d3_svg_lineInterpolators[interpolate];

  function line(d) {
    return "M" + interpolator(d3_svg_linePoints(this, d, x, y));
  }

  line["x"] = function(v) {
    if (!arguments.length) return x;
    x = v;
    return line;
  };

  line["y"] = function(v) {
    if (!arguments.length) return y;
    y = v;
    return line;
  };

  line["interpolate"] = function(v) {
    if (!arguments.length) return interpolate;
    interpolator = d3_svg_lineInterpolators[interpolate = v];
    return line;
  };

  return line;
};

/**
 * @private Converts the specified array of data into an array of points
 * (x-y tuples), by evaluating the specified `x` and `y` functions on each
 * data point. The `this` context of the evaluated functions is the specified
 * "self" object; each function is passed the current datum and index.
 */
function d3_svg_linePoints(self, d, x, y) {
  var points = [],
      i = -1,
      n = d.length,
      fx = typeof x == "function",
      fy = typeof y == "function",
      value;
  if (fx && fy) {
    while (++i < n) points.push([
      x.call(self, value = d[i], i),
      y.call(self, value, i)
    ]);
  } else if (fx) {
    while (++i < n) points.push([x.call(self, d[i], i), y]);
  } else if (fy) {
    while (++i < n) points.push([x, y.call(self, d[i], i)]);
  } else {
    while (++i < n) points.push([x, y]);
  }
  return points;
}

/**
 * @private The default `x` property, which references the `x` attribute of
 * the given datum.
 */
function d3_svg_lineX(d) {
  return d["x"];
}

/**
 * @private The default `y` property, which references the `y` attribute of
 * the given datum.
 */
function d3_svg_lineY(d) {
  return d["y"];
}

/**
 * @private The various interpolators supported by the `line` class.
 */
var d3_svg_lineInterpolators = {
  "linear": d3_svg_lineLinear,
  "basis": d3_svg_lineBasis
};

/**
 * @private Linear interpolation; generates "L" commands.
 */
function d3_svg_lineLinear(points) {
  if (points.length < 1) return null;
  var path = [],
      i = 0,
      n = points.length,
      p = points[0];
  path.push(p[0], ",", p[1]);
  while (++i < n) path.push("L", (p = points[i])[0], ",", p[1]);
  return path.join("");
}

/**
 * @private B-spline interpolation; generates "C" commands.
 */
function d3_svg_lineBasis(points) {
  if (points.length < 3) return d3_svg_lineLinear(points);
  var path = [],
      i = 1,
      n = points.length,
      pi = points[0],
      x0 = pi[0],
      y0 = pi[1],
      px = [x0, x0, x0, (pi = points[1])[0]],
      py = [y0, y0, y0, pi[1]];
  path.push(x0, ",", y0);
  d3_svg_lineBasisBezier(path, px, py);
  while (++i < n) {
    pi = points[i];
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  i = -1;
  while (++i < 2) {
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  return path.join("");
}

/**
 * @private Returns the dot product of the given four-element vectors.
 */
function d3_svg_lineDot4(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

/*
 * @private Matrix to transform basis (b-spline) control points to bezier
 * control points. Derived from FvD 11.2.8.
 */
var d3_svg_lineBasisBezier1 = [0, 2/3, 1/3, 0],
    d3_svg_lineBasisBezier2 = [0, 1/3, 2/3, 0],
    d3_svg_lineBasisBezier3 = [0, 1/6, 2/3, 1/6];

/**
 * @private Pushes a "C" Bézier curve onto the specified path array, given the
 * two specified four-element arrays which define the control points.
 */
function d3_svg_lineBasisBezier(path, x, y) {
  path.push(
      "C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y));
}
