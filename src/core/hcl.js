d3.hcl = function(h, c, l) {
  return arguments.length === 1
      ? (h instanceof d3_Hcl ? d3_hcl(h.h, h.c, h.l)
      : (h instanceof d3_Lab ? d3_lab_hcl(h.l, h.a, h.b)
      : d3_lab_hcl((h = d3_rgb_lab((h = d3.rgb(h)).r, h.g, h.b)).l, h.a, h.b)))
      : d3_hcl(+h, +c, +l);
};

function d3_hcl(h, c, l) {
  return new d3_Hcl(h, c, l);
}

function d3_Hcl(h, c, l) {
  this.h = h;
  this.c = c;
  this.l = l;
}

d3_Hcl.prototype.brighter = function(k) {
  return d3_hcl(this.h, this.c, Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)));
};

d3_Hcl.prototype.darker = function(k) {
  return d3_hcl(this.h, this.c, Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)));
};

d3_Hcl.prototype.rgb = function() {
  return d3_hcl_lab(this.h, this.c, this.l).rgb();
};

d3_Hcl.prototype.toString = function() {
  return this.rgb() + "";
};

function d3_hcl_lab(h, c, l) {
  return d3_lab(l, Math.cos(h *= Math.PI / 180) * c, Math.sin(h) * c);
}
