d3.geo.area = function(object) {
  return d3_geo_areaType.object(object);
};

var d3_geo_areaType = d3_geo_type({
  Point: d3_zero,
  MultiPoint: d3_zero,
  LineString: d3_zero,
  MultiLineString: d3_zero,
  Polygon: function(polygon) { return d3_geo_areaPolygon(polygon.coordinates); },
  MultiPolygon: function(multiPolygon) { return d3.sum(multiPolygon.coordinates, d3_geo_areaPolygon); },
  Sphere: function() { return 4 * π; },
  Feature: function(feature) { return d3_geo_areaType.geometry(feature.geometry); },
  FeatureCollection: function(collection) { return d3.sum(collection.features, d3_geo_areaType.Feature); },
  GeometryCollection: function(collection) { return d3.sum(collection.geometries, d3_geo_areaType.geometry); },
  geometry: function(geometry) { return d3_geo_areaType[geometry.type](geometry); }
});

function d3_geo_areaPolygon(polygon) {
  var area = d3.sum(polygon, d3_geo_areaPolygonRing);
  return area < 0 ? 4 * π + area : area;
}

function d3_geo_areaPolygonRing(ring) {
  return d3_geo_areaRing(ring.map(d3_geo_areaRadians));
}

function d3_geo_areaRadians(point) {
  return [point[0] * d3_radians, point[1] * d3_radians];
}

function d3_geo_areaRing(ring) {
  var p = ring[0],
      λ00 = p[0],
      λ0 = λ00,
      λ,
      φ00 = p[1],
      φ0 = φ00,
      φ,
      dλ,
      cosdλ,
      cosφ0 = Math.cos(φ0),
      sinφ0 = Math.sin(φ0),
      cosφ,
      sinφ,
      d,
      s,
      area = 0;
  for (var i = 1, n = ring.length; i < n; ++i) {
    p = ring[i];
    φ = p[1];
    if (Math.abs(Math.abs(φ0) - π / 2) < ε && Math.abs(Math.abs(φ) - π / 2) < ε) continue;
    λ = p[0];
    cosφ = Math.cos(φ);
    sinφ = Math.sin(φ);
    if (Math.abs(φ0 - π / 2) < ε) {
      area += (λ - λ00) * 2;
    } else {
      cosdλ = Math.cos(dλ = λ - λ0);
      d = Math.atan2(Math.sqrt((d = cosφ * Math.sin(λ - λ0)) * d + (d = cosφ0 * sinφ - sinφ0 * cosφ * cosdλ) * d),
          sinφ0 * sinφ + cosφ0 * cosφ * cosdλ);
      s = (d + π + φ0 + φ) / 2;
      area += (dλ < 0 && dλ > -π || dλ > π ? -4 : 4) *
          Math.atan(Math.sqrt(Math.abs(Math.tan(s / 2) * Math.tan((s - d) / 2) * Math.tan((s - π / 2 - φ0) / 2) * Math.tan((s - π / 2 - φ) / 2))));
    }
    λ00 = λ0, φ00 = φ0;
    λ0 = λ, φ0 = φ;
    cosφ0 = cosφ, sinφ0 = sinφ;
  }
  return area;
}
