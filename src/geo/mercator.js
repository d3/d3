import "../math/trigonometry";
import "geo";
import "projection";

function d3_geo_mercator(λ, φ) {
  return [λ, Math.log(Math.tan(π / 4 + φ / 2))];
}

d3_geo_mercator.invert = function(x, y) {
  return [x, 2 * Math.atan(Math.exp(y)) - halfπ];
};

function d3_geo_mercatorProjection(project) {
  var m = d3_geo_projection(project),
      scale = m.scale,
      translate = m.translate,
      clipExtent = m.clipExtent,
      clipAuto;

  m.scale = function() {
    var v = scale.apply(m, arguments);
    return v === m ? (clipAuto ? m.clipExtent(null) : m) : v;
  };

  m.translate = function() {
    var v = translate.apply(m, arguments);
    return v === m ? (clipAuto ? m.clipExtent(null) : m) : v;
  };

  m.clipExtent = function(_) {
    var v = clipExtent.apply(m, arguments);
    if (v === m) {
      if (clipAuto = _ == null) {
        var k = π * scale(), t = translate();
        clipExtent([[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]]);
      }
    } else if (clipAuto) {
      v = null;
    }
    return v;
  };

  return m.clipExtent(null);
}

(d3.geo.mercator = function() {
  return d3_geo_mercatorProjection(d3_geo_mercator);
}).raw = d3_geo_mercator;
