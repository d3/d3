<script setup>

import * as d3 from "d3";
import ColorRamp from "./components/ColorRamp.vue";

</script>

# d3-interpolate

This module provides a variety of interpolation methods for blending between two values. Values may be numbers, colors, strings, arrays, or even deeply-nested objects. For example:

```js
const i = d3.interpolateNumber(10, 20);
i(0.0); // 10
i(0.2); // 12
i(0.5); // 15
i(1.0); // 20
```

The returned function `i` is called an *interpolator*. Given a starting value *a* and an ending value *b*, it takes a parameter *t* in the domain [0, 1] and returns the corresponding interpolated value between *a* and *b*. An interpolator typically returns a value equivalent to *a* at *t* = 0 and a value equivalent to *b* at *t* = 1.

You can interpolate more than just numbers. To find the perceptual midpoint between steelblue and brown:

```js
d3.interpolateLab("steelblue", "brown")(0.5); // "rgb(142, 92, 109)"
```

Here’s a more elaborate example demonstrating type inference used by [interpolate](#interpolate):

```js
const i = d3.interpolate({colors: ["red", "blue"]}, {colors: ["white", "black"]});
i(0.0); // {colors: ["rgb(255, 0, 0)", "rgb(0, 0, 255)"]}
i(0.5); // {colors: ["rgb(255, 128, 128)", "rgb(0, 0, 128)"]}
i(1.0); // {colors: ["rgb(255, 255, 255)", "rgb(0, 0, 0)"]}
```

Note that the generic value interpolator detects not only nested objects and arrays, but also color strings and numbers embedded in strings!

## interpolate(*a*, *b*) {#interpolate}

```js
d3.interpolate("red", "blue")(0.5) // "rgb(128, 0, 128)"
```

[Examples](https://observablehq.com/@d3/d3-interpolate) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/value.js) · Returns an interpolator between the two arbitrary values *a* and *b*. The interpolator implementation is based on the type of the end value *b*, using the following algorithm:

1. If *b* is null, undefined or a boolean, use the constant *b*.
2. If *b* is a number, use [interpolateNumber](#interpolateNumber).
3. If *b* is a [color](./d3-color.md#color) or a string coercible to a color, use [interpolateRgb](#interpolateRgb).
4. If *b* is a [date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), use [interpolateDate](#interpolateDate).
5. If *b* is a string, use [interpolateString](#interpolateString).
6. If *b* is a [typed array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) of numbers, use [interpolateNumberArray](#interpolateNumberArray).
7. If *b* is a generic [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray), use [interpolateArray](#interpolateArray).
8. If *b* is coercible to a number, use [interpolateNumber](#interpolateNumber).
9. Use [interpolateObject](#interpolateObject).

Based on the chosen interpolator, *a* is coerced to the suitable corresponding type.

## interpolateNumber(*a*, *b*) {#interpolateNumber}

```js
d3.interpolateNumber(20, 620)(0.8) // 500
```

[Examples](https://observablehq.com/@d3/d3-interpolatenumber) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/number.js) · Returns an interpolator between the two numbers *a* and *b*. The returned interpolator is equivalent to:

```js
function interpolator(t) {
  return a * (1 - t) + b * t;
}
```

Caution: avoid interpolating to or from the number zero when the interpolator is used to generate a string. When very small values are stringified, they may be converted to scientific notation, which is an invalid attribute or style property value in older browsers. For example, the number `0.0000001` is converted to the string `"1e-7"`. This is particularly noticeable with interpolating opacity. To avoid scientific notation, start or end the transition at 1e-6: the smallest value that is not stringified in scientific notation.

## interpolateRound(*a*, *b*) {#interpolateRound}

```js
d3.interpolateNumber(20, 620)(0.821) // 513
```

[Examples](https://observablehq.com/@d3/d3-interpolatenumber) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/round.js) · Returns an interpolator between the two numbers *a* and *b*; the interpolator is similar to [interpolateNumber](#interpolateNumber), except it will round the resulting value to the nearest integer.

## interpolateString(*a*, *b*) {#interpolateString}

```js
d3.interpolateString("20px", "32px")(0.5) // "26px"
```

[Examples](https://observablehq.com/@d3/d3-interpolatestring) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/string.js) · Returns an interpolator between the two strings *a* and *b*. The string interpolator finds numbers embedded in *a* and *b*, where each number is of the form understood by JavaScript. A few examples of numbers that will be detected within a string: `-1`, `42`, `3.14159`, and `6.0221413e+23`.

For each number embedded in *b*, the interpolator will attempt to find a corresponding number in *a*. If a corresponding number is found, a numeric interpolator is created using [interpolateNumber](#interpolateNumber). The remaining parts of the string *b* are used as a template: the static parts of the string *b* remain constant for the interpolation, with the interpolated numeric values embedded in the template.

For example, if *a* is `"300 12px sans-serif"`, and *b* is `"500 36px Comic-Sans"`, two embedded numbers are found. The remaining static parts (of string *b*) are a space between the two numbers (`" "`), and the suffix (`"px Comic-Sans"`). The result of the interpolator at *t* = 0.5 is `"400 24px Comic-Sans"`.

## interpolateDate(*a*, *b*) {#interpolateDate}

```js
d3.interpolateDate(new Date("2014-01-01"), new Date("2024-01-01"))(0.5) // 2019-01-01
```

[Examples](https://observablehq.com/@d3/d3-interpolatedate) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/date.js) · Returns an interpolator between the two [dates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) *a* and *b*.

Note: **no defensive copy** of the returned date is created; the same Date instance is returned for every evaluation of the interpolator. No copy is made for performance reasons; interpolators are often part of the inner loop of [animated transitions](./d3-transition.md).

## interpolateArray(*a*, *b*) {#interpolateArray}

```js
d3.interpolateArray([0, 0, 0], [1, 2, 3])(0.5) // [0.5, 1, 1.5]
```

[Examples](https://observablehq.com/@d3/d3-interpolateobject) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/array.js) · Returns an interpolator between the two arrays *a* and *b*. If *b* is a typed array (e.g., Float64Array), [interpolateNumberArray](#interpolateNumberArray) is called instead.

Internally, an array template is created that is the same length as *b*. For each element in *b*, if there exists a corresponding element in *a*, a generic interpolator is created for the two elements using [interpolate](#interpolate). If there is no such element, the static value from *b* is used in the template. Then, for the given parameter *t*, the template’s embedded interpolators are evaluated. The updated array template is then returned.

For example, if *a* is the array `[0, 1]` and *b* is the array `[1, 10, 100]`, then the result of the interpolator for *t* = 0.5 is the array `[0.5, 5.5, 100]`.

Note: **no defensive copy** of the template array is created; modifications of the returned array may adversely affect subsequent evaluation of the interpolator. No copy is made for performance reasons; interpolators are often part of the inner loop of [animated transitions](./d3-transition.md).

## interpolateNumberArray(*a*, *b*) {#interpolateNumberArray}

```js
d3.interpolateNumberArray([0, 1], Float64Array.of(1, 3))(0.5) // [0.5, 2]
```

[Examples](https://observablehq.com/@d3/d3-interpolatenumberarray) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/numberArray.js) · Returns an interpolator between the two arrays of numbers *a* and *b*. Internally, an array template is created that is the same type and length as *b*. For each element in *b*, if there exists a corresponding element in *a*, the values are directly interpolated in the array template. If there is no such element, the static value from *b* is copied. The updated array template is then returned.

Note: For performance reasons, **no defensive copy** is made of the template array and the arguments *a* and *b*; modifications of these arrays may affect subsequent evaluation of the interpolator.

## interpolateObject(*a*, *b*) {#interpolateObject}

```js
d3.interpolateObject({x: 0, y: 1}, {x: 1, y: 10, z: 100})(0.5) // {x: 0.5, y: 5.5, z: 100}
```

[Examples](https://observablehq.com/@d3/d3-interpolateobject) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/object.js) · Returns an interpolator between the two objects *a* and *b*. Internally, an object template is created that has the same properties as *b*. For each property in *b*, if there exists a corresponding property in *a*, a generic interpolator is created for the two elements using [interpolate](#interpolate). If there is no such property, the static value from *b* is used in the template. Then, for the given parameter *t*, the template's embedded interpolators are evaluated and the updated object template is then returned.

For example, if *a* is the object `{x: 0, y: 1}` and *b* is the object `{x: 1, y: 10, z: 100}`, the result of the interpolator for *t* = 0.5 is the object `{x: 0.5, y: 5.5, z: 100}`.

Object interpolation is particularly useful for *dataspace interpolation*, where data is interpolated rather than attribute values. For example, you can interpolate an object which describes an arc in a pie chart, and then use [d3.arc](./d3-shape.md#arc) to compute the new SVG path data.

Note: **no defensive copy** of the template object is created; modifications of the returned object may adversely affect subsequent evaluation of the interpolator. No copy is made for performance reasons; interpolators are often part of the inner loop of [animated transitions](./d3-transition.md).

## interpolateTransformCss(*a*, *b*) {#interpolateTransformCss}

```js
d3.interpolateTransformCss("translateY(12px) scale(2)", "translateX(30px) rotate(5deg)")(0.5) // "translate(15px,6px) rotate(2.5deg) scale(1.5,1.5)"
```

[Examples](https://observablehq.com/@d3/d3-interpolatetransformcss) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/transform/index.js) · Returns an interpolator between the two 2D CSS transforms represented by *a* and *b*. Each transform is decomposed to a standard representation of translate, rotate, *x*-skew and scale; these component transformations are then interpolated. This behavior is standardized by CSS: see [matrix decomposition for animation](http://www.w3.org/TR/css3-2d-transforms/#matrix-decomposition).

## interpolateTransformSvg(*a*, *b*) {#interpolateTransformSvg}

```js
d3.interpolateTransformSvg("skewX(-60)", "skewX(60) translate(280,0)") // "translate(140,0) skewX(0)"
```

[Examples](https://observablehq.com/@d3/d3-interpolatetransformcss) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/transform/index.js) · Returns an interpolator between the two 2D SVG transforms represented by *a* and *b*. Each transform is decomposed to a standard representation of translate, rotate, *x*-skew and scale; these component transformations are then interpolated. This behavior is standardized by CSS: see [matrix decomposition for animation](http://www.w3.org/TR/css3-2d-transforms/#matrix-decomposition).

## interpolateZoom(*a*, *b*) {#interpolateZoom}

```js
d3.interpolateZoom([30, 30, 40], [135, 85, 60])(0.5) // [72, 52, 126.04761005270991]
```

[Examples](https://observablehq.com/@d3/d3-interpolatezoom) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/zoom.js) · Returns an interpolator between the two views *a* and *b* of a two-dimensional plane, based on [“Smooth and efficient zooming and panning”](http://www.win.tue.nl/~vanwijk/zoompan.pdf) by Jarke J. van Wijk and Wim A.A. Nuij. Each view is defined as an array of three numbers: *cx*, *cy* and *width*. The first two coordinates *cx*, *cy* represent the center of the viewport; the last coordinate *width* represents the size of the viewport.

The returned interpolator exposes a *duration* property which encodes the recommended transition duration in milliseconds. This duration is based on the path length of the curved trajectory through *x,y* space. If you want a slower or faster transition, multiply this by an arbitrary scale factor (<i>V</i> as described in the original paper).

## *interpolateZoom*.rho(*rho*) {#interpolateZoom_rho}

```js
d3.interpolateZoom.rho(0.5)([30, 30, 40], [135, 85, 60])(0.5) // [72, 52, 51.09549882328188]
```

[Source](https://github.com/d3/d3-interpolate/blob/main/src/zoom.js) · Given a [zoom interpolator](#interpolateZoom), returns a new zoom interpolator using the specified curvature *rho*. When *rho* is close to 0, the interpolator is almost linear. The default curvature is sqrt(2).

## interpolateDiscrete(*values*) {#interpolateDiscrete}

```js
d3.interpolateDiscrete(["red", "blue", "green"])(0.5) // "blue"
```

[Examples](https://observablehq.com/@d3/d3-interpolatediscrete) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/discrete.js) · Returns a discrete interpolator for the given array of *values*. The returned interpolator maps *t* in [0, 1 / *n*) to *values*[0], *t* in [1 / *n*, 2 / *n*) to *values*[1], and so on, where *n* = *values*.length. In effect, this is a lightweight [quantize scale](./d3-scale.md#quantize-scales) with a fixed domain of [0, 1].

## quantize(*interpolator*, *n*) {#quantize}

```js
d3.quantize(d3.interpolate("red", "blue"), 4) // ["rgb(255, 0, 0)", "rgb(170, 0, 85)", "rgb(85, 0, 170)", "rgb(0, 0, 255)"]
```

[Examples](https://observablehq.com/@d3/d3-quantize) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/quantize.js) · Returns *n* uniformly-spaced samples from the specified *interpolator*, where *n* is an integer greater than one. The first sample is always at *t* = 0, and the last sample is always at *t* = 1. This can be useful in generating a fixed number of samples from a given interpolator, such as to derive the range of a [quantize scale](./d3-scale.md#quantize-scales) from a [continuous interpolator](./d3-scale-chromatic.md#interpolateWarm).

Caution: this method will not work with interpolators that do not return defensive copies of their output, such as [d3.interpolateArray](#interpolateArray), [d3.interpolateDate](#interpolateDate) and [d3.interpolateObject](#interpolateObject). For those interpolators, you must wrap the interpolator and create a copy for each returned value.

## interpolateRgb(*a*, *b*) {#interpolateRgb}

<ColorRamp n="256" :color="d3.interpolateRgb('purple', 'orange')" />

```js
d3.interpolateRgb("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/rgb.js) · Returns an RGB color space interpolator between the two colors *a* and *b* with a configurable [gamma](#interpolate_gamma). If the gamma is not specified, it defaults to 1.0. The colors *a* and *b* need not be in RGB; they will be converted to RGB using [d3.rgb](./d3-color.md#rgb). The return value of the interpolator is an RGB string.

## interpolateRgbBasis(*colors*) {#interpolateRgbBasis}

<ColorRamp n="256" :color="d3.interpolateRgbBasis(['purple', 'green', 'orange'])" />

```js
d3.interpolateRgbBasis(["purple", "green", "orange"])
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/rgb.js) · Returns a uniform nonrational B-spline interpolator through the specified array of *colors*, which are converted to [RGB color space](./d3-color.md#rgb). Implicit control points are generated such that the interpolator returns *colors*[0] at *t* = 0 and *colors*[*colors*.length - 1] at *t* = 1. Opacity interpolation is not currently supported. See also [d3.interpolateBasis](#interpolateBasis), and see [d3-scale-chromatic](./d3-scale-chromatic.md) for examples.

## interpolateRgbBasisClosed(*colors*) {#interpolateRgbBasisClosed}

<ColorRamp n="256" :color="d3.interpolateRgbBasisClosed(['purple', 'green', 'orange'])" />

```js
d3.interpolateRgbBasisClosed(["purple", "green", "orange"])
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/rgb.js) · Returns a uniform nonrational B-spline interpolator through the specified array of *colors*, which are converted to [RGB color space](./d3-color.md#rgb). The control points are implicitly repeated such that the resulting spline has cyclical C² continuity when repeated around *t* in [0,1]; this is useful, for example, to create cyclical color scales. Opacity interpolation is not currently supported. See also [d3.interpolateBasisClosed](#interpolateBasisClosed), and see [d3-scale-chromatic](./d3-scale-chromatic.md) for examples.

## interpolateHsl(*a*, *b*) {#interpolateHsl}

<ColorRamp n="256" :color="d3.interpolateHsl('purple', 'orange')" />

```js
d3.interpolateHsl("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/hsl.js) · Returns an HSL color space interpolator between the two colors *a* and *b*. The colors *a* and *b* need not be in HSL; they will be converted to HSL using [d3.hsl](./d3-color.md#hsl). If either color’s hue or saturation is NaN, the opposing color’s channel value is used. The shortest path between hues is used. The return value of the interpolator is an RGB string.

## interpolateHslLong(*a*, *b*) {#interpolateHslLong}

<ColorRamp n="256" :color="d3.interpolateHslLong('purple', 'orange')" />

```js
d3.interpolateHslLong("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/hsl.js) · Like [interpolateHsl](#interpolateHsl), but does not use the shortest path between hues.

## interpolateLab(*a*, *b*) {#interpolateLab}

<ColorRamp n="256" :color="d3.interpolateLab('purple', 'orange')" />

```js
d3.interpolateLab("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/lab.js) · Returns a [CIELAB color space](https://en.wikipedia.org/wiki/Lab_color_space#CIELAB) interpolator between the two colors *a* and *b*. The colors *a* and *b* need not be in CIELAB; they will be converted to CIELAB using [d3.lab](./d3-color.md#lab). The return value of the interpolator is an RGB string.

## interpolateHcl(*a*, *b*) {#interpolateHcl}

<ColorRamp n="256" :color="d3.interpolateHcl('purple', 'orange')" />

```js
d3.interpolateHcl("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/hcl.js) · Returns a [CIELCh<sub>ab</sub> color space](https://en.wikipedia.org/wiki/CIELAB_color_space#Cylindrical_representation:_CIELCh_or_CIEHLC) interpolator between the two colors *a* and *b*. The colors *a* and *b* need not be in CIELCh<sub>ab</sub>; they will be converted to CIELCh<sub>ab</sub> using [d3.hcl](./d3-color.md#hcl). If either color’s hue or chroma is NaN, the opposing color’s channel value is used. The shortest path between hues is used. The return value of the interpolator is an RGB string.

## interpolateHclLong(*a*, *b*) {#interpolateHclLong}

<ColorRamp n="256" :color="d3.interpolateHclLong('purple', 'orange')" />

```js
d3.interpolateHclLong("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/hcl.js) · Like [interpolateHcl](#interpolateHcl), but does not use the shortest path between hues.

## interpolateCubehelix(*a*, *b*) {#interpolateCubehelix}

<ColorRamp n="256" :color="d3.interpolateCubehelix('purple', 'orange')" />

```js
d3.interpolateCubehelix("purple", "orange")
```

<ColorRamp n="256" :color="d3.interpolateCubehelix.gamma(3)('purple', 'orange')" />

```js
d3.interpolateCubehelix.gamma(3)("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/cubehelix.js) · Returns a Cubehelix color space interpolator between the two colors *a* and *b* using a configurable [gamma](#interpolate_gamma). If the gamma is not specified, it defaults to 1.0. The colors *a* and *b* need not be in Cubehelix; they will be converted to Cubehelix using [d3.cubehelix](./d3-color.md#cubehelix). If either color’s hue or saturation is NaN, the opposing color’s channel value is used. The shortest path between hues is used. The return value of the interpolator is an RGB string.

## interpolateCubehelixLong(*a*, *b*) {#interpolateCubehelixLong}

<ColorRamp n="256" :color="d3.interpolateCubehelixLong('purple', 'orange')" />

```js
d3.interpolateCubehelixLong("purple", "orange")
```

<ColorRamp n="256" :color="d3.interpolateCubehelixLong.gamma(3)('purple', 'orange')" />

```js
d3.interpolateCubehelixLong.gamma(3)("purple", "orange")
```

[Examples](https://observablehq.com/@d3/working-with-color) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/cubehelix.js) · Like [interpolateCubehelix](#interpolateCubehelix), but does not use the shortest path between hues.

## *interpolateColor*.gamma(*gamma*) {#interpolateColor_gamma}

<ColorRamp n="256" :color="d3.interpolateRgb.gamma(2.2)('purple', 'orange')" />

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

## interpolateBasis(*values*) {#interpolateBasis}

```js
d3.interpolateBasis([0, 0.1, 0.4, 1])(0.5) // 0.2604166666666667
```

[Examples](https://observablehq.com/@d3/d3-interpolatebasis) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/basis.js) · Returns a uniform nonrational B-spline interpolator through the specified array of *values*, which must be numbers. Implicit control points are generated such that the interpolator returns *values*[0] at *t* = 0 and *values*[*values*.length - 1] at *t* = 1. See also [d3.curveBasis](./d3-shape.md#curveBasis).

## interpolateBasisClosed(*values*) {#interpolateBasisClosed}

```js
d3.interpolateBasisClosed([0, 0.1, 0.4, 1])(0.5) // 0.45
```

[Examples](https://observablehq.com/@d3/d3-interpolatebasis) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/basisClosed.js) · Returns a uniform nonrational B-spline interpolator through the specified array of *values*, which must be numbers. The control points are implicitly repeated such that the resulting one-dimensional spline has cyclical C² continuity when repeated around *t* in [0,1]. See also [d3.curveBasisClosed](./d3-shape.md#curveBasisClosed).

## piecewise(*interpolate*, *values*) {#piecewise}

<ColorRamp n="256" :color="d3.piecewise(d3.interpolateRgb.gamma(2.2), ['red', 'green', 'blue'])" />

```js
d3.piecewise(d3.interpolateRgb.gamma(2.2), ["red", "green", "blue"])
```

[Examples](https://observablehq.com/@d3/d3-piecewise) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/piecewise.js) · Returns a piecewise interpolator, composing interpolators for each adjacent pair of *values*. The returned interpolator maps *t* in [0, 1 / (*n* - 1)] to *interpolate*(*values*[0], *values*[1]), *t* in [1 / (*n* - 1), 2 / (*n* - 1)] to *interpolate*(*values*[1], *values*[2]), and so on, where *n* = *values*.length. In effect, this is a lightweight [linear scale](./d3-scale.md#linear-scales). If *interpolate* is not specified, defaults to [d3.interpolate](#interpolate).
