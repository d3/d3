// TODO better encapsulation for d3_geo_pathArea; move to area.js
// TODO better encapsulation for d3_geo_pathCentroid; move to centroid.js

d3.geo.path = function() {
  var pointRadius = 4.5,
      projection,
      context,
      projectStream,
      contextStream;

  function path(object) {
    if (object) d3.geo.stream(object, projectStream(
        contextStream.pointRadius(typeof pointRadius === "function"
            ? +pointRadius.apply(this, arguments)
            : pointRadius)));
    return contextStream.result();
  }

  path.area = function(object) {
    d3_geo_pathAreaSum = 0;
    d3.geo.stream(object, projectStream(d3_geo_pathArea));
    return d3_geo_pathAreaSum;
  };

  path.centroid = function(object) {
    d3_geo_centroidDimension = d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
    d3.geo.stream(object, projectStream(d3_geo_pathCentroid));
    return d3_geo_centroidZ ? [d3_geo_centroidX / d3_geo_centroidZ, d3_geo_centroidY / d3_geo_centroidZ] : undefined;
  };

  path.bounds = function(object) {
    return d3_geo_bounds(projection)(object);
  };

  path.projection = function(_) {
    if (!arguments.length) return projection;
    projectStream = (projection = _) ? _.stream || d3_geo_pathProjectStream(_) : d3_identity;
    return path;
  };

  path.context = function(_) {
    if (!arguments.length) return context;
    contextStream = (context = _) == null ? new d3_geo_pathBuffer : new d3_geo_pathContext(_);
    return path;
  };

  path.pointRadius = function(_) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _ === "function" ? _ : +_;
    return path;
  };

  return path.projection(d3.geo.albersUsa()).context(null);
};

function d3_geo_pathCircle(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + (-2 * radius)
      + "a" + radius + "," + radius + " 0 1,1 0," + (+2 * radius)
      + "z";
}

function d3_geo_pathProjectStream(project) {
  var resample = d3_geo_resample(function(λ, φ) { return project([λ * d3_degrees, φ * d3_degrees]); });
  return function(stream) {
    stream = resample(stream);
    return {
      point: function(λ, φ) { stream.point(λ * d3_radians, φ * d3_radians); },
      sphere: function() { stream.sphere(); },
      lineStart: function() { stream.lineStart(); },
      lineEnd: function() { stream.lineEnd(); },
      polygonStart: function() { stream.polygonStart(); },
      polygonEnd: function() { stream.polygonEnd(); }
    };
  };
}
