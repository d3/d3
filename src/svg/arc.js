d3.svg.arc = function() {
  var innerRadius = d3_svg_arcInnerRadius,
      outerRadius = d3_svg_arcOuterRadius,
      cornerRadius = d3_svg_arcCornerRadius,
      startAngle = d3_svg_arcStartAngle,
      endAngle = d3_svg_arcEndAngle;

  function arc() {
    var r0 = innerRadius.apply(this, arguments),
        r1 = outerRadius.apply(this, arguments),
        rc = cornerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) + d3_svg_arcOffset,
        a1 = endAngle.apply(this, arguments) + d3_svg_arcOffset,
        da = (a1 < a0 && (da = a0, a0 = a1, a1 = da), a1 - a0),
        df = da < π ? 0 : 1,
        c0 = Math.cos(a0),
        s0 = Math.sin(a0),
        c1 = Math.cos(a1),
        s1 = Math.sin(a1),
        k = 0.5522847493, // = 4 * (Math.sqrt(2) - 1) / 3
        ac, cc, sc,
        d0, d1, r0c, r1c,
        x00, y00, x01, y01, df0,
        x10, y10, x11, y11, df1,
        f0, x0c, y0c, k0c,
        df1, f1, x1c, y1c, k1c;

    function _prepOuterCorners() {
      d1 = r1 / (r1 - rc);
      if (isNaN(r1c = Math.sqrt((r1 - rc) * (r1 - rc) - rc * rc)))
        throw new Error(d3_svg_cr_error);
      x10 = d1 * (r1c * c0 - rc * s0);
      y10 = d1 * (r1c * s0 + rc * c0);
      x11 = d1 * (r1c * c1 + rc * s1);
      y11 = d1 * (r1c * s1 - rc * c1);
      df1 = x10 * y11 - x11 * y10;
    }

    function _outerCornerArcs() {
      return "M" + r1c * c0 + "," + r1c * s0
        + "A" + rc + "," + rc + " 0 0,1 " + x10 + "," + y10
        + (r1c > 0 ? ("A" + r1 + "," + r1 + " 0 " + (df1 > 0 ? 0 : 1) + ",1 " + x11 + "," + y11) : "")
        + "A" + rc + "," + rc + " 0 0,1 " + r1c * c1 + "," + r1c * s1;
    }

    function _prepInnerCorners() {
      if (isNaN(r0c = Math.sqrt((r0 + rc) * (r0 + rc) - rc * rc)) || r0c - r1c > ε)
        throw new Error(d3_svg_cr_error);
      d0 = r0 / (r0 + rc);
      x00 = d0 * (r0c * c0 - rc * s0);
      y00 = d0 * (r0c * s0 + rc * c0);
      x01 = d0 * (r0c * c1 + rc * s1);
      y01 = d0 * (r0c * s1 - rc * c1);
      df0 = x00 * y01 - x01 * y00;
    }

    function _innerCornerArcs() {
      return "L" + r0c * c1 + "," + r0c * s1
        + "A" + rc + "," + rc + " 0 0,1 " + x01 + "," + y01
        + "A" + r0 + "," + r0 + " 0 " + (df0 > 0 ? 0 : 1) + ",0 " + x00 + "," + y00
        + "A" + rc + "," + rc + " 0 0,1 " + r0c * c0 + "," + r0c * s0;
    }

    function _prepMidSines() {
      ac = (a0 + a1) / 2;
      cc = Math.cos(ac);
      sc = Math.sin(ac);
    }

    function _innerCornerBeziers(prepSines) {
      if (prepSines !== false) _prepMidSines();
      x0c = r0 * cc, y0c = r0 * sc;
      k0c = k * (y0c * c0 - x0c * s0);
      f0 = 1 - k * (1 - d0);
      return "L" + r0c * c1 + "," + r0c * s1
        + "C" + f0 * r0c * c1 + "," + f0 * r0c * s1
        + " " + (x0c - k0c * sc) + "," + (y0c + k0c * cc)
        + " " + x0c + "," + y0c
        + "C" + (x0c + k0c * sc) + "," + (y0c - k0c * cc)
        + " " + f0 * r0c * c0 + "," + f0 * r0c * s0
        + " " + r0c * c0 + "," + r0c * s0;
    }

    function _outerCornerBeziers() {
      _prepMidSines();
      x1c = r1 * cc, y1c = r1 * sc;
      k1c = k * (y1c * c0 - x1c * s0);
      f1 = 1 + k * (d1 - 1);
      return "M" + r1c * c0 + "," + r1c * s0
        + "C" + f1 * r1c * c0 + "," + f1 * r1c * s0
        + " " + (x1c + k1c * sc) + "," + (y1c - k1c * cc)
        + " " + x1c + "," + y1c
        + "C" + (x1c - k1c * sc) + "," + (y1c + k1c * cc)
        + " " + f1 * r1c * c1 + "," + f1 * r1c * s1
        + " " + r1c * c1 + "," + r1c * s1;
    }

    return (da >= d3_svg_arcMax
      ? (r0
      ? "M0," + r1
      + "A" + r1 + "," + r1 + " 0 1,1 0," + (-r1)
      + "A" + r1 + "," + r1 + " 0 1,1 0," + r1
      + "M0," + r0
      + "A" + r0 + "," + r0 + " 0 1,0 0," + (-r0)
      + "A" + r0 + "," + r0 + " 0 1,0 0," + r0
      : "M0," + r1
      + "A" + r1 + "," + r1 + " 0 1,1 0," + (-r1)
      + "A" + r1 + "," + r1 + " 0 1,1 0," + r1)
      : (rc
      ? (_prepOuterCorners()
      , r0
      ? (_prepInnerCorners()
      , df0 > 0 || df
      ? _outerCornerArcs() + _innerCornerArcs()
      : (df1 > 0
      ? _outerCornerArcs() + _innerCornerBeziers()
      : (_outerCornerBeziers() + _innerCornerBeziers(false))))
      : (df1 > 0 || df
      ? _outerCornerArcs() + "L0,0"
      : (_outerCornerBeziers() + "L0,0")))
      : (r0
      ? "M" + r1 * c0 + "," + r1 * s0
      + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1
      + "L" + r0 * c1 + "," + r0 * s1
      + "A" + r0 + "," + r0 + " 0 " + df + ",0 " + r0 * c0 + "," + r0 * s0
      : "M" + r1 * c0 + "," + r1 * s0
      + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1
      + "L0,0")))
      + "Z";
  }

  arc.innerRadius = function(v) {
    if (!arguments.length) return innerRadius;
    innerRadius = d3_functor(v);
    return arc;
  };

  arc.outerRadius = function(v) {
    if (!arguments.length) return outerRadius;
    outerRadius = d3_functor(v);
    return arc;
  };

  arc.cornerRadius = function(v) {
    if (!arguments.length) return cornerRadius;
    cornerRadius = d3_functor(v);
    return arc;
  };

  arc.startAngle = function(v) {
    if (!arguments.length) return startAngle;
    startAngle = d3_functor(v);
    return arc;
  };

  arc.endAngle = function(v) {
    if (!arguments.length) return endAngle;
    endAngle = d3_functor(v);
    return arc;
  };

  arc.centroid = function() {
    var r = (innerRadius.apply(this, arguments)
        + outerRadius.apply(this, arguments)) / 2,
        a = (startAngle.apply(this, arguments)
        + endAngle.apply(this, arguments)) / 2 + d3_svg_arcOffset;
    return [Math.cos(a) * r, Math.sin(a) * r];
  };

  return arc;
};

var d3_svg_arcOffset = -π / 2,
    d3_svg_arcMax = 2 * π - ε,
    d3_svg_cr_error = "arc corner radius is too large";

function d3_svg_arcInnerRadius(d) {
  return d.innerRadius;
}

function d3_svg_arcOuterRadius(d) {
  return d.outerRadius;
}

function d3_svg_arcCornerRadius(d) {
  return d.cornerRadius;
}

function d3_svg_arcStartAngle(d) {
  return d.startAngle;
}

function d3_svg_arcEndAngle(d) {
  return d.endAngle;
}
