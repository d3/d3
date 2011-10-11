d3.geo.equirectangular = function() {
  var zoom = d3.geo.zoom();

  function equirectangular(coordinates) {
    return zoom([
      coordinates[0] / 360,
      -coordinates[1] / 360
    ]);
  }

  equirectangular.invert = function(coordinates) {
    coordinates = zoom.invert(coordinates);
    return [
      360 * coordinates[0],
      -360 * coordinates[1]
    ];
  };

  d3_geo_zoomRebind(equirectangular, zoom);

  return equirectangular;
};
