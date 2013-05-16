import "../math/trigonometry";
import "cartesian";
import "spherical";

function d3_geo_intersectSegment(from, to) {
  this.from = from, this.to = to;
  this.normal = d3_geo_cartesianCross(from, to);
  this.fromNormal = d3_geo_cartesianCross(this.normal, from);
  this.toNormal = d3_geo_cartesianCross(this.normal, to);
}

function d3_geo_intersect(a, b) {
  var axb = d3_geo_cartesianCross(a.normal, b.normal);
  d3_geo_cartesianNormalize(axb);
  var a0 = d3_geo_cartesianDot(axb, a.fromNormal),
      a1 = d3_geo_cartesianDot(axb, a.toNormal),
      b0 = d3_geo_cartesianDot(axb, b.fromNormal),
      b1 = d3_geo_cartesianDot(axb, b.toNormal);

  if (a0 > -ε2 && a1 < ε2 && b0 > -ε2 && b1 < ε2) return axb;

  if (a0 < ε2 && a1 > -ε2 && b0 < ε2 && b1 > -ε2) {
    axb[0] = -axb[0], axb[1] = -axb[1], axb[2] = -axb[2];
    return axb;
  }
}

function d3_geo_intersectPointOnLine(p, a) {
  var a0 = d3_geo_cartesianDot(p, a.fromNormal),
      a1 = d3_geo_cartesianDot(p, a.toNormal);
  p = d3_geo_cartesianDot(p, a.normal);

  return Math.abs(p) < ε2 && (a0 > -ε2 && a1 < ε2 || a0 < ε2 && a1 > -ε2);
}

var d3_geo_intersectCoincident = {};
