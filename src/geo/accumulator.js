// Adds floating point numbers with twice the normal precision.
// Reference: J. R. Shewchuk, Adaptive Precision Floating-Point Arithmetic and
// Fast Robust Geometric Predicates, Discrete & Computational Geometry 18(3)
// 305–363 (1997).
// Code adapted from GeographicLib by Charles F. F. Karney,
// http://geographiclib.sourceforge.net/
// See lib/geographiclib/LICENSE for details.

function d3_geo_accumulator() {
  this._s = this._t = 0;
}

d3_geo_accumulator.prototype = {
  add: function(y) {
    var u = d3_geo_accumulatorSum(y, this._t),
        v = d3_geo_accumulatorSum(u.s, this._s);
    u = u.t;
    this._s = v.s;
    this._t = v.t;
    if (this._s == 0) this._s = u;
    else this._t += u;
  },
  reset: function() {
    this._s = this._t = 0;
  },
  sum: function() {
    return this._s;
  }
};

function d3_geo_accumulatorSum(u, v) {
  var s = u + v,
      up = s - v,
      vpp = s - up;
  up -= u;
  vpp -= v;
  return {s: s, t: -(up + vpp)};
}
