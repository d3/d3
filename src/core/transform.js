d3.transform = function(string) {
  var g = document.createElementNS(d3.ns.prefix.svg, "g");
  return (d3.transform = function(string) {
    g.setAttribute("transform", string);
    return new d3_transform(g.transform.baseVal);
  })(string);
};

function d3_transform(value) {
  var t = this.transforms = [];
  for (var i = 0, n = value.numberOfItems; i < n; i++) {
    t[i] = value.getItem(i);
  }
  t = value.consolidate();
  this.matrix = t ? t.matrix : d3_transformIdentity;
};

d3_transform.prototype.toString = function() {
  return this.transforms.map(function(t) {
    var m = t.matrix;
    switch (t.type) {
      case SVGTransform.SVG_TRANSFORM_TRANSLATE: return "translate(" + m.e + "," + m.f + ")";
      case SVGTransform.SVG_TRANSFORM_ROTATE: return "rotate(" + t.angle + ")";
      case SVGTransform.SVG_TRANSFORM_SCALE: return "scale(" + m.a + " " + m.d + ")";
      case SVGTransform.SVG_TRANSFORM_SKEWX: return "skewX(" + t.angle + ")";
      case SVGTransform.SVG_TRANSFORM_SKEWY: return "skewY(" + t.angle + ")";
      case SVGTransform.SVG_TRANSFORM_MATRIX:
        return "matrix(" + m.a + " " + m.b + " " + m.c + " " +
                           m.d + " " + m.e + " " + m.f + ")";
    }
    return "";
  }).join("");
};

function d3_transformDecompose(m) {
  // Compute x-scale and normalize the first row.
  // Compute shear and make second row orthogonal to first.
  // Compute y-scale and normalize the second row.
  // Finally, compute the rotation.
  var r0 = [m.a, m.b],
      r1 = [m.c, m.d],
      kx = d3_transformNormalize(r0),
      kz = d3_transformDot(r0, r1),
      ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
  if (r0[0] * r1[1] < r1[0] * r0[1]) {
    r0[0] *= -1;
    r0[1] *= -1;
    kx *= -1;
    kz *= -1;
  }
  return {
    rotate: (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_transformDegrees,
    translate: [m.e, m.f],
    scale: [kx, ky],
    skew: ky ? Math.atan2(kz, ky) * d3_transformDegrees : 0
  };
}

function d3_transformDot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

function d3_transformNormalize(a) {
  var k = Math.sqrt(d3_transformDot(a, a));
  if (k) {
    a[0] /= k;
    a[1] /= k;
  }
  return k;
}

function d3_transformCombine(a, b, k) {
  a[0] += k * b[0];
  a[1] += k * b[1];
  return a;
}

function d3_transformSameType(a, b) {
  var ta = a.transforms,
      tb = b.transforms,
      n = ta.length;
  if (n !== tb.length) return false;
  for (var i = 0, type; i < n; i++) {
    if ((type = ta[i].type) !== tb[i].type ||
        type === SVGTransform.SVG_TRANSFORM_UNKNOWN ||
        type === SVGTransform.SVG_TRANSFORM_MATRIX) return false;
  }
  return true;
}

var d3_transformDegrees = 180 / Math.PI,
    d3_transformIdentity = {a: 1, b: 0, c: 0, d: 1, e: 0, f: 0};
