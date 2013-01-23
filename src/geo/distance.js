// Length returned in radians; multiply by radius for distance.
d3.geo.distance = function(a, b) {
  var λ0 = a[0] * d3_radians, φ0 = a[1] * d3_radians,
      λ1 = b[0] * d3_radians, φ1 = b[1] * d3_radians;
  return d3_acos(Math.sin(φ0) * Math.sin(φ1) + Math.cos(φ0) * Math.cos(φ1) * Math.cos(λ1 - λ0));
};
