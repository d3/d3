<script setup>

import * as d3 from "d3";
import ColorRamp from "../components/ColorRamp.vue";
import ColorSwatches from "../components/ColorSwatches.vue";

</script>

# Value interpolation

These are the most general interpolators, suitable for most values.

## interpolate(*a*, *b*) {#interpolate}

[Examples](https://observablehq.com/@d3/d3-interpolate) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/value.js) · Returns an interpolator between the two arbitrary values *a* and *b*.

```js
d3.interpolate("red", "blue")(0.5) // "rgb(128, 0, 128)"
```

The interpolator implementation is based on the type of the end value *b*, using the following algorithm:

1. If *b* is null, undefined or a boolean, use the constant *b*.
2. If *b* is a number, use [interpolateNumber](#interpolateNumber).
3. If *b* is a [color](../d3-color.md#color) or a string coercible to a color, use [interpolateRgb](./color.md#interpolateRgb).
4. If *b* is a [date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), use [interpolateDate](#interpolateDate).
5. If *b* is a string, use [interpolateString](#interpolateString).
6. If *b* is a [typed array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) of numbers, use [interpolateNumberArray](#interpolateNumberArray).
7. If *b* is a generic [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray), use [interpolateArray](#interpolateArray).
8. If *b* is coercible to a number, use [interpolateNumber](#interpolateNumber).
9. Use [interpolateObject](#interpolateObject).

Based on the chosen interpolator, *a* is coerced to the suitable corresponding type.

## interpolateNumber(*a*, *b*) {#interpolateNumber}

[Examples](https://observablehq.com/@d3/d3-interpolatenumber) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/number.js) · Returns an interpolator between the two numbers *a* and *b*.

```js
d3.interpolateNumber(20, 620)(0.8) // 500
```

The returned interpolator is equivalent to:

```js
function interpolator(t) {
  return a * (1 - t) + b * t;
}
```

:::warning CAUTION
Avoid interpolating to or from the number zero when the interpolator is used to generate a string. When very small values are stringified, they may be converted to scientific notation, which is an invalid attribute or style property value in older browsers. For example, the number `0.0000001` is converted to the string `"1e-7"`. This is particularly noticeable with interpolating opacity. To avoid scientific notation, start or end the transition at 1e-6: the smallest value that is not stringified in scientific notation.
:::

## interpolateRound(*a*, *b*) {#interpolateRound}

[Examples](https://observablehq.com/@d3/d3-interpolatenumber) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/round.js) · Returns an interpolator between the two numbers *a* and *b*.

```js
d3.interpolateRound(20, 620)(0.821) // 513
```

The interpolator is similar to [interpolateNumber](#interpolateNumber) except it will round the resulting value to the nearest integer.

## interpolateString(*a*, *b*) {#interpolateString}

[Examples](https://observablehq.com/@d3/d3-interpolatestring) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/string.js) · Returns an interpolator between the two strings *a* and *b*.

```js
d3.interpolateString("20px", "32px")(0.5) // "26px"
```

The string interpolator finds numbers embedded in *a* and *b*, where each number is of the form understood by JavaScript. A few examples of numbers that will be detected within a string: `-1`, `42`, `3.14159`, and `6.0221413e+23`.

For each number embedded in *b*, the interpolator will attempt to find a corresponding number in *a*. If a corresponding number is found, a numeric interpolator is created using [interpolateNumber](#interpolateNumber). The remaining parts of the string *b* are used as a template: the static parts of the string *b* remain constant for the interpolation, with the interpolated numeric values embedded in the template.

For example, if *a* is `"300 12px sans-serif"`, and *b* is `"500 36px Comic-Sans"`, two embedded numbers are found. The remaining static parts (of string *b*) are a space between the two numbers (`" "`), and the suffix (`"px Comic-Sans"`). The result of the interpolator at *t* = 0.5 is `"400 24px Comic-Sans"`.

## interpolateDate(*a*, *b*) {#interpolateDate}

[Examples](https://observablehq.com/@d3/d3-interpolatedate) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/date.js) · Returns an interpolator between the two [dates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) *a* and *b*.

```js
d3.interpolateDate(new Date("2014-01-01"), new Date("2024-01-01"))(0.5) // 2019-01-01
```

:::warning CAUTION
**No defensive copy** of the returned date is created; the same Date instance is returned for every evaluation of the interpolator. No copy is made for performance reasons, as interpolators are often part of the inner loop of [animated transitions](../d3-transition.md).
:::

## interpolateArray(*a*, *b*) {#interpolateArray}

[Examples](https://observablehq.com/@d3/d3-interpolateobject) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/array.js) · Returns an interpolator between the two arrays *a* and *b*.

```js
d3.interpolateArray([0, 0, 0], [1, 2, 3])(0.5) // [0.5, 1, 1.5]
```

If *b* is a typed array (e.g., Float64Array), [interpolateNumberArray](#interpolateNumberArray) is called instead.

Internally, an array template is created that is the same length as *b*. For each element in *b*, if there exists a corresponding element in *a*, a generic interpolator is created for the two elements using [interpolate](#interpolate). If there is no such element, the static value from *b* is used in the template. Then, for the given parameter *t*, the template’s embedded interpolators are evaluated. The updated array template is then returned.

For example, if *a* is the array `[0, 1]` and *b* is the array `[1, 10, 100]`, then the result of the interpolator for *t* = 0.5 is the array `[0.5, 5.5, 100]`.

:::warning CAUTION
**No defensive copy** of the template array is created; modifications of the returned array may adversely affect subsequent evaluation of the interpolator. No copy is made for performance reasons; interpolators are often part of the inner loop of [animated transitions](../d3-transition.md).
:::

## interpolateNumberArray(*a*, *b*) {#interpolateNumberArray}

[Examples](https://observablehq.com/@d3/d3-interpolatenumberarray) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/numberArray.js) · Returns an interpolator between the two arrays of numbers *a* and *b*.

```js
d3.interpolateNumberArray([0, 1], Float64Array.of(1, 3))(0.5) // [0.5, 2]
```

Internally, an array template is created that is the same type and length as *b*. For each element in *b*, if there exists a corresponding element in *a*, the values are directly interpolated in the array template. If there is no such element, the static value from *b* is copied. The updated array template is then returned.

:::warning CAUTION
**No defensive copy** is made of the template array and the arguments *a* and *b*; modifications of these arrays may affect subsequent evaluation of the interpolator.
:::

## interpolateObject(*a*, *b*) {#interpolateObject}

[Examples](https://observablehq.com/@d3/d3-interpolateobject) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/object.js) · Returns an interpolator between the two objects *a* and *b*.

```js
d3.interpolateObject({x: 0, y: 1}, {x: 1, y: 10, z: 100})(0.5) // {x: 0.5, y: 5.5, z: 100}
```

Internally, an object template is created that has the same properties as *b*. For each property in *b*, if there exists a corresponding property in *a*, a generic interpolator is created for the two elements using [interpolate](#interpolate). If there is no such property, the static value from *b* is used in the template. Then, for the given parameter *t*, the template's embedded interpolators are evaluated and the updated object template is then returned.

For example, if *a* is the object `{x: 0, y: 1}` and *b* is the object `{x: 1, y: 10, z: 100}`, the result of the interpolator for *t* = 0.5 is the object `{x: 0.5, y: 5.5, z: 100}`.

Object interpolation is particularly useful for *dataspace interpolation*, where data is interpolated rather than attribute values. For example, you can interpolate an object which describes an arc in a pie chart, and then use [arc](../d3-shape/arc.md) to compute the new SVG path data.

:::warning CAUTION
**No defensive copy** of the template object is created; modifications of the returned object may adversely affect subsequent evaluation of the interpolator. No copy is made for performance reasons; interpolators are often part of the inner loop of [animated transitions](../d3-transition.md).
:::

## interpolateBasis(*values*) {#interpolateBasis}

[Examples](https://observablehq.com/@d3/d3-interpolatebasis) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/basis.js) · Returns a uniform nonrational B-spline interpolator through the specified array of *values*, which must be numbers.

```js
d3.interpolateBasis([0, 0.1, 0.4, 1])(0.5) // 0.2604166666666667
```

Implicit control points are generated such that the interpolator returns *values*[0] at *t* = 0 and *values*[*values*.length - 1] at *t* = 1. See also [curveBasis](../d3-shape/curve.md#curveBasis) and [interpolateRgbBasis](./color.md#interpolateRgbBasis).

## interpolateBasisClosed(*values*) {#interpolateBasisClosed}


[Examples](https://observablehq.com/@d3/d3-interpolatebasis) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/basisClosed.js) · Returns a uniform nonrational B-spline interpolator through the specified array of *values*, which must be numbers.

```js
d3.interpolateBasisClosed([0, 0.1, 0.4, 1])(0.5) // 0.45
```

The control points are implicitly repeated such that the resulting one-dimensional spline has cyclical C² continuity when repeated around *t* in [0,1]. See also [curveBasisClosed](../d3-shape/curve.md#curveBasisClosed) and [interpolateRgbBasisClosed](./color.md#interpolateRgbBasisClosed).

## interpolateDiscrete(*values*) {#interpolateDiscrete}

[Examples](https://observablehq.com/@d3/d3-interpolatediscrete) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/discrete.js) · Returns a discrete interpolator for the given array of *values*.

```js
d3.interpolateDiscrete(["red", "blue", "green"])(0.5) // "blue"
```

The returned interpolator maps *t* in [0, 1 / *n*) to *values*[0], *t* in [1 / *n*, 2 / *n*) to *values*[1], and so on, where *n* = *values*.length. In effect, this is a lightweight [quantize scale](../d3-scale/quantize.md) with a fixed domain of [0, 1].

## quantize(*interpolator*, *n*) {#quantize}

[Examples](https://observablehq.com/@d3/d3-quantize) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/quantize.js) · Returns *n* uniformly-spaced samples from the specified *interpolator*, where *n* is an integer greater than one.

<ColorSwatches :colors="d3.quantize(d3.interpolate('red', 'blue'), 4)" />

```js
d3.quantize(d3.interpolate("red", "blue"), 4) // ["rgb(255, 0, 0)", "rgb(170, 0, 85)", "rgb(85, 0, 170)", "rgb(0, 0, 255)"]
```

The first sample is always at *t* = 0, and the last sample is always at *t* = 1. This can be useful in generating a fixed number of samples from a given interpolator, such as to derive the range of a [quantize scale](../d3-scale/quantize.md) from a [continuous interpolator](../d3-scale-chromatic/sequential.md#interpolateWarm).

:::warning CAUTION
This method will not work with interpolators that do not return defensive copies of their output, such as [interpolateArray](#interpolateArray), [interpolateDate](#interpolateDate) and [interpolateObject](#interpolateObject). For those interpolators, you must wrap the interpolator and create a copy for each returned value.
:::

## piecewise(*interpolate*, *values*) {#piecewise}

[Examples](https://observablehq.com/@d3/d3-piecewise) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/piecewise.js) · Returns a piecewise interpolator, composing interpolators for each adjacent pair of *values*.

<ColorRamp :color="d3.piecewise(d3.interpolateRgb.gamma(2.2), ['red', 'green', 'blue'])" />

```js
d3.piecewise(d3.interpolateRgb.gamma(2.2), ["red", "green", "blue"])
```

If *interpolate* is not specified, defaults to [interpolate](#interpolate).

<ColorRamp :color="d3.piecewise(['red', 'green', 'blue'])" />

```js
d3.piecewise(["red", "green", "blue"])
```

The returned interpolator maps *t* in [0, 1 / (*n* - 1)] to *interpolate*(*values*[0], *values*[1]), *t* in [1 / (*n* - 1), 2 / (*n* - 1)] to *interpolate*(*values*[1], *values*[2]), and so on, where *n* = *values*.length. In effect, this is a lightweight [linear scale](../d3-scale/linear.md).
