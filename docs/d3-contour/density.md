# Density estimation

Contours can show the estimated density of point clouds, which is useful to avoid overplotting in large datasets. The [contourDensity](#contourDensity) method implements fast two-dimensional kernel density estimation.

Here is a scatterplot showing the relationship between the idle duration and eruption duration for Old Faithful:

[<img alt="Density Contours" src="https://raw.githubusercontent.com/d3/d3-contour/main/img/faithful.png" width="420" height="219">](https://observablehq.com/@d3/density-contours)

And here is a density contour plot showing the relationship between the weight and price of 53,940 diamonds:

[<img alt="Density Contours" src="https://raw.githubusercontent.com/d3/d3-contour/main/img/diamonds.png" width="420" height="420">](https://observablehq.com/@d3/density-contours)

## contourDensity() {#contourDensity}

[Examples](https://observablehq.com/@d3/density-contours) · [Source](https://github.com/d3/d3-contour/blob/main/src/density.js) · Constructs a new density estimator with the default settings.

## *density*(*data*) {#_density}

[Source](https://github.com/d3/d3-contour/blob/main/src/density.js) · Estimates the density contours for the given array of *data*, returning an array of [GeoJSON](http://geojson.org/geojson-spec.html) [MultiPolygon](http://geojson.org/geojson-spec.html#multipolygon) [geometry objects](http://geojson.org/geojson-spec.html#geometry-objects).

Each geometry object represents the area where the estimated number of points per square pixel is greater than or equal to the corresponding [threshold value](#density_thresholds); the threshold value for each geometry object is exposed as <i>geometry</i>.value. The returned geometry objects are typically passed to [geoPath](../d3-geo/path.md) to display, using null or [geoIdentity](../d3-geo/projection.md#geoIdentity) as the associated projection. See also [contours](./contour.md).

The x and y coordinate for each data point are computed using [*density*.x](#density_x) and [*density*.y](#density_y). In addition, [*density*.weight](#density_weight) indicates the relative contribution of each data point (default 1). The generated contours are only accurate within the estimator’s [defined size](#density_size).

## *density*.x(*x*) {#density_x}

[Source](https://github.com/d3/d3-contour/blob/main/src/density.js) · If *x* is specified, sets the *x*-coordinate accessor. If *x* is not specified, returns the current *x*-coordinate accessor, which defaults to:

```js
function x(d) {
  return d[0];
}
```

## *density*.y(*y*) {#density_y}

[Source](https://github.com/d3/d3-contour/blob/main/src/density.js) · If *y* is specified, sets the *y*-coordinate accessor. If *y* is not specified, returns the current *y*-coordinate accessor, which defaults to:

```js
function y(d) {
  return d[1];
}
```

## *density*.weight(*weight*) {#density_weight}

[Source](https://github.com/d3/d3-contour/blob/main/src/density.js) · If *weight* is specified, sets the accessor for point weights. If *weight* is not specified, returns the current point weight accessor, which defaults to:

```js
function weight() {
  return 1;
}
```

## *density*.size(*size*) {#density_size}

[Source](https://github.com/d3/d3-contour/blob/main/src/density.js) · If *size* is specified, sets the size of the density estimator to the specified bounds and returns the estimator. The *size* is specified as an array \[<i>width</i>, <i>height</i>\], where <i>width</i> is the maximum *x*-value and <i>height</i> is the maximum *y*-value. If *size* is not specified, returns the current size which defaults to [960, 500]. The [estimated density contours](#_density) are only accurate within the defined size.

## *density*.cellSize(*cellSize*) {#density_cellSize}

[Source](https://github.com/d3/d3-contour/blob/main/src/density.js) · If *cellSize* is specified, sets the size of individual cells in the underlying bin grid to the specified positive integer and returns the estimator. If *cellSize* is not specified, returns the current cell size, which defaults to 4. The cell size is rounded down to the nearest power of two. Smaller cells produce more detailed contour polygons, but are more expensive to compute.

## *density*.thresholds(*thresholds*) {#density_thresholds}

[Source](https://github.com/d3/d3-contour/blob/main/src/density.js) · If *thresholds* is specified, sets the threshold generator to the specified function or array and returns this contour generator. If *thresholds* is not specified, returns the current threshold generator, which by default generates about twenty nicely-rounded density thresholds.

Thresholds are defined as an array of values [*x0*, *x1*, …]. The first [generated density contour](#_density) corresponds to the area where the estimated density is greater than or equal to *x0*; the second contour corresponds to the area where the estimated density is greater than or equal to *x1*, and so on. Thus, there is exactly one generated MultiPolygon geometry object for each specified threshold value; the threshold value is exposed as <i>geometry</i>.value. The first value *x0* should typically be greater than zero.

If a *count* is specified instead of an array of *thresholds*, then approximately *count* uniformly-spaced nicely-rounded thresholds will be generated; see [ticks](../d3-array/ticks.md#ticks).

## *density*.bandwidth(*bandwidth*) {#density_bandwidth}

[Source](https://github.com/d3/d3-contour/blob/main/src/density.js) · If *bandwidth* is specified, sets the bandwidth (the standard deviation) of the Gaussian kernel and returns the estimate. If *bandwidth* is not specified, returns the current bandwidth, which defaults to 20.4939…. The specified *bandwidth* is currently rounded to the nearest supported value by this implementation, and must be nonnegative.

## *density*.contours(*data*) {#density_contours}

[Examples](https://observablehq.com/@d3/density-contours-data) · [Source](https://github.com/d3/d3-contour/blob/main/src/density.js) · Return a *contour*(*value*) function that can be used to compute an arbitrary contour on the given data without needing to recompute the underlying grid. The returned *contour* function also exposes a *contour*.max value which represents the maximum density of the grid.
