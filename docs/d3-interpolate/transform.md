# Transform interpolation

Interpolators for CSS and SVG transforms. The interpolation method is standardized by CSS: see [matrix decomposition for animation](http://www.w3.org/TR/css3-2d-transforms/#matrix-decomposition).

## interpolateTransformCss(*a*, *b*) {#interpolateTransformCss}

```js
d3.interpolateTransformCss("translateY(12px) scale(2)", "translateX(30px) rotate(5deg)")(0.5) // "translate(15px,6px) rotate(2.5deg) scale(1.5,1.5)"
```

[Examples](https://observablehq.com/@d3/d3-interpolatetransformcss) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/transform/index.js) · Returns an interpolator between the two 2D CSS transforms represented by *a* and *b*. Each transform is decomposed to a standard representation of translate, rotate, *x*-skew and scale; these component transformations are then interpolated.

## interpolateTransformSvg(*a*, *b*) {#interpolateTransformSvg}

```js
d3.interpolateTransformSvg("skewX(-60)", "skewX(60) translate(280,0)") // "translate(140,0) skewX(0)"
```

[Examples](https://observablehq.com/@d3/d3-interpolatetransformcss) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/transform/index.js) · Returns an interpolator between the two 2D SVG transforms represented by *a* and *b*. Each transform is decomposed to a standard representation of translate, rotate, *x*-skew and scale; these component transformations are then interpolated.
