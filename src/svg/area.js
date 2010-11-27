d3["svg"]["area"] = function() {
  var x = d3_svg_lineX,
      y0 = d3_svg_areaY0,
      y1 = d3_svg_lineY,
      interpolate = "linear",
      interpolator = d3_svg_lineInterpolators[interpolate];

  // TODO horizontal / vertical / radial orientation

  function area(d) {
    return d.length < 1 ? null
        : "M" + interpolator(d3_svg_linePoints(this, d, x, y1))
        + "L" + interpolator(d3_svg_linePoints(this, d, x, y0).reverse())
        + "Z";
  }

  area["x"] = function(v) {
    if (!arguments.length) return x;
    x = v;
    return area;
  };

  area["y0"] = function(v) {
    if (!arguments.length) return y0;
    y0 = v;
    return area;
  };

  area["y1"] = function(v) {
    if (!arguments.length) return y1;
    y1 = v;
    return area;
  };

  area["interpolate"] = function(v) {
    if (!arguments.length) return interpolate;
    interpolator = d3_svg_lineInterpolators[interpolate = v];
    return area;
  };

  return area;
};

function d3_svg_areaY0() {
  return 0;
}
