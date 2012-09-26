d3.geo.graticule = function() {
  var x1 = 180, x0 = -x1,
      y1 = 90, y0 = -y1,
      dx = 22.5, dy = dx,
      δx = 2, δy = 2;

  function graticule() {
    return {
      type: "GeometryCollection",
      geometries: graticule.lines()
    };
  }

  graticule.lines = function() {
    var xSteps = d3.range(x0, x1 - δx / 2, δx).concat(x1),
        ySteps = d3.range(y0, y1 - δy / 2, δy).concat(y1),
        xLines = d3.range(Math.ceil(x0 / dx) * dx, x1, dx).map(function(x) { return ySteps.map(function(y) { return [x, y]; }); }),
        yLines = d3.range(Math.ceil(y0 / dy) * dy, y1, dy).map(function(y) { return xSteps.map(function(x) { return [x, y]; }); });
    return xLines.concat(yLines).map(function(coordinates) {
      return {
        type: "LineString",
        coordinates: coordinates
      };
    });
  }

  graticule.outline = function() {
    return {
      type: "Polygon",
      coordinates: [[[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, x0]]]
    };
  };

  graticule.extent = function(_) {
    if (!arguments.length) return [[x0, y0], [x1, y1]];
    x0 = +_[0][0], x1 = +_[1][0];
    y0 = +_[0][1], y1 = +_[1][1];
    if (x0 > x1) _ = x0, x0 = x1, x1 = _;
    if (y0 > y1) _ = y0, y0 = y1, y1 = _;
    return graticule;
  };

  graticule.step = function(_) {
    if (!arguments.length) return [dx, dy];
    dx = +_[0], dy = +_[1];
    return graticule;
  };

  return graticule;
};
