(function(){d3 = {version: "1.14.2"}; // semver
if (!Date.now) Date.now = function() {
  return +new Date();
};
if (!Object.create) Object.create = function(o) {
  /** @constructor */ function f() {}
  f.prototype = o;
  return new f();
};
var d3_array = d3_arraySlice; // conversion for NodeLists

function d3_arrayCopy(psuedoarray) {
  var i = -1, n = psuedoarray.length, array = [];
  while (++i < n) array.push(psuedoarray[i]);
  return array;
}

function d3_arraySlice(psuedoarray) {
  return Array.prototype.slice.call(psuedoarray);
}

try {
  d3_array(document.documentElement.childNodes)[0].nodeType;
} catch(e) {
  d3_array = d3_arrayCopy;
}
d3.functor = function(v) {
  return typeof v == "function" ? v : function() { return v; };
};
// A getter-setter method that preserves the appropriate `this` context.
d3.rebind = function(object, method) {
  return function() {
    var x = method.apply(object, arguments);
    return arguments.length ? object : x;
  };
};
d3.ascending = function(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
};
d3.descending = function(a, b) {
  return b < a ? -1 : b > a ? 1 : 0;
};
d3.min = function(array, f) {
  var i = 0,
      n = array.length,
      a = array[0],
      b;
  if (arguments.length == 1) {
    while (++i < n) if (a > (b = array[i])) a = b;
  } else {
    a = f(array[0]);
    while (++i < n) if (a > (b = f(array[i]))) a = b;
  }
  return a;
};
d3.max = function(array, f) {
  var i = 0,
      n = array.length,
      a = array[0],
      b;
  if (arguments.length == 1) {
    while (++i < n) if (a < (b = array[i])) a = b;
  } else {
    a = f(a);
    while (++i < n) if (a < (b = f(array[i]))) a = b;
  }
  return a;
};
d3.nest = function() {
  var nest = {},
      keys = [],
      sortKeys = [],
      sortValues,
      rollup;

  function map(array, depth) {
    if (depth >= keys.length) return rollup
        ? rollup.call(nest, array) : (sortValues
        ? array.sort(sortValues)
        : array);

    var i = -1,
        n = array.length,
        key = keys[depth++],
        keyValue,
        object,
        o = {};

    while (++i < n) {
      if ((keyValue = key(object = array[i])) in o) {
        o[keyValue].push(object);
      } else {
        o[keyValue] = [object];
      }
    }

    for (keyValue in o) {
      o[keyValue] = map(o[keyValue], depth);
    }

    return o;
  }

  function entries(map, depth) {
    if (depth >= keys.length) return map;

    var a = [],
        sortKey = sortKeys[depth++],
        key;

    for (key in map) {
      a.push({key: key, values: entries(map[key], depth)});
    }

    if (sortKey) a.sort(function(a, b) {
      return sortKey(a.key, b.key);
    });

    return a;
  }

  nest.map = function(array) {
    return map(array, 0);
  };

  nest.entries = function(array) {
    return entries(map(array, 0), 0);
  };

  nest.key = function(d) {
    keys.push(d);
    return nest;
  };

  // Specifies the order for the most-recently specified key.
  // Note: only applies to entries. Map keys are unordered!
  nest.sortKeys = function(order) {
    sortKeys[keys.length - 1] = order;
    return nest;
  };

  // Specifies the order for leaf values.
  // Applies to both maps and entries array.
  nest.sortValues = function(order) {
    sortValues = order;
    return nest;
  };

  nest.rollup = function(f) {
    rollup = f;
    return nest;
  };

  return nest;
};
d3.keys = function(map) {
  var keys = [];
  for (var key in map) keys.push(key);
  return keys;
};
d3.values = function(map) {
  var values = [];
  for (var key in map) values.push(map[key]);
  return values;
};
d3.entries = function(map) {
  var entries = [];
  for (var key in map) entries.push({key: key, value: map[key]});
  return entries;
};
d3.merge = function(arrays) {
  return Array.prototype.concat.apply([], arrays);
};
d3.split = function(array, f) {
  var arrays = [],
      values = [],
      value,
      i = -1,
      n = array.length;
  if (arguments.length < 2) f = d3_splitter;
  while (++i < n) {
    if (f.call(values, value = array[i], i)) {
      values = [];
    } else {
      if (!values.length) arrays.push(values);
      values.push(value);
    }
  }
  return arrays;
};

function d3_splitter(d) {
  return d == null;
}
function d3_collapse(s) {
  return s.replace(/(^\s+)|(\s+$)/g, "").replace(/\s+/g, " ");
}
//
// Note: assigning to the arguments array simultaneously changes the value of
// the corresponding argument!
//
// TODO The `this` argument probably shouldn't be the first argument to the
// callback, anyway, since it's redundant. However, that will require a major
// version bump due to backwards compatibility, so I'm not changing it right
// away.
//
function d3_call(callback) {
  callback.apply(this, (arguments[0] = this, arguments));
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
d3.requote = function(s) {
  return s.replace(d3_requote_re, "\\$&");
};

var d3_requote_re = /[\\\^\$\*\+\?\[\]\(\)\.\{\}]/g;
d3.xhr = function(url, mime, callback) {
  var req = new XMLHttpRequest();
  if (arguments.length < 3) callback = mime;
  else if (mime && req.overrideMimeType) req.overrideMimeType(mime);
  req.open("GET", url, true);
  req.onreadystatechange = function() {
    if (req.readyState == 4) callback(req.status < 300 ? req : null);
  };
  req.send(null);
};
d3.text = function(url, mime, callback) {
  function ready(req) {
    callback(req && req.responseText);
  }
  if (arguments.length < 3) {
    callback = mime;
    mime = null;
  }
  d3.xhr(url, mime, ready);
};
d3.json = function(url, callback) {
  d3.text(url, "application/json", function(text) {
    callback(text ? JSON.parse(text) : null);
  });
};
d3.html = function(url, callback) {
  d3.text(url, "text/html", function(text) {
    if (text != null) { // Treat empty string as valid HTML.
      var range = document.createRange();
      range.selectNode(document.body);
      text = range.createContextualFragment(text);
    }
    callback(text);
  });
};
d3.xml = function(url, mime, callback) {
  function ready(req) {
    callback(req && req.responseXML);
  }
  if (arguments.length < 3) {
    callback = mime;
    mime = null;
  }
  d3.xhr(url, mime, ready);
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
// TODO align, type
d3.format = function(specifier) {
  var match = d3_format_re.exec(specifier),
      fill = match[1] || " ",
      sign = match[3] || "",
      zfill = match[5],
      width = +match[6],
      comma = match[7],
      precision = match[8],
      type = match[9];
  if (precision) precision = precision.substring(1);
  if (zfill) {
    fill = "0"; // TODO align = "=";
    if (comma) width -= Math.floor((width - 1) / 4);
  }
  if (type == "d") precision = "0";
  return function(value) {
    var number = +value,
        negative = (number < 0) && (number = -number) ? "\u2212" : sign;

    // Return the empty string for floats formatted as ints.
    if ((type == "d") && (number % 1)) return "";

    // Convert the input value to the desired precision.
    if (precision) value = number.toFixed(precision);
    else value = "" + number;

    // If the fill character is 0, the sign and group is applied after the fill.
    if (zfill) {
      var length = value.length + negative.length;
      if (length < width) value = new Array(width - length + 1).join(fill) + value;
      if (comma) value = d3_format_group(value);
      value = negative + value;
    }

    // Otherwise (e.g., space-filling), the sign and group is applied before.
    else {
      if (comma) value = d3_format_group(value);
      value = negative + value;
      var length = value.length;
      if (length < width) value = new Array(width - length + 1).join(fill) + value;
    }

    return value;
  };
};

// [[fill]align][sign][#][0][width][,][.precision][type]
var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/;

// Apply comma grouping for thousands.
function d3_format_group(value) {
  var i = value.lastIndexOf("."),
      f = i >= 0 ? value.substring(i) : (i = value.length, ""),
      t = [];
  while (i > 0) t.push(value.substring(i -= 3, i + 3));
  return t.reverse().join(",") + f;
}
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
  linear: function() { return d3_ease_linear; },
  poly: d3_ease_poly,
  quad: function() { return d3_ease_quad; },
  cubic: function() { return d3_ease_cubic; },
  sin: function() { return d3_ease_sin; },
  exp: function() { return d3_ease_exp; },
  circle: function() { return d3_ease_circle; },
  elastic: d3_ease_elastic,
  back: d3_ease_back,
  bounce: function() { return d3_ease_bounce; }
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

d3.interpolateRound = function(a, b) {
  b -= a;
  return function(t) { return Math.round(a + b * t); };
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

  // Reset our regular expression!
  d3_interpolate_number.lastIndex = 0;

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

// interpolates HSL space, but outputs RGB string (for compatibility)
d3.interpolateHsl = function(a, b) {
  a = d3.hsl(a);
  b = d3.hsl(b);
  var h0 = a.h,
      s0 = a.s,
      l0 = a.l,
      h1 = b.h - h0,
      s1 = b.s - s0,
      l1 = b.l - l0;
  return function(t) {
    return d3_hsl_rgb(h0 + h1 * t, s0 + s1 * t, l0 + l1 * t).toString();
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
  var r = 0, // red channel; int in [0, 255]
      g = 0, // green channel; int in [0, 255]
      b = 0, // blue channel; int in [0, 255]
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

  /* Hexadecimal colors: #rgb and #rrggbb. */
  if (format != null && format.charAt(0) == "#") {
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
var d3_select = function(s, n) { return n.querySelector(s); },
    d3_selectAll = function(s, n) { return d3_array(n.querySelectorAll(s)); };

// Use Sizzle, if available.
if (typeof Sizzle == "function") {
  d3_select = function(s, n) { return Sizzle(s, n)[0]; };
  d3_selectAll = function(s, n) { return Sizzle.uniqueSort(Sizzle(s, n)); };
}

var d3_root = d3_selection([[document]]);
d3_root[0].parentNode = document.documentElement;

// TODO fast singleton implementation!
d3.select = function(selector) {
  return typeof selector == "string"
      ? d3_root.select(selector)
      : d3_selection([[selector]]); // assume node
};

d3.selectAll = function(selector) {
  return typeof selector == "string"
      ? d3_root.selectAll(selector)
      : d3_selection([d3_array(selector)]); // assume node[]
};

function d3_selection(groups) {

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
        }
      }
    }
    return d3_selection(subgroups);
  }

  // TODO select(function)?
  groups.select = function(selector) {
    return select(function(node) {
      return d3_select(selector, node);
    });
  };

  // TODO selectAll(function)?
  groups.selectAll = function(selector) {
    return selectAll(function(node) {
      return d3_selectAll(selector, node);
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
      for (var i = 0, n = group.length; i < n; i++) {
        if ((node = group[i]) && filter.call(node, node.__data__, i)) {
          subgroup.push(node);
        }
      }
    }
    return d3_selection(subgroups);
  };

  groups.map = function(map) {
    var group,
        node;
    for (var j = 0, m = groups.length; j < m; j++) {
      group = groups[j];
      for (var i = 0, n = group.length; i < n; i++) {
        if (node = group[i]) node.__data__ = map.call(node, node.__data__, i);
      }
    }
    return groups;
  };

  // TODO data(null) for clearing data?
  groups.data = function(data, join) {
    var enter = [],
        update = [],
        exit = [];

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

      if (join) {
        var nodeByKey = {},
            keys = [],
            key,
            j = groupData.length;

        for (i = 0; i < n; i++) {
          key = join.call(node = group[i], node.__data__, i);
          if (key in nodeByKey) {
            exitNodes[j++] = group[i]; // duplicate key
          } else {
            nodeByKey[key] = node;
          }
          keys.push(key);
        }

        for (i = 0; i < m; i++) {
          node = nodeByKey[key = join.call(groupData, nodeData = groupData[i], i)];
          if (node) {
            node.__data__ = nodeData;
            updateNodes[i] = node;
            enterNodes[i] = exitNodes[i] = null;
          } else {
            enterNodes[i] = d3_selection_enterNode(nodeData);
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
            enterNodes[i] = d3_selection_enterNode(nodeData);
            updateNodes[i] = exitNodes[i] = null;
          }
        }
        for (; i < m; i++) {
          enterNodes[i] = d3_selection_enterNode(groupData[i]);
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

      enter.push(enterNodes);
      update.push(updateNodes);
      exit.push(exitNodes);
    }

    var i = -1,
        n = groups.length,
        group;
    if (typeof data == "function") {
      while (++i < n) {
        bind(group = groups[i], data.call(group, group.parentNode.__data__, i));
      }
    } else {
      while (++i < n) {
        bind(group = groups[i], data);
      }
    }

    var selection = d3_selection(update);
    selection.enter = function() {
      return d3_selectionEnter(enter);
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

  groups.empty = function() {
    return !first(function() { return true; });
  };

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

  groups.classed = function(name, value) {
    var re = new RegExp("(^|\\s+)" + d3.requote(name) + "(\\s+|$)", "g");

    // If no value is specified, return the first value.
    if (arguments.length < 2) {
      return first(function() {
        re.lastIndex = 0;
        return re.test(this.className);
      });
    }

    /** @this {Element} */
    function classedAdd() {
      var classes = this.className;
      re.lastIndex = 0;
      if (!re.test(classes)) {
        this.className = d3_collapse(classes + " " + name);
      }
    }

    /** @this {Element} */
    function classedRemove() {
      var classes = d3_collapse(this.className.replace(re, " "));
      this.className = classes.length ? classes : null;
    }

    /** @this {Element} */
    function classedFunction() {
      (value.apply(this, arguments)
          ? classedAdd
          : classedRemove).call(this);
    }

    return groups.each(typeof value == "function"
        ? classedFunction : value
        ? classedAdd
        : classedRemove);
  };

  groups.style = function(name, value, priority) {
    if (arguments.length < 3) priority = "";

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
    function textConstant() {
      this.textContent = value;
    }

    /** @this {Element} */
    function textFunction() {
      this.textContent = value.apply(this, arguments);
    }

    return groups.each(typeof value == "function"
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

  // TODO insert(node, function)?
  // TODO insert(function, string)?
  // TODO insert(function, function)?
  groups.insert = function(name, before) {
    name = d3.ns.qualify(name);

    function insert(node) {
      return node.insertBefore(
          document.createElement(name),
          d3_select(before, node));
    }

    function insertNS(node) {
      return node.insertBefore(
          document.createElementNS(name.space, name.local),
          d3_select(before, node));
    }

    return select(name.local ? insertNS : insert);
  };

  // TODO remove(selector)?
  // TODO remove(node)?
  // TODO remove(function)?
  groups.remove = function() {
    return groups.each(function() {
      var parent = this.parentNode;
      if (parent) parent.removeChild(this);
    });
  };

  groups.sort = function(comparator) {
    comparator = d3_selection_comparator.apply(this, arguments);
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

  // type can be namespaced, e.g., "click.foo"
  // listener can be null for removal
  groups.on = function(type, listener, capture) {
    if (arguments.length < 3) capture = false;

    // parse the type specifier
    var i = type.indexOf("."),
        typo = i == -1 ? type : type.substring(0, i),
        name = "__on" + type;

    // remove the old event listener, and add the new event listener
    return groups.each(function(d, i) {
      if (this[name]) this.removeEventListener(typo, this[name], capture);
      if (listener) this.addEventListener(typo, this[name] = l, capture);

      // wrapped event listener that preserves d, i
      function l(e) {
        var o = d3.event; // Events can be reentrant (e.g., focus).
        d3.event = e;
        try {
          listener.call(this, d, i);
        } finally {
          d3.event = o;
        }
      }
    });
  };

  // TODO slice?

  groups.transition = function() {
    return d3_transition(groups);
  };

  groups.call = d3_call;

  return groups;
}

function d3_selectionEnter(groups) {

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
      for (var i = 0, n = group.length; i < n; i++) {
        if (node = group[i]) {
          subgroup.push(subnode = select(group.parentNode));
          subnode.__data__ = node.__data__;
        } else {
          subgroup.push(null);
        }
      }
    }
    return d3_selection(subgroups);
  }

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

  // TODO insert(node, function)?
  // TODO insert(function, string)?
  // TODO insert(function, function)?
  groups.insert = function(name, before) {
    name = d3.ns.qualify(name);

    function insert(node) {
      return node.insertBefore(
          document.createElement(name),
          d3_select(before, node));
    }

    function insertNS(node) {
      return node.insertBefore(
          document.createElementNS(name.space, name.local),
          d3_select(before, node));
    }

    return select(name.local ? insertNS : insert);
  };

  return groups;
}

function d3_selection_comparator(comparator) {
  if (!arguments.length) comparator = d3.ascending;
  return function(a, b) {
    return comparator(a && a.__data__, b && b.__data__);
  };
}

function d3_selection_enterNode(data) {
  return {__data__: data};
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

      // Check if the (un-eased) time is outside the range [0,1].
      if (t < 1) {
        clear = false;
        if (t < 0) return;
      } else {
        t = 1;
      }

      // Determine the stage of this transition.
      // 0 - Not yet started.
      // 1 - In progress.
      // 2 - Ended.
      if (stage[k]) {
        if (!tx || tx.active != transitionId) {
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
        for (tk in tweens) {
          if (te = tweens[tk].apply(this, arguments)) {
            ik[tk] = te;
          }
        }
      }

      // Apply the interpolators!
      te = ease(t);
      for (tk in ik) ik[tk].call(this, te);

      // Handle ending transitions.
      if (t == 1) {
        stage[k] = 2;
        if (tx.active == transitionId) {
          var owner = tx.owner;
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
    ease = typeof value == "function" ? value : d3.ease.apply(d3, arguments);
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
    return transition.attrTween(name, d3_transitionTween(value));
  };

  transition.styleTween = function(name, tween, priority) {
    if (arguments.length < 3) priority = null;

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
    if (arguments.length < 3) priority = null;
    return transition.styleTween(name, d3_transitionTween(value), priority);
  };

  transition.text = function(value) {
    tweens.text = function(d, i) {
      this.textContent = typeof value == "function"
          ? value.call(this, d, i)
          : value;
    };
    return transition;
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

function d3_transitionTween(b) {
  return typeof b == "function"
      ? function(d, i, a) { return d3.interpolate(a, String(b.call(this, d, i))); }
      : (b = String(b), function(d, i, a) { return d3.interpolate(a, b); });
}
var d3_timer_queue = null,
    d3_timer_interval, // is an interval (or frame) active?
    d3_timer_timeout; // is a timeout active?

// The timer will continue to fire until callback returns true.
d3.timer = function(callback) {
  d3_timer(callback, 0);
};

function d3_timer(callback, delay) {
  var now = Date.now(),
      found = false,
      t0,
      t1 = d3_timer_queue;

  if (!isFinite(delay)) return;

  // See if the callback's already in the queue.
  while (t1) {
    if (t1.callback === callback) {
      t1.then = now;
      t1.delay = delay;
      found = true;
      break;
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

  // Start animatin'!
  if (!d3_timer_interval) {
    d3_timer_timeout = clearTimeout(d3_timer_timeout);
    d3_timer_interval = 1;
    d3_timer_frame(d3_timer_step);
  }
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

  var delay = d3_timer_flush() - now;
  if (delay > 24) {
    if (isFinite(delay)) {
      clearTimeout(d3_timer_timeout);
      d3_timer_timeout = setTimeout(d3_timer_step, delay);
    }
    d3_timer_interval = 0;
  } else {
    d3_timer_interval = 1;
    d3_timer_frame(d3_timer_step);
  }
}

// Flush after callbacks, to avoid concurrent queue modification.
function d3_timer_flush() {
  var t0 = null,
      t1 = d3_timer_queue,
      then = Infinity;
  while (t1) {
    if (t1.flush) {
      t1 = t0 ? t0.next = t1.next : d3_timer_queue = t1.next;
    } else {
      then = Math.min(then, t1.then + t1.delay);
      t1 = (t0 = t1).next;
    }
  }
  return then;
}

var d3_timer_frame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(callback) { setTimeout(callback, 17); };
d3.scale = {};
d3.scale.linear = function() {
  var x0 = 0,
      x1 = 1,
      y0 = 0,
      y1 = 1,
      kx = 1, // 1 / (x1 - x0)
      ky = 1, // (x1 - x0) / (y1 - y0)
      interpolate = d3.interpolate,
      i = interpolate(y0, y1),
      clamp = false;

  function scale(x) {
    x = (x - x0) * kx;
    return i(clamp ? Math.max(0, Math.min(1, x)) : x);
  }

  // Note: requires range is coercible to number!
  scale.invert = function(y) {
    return (y - y0) * ky + x0;
  };

  scale.domain = function(x) {
    if (!arguments.length) return [x0, x1];
    x0 = +x[0];
    x1 = +x[1];
    kx = 1 / (x1 - x0);
    ky = (x1 - x0) / (y1 - y0);
    return scale;
  };

  scale.range = function(x) {
    if (!arguments.length) return [y0, y1];
    y0 = x[0];
    y1 = x[1];
    ky = (x1 - x0) / (y1 - y0);
    i = interpolate(y0, y1);
    return scale;
  };

  scale.rangeRound = function(x) {
    return scale.range(x).interpolate(d3.interpolateRound);
  };

  scale.clamp = function(x) {
    if (!arguments.length) return clamp;
    clamp = x;
    return scale;
  };

  scale.interpolate = function(x) {
    if (!arguments.length) return interpolate;
    i = (interpolate = x)(y0, y1);
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
  var linear = d3.scale.linear(),
      log = d3_scale_log,
      pow = log.pow;

  function scale(x) {
    return linear(log(x));
  }

  scale.invert = function(x) {
    return pow(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(pow);
    log = (x[0] || x[1]) < 0 ? d3_scale_logn : d3_scale_log;
    pow = log.pow;
    linear.domain(x.map(log));
    return scale;
  };

  scale.range = d3.rebind(scale, linear.range);
  scale.rangeRound = d3.rebind(scale, linear.rangeRound);
  scale.interpolate = d3.rebind(scale, linear.interpolate);
  scale.clamp = d3.rebind(scale, linear.clamp);

  scale.ticks = function() {
    var d = linear.domain(),
        ticks = [];
    if (d.every(isFinite)) {
      var i = Math.floor(d[0]),
          j = Math.ceil(d[1]),
          u = pow(d[0]),
          v = pow(d[1]);
      if (log === d3_scale_logn) {
        ticks.push(pow(i));
        for (; i++ < j;) for (var k = 9; k > 0; k--) ticks.push(pow(i) * k);
      } else {
        for (; i < j; i++) for (var k = 1; k < 10; k++) ticks.push(pow(i) * k);
        ticks.push(pow(i));
      }
      for (i = 0; ticks[i] < u; i++) {} // strip small values
      for (j = ticks.length; ticks[j - 1] > v; j--) {} // strip big values
      ticks = ticks.slice(i, j);
    }
    return ticks;
  };

  scale.tickFormat = function() {
    return function(d) { return d.toPrecision(1); };
  };

  return scale;
};

function d3_scale_log(x) {
  return Math.log(x) / Math.LN10;
}

function d3_scale_logn(x) {
  return -Math.log(-x) / Math.LN10;
}

d3_scale_log.pow = function(x) {
  return Math.pow(10, x);
};

d3_scale_logn.pow = function(x) {
  return -Math.pow(10, -x);
};
d3.scale.pow = function() {
  var linear = d3.scale.linear(),
      tick = d3.scale.linear(), // TODO better tick formatting...
      exponent = 1,
      powp = Number,
      powb = powp;

  function scale(x) {
    return linear(powp(x));
  }

  scale.invert = function(x) {
    return powb(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(powb);
    var pow = (x[0] || x[1]) < 0 ? d3_scale_pown : d3_scale_pow;
    powp = pow(exponent);
    powb = pow(1 / exponent);
    linear.domain(x.map(powp));
    tick.domain(x);
    return scale;
  };

  scale.range = d3.rebind(scale, linear.range);
  scale.rangeRound = d3.rebind(scale, linear.rangeRound);
  scale.interpolate = d3.rebind(scale, linear.interpolate);
  scale.clamp = d3.rebind(scale, linear.clamp);
  scale.ticks = tick.ticks;
  scale.tickFormat = tick.tickFormat;

  scale.exponent = function(x) {
    if (!arguments.length) return exponent;
    var domain = scale.domain();
    exponent = x;
    return scale.domain(domain);
  };

  return scale;
};

function d3_scale_pow(e) {
  return function(x) {
    return Math.pow(x, e);
  };
}

function d3_scale_pown(e) {
  return function(x) {
    return -Math.pow(-x, e);
  };
}
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

  scale.rangeRoundBands = function(x, padding) {
    if (arguments.length < 2) padding = 0;
    var start = x[0],
        stop = x[1],
        diff = stop - start,
        step = Math.floor(diff / (domain.length + padding)),
        err = diff - (domain.length - padding) * step;
    range = d3.range(start + Math.round(err / 2), stop, step);
    rangeBand = Math.round(step * (1 - padding));
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
d3.scale.quantile = function() {
  var domain = [],
      range = [],
      thresholds = [];

  function rescale() {
    var i = -1,
        n = thresholds.length = range.length,
        k = domain.length / n;
    while (++i < n) thresholds[i] = domain[~~(i * k)];
  }

  function quantile(value) {
    if (isNaN(value = +value)) return NaN;
    var low = 0, high = thresholds.length - 1;
    while (low <= high) {
      var mid = (low + high) >> 1, midValue = thresholds[mid];
      if (midValue < value) low = mid + 1;
      else if (midValue > value) high = mid - 1;
      else return mid;
    }
    return high < 0 ? 0 : high;
  }

  function scale(x) {
    return range[quantile(x)];
  }

  scale.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x.filter(function(d) { return !isNaN(d); }).sort(d3.ascending);
    rescale();
    return scale;
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    rescale();
    return scale;
  };

  scale.quantiles = function() {
    return thresholds;
  };

  return scale;
};
d3.scale.quantize = function() {
  var x0 = 0,
      x1 = 1,
      kx = 2,
      i = 1,
      range = [0, 1];

  function scale(x) {
    return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
  }

  scale.domain = function(x) {
    if (!arguments.length) return [x0, x1];
    x0 = x[0];
    x1 = x[1];
    kx = range.length / (x1 - x0);
    return scale;
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    kx = range.length / (x1 - x0);
    i = range.length - 1;
    return scale;
  };

  return scale;
};
d3.svg = {};
d3.svg.arc = function() {
  var innerRadius = d3_svg_arcInnerRadius,
      outerRadius = d3_svg_arcOuterRadius,
      startAngle = d3_svg_arcStartAngle,
      endAngle = d3_svg_arcEndAngle;

  function arc() {
    var r0 = innerRadius.apply(this, arguments),
        r1 = outerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) + d3_svg_arcOffset,
        a1 = endAngle.apply(this, arguments) + d3_svg_arcOffset,
        da = a1 - a0,
        df = da < Math.PI ? "0" : "1",
        c0 = Math.cos(a0),
        s0 = Math.sin(a0),
        c1 = Math.cos(a1),
        s1 = Math.sin(a1);
    return da >= d3_svg_arcMax
      ? (r0
      ? "M0," + r1
      + "A" + r1 + "," + r1 + " 0 1,1 0," + (-r1)
      + "A" + r1 + "," + r1 + " 0 1,1 0," + r1
      + "M0," + r0
      + "A" + r0 + "," + r0 + " 0 1,1 0," + (-r0)
      + "A" + r0 + "," + r0 + " 0 1,1 0," + r0
      + "Z"
      : "M0," + r1
      + "A" + r1 + "," + r1 + " 0 1,1 0," + (-r1)
      + "A" + r1 + "," + r1 + " 0 1,1 0," + r1
      + "Z")
      : (r0
      ? "M" + r1 * c0 + "," + r1 * s0
      + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1
      + "L" + r0 * c1 + "," + r0 * s1
      + "A" + r0 + "," + r0 + " 0 " + df + ",0 " + r0 * c0 + "," + r0 * s0
      + "Z"
      : "M" + r1 * c0 + "," + r1 * s0
      + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1
      + "L0,0"
      + "Z");
  }

  arc.innerRadius = function(v) {
    if (!arguments.length) return innerRadius;
    innerRadius = d3.functor(v);
    return arc;
  };

  arc.outerRadius = function(v) {
    if (!arguments.length) return outerRadius;
    outerRadius = d3.functor(v);
    return arc;
  };

  arc.startAngle = function(v) {
    if (!arguments.length) return startAngle;
    startAngle = d3.functor(v);
    return arc;
  };

  arc.endAngle = function(v) {
    if (!arguments.length) return endAngle;
    endAngle = d3.functor(v);
    return arc;
  };

  arc.centroid = function() {
    var r = (innerRadius.apply(this, arguments)
        + outerRadius.apply(this, arguments)) / 2,
        a = (startAngle.apply(this, arguments)
        + endAngle.apply(this, arguments)) / 2 + d3_svg_arcOffset;
    return [Math.cos(a) * r, Math.sin(a) * r];
  };

  return arc;
};

var d3_svg_arcOffset = -Math.PI / 2,
    d3_svg_arcMax = 2 * Math.PI - 1e-6;

function d3_svg_arcInnerRadius(d) {
  return d.innerRadius;
}

function d3_svg_arcOuterRadius(d) {
  return d.outerRadius;
}

function d3_svg_arcStartAngle(d) {
  return d.startAngle;
}

function d3_svg_arcEndAngle(d) {
  return d.endAngle;
}
d3.svg.line = function() {
  var x = d3_svg_lineX,
      y = d3_svg_lineY,
      interpolate = "linear",
      interpolator = d3_svg_lineInterpolators[interpolate],
      tension = .7;

  function line(d) {
    return d.length < 1 ? null
        : "M" + interpolator(d3_svg_linePoints(this, d, x, y), tension);
  }

  line.x = function(v) {
    if (!arguments.length) return x;
    x = v;
    return line;
  };

  line.y = function(v) {
    if (!arguments.length) return y;
    y = v;
    return line;
  };

  line.interpolate = function(v) {
    if (!arguments.length) return interpolate;
    interpolator = d3_svg_lineInterpolators[interpolate = v];
    return line;
  };

  line.tension = function(v) {
    if (!arguments.length) return tension;
    tension = v;
    return line;
  };

  return line;
};

// Converts the specified array of data into an array of points
// (x-y tuples), by evaluating the specified `x` and `y` functions on each
// data point. The `this` context of the evaluated functions is the specified
// "self" object; each function is passed the current datum and index.
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

// The default `x` property, which references d[0].
function d3_svg_lineX(d) {
  return d[0];
}

// The default `y` property, which references d[1].
function d3_svg_lineY(d) {
  return d[1];
}

// The various interpolators supported by the `line` class.
var d3_svg_lineInterpolators = {
  "linear": d3_svg_lineLinear,
  "step-before": d3_svg_lineStepBefore,
  "step-after": d3_svg_lineStepAfter,
  "basis": d3_svg_lineBasis,
  "basis-closed": d3_svg_lineBasisClosed,
  "cardinal": d3_svg_lineCardinal,
  "cardinal-closed": d3_svg_lineCardinalClosed
};

// Linear interpolation; generates "L" commands.
function d3_svg_lineLinear(points) {
  var path = [],
      i = 0,
      n = points.length,
      p = points[0];
  path.push(p[0], ",", p[1]);
  while (++i < n) path.push("L", (p = points[i])[0], ",", p[1]);
  return path.join("");
}

// Step interpolation; generates "H" and "V" commands.
function d3_svg_lineStepBefore(points) {
  var path = [],
      i = 0,
      n = points.length,
      p = points[0];
  path.push(p[0], ",", p[1]);
  while (++i < n) path.push("V", (p = points[i])[1], "H", p[0]);
  return path.join("");
}

// Step interpolation; generates "H" and "V" commands.
function d3_svg_lineStepAfter(points) {
  var path = [],
      i = 0,
      n = points.length,
      p = points[0];
  path.push(p[0], ",", p[1]);
  while (++i < n) path.push("H", (p = points[i])[0], "V", p[1]);
  return path.join("");
}

// Closed cardinal spline interpolation; generates "C" commands.
function d3_svg_lineCardinalClosed(points, tension) {
  return points.length < 3
      ? d3_svg_lineLinear(points)
      : points[0] + d3_svg_lineHermite((points.push(points[0]), points),
        d3_svg_lineCardinalTangents([points[points.length - 2]]
        .concat(points, [points[1]]), tension));
}

// Cardinal spline interpolation; generates "C" commands.
function d3_svg_lineCardinal(points, tension, closed) {
  return points.length < 3
      ? d3_svg_lineLinear(points)
      : points[0] + d3_svg_lineHermite(points,
        d3_svg_lineCardinalTangents(points, tension));
}

// Hermite spline construction; generates "C" commands.
function d3_svg_lineHermite(points, tangents) {
  if (tangents.length < 1
      || (points.length != tangents.length
      && points.length != tangents.length + 2)) {
    return d3_svg_lineLinear(points);
  }

  var quad = points.length != tangents.length,
      path = "",
      p0 = points[0],
      p = points[1],
      t0 = tangents[0],
      t = t0,
      pi = 1;

  if (quad) {
    path += "Q" + (p[0] - t0[0] * 2 / 3) + "," + (p[1] - t0[1] * 2 / 3)
        + "," + p[0] + "," + p[1];
    p0 = points[1];
    pi = 2;
  }

  if (tangents.length > 1) {
    t = tangents[1];
    p = points[pi];
    pi++;
    path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1])
        + "," + (p[0] - t[0]) + "," + (p[1] - t[1])
        + "," + p[0] + "," + p[1];
    for (var i = 2; i < tangents.length; i++, pi++) {
      p = points[pi];
      t = tangents[i];
      path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1])
          + "," + p[0] + "," + p[1];
    }
  }

  if (quad) {
    var lp = points[pi];
    path += "Q" + (p[0] + t[0] * 2 / 3) + "," + (p[1] + t[1] * 2 / 3)
        + "," + lp[0] + "," + lp[1];
  }

  return path;
}

// Generates tangents for a cardinal spline.
function d3_svg_lineCardinalTangents(points, tension) {
  var tangents = [],
      a = (1 - tension) / 2,
      p0,
      p1 = points[0],
      p2 = points[1],
      i = 1,
      n = points.length;
  while (++i < n) {
    p0 = p1;
    p1 = p2;
    p2 = points[i];
    tangents.push([a * (p2[0] - p0[0]), a * (p2[1] - p0[1])]);
  }
  return tangents;
}

// Open B-spline interpolation; generates "C" commands.
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

// Closed B-spline interpolation; generates "C" commands.
function d3_svg_lineBasisClosed(points) {
  var path,
      i = -1,
      n = points.length,
      m = n + 4,
      pi,
      px = [],
      py = [];
  while (++i < 4) {
    pi = points[i % n];
    px.push(pi[0]);
    py.push(pi[1]);
  }
  path = [
    d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",",
    d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)
  ];
  --i; while (++i < m) {
    pi = points[i % n];
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  return path.join("");
}

// Returns the dot product of the given four-element vectors.
function d3_svg_lineDot4(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

// Matrix to transform basis (b-spline) control points to bezier
// control points. Derived from FvD 11.2.8.
var d3_svg_lineBasisBezier1 = [0, 2/3, 1/3, 0],
    d3_svg_lineBasisBezier2 = [0, 1/3, 2/3, 0],
    d3_svg_lineBasisBezier3 = [0, 1/6, 2/3, 1/6];

// Pushes a "C" Bézier curve onto the specified path array, given the
// two specified four-element arrays which define the control points.
function d3_svg_lineBasisBezier(path, x, y) {
  path.push(
      "C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y));
}
d3.svg.area = function() {
  var x = d3_svg_lineX,
      y0 = d3_svg_areaY0,
      y1 = d3_svg_lineY,
      interpolate = "linear",
      interpolator = d3_svg_lineInterpolators[interpolate],
      tension = .7;

  // TODO horizontal / vertical / radial orientation

  function area(d) {
    return d.length < 1 ? null
        : "M" + interpolator(d3_svg_linePoints(this, d, x, y1), tension)
        + "L" + interpolator(d3_svg_linePoints(this, d, x, y0).reverse(), tension)
        + "Z";
  }

  area.x = function(v) {
    if (!arguments.length) return x;
    x = v;
    return area;
  };

  area.y0 = function(v) {
    if (!arguments.length) return y0;
    y0 = v;
    return area;
  };

  area.y1 = function(v) {
    if (!arguments.length) return y1;
    y1 = v;
    return area;
  };

  area.interpolate = function(v) {
    if (!arguments.length) return interpolate;
    interpolator = d3_svg_lineInterpolators[interpolate = v];
    return area;
  };

  area.tension = function(v) {
    if (!arguments.length) return tension;
    tension = v;
    return area;
  };

  return area;
};

function d3_svg_areaY0() {
  return 0;
}
d3.svg.chord = function() {
  var source = d3_svg_chordSource,
      target = d3_svg_chordTarget,
      radius = d3_svg_chordRadius,
      startAngle = d3_svg_arcStartAngle,
      endAngle = d3_svg_arcEndAngle;

  // TODO Allow control point to be customized.

  function chord(d, i) {
    var s = subgroup(this, source, d, i),
        t = subgroup(this, target, d, i);
    return "M" + s.p0
      + arc(s.r, s.p1) + (equals(s, t)
      ? curve(s.r, s.p1, s.r, s.p0)
      : curve(s.r, s.p1, t.r, t.p0)
      + arc(t.r, t.p1)
      + curve(t.r, t.p1, s.r, s.p0))
      + "Z";
  }

  function subgroup(self, f, d, i) {
    var subgroup = f.call(self, d, i),
        r = radius.call(self, subgroup, i),
        a0 = startAngle.call(self, subgroup, i) + d3_svg_arcOffset,
        a1 = endAngle.call(self, subgroup, i) + d3_svg_arcOffset;
    return {
      r: r,
      a0: a0,
      a1: a1,
      p0: [r * Math.cos(a0), r * Math.sin(a0)],
      p1: [r * Math.cos(a1), r * Math.sin(a1)]
    };
  }

  function equals(a, b) {
    return a.a0 == b.a0 && a.a1 == b.a1;
  }

  function arc(r, p) {
    return "A" + r + "," + r + " 0 0,1 " + p;
  }

  function curve(r0, p0, r1, p1) {
    return "Q 0,0 " + p1;
  }

  chord.radius = function(v) {
    if (!arguments.length) return radius;
    radius = d3.functor(v);
    return chord;
  };

  chord.source = function(v) {
    if (!arguments.length) return source;
    source = d3.functor(v);
    return chord;
  };

  chord.target = function(v) {
    if (!arguments.length) return target;
    target = d3.functor(v);
    return chord;
  };

  chord.startAngle = function(v) {
    if (!arguments.length) return startAngle;
    startAngle = d3.functor(v);
    return chord;
  };

  chord.endAngle = function(v) {
    if (!arguments.length) return endAngle;
    endAngle = d3.functor(v);
    return chord;
  };

  return chord;
};

function d3_svg_chordSource(d) {
  return d.source;
}

function d3_svg_chordTarget(d) {
  return d.target;
}

function d3_svg_chordRadius(d) {
  return d.radius;
}

function d3_svg_chordStartAngle(d) {
  return d.startAngle;
}

function d3_svg_chordEndAngle(d) {
  return d.endAngle;
}
d3.svg.diagonal = function() {
  var source = d3_svg_chordSource,
      target = d3_svg_chordTarget,
      projection = d3_svg_diagonalProjection;

  function diagonal(d, i) {
    var p0 = source.call(this, d, i),
        p3 = target.call(this, d, i),
        m = (p0.y + p3.y) / 2,
        p = [p0, {x: p0.x, y: m}, {x: p3.x, y: m}, p3];
    p = p.map(projection);
    return "M" + p[0] + "C" + p[1] + " " + p[2] + " " + p[3];
  }

  diagonal.source = function(x) {
    if (!arguments.length) return source;
    source = d3.functor(x);
    return diagonal;
  };

  diagonal.target = function(x) {
    if (!arguments.length) return target;
    target = d3.functor(x);
    return diagonal;
  };

  diagonal.projection = function(x) {
    if (!arguments.length) return projection;
    projection = x;
    return diagonal;
  };

  return diagonal;
};

function d3_svg_diagonalProjection(d) {
  return [d.x, d.y];
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
d3.svg.symbol = function() {
  var type = d3_svg_symbolType,
      size = d3_svg_symbolSize;

  function symbol(d, i) {
    return (d3_svg_symbols[type.call(this, d, i)]
        || d3_svg_symbols.circle)
        (size.call(this, d, i));
  }

  symbol.type = function(x) {
    if (!arguments.length) return type;
    type = d3.functor(x);
    return symbol;
  };

  // size of symbol in square pixels
  symbol.size = function(x) {
    if (!arguments.length) return size;
    size = d3.functor(x);
    return symbol;
  };

  return symbol;
};

// TODO cross-diagonal?
d3.svg.symbolTypes = [
  "circle",
  "cross",
  "diamond",
  "square",
  "triangle-down",
  "triangle-up"
];

function d3_svg_symbolSize() {
  return 64;
}

function d3_svg_symbolType() {
  return "circle";
}

var d3_svg_symbols = {
  "circle": function(size) {
    var r = Math.sqrt(size / Math.PI);
    return "M0," + r
        + "A" + r + "," + r + " 0 1,1 0," + (-r)
        + "A" + r + "," + r + " 0 1,1 0," + r
        + "Z";
  },
  "cross": function(size) {
    var r = Math.sqrt(size / 5) / 2;
    return "M" + -3 * r + "," + -r
        + "H" + -r
        + "V" + -3 * r
        + "H" + r
        + "V" + -r
        + "H" + 3 * r
        + "V" + r
        + "H" + r
        + "V" + 3 * r
        + "H" + -r
        + "V" + r
        + "H" + -3 * r
        + "Z";
  },
  "diamond": function(size) {
    var ry = Math.sqrt(size / (2 * d3_svg_symbolTan30)),
        rx = ry * d3_svg_symbolTan30;
    return "M0," + -ry
        + "L" + rx + ",0"
        + " 0," + ry
        + " " + -rx + ",0"
        + "Z";
  },
  "square": function(size) {
    var r = Math.sqrt(size) / 2;
    return "M" + -r + "," + -r
        + "L" + r + "," + -r
        + " " + r + "," + r
        + " " + -r + "," + r
        + "Z";
  },
  "triangle-down": function(size) {
    var rx = Math.sqrt(size / d3_svg_symbolSqrt3),
        ry = rx * d3_svg_symbolSqrt3 / 2;
    return "M0," + ry
        + "L" + rx +"," + -ry
        + " " + -rx + "," + -ry
        + "Z";
  },
  "triangle-up": function(size) {
    var rx = Math.sqrt(size / d3_svg_symbolSqrt3),
        ry = rx * d3_svg_symbolSqrt3 / 2;
    return "M0," + -ry
        + "L" + rx +"," + ry
        + " " + -rx + "," + ry
        + "Z";
  }
};

var d3_svg_symbolSqrt3 = Math.sqrt(3),
    d3_svg_symbolTan30 = Math.tan(30 * Math.PI / 180);
})()