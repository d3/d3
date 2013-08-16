import "../core/identity";
import "../math/trigonometry";
import "albers-usa";
import "area";
import "bounds";
import "centroid";
import "geo";
import "path-area";
import "path-bounds";
import "path-buffer";
import "path-centroid";
import "path-context";
import "projection";
import "resample";
import "stream";
import "transform";

d3.geo.path = function() {
  var pointRadius = 4.5,
      projection,
      context,
      projectStream,
      contextStream,
      cacheStream;

  function path(object) {
    if (object) {
      if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
      if (!cacheStream || !cacheStream.valid) cacheStream = projectStream(contextStream);
      d3.geo.stream(object, cacheStream);
    }
    return contextStream.result();
  }

  path.area = function(object) {
    d3_geo_pathAreaSum = 0;
    d3.geo.stream(object, projectStream(d3_geo_pathArea));
    return d3_geo_pathAreaSum;
  };

  path.centroid = function(object) {
    d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 =
    d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 =
    d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
    d3.geo.stream(object, projectStream(d3_geo_pathCentroid));
    return d3_geo_centroidZ2 ? [d3_geo_centroidX2 / d3_geo_centroidZ2, d3_geo_centroidY2 / d3_geo_centroidZ2]
        : d3_geo_centroidZ1 ? [d3_geo_centroidX1 / d3_geo_centroidZ1, d3_geo_centroidY1 / d3_geo_centroidZ1]
        : d3_geo_centroidZ0 ? [d3_geo_centroidX0 / d3_geo_centroidZ0, d3_geo_centroidY0 / d3_geo_centroidZ0]
        : [NaN, NaN];
  };

  path.bounds = function(object) {
    d3_geo_pathBoundsX1 = d3_geo_pathBoundsY1 = -(d3_geo_pathBoundsX0 = d3_geo_pathBoundsY0 = Infinity);
    d3.geo.stream(object, projectStream(d3_geo_pathBounds));
    return [[d3_geo_pathBoundsX0, d3_geo_pathBoundsY0], [d3_geo_pathBoundsX1, d3_geo_pathBoundsY1]];
  };

  path.projection = function(_) {
    if (!arguments.length) return projection;
    projectStream = (projection = _) ? _.stream || d3_geo_pathProjectStream(_) : d3_identity;
    return reset();
  };

  path.context = function(_) {
    if (!arguments.length) return context;
    contextStream = (context = _) == null ? new d3_geo_pathBuffer : new d3_geo_pathContext(_);
    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
    return reset();
  };

  path.pointRadius = function(_) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
    return path;
  };

  function reset() {
    cacheStream = null;
    return path;
  }

  return path.projection(d3.geo.albersUsa()).context(null);
};

function d3_geo_pathProjectStream(project) {
  var resample = d3_geo_resample(function(x, y) { return project([x * d3_degrees, y * d3_degrees]); });
  return function(stream) {
    var transform = new d3_geo_transform(stream = resample(stream));
    transform.point = function(x, y) { stream.point(x * d3_radians, y * d3_radians); };
    return transform;
  };
}
