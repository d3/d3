import "../core/functor";
import "../core/zero";
import "../math/trigonometry";
import "svg";

d3.svg.arc = function() {
  var innerRadius = d3_svg_arcInnerRadius,
      outerRadius = d3_svg_arcOuterRadius,
      cornerRadius = d3_zero,
      startAngle = d3_svg_arcStartAngle,
      endAngle = d3_svg_arcEndAngle,
      padAngle = d3_svg_arcPadAngle;

  function arc() {
    var r0 = +innerRadius.apply(this, arguments),
        r1 = +outerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) - halfπ,
        a1 = endAngle.apply(this, arguments) - halfπ,
        da = Math.abs(a1 - a0),
        cw = a0 > a1 ? 0 : 1,
        rc,
        cr,
        p0 = 0,
        p1;

    if (da >= τε) return circleSegment(r1, cw) + (r0 ? circleSegment(r0, 1 - cw) : "");

    // The recommended minimum inner radius when using padding is outerRadius *
    // padAngle / sin(θ), where θ is the angle of the smallest arc (without
    // padding). For example, if the outerRadius is 200 pixels and the padAngle
    // is 0.02 radians, a reasonable θ is 0.04 radians, and a reasonable
    // innerRadius is 100 pixels.

    if (p1 = (+padAngle.apply(this, arguments) || 0) / 2) {
      if (!cw) p1 *= -1;
      if (r0) p0 = d3_asin(r1 / r0 * Math.sin(p1));
    }

    // Compute the four corners of the arc.
    var x0 = 0, y0 = 0, x1, y1,
        x2 = 0, y2 = 0, x3, y3;

    if (r1) {
      x0 = r1 * Math.cos(a0 + p1);
      y0 = r1 * Math.sin(a0 + p1);
      x1 = r1 * Math.cos(a1 - p1);
      y1 = r1 * Math.sin(a1 - p1);

      var d1 = Math.abs(a1 - a0 - 2 * p1),
          l1 = d1 <= π ? 0 : 1;

      if (p1 && d3_svg_arcSweep(x0, y0, x1, y1) === cw ^ l1) {
        var h1 = (a0 + a1) / 2;
        x0 = r1 * Math.cos(h1);
        y0 = r1 * Math.sin(h1);
        x1 = y1 = null;
      }
    }

    if (r0) {
      x2 = r0 * Math.cos(a1 - p0);
      y2 = r0 * Math.sin(a1 - p0);
      x3 = r0 * Math.cos(a0 + p0);
      y3 = r0 * Math.sin(a0 + p0);

      var d0 = Math.abs(a0 - a1 + 2 * p0),
          l0 = d0 <= π ? 0 : 1;

      if (p0 && d3_svg_arcSweep(x2, y2, x3, y3) === (1 - cw) ^ l0) {
        var h0 = (a0 + a1) / 2;
        x2 = r0 * Math.cos(h0);
        y2 = r0 * Math.sin(h0);
        x3 = y3 = null;
      }
    }

    var path = [];

    if (rc = +cornerRadius.apply(this, arguments)) {
      rc = Math.min(Math.abs(r1 - r0) / 2 - ε, rc);
      cr = r0 < r1 ^ cw ? 0 : 1;

      if (x1 != null) {
        var rc1 = Math.min(rc, r1 / (1 / Math.sin(d1 / 2) + 1)),
            t30 = d3_svg_arcCornerTangents(x3 == null ? [x2, y2] : [x3, y3], [x0, y0], r1, rc1),
            t12 = d3_svg_arcCornerTangents(x1 == null ? [x0, y0] : [x1, y1], [x2, y2], r1, rc1);

        path.push(
          "M", t30[0],
          "A", rc1, ",", rc1, " 0 0,", cr, " ", t30[1],
          "A", r1, ",", r1, " 0 ", d3_svg_arcSweep(t30[1][0], t30[1][1], t12[1][0], t12[1][1]), ",", cw, " ", t12[1],
          "A", rc1, ",", rc1, " 0 0,", cr, " ", t12[0]);
      } else {
        path.push("M", x0, ",", y0);
      }

      if (x3 != null) {
        var rc0 = Math.min(rc, r0 / (1 / Math.sin(d0 / 2) + 1)),
            t03 = d3_svg_arcCornerTangents([x0, y0], x3 == null ? [x2, y2] : [x3, y3], r0, -rc0),
            t21 = d3_svg_arcCornerTangents([x2, y2], x1 == null ? [x0, y0] : [x1, y1], r0, -rc0);

        path.push(
          "L", t21[0],
          "A", rc0, ",", rc0, " 0 0,", cr, " ", t21[1],
          "A", r0, ",", r0, " 0 ", 1 - d3_svg_arcSweep(t21[1][0], t21[1][1], t03[1][0], t03[1][1]), ",", 1 - cw, " ", t03[1],
          "A", rc0, ",", rc0, " 0 0,", cr, " ", t03[0]);
      } else {
        path.push("L", x2, ",", y2);
      }
    } else {
      path.push("M", x0, ",", y0);
      if (x1 != null) path.push("A", r1, ",", r1, " 0 ", l1, ",", cw, " ", x1, ",", y1);
      path.push("L", x2, ",", y2);
      if (x3 != null) path.push("A", r0, ",", r0, " 0 ", l0, ",", 1 - cw, " ", x3, ",", y3);
    }

    path.push("Z");
    return path.join("");
  }

  function circleSegment(r1, cw) {
    return "M0," + r1
        + "A" + r1 + "," + r1 + " 0 1," + cw + " 0," + -r1
        + "A" + r1 + "," + r1 + " 0 1," + cw + " 0," + r1;
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

  arc.padAngle = function(v) {
    if (!arguments.length) return padAngle;
    padAngle = d3_functor(v);
    return arc;
  };

  arc.centroid = function() {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - halfπ;
    return [Math.cos(a) * r, Math.sin(a) * r];
  };

  return arc;
};

function d3_svg_arcInnerRadius(d) {
  return d.innerRadius;
}

function d3_svg_arcOuterRadius(d) {
  return d.outerRadius;
}

function d3_svg_arcStartAngle(d) {
  return d.startAngle;
}

function d3_svg_arcEndAngle(d) {
  return d.endAngle;
}

function d3_svg_arcPadAngle(d) {
  return d && d.padAngle;
}

// Note: similar to d3_cross2d, d3_geom_polygonInside
function d3_svg_arcSweep(x0, y0, x1, y1) {
  return (x0 - x1) * y0 - (y0 - y1) * x0 > 0 ? 0 : 1;
}

function d3_svg_arcCornerTangents(p0, p1, r1, rc) {

  // Compute perpendicular offset line of length rc.
  var x01 = p0[0] - p1[0],
      y01 = p0[1] - p1[1],
      d01 = Math.sqrt(x01 * x01 + y01 * y01),
      lo = rc / d01,
      ox = lo * y01,
      oy = -lo * x01;

  // http://mathworld.wolfram.com/Circle-LineIntersection.html
  var x1 = p0[0] + ox,
      y1 = p0[1] + oy,
      x2 = p1[0] + ox,
      y2 = p1[1] + oy,
      dx = x2 - x1,
      dy = y2 - y1,
      dr = Math.sqrt(dx * dx + dy * dy),
      r = r1 - rc,
      D = x1 * y2 - x2 * y1,
      Δ = r * r * dr * dr - D * D,
      cx0 = (D * dy - (dy < 0 ? -1 : 1) * dx * Math.sqrt(Δ)) / (dr * dr),
      cy0 = (-D * dx - Math.abs(dy) * Math.sqrt(Δ)) / (dr * dr),
      cx1 = (D * dy + (dy < 0 ? -1 : 1) * dx * Math.sqrt(Δ)) / (dr * dr),
      cy1 = (-D * dx + Math.abs(dy) * Math.sqrt(Δ)) / (dr * dr),
      dx0 = cx0 - x1,
      dy0 = cy0 - y1,
      dx1 = cx1 - x1,
      dy1 = cy1 - y1,
      cx = cx0,
      cy = cy0;

  // Pick the closer of the two intersection points.
  // TODO Is there a faster way to determine which intersection to use?
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) {
    cx = cx1;
    cy = cy1;
  }

  return [
    [cx - ox, cy - oy],
    [cx * r1 / r, cy * r1 / r]
  ];
}
