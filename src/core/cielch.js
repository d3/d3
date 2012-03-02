d3.cielch = function(l, c, h) {
  return arguments.length === 1
      ? (l instanceof d3_Cielch ? d3_cielch(l.l, l.c, l.h)
      : d3_rgb_parse("" + l, d3_rgb_xyz, d3_hsl_xyz).cielch())
      : d3_cielch(+l, +c, +h);
};

function d3_cielch(l, c, h) {
  return new d3_Cielch(l, c, h);
}

function d3_Cielch(l, c, h) {
  this.l = l;
  this.c = c;
  this.h = h;
}

d3_Cielch.prototype.rgb = function() {
  return this.cielab().rgb();
};

d3_Cielch.prototype.hsl = function() {
  return this.cielab().hsl();
};

d3_Cielch.prototype.xyz = function() {
  return this.cielab().xyz();
};

d3_Cielch.prototype.brighter = function(k) {
  return d3_cielch(Math.min(100, this.l + 18 * (arguments.length ? k : 1)), this.c, this.h);
};

d3_Cielch.prototype.darker = function(k) {
  return d3_cielch(Math.max(0, this.l - 18 * (arguments.length ? k : 1)), this.c, this.h);
};

d3_Cielch.prototype.toString = function() {
  return this.rgb().toString();
};


