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
        rc = +cornerRadius.apply(this, arguments),
        rc0,
        rc1,
        a0 = startAngle.apply(this, arguments) - halfπ,
        a1 = endAngle.apply(this, arguments) - halfπ,
        da = Math.abs(a1 - a0),
        p1 = (+padAngle.apply(this, arguments) || 0) / 2,
        p0 = 0,
        cw = a0 < a1 ? 1 : 0;

    if (rc) {
      r0 = Math.max(rc, r0);
      rc = Math.min(Math.abs(r1 - r0) / 2 - ε, rc);
      rc0 = Math.min(rc, r0 / (1 / Math.sin(Math.abs(a1 - a0 - 2 * p0) / 2) + 1));
      rc1 = Math.min(rc, r1 / (1 / Math.sin(Math.abs(a1 - a0 - 2 * p1) / 2) + 1));
    }

    if (p1) {
      r0 = Math.max(r0, r1 * p1 / Math.sin(da / 2));
      p0 = Math.asin((r1 - rc1) / (r0 + rc0) * Math.sin(p1));
      rc0 = Math.min(rc, r0 / (1 / Math.sin(Math.abs(a1 - a0 - 2 * p0) / 2) + 1));
    }

    return (da >= τε ? r0 ? circleSegment(r1, cw) + circleSegment(r0, 1 - cw) : circleSegment(r1, cw)
      : "M" + (r0 ? (rc1 ? roundedArcSegment(r1, rc1, a0 + p1, a1 - p1, 0) : arcSegment(r1, a0 + p1, a1 - p1, 0))
      + "L" + (rc0 ? roundedArcSegment(r0, rc0, a1 - p0, a0 + p0, 1) : arcSegment(r0, a1 - p0, a0 + p0, 0))
      : (rc1 ? roundedArcSegment(r1, rc1, a0 + p1, a1 - p1, 0) : arcSegment(r1, a0 + p1, a1 - p1, 0))
      + "L0,0")) + "Z";
  }

  function circleSegment(r1, inner) {
    return "M0," + r1
        + "A" + r1 + "," + r1 + " 0 1," + inner + " 0," + -r1
        + "A" + r1 + "," + r1 + " 0 1," + inner + " 0," + r1;
  }

  function arcSegment(r1, a0, a1, inner) {
    return r1 * Math.cos(a0) + "," + r1 * Math.sin(a0)
        + "A" + r1 + "," + r1
        + " 0 " + (Math.abs(a1 - a0) < π ^ inner ? "0" : "1") + "," + (a1 < a0 ^ inner ? "0" : "1")
        + " " + r1 * Math.cos(a1) + "," + r1 * Math.sin(a1);
  }

  function roundedArcSegment(r1, rc, a0, a1, inner) {
    var c0 = Math.cos(a0),
        s0 = Math.sin(a0),
        c1 = Math.cos(a1),
        s1 = Math.sin(a1),
        ra = (inner ? -1 : 1) * rc,
        ro = Math.sqrt((r1 - ra) * (r1 - ra) - ra * ra),
        xt0 = ro * c0, yt0 = ro * s0, // start angle radial tangent
        xt1 = ro * c1, yt1 = ro * s1; // end angle radial tangent

    if (a1 < a0 ^ inner) {
      var xt2 = xt0 + ra * s0, yt2 = yt0 - ra * c0, // start angle outer circle tangent
          xt3 = xt1 - ra * s1, yt3 = yt1 + ra * c1, // end angle outer circle tangent
          ai1 = Math.atan2(yt2, xt2),
          ai0 = Math.atan2(yt3, xt3);
    } else {
      var xt2 = xt0 - ra * s0, yt2 = yt0 + ra * c0,
          xt3 = xt1 + ra * s1, yt3 = yt1 - ra * c1,
          ai0 = Math.atan2(yt2, xt2),
          ai1 = Math.atan2(yt3, xt3);
    }

    if (ai1 < ai0) ai1 += τ;

    var corner = "A" + ra + "," + ra + " 0 0," + (a1 < a0 ^ inner ? "0" : "1") + " ";

    return xt0 + "," + yt0
        + corner + d3_svg_arcCircleIntersect(r1, xt2, yt2, ra)
        + "A" + r1 + "," + r1
        + " 0 " + (Math.abs(ai1 - ai0) < π ^ inner ? "0" : "1") + "," + (a1 < a0 ? "0" : "1")
        + " " + d3_svg_arcCircleIntersect(r1, xt3, yt3, ra)
        + corner + xt1 + "," + yt1;
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

// Computes the intersection of two tangent circles.
// The first circle has radius r0 and center [0, 0]
// The second circle has radius r1 and center [x1, y1].
// Note: assumes the two circles are tangent!
function d3_svg_arcCircleIntersect(r0, x1, y1, r1) {
  var k = (r0 * r0 - r1 * r1) / (2 * (y1 * y1 + x1 * x1)) + .5;
  return [x1 * k, y1 * k];
}
