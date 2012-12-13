// TODO fallback for projections that don't implement stream?
// TODO better encapsulation for d3_geo_pathArea; move to area.js
// TODO better encapsulation for d3_geo_pathCentroid; move to centroid.js

d3.geo.path = function() {
  var pointRadius = 4.5,
      projection = d3.geo.albersUsa(),
      context,
      stream = new d3_geo_pathBuffer;

  function path(object) {
    if (object) d3.geo.stream(object, projection.stream(stream.pointRadius(
      typeof pointRadius === "function"
          ? pointRadius.apply(this, arguments)
          : pointRadius
    )));
    return stream.result();
  }

  path.area = function(object) {
    d3_geo_pathAreaSum = 0;
    d3.geo.stream(object, projection.stream(d3_geo_pathArea));
    return d3_geo_pathAreaSum;
  };

  path.centroid = function(object) {
    d3_geo_centroidDimension = d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
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
    stream = (context = _) == null
        ? new d3_geo_pathBuffer
        : new d3_geo_pathContext(_);
    return path;
  };

  path.pointRadius = function(_) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _ === "function" ? _ : +_;
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
