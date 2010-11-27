d3 = {version: "0.22.0"}; // semver
if (!Date.now) Date.now = function() {
  return +new Date();
};
if (!Object.create) Object.create = function(o) {
  /** @constructor */ function f() {}
  f.prototype = o;
  return new f();
};
function d3_array(psuedoarray) {
  return Array.prototype.slice.call(psuedoarray);
}
function d3_blend(arrays) {
  return Array.prototype.concat.apply([], arrays);
}
function d3_call(callback, var_args) {
  var_args = d3_array(arguments);
  var_args[0] = this;
  callback.apply(this, var_args);
  return this;
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
d3.text = function(url, mime, callback) {
  var req = new XMLHttpRequest();
  if (arguments.length == 3) req.overrideMimeType(mime);
  else callback = mime;
  req.open("GET", url, true);
  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      callback(req.status < 300 && req.responseText
          ? req.responseText
          : null);
    }
  };
  req.send(null);
};
d3.json = function(url, callback) {
  return d3.text(url, "application/json", function(text) {
    callback(text && JSON.parse(text));
  });
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
// TODO align, sign, type
d3.format = function(specifier) {
  var match = d3_format_re.exec(specifier),
      fill = match[1] || " ",
      zfill = match[5],
      width = +match[6],
      comma = match[7],
      precision = match[8],
      type = match[9];
  if (precision) precision = precision.substring(1);
  if (zfill) fill = "0"; // TODO align = "=";
  if (type == "d") precision = "0";
  return function(value) {
    if ((type == "d") && (value % 1)) return "";
    if (precision) value = (+value).toFixed(precision);
    else value += "";
    if (comma) {
      var i = value.lastIndexOf("."),
          f = i >= 0 ? value.substring(i) : (i = value.length, ""),
          t = [];
      while (i > 0) t.push(value.substring(i -= 3, i + 3));
      value = t.reverse().join(",") + f;
    }
    var n = value.length;
    if (n < width) value = new Array(width - n + 1).join(fill) + value;
    return value;
  };
};

// [[fill]align][sign][#][0][width][,][.precision][type]
var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/;
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

var d3_ease_quad = d3_ease_poly(2),
    d3_ease_cubic = d3_ease_poly(3);

var d3_ease = {
  "linear": function() { return d3_ease_linear; },
  "poly": d3_ease_poly,
  "quad": function() { return d3_ease_quad; },
  "cubic": function() { return d3_ease_cubic; },
  "sin": function() { return d3_ease_sin; },
  "exp": function() { return d3_ease_exp; },
  "circle": function() { return d3_ease_circle; },
  "elastic": d3_ease_elastic,
  "back": d3_ease_back,
  "bounce": function() { return d3_ease_bounce; }
};

var d3_ease_mode = {
  "in": function(f) { return f; },
  "out": d3_ease_reverse,
  "in-out": d3_ease_reflect,
  "out-in": function(f) { return d3_ease_reflect(d3_ease_reverse(f)); }
};

d3.ease = function(name) {
  var i = name.indexOf("-"),
      t = i >= 0 ? name.substring(0, i) : name,
      m = i >= 0 ? name.substring(i + 1) : "in";
  return d3_ease_mode[m](d3_ease[t].apply(null, Array.prototype.slice.call(arguments, 1)));
};

function d3_ease_reverse(f) {
  return function(t) {
    return 1 - f(1 - t);
  };
}

function d3_ease_reflect(f) {
  return function(t) {
    return .5 * (t < .5 ? f(2 * t) : (2 - f(2 - 2 * t)));
  };
}

function d3_ease_linear(t) {
  return t;
}

function d3_ease_poly(e) {
  return function(t) {
    return Math.pow(t, e);
  }
}

function d3_ease_sin(t) {
  return 1 - Math.cos(t * Math.PI / 2);
}

function d3_ease_exp(t) {
  return t ? Math.pow(2, 10 * (t - 1)) - 1e-3 : 0;
}

function d3_ease_circle(t) {
  return 1 - Math.sqrt(1 - t * t);
}

function d3_ease_elastic(a, p) {
  var s;
  if (arguments.length < 2) p = 0.45;
  if (arguments.length < 1) { a = 1; s = p / 4; }
  else s = p / (2 * Math.PI) * Math.asin(1 / a);
  return function(t) {
    return 1 + a * Math.pow(2, 10 * -t) * Math.sin((t - s) * 2 * Math.PI / p);
  };
}

function d3_ease_back(s) {
  if (!s) s = 1.70158;
  return function(t) {
    return t * t * ((s + 1) * t - s);
  };
}

function d3_ease_bounce(t) {
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
  a = d3.rgb(a);
  b = d3.rgb(b);
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
/**
 * @param {number=} g
 * @param {number=} b
 */
d3.rgb = function(r, g, b) {
  return arguments.length == 1
      ? d3_rgb_parse("" + r, d3_rgb, d3_hsl_rgb)
      : d3_rgb(~~r, ~~g, ~~b);
};

function d3_rgb(r, g, b) {
  return {r: r, g: g, b: b, toString: d3_rgb_format};
}

/** @this d3_rgb */
function d3_rgb_format() {
  return "#" + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b);
}

function d3_rgb_hex(v) {
  return v < 0x10 ? "0" + v.toString(16) : v.toString(16);
}

function d3_rgb_parse(format, rgb, hsl) {
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
        return hsl(
          parseFloat(m2[0]), // degrees
          parseFloat(m2[1]) / 100, // percentage
          parseFloat(m2[2]) / 100 // percentage
        );
      }
      case "rgb": {
        return rgb(
          d3_rgb_parseNumber(m2[0]),
          d3_rgb_parseNumber(m2[1]),
          d3_rgb_parseNumber(m2[2])
        );
      }
    }
  }

  /* Named colors. */
  if (name = d3_rgb_names[format]) return rgb(name.r, name.g, name.b);

  /* Null or undefined. */
  if (format == null) return rgb(0, 0, 0);

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

  return rgb(r, g, b);
}

function d3_rgb_hsl(r, g, b) {
  var min = Math.min(r /= 255, g /= 255, b /= 255),
      max = Math.max(r, g, b),
      d = max - min,
      h,
      s,
      l = (max + min) / 2;
  if (d) {
    s = l < .5 ? d / (max + min) : d / (2 - max - min);
    if (r == max) h = (g - b) / d + (g < b ? 6 : 0);
    else if (g == max) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  } else {
    s = h = 0;
  }
  return d3_hsl(h, s, l);
}

function d3_rgb_parseNumber(c) { // either integer or percentage
  var f = parseFloat(c);
  return c.charAt(c.length - 1) == "%" ? Math.round(f * 2.55) : f;
}

var d3_rgb_names = {
  "aliceblue": "#f0f8ff",
  "antiquewhite": "#faebd7",
  "aqua": "#00ffff",
  "aquamarine": "#7fffd4",
  "azure": "#f0ffff",
  "beige": "#f5f5dc",
  "bisque": "#ffe4c4",
  "black": "#000000",
  "blanchedalmond": "#ffebcd",
  "blue": "#0000ff",
  "blueviolet": "#8a2be2",
  "brown": "#a52a2a",
  "burlywood": "#deb887",
  "cadetblue": "#5f9ea0",
  "chartreuse": "#7fff00",
  "chocolate": "#d2691e",
  "coral": "#ff7f50",
  "cornflowerblue": "#6495ed",
  "cornsilk": "#fff8dc",
  "crimson": "#dc143c",
  "cyan": "#00ffff",
  "darkblue": "#00008b",
  "darkcyan": "#008b8b",
  "darkgoldenrod": "#b8860b",
  "darkgray": "#a9a9a9",
  "darkgreen": "#006400",
  "darkgrey": "#a9a9a9",
  "darkkhaki": "#bdb76b",
  "darkmagenta": "#8b008b",
  "darkolivegreen": "#556b2f",
  "darkorange": "#ff8c00",
  "darkorchid": "#9932cc",
  "darkred": "#8b0000",
  "darksalmon": "#e9967a",
  "darkseagreen": "#8fbc8f",
  "darkslateblue": "#483d8b",
  "darkslategray": "#2f4f4f",
  "darkslategrey": "#2f4f4f",
  "darkturquoise": "#00ced1",
  "darkviolet": "#9400d3",
  "deeppink": "#ff1493",
  "deepskyblue": "#00bfff",
  "dimgray": "#696969",
  "dimgrey": "#696969",
  "dodgerblue": "#1e90ff",
  "firebrick": "#b22222",
  "floralwhite": "#fffaf0",
  "forestgreen": "#228b22",
  "fuchsia": "#ff00ff",
  "gainsboro": "#dcdcdc",
  "ghostwhite": "#f8f8ff",
  "gold": "#ffd700",
  "goldenrod": "#daa520",
  "gray": "#808080",
  "green": "#008000",
  "greenyellow": "#adff2f",
  "grey": "#808080",
  "honeydew": "#f0fff0",
  "hotpink": "#ff69b4",
  "indianred": "#cd5c5c",
  "indigo": "#4b0082",
  "ivory": "#fffff0",
  "khaki": "#f0e68c",
  "lavender": "#e6e6fa",
  "lavenderblush": "#fff0f5",
  "lawngreen": "#7cfc00",
  "lemonchiffon": "#fffacd",
  "lightblue": "#add8e6",
  "lightcoral": "#f08080",
  "lightcyan": "#e0ffff",
  "lightgoldenrodyellow": "#fafad2",
  "lightgray": "#d3d3d3",
  "lightgreen": "#90ee90",
  "lightgrey": "#d3d3d3",
  "lightpink": "#ffb6c1",
  "lightsalmon": "#ffa07a",
  "lightseagreen": "#20b2aa",
  "lightskyblue": "#87cefa",
  "lightslategray": "#778899",
  "lightslategrey": "#778899",
  "lightsteelblue": "#b0c4de",
  "lightyellow": "#ffffe0",
  "lime": "#00ff00",
  "limegreen": "#32cd32",
  "linen": "#faf0e6",
  "magenta": "#ff00ff",
  "maroon": "#800000",
  "mediumaquamarine": "#66cdaa",
  "mediumblue": "#0000cd",
  "mediumorchid": "#ba55d3",
  "mediumpurple": "#9370db",
  "mediumseagreen": "#3cb371",
  "mediumslateblue": "#7b68ee",
  "mediumspringgreen": "#00fa9a",
  "mediumturquoise": "#48d1cc",
  "mediumvioletred": "#c71585",
  "midnightblue": "#191970",
  "mintcream": "#f5fffa",
  "mistyrose": "#ffe4e1",
  "moccasin": "#ffe4b5",
  "navajowhite": "#ffdead",
  "navy": "#000080",
  "oldlace": "#fdf5e6",
  "olive": "#808000",
  "olivedrab": "#6b8e23",
  "orange": "#ffa500",
  "orangered": "#ff4500",
  "orchid": "#da70d6",
  "palegoldenrod": "#eee8aa",
  "palegreen": "#98fb98",
  "paleturquoise": "#afeeee",
  "palevioletred": "#db7093",
  "papayawhip": "#ffefd5",
  "peachpuff": "#ffdab9",
  "peru": "#cd853f",
  "pink": "#ffc0cb",
  "plum": "#dda0dd",
  "powderblue": "#b0e0e6",
  "purple": "#800080",
  "red": "#ff0000",
  "rosybrown": "#bc8f8f",
  "royalblue": "#4169e1",
  "saddlebrown": "#8b4513",
  "salmon": "#fa8072",
  "sandybrown": "#f4a460",
  "seagreen": "#2e8b57",
  "seashell": "#fff5ee",
  "sienna": "#a0522d",
  "silver": "#c0c0c0",
  "skyblue": "#87ceeb",
  "slateblue": "#6a5acd",
  "slategray": "#708090",
  "slategrey": "#708090",
  "snow": "#fffafa",
  "springgreen": "#00ff7f",
  "steelblue": "#4682b4",
  "tan": "#d2b48c",
  "teal": "#008080",
  "thistle": "#d8bfd8",
  "tomato": "#ff6347",
  "turquoise": "#40e0d0",
  "violet": "#ee82ee",
  "wheat": "#f5deb3",
  "white": "#ffffff",
  "whitesmoke": "#f5f5f5",
  "yellow": "#ffff00",
  "yellowgreen": "#9acd32"
};

for (var d3_rgb_name in d3_rgb_names) {
  d3_rgb_names[d3_rgb_name] = d3_rgb_parse(
      d3_rgb_names[d3_rgb_name],
      d3_rgb,
      d3_hsl_rgb);
}
/**
 * @param {number=} s
 * @param {number=} l
 */
d3.hsl = function(h, s, l) {
  return arguments.length == 1
      ? d3_rgb_parse("" + h, d3_rgb_hsl, d3_hsl)
      : d3_hsl(+h, +s, +l);
};

function d3_hsl(h, s, l) {
  return {h: h, s: s, l: l, toString: d3_hsl_format};
}

/** @this d3_hsl */
function d3_hsl_format() {
  return "hsl(" + this.h + "," + this.s * 100 + "%," + this.l * 100 + "%)";
}

function d3_hsl_rgb(h, s, l) {
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

  return d3_rgb(vv(h + 120), vv(h), vv(h - 120));
}
var d3_root = d3_selection([[document]]);
d3_root[0].parentNode = document.documentElement;

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
          if (subnode && "__data__" in node) subnode.__data__ = node.__data__;
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

  // TODO preserve null elements to maintain index?
  groups.filter = function(filter) {
    var subgroups = [],
        subgroup,
        group,
        node;
    for (var j = 0, m = groups.length; j < m; j++) {
      group = groups[j];
      subgroups.push(subgroup = []);
      subgroup.parentNode = group.parentNode;
      subgroup.parentData = group.parentData;
      for (var i = 0, n = group.length; i < n; i++) {
        if ((node = group[i]) && filter.call(node, node.__data__, i)) {
          subgroup.push(node);
        }
      }
    }
    return d3_selection(subgroups);
  };

  // TODO data(null) for clearing data?
  groups.data = function(data, join) {
    var i = -1,
        n = groups.length,
        group,
        enter = [],
        update = [],
        exit = [];

    if (typeof join == "string") join = d3_selection_join(join);

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
            key,
            j = groupData.length;

        for (i = 0; i < n; i++) {
          key = join.nodeKey(node = group[i]);
          if (key in nodeByKey) {
            exitNodes[j++] = group[i];
          } else {
            nodeByKey[key] = node;
            keys.push(key);
          }
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

      enterNodes.parentNode
          = updateNodes.parentNode
          = exitNodes.parentNode
          = group.parentNode;

      enterNodes.parentData
          = updateNodes.parentData
          = exitNodes.parentData
          = group.parentData;

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

  groups.node = function() {
    return first(function() { return this; });
  };

  groups.attr = function(name, value) {
    name = d3.ns.qualify(name);

    // If no value is specified, return the first value.
    if (arguments.length < 2) {
      return first(name.local
          ? function() { return this.getAttributeNS(name.space, name.local); }
          : function() { return this.getAttribute(name); });
    }

    /** @this {Element} */
    function attrNull() {
      this.removeAttribute(name);
    }

    /** @this {Element} */
    function attrNullNS() {
      this.removeAttributeNS(name.space, name.local);
    }

    /** @this {Element} */
    function attrConstant() {
      this.setAttribute(name, value);
    }

    /** @this {Element} */
    function attrConstantNS() {
      this.setAttributeNS(name.space, name.local, value);
    }

    /** @this {Element} */
    function attrFunction() {
      var x = value.apply(this, arguments);
      if (x == null) this.removeAttribute(name);
      else this.setAttribute(name, x);
    }

    /** @this {Element} */
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

    /** @this {Element} */
    function styleNull() {
      this.style.removeProperty(name);
    }

    /** @this {Element} */
    function styleConstant() {
      this.style.setProperty(name, value, priority);
    }

    /** @this {Element} */
    function styleFunction() {
      var x = value.apply(this, arguments);
      if (x == null) this.style.removeProperty(name);
      else this.style.setProperty(name, x, priority);
    }

    return groups.each(value == null
        ? styleNull : (typeof value == "function"
        ? styleFunction : styleConstant));
  };

  groups.property = function(name, value) {
    name = d3.ns.qualify(name);

    // If no value is specified, return the first value.
    if (arguments.length < 2) {
      return first(function() {
        return this[name];
      });
    }

    /** @this {Element} */
    function propertyNull() {
      delete this[name];
    }

    /** @this {Element} */
    function propertyConstant() {
      this[name] = value;
    }

    /** @this {Element} */
    function propertyFunction() {
      var x = value.apply(this, arguments);
      if (x == null) delete this[name];
      else this[name] = x;
    }

    return groups.each(value == null
        ? propertyNull : (typeof value == "function"
        ? propertyFunction : propertyConstant));
  };

  groups.text = function(value) {

    // If no value is specified, return the first value.
    if (arguments.length < 1) {
      return first(function() {
        return this.textContent;
      });
    }

    /** @this {Element} */
    function textNull() {
      while (this.lastChild) this.removeChild(this.lastChild);
    }

    /** @this {Element} */
    function textConstant() {
      this.appendChild(document.createTextNode(value));
    }

    /** @this {Element} */
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

    /** @this {Element} */
    function htmlConstant() {
      this.innerHTML = value;
    }

    /** @this {Element} */
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

  groups.sort = function(comparator) {
    comparator = d3_comparator.apply(this, arguments);
    for (var j = 0, m = groups.length; j < m; j++) {
      var group = groups[j];
      group.sort(comparator);
      for (var i = 1, n = group.length, prev = group[0]; i < n; i++) {
        var node = group[i];
        if (node) {
          if (prev) prev.parentNode.insertBefore(node, prev.nextSibling);
          prev = node;
        }
      }
    }
    return groups;
  };

  // TODO namespaced event listeners to allow multiples
  groups.on = function(type, listener) {
    type = "on" + type;
    return groups.each(function(d, i) {
      this[type] = function(e) {
        var o = d3.event; // Events can be reentrant (e.g., focus).
        d3.event = e;
        try {
          listener.call(this, d, i);
        } finally {
          d3.event = o;
        }
      };
    });
  };

  // TODO slice?

  groups.transition = function() {
    return d3_transition(groups);
  };

  groups.call = d3_call;

  return groups;
}

// TODO support namespaces for key?
function d3_selection_join(key) {
  return {
    nodeKey: function(node) { return node.getAttribute(key); },
    dataKey: function(data) { return data[key]; }
  };
}

function d3_comparator(comparator) {
  if (!arguments.length) comparator = d3_ascending;
  return function(a, b) {
    return comparator(a && a.__data__, b && b.__data__);
  };
}

function d3_ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

function d3_descending(a, b) {
  return a < b ? 1 : a > b ? -1 : 0;
}
d3.transition = d3_root.transition;

var d3_transitionId = 0,
    d3_transitionInheritId = 0;

function d3_transition(groups) {
  var transition = {},
      transitionId = d3_transitionInheritId || ++d3_transitionId,
      tweens = {},
      interpolators = [],
      remove = false,
      event = d3.dispatch("start", "end"),
      stage = [],
      delay = [],
      duration = [],
      durationMax,
      ease = d3.ease("cubic-in-out");

  //
  // Be careful with concurrent transitions!
  //
  // Say transition A causes an exit. Before A finishes, a transition B is
  // created, and believes it only needs to do an update, because the elements
  // haven't been removed yet (which happens at the very end of the exit
  // transition).
  //
  // Even worse, what if either transition A or B has a staggered delay? Then,
  // some elements may be removed, while others remain. Transition B does not
  // know to enter the elements because they were still present at the time
  // the transition B was created (but not yet started).
  //
  // To prevent such confusion, we only trigger end events for transitions if
  // the transition ending is the only one scheduled for the given element.
  // Similarly, we only allow one transition to be active for any given
  // element, so that concurrent transitions do not overwrite each other's
  // properties.
  //
  // TODO Support transition namespaces, so that transitions can proceed
  // concurrently on the same element if needed. Hopefully, this is rare!
  //

  groups.each(function() {
    (this.__transition__ || (this.__transition__ = {})).owner = transitionId;
  });

  function step(elapsed) {
    var clear = true,
        k = -1;
    groups.each(function() {
      if (stage[++k] == 2) return; // ended
      var t = (elapsed - delay[k]) / duration[k],
          tx = this.__transition__,
          te, // ease(t)
          tk, // tween key
          ik = interpolators[k];
      if (t < 1) {
        clear = false;
        if (t < 0) return;
        if (stage[k]) {
          if (tx.active != transitionId) {
            stage[k] = 2;
            return;
          }
        } else if (!tx || tx.active > transitionId) {
          stage[k] = 2;
          return;
        } else {
          stage[k] = 1;
          event.start.dispatch.apply(this, arguments);
          ik = interpolators[k] = {};
          tx.active = transitionId;
          for (tk in tweens) ik[tk] = tweens[tk].apply(this, arguments);
        }
        te = ease(t);
        for (tk in tweens) ik[tk].call(this, te);
      } else {
        stage[k] = 2;
        if (tx.active == transitionId) {
          var owner = tx.owner;
          for (tk in tweens) ik[tk].call(this, 1);
          if (owner == transitionId) {
            delete this.__transition__;
            if (remove) this.parentNode.removeChild(this);
          }
          d3_transitionInheritId = transitionId;
          event.end.dispatch.apply(this, arguments);
          d3_transitionInheritId = 0;
          tx.owner = owner;
        }
      }
    });
    return clear;
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
    d3_timer(step, delayMin);
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

    /** @this {Element} */
    function attrTween(d, i) {
      var f = tween.call(this, d, i, this.getAttribute(name));
      return function(t) {
        this.setAttribute(name, f(t));
      };
    }

    /** @this {Element} */
    function attrTweenNS(d, i) {
      var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
      return function(t) {
        this.setAttributeNS(name.space, name.local, f(t));
      };
    }

    tweens["attr." + name] = name.local ? attrTweenNS : attrTween;
    return transition;
  };

  transition.attr = function(name, value) {
    return transition.attrTween(name, d3_tween(value));
  };

  transition.styleTween = function(name, tween, priority) {

    /** @this {Element} */
    function styleTween(d, i) {
      var f = tween.call(this, d, i, window.getComputedStyle(this, null).getPropertyValue(name));
      return function(t) {
        this.style.setProperty(name, f(t), priority);
      };
    }

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

  transition.remove = function() {
    remove = true;
    return transition;
  };

  transition.each = function(type, listener) {
    event[type].add(listener);
    return transition;
  };

  transition.call = d3_call;

  return transition.delay(0).duration(250);
}
var d3_timer_queue = null,
    d3_timer_timeout = 0,
    d3_timer_interval;

function d3_timer(callback, delay) {
  var now = Date.now(),
      found = false,
      start = now + delay,
      t0,
      t1 = d3_timer_queue;

  if (!isFinite(delay)) return;

  // Scan the queue for earliest callback.
  while (t1) {
    if (t1.callback == callback) {
      t1.then = now;
      t1.delay = delay;
      found = true;
    } else {
      var x = t1.then + t1.delay;
      if (x < start) start = x;
    }
    t0 = t1;
    t1 = t1.next;
  }

  // Otherwise, add the callback to the queue.
  if (!found) d3_timer_queue = {
    callback: callback,
    then: now,
    delay: delay,
    next: d3_timer_queue
  };

  if (!d3_timer_interval) {
    clearTimeout(d3_timer_timeout);
    d3_timer_timeout = setTimeout(d3_timer_start, Math.max(24, start - now));
  }
}

function d3_timer_start() {
  d3_timer_interval = setInterval(d3_timer_step, 24);
  d3_timer_timeout = 0;
}

function d3_timer_step() {
  var elapsed,
      now = Date.now(),
      t0 = null,
      t1 = d3_timer_queue;
  while (t1) {
    elapsed = now - t1.then;
    if (elapsed > t1.delay) t1.flush = t1.callback(elapsed);
    t1 = (t0 = t1).next;
  }
  d3_timer_flush();
}

// Flush after callbacks, to avoid concurrent queue modification.
function d3_timer_flush() {
  var t0 = null,
      t1 = d3_timer_queue;
  while (t1) {
    t1 = t1.flush
        ? (t0 ? t0.next = t1.next : d3_timer_queue = t1.next)
        : (t0 = t1).next;
  }
  if (!t0) d3_timer_interval = clearInterval(d3_timer_interval);
}
function d3_tween(b) {
  return typeof b == "function"
    ? function(d, i, a) { return d3.interpolate(a, b.call(this, d, i)); }
    : function(d, i, a) { return d3.interpolate(a, b); };
}
d3.scale = {};
d3.scale.linear = function() {
  var x0 = 0,
      x1 = 1,
      y0 = 0,
      y1 = 1,
      kx = 1 / (x1 - x0),
      ky = (x1 - x0) / (y1 - y0),
      i = d3.interpolate(y0, y1);

  function scale(x) {
    return i((x - x0) * kx);
  }

  scale.invert = function(y) {
    return (y - y0) * ky + x0; // TODO assumes number?
  };

  /** @param {*=} x */
  scale.domain = function(x) {
    if (!arguments.length) return [x0, x1];
    x0 = x[0];
    x1 = x[1];
    kx = 1 / (x1 - x0);
    ky = (x1 - x0) / (y1 - y0);
    return scale;
  };

  /** @param {*=} x */
  scale.range = function(x) {
    if (!arguments.length) return [y0, y1];
    y0 = x[0];
    y1 = x[1];
    ky = (x1 - x0) / (y1 - y0);
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
    return d3.format(",." + n + "f");
  };

  return scale;
};
d3.scale.log = function() {
  var linear = d3.scale.linear();

  function log(x) {
    return Math.log(x) / Math.LN10;
  }

  function pow(y) {
    return Math.pow(10, y);
  }

  function scale(x) {
    return linear(log(x));
  }

  scale.invert = function(x) {
    return pow(linear.invert(x));
  };

  /** @param {*=} x */
  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(pow);
    linear.domain(x.map(log));
    return scale;
  };

  scale.range = function() {
    var x = linear.range.apply(linear, arguments);
    return arguments.length ? scale : x;
  };

  scale.ticks = function() {
    var d = linear.domain(),
        i = Math.floor(d[0]),
        j = Math.ceil(d[1]),
        ticks = [];
    if (d.every(isFinite)) {
      while (++i <= j) for (var k = 1; k < 10; k++) ticks.push(pow(i) * k);
      ticks.push(pow(i));
    }
    return ticks;
  };

  scale.tickFormat = function() {
    return function(d) { return d.toPrecision(1); };
  };

  return scale;
};
d3.scale.pow = function() {
  var linear = d3.scale.linear(),
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
d3.scale.sqrt = function() {
  return d3.scale.pow().exponent(.5);
};
d3.scale.ordinal = function() {
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
/*
 * This product includes color specifications and designs developed by Cynthia
 * Brewer (http://colorbrewer.org/). See lib/colorbrewer for more information.
 */

d3.scale.category10 = function() {
  return d3.scale.ordinal().range(d3_category10);
};

d3.scale.category20 = function() {
  return d3.scale.ordinal().range(d3_category20);
};

d3.scale.category20b = function() {
  return d3.scale.ordinal().range(d3_category20b);
};

d3.scale.category20c = function() {
  return d3.scale.ordinal().range(d3_category20c);
};

var d3_category10 = [
  "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
  "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
];

var d3_category20 = [
  "#1f77b4", "#aec7e8",
  "#ff7f0e", "#ffbb78",
  "#2ca02c", "#98df8a",
  "#d62728", "#ff9896",
  "#9467bd", "#c5b0d5",
  "#8c564b", "#c49c94",
  "#e377c2", "#f7b6d2",
  "#7f7f7f", "#c7c7c7",
  "#bcbd22", "#dbdb8d",
  "#17becf", "#9edae5"
];

var d3_category20b = [
  "#393b79", "#5254a3", "#6b6ecf", "#9c9ede",
  "#637939", "#8ca252", "#b5cf6b", "#cedb9c",
  "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94",
  "#843c39", "#ad494a", "#d6616b", "#e7969c",
  "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"
];

var d3_category20c = [
  "#3182bd", "#6baed6", "#9ecae1", "#c6dbef",
  "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2",
  "#31a354", "#74c476", "#a1d99b", "#c7e9c0",
  "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb",
  "#636363", "#969696", "#bdbdbd", "#d9d9d9"
];
d3.svg = {};
d3.svg.arc = function() {
  var innerRadius = function(d) { return d.innerRadius; },
      outerRadius = function(d) { return d.outerRadius; },
      startAngle = function(d) { return d.startAngle; },
      endAngle = function(d) { return d.endAngle; };

  function arc(d) {
    var r0 = innerRadius(d),
        r1 = outerRadius(d),
        a0 = startAngle(d) + d3_svg_arcOffset,
        a1 = endAngle(d) + d3_svg_arcOffset,
        da = a1 - a0,
        c0 = Math.cos(a0),
        s0 = Math.sin(a0),
        c1 = Math.cos(a1),
        s1 = Math.sin(a1);
    return "M" + r1 * c0 + "," + r1 * s0
        + "A" + r1 + "," + r1 + " 0 "
        + ((da < Math.PI) ? "0" : "1") + ",1 "
        + r1 * c1 + "," + r1 * s1
        + "L" + r0 * c1 + "," + r0 * s1
        + "A" + r0 + "," + r0 + " 0 "
        + ((da < Math.PI) ? "0" : "1") + ",0 "
        + r0 * c0 + "," + r0 * s0 + "Z";
  }

  arc.innerRadius = function(value) {
    innerRadius = typeof value == "function"
        ? value
        : function() { return value; };
    return arc;
  };

  arc.outerRadius = function(value) {
    outerRadius = typeof value == "function"
        ? value
        : function() { return value; };
    return arc;
  };

  arc.startAngle = function(value) {
    startAngle = typeof value == "function"
        ? value
        : function() { return value; };
    return arc;
  };

  arc.endAngle = function(value) {
    endAngle = typeof value == "function"
        ? value
        : function() { return value; };
    return arc;
  };

  return arc;
};

var d3_svg_arcOffset = -Math.PI / 2;
d3["svg"]["line"] = function() {
  var x = d3_svg_lineX,
      y = d3_svg_lineY,
      interpolate = "linear",
      interpolator = d3_svg_lineInterpolators[interpolate];

  function line(d) {
    return "M" + interpolator(d3_svg_linePoints(this, d, x, y));
  }

  line["x"] = function(v) {
    if (!arguments.length) return x;
    x = v;
    return line;
  };

  line["y"] = function(v) {
    if (!arguments.length) return y;
    y = v;
    return line;
  };

  line["interpolate"] = function(v) {
    if (!arguments.length) return interpolate;
    interpolator = d3_svg_lineInterpolators[interpolate = v];
    return line;
  };

  return line;
};

/**
 * @private Converts the specified array of data into an array of points
 * (x-y tuples), by evaluating the specified `x` and `y` functions on each
 * data point. The `this` context of the evaluated functions is the specified
 * "self" object; each function is passed the current datum and index.
 */
function d3_svg_linePoints(self, d, x, y) {
  var points = [],
      i = -1,
      n = d.length,
      fx = typeof x == "function",
      fy = typeof y == "function",
      value;
  if (fx && fy) {
    while (++i < n) points.push([
      x.call(self, value = d[i], i),
      y.call(self, value, i)
    ]);
  } else if (fx) {
    while (++i < n) points.push([x.call(self, d[i], i), y]);
  } else if (fy) {
    while (++i < n) points.push([x, y.call(self, d[i], i)]);
  } else {
    while (++i < n) points.push([x, y]);
  }
  return points;
}

/**
 * @private The default `x` property, which references the `x` attribute of
 * the given datum.
 */
function d3_svg_lineX(d) {
  return d["x"];
}

/**
 * @private The default `y` property, which references the `y` attribute of
 * the given datum.
 */
function d3_svg_lineY(d) {
  return d["y"];
}

/**
 * @private The various interpolators supported by the `line` class.
 */
var d3_svg_lineInterpolators = {
  "linear": d3_svg_lineLinear,
  "basis": d3_svg_lineBasis
};

/**
 * @private Linear interpolation; generates "L" commands.
 */
function d3_svg_lineLinear(points) {
  if (points.length < 1) return null;
  var path = [],
      i = 0,
      n = points.length,
      p = points[0];
  path.push(p[0], ",", p[1]);
  while (++i < n) path.push("L", (p = points[i])[0], ",", p[1]);
  return path.join("");
}

/**
 * @private B-spline interpolation; generates "C" commands.
 */
function d3_svg_lineBasis(points) {
  if (points.length < 3) return d3_svg_lineLinear(points);
  var path = [],
      i = 1,
      n = points.length,
      pi = points[0],
      x0 = pi[0],
      y0 = pi[1],
      px = [x0, x0, x0, (pi = points[1])[0]],
      py = [y0, y0, y0, pi[1]];
  path.push(x0, ",", y0);
  d3_svg_lineBasisBezier(path, px, py);
  while (++i < n) {
    pi = points[i];
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  i = -1;
  while (++i < 2) {
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  return path.join("");
}

/**
 * @private Returns the dot product of the given four-element vectors.
 */
function d3_svg_lineDot4(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

/*
 * @private Matrix to transform basis (b-spline) control points to bezier
 * control points. Derived from FvD 11.2.8.
 */
var d3_svg_lineBasisBezier1 = [0, 2/3, 1/3, 0],
    d3_svg_lineBasisBezier2 = [0, 1/3, 2/3, 0],
    d3_svg_lineBasisBezier3 = [0, 1/6, 2/3, 1/6];

/**
 * @private Pushes a "C" Bézier curve onto the specified path array, given the
 * two specified four-element arrays which define the control points.
 */
function d3_svg_lineBasisBezier(path, x, y) {
  path.push(
      "C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y));
}
d3["svg"]["area"] = function() {
  var x = d3_svg_lineX,
      y0 = d3_svg_areaY0,
      y1 = d3_svg_lineY,
      interpolate = "linear",
      interpolator = d3_svg_lineInterpolators[interpolate];

  // TODO horizontal / vertical / radial orientation

  function area(d) {
    return d.length < 1 ? null
        : "M" + interpolator(d3_svg_linePoints(this, d, x, y1))
        + "L" + interpolator(d3_svg_linePoints(this, d, x, y0).reverse())
        + "Z";
  }

  area["x"] = function(v) {
    if (!arguments.length) return x;
    x = v;
    return area;
  };

  area["y0"] = function(v) {
    if (!arguments.length) return y0;
    y0 = v;
    return area;
  };

  area["y1"] = function(v) {
    if (!arguments.length) return y1;
    y1 = v;
    return area;
  };

  area["interpolate"] = function(v) {
    if (!arguments.length) return interpolate;
    interpolator = d3_svg_lineInterpolators[interpolate = v];
    return area;
  };

  return area;
};

function d3_svg_areaY0() {
  return 0;
}
d3["svg"]["chord"] = function() {
  var sourceRadius = d3_svg_chordSourceRadius,
      sourceStartAngle = d3_svg_chordSourceStartAngle,
      sourceEndAngle = d3_svg_chordSourceEndAngle,
      targetRadius = d3_svg_chordTargetRadius,
      targetStartAngle = d3_svg_chordTargetStartAngle,
      targetEndAngle = d3_svg_chordTargetEndAngle;

  // TODO Allow control point to be customized.

  function chord(d) {
    var a00 = sourceStartAngle(d) + d3_svg_arcOffset,
        a01 = sourceEndAngle(d) + d3_svg_arcOffset,
        a10 = targetStartAngle(d) + d3_svg_arcOffset,
        a11 = targetEndAngle(d) + d3_svg_arcOffset,
        r0 = sourceRadius(d),
        r1 = targetRadius(d),
        x00 = r0 * Math.cos(a00),
        y00 = r0 * Math.sin(a00),
        x01 = r0 * Math.cos(a01),
        y01 = r0 * Math.sin(a01),
        x10 = r1 * Math.cos(a10),
        y10 = r1 * Math.sin(a10),
        x11 = r1 * Math.cos(a11),
        y11 = r1 * Math.sin(a11);
    return "M" + x00 + "," + y00
        + "A" + r0 + "," + r0 + " 0  0,1 " + x01 + "," + y01
        + "Q 0,0 " + x10 + "," + y10
        + "A" + r1 + "," + r1 + " 0  0,1 " + x11 + "," + y11
        + "Q 0,0 " + x00 + "," + y00
        + "Z";
  }

  chord.radius = function(v) {
    sourceRadius = targetRadius = d3_svg_chordValue(v);
    return chord;
  };

  chord.sourceRadius = function(v) {
    if (!arguments.length) return sourceRadius;
    sourceRadius = d3_svg_chordValue(v);
    return chord;
  };

  chord.sourceStartAngle = function(v) {
    if (!arguments.length) return sourceStartAngle;
    sourceStartAngle = d3_svg_chordValue(v);
    return chord;
  };

  chord.sourceEndAngle = function(v) {
    if (!arguments.length) return sourceEndAngle;
    sourceEndAngle = d3_svg_chordValue(v);
    return chord;
  };

  chord.targetRadius = function(v) {
    if (!arguments.length) return targetRadius;
    targetRadius = d3_svg_chordValue(v);
    return chord;
  };

  chord.targetStartAngle = function(v) {
    if (!arguments.length) return targetStartAngle;
    targetStartAngle = d3_svg_chordValue(v);
    return chord;
  };

  chord.targetEndAngle = function(v) {
    if (!arguments.length) return targetEndAngle;
    targetEndAngle = d3_svg_chordValue(v);
    return chord;
  };

  return chord;
};

function d3_svg_chordSourceRadius(d) {
  return d["source"]["radius"];
}

function d3_svg_chordSourceStartAngle(d) {
  return d["source"]["startAngle"];
}

function d3_svg_chordSourceEndAngle(d) {
  return d["source"]["endAngle"];
}

function d3_svg_chordTargetRadius(d) {
  return d["target"]["radius"];
}

function d3_svg_chordTargetStartAngle(d) {
  return d["target"]["startAngle"];
}

function d3_svg_chordTargetEndAngle(d) {
  return d["target"]["endAngle"];
}

function d3_svg_chordValue(v) {
  return typeof v == "function" ? v : function() { return v; };
}
d3.svg.mouse = function(container) {
  var point = (container.ownerSVGElement || container).createSVGPoint();
  if ((d3_mouse_bug44083 < 0) && (window.scrollX || window.scrollY)) {
    var svg = d3.select(document.body)
      .append("svg:svg")
        .style("position", "absolute")
        .style("top", 0)
        .style("left", 0);
    var ctm = svg[0][0].getScreenCTM();
    d3_mouse_bug44083 = !(ctm.f || ctm.e);
    svg.remove();
  }
  if (d3_mouse_bug44083) {
    point.x = d3.event.pageX;
    point.y = d3.event.pageY;
  } else {
    point.x = d3.event.clientX;
    point.y = d3.event.clientY;
  }
  point = point.matrixTransform(container.getScreenCTM().inverse());
  return [point.x, point.y];
};

// https://bugs.webkit.org/show_bug.cgi?id=44083
var d3_mouse_bug44083 = /WebKit/.test(navigator.userAgent) ? -1 : 0;
