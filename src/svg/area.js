function d3_svg_area(projection) {
  var x0 = d3_svg_lineX,
      x1 = d3_svg_lineX,
      y0 = 0,
      y1 = d3_svg_lineY,
      interpolate = "linear",
      interpolator = d3_svg_lineInterpolators[interpolate],
      tension = .7;

  function area(d) {
    if (d.length < 1) return null;
    var points0 = d3_svg_linePoints(this, d, x0, y0),
        points1 = d3_svg_linePoints(this, d, x0 === x1 ? d3_svg_areaX(points0) : x1, y0 === y1 ? d3_svg_areaY(points0) : y1);
    return "M" + interpolator(projection(points1), tension)
         + "L" + interpolator(projection(points0.reverse()), tension)
         + "Z";
  }

  area.x = function(x) {
    if (!arguments.length) return x1;
    x0 = x1 = x;
    return area;
  };

  area.x0 = function(x) {
    if (!arguments.length) return x0;
    x0 = x;
    return area;
  };

  area.x1 = function(x) {
    if (!arguments.length) return x1;
    x1 = x;
    return area;
  };

  area.y = function(y) {
    if (!arguments.length) return y1;
    y0 = y1 = y;
    return area;
  };

  area.y0 = function(y) {
    if (!arguments.length) return y0;
    y0 = y;
    return area;
  };

  area.y1 = function(y) {
    if (!arguments.length) return y1;
    y1 = y;
    return area;
  };

  area.interpolate = function(x) {
    if (!arguments.length) return interpolate;
    interpolator = d3_svg_lineInterpolators[interpolate = x];
    return area;
  };

  area.tension = function(x) {
    if (!arguments.length) return tension;
    tension = x;
    return area;
  };

  return area;
}

d3.svg.area = function() {
  return d3_svg_area(Object);
};

function d3_svg_areaX(points) {
  return function(d, i) {
    return points[i][0];
  };
}

function d3_svg_areaY(points) {
  return function(d, i) {
    return points[i][1];
  };
}
