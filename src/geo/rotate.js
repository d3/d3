d3.geo.rotate = function() {
  var m = [[1, 0, 0],
           [0, 1, 0],
           [0, 0, 1]],
      zAngle = 0;

  function rotate(coordinates) {
    if (zAngle != null) {
      return zAngle ? [coordinates[0] + zAngle, coordinates[1]] : coordinates;
    }
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
    if (zAngle != null) {
      return zAngle ? [coordinates[0] - zAngle, coordinates[1]] : coordinates;
    }
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
      Math.atan2(ry, rx) / d3_geo_radians,
      Math.asin(rz) / d3_geo_radians
    ];
  };

  rotate.x = function(angle) {
    if (angle === 0) return rotate;
    zAngle = null;
    var c = Math.cos(angle *= d3_geo_radians),
        s = Math.sin(angle),
        my = m[1],
        mz = m[2],
        my1 = my[1],
        my2 = my[2],
        mz1 = mz[1],
        mz2 = mz[2];
    my[1] = c * my1 - s * mz1;
    my[2] = c * my2 - s * mz2;
    mz[1] = s * my1 + c * mz1;
    mz[2] = s * my2 + c * mz2;
    return rotate;
  };

  rotate.y = function(angle) {
    if (angle === 0) return rotate;
    zAngle = null;
    var c = Math.cos(angle *= d3_geo_radians),
        s = Math.sin(angle),
        mx = m[0],
        mz = m[2],
        mx0 = mx[0],
        mx2 = mx[2],
        mz0 = mz[0],
        mz2 = mz[2];
    mx[0] = c * mx0 - s * mz0;
    mx[2] = c * mx2 - s * mz2;
    mz[0] = s * mx0 + c * mz0;
    mz[2] = s * mx2 + c * mz2;
    return rotate;
  };

  rotate.z = function(angle) {
    if (angle === 0) return rotate;
    if (zAngle != null) zAngle = angle;
    var c = Math.cos(angle *= d3_geo_radians),
        s = Math.sin(angle),
        mx = m[0],
        my = m[1],
        mx0 = mx[0],
        mx1 = mx[1],
        my0 = my[0],
        my1 = my[1];
    mx[0] = c * mx0 - s * my0;
    mx[1] = c * mx1 - s * my1;
    my[0] = s * mx0 + c * my0;
    my[1] = s * mx1 + c * my1;
    return rotate;
  };

  return rotate;
};
