d3.geo.mercator = function() {
  return d3.geo.conic().mode("conformal").parallels(0).origin([0, 0]);
};
