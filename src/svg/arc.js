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

    if (rc) {

      if (r1) {
        var rc1 = Math.min(rc, r1 / (1 / Math.sin(d1 / 2) + 1));

        // THINK HARD ABOUT THIS

      } else {
        path.push("M", x0, ",", y0);
      }

    } else {
      path.push("M", x0, ",", y0);
      if (x1 != null) path.push("A", r1, ",", r1, " 0 ", l1, ",", cw, " ", x1, ",", y1);
      path.push("L", x2, ",", y2);
      if (x3 != null) path.push("A", r0, ",", r0, " 0 ", l0, ",", 1 - cw, " ", x3, ",", y3);
    }

    path.push("Z");
    return path.join("");

    // if (rc = +cornerRadius.apply(this, arguments)) {
    //   rc = Math.min(Math.abs(r1 - r0) / 2 - ε, rc);
    //   cr = r0 < r1 ^ cw ? 0 : 1;
    // }

    // return "M" + (rc ? roundedArcSegment(r1, rc, a0 + p1, a1 - p1, cr, cw) : arcSegment(r1, a0 + p1, a1 - p1, cw))
    //     + "L" + (rc ? roundedArcSegment(r0, rc, a1 - p0, a0 + p0, cr, 1 - cw) : arcSegment(r0, a1 - p0, a0 + p0, 1 - cw))
    //     + "Z";
  }

  function circleSegment(r1, cw) {
    return "M0," + r1
        + "A" + r1 + "," + r1 + " 0 1," + cw + " 0," + -r1
        + "A" + r1 + "," + r1 + " 0 1," + cw + " 0," + r1;
  }

  // function arcSegment(r1, a0, a1, cw) {
  //   var x0 = r1 * Math.cos(a0),
  //       y0 = r1 * Math.sin(a0),
  //       x1 = r1 * Math.cos(a1),
  //       y1 = r1 * Math.sin(a1),
  //       df = Math.abs(a1 - a0) <= π ? 0 : 1;

  //   if (d3_svg_arcSweep(x0, y0, x1, y1) === cw ^ df) {
  //     var ha = (a0 + a1) / 2;
  //     return r1 * Math.cos(ha) + "," + r1 * Math.sin(ha);
  //   }

  //   return x0 + "," + y0
  //       + "A" + r1 + "," + r1
  //       + " 0 " + df + "," + cw
  //       + " " + x1 + "," + y1;
  // }

  // function roundedArcSegment(r1, rc, a0, a1, cr, cw) {
  //   rc = Math.min(rc, r1 / (1 / Math.sin(Math.abs(a1 - a0) / 2) + 1));

  //   var c0 = Math.cos(a0),
  //       s0 = Math.sin(a0),
  //       c1 = Math.cos(a1),
  //       s1 = Math.sin(a1),
  //       ra = cw ? -rc : rc,
  //       rb = cr ? r1 + ra : r1 - ra,
  //       ro = Math.sqrt(rb * rb - rc * rc),
  //       x0 = r1 * c0, // start angle radial tangent
  //       y0 = r1 * s0,
  //       x1 = ro * c1, // end angle radial tangent
  //       y1 = ro * s1,
  //       df = Math.abs(a1 - a0) <= π ? 0 : 1;

  //   if (d3_svg_arcSweep(x0, y0, x1, y1) === cw ^ df) {
  //     var ha = (a0 + a1) / 2;
  //     return r1 * Math.cos(ha) + "," + r1 * Math.sin(ha);
  //   }

  //   var x2 = x0 + ra * s0, // start angle outer circle tangent
  //       y2 = y0 - ra * c0,
  //       x3 = x1 - ra * s1, // end angle outer circle tangent
  //       y3 = y1 + ra * c1,
  //       // ai0 = Math.atan2(y2, x2),
  //       // ai1 = Math.atan2(y3, x3),
  //       corner = "A" + rc + "," + rc + " 0 0," + cr + " ";

  //   // if (ai1 < ai0) ai1 += τ;

  //   return x0 + "," + y0
  //       + "L" + d3_svg_arcCircleIntersect(r1, x2, y2, rc)
  //       + "L" + d3_svg_arcCircleIntersect(r1, x3, y3, rc)
  //       + "L" + x1 + "," + y1;

  //   // return x0 + "," + y0
  //   //     + corner + d3_svg_arcCircleIntersect(r1, x2, y2, rc)
  //   //     + "A" + r1 + "," + r1
  //   //     + " 0 " + df + "," + cw
  //   //     + " " + d3_svg_arcCircleIntersect(r1, x3, y3, rc)
  //   //     + corner + x1 + "," + y1;
  // }

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

// Computes the intersection of two tangent circles.
// The first circle has radius r0 and center [0, 0]
// The second circle has radius r1 and center [x1, y1].
// Note: assumes the two circles are tangent!
function d3_svg_arcCircleIntersect(r0, x1, y1, r1) {
  var k = (r0 * r0 - r1 * r1) / (2 * (y1 * y1 + x1 * x1)) + .5;
  return [x1 * k, y1 * k];
}

// Note: similar to d3_cross2d, d3_geom_polygonInside
function d3_svg_arcSweep(x0, y0, x1, y1) {
  return (x0 - x1) * y0 - (y0 - y1) * x0 > 0 ? 0 : 1;
}
