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

  path.area = function(object) {
    d3_geo_areaSum = 0;
    d3.geo.stream(object, projection.stream(d3_geo_pathArea));
    return d3_geo_areaSum;
  };

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

var d3_geo_pathExterior;

var d3_geo_pathArea = {
  point: d3_noop,
  lineStart: d3_noop,
  lineEnd: d3_noop,

  // Only count area for polygon rings.
  polygonStart: function() {
    d3_geo_pathExterior = true;
    d3_geo_pathArea.lineStart = d3_geo_pathAreaRingStart;
    d3_geo_pathArea.lineEnd = d3_geo_pathAreaRingEnd;
  },
  polygonEnd: function() {
    d3_geo_pathArea.lineStart = d3_geo_pathArea.lineEnd = d3_geo_pathArea.point = d3_noop;
  }
};

function d3_geo_pathAreaRingStart() {
  var x0, y0;

  d3_geo_areaRing = 0;

  // For the first point, …
  d3_geo_pathArea.point = function(x, y) {
    d3_geo_pathArea.point = nextPoint;
    x0 = x, y0 = y;
  };

  // For subsequent points, …
  function nextPoint(x, y) {
    d3_geo_areaRing += y0 * x - x0 * y;
    x0 = x, y0 = y;
  }
}

function d3_geo_pathAreaRingEnd() {
  d3_geo_areaSum += Math.abs(d3_geo_areaRing) / (d3_geo_pathExterior ? 2 : -2);
  d3_geo_pathExterior = false;
}
