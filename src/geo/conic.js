import "../math/trigonometry";
import "projection";

function d3_geo_conic(projectAt) {
  var phi0 = 0,
      phi1 = pi / 3,
      m = d3_geo_projectionMutator(projectAt),
      p = m(phi0, phi1);

  p.parallels = function(_) {
    if (!arguments.length) return [phi0 / pi * 180, phi1 / pi * 180];
    return m(phi0 = _[0] * pi / 180, phi1 = _[1] * pi / 180);
  };

  return p;
}
