import "../core/functor";
import "../core/zero";
import "../math/trigonometry";
import "svg";

d3.svg.arc = function() {
  var innerRadius = d3_svg_arcInnerRadius,
      outerRadius = d3_svg_arcOuterRadius,
      cornerRadius = d3_zero,
      startAngle = d3_svg_arcStartAngle,
      endAngle = d3_svg_arcEndAngle;

  function arc() {
    var r0 = +innerRadius.apply(this, arguments),
        r1 = +outerRadius.apply(this, arguments),
        rc = +cornerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) - halfπ,
        a1 = endAngle.apply(this, arguments) - halfπ,
        da = Math.abs(a1 - a0),
        df = da < π ? "0" : "1",
        fs = a1 < a0 ? "0" : "1",
        ss = a1 < a0 ? "1" : "0",
        c0 = Math.cos(a0),
        s0 = Math.sin(a0),
        c1 = Math.cos(a1),
        s1 = Math.sin(a1);

    if (da < τε && rc) { // TODO support corners on inner arcs
      var ra = Math.min(rc, r1 / (1 / Math.sin(da / 2) + 1)),
          ro = Math.sqrt((r1 - ra) * (r1 - ra) - ra * ra),
          xt0 = ro * c0, yt0 = ro * s0, // start angle side tangent
          xt1 = ro * c1, yt1 = ro * s1; // end angle side tangent

      if (a1 < a0) {
        var xt2 = xt0 + ra * s0, yt2 = yt0 - ra * c0,
            xt3 = xt1 - ra * s1, yt3 = yt1 + ra * c1,
            ai1 = Math.atan2(yt2, xt2),
            ai0 = Math.atan2(yt3, xt3);
      } else {
        var xt2 = xt0 - ra * s0, yt2 = yt0 + ra * c0,
            xt3 = xt1 + ra * s1, yt3 = yt1 - ra * c1,
            ai0 = Math.atan2(yt2, xt2),
            ai1 = Math.atan2(yt3, xt3);
      }

      if (ai1 < ai0) ai1 += τ;
      df = Math.abs(ai1 - ai0) < π ? "0" : "1"; // correct sweep flag for shorter angle
      return "M" + xt0 + "," + yt0
          + "A" + ra + "," + ra + " 0 0," + fs + " " + d3_svg_arcCircleIntersect(r1, xt2, yt2, ra)
          + "A" + r1 + "," + r1 + " 0 " + df + "," + fs + " " + d3_svg_arcCircleIntersect(r1, xt3, yt3, ra)
          + "A" + ra + "," + ra + " 0 0," + fs + " " + xt1 + "," + yt1
          + "L0,0Z";
    }

    return da >= τε
      ? (r0
      ? "M0," + r1
      + "A" + r1 + "," + r1 + " 0 1," + fs + " 0," + -r1
      + "A" + r1 + "," + r1 + " 0 1," + fs + " 0," + r1
      + "M0," + r0
      + "A" + r0 + "," + r0 + " 0 1," + ss + " 0," + -r0
      + "A" + r0 + "," + r0 + " 0 1," + ss + " 0," + r0
      + "Z"
      : "M0," + r1
      + "A" + r1 + "," + r1 + " 0 1," + fs + " 0," + -r1
      + "A" + r1 + "," + r1 + " 0 1," + fs + " 0," + r1
      + "Z")
      : (r0
      ? "M" + r1 * c0 + "," + r1 * s0
      + "A" + r1 + "," + r1 + " 0 " + df + "," + fs + " " + r1 * c1 + "," + r1 * s1
      + "L" + r0 * c1 + "," + r0 * s1
      + "A" + r0 + "," + r0 + " 0 " + df + "," + ss + " " + r0 * c0 + "," + r0 * s0
      + "Z"
      : "M" + r1 * c0 + "," + r1 * s0
      + "A" + r1 + "," + r1 + " 0 " + df + "," + fs + " " + r1 * c1 + "," + r1 * s1
      + "L0,0Z");
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

// Computes the intersection of two tangent circles.
// The first circle has radius r0 and center [0, 0]
// The second circle has radius r1 and center [x1, y1].
// Note: assumes the two circles are tangent!
function d3_svg_arcCircleIntersect(r0, x1, y1, r1) {
  var k = (r0 * r0 - r1 * r1) / (2 * (y1 * y1 + x1 * x1)) + .5;
  return [x1 * k, y1 * k];
}
