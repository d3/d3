d3.geo.equirectangular = function() {
  var zoom = d3.geo.zoom();

  function equirectangular(coordinates) {
    return zoom([
      coordinates[0] / 360,
      y = -coordinates[1] / 360
    ]);
  }

  equirectangular.invert = function(coordinates) {
    coordinates = zoom.invert(coordinates);
    return [
      360 * coordinates[0],
      -360 * coordinates[1]
    ];
  };

  equirectangular.scale = d3.rebind(equirectangular, zoom.scale);
  equirectangular.translate = d3.rebind(equirectangular, zoom.translate);

  return equirectangular;
};
