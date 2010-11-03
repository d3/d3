d3.geo.circle = function() {
  var projection = d3.geo.albersUsa();

  /** @this Element */
  function circle(d) { // TODO assumes Feature + Point
    var xy = projection(d.geometry.coordinates);
    this.setAttribute("cx", xy[0]);
    this.setAttribute("cy", xy[1]);
  }

  circle.projection = function(x) {
    projection = x;
    return circle;
  };

  return circle;
};
