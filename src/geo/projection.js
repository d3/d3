import "../core/identity";
import "../core/rebind";
import "../math/trigonometry";
import "clip-antimeridian";
import "clip-circle";
import "clip-extent";
import "compose";
import "geo";
import "path";
import "resample";
import "rotation";
import "transform";

d3.geo.projection = d3_geo_projection;
d3.geo.projectionMutator = d3_geo_projectionMutator;

function d3_geo_projection(project) {
  return d3_geo_projectionMutator(function() { return project; })();
}

function d3_geo_projectionMutator(projectAt) {
  var project,
      rotate,
      projectRotate,
      projectResample = d3_geo_resample(function(x, y) { x = project(x, y); return [x[0] * k + δx, δy - x[1] * k]; }),
      k = 150, // scale
      x = 480, y = 250, // translate
      λ = 0, φ = 0, // center
      δλ = 0, δφ = 0, δγ = 0, // rotate
      δx, δy, // center
      clipAngle = null,
      clipExtent = null,
      stream;

  function projection(point) {
    point = projectRotate(point[0] * d3_radians, point[1] * d3_radians);
    return [point[0] * k + δx, δy - point[1] * k];
  }

  function invert(point) {
    point = projectRotate.invert((point[0] - δx) / k, (δy - point[1]) / k);
    return point && [point[0] * d3_degrees, point[1] * d3_degrees];
  }

  projection.stream = function(output) {
    if (stream) stream.valid = false;
    output = projectResample(clipExtent ? d3_geo_clipExtent(clipExtent[0][0], clipExtent[0][1], clipExtent[1][0], clipExtent[1][1], output) : output);
    stream = d3_geo_projectionRadiansRotate(δλ, δφ, δγ, clipAngle == null ? d3_geo_clipAntimeridian(output) : d3_geo_clipCircle(clipAngle * d3_radians, output));
    stream.valid = true; // allow caching by d3.geo.path
    return stream;
  };

  projection.clipAngle = function(_) {
    if (!arguments.length) return clipAngle;
    clipAngle = _ == null ? _ : +_;
    return invalidate();
  };

  projection.clipExtent = function(_) {
    if (!arguments.length) return clipExtent;
    clipExtent = _;
    return invalidate();
  };

  projection.scale = function(_) {
    if (!arguments.length) return k;
    k = +_;
    return reset();
  };

  projection.translate = function(_) {
    if (!arguments.length) return [x, y];
    x = +_[0];
    y = +_[1];
    return reset();
  };

  projection.center = function(_) {
    if (!arguments.length) return [λ * d3_degrees, φ * d3_degrees];
    λ = _[0] % 360 * d3_radians;
    φ = _[1] % 360 * d3_radians;
    return reset();
  };

  projection.rotate = function(_) {
    if (!arguments.length) return [δλ * d3_degrees, δφ * d3_degrees, δγ * d3_degrees];
    δλ = _[0] % 360 * d3_radians;
    δφ = _[1] % 360 * d3_radians;
    δγ = _.length > 2 ? _[2] % 360 * d3_radians : 0;
    return reset();
  };

  d3.rebind(projection, projectResample, "precision");

  function reset() {
    projectRotate = d3_geo_compose(rotate = d3_geo_rotation(δλ, δφ, δγ), project);
    var center = project(λ, φ);
    δx = x - center[0] * k;
    δy = y + center[1] * k;
    return invalidate();
  }

  function invalidate() {
    if (stream) stream.valid = false, stream = null;
    return projection;
  }

  return function() {
    project = projectAt.apply(this, arguments);
    projection.invert = project.invert && invert;
    return reset();
  };
}

function d3_geo_projectionRadiansRotate(δλ, δφ, δγ, stream) {
  return d3_geo_transformPoint(stream, δλ && (δφ || δγ) ? d3_geo_projectionRadiansRotateλφγ(δλ, δφ, δγ, stream)
        : δλ ? d3_geo_projectionRadiansRotateλ(δλ, stream)
        : δφ || δγ ? d3_geo_projectionRadiansRotateφγ(δλ, δφ, δγ, stream)
        : function(x, y) { stream.point(x * d3_radians, y * d3_radians); });
}

function d3_geo_projectionRadiansRotateλ(δλ, stream) {
  return function(λ, φ) {
    λ += δλ;
    stream.point(λ > π ? λ - τ : λ < -π ? λ + τ : λ, φ);
  };
}

function d3_geo_projectionRadiansRotateφγ(δφ, δγ, stream) {
  var cosδφ = Math.cos(δφ),
      sinδφ = Math.sin(δφ),
      cosδγ = Math.cos(δγ),
      sinδγ = Math.sin(δγ);
  return function(λ, φ) {
    var cosφ = Math.cos(φ),
        x = Math.cos(λ) * cosφ,
        y = Math.sin(λ) * cosφ,
        z = Math.sin(φ),
        k = z * cosδφ + x * sinδφ;
    stream.point(
      Math.atan2(y * cosδγ - k * sinδγ, x * cosδφ - z * sinδφ),
      d3_asin(k * cosδγ + y * sinδγ)
    );
  };
}

function d3_geo_projectionRadiansRotateλφγ(δλ, δφ, δγ, stream) {
  var cosδφ = Math.cos(δφ),
      sinδφ = Math.sin(δφ),
      cosδγ = Math.cos(δγ),
      sinδγ = Math.sin(δγ);
  return function(λ, φ) {
    var cosφ = Math.cos(φ),
        x = Math.cos(λ += δλ) * cosφ,
        y = Math.sin(λ) * cosφ,
        z = Math.sin(φ),
        k = z * cosδφ + x * sinδφ;
    stream.point(
      Math.atan2(y * cosδγ - k * sinδγ, x * cosδφ - z * sinδφ),
      d3_asin(k * cosδγ + y * sinδγ)
    );
  };
}
