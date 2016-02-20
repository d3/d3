import "../arrays/map";
import "color";
import "hsl";
import "lab";
import "xyz";

d3.rgb = d3_rgb;

function d3_rgb(red, green, blue) {
  return this instanceof d3_rgb ? void (this.r = ~~red, this.g = ~~green, this.b = ~~blue)
      : arguments.length < 2 ? (red instanceof d3_rgb ? new d3_rgb(red.r, red.g, red.b)
      : d3_rgb_parse("" + red, d3_rgb, d3_hsl_rgb))
      : new d3_rgb(red, green, blue);
}

function d3_rgbNumber(value) {
  return new d3_rgb(value >> 16, value >> 8 & 0xff, value & 0xff);
}

function d3_rgbString(value) {
  return d3_rgbNumber(value) + "";
}

var d3_rgbPrototype = d3_rgb.prototype = new d3_color;

d3_rgbPrototype.brighter = function(gammaFactor) {
  gammaFactor = Math.pow(0.7, arguments.length ? gammaFactor : 1);
  var red = this.r,
      green = this.g,
      blue = this.b,
      i = 30;
  if (!red && !green && !blue) return new d3_rgb(i, i, i);
  if (red && red < i) red = i;
  if (green && green < i) green = i;
  if (blue && blue < i) blue = i;
  return new d3_rgb(Math.min(255, red / gammaFactor), Math.min(255, green / gammaFactor), Math.min(255, blue / gammaFactor));
};

d3_rgbPrototype.darker = function(gammaFactor) {
  gammaFactor = Math.pow(0.7, arguments.length ? gammaFactor : 1);
  return new d3_rgb(gammaFactor * this.r, gammaFactor * this.g, gammaFactor * this.b);
};

d3_rgbPrototype.hsl = function() {
  return d3_rgb_hsl(this.r, this.g, this.b);
};

d3_rgbPrototype.toString = function() {
  return "#" + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b);
};

function d3_rgb_hex(valueToConvert) {
  return valueToConvert < 0x10
      ? "0" + Math.max(0, valueToConvert).toString(16)
      : Math.min(255, valueToConvert).toString(16);
}

function d3_rgb_parse(format, rgb, hsl) {
  var red = 0, // red channel; int in [0, 255]
      green = 0, // green channel; int in [0, 255]
      blue = 0, // blue channel; int in [0, 255]
      colorSpecMatch, // CSS color specification match
      colorSpecType, // CSS color specification type (e.g., rgb)
      color;

  /* Handle hsl, rgb. */
  colorSpecMatch = /([a-z]+)\((.*)\)/.exec(format = format.toLowerCase());
  if (colorSpecMatch) {
    colorSpecType = colorSpecMatch[2].split(",");
    switch (colorSpecMatch[1]) {
      case "hsl": {
        return hsl(
          parseFloat(colorSpecType[0]), // degrees
          parseFloat(colorSpecType[1]) / 100, // percentage
          parseFloat(colorSpecType[2]) / 100 // percentage
        );
      }
      case "rgb": {
        return rgb(
          d3_rgb_parseNumber(colorSpecType[0]),
          d3_rgb_parseNumber(colorSpecType[1]),
          d3_rgb_parseNumber(colorSpecType[2])
        );
      }
    }
  }

  /* Named colors. */
  if (color = d3_rgb_names.get(format)) {
    return rgb(color.r, color.g, color.b);
  }

  /* Hexadecimal colors: #rgb and #rrggbb. */
  if (format != null && format.charAt(0) === "#" && !isNaN(color = parseInt(format.slice(1), 16))) {
    if (format.length === 4) {
      red = (color & 0xf00) >> 4; red = (red >> 4) | red;
      green = (color & 0xf0); green = (green >> 4) | green;
      blue = (color & 0xf); blue = (blue << 4) | blue;
    } else if (format.length === 7) {
      red = (color & 0xff0000) >> 16;
      green = (color & 0xff00) >> 8;
      blue = (color & 0xff);
    }
  }

  return rgb(red, green, blue);
}

function d3_rgb_hsl(red, green, blue) {
  var min = Math.min(red /= 255, green /= 255, blue /= 255),
      max = Math.max(red, green, blue),
      d = max - min,
      hue,
      saturation,
      lightness = (max + min) / 2;
  if (d) {
    saturation = lightness < 0.5 ? d / (max + min) : d / (2 - max - min);
    if (red == max) hue = (green - blue) / d + (green < blue ? 6 : 0);
    else if (green == max) hue = (blue - red) / d + 2;
    else hue = (red - green) / d + 4;
    hue *= 60;
  } else {
    hue = NaN;
    saturation = lightness > 0 && lightness < 1 ? 0 : hue;
  }
  return new d3_hsl(hue, saturation, lightness);
}

function d3_rgb_lab(red, green, blue) {
  red = d3_rgb_xyz(red);
  green = d3_rgb_xyz(green);
  blue = d3_rgb_xyz(blue);
  var x = d3_xyz_lab((0.4124564 * red + 0.3575761 * green + 0.1804375 * blue) / d3_lab_X),
      y = d3_xyz_lab((0.2126729 * red + 0.7151522 * green + 0.0721750 * blue) / d3_lab_Y),
      z = d3_xyz_lab((0.0193339 * red + 0.1191920 * green + 0.9503041 * blue) / d3_lab_Z);
  return d3_lab(116 * y - 16, 500 * (x - y), 200 * (y - z));
}

function d3_rgb_xyz(rgbValue) {
  return (rgbValue /= 255) <= 0.04045 ? rgbValue / 12.92 : Math.pow((rgbValue + 0.055) / 1.055, 2.4);
}

function d3_rgb_parseNumber(c) { // either integer or percentage
  var f = parseFloat(c);
  return c.charAt(c.length - 1) === "%" ? Math.round(f * 2.55) : f;
}

var d3_rgb_names = d3.map({
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
});

d3_rgb_names.forEach(function(key, value) {
  d3_rgb_names.set(key, d3_rgbNumber(value));
});
