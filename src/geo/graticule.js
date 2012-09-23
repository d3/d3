// TODO projections need to resample for this to be usable
d3.geo.graticule = function() {
  var x1 = 180, x0 = -x1,
      y1 = 90, y0 = -y1,
      dx = 22.5, dy = dx;

  function graticule() {
    return {
      type: "GeometryCollection",
      geometries: graticule.lines()
    };
  }

  graticule.lines = function() {
    var xLines = d3.range(Math.ceil(x0 / dx) * dx, y0, dx).map(function(x) { return [y0, y1].map(function(y) { return [x, y]; }); }),
        yLines = d3.range(Math.ceil(x1 / dy) * dy, y1, dy).map(function(y) { return [x0, x1].map(function(x) { return [x, y]; }); });
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
