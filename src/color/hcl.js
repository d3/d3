import "../math/trigonometry";
import "color";
import "lab";
import "rgb";

d3.hcl = d3_hcl;

function d3_hcl(hue, color, luminance) {
  return this instanceof d3_hcl ? void (this.h = +hue, this.c = +color, this.l = +luminance)
      : arguments.length < 2 ? (hue instanceof d3_hcl ? new d3_hcl(hue.h, hue.c, hue.l)
      : (hue instanceof d3_lab ? d3_lab_hcl(hue.l, hue.a, hue.b)
      : d3_lab_hcl((hue = d3_rgb_lab((hue = d3.rgb(hue)).r, hue.g, hue.b)).l, hue.a, hue.b)))
      : new d3_hcl(hue, color, luminance);
}

var d3_hclPrototype = d3_hcl.prototype = new d3_color;

d3_hclPrototype.brighter = function(gammaFactor) {
  return new d3_hcl(this.h, this.c, Math.min(100, this.l + d3_lab_K * (arguments.length ? gammaFactor : 1)));
};

d3_hclPrototype.darker = function(gammaFactor) {
  return new d3_hcl(this.h, this.c, Math.max(0, this.l - d3_lab_K * (arguments.length ? gammaFactor : 1)));
};

d3_hclPrototype.rgb = function() {
  return d3_hcl_lab(this.h, this.c, this.l).rgb();
};

function d3_hcl_lab(hue, color, luminance) {
  if (isNaN(hue)) hue = 0;
  if (isNaN(color)) color = 0;
  return new d3_lab(luminance, Math.cos(hue *= d3_radians) * color, Math.sin(hue) * color);
}
