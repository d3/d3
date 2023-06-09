<script setup>

import * as d3 from "d3";
import ColorRamp from "../components/ColorRamp.vue";

</script>

# Color interpolation

Interpolators for colors in various color spaces.

## interpolateRgb(*a*, *b*) {#interpolateRgb}

<ColorRamp :color="d3.interpolateRgb('purple', 'orange')" />

```js
d3.interpolateRgb("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/rgb.js) · Returns an RGB color space interpolator between the two colors *a* and *b* with a configurable [gamma](#interpolateColor_gamma). If the gamma is not specified, it defaults to 1.0. The colors *a* and *b* need not be in RGB; they will be converted to RGB using [d3.rgb](../d3-color.md#rgb). The return value of the interpolator is an RGB string.

## interpolateRgbBasis(*colors*) {#interpolateRgbBasis}

<ColorRamp :color="d3.interpolateRgbBasis(['purple', 'green', 'orange'])" />

```js
d3.interpolateRgbBasis(["purple", "green", "orange"])
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/rgb.js) · Returns a uniform nonrational B-spline interpolator through the specified array of *colors*, which are converted to [RGB color space](../d3-color.md#rgb). Implicit control points are generated such that the interpolator returns *colors*[0] at *t* = 0 and *colors*[*colors*.length - 1] at *t* = 1. Opacity interpolation is not currently supported. See also [d3.interpolateBasis](./value.md#interpolateBasis), and see [d3-scale-chromatic](../d3-scale-chromatic.md) for examples.

## interpolateRgbBasisClosed(*colors*) {#interpolateRgbBasisClosed}

<ColorRamp :color="d3.interpolateRgbBasisClosed(['purple', 'green', 'orange'])" />

```js
d3.interpolateRgbBasisClosed(["purple", "green", "orange"])
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/rgb.js) · Returns a uniform nonrational B-spline interpolator through the specified array of *colors*, which are converted to [RGB color space](../d3-color.md#rgb). The control points are implicitly repeated such that the resulting spline has cyclical C² continuity when repeated around *t* in [0,1]; this is useful, for example, to create cyclical color scales. Opacity interpolation is not currently supported. See also [d3.interpolateBasisClosed](./value.md#interpolateBasisClosed), and see [d3-scale-chromatic](../d3-scale-chromatic.md) for examples.

## interpolateHsl(*a*, *b*) {#interpolateHsl}

<ColorRamp :color="d3.interpolateHsl('purple', 'orange')" />

```js
d3.interpolateHsl("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/hsl.js) · Returns an HSL color space interpolator between the two colors *a* and *b*. The colors *a* and *b* need not be in HSL; they will be converted to HSL using [d3.hsl](../d3-color.md#hsl). If either color’s hue or saturation is NaN, the opposing color’s channel value is used. The shortest path between hues is used. The return value of the interpolator is an RGB string.

## interpolateHslLong(*a*, *b*) {#interpolateHslLong}

<ColorRamp :color="d3.interpolateHslLong('purple', 'orange')" />

```js
d3.interpolateHslLong("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/hsl.js) · Like [interpolateHsl](#interpolateHsl), but does not use the shortest path between hues.

## interpolateLab(*a*, *b*) {#interpolateLab}

<ColorRamp :color="d3.interpolateLab('purple', 'orange')" />

```js
d3.interpolateLab("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/lab.js) · Returns a [CIELAB color space](https://en.wikipedia.org/wiki/Lab_color_space#CIELAB) interpolator between the two colors *a* and *b*. The colors *a* and *b* need not be in CIELAB; they will be converted to CIELAB using [d3.lab](../d3-color.md#lab). The return value of the interpolator is an RGB string.

## interpolateHcl(*a*, *b*) {#interpolateHcl}

<ColorRamp :color="d3.interpolateHcl('purple', 'orange')" />

```js
d3.interpolateHcl("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/hcl.js) · Returns a [CIELCh<sub>ab</sub> color space](https://en.wikipedia.org/wiki/CIELAB_color_space#Cylindrical_representation:_CIELCh_or_CIEHLC) interpolator between the two colors *a* and *b*. The colors *a* and *b* need not be in CIELCh<sub>ab</sub>; they will be converted to CIELCh<sub>ab</sub> using [d3.hcl](../d3-color.md#hcl). If either color’s hue or chroma is NaN, the opposing color’s channel value is used. The shortest path between hues is used. The return value of the interpolator is an RGB string.

## interpolateHclLong(*a*, *b*) {#interpolateHclLong}

<ColorRamp :color="d3.interpolateHclLong('purple', 'orange')" />

```js
d3.interpolateHclLong("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/hcl.js) · Like [interpolateHcl](#interpolateHcl), but does not use the shortest path between hues.

## interpolateCubehelix(*a*, *b*) {#interpolateCubehelix}

<ColorRamp :color="d3.interpolateCubehelix('purple', 'orange')" />

```js
d3.interpolateCubehelix("purple", "orange")
```

<ColorRamp :color="d3.interpolateCubehelix.gamma(3)('purple', 'orange')" />

```js
d3.interpolateCubehelix.gamma(3)("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/cubehelix.js) · Returns a Cubehelix color space interpolator between the two colors *a* and *b* using a configurable [gamma](#interpolateColor_gamma). If the gamma is not specified, it defaults to 1.0. The colors *a* and *b* need not be in Cubehelix; they will be converted to Cubehelix using [d3.cubehelix](../d3-color.md#cubehelix). If either color’s hue or saturation is NaN, the opposing color’s channel value is used. The shortest path between hues is used. The return value of the interpolator is an RGB string.

## interpolateCubehelixLong(*a*, *b*) {#interpolateCubehelixLong}

<ColorRamp :color="d3.interpolateCubehelixLong('purple', 'orange')" />

```js
d3.interpolateCubehelixLong("purple", "orange")
```

<ColorRamp :color="d3.interpolateCubehelixLong.gamma(3)('purple', 'orange')" />

```js
d3.interpolateCubehelixLong.gamma(3)("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/cubehelix.js) · Like [interpolateCubehelix](#interpolateCubehelix), but does not use the shortest path between hues.

## *interpolateColor*.gamma(*gamma*) {#interpolateColor_gamma}

<ColorRamp :color="d3.interpolateRgb.gamma(2.2)('purple', 'orange')" />

```js
d3.interpolateRgb.gamma(2.2)("purple", "orange")
```

Given that *interpolate* is one of [interpolateRgb](#interpolateRgb), [interpolateCubehelix](#interpolateCubehelix) or [interpolateCubehelixLong](#interpolateCubehelixLong), returns a new interpolator factory of the same type using the specified *gamma*. See Eric Brasseur’s article, [Gamma error in picture scaling](http://www.ericbrasseur.org/gamma.html), for more on gamma correction.

## interpolateHue(*a*, *b*) {#interpolateHue}

```js
d3.interpolateHue(20, 340)(0.5) // 0
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/hue.js) · Returns an interpolator between the two hue angles *a* and *b*. If either hue is NaN, the opposing value is used. The shortest path between hues is used. The return value of the interpolator is a number in [0, 360).

Whereas standard interpolators blend from a starting value *a* at *t* = 0 to an ending value *b* at *t* = 1, spline interpolators smoothly blend multiple input values for *t* in [0,1] using piecewise polynomial functions. Only cubic uniform nonrational [B-splines](https://en.wikipedia.org/wiki/B-spline) are currently supported, also known as basis splines.
