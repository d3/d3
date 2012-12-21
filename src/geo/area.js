d3.geo.area = function(object) {
  d3_geo_areaSum = 0;
  d3.geo.stream(object, d3_geo_area);
  return d3_geo_areaSum;
};

var d3_geo_areaSum,
    d3_geo_areaRing;

var d3_geo_area = {
  sphere: function() { d3_geo_areaSum += 4 * π; },
  point: d3_noop,
  lineStart: d3_noop,
  lineEnd: d3_noop,

  // Only count area for polygon rings.
  polygonStart: function() {
    d3_geo_areaRing = 0;
    d3_geo_area.lineStart = d3_geo_areaRingStart;
  },
  polygonEnd: function() {
    d3_geo_areaSum += d3_geo_areaRing < 0 ? 4 * π + d3_geo_areaRing : d3_geo_areaRing;
    d3_geo_area.lineStart = d3_geo_area.lineEnd = d3_geo_area.point = d3_noop;
  }
};

function d3_geo_areaRingStart() {
  var λ00, φ00, λ1, λ0, φ0, cosφ0, sinφ0; // start point and two previous points

  // For the first point, …
  d3_geo_area.point = function(λ, φ) {
    d3_geo_area.point = nextPoint;
    λ1 = λ0 = (λ00 = λ) * d3_radians, φ0 = (φ00 = φ) * d3_radians, cosφ0 = Math.cos(φ0), sinφ0 = Math.sin(φ0);
  };

  // For subsequent points, …
  function nextPoint(λ, φ) {
    λ *= d3_radians, φ *= d3_radians;

    // If both the current point and the previous point are polar, skip this point.
    if (Math.abs(Math.abs(φ0) - π / 2) < ε && Math.abs(Math.abs(φ) - π / 2) < ε) return;
    var cosφ = Math.cos(φ), sinφ = Math.sin(φ);

    // If the previous point is at the north pole, then compute lune area.
    if (Math.abs(φ0 - π / 2) < ε) d3_geo_areaRing += (λ - λ1) * 2;

    // Area of spherical triangle with vertices at south pole, previous point
    // and current point = ER², where E is the spherical excess, and in our
    // case, R = 1.
    else {
      var dλ = λ - λ0,
          cosdλ = Math.cos(dλ),
          // Distance from previous point to current point, well-conditioned
          // for all angles.
          d = Math.atan2(Math.sqrt((d = cosφ * Math.sin(dλ)) * d + (d = cosφ0 * sinφ - sinφ0 * cosφ * cosdλ) * d), sinφ0 * sinφ + cosφ0 * cosφ * cosdλ),
          // Half the semiperimeter (a + b + c) / 2, where a, b and c are the
          // lengths of the triangle sides.
          s = (d + π + φ0 + φ) / 4;
      // Compute the spherical excess E using l’Huilier’s theorem,
      // tan(E / 4) = √[tan(s)tan(s - a / 2)tan(s - b / 2)tan(s - c / 2)].
      d3_geo_areaRing += (dλ < 0 && dλ > -π || dλ > π ? -4 : 4) * Math.atan(Math.sqrt(Math.abs(Math.tan(s) * Math.tan(s - d / 2) * Math.tan(s - π / 4 - φ0 / 2) * Math.tan(s - π / 4 - φ / 2))));
    }

    // Advance the previous points.
    λ1 = λ0, λ0 = λ, φ0 = φ, cosφ0 = cosφ, sinφ0 = sinφ;
  }

  // For the last point, return to the start.
  d3_geo_area.lineEnd = function() {
    nextPoint(λ00, φ00);
  };
}
