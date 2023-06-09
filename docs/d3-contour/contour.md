# Contour polygons

For each [threshold value](#contours_thresholds), the [contour generator](#_contours) constructs a GeoJSON MultiPolygon geometry object representing the area where the input values are greater than or equal to the threshold value. The geometry is in planar coordinates, where ⟨<i>i</i> + 0.5, <i>j</i> + 0.5⟩ corresponds to element <i>i</i> + <i>jn</i> in the input values array.

Here is an example that loads a GeoTIFF of surface temperatures, and another that blurs a noisy monochrome PNG to produce smooth contours of cloud fraction:

[<img alt="GeoTiff Contours" src="https://raw.githubusercontent.com/d3/d3-contour/main/img/temperature.png" width="420" height="219">](https://observablehq.com/@d3/geotiff-contours)

[<img alt="Cloud Contours" src="https://raw.githubusercontent.com/d3/d3-contour/main/img/clouds.png" width="420" height="219">](https://observablehq.com/@d3/cloud-contours)

Since the contour polygons are GeoJSON, you can transform and display them using standard tools; see [geoPath](../d3-geo/path.md#geoPath), [geoProject](https://github.com/d3/d3-geo-projection/blob/main/README.md#geoProject) and [geoStitch](https://github.com/d3/d3-geo-projection/blob/main/README.md#geoStitch), for example. Here the above contours of surface temperature are displayed in the Natural Earth projection:

[<img alt="GeoTiff Contours II" src="https://raw.githubusercontent.com/d3/d3-contour/main/img/reprojection.png" width="420" height="219">](https://observablehq.com/@d3/geotiff-contours-ii)

Contour plots can also visualize continuous functions by sampling. Here is the Goldstein–Price function (a test function for global optimization) and a trippy animation of *sin*(*x* + *y*)*sin*(*x* - *y*):

[<img alt="Contours" src="https://raw.githubusercontent.com/d3/d3-contour/main/img/goldstein-price.png" width="420" height="219">](https://observablehq.com/@d3/contours)

[<img alt="Animated Contours" src="https://raw.githubusercontent.com/d3/d3-contour/main/img/sin-cos.png" width="420" height="219">](https://observablehq.com/@d3/animated-contours)

## contours() {#contours}

[Examples](https://observablehq.com/collection/@d3/d3-contour) · [Source](https://github.com/d3/d3-contour/blob/main/src/contours.js) · Constructs a new contour generator with the default settings.

```js
const contours = d3.contours()
    .size([width, height])
    .thresholds([0, 1, 2, 3, 4]);
```

## *contours*(*values*) {#_contours}

[Source](https://github.com/d3/d3-contour/blob/main/src/contours.js) · Computes the contours for the given array of *values*, returning an array of [GeoJSON](http://geojson.org/geojson-spec.html) [MultiPolygon](http://geojson.org/geojson-spec.html#multipolygon) [geometry objects](http://geojson.org/geojson-spec.html#geometry-objects).

```js
const polygons = contours(grid);
```

Each geometry object represents the area where the input <i>values</i> are greater than or equal to the corresponding [threshold value](#contours_thresholds); the threshold value for each geometry object is exposed as <i>geometry</i>.value.

The input *values* must be an array of length <i>n</i>×<i>m</i> where [<i>n</i>, <i>m</i>] is the contour generator’s [size](#contours_size); furthermore, each <i>values</i>[<i>i</i> + <i>jn</i>] must represent the value at the position ⟨<i>i</i>, <i>j</i>⟩. For example, to construct a 256×256 grid for the [Goldstein–Price function](https://en.wikipedia.org/wiki/Test_functions_for_optimization) where -2 ≤ <i>x</i> ≤ 2 and -2 ≤ <i>y</i> ≤ 1:

```js
var n = 256, m = 256, values = new Array(n * m);
for (var j = 0.5, k = 0; j < m; ++j) {
  for (var i = 0.5; i < n; ++i, ++k) {
    values[k] = goldsteinPrice(i / n * 4 - 2, 1 - j / m * 3);
  }
}
```
```js
function goldsteinPrice(x, y) {
  return (1 + Math.pow(x + y + 1, 2) * (19 - 14 * x + 3 * x * x - 14 * y + 6 * x * x + 3 * y * y))
      * (30 + Math.pow(2 * x - 3 * y, 2) * (18 - 32 * x + 12 * x * x + 48 * y - 36 * x * y + 27 * y * y));
}
```

The returned geometry objects are typically passed to [geoPath](../d3-geo/path.md) to display, using null or [geoIdentity](../d3-geo/projection.md#geoIdentity) as the associated projection.

## *contours*.contour(*values*, *threshold*) {#contours_contour}

[Source](https://github.com/d3/d3-contour/blob/main/src/contours.js) · Computes a single contour, returning a [GeoJSON](http://geojson.org/geojson-spec.html) [MultiPolygon](http://geojson.org/geojson-spec.html#multipolygon) [geometry object](http://geojson.org/geojson-spec.html#geometry-objects) representing the area where the input <i>values</i> are greater than or equal to the given [*threshold* value](#contours_thresholds); the threshold value for each geometry object is exposed as <i>geometry</i>.value.

The input *values* must be an array of length <i>n</i>×<i>m</i> where [<i>n</i>, <i>m</i>] is the contour generator’s [size](#contours_size); furthermore, each <i>values</i>[<i>i</i> + <i>jn</i>] must represent the value at the position ⟨<i>i</i>, <i>j</i>⟩. See [*contours*](#_contours) for an example.

## *contours*.size(*size*) {#contours_size}

[Source](https://github.com/d3/d3-contour/blob/main/src/contours.js) · If *size* is specified, sets the expected size of the input *values* grid to the [contour generator](#_contours) and returns the contour generator. The *size* is specified as an array \[<i>n</i>, <i>m</i>\] where <i>n</i> is the number of columns in the grid and <i>m</i> is the number of rows; *n* and *m* must be positive integers. If *size* is not specified, returns the current size which defaults to [1, 1].

## *contours*.smooth(*smooth*) {#contours_smooth}

[Examples](https://observablehq.com/@d3/contours-smooth) · [Source](https://github.com/d3/d3-contour/blob/main/src/contours.js) · If *smooth* is specified, sets whether or not the generated contour polygons are smoothed using linear interpolation. If *smooth* is not specified, returns the current smoothing flag, which defaults to true.

## *contours*.thresholds(*thresholds*) {#contours_thresholds}

[Source](https://github.com/d3/d3-contour/blob/main/src/contours.js) · If *thresholds* is specified, sets the threshold generator to the specified function or array and returns this contour generator. If *thresholds* is not specified, returns the current threshold generator, which by default implements [Sturges’ formula](../d3-array/bin.md#thresholdSturges).

Thresholds are defined as an array of values [*x0*, *x1*, …]. The first generated contour corresponds to the area where the input values are greater than or equal to *x0*; the second contour corresponds to the area where the input values are greater than or equal to *x1*, and so on. Thus, there is exactly one generated MultiPolygon geometry object for each specified threshold value; the threshold value is exposed as <i>geometry</i>.value.

If a *count* is specified instead of an array of *thresholds*, then the input values’ [extent](../d3-array/summarize.md#extent) will be uniformly divided into approximately *count* bins; see [ticks](../d3-array/ticks.md#ticks).
