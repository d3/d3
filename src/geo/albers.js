import "conic-equal-area";
import "geo";

d3.geo.albers = function() {
  return d3.geo.conicEqualArea()
      .parallels([29.5, 45.5])
      .rotate([98, 0])
      .center([0, 38])
      .scale(1000);
};
