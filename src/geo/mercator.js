d3.geo.mercator = function() {
  var zoom = d3.geo.zoom();

  function mercator(coordinates) {
    var x = coordinates[0] / 360,
        y = -(Math.log(Math.tan(Math.PI / 4 + coordinates[1] * d3_geo_radians / 2)) / d3_geo_radians) / 360;
    return zoom([x, Math.max(-.5, Math.min(.5, y))]);
  }

  mercator.invert = function(coordinates) {
    coordinates = zoom.invert(coordinates);
    return [
      360 * coordinates[0],
      2 * Math.atan(Math.exp(-360 * coordinates[1] * d3_geo_radians)) / d3_geo_radians - 90
    ];
  };

  mercator.scale = d3.rebind(mercator, zoom.scale);
  mercator.translate = d3.rebind(mercator, zoom.translate);

  return mercator;
};
