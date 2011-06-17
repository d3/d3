d3.svg.area = function() {
  var x = d3_svg_lineX,
      y0 = d3_svg_areaY0,
      y1 = d3_svg_lineY,
      interpolate = "linear",
      interpolator = d3_svg_lineInterpolators[interpolate],
      tension = .7;

  // TODO horizontal / vertical / radial orientation

  function area(d) {
    if (d.length < 1) return null;
    var points1 = d3_svg_linePoints(this, d, x, y1),
        points0 = d3_svg_linePoints(this, d, d3_svg_areaX(points1), y0).reverse();
    return "M" + interpolator(points1, tension)
         + "L" + interpolator(points0, tension)
         + "Z";
  }

  area.x = function(v) {
    if (!arguments.length) return x;
    x = v;
    return area;
  };

  area.y0 = function(v) {
    if (!arguments.length) return y0;
    y0 = v;
    return area;
  };

  area.y1 = function(v) {
    if (!arguments.length) return y1;
    y1 = v;
    return area;
  };

  area.interpolate = function(v) {
    if (!arguments.length) return interpolate;
    interpolator = d3_svg_lineInterpolators[interpolate = v];
    return area;
  };

  area.tension = function(v) {
    if (!arguments.length) return tension;
    tension = v;
    return area;
  };

  return area;
};

function d3_svg_areaY0() {
  return 0;
}

function d3_svg_areaX(points) {
  return function(d, i) {
    return d3_svg_lineX.call(this, points[i], i);
  };
}
