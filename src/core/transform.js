d3.transform = function(string) {
  d3_transformG.setAttribute("transform", string);
  return new d3_transform(d3_transformG.transform.baseVal.consolidate().matrix);
};

// Compute x-scale and normalize the first row.
// Compute shear and make second row orthogonal to first.
// Compute y-scale and normalize the second row.
// Finally, compute the rotation.
function d3_transform(m) {
  var r0 = [m.a, m.b],
      r1 = [m.c, m.d],
      kx = d3_transformNormalize(r0),
      kz = d3_transformDot(r0, r1),
      ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz));
  this.translate = [m.e, m.f];
  this.rotate = Math.atan2(m.b, m.a) * d3_transformDegrees;
  this.scale = [kx, ky || 0];
  this.skew = ky ? kz / ky * d3_transformDegrees : 0;
};

d3_transform.prototype.toString = function() {
  return "translate(" + this.translate
      + ")rotate(" + this.rotate
      + ")skewX(" + this.skew
      + ")scale(" + this.scale
      + ")";
};

function d3_transformDot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

function d3_transformNormalize(a) {
  var k = Math.sqrt(d3_transformDot(a, a));
  a[0] /= k;
  a[1] /= k;
  return k;
}

function d3_transformCombine(a, b, k) {
  a[0] += k * b[0];
  a[1] += k * b[1];
  return a;
}

var d3_transformG = document.createElementNS(d3.ns.prefix.svg, "g"),
    d3_transformDegrees = 180 / Math.PI;
