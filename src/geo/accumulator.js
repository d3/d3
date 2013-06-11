// Adds floating point numbers with twice the normal precision.
// Reference: J. R. Shewchuk, Adaptive Precision Floating-Point Arithmetic and
// Fast Robust Geometric Predicates, Discrete & Computational Geometry 18(3)
// 305–363 (1997).
// Code adapted from GeographicLib by Charles F. F. Karney,
// http://geographiclib.sourceforge.net/
// See lib/geographiclib/LICENSE for details.

function d3_geo_accumulator() {}

d3_geo_accumulator.prototype = {
  s: 0, // rounded value
  t: 0, // exact error
  add: function(y) {
    d3_geo_accumulatorSum(y, this.t, d3_geo_accumulatorTemp);
    d3_geo_accumulatorSum(d3_geo_accumulatorTemp.s, this.s, this);
    if (this.s) this.t += d3_geo_accumulatorTemp.t;
    else this.s = d3_geo_accumulatorTemp.t;
  },
  reset: function() {
    this.s = this.t = 0;
  },
  valueOf: function() {
    return this.s;
  }
};

var d3_geo_accumulatorTemp = new d3_geo_accumulator;

function d3_geo_accumulatorSum(a, b, o) {
  var x = o.s = a + b, // a + b
      bv = x - a, av = x - bv; // b_virtual & a_virtual
  o.t = (a - av) + (b - bv); // a_roundoff + b_roundoff
}
