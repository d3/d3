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

  path.centroid = function(object) {
    d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
    d3.geo.stream(object, projection.stream(d3_geo_pathCentroid));
    return d3_geo_centroidZ ? [d3_geo_centroidX / d3_geo_centroidZ, d3_geo_centroidY / d3_geo_centroidZ] : undefined;
  };

  path.bounds = function(object) {
    return d3_geo_bounds(projection)(object);
  };

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
