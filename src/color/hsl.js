import "color";
import "rgb";

d3.hsl = d3_hsl;

function d3_hsl(h, s, l) {
  return this instanceof d3_hsl ? void (this.h = +h, this.s = +s, this.l = +l)
      : arguments.length < 2 ? (h instanceof d3_hsl ? new d3_hsl(h.h, h.s, h.l)
      : d3_rgb_parse("" + h, d3_rgb_hsl, d3_hsl))
      : new d3_hsl(h, s, l);
}

var d3_hslPrototype = d3_hsl.prototype = new d3_color;

d3_hslPrototype.brighter = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  return new d3_hsl(this.h, this.s, this.l / k);
};

d3_hslPrototype.darker = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  return new d3_hsl(this.h, this.s, k * this.l);
};

d3_hslPrototype.rgb = function() {
  return d3_hsl_rgb(this.h, this.s, this.l);
};

function d3_hsl_rgb(h, s, l) {
  var m1,
      m2;

  /* Some simple corrections for h, s and l. */
  h = isNaN(h) ? 0 : (h %= 360) < 0 ? h + 360 : h;
  s = isNaN(s) ? 0 : s < 0 ? 0 : s > 1 ? 1 : s;
  l = l < 0 ? 0 : l > 1 ? 1 : l;

  /* From FvD 13.37, CSS Color Module Level 3 */
  m2 = l <= .5 ? l * (1 + s) : l + s - l * s;
  m1 = 2 * l - m2;

  function v(h) {
    if (h > 360) h -= 360;
    else if (h < 0) h += 360;
    if (h < 60) return m1 + (m2 - m1) * h / 60;
    if (h < 180) return m2;
    if (h < 240) return m1 + (m2 - m1) * (240 - h) / 60;
    return m1;
  }

  function vv(h) {
    return Math.round(v(h) * 255);
  }

  return new d3_rgb(vv(h + 120), vv(h), vv(h - 120));
}
