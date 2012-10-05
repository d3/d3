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

var d3_hclPrototype = d3_Hcl.prototype = new d3_Color;

d3_hclPrototype.brighter = function(k) {
  return d3_hcl(this.h, this.c, Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)));
};

d3_hclPrototype.darker = function(k) {
  return d3_hcl(this.h, this.c, Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)));
};

d3_hclPrototype.rgb = function() {
  return d3_hcl_lab(this.h, this.c, this.l).rgb();
};

function d3_hcl_lab(h, c, l) {
  return d3_lab(l, Math.cos(h *= d3_radians) * c, Math.sin(h) * c);
}
