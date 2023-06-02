# Zoom interpolation

An interpolator for zooming smoothly between two views of a two-dimensional plane based on [“Smooth and efficient zooming and panning”](http://www.win.tue.nl/~vanwijk/zoompan.pdf) by Jarke J. van Wijk and Wim A.A. Nuij.

## interpolateZoom(*a*, *b*) {#interpolateZoom}

```js
d3.interpolateZoom([30, 30, 40], [135, 85, 60])(0.5) // [72, 52, 126.04761005270991]
```

[Examples](https://observablehq.com/@d3/d3-interpolatezoom) · [Source](https://github.com/d3/d3-interpolate/blob/main/src/zoom.js) · Returns an interpolator between the two views *a* and *b*. Each view is defined as an array of three numbers: *cx*, *cy* and *width*. The first two coordinates *cx*, *cy* represent the center of the viewport; the last coordinate *width* represents the size of the viewport.

The returned interpolator exposes a *interpolate*.duration property which encodes the recommended transition duration in milliseconds. This duration is based on the path length of the curved trajectory through *xy* space. If you want a slower or faster transition, multiply this by an arbitrary scale factor (<i>V</i> as described in the original paper).

## *interpolateZoom*.rho(*rho*) {#interpolateZoom_rho}

```js
d3.interpolateZoom.rho(0.5)([30, 30, 40], [135, 85, 60])(0.5) // [72, 52, 51.09549882328188]
```

[Source](https://github.com/d3/d3-interpolate/blob/main/src/zoom.js) · Given a [zoom interpolator](#interpolateZoom), returns a new zoom interpolator using the specified curvature *rho*. When *rho* is close to 0, the interpolator is almost linear. The default curvature is sqrt(2).
