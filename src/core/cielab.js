d3.cielab = function(l, a, b) {
  return arguments.length === 1
      ? (l instanceof d3_Cielab ? d3_cielab(l.l, l.a, l.b)
      : d3_rgb_parse("" + l, d3_rgb_xyz, d3_hsl_xyz).cielab())
      : d3_cielab(+l, +a, +b);
};

function d3_cielab(l, a, b) {
  return new d3_Cielab(l, a, b);
}

function d3_Cielab(l, a, b) {
  this.l = l;
  this.a = a;
  this.b = b;
}



d3_Xyz.prototype.toString = function() {
  return this.rgb().toString();
}

