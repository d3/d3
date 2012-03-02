d3.xyz = function(x, y, z) {
  return arguments.length === 1
      ? (x instanceof d3_Xyz ? d3_xyz(x.x, x.y, x.z)
      : d3_rgb_parse("" + x, d3_rgb_xyz, d3_xyz))
      : d3_xyz(+x, +y, +z);
};

function d3_xyz(x, y, z) {
  return new d3_Xyz(x, y, z);
}

function d3_Xyz(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

d3_Xyz.prototype.rgb = function() {
  return d3_xyz_rgb(this.x, this.y, this.z);
}

d3_Xyz.prototype.hsl = function() {
  return this.rgb().hsl();
}

/* add brighter, darker */
/*d3_Xyz.prototype.brighter = function(k) {

}*/

d3_Xyz.prototype.toString = function() {
  return this.rgb().toString();
}

function d3_xyz_rgb(x, y, z) {
  x /= 100;
  y /= 100;
  z /= 100;

  var r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  var g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  var b = x * 0.0557 + y * -0.2040 + z * 1.0570;

  function v(r) {
    return r > 0.0031308 ? 1.055 * Math.pow(r, (1 / 2.4)) - 0.055 : 12.92 * r;
  }

  function vv(h) {
    return Math.round(v(h) * 255);
  }

  return d3_rgb(vv(r), vv(g), vv(b));
}







