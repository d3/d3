import "../math/trigonometry";
import "color";
import "hcl";
import "rgb";

d3.lab = d3_lab;

function d3_lab(lightness, a, b) {
  return this instanceof d3_lab ? void (this.l = +lightness, this.a = +a, this.b = +b)
      : arguments.length < 2 ? (lightness instanceof d3_lab ? new d3_lab(lightness.l, lightness.a, lightness.b)
      : (lightness instanceof d3_hcl ? d3_hcl_lab(lightness.h, lightness.c, lightness.l)
      : d3_rgb_lab((lightness = d3_rgb(lightness)).r, lightness.g, lightness.b)))
      : new d3_lab(lightness, a, b);
}

// Corresponds roughly to RGB brighter/darker
var d3_lab_K = 18;

// D65 standard referent
var d3_lab_X = 0.950470,
    d3_lab_Y = 1,
    d3_lab_Z = 1.088830;

var d3_labPrototype = d3_lab.prototype = new d3_color;

d3_labPrototype.brighter = function(gammaFactor) {
  return new d3_lab(Math.min(100, this.l + d3_lab_K * (arguments.length ? gammaFactor : 1)), this.a, this.b);
};

d3_labPrototype.darker = function(gammaFactor) {
  return new d3_lab(Math.max(0, this.l - d3_lab_K * (arguments.length ? gammaFactor : 1)), this.a, this.b);
};

d3_labPrototype.rgb = function() {
  return d3_lab_rgb(this.l, this.a, this.b);
};

function d3_lab_rgb(lightness, a, b) {
  var y = (lightness + 16) / 116,
      x = y + a / 500,
      z = y - b / 200;
  x = d3_lab_xyz(x) * d3_lab_X;
  y = d3_lab_xyz(y) * d3_lab_Y;
  z = d3_lab_xyz(z) * d3_lab_Z;
  return new d3_rgb(
    d3_xyz_rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z),
    d3_xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
    d3_xyz_rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z)
  );
}

function d3_lab_hcl(lightness, a, b) {
  return lightness > 0
      ? new d3_hcl(Math.atan2(b, a) * d3_degrees, Math.sqrt(a * a + b * b), lightness)
      : new d3_hcl(NaN, NaN, lightness);
}

function d3_lab_xyz(x) {
  return x > 0.206893034 ? x * x * x : (x - 4 / 29) / 7.787037;
}
