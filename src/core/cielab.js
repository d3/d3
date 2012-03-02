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

d3_Cielab.prototype.rgb = function() {
  return this.xyz().rgb();
};

d3_Cielab.prototype.hsl = function() {
  return this.xyz().hsl();
};

d3_Cielab.prototype.xyz = function() {
  return d3_cielab_xyz(this.l, this.a, this.b);
};

d3_Cielab.prototype.toString = function() {
  return this.rgb().toString();
};

function d3_cielab_xyz(l, a, b) {
  var y = (l + 16) / 116;
  var x = a / 500 + y;
  var z = y - b / 200;

  function v(x) {
    var p = x * x * x;
    return p > 0.008856 ? p : (x - 16 / 116) / 7.787;
  }

  return d3_xyz(v(x) * 95.047, v(y) * 100.000, v(z) * 108.883);
}

