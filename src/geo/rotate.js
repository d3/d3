d3.geo.rotate = function(z, y, x) {
  if (!(x = ~~x) && !(y = ~~y) && !(z = ~~z)) return d3_geo_rotateIdentity;

  var m = d3_geo_rotateMatrix(y, x),
      zAngle = z;

  function rotate(coordinates) {
    var lon = (coordinates[0] + zAngle) * d3_geo_radians,
        lat = coordinates[1] * d3_geo_radians,
        s0 = Math.sin(lon),
        c0 = Math.cos(lon),
        c1 = Math.cos(lat),
        s1 = Math.sin(lat),
        x = c0 * c1,
        y = s0 * c1,
        z = s1,
        mx = m[0],
        my = m[1],
        mz = m[2];
    mx = x * mx[0] + y * mx[1] + z * mx[2];
    my = x * my[0] + y * my[1] + z * my[2];
    mz = x * mz[0] + y * mz[1] + z * mz[2];
    return [
      Math.atan2(my, mx) / d3_geo_radians,
      Math.asin(mz) / d3_geo_radians
    ];
  }

  rotate.invert = function(coordinates) {
    var lon = coordinates[0] * d3_geo_radians,
        lat = coordinates[1] * d3_geo_radians,
        s0 = Math.sin(lon),
        c0 = Math.cos(lon),
        c1 = Math.cos(lat),
        s1 = Math.sin(lat),
        x = c0 * c1,
        y = s0 * c1,
        z = s1,
        mx = m[0],
        my = m[1],
        mz = m[2],
        rx = x * mx[0] + y * my[0] + z * mz[0],
        ry = x * mx[1] + y * my[1] + z * mz[1],
        rz = x * mx[2] + y * my[2] + z * mz[2];
    return [
      Math.atan2(ry, rx) / d3_geo_radians - zAngle,
      Math.asin(rz) / d3_geo_radians
    ];
  };

  return rotate;
};

function d3_geo_rotateMatrix(y, x) {
  var cy = Math.cos(y *= d3_geo_radians),
      sy = Math.sin(y),
      cx = Math.cos(x *= d3_geo_radians),
      sx = Math.sin(x);
  return [
    [ cy,       0,      -sy],
    [-sx * sy, cx, -sx * cy],
    [ cx * sy, sx,  cx * cy]
  ];
}

function d3_geo_rotateIdentity(coordinates) { return coordinates; }
d3_geo_rotateIdentity.invert = d3_geo_rotateIdentity;
