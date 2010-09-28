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
  d3.version = "0.0.0"; // semver
var ns = {

  prefix: {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  },

  resolve: function(prefix) {
    return ns.prefix[prefix] || null;
  },

  qualify: function(name) {
    var i = name.indexOf(":");
    return i < 0 ? name : {
      space: ns.prefix[name.substring(0, i)],
      local: name.substring(i + 1)
    };
  }

};
d3.dispatch = function(that) {
  var types = {};

  that.on = function(type, handler) {
    var listeners = types[type] || (types[type] = []);
    for (var i = 0; i < listeners.length; i++) {
      if (listeners[i].handler == handler) return that; // already registered
    }
    listeners.push({handler: handler, on: true});
    return that;
  };

  that.off = function(type, handler) {
    var listeners = types[type];
    if (listeners) for (var i = 0; i < listeners.length; i++) {
      var l = listeners[i];
      if (l.handler == handler) {
        l.on = false;
        listeners.splice(i, 1);
        break;
      }
    }
    return that;
  };

  that.dispatch = function(event) {
    var listeners = types[event.type];
    if (!listeners) return;
    listeners = listeners.slice(); // defensive copy
    for (var i = 0; i < listeners.length; i++) {
      var l = listeners[i];
      if (l.on) l.handler.call(that, event);
    }
  };

  return that;
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
d3.interpolate = function(a, b) {
  if (typeof b == "number") return d3.interpolateNumber(+a, b);
  if (typeof b == "string") return d3.interpolateString(String(a), b);
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
d3.tween = d3_tweenInterpolate(d3.interpolate);
d3.tweenRgb = d3_tweenInterpolate(d3.interpolateRgb);

function d3_tweenInterpolate(I) {
  return function(a, b) {
    var i = I(a, b);
    return function() {
      return i(d3.time);
    };
  };
}

function d3_tweenByName(n) {
  return n in d3_interpolate_rgb || /\bcolor\b/.test(n)
      ? d3.tweenRgb
      : d3.tween;
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
var d3_transform_stack = [];

function d3_transform() {
  var transform = {},
      actions = [];

  // TODO reorder elements
  // convenience method for replacing elements?
  // how to insert new element at a given location?
  // how to move elements around, sort, reverse or reorder?

  // TODO value transforms
  // how to inspect current attr/style/text value from transform?
  // perhaps push/pop values for temporary change (e.g., :hover)?
  // this.value retrieves current attr / style / text? or this.value()?

  // TODO extensibility
  // register hooks for transform extensibility outside the library?
  // how to encapsulate higher level logic (e.g., bars, wedges, charts)?
  // virtual nodes? map to canvas?

  // TODO composition
  // transform.apply(nodes) to transform specific nodes? (set root context)
  // transform.transform(transform) to chain transforms?

  // TODO selectors
  // allow select / selectAll argument to be function
  // allow select / selectAll argument to be node / nodes
  // allow select / selectAll argument to be xpath
  // allow selectParent?
  // allow selectFirstChild, selectLastChild, selectChildren?
  // allow selectNext, selectPrevious?

  // TODO performance
  // dispatch to different impl based on ns.qualify, typeof v === "function", etc.

  // TODO transitions
  // how to do staggered transition on line control points? (virtual nodes?)

  function transform_scope(parent, actions) {
    var scope = Object.create(transform);

    scope.pop = parent;

    scope.data = function(v) {
      var subscope, action = {
        impl: d3_transform_data,
        value: v,
        actions: [],
        enterActions: [],
        exitActions: []
      };
      actions.push(action);
      subscope = transform_scope(scope, action.actions);
      subscope.enter = transform_scope(scope, action.enterActions);
      subscope.exit = transform_scope(scope, action.exitActions);
      subscope.key = function(n, v) {
        action.key = {name: ns.qualify(n), value: v};
        return subscope;
      };
      return subscope;
    };

    scope.tweenData = function(v, t) {
      actions.push({
        impl: d3_transform_data_tween,
        bind: d3_transform_data_tween_bind,
        value: v,
        tween: arguments.length < 2 ? d3.tween : t
      });
      return scope;
    };

    scope.attr = function(n, v) {
      actions.push({
        impl: d3_transform_attr,
        name: ns.qualify(n),
        value: v
      });
      return scope;
    };

    scope.tweenAttr = function(n, v, t) {
      actions.push({
        impl: d3_transform_attr_tween,
        bind: d3_transform_attr_tween_bind,
        name: ns.qualify(n),
        key: "attr." + n,
        value: v,
        tween: arguments.length < 3 ? d3_tweenByName(n) : t
      });
      return scope;
    };

    scope.style = function(n, v, p) {
      actions.push({
        impl: d3_transform_style,
        name: n,
        value: v,
        priority: arguments.length < 3 ? null : p
      });
      return scope;
    };

    scope.tweenStyle = function(n, v, p, t) {
      actions.push({
        impl: d3_transform_style_tween,
        bind: d3_transform_style_tween_bind,
        name: n,
        key: "style." + n,
        value: v,
        priority: arguments.length < 3 ? null : p,
        tween: arguments.length < 4 ? d3_tweenByName(n) : t
      });
      return scope;
    };

    scope.add = function(n, v) {
      var action = {
        impl: d3_transform_add,
        name: ns.qualify(n),
        value: v,
        actions: []
      };
      actions.push(action);
      return transform_scope(scope, action.actions);
    };

    scope.remove = function(s) {
      actions.push({
        impl: d3_transform_remove,
        selector: s
      });
      return scope;
    };

    scope.text = function(v) {
      actions.push({
        impl: d3_transform_text,
        value: v
      });
      return scope;
    };

    scope.on = function(t) {
      var action = {
        impl: d3_transform_on,
        type: t,
        actions: []
      };
      actions.push(action);
      return transform_scope(scope, action.actions);
    };

    scope.filter = function(f) {
      var action = {
        impl: d3_transform_filter,
        filter: f,
        actions: []
      };
      actions.push(action);
      return transform_scope(scope, action.actions);
    };

    scope.select = function(s) {
      var action = {
        impl: d3_transform_select,
        selector: s,
        actions: []
      };
      actions.push(action);
      return transform_scope(scope, action.actions);
    };

    scope.selectAll = function(s) {
      var action = {
        impl: d3_transform_select_all,
        selector: s,
        actions: []
      };
      actions.push(action);
      return transform_scope(scope, action.actions);
    };

    scope.transition = function() {
      var subscope, action = {
        impl: d3_transform_transition,
        actions: [],
        endActions: [],
        ease: d3.ease("cubic-in-out"),
        delay: 0,
        duration: 250
      };
      actions.push(action);
      subscope = transform_scope(scope, action.actions);
      subscope.end = transform_scope(scope, action.endActions);
      subscope.ease = function(x) {
        action.ease = typeof x == "string" ? d3.ease(x) : x;
        return subscope;
      };
      subscope.delay = function(x) {
        action.delay = x;
        return subscope;
      };
      subscope.duration = function(x) {
        action.duration = x;
        return subscope;
      };
      return subscope;
    };

    return scope;
  }

  transform.select = function(s) {
    var action = {
      impl: d3_transform_select,
      selector: s,
      actions: []
    };
    actions.push(action);
    return transform_scope(transform, action.actions);
  };

  transform.selectAll = function(s) {
    var action = {
      impl: d3_transform_select_all,
      selector: s,
      actions: []
    };
    actions.push(action);
    return transform_scope(transform, action.actions);
  };

  transform.apply = function() {
    d3_transform_stack.unshift(null);
    d3_transform_impl(actions, [{node: document, index: 0}]);
    d3_transform_stack.shift();
    return transform;
  };

  return transform;
}

function d3_transform_impl(actions, nodes) {
  var n = actions.length,
      i; // current index
  for (i = 0; i < n; ++i) actions[i].impl(nodes, d3_transform_impl);
}
function d3_transform_add(nodes, pass) {
  var m = nodes.length,
      n = this.name,
      childNodes = [],
      i, // current index
      o, // current node
      c; // current child
  if (n.local) {
    for (i = 0; i < m; ++i) {
      childNodes.push(c = Object.create(o = nodes[i]));
      c.node = (c.parentNode = o.node).appendChild(document.createElementNS(n.space, n.local));
    }
  } else {
    for (i = 0; i < m; ++i) {
      childNodes.push(c = Object.create(o = nodes[i]));
      c.node = (c.parentNode = o.node).appendChild(document.createElement(n));
    }
  }
  pass(this.actions, childNodes);
}
function d3_transform_attr(nodes) {
  var m = nodes.length,
      n = this.name,
      v = this.value,
      i, // current index
      o, // current node
      x; // current value (for value functions)
  if (n.local) {
    if (v == null) {
      for (i = 0; i < m; ++i) {
        nodes[i].node.removeAttributeNS(n.space, n.local);
      }
    } else if (typeof v == "function") {
      for (i = 0; i < m; ++i) {
        d3_transform_stack[0] = (o = nodes[i]).data;
        x = v.apply(o, d3_transform_stack);
        x == null
            ? o.node.removeAttributeNS(n.space, n.local)
            : o.node.setAttributeNS(n.space, n.local, x);
      }
    } else {
      for (i = 0; i < m; ++i) {
        nodes[i].node.setAttributeNS(n.space, n.local, v);
      }
    }
  } else if (v == null) {
    for (i = 0; i < m; ++i) {
      nodes[i].node.removeAttribute(n);
    }
  } else if (typeof v == "function") {
    for (i = 0; i < m; ++i) {
      d3_transform_stack[0] = (o = nodes[i]).data;
      x = v.apply(o, d3_transform_stack);
      x == null
          ? o.node.removeAttribute(n)
          : o.node.setAttribute(n, x);
    }
  } else {
    for (i = 0; i < m; ++i) {
      nodes[i].node.setAttribute(n, v);
    }
  }
}

function d3_transform_attr_tween(nodes) {
  var m = nodes.length,
      n = this.name,
      k = this.key,
      i, // current index
      o; // current node
  if (n.local) {
    for (i = 0; i < m; ++i) {
      (o = nodes[i]).node.setAttributeNS(n.space, n.local, o.tween[k]());
    }
  } else {
    for (i = 0; i < m; ++i) {
      (o = nodes[i]).node.setAttribute(n, o.tween[k]());
    }
  }
}

function d3_transform_attr_tween_bind(nodes) {
  var m = nodes.length,
      n = this.name,
      k = this.key,
      v = this.value,
      T = this.tween,
      i, // current index
      o; // current node
  if (n.local) {
    if (typeof v === "function") {
      for (i = 0; i < m; ++i) {
        d3_transform_stack[0] = (o = nodes[i]).data;
        o.tween[k] = T(o.node.getAttributeNS(n.local, n.space), v.apply(o, d3_transform_stack));
      }
    } else {
      for (i = 0; i < m; ++i) {
        (o = nodes[i]).tween[k] = T(o.node.getAttributeNS(n.local, n.space), v);
      }
    }
  } else if (typeof v === "function") {
    for (i = 0; i < m; ++i) {
      d3_transform_stack[0] = (o = nodes[i]).data;
      o.tween[k] = T(o.node.getAttribute(n), v.apply(o, d3_transform_stack));
    }
  } else {
    for (i = 0; i < m; ++i) {
      (o = nodes[i]).tween[k] = T(o.node.getAttribute(n), v);
    }
  }
}
function d3_transform_data(nodes, pass) {
  var data = this.value,
      m = nodes.length,
      n, // data length
      key = this.key,
      kn, // key name
      kv, // key value
      k, // current key
      i, // current index
      j, // current index
      d, // current datum
      o, // current node
      enterNodes = [],
      updateNodes = [],
      exitNodes = [],
      nodesByKey, // map key -> node
      dataByKey, // map key -> data
      indexesByKey; // map key -> index

  if (typeof data == "function") {
    d = d3_transform_stack.shift();
    data = data.apply(null, d3_transform_stack);
    d3_transform_stack.unshift(d);
  }

  n = data.length;

  if (key) {
    kn = key.name;
    kv = key.value;
    nodesByKey = {};
    dataByKey = {};
    indexesByKey = {};

    // compute map from key -> node
    if (kn.local) {
      for (i = 0; i < m; ++i) {
        o = nodes[i].node;
        if (o) {
          k = o.getAttributeNS(kn.space, kn.local);
          if (k != null) nodesByKey[k] = o;
        }
      }
    } else {
      for (i = 0; i < m; ++i) {
        o = nodes[i].node;
        if (o) {
          k = o.getAttribute(kn);
          if (k != null) nodesByKey[k] = o;
        }
      }
    }

    // compute map from key -> data
    for (i = 0; i < n; ++i) {
      d3_transform_stack[0] = d = data[i];
      k = kv.apply(null, d3_transform_stack);
      if (k != null) {
        dataByKey[k] = d;
        indexesByKey[k] = i;
      }
    }

    // compute entering and updating nodes
    for (k in dataByKey) {
      d = dataByKey[k];
      i = indexesByKey[k];
      if (o = nodesByKey[k]) {
        updateNodes.push({
          node: o,
          data: d,
          key: k,
          index: i
        });
      } else {
        enterNodes.push({
          node: nodes.parentNode,
          data: d,
          key: k,
          index: i
        });
      }
    }

    // compute exiting nodes
    for (k in nodesByKey) {
      if (!(k in dataByKey)) {
        exitNodes.push({node: nodesByKey[k]});
      }
    }
  } else {
    k = n < m ? n : m;

    // compute updating nodes
    for (i = 0; i < k; ++i) {
      (o = nodes[i]).data = data[i];
      if (o.node) {
        updateNodes.push(o);
      } else {
        o.node = o.parentNode;
        enterNodes.push(o);
      }
    }

    // compute entering nodes
    for (j = i; j < n; ++j) {
      enterNodes.push({
        node: nodes.parentNode,
        data: data[j],
        index: j
      });
    }

    // compute exiting nodes
    for (j = i; j < m; ++j) {
      exitNodes.push(nodes[j]);
    }
  }

  pass(this.enterActions, enterNodes);
  pass(this.actions, updateNodes);
  pass(this.exitActions, exitNodes);
}

function d3_transform_data_tween(nodes) {
  var m = nodes.length,
      i, // current index
      o; // current node
  for (i = 0; i < m; ++i) {
    (o = nodes[i]).data = o.tween.data();
  }
}

function d3_transform_data_tween_bind(nodes) {
  var m = nodes.length,
      v = this.value,
      T = this.tween,
      i, // current index
      o; // current node
  if (typeof v === "function") {
    for (i = 0; i < m; ++i) {
      (o = nodes[i]).tween.data = T(d3_transform_stack[0] = o.data, v.apply(o, d3_transform_stack));
    }
  } else {
    for (i = 0; i < m; ++i) {
      (o = nodes[i]).tween.data = T(o.data, v);
    }
  }
}
function d3_transform_remove(nodes) {
  var m = nodes.length,
      s = this.selector,
      r, // the selected nodes (for selectors)
      i, // current node index
      j, // current selector index
      k, // current selector length
      o; // current node to remove
  if (s == null) {
    for (i = 0; i < m; ++i) {
      o = nodes[i].node;
      o.parentNode.removeChild(o);
    }
  } else {
    for (i = 0; i < m; ++i) {
      r = nodes[i].node.querySelectorAll(s);
      for (j = 0, k = r.length; j < k; j++) {
        o = r[j];
        o.parentNode.removeChild(o);
      }
    }
  }
}
function d3_transform_on(nodes) {
  var actions = this.actions,
      n = actions.length,
      m = nodes.length,
      t = "on" + this.type,
      i = 0, // current index
      o, // curent node
      stack = d3_transform_stack.slice(); // stack snapshot

  if (n) {
    for (; i < m; ++i) {
      o = nodes[i];
      o.node[t] = bind([o]);
    }
  } else {
    for (; i < m; ++i) {
      nodes[i].node[t] = null;
    }
  }

  function bind(o) {
    return function(e) {
      var s = d3_transform_stack;
      try {
        d3_transform_stack = stack;
        d3.event = e;
        for (i = 0; i < n; ++i) actions[i].impl(o, d3_transform_impl);
      } finally {
        delete d3.event;
        d3_transform_stack = s;
      }
    };
  }
}
function d3_transform_filter(nodes, pass) {
  var filteredNodes = [],
      m = nodes.length,
      f = this.filter,
      i, // the node index
      o; // current item
  for (i = 0; i < m; ++i) {
    d3_transform_stack[0] = (o = nodes[i]).data;
    if (f.apply(o, d3_transform_stack)) filteredNodes.push(o);
  }
  pass(this.actions, filteredNodes);
}
d3.select = function(s) {
  return d3_transform().select(s);
};

function d3_transform_select(nodes, pass) {
  var selectedNodes = [],
      m = nodes.length,
      s = this.selector,
      i, // the node index
      o, // current item
      p, // current node
      c, // current selected item
      e; // current selected node
  for (i = 0; i < m; ++i) {
    e = (p = (o = nodes[i]).node).querySelector(s);
    selectedNodes.push(c = Object.create(o));
    c.parentNode = p;
    c.node = e;
  }
  pass(this.actions, selectedNodes);
}
d3.selectAll = function(s) {
  return d3_transform().selectAll(s);
};

function d3_transform_select_all(nodes, pass) {
  var m = nodes.length,
      s = this.selector,
      i, // the node index
      o, // the current node
      p; // the current node
  d3_transform_stack.unshift(null);
  for (i = 0; i < m; ++i) {
    d3_transform_stack[1] = (o = nodes[i]).data;
    pass(this.actions, d3_transform_nodes((p = o.node).querySelectorAll(s), p));
  }
  d3_transform_stack.shift();
}

function d3_transform_nodes(x, p) {
  var nodes = [],
      i = 0,
      n = x.length;
  nodes.parentNode = p;
  for (; i < n; i++) nodes.push({node: x[i], index: i});
  return nodes;
}
function d3_transform_style(nodes) {
  var m = nodes.length,
      n = this.name,
      v = this.value,
      p = this.priority,
      i, // current index
      o, // current node
      x; // current value (for value functions)
  if (v == null) {
    for (i = 0; i < m; ++i) {
      nodes[i].node.style.removeProperty(n);
    }
  } else if (typeof v == "function") {
    for (i = 0; i < m; ++i) {
      o = nodes[i];
      d3_transform_stack[0] = o.data;
      x = v.apply(o, d3_transform_stack);
      x == null
          ? o.node.style.removeProperty(n)
          : o.node.style.setProperty(n, x, p);
    }
  } else {
    for (i = 0; i < m; ++i) {
      nodes[i].node.style.setProperty(n, v, p);
    }
  }
}

function d3_transform_style_tween(nodes) {
  var m = nodes.length,
      n = this.name,
      k = this.key,
      p = this.priority,
      i, // current index
      o; // current node
  for (i = 0; i < m; ++i) {
    (o = nodes[i]).node.style.setProperty(n, o.tween[k](), p);
  }
}

function d3_transform_style_tween_bind(nodes) {
  var m = nodes.length,
      n = this.name,
      k = this.key,
      v = this.value,
      T = this.tween,
      i, // current index
      o; // current node
  if (typeof v === "function") {
    for (i = 0; i < m; ++i) {
      d3_transform_stack[0] = (o = nodes[i]).data;
      o.tween[k] = T(o.node.style.getPropertyValue(n), v.apply(o, d3_transform_stack));
    }
  } else {
    for (i = 0; i < m; ++i) {
      (o = nodes[i]).tween[k] = T(o.node.style.getPropertyValue(n), v);
    }
  }
}
function d3_transform_text(nodes) {
  var m = nodes.length,
      v = this.value,
      i, // current node index
      o, // current node
      x; // current value (for value functions)
  if (typeof v == "function") {
    for (i = 0; i < m; ++i) {
      o = nodes[i];
      d3_transform_stack[0] = o.data;
      x = v.apply(o, d3_transform_stack);
      o = o.node;
      while (o.lastChild) o.removeChild(o.lastChild);
      o.appendChild(document.createTextNode(x));
    }
  } else {
    for (i = 0; i < m; ++i) {
      o = nodes[i].node;
      while (o.lastChild) o.removeChild(o.lastChild);
      o.appendChild(document.createTextNode(v));
    }
  }
}
function d3_transform_transition(nodes) {
  var actions = this.actions,
      endActions = this.endActions,
      start = Date.now(),
      delay = this.delay,
      minDelay = Infinity,
      maxDelay = -Infinity,
      duration = this.duration,
      ease = this.ease,
      interval,
      n = actions.length,
      k = endActions.length,
      m = nodes.length,
      i, // current index
      j, // current index
      o, // curent node
      x, // current value
      stack = d3_transform_stack.slice(); // stack snapshot

  // If delay is a function, transition each node separately.
  if (typeof delay == "function") {
    for (i = 0; i < m; ++i) {
      d3_transform_stack[0] = (o = nodes[i]).data;
      x = o.delay = delay.apply(o, d3_transform_stack);
      if (x < minDelay) minDelay = x;
      if (x > maxDelay) maxDelay = x;
    }
    setTimeout(function() {
      bind(interval = setInterval(tickOne, 24));
    }, minDelay);
  } else {
    setTimeout(function() {
      bind(interval = setInterval(tickAll, 24));
    }, delay);
  }

  // Bind the active transition to the node.
  function bind(interval) {
    var s = d3_transform_stack;
    for (i = 0; i < m; ++i) {
      (o = nodes[i]).node.interval = interval;
    }
    try {
      d3.time = 0;
      d3_transform_stack = stack;
      d3_transform_transition_bind(actions, nodes);
    } finally {
      delete d3.time;
      d3_transform_stack = s;
    }
  }

  function tickOne() {
    var s = d3_transform_stack,
        a = nodes.filter(function(o) { return o.node.interval == interval; }),
        m = a.length,
        q = Date.now(),
        t,
        d = true;
    try {
      d3_transform_stack = stack;
      for (i = 0; i < m; ++i) {
        o = a[i];
        t = (q - start - o.delay) / duration;
        if (t < 0) continue;
        if (t > 1) t = 1;
        else d = false;
        d3.time = ease(t);
        for (j = 0; j < n; ++j) actions[j].impl([o], d3_transform_impl);
        if (t == 1) {
          for (j = 0; j < k; ++j) endActions[j].impl([o], d3_transform_impl);
          o.delay = Infinity; // stop transitioning this node
        }
      }
    } finally {
      delete d3.time;
      d3_transform_stack = s;
    }
    if (d) clearInterval(interval);
  }

  function tickAll() {
    var s = d3_transform_stack,
        t = (Date.now() - start - delay) / duration,
        a = nodes.filter(function(o) { return o.node.interval == interval; });
    try {
      d3_transform_stack = stack;
      d3.time = ease(t < 0 ? 0 : t > 1 ? 1 : t);
      for (i = 0; i < n; ++i) actions[i].impl(a, d3_transform_impl);
    } finally {
      delete d3.time;
      d3_transform_stack = s;
    }
    if (t >= 1) {
      clearInterval(interval);
      try {
        d3_transform_stack = stack;
        for (i = 0; i < k; ++i) endActions[i].impl(a, d3_transform_impl);
      } finally {
        d3_transform_stack = s;
      }
    }
  }
}

function d3_transform_transition_bind(actions, nodes) {
  var n = actions.length,
      m = nodes.length,
      a, // current action
      i; // current index
  for (i = 0; i < m; ++i) {
    nodes[i].tween = {};
  }
  for (i = 0; i < n; ++i) {
    a = actions[i];
    if (a.bind) a.bind(nodes);
    a.impl(nodes, d3_transform_transition_bind);
  }
}
})(this);
