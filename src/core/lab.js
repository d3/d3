d3.lab = function(l, a, b) {
  return arguments.length === 1
      ? (l instanceof d3_Lab ? d3_lab(l.l, l.a, l.b)
      : d3_rgb_parse("" + l, d3_rgb, d3_hsl_rgb).lab())
      : d3_lab(+l, +a, +b);
};

function d3_lab(l, a, b) {
  return new d3_Lab(l, a, b);
}

function d3_Lab(l, a, b) {
  this.l = l;
  this.a = a;
  this.b = b;
}

d3_Lab.prototype.rgb = function() {
  return d3_lab_rgb(this.l, this.a, this.b);
};

d3_Lab.prototype.cielch = function() {
  return d3_lab_cielch(this.l, this.a, this.b);
};

/* 18 chosen to correspond roughly to RGB brighter/darker */
d3_Lab.prototype.brighter = function(k) {
  return d3_lab(Math.min(100, this.l + 18 * (arguments.length ? k : 1)), this.a, this.b);
};

d3_Lab.prototype.darker = function(k) {
  return d3_lab(Math.max(0, this.l - 18 * (arguments.length ? k : 1)), this.a, this.b);
};

d3_Lab.prototype.hue = function(h) {
  var a = this.a;
  var b = this.b;

  if (arguments.length) {
    return d3_lab_lch(this.l, this.chroma(), h)
  }

  var h = Math.atan2(b, a);

  return h > 0 ? (h / Math.PI) * 180 : 360 - (Math.abs(h) / Math.PI) * 180;
}

d3_Lab.prototype.chroma = function(c) {
  var a = this.a;
  var b = this.b;

  if (arguments.length) {
    return d3_lab_lch(this.l, c, this.hue())
  }

  return Math.sqrt(a * a + b * b);
}

d3_Lab.prototype.toString = function() {
  return this.rgb().toString();
};

function d3_lab_rgb(l, a, b) {
  var y = (l + 16) / 116;
  var x = a / 500 + y;
  var z = y - b / 200;

  function v(x) {
    var p = x * x * x;
    return p > 0.008856 ? p : (x - 16 / 116) / 7.787;
  }

  var x = v(x) * 0.95047;
  var y = v(y);
  var z = v(z) * 1.08883;

  var r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  var g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  var b = x * 0.0557 + y * -0.2040 + z * 1.0570;

  function w(r) {
    r = r > 0.0031308 ? 1.055 * Math.pow(r, (1 / 2.4)) - 0.055 : 12.92 * r;
    return Math.round(r * 255)
  }

  return d3_rgb(w(r), w(g), w(b));
}

function d3_lab_lch(l, c, h) {
  var hr = h * (Math.PI / 180);
  var a = Math.cos(hr) * c;
  var b = Math.sin(hr) * c;
  return d3_lab(l, a, b);
}

