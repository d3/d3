d3.geo.centroid = function(object) {
  return d3_geo_centroidType.object(object);
};

var d3_geo_centroidType = d3_geo_type({

  FeatureCollection: d3_noop,
  GeometryCollection: d3_noop,

  Feature: function(feature) {
    return this.geometry(feature.geometry);
  },

  Point: function(point) {
    return point.coordinates;
  },

  MultiPoint: function(multiPoint) {
    var coordinates = multiPoint.coordinates,
        n = coordinates.length,
        i = 0,
        point,
        λ,
        φ,
        cosφ,
        x = 0,
        y = 0,
        z = 0;
    while (i < n) {
      point = coordinates[i++];
      λ = point[0] * d3_radians;
      cosφ = Math.cos(φ = point[1] * d3_radians);
      x += (cosφ * Math.cos(λ) - x) / i;
      y += (cosφ * Math.sin(λ) - y) / i;
      z += (Math.sin(φ) - z) / i;
    }
    return n ? [
      Math.atan2(y, x) * d3_degrees,
      Math.asin(Math.max(-1, Math.min(1, z))) * d3_degrees
    ] : null;
  },

  LineString: function(line) {
    var centroid = d3_geo_centroidLine(line.coordinates),
        cx,
        cy,
        cz;
    return centroid && centroid[3] ? [
      Math.atan2(cy = centroid[1], cx = centroid[0]) * d3_degrees,
      Math.asin(Math.max(-1, Math.min(1, (cz = centroid[2]) / Math.sqrt(cx * cx + cy * cy + cz * cz)))) * d3_degrees
    ] : null;
  },

  MultiLineString: function(multiLine) {
    var coordinates = multiLine.coordinates,
        n = coordinates.length,
        i = -1,
        cx = 0,
        cy = 0,
        cz = 0,
        weight = 0;
    while (++i < n) {
      centroid = d3_geo_centroidLine(coordinates[i]);
      if (!centroid) continue;
      cx += centroid[0];
      cy += centroid[1];
      cz += centroid[2];
      weight += centroid[3];
    }
    return weight ? [
      Math.atan2(cy, cx) * d3_degrees,
      Math.asin(Math.max(-1, Math.min(1, cz / Math.sqrt(cx * cx + cy * cy + cz * cz)))) * d3_degrees
    ] : null;
  },

  // TODO use area weighting
  Polygon: function(polygon) {
    return this.MultiLineString(polygon);
  },

  // TODO use area weighting
  MultiPolygon: function(multiPolygon) {
    var coordinates = multiPolygon.coordinates,
        n = coordinates.length,
        i = -1,
        cx = 0,
        cy = 0,
        cz = 0,
        weight = 0,
        polygon;
    while (++i < n) {
      polygon = coordinates[i];
      for (var j = 0, m = polygon.length; j < m; ++j) {
        centroid = d3_geo_centroidLine(polygon[j]);
        if (!centroid) continue;
        cx += centroid[0];
        cy += centroid[1];
        cz += centroid[2];
        weight += centroid[3];
      }
    }
    return weight ? [
      Math.atan2(cy, cx) * d3_degrees,
      Math.asin(Math.max(-1, Math.min(1, cz / Math.sqrt(cx * cx + cy * cy + cz * cz)))) * d3_degrees
    ] : null;
  }
});

function d3_geo_centroidLine(coordinates) {
  if (!(n = coordinates.length)) return null;
  var point = coordinates[0],
      i = 0,
      n,
      λ = point[0] * d3_radians,
      φ,
      cosφ = Math.cos(φ = point[1] * d3_radians),
      x0 = cosφ * Math.cos(λ),
      y0 = cosφ * Math.sin(λ),
      z0 = Math.sin(φ),
      cx = 0,
      cy = 0,
      cz = 0,
      x,
      y,
      z,
      w,
      weight = 0;
  while (++i < n) {
    point = coordinates[i];
    λ = point[0] * d3_radians;
    cosφ = Math.cos(φ = point[1] * d3_radians);
    x = cosφ * Math.cos(λ);
    y = cosφ * Math.sin(λ);
    z = Math.sin(φ);
    weight += w = Math.atan2(
        Math.sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w),
        x0 * x + y0 * y + z0 * z);
    cx += w * (x0 + (x0 = x));
    cy += w * (y0 + (y0 = y));
    cz += w * (z0 + (z0 = z));
  }
  return [cx, cy, cz, weight];
}
