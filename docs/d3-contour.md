# d3-contour

This library computes contour polygons by applying [marching squares](https://en.wikipedia.org/wiki/Marching_squares) to a rectangular array of numeric values. For example, here is Maungawhau’s topology (the classic `volcano` dataset and `terrain.colors` from R):

[<img alt="Volcano Contours" src="./img/volcano.gif" width="420" height="295">](https://observablehq.com/@d3/volcano-contours)

For each [threshold value](#contours_thresholds), the [contour generator](#_contours) constructs a GeoJSON MultiPolygon geometry object representing the area where the input values are greater than or equal to the threshold value. The geometry is in planar coordinates, where ⟨<i>i</i> + 0.5, <i>j</i> + 0.5⟩ corresponds to element <i>i</i> + <i>jn</i> in the input values array. Here is an example that loads a GeoTIFF of surface temperatures, and another that blurs a noisy monochrome PNG to produce smooth contours of cloud fraction:

[<img alt="GeoTiff Contours" src="./img/temperature.png" width="420" height="219">](https://observablehq.com/@d3/geotiff-contours)
[<img alt="Cloud Contours" src="./img/clouds.png" width="420" height="219">](https://observablehq.com/@d3/cloud-contours)

Since the contour polygons are GeoJSON, you can transform and display them using standard tools; see [d3.geoPath](https://github.com/d3/d3-geo/blob/main/README.md#geoPath), [d3.geoProject](https://github.com/d3/d3-geo-projection/blob/main/README.md#geoProject) and [d3.geoStitch](https://github.com/d3/d3-geo-projection/blob/main/README.md#geoStitch), for example. Here the above contours of surface temperature are displayed in the Natural Earth projection:

[<img alt="GeoTiff Contours II" src="./img/reprojection.png" width="420" height="219">](https://observablehq.com/@d3/geotiff-contours-ii)

Contour plots can also visualize continuous functions by sampling. Here is the Goldstein–Price function (a test function for global optimization) and a trippy animation of *sin*(*x* + *y*)*sin*(*x* - *y*):

[<img alt="Contours" src="./img/goldstein-price.png" width="420" height="219">](https://observablehq.com/@d3/contours)
[<img alt="Animated Contours" src="./img/sin-cos.png" width="420" height="219">](https://observablehq.com/@d3/animated-contours)

Contours can also show the [estimated density](#density-estimation) of point clouds, which is especially useful to avoid overplotting in large datasets. This library implements fast two-dimensional kernel density estimation; see [d3.contourDensity](#contourDensity). Here is a scatterplot showing the relationship between the idle duration and eruption duration for Old Faithful:

[<img alt="Density Contours" src="./img/faithful.png" width="420" height="219">](https://observablehq.com/@d3/density-contours)

And here is a density contour plot showing the relationship between the weight and price of 53,940 diamonds:

[<img alt="Density Contours" src="./img/diamonds.png" width="420" height="420">](https://observablehq.com/@d3/density-contours)

## Contours

### d3.contours()

[Source](./src/contours.js), [Examples](https://observablehq.com/collection/@d3/d3-contour)

Constructs a new contour generator with the default settings.

### contours(values)

[Source](./src/contours.js)

Computes the contours for the given array of *values*, returning an array of [GeoJSON](http://geojson.org/geojson-spec.html) [MultiPolygon](http://geojson.org/geojson-spec.html#multipolygon) [geometry objects](http://geojson.org/geojson-spec.html#geometry-objects). Each geometry object represents the area where the input <i>values</i> are greater than or equal to the corresponding [threshold value](#contours_thresholds); the threshold value for each geometry object is exposed as <i>geometry</i>.value.

The input *values* must be an array of length <i>n</i>×<i>m</i> where [<i>n</i>, <i>m</i>] is the contour generator’s [size](#contours_size); furthermore, each <i>values</i>[<i>i</i> + <i>jn</i>] must represent the value at the position ⟨<i>i</i>, <i>j</i>⟩. For example, to construct a 256×256 grid for the [Goldstein–Price function](https://en.wikipedia.org/wiki/Test_functions_for_optimization) where -2 ≤ <i>x</i> ≤ 2 and -2 ≤ <i>y</i> ≤ 1:

```js
var n = 256, m = 256, values = new Array(n * m);
for (var j = 0.5, k = 0; j < m; ++j) {
  for (var i = 0.5; i < n; ++i, ++k) {
    values[k] = goldsteinPrice(i / n * 4 - 2, 1 - j / m * 3);
  }
}

function goldsteinPrice(x, y) {
  return (1 + Math.pow(x + y + 1, 2) * (19 - 14 * x + 3 * x * x - 14 * y + 6 * x * x + 3 * y * y))
      * (30 + Math.pow(2 * x - 3 * y, 2) * (18 - 32 * x + 12 * x * x + 48 * y - 36 * x * y + 27 * y * y));
}
```

The returned geometry objects are typically passed to [d3.geoPath](https://github.com/d3/d3-geo/blob/main/README.md#geoPath) to display, using null or [d3.geoIdentity](https://github.com/d3/d3-geo/blob/main/README.md#geoIdentity) as the associated projection.

### contours.contour(values, threshold)

[Source](./src/contours.js), [Examples](https://observablehq.com/@d3/animated-contours)

Computes a single contour, returning a [GeoJSON](http://geojson.org/geojson-spec.html) [MultiPolygon](http://geojson.org/geojson-spec.html#multipolygon) [geometry object](http://geojson.org/geojson-spec.html#geometry-objects) representing the area where the input <i>values</i> are greater than or equal to the given [*threshold* value](#contours_thresholds); the threshold value for each geometry object is exposed as <i>geometry</i>.value.

The input *values* must be an array of length <i>n</i>×<i>m</i> where [<i>n</i>, <i>m</i>] is the contour generator’s [size](#contours_size); furthermore, each <i>values</i>[<i>i</i> + <i>jn</i>] must represent the value at the position ⟨<i>i</i>, <i>j</i>⟩. See [*contours*](#_contours) for an example.

### contours.size(size)

[Source](./src/contours.js), [Examples](https://observablehq.com/@d3/animated-contours)

If *size* is specified, sets the expected size of the input *values* grid to the [contour generator](#_contour) and returns the contour generator. The *size* is specified as an array \[<i>n</i>, <i>m</i>\] where <i>n</i> is the number of columns in the grid and <i>m</i> is the number of rows; *n* and *m* must be positive integers. If *size* is not specified, returns the current size which defaults to [1, 1].

### contours.smooth(smooth)

[Source](./src/contours.js), [Examples](https://observablehq.com/@d3/contours-smooth)

If *smooth* is specified, sets whether or not the generated contour polygons are smoothed using linear interpolation. If *smooth* is not specified, returns the current smoothing flag, which defaults to true.

### contours.thresholds(thresholds)

[Source](./src/contours.js), [Examples](https://observablehq.com/@d3/volcano-contours)

If *thresholds* is specified, sets the threshold generator to the specified function or array and returns this contour generator. If *thresholds* is not specified, returns the current threshold generator, which by default implements [Sturges’ formula](https://github.com/d3/d3-array/blob/main/README.md#thresholdSturges).

Thresholds are defined as an array of values [*x0*, *x1*, …]. The first [generated contour](#_contour) corresponds to the area where the input values are greater than or equal to *x0*; the second contour corresponds to the area where the input values are greater than or equal to *x1*, and so on. Thus, there is exactly one generated MultiPolygon geometry object for each specified threshold value; the threshold value is exposed as <i>geometry</i>.value.

If a *count* is specified instead of an array of *thresholds*, then the input values’ [extent](https://github.com/d3/d3-array/blob/main/README.md#extent) will be uniformly divided into approximately *count* bins; see [d3.ticks](https://github.com/d3/d3-array/blob/main/README.md#ticks).

## Density estimation

### d3.contourDensity()

[Source](./src/density.js), [Examples](https://observablehq.com/@d3/density-contours)

Constructs a new density estimator with the default settings.

### density(data)

[Source](./src/density.js)

Estimates the density contours for the given array of *data*, returning an array of [GeoJSON](http://geojson.org/geojson-spec.html) [MultiPolygon](http://geojson.org/geojson-spec.html#multipolygon) [geometry objects](http://geojson.org/geojson-spec.html#geometry-objects). Each geometry object represents the area where the estimated number of points per square pixel is greater than or equal to the corresponding [threshold value](#density_thresholds); the threshold value for each geometry object is exposed as <i>geometry</i>.value. The returned geometry objects are typically passed to [d3.geoPath](https://github.com/d3/d3-geo/blob/main/README.md#geoPath) to display, using null or [d3.geoIdentity](https://github.com/d3/d3-geo/blob/main/README.md#geoIdentity) as the associated projection. See also [d3.contours](#contours).

The *x*- and *y*-coordinate for each data point are computed using [*density*.x](#density_x) and [*density*.y](#density_y). In addition, [*density*.weight](#density_weight) indicates the relative contribution of each data point (default 1). The generated contours are only accurate within the estimator’s [defined size](#density_size).

### density.x(x)

[Source](./src/density.js), [Examples](https://observablehq.com/@d3/density-contours)

If *x* is specified, sets the *x*-coordinate accessor. If *x* is not specified, returns the current *x*-coordinate accessor, which defaults to:

```js
function x(d) {
  return d[0];
}
```

### density.y(y)

[Source](./src/density.js), [Examples](https://observablehq.com/@d3/density-contours)

If *y* is specified, sets the *y*-coordinate accessor. If *y* is not specified, returns the current *y*-coordinate accessor, which defaults to:

```js
function y(d) {
  return d[1];
}
```

### density.weight(weight)

[Source](./src/density.js)<!-- , [Examples](TBD) -->

If *weight* is specified, sets the accessor for point weights. If *weight* is not specified, returns the current point weight accessor, which defaults to:

```js
function weight() {
  return 1;
}
```

### density.size(size)

[Source](./src/density.js), [Examples](https://observablehq.com/@d3/density-contours)

If *size* is specified, sets the size of the density estimator to the specified bounds and returns the estimator. The *size* is specified as an array \[<i>width</i>, <i>height</i>\], where <i>width</i> is the maximum *x*-value and <i>height</i> is the maximum *y*-value. If *size* is not specified, returns the current size which defaults to [960, 500]. The [estimated density contours](#_density) are only accurate within the defined size.

### density.cellSize(cellSize)

[Source](./src/density.js)<!-- , [Examples](TBD) -->

If *cellSize* is specified, sets the size of individual cells in the underlying bin grid to the specified positive integer and returns the estimator. If *cellSize* is not specified, returns the current cell size, which defaults to 4. The cell size is rounded down to the nearest power of two. Smaller cells produce more detailed contour polygons, but are more expensive to compute.

### density.thresholds(thresholds)

[Source](./src/density.js), [Examples](https://observablehq.com/@d3/density-contours)

If *thresholds* is specified, sets the threshold generator to the specified function or array and returns this contour generator. If *thresholds* is not specified, returns the current threshold generator, which by default generates about twenty nicely-rounded density thresholds.

Thresholds are defined as an array of values [*x0*, *x1*, …]. The first [generated density contour](#_density) corresponds to the area where the estimated density is greater than or equal to *x0*; the second contour corresponds to the area where the estimated density is greater than or equal to *x1*, and so on. Thus, there is exactly one generated MultiPolygon geometry object for each specified threshold value; the threshold value is exposed as <i>geometry</i>.value. The first value *x0* should typically be greater than zero.

If a *count* is specified instead of an array of *thresholds*, then approximately *count* uniformly-spaced nicely-rounded thresholds will be generated; see [d3.ticks](https://github.com/d3/d3-array/blob/main/README.md#ticks).

### density.bandwidth(bandwidth)

[Source](./src/density.js), [Examples](https://observablehq.com/@d3/density-contours)

If *bandwidth* is specified, sets the bandwidth (the standard deviation) of the Gaussian kernel and returns the estimate. If *bandwidth* is not specified, returns the current bandwidth, which defaults to 20.4939…. The specified *bandwidth* is currently rounded to the nearest supported value by this implementation, and must be nonnegative.

### density.contours(data)

[Source](./src/density.js), [Examples](https://observablehq.com/@d3/density-contours-data)

Return a *contour*(*value*) function that can be used to compute an arbitrary contour on the given data without needing to recompute the underlying grid. The returned *contour* function also exposes a *contour*.max value which represents the maximum density of the grid.
