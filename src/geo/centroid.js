import "../core/noop";
import "../math/trigonometry";
import "geo";
import "stream";

d3.geo.centroid = function(object) {
  d3_geo_centroidW0 =
  d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 =
  d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 =
  d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
  d3.geo.stream(object, d3_geo_centroid);

  var x = d3_geo_centroidX2,
      y = d3_geo_centroidY2,
      z = d3_geo_centroidZ2,
      m = Math.sqrt(x * x + y * y + z * z);
  if (m < ε) x = d3_geo_centroidX1, y = d3_geo_centroidY1, z = d3_geo_centroidZ1, m = Math.sqrt(x * x + y * y + z * z);
  if (m < ε) x = d3_geo_centroidX0, y = d3_geo_centroidY0, z = d3_geo_centroidZ0, m = Math.sqrt(x * x + y * y + z * z);

  return m > ε ? [Math.atan2(y, x) * d3_degrees, d3_asin(z / m) * d3_degrees] : [NaN, NaN];
};

var d3_geo_centroidW0,
    d3_geo_centroidX0,
    d3_geo_centroidY0,
    d3_geo_centroidZ0,
    d3_geo_centroidX1,
    d3_geo_centroidY1,
    d3_geo_centroidZ1,
    d3_geo_centroidX2,
    d3_geo_centroidY2,
    d3_geo_centroidZ2;

var d3_geo_centroid = {
  sphere: d3_noop,
  point: d3_geo_centroidPoint,
  lineStart: d3_geo_centroidLineStart,
  lineEnd: d3_geo_centroidLineEnd,
  polygonStart: function() {
    d3_geo_centroid.lineStart = d3_geo_centroidRingStart;
  },
  polygonEnd: function() {
    d3_geo_centroid.lineStart = d3_geo_centroidLineStart;
  }
};

// Arithmetic mean of Cartesian vectors.
function d3_geo_centroidPoint(λ, φ) {
  λ *= d3_radians;
  var cosφ = Math.cos(φ *= d3_radians);
  d3_geo_centroidPointXYZ(cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ));
}

function d3_geo_centroidPointXYZ(x, y, z) {
  ++d3_geo_centroidW0;
  d3_geo_centroidX0 += (x - d3_geo_centroidX0) / d3_geo_centroidW0;
  d3_geo_centroidY0 += (y - d3_geo_centroidY0) / d3_geo_centroidW0;
  d3_geo_centroidZ0 += (z - d3_geo_centroidZ0) / d3_geo_centroidW0;
}

function d3_geo_centroidLineStart() {
  var x0, y0, z0; // previous point

  d3_geo_centroid.point = function(λ, φ) {
    λ *= d3_radians;
    var cosφ = Math.cos(φ *= d3_radians);
    x0 = cosφ * Math.cos(λ);
    y0 = cosφ * Math.sin(λ);
    z0 = Math.sin(φ);
    d3_geo_centroid.point = nextPoint;
    d3_geo_centroidPointXYZ(x0, y0, z0);
  };

  function nextPoint(λ, φ) {
    λ *= d3_radians;
    var cosφ = Math.cos(φ *= d3_radians),
        x = cosφ * Math.cos(λ),
        y = cosφ * Math.sin(λ),
        z = Math.sin(φ),
        w = Math.atan2(
          Math.sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w),
          x0 * x + y0 * y + z0 * z);
    d3_geo_centroidX1 += w * (x0 + (x0 = x));
    d3_geo_centroidY1 += w * (y0 + (y0 = y));
    d3_geo_centroidZ1 += w * (z0 + (z0 = z));
    d3_geo_centroidPointXYZ(x0, y0, z0);
  }
}

function d3_geo_centroidLineEnd() {
  d3_geo_centroid.point = d3_geo_centroidPoint;
}

// See J. E. Brock, The Inertia Tensor for a Spherical Triangle,
// J. Applied Mechanics 42, 239 (1975).
function d3_geo_centroidRingStart() {
  var λ00, φ00, // first point
      x0, y0, z0; // previous point

  d3_geo_centroid.point = function(λ, φ) {
    λ00 = λ, φ00 = φ;
    d3_geo_centroid.point = nextPoint;
    λ *= d3_radians;
    var cosφ = Math.cos(φ *= d3_radians);
    x0 = cosφ * Math.cos(λ);
    y0 = cosφ * Math.sin(λ);
    z0 = Math.sin(φ);
    d3_geo_centroidPointXYZ(x0, y0, z0);
  };

  d3_geo_centroid.lineEnd = function() {
    nextPoint(λ00, φ00);
    d3_geo_centroid.lineEnd = d3_geo_centroidLineEnd;
    d3_geo_centroid.point = d3_geo_centroidPoint;
  };

  function nextPoint(λ, φ) {
    λ *= d3_radians;
    var cosφ = Math.cos(φ *= d3_radians),
        x = cosφ * Math.cos(λ),
        y = cosφ * Math.sin(λ),
        z = Math.sin(φ),
        cx = y0 * z - z0 * y,
        cy = z0 * x - x0 * z,
        cz = x0 * y - y0 * x,
        m = Math.sqrt(cx * cx + cy * cy + cz * cz),
        u = x0 * x + y0 * y + z0 * z,
        v = Math.atan2(m, u), // line
        w = m && -d3_acos(u) / m;
    d3_geo_centroidX1 += v * (x0 + (x0 = x));
    d3_geo_centroidY1 += v * (y0 + (y0 = y));
    d3_geo_centroidZ1 += v * (z0 + (z0 = z));
    d3_geo_centroidX2 += w * cx;
    d3_geo_centroidY2 += w * cy;
    d3_geo_centroidZ2 += w * cz;
    d3_geo_centroidPointXYZ(x0, y0, z0);
  }
}
