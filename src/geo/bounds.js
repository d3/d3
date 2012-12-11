d3.geo.bounds = d3_geo_bounds(d3_identity);

function d3_geo_bounds(projection) {
  var x0, y0, x1, y1, bounds = d3_geo_type({
    point: function(point) {
      point = projection(point);
      var x = point[0], y = point[1];
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    },
    polygon: function(coordinates) {
      this.line(coordinates[0]); // ignore holes
    }
  });

  return function(feature) {
    y1 = x1 = -(x0 = y0 = Infinity);
    bounds(feature);
    return [[x0, y0], [x1, y1]];
  };
}
