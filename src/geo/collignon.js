d3.geo.collignon = function() {
  var zoom = d3.geo.zoom();

  function collignon(coordinates) {
    var y = (y = 1 - Math.sin(coordinates[1] * d3_geo_radians)) > 0
        ? Math.sqrt(y) : 0;
    return zoom([
      1.12837916709551257390 * coordinates[0] * d3_geo_radians * y,
      1.77245385090551602729 * (y - 1)
    ]);
  }

  collignon.invert = function(coordinates) {
    coordinates = zoom.invert(coordinates);
    var y = -coordinates[1] / 1.77245385090551602729 - 1;
    y = Math.abs(y = 1 - y * y) < 1 ? Math.asin(y)
      : y < 0 ? -Math.PI / 2 : Math.PI;
    return [
      (x = 1 - Math.sin(y)) > 0
        ? coordinates[0] / (1.12837916709551257390 * Math.sqrt(x) * d3_geo_radians) : 0,
      y / d3_geo_radians
    ];
  };

  d3_geo_zoomRebind(collignon, zoom);

  return collignon;
};
