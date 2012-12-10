d3.geo.greatArc = function() {
  var source = d3_source, s,
      target = d3_target, t,
      precision = 6 * d3_radians,
      interpolate;

  function greatArc() {
    var p0 = s || source.apply(this, arguments),
        p1 = t || target.apply(this, arguments),
        i = interpolate || d3.geo.interpolate(p0, p1),
        t = 0,
        dt = precision / i.distance,
        coordinates = [p0];
    while ((t += dt) < 1) coordinates.push(i(t));
    coordinates.push(p1);
    return {type: "LineString", coordinates: coordinates};
  }

  // Length returned in radians; multiply by radius for distance.
  greatArc.distance = function() {
    return (interpolate || d3.geo.interpolate(s || source.apply(this, arguments), t || target.apply(this, arguments))).distance;
  };

  greatArc.source = function(_) {
    if (!arguments.length) return source;
    source = _, s = typeof _ === "function" ? null : _;
    interpolate = s && t ? d3.geo.interpolate(s, t) : null;
    return greatArc;
  };

  greatArc.target = function(_) {
    if (!arguments.length) return target;
    target = _, t = typeof _ === "function" ? null : _;
    interpolate = s && t ? d3.geo.interpolate(s, t) : null;
    return greatArc;
  };

  // Precision is specified in degrees.
  greatArc.precision = function(_) {
    if (!arguments.length) return precision / d3_radians;
    precision = _ * d3_radians;
    return greatArc;
  };

  return greatArc;
};
