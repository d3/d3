import "../core/source";
import "../core/target";
import "geo";
import "distance";

// @deprecated use {type: "LineString"} or d3.geo.distance instead.
d3.geo.greatArc = function() {
  var source = d3_source, source_,
      target = d3_target, target_;

  function greatArc() {
    return {type: "LineString", coordinates: [
      source_ || source.apply(this, arguments),
      target_ || target.apply(this, arguments)
    ]};
  }

  greatArc.distance = function() {
    return d3.geo.distance(
      source_ || source.apply(this, arguments),
      target_ || target.apply(this, arguments)
    );
  };

  greatArc.source = function(_) {
    if (!arguments.length) return source;
    source = _, source_ = typeof _ === "function" ? null : _;
    return greatArc;
  };

  greatArc.target = function(_) {
    if (!arguments.length) return target;
    target = _, target_ = typeof _ === "function" ? null : _;
    return greatArc;
  };

  greatArc.precision = function() {
    return arguments.length ? greatArc : 0;
  };

  return greatArc;
};
