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

/* add brighter, darker */
/*d3_Xyz.prototype.brighter = function(k) {

}*/

d3_Xyz.prototype.rgb = function() {
  
};

d3_Xyz.prototype.toString = function() {
  return this.rgb().toString();
};

