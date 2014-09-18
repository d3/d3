import "../math/trigonometry";
import "geo";
import "point-transformation";

d3.geo.rotate = function(δλ, δφ, δγ, sink) {
  δλ = +δλ, δφ = +δφ, δγ = +δγ;
  return d3_geo_pointTransformation(sink,
      δλ ? (δφ ? (δγ ? d3_geo_rotateλφγ(δλ, δφ, δγ, sink) : d3_geo_rotateλφ(δλ, δφ, sink)) : (δγ ? d3_geo_rotateλγ(δλ, δγ, sink) : d3_geo_rotateλ(δλ, sink)))
      : δφ ? (δγ ? d3_geo_rotateφγ(δφ, δγ, sink) : d3_geo_rotateφ(δφ, sink))
      : δγ ? d3_geo_rotateγ(δγ, sink) : function(λ, φ) { sink.point(λ, φ); });
};

function d3_geo_rotateλ(δλ, sink) {
  return function(λ, φ) {
    λ += δλ; if (λ > π) λ -= τ; else if (λ < -π) λ += τ;
    sink.point(λ, φ);
  };
}

function d3_geo_rotateλφ(δλ, δφ, sink) {
  var cosδφ = Math.cos(δφ),
      sinδφ = Math.sin(δφ);
  return function(λ, φ) {
    λ += δλ; if (λ > π) λ -= τ; else if (λ < -π) λ += τ;
    var cosφ = Math.cos(φ),
        x = Math.cos(λ) * cosφ,
        y = Math.sin(λ) * cosφ,
        z = Math.sin(φ);
    sink.point(Math.atan2(y, x * cosδφ - z * sinδφ), d3_asin(z * cosδφ + x * sinδφ));
  };
}

function d3_geo_rotateλφγ(δλ, δφ, δγ, sink) {
  var cosδφ = Math.cos(δφ),
      sinδφ = Math.sin(δφ),
      cosδγ = Math.cos(δγ),
      sinδγ = Math.sin(δγ);
  return function(λ, φ) {
    λ += δλ; if (λ > π) λ -= τ; else if (λ < -π) λ += τ;
    var cosφ = Math.cos(φ),
        x = Math.cos(λ) * cosφ,
        y = Math.sin(λ) * cosφ,
        z = Math.sin(φ),
        k = z * cosδφ + x * sinδφ;
    sink.point(Math.atan2(y * cosδγ - k * sinδγ, x * cosδφ - z * sinδφ), d3_asin(k * cosδγ + y * sinδγ));
  };
}

function d3_geo_rotateφ(δφ, sink) {
  var cosδφ = Math.cos(δφ),
      sinδφ = Math.sin(δφ);
  return function(λ, φ) {
    var cosφ = Math.cos(φ),
        x = Math.cos(λ) * cosφ,
        y = Math.sin(λ) * cosφ,
        z = Math.sin(φ);
    sink.point(Math.atan2(y, x * cosδφ - z * sinδφ), d3_asin(z * cosδφ + x * sinδφ));
  };
}

function d3_geo_rotateφγ(δφ, δγ, sink) {
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
    sink.point(Math.atan2(y * cosδγ - k * sinδγ, x * cosδφ - z * sinδφ), d3_asin(k * cosδγ + y * sinδγ));
  };
}

function d3_geo_rotateγ(δγ, sink) {
  var cosδγ = Math.cos(δγ),
      sinδγ = Math.sin(δγ);
  return function(λ, φ) {
    var cosφ = Math.cos(φ),
        x = Math.cos(λ) * cosφ,
        y = Math.sin(λ) * cosφ,
        z = Math.sin(φ);
    sink.point(Math.atan2(y * cosδγ - z * sinδγ, x), d3_asin(z * cosδγ + y * sinδγ));
  };
}
