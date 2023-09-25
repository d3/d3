<script setup>

import * as d3 from "d3";
import ColorSpan from "./components/ColorSpan.vue";

</script>

# d3-color

Even though your browser understands a lot about colors, it doesn’t offer much help in manipulating colors through JavaScript. The d3-color module therefore provides representations for various color spaces, allowing specification, conversion and manipulation. (Also see [d3-interpolate](./d3-interpolate.md) for color interpolation.)

For example, take the named color <ColorSpan color="steelblue" />, which is <ColorSpan color="steelblue" format="rgb" /> in RGB:

```js
let c = d3.color("steelblue"); // {r: 70, g: 130, b: 180, opacity: 1}
```

To convert to HSL <ColorSpan color="steelblue" format="hsl" />:

```js
c = d3.hsl(c); // {h: 207.27…, s: 0.44, l: 0.4902…, opacity: 1}
```

To then rotate the hue by 90° <ColorSpan :color="(((c) => (c.h += 90, c))(d3.hsl('steelblue')))" format="hsl" />, increase the saturation by 20% <ColorSpan :color="(((c) => (c.h += 90, c.s += 0.2, c))(d3.hsl('steelblue')))" format="hsl" />, and format as an RGB string <ColorSpan :color="(((c) => (c.h += 90, c.s += 0.2, c))(d3.hsl('steelblue')))" />:

```js
c.h += 90;
c.s += 0.2;
c + ""; // rgb(198, 45, 205)
```

To fade the color slightly <ColorSpan :color="(((c) => (c.h += 90, c.s += 0.2, c.opacity = 0.8, c))(d3.hsl('steelblue')))" />:

```js
c.opacity = 0.8;
c + ""; // rgba(198, 45, 205, 0.8)
```

In addition to the ubiquitous and machine-friendly [RGB](#rgb) and [HSL](#hsl) color space, d3-color supports color spaces that are designed for humans:

* [CIELAB](#lab) (*a.k.a.* “Lab”)
* [CIELCh<sub>ab</sub>](#lch) (*a.k.a.* “LCh” or “HCL”)
* Dave Green’s [Cubehelix](#cubehelix)

Cubehelix features monotonic lightness, while CIELAB and its polar form CIELCh<sub>ab</sub> are perceptually uniform.

For additional color spaces, see:

* [d3-cam16](https://github.com/d3/d3-cam16)
* [d3-cam02](https://github.com/connorgr/d3-cam02)
* [d3-hsv](https://github.com/d3/d3-hsv)
* [d3-hcg](https://github.com/d3/d3-hcg)
* [d3-hsluv](https://github.com/petulla/d3-hsluv)

To measure color differences, see:

* [d3-color-difference](https://github.com/Evercoder/d3-color-difference)

## color(*specifier*) {#color}

```js
d3.color("steelblue") // {r: 70, g: 130, b: 180, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Parses the specified [CSS Color Module Level 3](http://www.w3.org/TR/css3-color/#colorunits) *specifier* string, returning an [RGB](#rgb) or [HSL](#hsl) color, along with [CSS Color Module Level 4 hex](https://www.w3.org/TR/css-color-4/#hex-notation) *specifier* strings. If the specifier was not valid, null is returned. Some examples:

* <ColorSpan color="rgb(255, 255, 255)" />
* <ColorSpan color="rgb(10%, 20%, 30%)" />
* <ColorSpan color="rgba(255, 255, 255, 0.4)" />
* <ColorSpan color="rgba(10%, 20%, 30%, 0.4)" />
* <ColorSpan color="hsl(120, 50%, 20%)" />
* <ColorSpan color="hsla(120, 50%, 20%, 0.4)" />
* <ColorSpan color="#ffeeaa" />
* <ColorSpan color="#fea" />
* <ColorSpan color="#ffeeaa22" />
* <ColorSpan color="#fea2" />
* <ColorSpan color="steelblue" />

The list of supported [named colors](http://www.w3.org/TR/SVG/types.html#ColorKeywords) is specified by CSS.

Note: this function may also be used with `instanceof` to test if an object is a color instance. The same is true of color subclasses, allowing you to test whether a color is in a particular color space.

## *color*.opacity {#color_opacity}

```js
d3.color("steelblue").opacity // 1
```

This color’s opacity, typically in the range [0, 1].

## *color*.rgb() {#color_rgb}

```js
d3.color("hsl(120, 50%, 20%)").rgb() // {r: 25.5, g: 76.5, b: 25.5, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Returns the [RGB equivalent](#rgb) of this color. For RGB colors, that’s `this`.

## *color*.copy(*values*) {#color_copy}

```js
d3.color("steelblue").copy({opacity: 0.5}) // {r: 70, g: 130, b: 180, opacity: 0.5}
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Returns a copy of this color. If *values* is specified, any enumerable own properties of *values* are assigned to the new returned color.

## *color*.brighter(*k*) {#color_brighter}

```js
d3.color("steelblue").brighter(1) // {r: 100, g: 185.71428571428572, b: 257.14285714285717, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Returns a brighter copy of this color. For example, if *k* is 1, <ColorSpan color="steelblue" /> in RGB color space becomes <ColorSpan :color="d3.rgb('steelblue').brighter()" />. The parameter *k* controls how much brighter the returned color should be (in arbitrary units); if *k* is not specified, it defaults to 1. The behavior of this method is dependent on the implementing color space.

## *color*.darker(*k*) {#color_darker}

```js
d3.color("steelblue").darker(1) // {r: 49, g: 91, b: 126, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Returns a darker copy of this color. For example, if *k* is 1, <ColorSpan color="steelblue" /> in RGB color space becomes <ColorSpan :color="d3.rgb('steelblue').darker()" />. The parameter *k* controls how much darker the returned color should be (in arbitrary units); if *k* is not specified, it defaults to 1. The behavior of this method is dependent on the implementing color space.

## *color*.displayable() {#color_displayable}

```js
d3.color("steelblue").displayable(1) // true
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Returns true if and only if the color is displayable on standard hardware. For example, this returns false for an RGB color if any channel value is less than zero or greater than 255 when rounded, or if the opacity is not in the range [0, 1].

## *color*.formatHex() {#color_formatHex}

```js
d3.color("steelblue").formatHex() // "#4682b4"
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Returns a hexadecimal string representing this color in RGB space, such as <ColorSpan color="steelblue" format="hex" />. If this color is not displayable, a suitable displayable color is returned instead. For example, RGB channel values greater than 255 are clamped to 255.

## *color*.formatHex8() {#color_formatHex8}

```js
d3.color("steelblue").formatHex8() // "#4682b4ff"
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Returns a hexadecimal string representing this color in RGBA space, such as <ColorSpan :color="d3.rgb('steelblue').copy({opacity: 0.8})" format="hex8" />. If this color is not displayable, a suitable displayable color is returned instead. For example, RGB channel values greater than 255 are clamped to 255.

## *color*.formatHsl() {#color_formatHsl}

```js
d3.color("yellow").formatHsl() // "hsl(60, 100%, 50%)"
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Returns a string representing this color according to the [CSS Color Module Level 3 specification](https://www.w3.org/TR/css-color-3/#hsl-color), such as <ColorSpan color="hsl(257, 50%, 80%)" /> or <ColorSpan color="hsla(257, 50%, 80%, 0.2)" />. If this color is not displayable, a suitable displayable color is returned instead by clamping S and L channel values to the interval [0, 100].

## *color*.formatRgb() {#color_formatRgb}

```js
d3.color("yellow").formatRgb() // "rgb(255, 255, 0)"
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Returns a string representing this color according to the [CSS Object Model specification](https://drafts.csswg.org/cssom/#serialize-a-css-component-value), such as <ColorSpan color="rgb(247, 234, 186)" /> or <ColorSpan color="rgba(247, 234, 186, 0.2)" />. If this color is not displayable, a suitable displayable color is returned instead by clamping RGB channel values to the interval [0, 255].

## *color*.toString() {#color_toString}

```js
d3.color("yellow").toString() // "rgb(255, 255, 0)"
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · An alias for [*color*.formatRgb](#color_formatRgb).

## rgb(*color*) {#rgb}

```js
d3.rgb("hsl(60, 100%, 50%)") // {r: 255, g: 255, b: 0, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Constructs a new [RGB](https://en.wikipedia.org/wiki/RGB_color_model) color. The channel values are exposed as `r`, `g` and `b` properties on the returned instance. Use the [RGB color picker](https://observablehq.com/@d3/rgb-color-picker) to explore this color space.

If *r*, *g* and *b* are specified, these represent the channel values of the returned color; an *opacity* may also be specified. If a CSS Color Module Level 3 *specifier* string is specified, it is parsed and then converted to the RGB color space. See [color](#color) for examples. If a [*color*](#color) instance is specified, it is converted to the RGB color space using [*color*.rgb](#color_rgb). Note that unlike [*color*.rgb](#color_rgb) this method *always* returns a new instance, even if *color* is already an RGB color.

## *rgb*.clamp() {#rgb_clamp}

```js
d3.rgb(300, 200, 100).clamp() // {r: 255, g: 200, b: 100, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Returns a new RGB color where the `r`, `g`, and `b` channels are clamped to the range [0, 255] and rounded to the nearest integer value, and the `opacity` is clamped to the range [0, 1].

## hsl(*color*) {#hsl}

```js
d3.hsl("yellow") // {h: 60, s: 1, l: 0.5, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Constructs a new [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV) color. The channel values are exposed as `h`, `s` and `l` properties on the returned instance. Use the [HSL color picker](https://observablehq.com/@d3/hsl-color-picker) to explore this color space.

If *h*, *s* and *l* are specified, these represent the channel values of the returned color; an *opacity* may also be specified. If a CSS Color Module Level 3 *specifier* string is specified, it is parsed and then converted to the HSL color space. See [color](#color) for examples. If a [*color*](#color) instance is specified, it is converted to the RGB color space using [*color*.rgb](#color_rgb) and then converted to HSL. (Colors already in the HSL color space skip the conversion to RGB.)

## *hsl*.clamp() {#hsl_clamp}

```js
d3.hsl(400, 2, 0.5).clamp() // {h: 40, s: 1, l: 0.5, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/color.js) · Returns a new HSL color where the `h` channel is clamped to the range [0, 360), and the `s`, `l`, and `opacity` channels are clamped to the range [0, 1].

## lab(*color*) {#lab}

```js
d3.lab("red") // {l: 54.29173376861782, a: 80.8124553179771, b: 69.88504032350531, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/lab.js) · Constructs a new [CIELAB](https://en.wikipedia.org/wiki/Lab_color_space#CIELAB) color. The channel values are exposed as `l`, `a` and `b` properties on the returned instance. Use the [CIELAB color picker](https://observablehq.com/@d3/lab-color-picker) to explore this color space. The value of *l* is typically in the range [0, 100], while *a* and *b* are typically in [-160, +160].

If *l*, *a* and *b* are specified, these represent the channel values of the returned color; an *opacity* may also be specified. If a CSS Color Module Level 3 *specifier* string is specified, it is parsed and then converted to the CIELAB color space. See [color](#color) for examples. If a [*color*](#color) instance is specified, it is converted to the RGB color space using [*color*.rgb](#color_rgb) and then converted to CIELAB. (Colors already in the CIELAB color space skip the conversion to RGB, and colors in the HCL color space are converted directly to CIELAB.)

## gray(*l*, *opacity*) {#gray}

```js
d3.gray(50) // {l: 50, a: 0, b: 0, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/lab.js) · Constructs a new [CIELAB](#lab) color with the specified *l* value and *a* = *b* = 0.

## hcl(*color*) {#hcl}

```js
d3.hcl("yellow") // {h: 99.57458688693687, c: 94.70776566727464, l: 97.60712516622824, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/lab.js) · Equivalent to [d3.lch](#lch), but with reversed argument order.

## lch(*color*) {#lch}

```js
d3.lch("yellow") // {h: 99.57458688693687, c: 94.70776566727464, l: 97.60712516622824, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/lab.js) · Constructs a new [CIELCh<sub>ab</sub>](https://en.wikipedia.org/wiki/CIELAB_color_space#Cylindrical_representation:_CIELCh_or_CIEHLC) color. The channel values are exposed as `l`, `c` and `h` properties on the returned instance. Use the [CIELCh<sub>ab</sub> color picker](https://observablehq.com/@d3/hcl-color-picker) to explore this color space. The value of *l* is typically in the range [0, 100], *c* is typically in [0, 230], and *h* is typically in [0, 360).

If *l*, *c*, and *h* are specified, these represent the channel values of the returned color; an *opacity* may also be specified. If a CSS Color Module Level 3 *specifier* string is specified, it is parsed and then converted to CIELCh<sub>ab</sub> color space. See [color](#color) for examples. If a [*color*](#color) instance is specified, it is converted to the RGB color space using [*color*.rgb](#color_rgb) and then converted to CIELCh<sub>ab</sub>. (Colors already in CIELCh<sub>ab</sub> color space skip the conversion to RGB, and colors in CIELAB color space are converted directly to CIELCh<sub>ab</sub>.)

## cubehelix(*color*) {#cubehelix}

```js
d3.cubehelix("yellow") // {h: 56.942171677321085, s: 4.614386868039714, l: 0.8900004504279901, opacity: 1}
```

[Source](https://github.com/d3/d3-color/blob/main/src/cubehelix.js) · Constructs a new [Cubehelix](http://www.mrao.cam.ac.uk/~dag/CUBEHELIX/) color. The channel values are exposed as `h`, `s` and `l` properties on the returned instance.

If *h*, *s* and *l* are specified, these represent the channel values of the returned color; an *opacity* may also be specified. If a CSS Color Module Level 3 *specifier* string is specified, it is parsed and then converted to the Cubehelix color space. See [color](#color) for examples. If a [*color*](#color) instance is specified, it is converted to the RGB color space using [*color*.rgb](#color_rgb) and then converted to Cubehelix. (Colors already in the Cubehelix color space skip the conversion to RGB.)
