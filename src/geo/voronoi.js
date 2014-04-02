import "../geom/voronoi";
import "../geom/hull";
import "../geom/polygon";
import "../math/trignometry";
import "rotation";
import "stereographic";

d3.geo.voronoi = function(U) {
  // TODO special-case solutions for 3, 2 and 1?
  if (U.length <= 3) throw new Error("not yet supported");

  // “a set of n > 3 sites U”
  U = U.map(function(p) { return [p[0] * d3_radians, p[1] * d3_radians]; });

  // “first choose a point σ in S such that it does not lie in any site”
  // TODO choose σ so that it’s not in U
  var σ = d3_geo_rotation(0, 0).invert;

  // “compute the inversive image W = ζσ(U) of U”
  var W = U.map(function(p) { p = σ(p[0], p[1]); return d3_geo_stereographic(p[0], p[1]); });

  // “apply a planar Voronoi diagram algorithm, and obtain V(W)”
  var VW = d3_geo_voronoi(W);

  // “now pick a point q in the interior of the convex hull of W and not in
  // any site of W”
  // TODO make sure that q is not in W
  var q = d3.geom.polygon(d3.geom.hull(W)).centroid();

  // “Let η = ζσ(q) be its inverse image and let ζn be the inversion with
  // inversion center η”
  var η = d3_geo_stereographic.invert(q[0], q[1]);
  η = d3_geo_rotation.invert(η[0], η[1]);

  // “Let W' = ζη(U) be the inversive image of U.”
  var W1 = U.map(function(p) { p = η(p[0], p[1]); return d3_geo_stereographic(p[0], p[1]); });

  // “We apply again a planar Voronoi diagram algorithm to compute V(W').”
  var VW1 = d3_geo_voronoi(W1);

  // “We identify the portion of V(W') lying in ZT.
  // This can be done by traversing the diagram
  // and testing the distance of each vertex or edge to ζη(σ).”
  throw new Error("I don’t know how to do this.")

  // “Finally, we map V(W) and the portion of V(W') to S through φσ1 and φη1.”
  throw new Error("I don’t know how to do this, either.")

  // “We identify the O(n) endpoints on Rσ. These are the “endpoints at
  // infinity” of V(W), and the points of V(W') lying on the boundary of ZT.
  // We sort these endpoints along Rσ, and merge identical ones, resulting in
  // SV(U).”
  throw new Error("Or this.")
};

var d3_geo_voronoi = d3.geom.voronoi();
