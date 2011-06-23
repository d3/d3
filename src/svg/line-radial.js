d3.svg.line.radial = function() {
  var cartesian = d3.svg.line(),
      radius = d3_svg_lineX,
      angle = d3_svg_lineY;

  function line(d) {
    return cartesian(d3_svg_lineRadialPoints(this, d, radius, angle));
  }

  line.radius = function(x) {
    if (!arguments.length) return radius;
    radius = x;
    return line;
  };

  line.angle = function(x) {
    if (!arguments.length) return angle;
    angle = x;
    return line;
  };

  line.interpolate = d3.rebind(line, cartesian.interpolate);
  line.tension = d3.rebind(line, cartesian.tension);

  return line;
};

function d3_svg_lineRadialPoints(self, d, x, y) {
  var points = d3_svg_linePoints(self, d, x, y),
      point,
      i = -1,
      n = points.length,
      r,
      a;
  while (++i < n) {
    point = points[i];
    r = point[0];
    a = point[1] + d3_svg_arcOffset;
    point[0] = r * Math.cos(a);
    point[1] = r * Math.sin(a);
  }
  return points;
}
