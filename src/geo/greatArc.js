d3.geo.greatArc = function() {
  var source = d3_source, source_,
      target = d3_target, target_,
      precision = 6 * d3_radians,
      interpolate;

  function greatArc() {
    var p0 = source_ || source.apply(this, arguments),
        p1 = target_ || target.apply(this, arguments),
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
    return (interpolate || d3.geo.interpolate(source_ || source.apply(this, arguments), target_ || target.apply(this, arguments))).distance;
  };

  greatArc.source = function(_) {
    if (!arguments.length) return source;
    source = _, source_ = typeof _ === "function" ? null : _;
    interpolate = source_ && target_ ? d3.geo.interpolate(source_, target_) : null;
    return greatArc;
  };

  greatArc.target = function(_) {
    if (!arguments.length) return target;
    target = _, target_ = typeof _ === "function" ? null : _;
    interpolate = source_ && target_ ? d3.geo.interpolate(source_, target_) : null;
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
