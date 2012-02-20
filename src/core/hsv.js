d3.hsv = function(h, s, v) {
  return arguments.length === 1
      ? (h instanceof d3_Hsv ? d3_hsv(h.h, h.s, h.v)
      : d3_rgb_parse("" + h, d3_rgb_hsv, d3_hsl_hsv, d3_hsv))
      : d3_hsv(+h, +s, +v);
};

function d3_hsv(h, s, v) {
  return new d3_Hsv(h, s, v);
};

function d3_Hsv(h, s, v) {
  this.h = h;
  this.s = s;
  this.v = v;
}

d3_Hsv.prototype.rgb = function() {
  return d3_hsv_rgb(this.h, this.s, this.v);
};

d3_Hsv.prototype.toString = function() {
  return this.rgb().toString();
};

function d3_hsv_rgb(h, s, v) {
  var r, g, b;
  h /= 360;

  if (s === 0.0) {
    r = g = b = v;
  }
  else {
    var i = ~~(h * 6.0);
    var f = h * 6.0 - i;
    var p = v * (1.0 - s);
    var q = v * (1.0 - s * f);
    var t = v * (1.0 - s * (1.0 - f));
    i = i % 6;
    switch (i % 6) {
      case 0: {
        r = v;
        g = t;
        b = p;
        break;
      }
      case 1: {
        r = q;
        g = v;
        b = p;
        break;
      }
      case 2: {
        r = p;
        g = v;
        b = t;
        break;
      }
      case 3: {
        r = p;
        g = q;
        b = v;
        break;
      }
      case 4: {
        r = t;
        g = p;
        b = v;
        break;
      }
      case 5: {
        r = v;
        g = p;
        b = q;
        break;
      }
    }
  }

  function vv(h) {
    return Math.round(h * 255);
  }

  return d3_rgb(vv(r), vv(g), vv(b));
}

function d3_hsv_hsl(h, s, v) {
  return d3.hsl(d3_hsv(h, s, v).rgb());
}