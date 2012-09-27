var d3_geo_stereographic = d3_geo_azimuthal(
  function(cosλcosφ) { return 1 / (1 + cosλcosφ); },
  function(ρ) { return 2 * Math.atan(ρ); }
);

(d3.geo.stereographic = function() {
  return d3_geo_projection(d3_geo_stereographic);
}).raw = d3_geo_stereographic;
