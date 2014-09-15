import "../math/trigonometry";
import "geo";

d3.geo.rotate = function(δλ, δφ, δγ, sink) {
  var cosδφ = Math.cos(δφ),
      sinδφ = Math.sin(δφ),
      cosδγ = Math.cos(δγ),
      sinδγ = Math.sin(δγ);

  return {
    sphere: function() { sink.sphere(); },
    polygonStart: function() { sink.polygonStart(); },
    polygonEnd: function() { sink.polygonEnd(); },
    lineStart: function() { sink.lineStart(); },
    lineEnd: function() { sink.lineEnd(); },
    point: function(λ, φ) {
      λ += δλ; if (λ > π) λ -= τ; else if (λ < -π) λ += τ;

      var cosφ = Math.cos(φ),
          x = Math.cos(λ) * cosφ,
          y = Math.sin(λ) * cosφ,
          z = Math.sin(φ),
          k = z * cosδφ + x * sinδφ;

      sink.point(Math.atan2(y * cosδγ - k * sinδγ, x * cosδφ - z * sinδφ), d3_asin(k * cosδγ + y * sinδγ));
    }
  };
};
