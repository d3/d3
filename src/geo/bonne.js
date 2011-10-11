d3.geo.bonne = function() {
  var rotate = d3.geo.rotate(),
      zoom = d3.geo.zoom(),
      origin, // origin in degrees
      y1, // parallel latitude in radians
      c1; // cot(y1)

  function bonne(coordinates) {
    coordinates = rotate(coordinates);
    var x = coordinates[0] * d3_geo_radians,
        y = coordinates[1] * d3_geo_radians;
    if (y1) {
      var p = c1 + y1 - y,
          E = x * Math.cos(y) / p;
      x = p * Math.sin(E);
      y = p * Math.cos(E) - c1;
    } else {
      x *= Math.cos(y);
      y *= -1;
    }
    return zoom([x, y]);
  }

  bonne.invert = function(coordinates) {
    coordinates = zoom.invert(coordinates);
    var x = coordinates[0],
        y = coordinates[1];
    if (y1) {
      var c = c1 + y,
          p = Math.sqrt(x * x + c * c);
      y = c1 + y1 - p;
      x = p * Math.atan2(x, c) / Math.cos(y);
    } else {
      y *= -1;
      x /= Math.cos(y);
    }
    return rotate.invert([x / d3_geo_radians, y / d3_geo_radians]);
  };

  // 90° for Werner, 0° for Sinusoidal
  bonne.parallel = function(x) {
    if (!arguments.length) return y1 / d3_geo_radians;
    y1 = x * d3_geo_radians;
    c1 = x === 90 || x === -90 ? 0 : 1 / Math.tan(y1);
    return bonne;
  };

  bonne.origin = function(x) {
    if (!arguments.length) return origin;
    origin = [+x[0], +x[1]];
    rotate = d3.geo.rotate(-origin[0], origin[1]);
    return bonne;
  };

  d3_geo_zoomRebind(bonne, zoom);

  return bonne.origin([0, 0]).parallel(45).scale(200);
};
