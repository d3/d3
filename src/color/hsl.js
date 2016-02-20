import "color";
import "rgb";

d3.hsl = d3_hsl;

function d3_hsl(hue, saturation, lightness) {
  return this instanceof d3_hsl ? void (this.h = +hue, this.s = +saturation, this.l = +lightness)
      : arguments.length < 2 ? (hue instanceof d3_hsl ? new d3_hsl(hue.h, hue.s, hue.l)
      : d3_rgb_parse("" + hue, d3_rgb_hsl, d3_hsl))
      : new d3_hsl(hue, saturation, lightness);
}

var d3_hslPrototype = d3_hsl.prototype = new d3_color;

d3_hslPrototype.brighter = function(gammaFactor) {
  gammaFactor = Math.pow(0.7, arguments.length ? gammaFactor : 1);
  return new d3_hsl(this.h, this.s, this.l / gammaFactor);
};

d3_hslPrototype.darker = function(gammaFactor) {
  gammaFactor = Math.pow(0.7, arguments.length ? gammaFactor : 1);
  return new d3_hsl(this.h, this.s, gammaFactor * this.l);
};

d3_hslPrototype.rgb = function() {
  return d3_hsl_rgb(this.h, this.s, this.l);
};

function d3_hsl_rgb(hue, saturation, lightness) {
  var colorSpecMatch,
      colorSpecType;

  /* Some simple corrections for hue, saturation and lightness. */
  hue = isNaN(hue) ? 0 : (hue %= 360) < 0 ? hue + 360 : hue;
  saturation = isNaN(saturation) ? 0 : saturation < 0 ? 0 : saturation > 1 ? 1 : saturation;
  lightness = lightness < 0 ? 0 : lightness > 1 ? 1 : lightness;

  /* From FvD 13.37, CSS Color Module Level 3 */
  colorSpecType = lightness <= 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
  colorSpecMatch = 2 * lightness - colorSpecType;

  function generateColorSpecMatch(hue) {
    if (hue > 360) hue -= 360;
    else if (hue < 0) hue += 360;
    if (hue < 60) return colorSpecMatch + (colorSpecType - colorSpecMatch) * hue / 60;
    if (hue < 180) return colorSpecType;
    if (hue < 240) return colorSpecMatch + (colorSpecType - colorSpecMatch) * (240 - hue) / 60;
    return colorSpecMatch;
  }

  function generateRGBValue(hue) {
    return Math.round(generateColorSpecMatch(hue) * 255);
  }

  return new d3_rgb(generateRGBValue(hue + 120), generateRGBValue(hue), generateRGBValue(hue - 120));
}
