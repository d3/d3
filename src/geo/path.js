// TODO fallback for projections that don't implement point, polygon? (or fix albersUsa?)

d3.geo.path = function() {
  var pointRadius = 4.5,
      pointCircle = d3_geo_pathCircle(pointRadius),
      projection = d3.geo.albersUsa(),
      context,
      buffer = [];

  function path(object) {
    var radius = typeof pointRadius === "function" ? pointRadius.apply(this, arguments) : pointRadius;
    d3.geo.stream(object, projection.stream(context != null
        ? new d3_geo_streamContext(context, radius)
        : new d3_geo_streamBuffer(buffer, radius)));
    var result = buffer.join("");
    buffer = [];
    return result;
  }

  path.area = d3_geo_type({
    Feature: function(feature) { return areaType.geometry(feature.geometry); },
    FeatureCollection: function(collection) { return d3.sum(collection.features, areaType.Feature); },
    GeometryCollection: function(collection) { return d3.sum(collection.geometries, areaType.geometry); },
    LineString: d3_zero,
    MultiLineString: d3_zero,
    MultiPoint: d3_zero,
    MultiPolygon: objectArea,
    Point: d3_zero,
    Polygon: objectArea,
    Sphere: objectArea
  });

  // For object types Polygon, MultiPolygon and Sphere only.
  function objectArea(o) {
    o = projection.object(o);
    return o
        ? o.type === "Polygon" ? polygonArea(o.coordinates)
        : d3.sum(o.coordinates, polygonArea)
        : 0;
  }

  function polygonArea(polygon) {
    return Math.abs(d3.sum(polygon, ringArea));
  }

  function ringArea(ring) {
    return d3.geom.polygon(ring).area();
  }

  path.bounds = function(object) {
    return d3_geo_bounds(projection)(object);
  };

  path.centroid = function(object) {
    return (object = projection.object(object)) ? centroidType(object) : null;
  };

  var centroidType = d3_geo_type({
    FeatureCollection: d3_noop,
    GeometryCollection: d3_noop,

    MultiLineString: weightedCentroid(function(line) {
      var n = line.length,
          i = 0,
          p = line[0],
          x0 = p[0],
          y0 = p[1],
          x,
          y,
          z = 0,
          cx = 0,
          cy = 0,
          dx,
          dy,
          δ;
      while (++i < n) {
        p = line[i];
        x = p[0];
        y = p[1];
        dx = x - x0;
        dy = y - y0;
        z += δ = Math.sqrt(dx * dx + dy * dy);
        cx += δ * (x0 + x) / 2;
        cy += δ * (y0 + y) / 2;
        x0 = x;
        y0 = y;
      }
      return [cx, cy, z];
    }),

    Point: function(point) { return point.coordinates; },

    MultiPoint: weightedCentroid(function(point) {
      return [point[0], point[1], 1];
    }),

    Polygon: weightedCentroid(ringCentroid),

    MultiPolygon: weightedCentroid(function(polygon) {
      var x = 0,
          y = 0,
          z = 0,
          centroid;
      for (var i = 0, n = polygon.length; i < n; ++i) {
        centroid = ringCentroid(polygon[i]);
        x += centroid[0];
        y += centroid[1];
        z += centroid[2];
      }
      return [x, y, z];
    })
  });

  function ringCentroid(ring) {
    var n = ring.length,
        i = 0,
        p = ring[0],
        x0 = p[0],
        y0 = p[1],
        x,
        y,
        z = 0,
        cx = 0,
        cy = 0,
        δ;
    while (++i < n) {
      p = ring[i];
      x = p[0];
      y = p[1];
      δ = y0 * x - x0 * y;
      z += δ * 3;
      cx += δ * (x0 + x);
      cy += δ * (y0 + y);
      x0 = x;
      y0 = y;
    }
    return [cx, cy, z];
  }

  function weightedCentroid(f) {
    return function(o) {
      var coordinates = o.coordinates,
          centroid,
          x = 0,
          y = 0,
          z = 0,
          i = -1,
          n = coordinates.length;
      while (++i < n) {
        centroid = f(coordinates[i]);
        x += centroid[0];
        y += centroid[1];
        z += centroid[2];
      }
      return z ? [x / z, y / z] : null;
    };
  }

  path.projection = function(_) {
    if (!arguments.length) return projection;
    projection = _;
    return path;
  };

  path.context = function(_) {
    if (!arguments.length) return context;
    context = _;
    return path;
  };

  path.pointRadius = function(x) {
    if (!arguments.length) return pointRadius;
    if (typeof x === "function") pointRadius = x;
    else pointCircle = d3_geo_pathCircle(pointRadius = +x);
    return path;
  };

  return path;
};

function d3_geo_pathCircle(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + (-2 * radius)
      + "a" + radius + "," + radius + " 0 1,1 0," + (+2 * radius)
      + "z";
}
