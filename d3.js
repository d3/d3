if (!Date.now) Date.now = function() {
  return +new Date();
};
if (!Object.create) Object.create = function(o) {
  /** @constructor */ function f() {}
  f.prototype = o;
  return new f();
};
(function(_) {
  var d3 = _.d3 = {};
  d3.version = "0.1.0"; // semver
function d3_array(psuedoarray) {
  return Array.prototype.slice.call(psuedoarray);
}
function d3_blend(arrays) {
  return Array.prototype.concat.apply([], arrays);
}
/**
 * @param {number} start
 * @param {number=} stop
 * @param {number=} step
 */
d3.range = function(start, stop, step) {
  if (arguments.length == 1) { stop = start; start = 0; }
  if (step == null) step = 1;
  if ((stop - start) / step == Infinity) throw new Error("infinite range");
  var range = [],
       i = -1,
       j;
  if (step < 0) while ((j = start + step * ++i) > stop) range.push(j);
  else while ((j = start + step * ++i) < stop) range.push(j);
  return range;
};
d3.ns = {

  prefix: {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  },

  qualify: function(name) {
    var i = name.indexOf(":");
    return i < 0 ? name : {
      space: d3.ns.prefix[name.substring(0, i)],
      local: name.substring(i + 1)
    };
  }

};
/** @param {...string} types */
d3.dispatch = function(types) {
  var dispatch = {},
      type;
  for (var i = 0, n = arguments.length; i < n; i++) {
    type = arguments[i];
    dispatch[type] = d3_dispatch(type);
  }
  return dispatch;
};

function d3_dispatch(type) {
  var dispatch = {},
      listeners = [];

  dispatch.add = function(listener) {
    for (var i = 0; i < listeners.length; i++) {
      if (listeners[i].listener == listener) return dispatch; // already registered
    }
    listeners.push({listener: listener, on: true});
    return dispatch;
  };

  dispatch.remove = function(listener) {
    for (var i = 0; i < listeners.length; i++) {
      var l = listeners[i];
      if (l.listener == listener) {
        l.on = false;
        listeners = listeners.slice(0, i).concat(listeners.slice(i + 1));
        break;
      }
    }
    return dispatch;
  };

  dispatch.dispatch = function() {
    var ls = listeners; // defensive reference
    for (var i = 0, n = ls.length; i < n; i++) {
      var l = ls[i];
      if (l.on) l.listener.apply(this, arguments);
    }
  };

  return dispatch;
};
/*
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the author nor the names of contributors may be used to
 *   endorse or promote products derived from this software without specific
 *   prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

var quad = poly(2),
    cubic = poly(3);

var ease = {
  "linear": function() { return linear; },
  "poly": poly,
  "quad": function() { return quad; },
  "cubic": function() { return cubic; },
  "sin": function() { return sin; },
  "exp": function() { return exp; },
  "circle": function() { return circle; },
  "elastic": elastic,
  "back": back,
  "bounce": function() { return bounce; }
};

var mode = {
  "in": function(f) { return f; },
  "out": reverse,
  "in-out": reflect,
  "out-int": function(f) { return reflect(reverse(f)); }
};

d3.ease = function(name) {
  var i = name.indexOf("-"),
      t = i >= 0 ? name.substring(0, i) : name,
      m = i >= 0 ? name.substring(i + 1) : "in";
  return mode[m](ease[t].apply(null, Array.prototype.slice.call(arguments, 1)));
};

function reverse(f) {
  return function(t) {
    return 1 - f(1 - t);
  };
}

function reflect(f) {
  return function(t) {
    return .5 * (t < .5 ? f(2 * t) : (2 - f(2 - 2 * t)));
  };
}

function linear(t) {
  return t;
}

function poly(e) {
  return function(t) {
    return Math.pow(t, e);
  }
}

function sin(t) {
  return 1 - Math.cos(t * Math.PI / 2);
}

function exp(t) {
  return t ? Math.pow(2, 10 * (t - 1)) - 1e-3 : 0;
}

function circle(t) {
  return 1 - Math.sqrt(1 - t * t);
}

function elastic(a, p) {
  var s;
  if (arguments.length < 2) p = 0.45;
  if (arguments.length < 1) { a = 1; s = p / 4; }
  else s = p / (2 * Math.PI) * Math.asin(1 / a);
  return function(t) {
    return 1 + a * Math.pow(2, 10 * -t) * Math.sin(-(t + s) * 2 * Math.PI / p);
  };
}

function back(s) {
  if (!s) s = 1.70158;
  return function(t) {
    return t * t * ((s + 1) * t - s);
  };
}

function bounce(t) {
  return t < 1 / 2.75 ? 7.5625 * t * t
      : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75
      : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375
      : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
}
d3.event = null;
d3.interpolate = function(a, b) {
  if (typeof b == "number") return d3.interpolateNumber(+a, b);
  if (typeof b == "string") {
    return (b in d3_rgb_names) || /^(#|rgb\(|hsl\()/.test(b)
        ? d3.interpolateRgb(String(a), b)
        : d3.interpolateString(String(a), b);
  }
  if (b instanceof Array) return d3.interpolateArray(a, b);
  return d3.interpolateObject(a, b);
};

d3.interpolateNumber = function(a, b) {
  b -= a;
  return function(t) { return a + b * t; };
};

d3.interpolateString = function(a, b) {
  var m, // current match
      i, // current index
      j, // current index (for coallescing)
      s0 = 0, // start index of current string prefix
      s1 = 0, // end index of current string prefix
      s = [], // string constants and placeholders
      q = [], // number interpolators
      n, // q.length
      o;

  // Find all numbers in b.
  for (i = 0; m = d3_interpolate_number.exec(b); ++i) {
    if (m.index) s.push(b.substring(s0, s1 = m.index));
    q.push({i: s.length, x: m[0]});
    s.push(null);
    s0 = d3_interpolate_number.lastIndex;
  }
  if (s0 < b.length) s.push(b.substring(s0));

  // Find all numbers in a.
  for (i = 0, n = q.length; (m = d3_interpolate_number.exec(a)) && i < n; ++i) {
    o = q[i];
    if (o.x == m[0]) { // The numbers match, so coallesce.
      if (o.i) {
        if (s[o.i + 1] == null) { // This match is followed by another number.
          s[o.i - 1] += o.x;
          s.splice(o.i, 1);
          for (j = i + 1; j < n; ++j) q[j].i--;
        } else { // This match is followed by a string, so coallesce twice.
          s[o.i - 1] += o.x + s[o.i + 1];
          s.splice(o.i, 2);
          for (j = i + 1; j < n; ++j) q[j].i -= 2;
        }
      } else {
          if (s[o.i + 1] == null) { // This match is followed by another number.
          s[o.i] = o.x;
        } else { // This match is followed by a string, so coallesce twice.
          s[o.i] = o.x + s[o.i + 1];
          s.splice(o.i + 1, 1);
          for (j = i + 1; j < n; ++j) q[j].i--;
        }
      }
      q.splice(i, 1);
      n--;
      i--;
    } else {
      o.x = d3.interpolateNumber(parseFloat(m[0]), parseFloat(o.x));
    }
  }

  // Remove any numbers in b not found in a.
  while (i < n) {
    o = q.pop();
    if (s[o.i + 1] == null) { // This match is followed by another number.
      s[o.i] = o.x;
    } else { // This match is followed by a string, so coallesce twice.
      s[o.i] = o.x + s[o.i + 1];
      s.splice(o.i + 1, 1);
    }
    n--;
  }

  // Special optimization for only a single match.
  if (s.length == 1) {
    return s[0] == null ? q[0].x : function() { return b; };
  }

  // Otherwise, interpolate each of the numbers and rejoin the string.
  return function(t) {
    for (i = 0; i < n; ++i) s[(o = q[i]).i] = o.x(t);
    return s.join("");
  };
};

d3.interpolateRgb = function(a, b) {
  a = d3_rgb(a);
  b = d3_rgb(b);
  var ar = a.r,
      ag = a.g,
      ab = a.b,
      br = b.r - ar,
      bg = b.g - ag,
      bb = b.b - ab;
  return function(t) {
    return "rgb(" + Math.round(ar + br * t)
        + "," + Math.round(ag + bg * t)
        + "," + Math.round(ab + bb * t)
        + ")";
  };
};

d3.interpolateArray = function(a, b) {
  var x = [],
      c = [],
      na = a.length,
      nb = b.length,
      n0 = Math.min(a.length, b.length),
      i;
  for (i = 0; i < n0; ++i) x.push(d3.interpolate(a[i], b[i]));
  for (; i < na; ++i) c[i] = a[i];
  for (; i < nb; ++i) c[i] = b[i];
  return function(t) {
    for (i = 0; i < n0; ++i) c[i] = x[i](t);
    return c;
  };
};

d3.interpolateObject = function(a, b) {
  var i = {},
      c = {},
      k;
  for (k in a) {
    if (k in b) {
      i[k] = d3_interpolateByName(k)(a[k], b[k]);
    } else {
      c[k] = a[k];
    }
  }
  for (k in b) {
    if (!(k in a)) {
      c[k] = b[k];
    }
  }
  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}

var d3_interpolate_number = /[-+]?(?:\d+\.\d+|\d+\.|\.\d+|\d+)(?:[eE][-]?\d+)?/g,
    d3_interpolate_digits = /[-+]?\d*\.?\d*(?:[eE][-]?\d+)?(.*)/,
    d3_interpolate_rgb = {background: 1, fill: 1, stroke: 1};

function d3_interpolateByName(n) {
  return n in d3_interpolate_rgb || /\bcolor\b/.test(n)
      ? d3.interpolateRgb
      : d3.interpolate;
}
// TODO support namespaces for key?
function d3_join(key) {
  return {
    nodeKey: function(node) { return node.getAttribute(key); },
    dataKey: function(data) { return data[key]; }
  };
}
function d3_rgb(format) {
  var r, // red channel; int in [0, 255]
      g, // green channel; int in [0, 255]
      b, // blue channel; int in [0, 255]
      m1, // CSS color specification match
      m2, // CSS color specification type (e.g., rgb)
      name;

  /* Handle hsl, rgb. */
  m1 = /([a-z]+)\((.*)\)/i.exec(format);
  if (m1) {
    m2 = m1[2].split(",");
    switch (m1[1]) {
      case "hsl": {
        return d3_rgb_hsl(
          parseFloat(m2[0]), // degrees
          parseFloat(m2[1]) / 100, // percentage
          parseFloat(m2[2]) / 100); // percentage
      }
      case "rgb": {
        return {
          r: d3_rgb_parse(m2[0]),
          g: d3_rgb_parse(m2[1]),
          b: d3_rgb_parse(m2[2])
        };
      }
    }
  }

  /* Named colors. */
  if (name = d3_rgb_names[format]) return name;

  /* Null or undefined. */
  if (format == null) return d3_rgb_names.black;

  /* Hexadecimal colors: #rgb and #rrggbb. */
  if (format.charAt(0) == "#") {
    if (format.length == 4) {
      r = format.charAt(1); r += r;
      g = format.charAt(2); g += g;
      b = format.charAt(3); b += b;
    } else if (format.length == 7) {
      r = format.substring(1, 3);
      g = format.substring(3, 5);
      b = format.substring(5, 7);
    }
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
  }

  return {r: r, g: g, b: b};
};

function d3_rgb_hsl(h, s, l) {
  var m1,
      m2;

  /* Some simple corrections for h, s and l. */
  h = h % 360; if (h < 0) h += 360;
  s = s < 0 ? 0 : s > 1 ? 1 : s;
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

  return {r: vv(h + 120), g: vv(h), b: vv(h - 120)};
}

function d3_rgb_parse(c) { // either integer or percentage
  var f = parseFloat(c);
  return c.charAt(c.length - 1) == "%" ? Math.round(f * 2.55) : f;
}

var d3_rgb_names = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};

for (var x in d3_rgb_names) d3_rgb_names[x] = d3_rgb(d3_rgb_names[x]);
d3.hsl = function(h, s, l) {
  var c = d3_rgb_hsl(h, s, l);
  return "rgb(" + c.r + "," + c.g + "," + c.b +  ")";
};
d3.linear = function() {
  var x0 = 0,
      x1 = 1,
      y0 = 0,
      y1 = 1,
      k = 1 / (x1 - x0),
      i = d3.interpolate(y0, y1);

  function scale(x) {
    return i((x - x0) * k);
  }

  scale.invert = function(x) {
    return (x - y0) / k + x0; // TODO assumes number?
  };

  /** @param {*=} x */
  scale.domain = function(x) {
    if (!arguments.length) return [x0, x1];
    x0 = x[0];
    x1 = x[1];
    k = 1 / (x1 - x0);
    return scale;
  };

  /** @param {*=} x */
  scale.range = function(x) {
    if (!arguments.length) return [y0, y1];
    y0 = x[0];
    y1 = x[1];
    i = d3.interpolate(y0, y1); // TODO allow override?
    return scale;
  };

  // TODO Dates? Ugh.
  function tickRange(m) {
    var start = Math.min(x0, x1),
        stop = Math.max(x0, x1),
        span = stop - start,
        step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)),
        err = m / (span / step);

    // Filter ticks to get closer to the desired count.
    if (err <= .15) step *= 10;
    else if (err <= .35) step *= 5;
    else if (err <= .75) step *= 2;

    // Round start and stop values to step interval.
    return {
      start: Math.ceil(start / step) * step,
      stop: Math.floor(stop / step) * step + step * .5, // inclusive
      step: step
    };
  }

  scale.ticks = function(m) {
    var range = tickRange(m);
    return d3.range(range.start, range.stop, range.step);
  };

  scale.tickFormat = function(m) {
    var n = Math.max(0, -Math.floor(Math.log(tickRange(m).step) / Math.LN10 + .01));
    return function(d) { return d.toFixed(n); };
  };

  return scale;
};
d3.log = function() {
  var linear = d3.linear();

  function scale(x) {
    return linear(Math.log(x));
  }

  scale.invert = function(x) {
    return Math.exp(linear.invert(x));
  };

  /** @param {*=} x */
  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(Math.exp);
    linear.domain(x.map(Math.log));
    return scale;
  };

  scale.range = function() {
    var x = linear.range.apply(linear, arguments);
    return arguments.length ? scale : x;
  };

  return scale;
};
d3.pow = function() {
  var linear = d3.linear(),
      p = 1,
      b = 1 / p;

  function powp(x) {
    return Math.pow(x, p);
  }

  function powb(x) {
    return Math.pow(x, b);
  }

  function scale(x) {
    return linear(powp(x));
  }

  scale.invert = function(x) {
    return powb(linear.invert(x));
  };

  /** @param {*=} x */
  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(powb);
    linear.domain(x.map(powp));
    return scale;
  };

  scale.range = function() {
    var x = linear.range.apply(linear, arguments);
    return arguments.length ? scale : x;
  };

  scale.exponent = function(x) {
    if (!arguments.length) return p;
    var domain = scale.domain();
    p = x;
    b = 1 / x;
    return scale.domain(domain);
  };

  return scale;
};
d3.sqrt = function() {
  return d3.pow().exponent(.5);
};
d3.ordinal = function() {
  var domain = [],
      index = {},
      range = [],
      rangeBand = 0;

  function scale(x) {
    var i = x in index ? index[x] : (index[x] = domain.push(x) - 1);
    return range[i % range.length];
  }

  scale.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x;
    index = {};
    var i = -1, j = -1, n = domain.length; while (++i < n) {
      x = domain[i];
      if (!(x in index)) index[x] = ++j;
    }
    return scale;
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    return scale;
  };

  scale.rangePoints = function(x, padding) {
    if (arguments.length < 2) padding = 0;
    var start = x[0],
        stop = x[1],
        step = (stop - start) / (domain.length - 1 + padding);
    range = domain.length == 1
        ? [(start + stop) / 2]
        : d3.range(start + step * padding / 2, stop + step / 2, step);
    rangeBand = 0;
    return scale;
  };

  scale.rangeBands = function(x, padding) {
    if (arguments.length < 2) padding = 0;
    var start = x[0],
        stop = x[1],
        step = (stop - start) / (domain.length + padding);
    range = d3.range(start + step * padding, stop, step);
    rangeBand = step * (1 - padding);
    return scale;
  };

  scale.rangeBand = function() {
    return rangeBand;
  };

  return scale;
};
var d3_root = d3_selection([[document]]);
// TODO fast singleton implementation!
d3.select = function(query) {
  return typeof query == "string"
      ? d3_root.select(query)
      : d3_selection([[query]]); // assume node
};
d3.selectAll = function(query) {
  return typeof query == "string"
      ? d3_root.selectAll(query)
      : d3_selection([d3_array(query)]); // assume node[]
};
function d3_selection(groups) {
  var i = -1,
      n = groups.length,
      group;

  function select(select) {
    var subgroups = [],
        subgroup,
        subnode,
        group,
        node;
    for (var j = 0, m = groups.length; j < m; j++) {
      group = groups[j];
      subgroups.push(subgroup = []);
      subgroup.parentNode = group.parentNode;
      subgroup.parentData = group.parentData;
      for (var i = 0, n = group.length; i < n; i++) {
        if (node = group[i]) {
          subgroup.push(subnode = select(node));
          if (subnode) subnode.__data__ = node.__data__;
        } else {
          subgroup.push(null);
        }
      }
    }
    return d3_selection(subgroups);
  }

  function selectAll(selectAll) {
    var subgroups = [],
        subgroup,
        group,
        node;
    for (var j = 0, m = groups.length; j < m; j++) {
      group = groups[j];
      for (var i = 0, n = group.length; i < n; i++) {
        if (node = group[i]) {
          subgroups.push(subgroup = selectAll(node));
          subgroup.parentNode = node;
          subgroup.parentData = node.__data__;
        }
      }
    }
    return d3_selection(subgroups);
  }

  // TODO select(function)?
  groups.select = function(query) {
    return select(function(node) {
      return node.querySelector(query);
    });
  };

  // TODO selectAll(function)?
  groups.selectAll = function(query) {
    return selectAll(function(node) {
      return d3_array(node.querySelectorAll(query));
    });
  };

  // TODO data(null) for clearing data?
  groups.data = function(data, join) {
    var i = -1,
        n = groups.length,
        group,
        enter = [],
        update = [],
        exit = [];

    if (typeof join == "string") join = d3_join(join);

    function bind(group, groupData) {
      var i = 0,
          n = group.length,
          m = groupData.length,
          n0 = Math.min(n, m),
          n1 = Math.max(n, m),
          updateNodes = [],
          enterNodes = [],
          exitNodes = [],
          node,
          nodeData;

      function enterAppend(e) {
        return group.parentNode.appendChild(e);
      }

      if (join) {
        var nodeByKey = {},
            exitData = [],
            keys = [],
            key;

        for (i = 0; i < n; i++) {
          nodeByKey[key = join.nodeKey(node = group[i])] = node;
          keys.push(key);
        }

        for (i = 0; i < m; i++) {
          node = nodeByKey[key = join.dataKey(nodeData = groupData[i])];
          if (node) {
            node.__data__ = nodeData;
            updateNodes[i] = node;
            enterNodes[i] = exitNodes[i] = null;
          } else {
            enterNodes[i] = {appendChild: enterAppend, __data__: nodeData},
            updateNodes[i] = exitNodes[i] = null;
          }
          delete nodeByKey[key];
        }

        for (i = 0; i < n; i++) {
          if (keys[i] in nodeByKey) {
            exitNodes[i] = group[i];
          }
        }
      } else {
        for (; i < n0; i++) {
          node = group[i];
          nodeData = groupData[i];
          if (node) {
            node.__data__ = nodeData;
            updateNodes[i] = node;
            enterNodes[i] = exitNodes[i] = null;
          } else {
            enterNodes[i] = {appendChild: enterAppend, __data__: nodeData};
            updateNodes[i] = exitNodes[i] = null;
          }
        }
        for (; i < m; i++) {
          enterNodes[i] = {appendChild: enterAppend, __data__: groupData[i]};
          updateNodes[i] = exitNodes[i] = null;
        }
        for (; i < n1; i++) {
          exitNodes[i] = group[i];
          enterNodes[i] = updateNodes[i] = null;
        }
      }

      enter.push(enterNodes);
      update.push(updateNodes);
      exit.push(exitNodes);
    }

    if (typeof data == "function") {
      while (++i < n) {
        bind(group = groups[i], data.call(group, group.parentData, i));
      }
    } else {
      while (++i < n) {
        bind(group = groups[i], data);
      }
    }

    var selection = d3_selection(update);
    selection.enter = function(name) {
      return d3_selection(enter).append(name);
    };
    selection.exit = function() {
      return d3_selection(exit);
    };
    return selection;
  };

  // TODO mask forEach? or rename for eachData?
  // TODO offer the same semantics for map, reduce, etc.?
  groups.each = function(callback) {
    for (var j = 0, m = groups.length; j < m; j++) {
      var group = groups[j];
      for (var i = 0, n = group.length; i < n; i++) {
        var node = group[i];
        if (node) callback.call(node, node.__data__, i);
      }
    }
    return groups;
  };

  function first(callback) {
    for (var j = 0, m = groups.length; j < m; j++) {
      var group = groups[j];
      for (var i = 0, n = group.length; i < n; i++) {
        var node = group[i];
        if (node) return callback.call(node, node.__data__, i);
      }
    }
    return null;
  }

  groups.attr = function(name, value) {
    name = d3.ns.qualify(name);

    // If no value is specified, return the first value.
    if (arguments.length < 2) {
      return first(name.local
          ? function() { return this.getAttributeNS(name.space, name.local); }
          : function() { return this.getAttribute(name); });
    }

    function attrNull() {
      this.removeAttribute(name);
    }

    function attrNullNS() {
      this.removeAttributeNS(name.space, name.local);
    }

    function attrConstant() {
      this.setAttribute(name, value);
    }

    function attrConstantNS() {
      this.setAttributeNS(name.space, name.local, value);
    }

    function attrFunction() {
      var x = value.apply(this, arguments);
      if (x == null) this.removeAttribute(name);
      else this.setAttribute(name, x);
    }

    function attrFunctionNS() {
      var x = value.apply(this, arguments);
      if (x == null) this.removeAttributeNS(name.space, name.local);
      else this.setAttributeNS(name.space, name.local, x);
    }

    return groups.each(value == null
        ? (name.local ? attrNullNS : attrNull) : (typeof value == "function"
        ? (name.local ? attrFunctionNS : attrFunction)
        : (name.local ? attrConstantNS : attrConstant)));
  };

  groups.style = function(name, value, priority) {
    if (arguments.length < 3) priority = null;

    // If no value is specified, return the first value.
    if (arguments.length < 2) {
      return first(function() {
        return window.getComputedStyle(this, null).getPropertyValue(name);
      });
    }

    function styleNull() {
      this.style.removeProperty(name);
    }

    function styleConstant() {
      this.style.setProperty(name, value, priority);
    }

    function styleFunction() {
      var x = value.apply(this, arguments);
      if (x == null) this.style.removeProperty(name);
      else this.style.setProperty(name, x, priority);
    }

    return groups.each(value == null
        ? styleNull : (typeof value == "function"
        ? styleFunction : styleConstant));
  };

  groups.text = function(value) {

    // If no value is specified, return the first value.
    if (arguments.length < 1) {
      return first(function() {
        return this.textContent;
      });
    }

    function textNull() {
      while (this.lastChild) this.removeChild(this.lastChild);
    }

    function textConstant() {
      this.appendChild(document.createTextNode(value));
    }

    function textFunction() {
      var x = value.apply(this, arguments);
      if (x != null) this.appendChild(document.createTextNode(x));
    }

    groups.each(textNull);
    return value == null ? groups
        : groups.each(typeof value == "function"
        ? textFunction : textConstant);
  };

  groups.html = function(value) {

    // If no value is specified, return the first value.
    if (arguments.length < 1) {
      return first(function() {
        return this.innerHTML;
      });
    }

    function htmlConstant() {
      this.innerHTML = value;
    }

    function htmlFunction() {
      this.innerHTML = value.apply(this, arguments);
    }

    return groups.each(typeof value == "function"
        ? htmlFunction : htmlConstant);
  };

  // TODO append(node)?
  // TODO append(function)?
  groups.append = function(name) {
    name = d3.ns.qualify(name);

    function append(node) {
      return node.appendChild(document.createElement(name));
    }

    function appendNS(node) {
      return node.appendChild(document.createElementNS(name.space, name.local));
    }

    return select(name.local ? appendNS : append);
  };

  // TODO remove(query)?
  // TODO remove(node)?
  // TODO remove(function)?
  groups.remove = function() {
    return select(function(node) {
      var parent = node.parentNode;
      parent.removeChild(node);
      return parent;
    });
  };

  // TODO namespaced event listeners to allow multiples
  groups.on = function(type, listener) {
    type = "on" + type;
    return groups.each(function(d, i) {
      this[type] = function(e) {
        d3.event = e;
        try {
          listener.call(this, d, i);
        } finally {
          d3.event = null;
        }
      };
    });
  };

  // TODO filter, slice?

  groups.transition = function() {
    return d3_transition(groups);
  };

  return groups;
}
d3.transition = function() {
  return d3_root.transition();
};

// TODO namespace transitions; cancel collisions
// TODO easing
function d3_transition(groups) {
  var transition = {},
      tweens = {},
      timeout = setTimeout(start, 1),
      interval,
      then = Date.now(),
      event = d3.dispatch("start", "end"),
      stage = [],
      delay = [],
      duration = [],
      durationMax,
      ease = d3.ease("cubic-in-out");

  function start() {
    interval = setInterval(step, 24);
  }

  function step() {
    var elapsed = Date.now() - then,
        clear = true,
        k = -1;
    groups.each(function(d, i) {
      if (stage[++k] == 2) return; // ended
      var t = (elapsed - delay[k]) / duration[k];
      if (t >= 1) {
        t = 1;
      } else {
        clear = false;
        if (t < 0) return;
        if (!stage[k]) {
          stage[k] = 1;
          event.start.dispatch.apply(this, arguments);
        }
      }
      var te = ease(t);
      for (var key in tweens) tweens[key].call(this, te, k);
      if (t == 1) {
        stage[k] = 2;
        event.end.dispatch.apply(this, arguments);
      }
    });
    if (clear) clearInterval(interval);
  }

  transition.delay = function(value) {
    var delayMin = Infinity,
        k = -1;
    if (typeof value == "function") {
      groups.each(function(d, i) {
        var x = delay[++k] = +value.apply(this, arguments);
        if (x < delayMin) delayMin = x;
      });
    } else {
      delayMin = +value;
      groups.each(function(d, i) {
        delay[++k] = delayMin;
      });
    }
    clearTimeout(timeout);
    timeout = setTimeout(start, delayMin);
    return transition;
  };

  transition.duration = function(value) {
    var k = -1;
    if (typeof value == "function") {
      durationMax = 0;
      groups.each(function(d, i) {
        var x = duration[++k] = +value.apply(this, arguments);
        if (x > durationMax) durationMax = x;
      });
    } else {
      durationMax = +value;
      groups.each(function(d, i) {
        duration[++k] = durationMax;
      });
    }
    return transition;
  };

  transition.ease = function(value) {
    ease = typeof value == "string" ? d3.ease(value) : value;
    return transition;
  };

  transition.attrTween = function(name, tween) {
    var interpolators = [],
        k = -1;

    function attrInterpolator(d, i) {
      interpolators[++k] = tween.call(this, d, i,
          this.getAttribute(name));
    }

    function attrInterpolatorNS(d, i) {
      interpolators[++k] = tween.call(this, d, i,
          this.getAttributeNS(name.space, name.local));
    }

    function attrTween(t, k) {
      this.setAttribute(name, interpolators[k](t));
    }

    function attrTweenNS(t, k) {
      this.setAttributeNS(name.space, name.local, interpolators[k](t));
    }

    name = d3.ns.qualify(name);
    groups.each(name.local ? attrInterpolatorNS : attrInterpolator);
    tweens["attr." + name] = name.local ? attrTweenNS : attrTween;
    return transition;
  };

  transition.attr = function(name, value) {
    return transition.attrTween(name, d3_tween(value));
  };

  transition.styleTween = function(name, tween, priority) {
    var interpolators = [],
        k = -1;

    function styleInterpolator(d, i) {
      interpolators[++k] = tween.call(this, d, i,
          window.getComputedStyle(this, null).getPropertyValue(name));
    }

    function styleTween(t, k) {
      this.style.setProperty(name, interpolators[k](t), priority);
    }

    groups.each(styleInterpolator);
    tweens["style." + name] = styleTween;
    return transition;
  };

  transition.style = function(name, value, priority) {
    return transition.styleTween(name, d3_tween(value), priority);
  };

  transition.select = function(query) {
    var k, t = d3_transition(groups.select(query)).ease(ease);
    k = -1; t.delay(function(d, i) { return delay[++k]; });
    k = -1; t.duration(function(d, i) { return duration[++k]; });
    return t;
  };

  transition.selectAll = function(query) {
    var k, t = d3_transition(groups.selectAll(query)).ease(ease);
    k = -1; t.delay(function(d, i) { return delay[i ? k : ++k]; })
    k = -1; t.duration(function(d, i) { return duration[i ? k : ++k]; });
    return t;
  };

  transition.each = function(type, listener) {
    event[type].add(listener);
    return transition;
  };

  return transition.delay(0).duration(250);
}
function d3_tween(b) {
  return typeof b == "function"
    ? function(d, i, a) { return d3.interpolate(a, b.call(this, d, i)); }
    : function(d, i, a) { return d3.interpolate(a, b); };
}
})(this);
