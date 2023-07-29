# Paths

The geographic path generator, [geoPath](#geoPath), takes a given GeoJSON geometry or feature object and generates SVG path data string or [renders to a Canvas](https://observablehq.com/@d3/u-s-map-canvas). Paths can be used with [projections](./projection.md) or [transforms](./projection.md#geoTransform), or they can be used to render planar geometry directly to Canvas or SVG.

## geoPath(*projection*, *context*) {#geoPath}

[Source](https://github.com/d3/d3-geo/blob/main/src/path/index.js) · Creates a new geographic path generator with the default settings. If *projection* is specified, sets the [current projection](#path_projection). If *context* is specified, sets the [current context](#path_context).

```js
const path = d3.geoPath(projection); // for SVG
```
```js
const path = d3.geoPath(projection, context); // for canvas
```

## *path*(*object*, ...*arguments*) {#_path}

[Source](https://github.com/d3/d3-geo/blob/main/src/path/index.js) · Renders the given *object*, which may be any GeoJSON feature or geometry object:

* *Point* - a single position
* *MultiPoint* - an array of positions
* *LineString* - an array of positions forming a continuous line
* *MultiLineString* - an array of arrays of positions forming several lines
* *Polygon* - an array of arrays of positions forming a polygon (possibly with holes)
* *MultiPolygon* - a multidimensional array of positions forming multiple polygons
* *GeometryCollection* - an array of geometry objects
* *Feature* - a feature containing one of the above geometry objects
* *FeatureCollection* - an array of feature objects

The type *Sphere* is also supported, which is useful for rendering the outline of the globe; a sphere has no coordinates. Any additional *arguments* are passed along to the [pointRadius](#path_pointRadius) accessor.

To display multiple features, combine them into a feature collection:

```js
svg.append("path")
    .datum({type: "FeatureCollection", features: features})
    .attr("d", d3.geoPath());
```

Or use multiple path elements:

```js
svg.selectAll()
  .data(features)
  .join("path")
    .attr("d", d3.geoPath());
```

Separate path elements are typically slower than a single path element. However, distinct path elements are useful for styling and interaction (e.g., click or mouseover). Canvas rendering (see [*path*.context](#path_context)) is typically faster than SVG, but requires more effort to implement styling and interaction.

## *path*.area(*object*) {#path_area}

[Source](https://github.com/d3/d3-geo/blob/main/src/path/area.js) · Returns the projected planar area (typically in square pixels) for the specified GeoJSON *object*.

```js
path.area(california) // 17063.1671837991 px²
```

Point, MultiPoint, LineString and MultiLineString geometries have zero area. For Polygon and MultiPolygon geometries, this method first computes the area of the exterior ring, and then subtracts the area of any interior holes. This method observes any clipping performed by the [projection](#path_projection); see [*projection*.clipAngle](./projection.md#projection_clipAngle) and [*projection*.clipExtent](./projection.md#projection_clipExtent). This is the planar equivalent of [geoArea](./math.md#geoArea).

## *path*.bounds(*object*) {#path_bounds}

[Source](https://github.com/d3/d3-geo/blob/main/src/path/bounds.js) · Returns the projected planar bounding box (typically in pixels) for the specified GeoJSON *object*.

```js
path.bounds(california) // [[18.48513821663947, 159.95146883594333], [162.7651668852596, 407.09641570706725]]
```

The bounding box is represented by a two-dimensional array: \[\[*x₀*, *y₀*\], \[*x₁*, *y₁*\]\], where *x₀* is the minimum *x*-coordinate, *y₀* is the minimum y coordinate, *x₁* is maximum *x*-coordinate, and *y₁* is the maximum y coordinate. This is handy for, say, zooming in to a particular feature. (Note that in projected planar coordinates, the minimum latitude is typically the maximum *y*-value, and the maximum latitude is typically the minimum *y*-value.) This method observes any clipping performed by the [projection](#path_projection); see [*projection*.clipAngle](./projection.md#projection_clipAngle) and [*projection*.clipExtent](./projection.md#projection_clipExtent). This is the planar equivalent of [geoBounds](./math.md#geoBounds).

## *path*.centroid(*object*) {#path_centroid}

[Source](https://github.com/d3/d3-geo/blob/main/src/path/centroid.js) · Returns the projected planar centroid (typically in pixels) for the specified GeoJSON *object*.

```js
path.centroid(california) // [82.08679434495191, 288.14204870673404]
```

This is handy for, say, labeling state or county boundaries, or displaying a symbol map. For example, a [noncontiguous cartogram](https://observablehq.com/@d3/non-contiguous-cartogram) might scale each state around its centroid. This method observes any clipping performed by the [projection](#path_projection); see [*projection*.clipAngle](./projection.md#projection_clipAngle) and [*projection*.clipExtent](./projection.md#projection_clipExtent). This is the planar equivalent of [geoCentroid](./math.md#geoCentroid).

## *path*.digits(*digits*) {#path_digits}

[Source](https://github.com/d3/d3-geo/blob/main/src/path/index.js) · If *digits* is specified (as a non-negative number), sets the number of fractional digits for coordinates generated in SVG path strings.

```js
const path = d3.geoPath().digits(3);
```

If *projection* is not specified, returns the current number of digits, which defaults to 3.

```js
path.digits() // 3
```

This option only applies when the associated [*context*](#path_context) is null, as when this arc generator is used to produce [path data](http://www.w3.org/TR/SVG/paths.html#PathData).

## *path*.measure(*object*) {#path_measure}

[Source](https://github.com/d3/d3-geo/blob/main/src/path/measure.js) · Returns the projected planar length (typically in pixels) for the specified GeoJSON *object*.

```js
path.measure(california) // 825.7124297512761
```

Point and MultiPoint geometries have zero length. For Polygon and MultiPolygon geometries, this method computes the summed length of all rings. This method observes any clipping performed by the [projection](#path_projection); see [*projection*.clipAngle](./projection.md#projection_clipAngle) and [*projection*.clipExtent](./projection.md#projection_clipExtent). This is the planar equivalent of [geoLength](./math.md#geoLength).

## *path*.projection(*projection*) {#path_projection}

[Source](https://github.com/d3/d3-geo/blob/main/src/path/index.js) · If a *projection* is specified, sets the current projection to the specified projection.

```js
const path = d3.geoPath().projection(d3.geoAlbers());
```

If *projection* is not specified, returns the current projection.

```js
path.projection() // a d3.geoAlbers instance
```

The projection defaults to null, which represents the identity transformation: the input geometry is not projected and is instead rendered directly in raw coordinates. This can be useful for fast rendering of [pre-projected geometry](https://observablehq.com/@d3/u-s-map), or for fast rendering of the equirectangular projection.

The given *projection* is typically one of D3’s built-in [geographic projections](./projection.md); however, any object that exposes a [*projection*.stream](./projection.md#projection_stream) function can be used, enabling the use of [custom projections](https://observablehq.com/@d3/custom-cartesian-projection). See D3’s [transforms](./projection.md#geoTransform) for more examples of arbitrary geometric transformations.

## *path*.context(*context*) {#path_context}

[Source](https://github.com/d3/d3-geo/blob/main/src/path/index.js) · If *context* is specified, sets the current render context and returns the path generator.

```js
const context = canvas.getContext("2d");
const path = d3.geoPath().context(context);
```

If the *context* is null, then the [path generator](#_path) will return an SVG path string; if the context is non-null, the path generator will instead call methods on the specified context to render geometry. The context must implement the following subset of the [CanvasRenderingContext2D API](https://www.w3.org/TR/2dcontext/#canvasrenderingcontext2d):

* *context*.beginPath()
* *context*.moveTo(*x*, *y*)
* *context*.lineTo(*x*, *y*)
* *context*.arc(*x*, *y*, *radius*, *startAngle*, *endAngle*)
* *context*.closePath()

If a *context* is not specified, returns the current render context which defaults to null. See also [d3-path](../d3-path.md).

## *path*.pointRadius(*radius*) {#path_pointRadius}

[Source](https://github.com/d3/d3-geo/blob/main/src/path/index.js) · If *radius* is specified, sets the radius used to display Point and MultiPoint geometries to the specified number.

```js
const path = d3.geoPath().pointRadius(10);
```

If *radius* is not specified, returns the current radius accessor.

```js
path.pointRadius() // 10
```

The radius accessor defaults to 4.5. While the radius is commonly specified as a number constant, it may also be specified as a function which is computed per feature, being passed the any arguments passed to the [path generator](#_path). For example, if your GeoJSON data has additional properties, you might access those properties inside the radius function to vary the point size; alternatively, you could [symbol](../d3-shape/symbol.md) and a [projection](./projection.md) for greater flexibility.
