# d3-geo

Map projections are sometimes implemented as point transformations. For instance, spherical Mercator:

```js
function mercator(x, y) {
  return [x, Math.log(Math.tan(Math.PI / 4 + y / 2))];
}
```

This is a reasonable *mathematical* approach if your geometry consists of continuous, infinite point sets. Yet computers do not have infinite memory, so we must instead work with discrete geometry such as polygons and polylines!

Discrete geometry makes the challenge of projecting from the sphere to the plane much harder. The edges of a spherical polygon are [geodesics](https://en.wikipedia.org/wiki/Geodesic) (segments of great circles), not straight lines. Projected to the plane, geodesics are curves in all map projections except [gnomonic](#geoGnomonic), and thus accurate projection requires interpolation along each arc. D3 uses [adaptive sampling](https://observablehq.com/@d3/adaptive-sampling) inspired by a popular [line simplification method](https://bost.ocks.org/mike/simplify/) to balance accuracy and performance.

The projection of polygons and polylines must also deal with the topological differences between the sphere and the plane. Some projections require cutting geometry that [crosses the antimeridian](https://observablehq.com/@d3/antimeridian-cutting), while others require [clipping geometry to a great circle](https://observablehq.com/@d3/orthographic-shading).

Spherical polygons also require a [winding order convention](https://observablehq.com/@d3/winding-order) to determine which side of the polygon is the inside: the exterior ring for polygons smaller than a hemisphere must be clockwise, while the exterior ring for polygons [larger than a hemisphere](https://observablehq.com/@d3/oceans) must be anticlockwise. Interior rings representing holes must use the opposite winding order of their exterior ring. This winding order convention is also used by [TopoJSON](https://github.com/topojson) and [ESRI shapefiles](https://github.com/mbostock/shapefile); however, it is the **opposite** convention of GeoJSON’s [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.6). (Also note that standard GeoJSON WGS84 uses planar equirectangular coordinates, not spherical coordinates, and thus may require [stitching](https://github.com/d3/d3-geo-projection/blob/main/README.md#geostitch) to remove antimeridian cuts.)

D3’s approach affords great expressiveness: you can choose the right projection, and the right aspect, for your data. D3 supports a wide variety of common and [unusual map projections](https://github.com/d3/d3-geo-projection). For more, see Part 2 of [The Toolmaker’s Guide](https://vimeo.com/106198518#t=20m0s).

D3 uses [GeoJSON](http://geojson.org/geojson-spec.html) to represent geographic features in JavaScript. (See also [TopoJSON](https://github.com/mbostock/topojson), an extension of GeoJSON that is significantly more compact and encodes topology.) To convert shapefiles to GeoJSON, use [shp2json](https://github.com/mbostock/shapefile/blob/main/README.md#shp2json), part of the [shapefile package](https://github.com/mbostock/shapefile). See [Command-Line Cartography](https://medium.com/@mbostock/command-line-cartography-part-1-897aa8f8ca2c) for an introduction to d3-geo and related tools.

## Paths

The geographic path generator, [d3.geoPath](#geoPath), is similar to the shape generators in [d3-shape](https://github.com/d3/d3-shape): given a GeoJSON geometry or feature object, it generates an SVG path data string or [renders the path to a Canvas](https://observablehq.com/@d3/u-s-map-canvas). Canvas is recommended for dynamic or interactive projections to improve performance. Paths can be used with [projections](#projections) or [transforms](#transforms), or they can be used to render planar geometry directly to Canvas or SVG.

### d3.geoPath(projection, context)

[Source](https://github.com/d3/d3-geo/blob/main/src/path/index.js "Source")

Creates a new geographic path generator with the default settings. If *projection* is specified, sets the [current projection](#path_projection). If *context* is specified, sets the [current context](#path_context).

### path(object, arguments…)

[Source](https://github.com/d3/d3-geo/blob/main/src/path/index.js "Source")

Renders the given *object*, which may be any GeoJSON feature or geometry object:

* Point - a single position.
* MultiPoint - an array of positions.
* LineString - an array of positions forming a continuous line.
* MultiLineString - an array of arrays of positions forming several lines.
* Polygon - an array of arrays of positions forming a polygon (possibly with holes).
* MultiPolygon - a multidimensional array of positions forming multiple polygons.
* GeometryCollection - an array of geometry objects.
* Feature - a feature containing one of the above geometry objects.
* FeatureCollection - an array of feature objects.

The type *Sphere* is also supported, which is useful for rendering the outline of the globe; a sphere has no coordinates. Any additional *arguments* are passed along to the [pointRadius](#path_pointRadius) accessor.

To display multiple features, combine them into a feature collection:

```js
svg.append("path")
    .datum({type: "FeatureCollection", features: features})
    .attr("d", d3.geoPath());
```

Or use multiple path elements:

```js
svg.selectAll("path")
  .data(features)
  .enter().append("path")
    .attr("d", d3.geoPath());
```

Separate path elements are typically slower than a single path element. However, distinct path elements are useful for styling and interaction (e.g., click or mouseover). Canvas rendering (see [*path*.context](#path_context)) is typically faster than SVG, but requires more effort to implement styling and interaction.

### path.area(object)

[Source](https://github.com/d3/d3-geo/blob/main/src/path/area.js "Source")

Returns the projected planar area (typically in square pixels) for the specified GeoJSON *object*. Point, MultiPoint, LineString and MultiLineString geometries have zero area. For Polygon and MultiPolygon geometries, this method first computes the area of the exterior ring, and then subtracts the area of any interior holes. This method observes any clipping performed by the [projection](#path_projection); see [*projection*.clipAngle](#projection_clipAngle) and [*projection*.clipExtent](#projection_clipExtent). This is the planar equivalent of [d3.geoArea](#geoArea).

### path.bounds(object)

[Source](https://github.com/d3/d3-geo/blob/main/src/path/bounds.js "Source")

Returns the projected planar bounding box (typically in pixels) for the specified GeoJSON *object*. The bounding box is represented by a two-dimensional array: \[\[*x₀*, *y₀*\], \[*x₁*, *y₁*\]\], where *x₀* is the minimum *x*-coordinate, *y₀* is the minimum y coordinate, *x₁* is maximum *x*-coordinate, and *y₁* is the maximum y coordinate. This is handy for, say, zooming in to a particular feature. (Note that in projected planar coordinates, the minimum latitude is typically the maximum *y*-value, and the maximum latitude is typically the minimum *y*-value.) This method observes any clipping performed by the [projection](#path_projection); see [*projection*.clipAngle](#projection_clipAngle) and [*projection*.clipExtent](#projection_clipExtent). This is the planar equivalent of [d3.geoBounds](#geoBounds).

### path.centroid(object)

[Source](https://github.com/d3/d3-geo/blob/main/src/path/centroid.js "Source")

Returns the projected planar centroid (typically in pixels) for the specified GeoJSON *object*. This is handy for, say, labeling state or county boundaries, or displaying a symbol map. For example, a [noncontiguous cartogram](https://observablehq.com/@d3/non-contiguous-cartogram) might scale each state around its centroid. This method observes any clipping performed by the [projection](#path_projection); see [*projection*.clipAngle](#projection_clipAngle) and [*projection*.clipExtent](#projection_clipExtent). This is the planar equivalent of [d3.geoCentroid](#geoCentroid).

### path.digits(digits)

[Source](https://github.com/d3/d3-geo/blob/main/src/path/index.js "Source")

If *digits* is specified (as a non-negative number), sets the number of fractional digits for coordinates generated in SVG path strings. If *projection* is not specified, returns the current number of digits, which defaults to 3.

### path.measure(object)

[Source](https://github.com/d3/d3-geo/blob/main/src/path/measure.js "Source")

Returns the projected planar length (typically in pixels) for the specified GeoJSON *object*. Point and MultiPoint geometries have zero length. For Polygon and MultiPolygon geometries, this method computes the summed length of all rings. This method observes any clipping performed by the [projection](#path_projection); see [*projection*.clipAngle](#projection_clipAngle) and [*projection*.clipExtent](#projection_clipExtent). This is the planar equivalent of [d3.geoLength](#geoLength).

### path.projection(projection)

[Source](https://github.com/d3/d3-geo/blob/main/src/path/index.js "Source")

If a *projection* is specified, sets the current projection to the specified projection. If *projection* is not specified, returns the current projection, which defaults to null. The null projection represents the identity transformation: the input geometry is not projected and is instead rendered directly in raw coordinates. This can be useful for fast rendering of [pre-projected geometry](https://bl.ocks.org/mbostock/5557726), or for fast rendering of the equirectangular projection.

The given *projection* is typically one of D3’s built-in [geographic projections](#projections); however, any object that exposes a [*projection*.stream](#projection_stream) function can be used, enabling the use of [custom projections](https://bl.ocks.org/mbostock/5663666). See D3’s [transforms](#transforms) for more examples of arbitrary geometric transformations.

### path.context(context)

[Source](https://github.com/d3/d3-geo/blob/main/src/path/index.js "Source")

If *context* is specified, sets the current render context and returns the path generator. If the *context* is null, then the [path generator](#_path) will return an SVG path string; if the context is non-null, the path generator will instead call methods on the specified context to render geometry. The context must implement the following subset of the [CanvasRenderingContext2D API](https://www.w3.org/TR/2dcontext/#canvasrenderingcontext2d):

* *context*.beginPath()
* *context*.moveTo(*x*, *y*)
* *context*.lineTo(*x*, *y*)
* *context*.arc(*x*, *y*, *radius*, *startAngle*, *endAngle*)
* *context*.closePath()

If a *context* is not specified, returns the current render context which defaults to null.

### path.pointRadius(radius)

[Source](https://github.com/d3/d3-geo/blob/main/src/path/index.js "Source")

If *radius* is specified, sets the radius used to display Point and MultiPoint geometries to the specified number. If *radius* is not specified, returns the current radius accessor, which defaults to 4.5. While the radius is commonly specified as a number constant, it may also be specified as a function which is computed per feature, being passed the any arguments passed to the [path generator](#_path). For example, if your GeoJSON data has additional properties, you might access those properties inside the radius function to vary the point size; alternatively, you could [d3.symbol](https://github.com/d3/d3-shape#symbols) and a [projection](#geoProjection) for greater flexibility.

## Projections

Projections transform spherical polygonal geometry to planar polygonal geometry. D3 provides implementations of several classes of standard projections:

* [Azimuthal](#azimuthal-projections)
* [Composite](#composite-projections)
* [Conic](#conic-projections)
* [Cylindrical](#cylindrical-projections)

For many more projections, see [d3-geo-projection](https://github.com/d3/d3-geo-projection). You can implement [custom projections](#raw-projections) using [d3.geoProjection](#geoProjection) or [d3.geoProjectionMutator](#geoProjectionMutator).

### projection(point)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js "Source")

Returns a new array \[*x*, *y*\] (typically in pixels) representing the projected point of the given *point*. The point must be specified as a two-element array \[*longitude*, *latitude*\] in degrees. May return null if the specified *point* has no defined projected position, such as when the point is outside the clipping bounds of the projection.

### projection.invert(point)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js "Source")

Returns a new array \[*longitude*, *latitude*\] in degrees representing the unprojected point of the given projected *point*. The point must be specified as a two-element array \[*x*, *y*\] (typically in pixels). May return null if the specified *point* has no defined projected position, such as when the point is outside the clipping bounds of the projection.

This method is only defined on invertible projections.

### projection.stream(stream)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js "Source")

Returns a [projection stream](#streams) for the specified output *stream*. Any input geometry is projected before being streamed to the output stream. A typical projection involves several geometry transformations: the input geometry is first converted to radians, rotated on three axes, clipped to the small circle or cut along the antimeridian, and lastly projected to the plane with adaptive resampling, scale and translation.

### projection.preclip(preclip)

If *preclip* is specified, sets the projection’s spherical clipping to the specified function and returns the projection. If *preclip* is not specified, returns the current spherical clipping function (see [preclip](#preclip)).

### projection.postclip(postclip)

If *postclip* is specified, sets the projection’s cartesian clipping to the specified function and returns the projection. If *postclip* is not specified, returns the current cartesian clipping function (see [postclip](#postclip)).

### projection.clipAngle(angle)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js "Source")

If *angle* is specified, sets the projection’s clipping circle radius to the specified angle in degrees and returns the projection. If *angle* is null, switches to [antimeridian cutting](https://observablehq.com/@d3/antimeridian-cutting) rather than small-circle clipping. If *angle* is not specified, returns the current clip angle which defaults to null. Small-circle clipping is independent of viewport clipping via [*projection*.clipExtent](#projection_clipExtent).

See also [*projection*.preclip](#projection_preclip), [d3.geoClipAntimeridian](#geoClipAntimeridian), [d3.geoClipCircle](#geoClipCircle).

### projection.clipExtent(extent)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js "Source")

If *extent* is specified, sets the projection’s viewport clip extent to the specified bounds in pixels and returns the projection. The *extent* bounds are specified as an array \[\[<i>x₀</i>, <i>y₀</i>\], \[<i>x₁</i>, <i>y₁</i>\]\], where <i>x₀</i> is the left-side of the viewport, <i>y₀</i> is the top, <i>x₁</i> is the right and <i>y₁</i> is the bottom. If *extent* is null, no viewport clipping is performed. If *extent* is not specified, returns the current viewport clip extent which defaults to null. Viewport clipping is independent of small-circle clipping via [*projection*.clipAngle](#projection_clipAngle).

See also [*projection*.postclip](#projection_postclip), [d3.geoClipRectangle](#geoClipRectangle).

### projection.scale(scale)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js "Source")

If *scale* is specified, sets the projection’s scale factor to the specified value and returns the projection. If *scale* is not specified, returns the current scale factor; the default scale is projection-specific. The scale factor corresponds linearly to the distance between projected points; however, absolute scale factors are not equivalent across projections.

### projection.translate(translate)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js "Source")

If *translate* is specified, sets the projection’s translation offset to the specified two-element array [<i>t<sub>x</sub></i>, <i>t<sub>y</sub></i>] and returns the projection. If *translate* is not specified, returns the current translation offset which defaults to [480, 250]. The translation offset determines the pixel coordinates of the projection’s [center](#projection_center). The default translation offset places ⟨0°,0°⟩ at the center of a 960×500 area.

### projection.center(center)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js "Source")

If *center* is specified, sets the projection’s center to the specified *center*, a two-element array of [*longitude*, *latitude*] in degrees and returns the projection. If *center* is not specified, returns the current center, which defaults to ⟨0°,0°⟩.

### projection.angle(angle)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js "Source")

If *angle* is specified, sets the projection’s post-projection planar rotation angle to the specified *angle* in degrees and returns the projection. If *angle* is not specified, returns the projection’s current angle, which defaults to 0°. Note that it may be faster to rotate during rendering (e.g., using [*context*.rotate](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/rotate)) rather than during projection.

### projection.reflectX(reflect)

If *reflect* is specified, sets whether or not the *x*-dimension is reflected (negated) in the output. If *reflect* is not specified, returns true if *x*-reflection is enabled, which defaults to false. This can be useful to display sky and astronomical data with the orb seen from below: right ascension (eastern direction) will point to the left when North is pointing up.

### projection.reflectY(reflect)

If *reflect* is specified, sets whether or not the *y*-dimension is reflected (negated) in the output. If *reflect* is not specified, returns true if *y*-reflection is enabled, which defaults to false. This is especially useful for transforming from standard [spatial reference systems](https://en.wikipedia.org/wiki/Spatial_reference_system), which treat positive *y* as pointing up, to display coordinate systems such as Canvas and SVG, which treat positive *y* as pointing down.

### projection.rotate(angles)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js "Source")

If *rotation* is specified, sets the projection’s [three-axis spherical rotation](https://observablehq.com/@d3/three-axis-rotation) to the specified *angles*, which must be a two- or three-element array of numbers [*lambda*, *phi*, *gamma*] specifying the rotation angles in degrees about [each spherical axis](https://observablehq.com/@d3/three-axis-rotation). (These correspond to [yaw, pitch and roll](https://en.wikipedia.org/wiki/Aircraft_principal_axes).) If the rotation angle *gamma* is omitted, it defaults to 0. See also [d3.geoRotation](#geoRotation). If *rotation* is not specified, returns the current rotation which defaults [0, 0, 0].

### projection.precision(precision)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js "Source")

If *precision* is specified, sets the threshold for the projection’s [adaptive resampling](https://observablehq.com/@d3/adaptive-sampling) to the specified value in pixels and returns the projection. This value corresponds to the [Douglas–Peucker](https://en.wikipedia.org/wiki/Ramer–Douglas–Peucker_algorithm) distance. If *precision* is not specified, returns the projection’s current resampling precision which defaults to √0.5 ≅ 0.70710…

### projection.fitExtent(extent, object)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js "Source")

Sets the projection’s [scale](#projection_scale) and [translate](#projection_translate) to fit the specified GeoJSON *object* in the center of the given *extent*. The extent is specified as an array \[\[x₀, y₀\], \[x₁, y₁\]\], where x₀ is the left side of the bounding box, y₀ is the top, x₁ is the right and y₁ is the bottom. Returns the projection.

For example, to scale and translate the [New Jersey State Plane projection](https://bl.ocks.org/mbostock/5126418) to fit a GeoJSON object *nj* in the center of a 960×500 bounding box with 20 pixels of padding on each side:

```js
var projection = d3.geoTransverseMercator()
    .rotate([74 + 30 / 60, -38 - 50 / 60])
    .fitExtent([[20, 20], [940, 480]], nj);
```

Any [clip extent](#projection_clipExtent) is ignored when determining the new scale and translate. The [precision](#projection_precision) used to compute the bounding box of the given *object* is computed at an effective scale of 150.

### projection.fitSize(size, object)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js "Source")

A convenience method for [*projection*.fitExtent](#projection_fitExtent) where the top-left corner of the extent is [0, 0]. The following two statements are equivalent:

```js
projection.fitExtent([[0, 0], [width, height]], object);
projection.fitSize([width, height], object);
```

### projection.fitWidth(width, object)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js "Source")

A convenience method for [*projection*.fitSize](#projection_fitSize) where the height is automatically chosen from the aspect ratio of *object* and the given constraint on *width*.

### projection.fitHeight(height, object)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js "Source")

A convenience method for [*projection*.fitSize](#projection_fitSize) where the width is automatically chosen from the aspect ratio of *object* and the given constraint on *height*.

## Azimuthal projections

Azimuthal projections project the sphere directly onto a plane.

### d3.geoAzimuthalEqualArea()

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/azimuthalEqualArea.js "Source")
<br><a href="#geoAzimuthalEqualAreaRaw" name="geoAzimuthalEqualAreaRaw">#</a> d3.<b>geoAzimuthalEqualAreaRaw</b>

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/azimuthalEqualArea.png" width="480" height="250">](https://observablehq.com/@d3/azimuthal-equal-area)

The azimuthal equal-area projection.

### d3.geoAzimuthalEquidistant()

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/azimuthalEquidistant.js "Source")
<br><a href="#geoAzimuthalEquidistantRaw" name="geoAzimuthalEquidistantRaw">#</a> d3.<b>geoAzimuthalEquidistantRaw</b>

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/azimuthalEquidistant.png" width="480" height="250">](https://observablehq.com/@d3/azimuthal-equidistant)

The azimuthal equidistant projection.

### d3.geoGnomonic()

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/gnomonic.js "Source")
<br><a href="#geoGnomonicRaw" name="geoGnomonicRaw">#</a> d3.<b>geoGnomonicRaw</b>

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/gnomonic.png" width="480" height="250">](https://observablehq.com/@d3/gnomonic)

The gnomonic projection.

### d3.geoOrthographic()

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/orthographic.js "Source")
<br><a href="#geoOrthographicRaw" name="geoOrthographicRaw">#</a> d3.<b>geoOrthographicRaw</b>

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/orthographic.png" width="480" height="250">](https://observablehq.com/@d3/orthographic)

The orthographic projection.

### d3.geoStereographic()

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/stereographic.js "Source")
<br><a href="#geoStereographicRaw" name="geoStereographicRaw">#</a> d3.<b>geoStereographicRaw</b>

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/stereographic.png" width="480" height="250">](https://observablehq.com/@d3/stereographic)

The stereographic projection.

## Equal Earth projection

### d3.geoEqualEarth()

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/equalEarth.js "Source")
<br><a href="#geoEqualEarthRaw" name="geoEqualEarthRaw">#</a> d3.<b>geoEqualEarthRaw</b>

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/equalEarth.png" width="480" height="250">](https://observablehq.com/@d3/equal-earth)

The Equal Earth projection, by Bojan Šavrič _et al._, 2018.

## Composite projections

Composite consist of several projections that are composed into a single display. The constituent projections have fixed clip, center and rotation, and thus composite projections do not support [*projection*.center](#projection_center), [*projection*.rotate](#projection_rotate), [*projection*.clipAngle](#projection_clipAngle), or [*projection*.clipExtent](#projection_clipExtent).

### d3.geoAlbersUsa()

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/albersUsa.js "Source")

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/albersUsa.png" width="480" height="250">](https://observablehq.com/@d3/u-s-map)

This is a U.S.-centric composite projection of three [d3.geoConicEqualArea](#geoConicEqualArea) projections: [d3.geoAlbers](#geoAlbers) is used for the lower forty-eight states, and separate conic equal-area projections are used for Alaska and Hawaii. Note that the scale for Alaska is diminished: it is projected at 0.35× its true relative area. This diagram by Philippe Rivière illustrates how this projection uses two rectangular insets for Alaska and Hawaii:

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/albersUsa-parameters.png" width="480" height="250">](https://bl.ocks.org/Fil/7723167596af40d9159be34ffbf8d36b)

See [Albers USA with Territories](https://www.npmjs.com/package/geo-albers-usa-territories) for an extension to all US territories, and [d3-composite-projections](http://geoexamples.com/d3-composite-projections/) for more examples.

## Conic projections

Conic projections project the sphere onto a cone, and then unroll the cone onto the plane. Conic projections have [two standard parallels](#conic_parallels).

### conic.parallels(parallels)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/conic.js "Source")

The [two standard parallels](https://en.wikipedia.org/wiki/Map_projection#Conic) that define the map layout in conic projections.

### d3.geoAlbers()

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/albers.js "Source")

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/albers.png" width="480" height="250">](https://observablehq.com/@d3/u-s-map)

The Albers’ equal area-conic projection. This is a U.S.-centric configuration of [d3.geoConicEqualArea](#geoConicEqualArea).

### d3.geoConicConformal()

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/conicConformal.js "Source")
<br><a href="#geoConicConformalRaw" name="geoConicConformalRaw">#</a> d3.<b>geoConicConformalRaw</b>(<i>phi0</i>, <i>phi1</i>) [<>](https://github.com/d3/d3-geo/blob/main/src/projection/conicConformal.js "Source")

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/conicConformal.png" width="480" height="250">](https://observablehq.com/@d3/conic-conformal)

The conic conformal projection. The parallels default to [30°, 30°] resulting in flat top. See also [*conic*.parallels](#conic_parallels).

### d3.geoConicEqualArea()

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/conicEqualArea.js "Source")
<br><a href="#geoConicEqualAreaRaw" name="geoConicEqualAreaRaw">#</a> d3.<b>geoConicEqualAreaRaw</b>(<i>phi0</i>, <i>phi1</i>) [<>](https://github.com/d3/d3-geo/blob/main/src/projection/conicEqualArea.js "Source")

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/conicEqualArea.png" width="480" height="250">](https://observablehq.com/@d3/conic-equal-area)

The Albers’ equal-area conic projection. See also [*conic*.parallels](#conic_parallels).

### d3.geoConicEquidistant()

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/conicEquidistant.js "Source")
<br><a href="#geoConicEquidistantRaw" name="geoConicEquidistantRaw">#</a> d3.<b>geoConicEquidistantRaw</b>(<i>phi0</i>, <i>phi1</i>) [<>](https://github.com/d3/d3-geo/blob/main/src/projection/conicEquidistant.js "Source")

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/conicEquidistant.png" width="480" height="250">](https://observablehq.com/@d3/conic-equidistant)

The conic equidistant projection. See also [*conic*.parallels](#conic_parallels).

## Cylindrical projections

Cylindrical projections project the sphere onto a containing cylinder, and then unroll the cylinder onto the plane. [Pseudocylindrical projections](https://web.archive.org/web/20150928042327/http://www.progonos.com/furuti/MapProj/Normal/ProjPCyl/projPCyl.html) are a generalization of cylindrical projections.

### d3.geoEquirectangular()

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/equirectangular.js "Source")
<br><a href="#geoEquirectangularRaw" name="geoEquirectangularRaw">#</a> d3.<b>geoEquirectangularRaw</b>

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/equirectangular.png" width="480" height="250">](https://observablehq.com/@d3/equirectangular)

The equirectangular (plate carrée) projection.

### d3.geoMercator()

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/mercator.js "Source")
<br><a href="#geoMercatorRaw" name="geoMercatorRaw">#</a> d3.<b>geoMercatorRaw</b>

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/mercator.png" width="480" height="250">](https://observablehq.com/@d3/mercator)

The spherical Mercator projection. Defines a default [*projection*.clipExtent](#projection_clipExtent) such that the world is projected to a square, clipped to approximately ±85° latitude.

### d3.geoTransverseMercator()

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/transverseMercator.js "Source")
<br><a href="#geoTransverseMercatorRaw" name="geoTransverseMercatorRaw">#</a> d3.<b>geoTransverseMercatorRaw</b>

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/transverseMercator.png" width="480" height="250">](https://observablehq.com/@d3/transverse-mercator)

The transverse spherical Mercator projection. Defines a default [*projection*.clipExtent](#projection_clipExtent) such that the world is projected to a square, clipped to approximately ±85° latitude.

### d3.geoNaturalEarth1()

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/naturalEarth1.js "Source")
<br><a href="#geoNaturalEarth1Raw" name="geoNaturalEarth1Raw">#</a> d3.<b>geoNaturalEarth1Raw</b>

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/naturalEarth1.png" width="480" height="250">](https://observablehq.com/@d3/natural-earth)

The [Natural Earth projection](http://www.shadedrelief.com/NE_proj/) is a pseudocylindrical projection designed by Tom Patterson. It is neither conformal nor equal-area, but appealing to the eye for small-scale maps of the whole world.

## Raw projections

Raw projections are point transformation functions that are used to implement custom projections; they typically passed to [d3.geoProjection](#geoProjection) or [d3.geoProjectionMutator](#geoProjectionMutator). They are exposed here to facilitate the derivation of related projections. Raw projections take spherical coordinates \[*lambda*, *phi*\] in radians (not degrees!) and return a point \[*x*, *y*\], typically in the unit square centered around the origin.

### project(lambda, phi)

Projects the specified point [<i>lambda</i>, <i>phi</i>] in radians, returning a new point \[*x*, *y*\] in unitless coordinates.

### project.invert(x, y)

The inverse of [*project*](#_project).

### d3.geoProjection(project)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js "Source")

Constructs a new projection from the specified [raw projection](#_project), *project*. The *project* function takes the *longitude* and *latitude* of a given point in [radians](http://mathworld.wolfram.com/Radian.html), often referred to as *lambda* (λ) and *phi* (φ), and returns a two-element array \[*x*, *y*\] representing its unit projection. The *project* function does not need to scale or translate the point, as these are applied automatically by [*projection*.scale](#projection_scale), [*projection*.translate](#projection_translate), and [*projection*.center](#projection_center). Likewise, the *project* function does not need to perform any spherical rotation, as [*projection*.rotate](#projection_rotate) is applied prior to projection.

For example, a spherical Mercator projection can be implemented as:

```js
var mercator = d3.geoProjection(function(x, y) {
  return [x, Math.log(Math.tan(Math.PI / 4 + y / 2))];
});
```

If the *project* function exposes an *invert* method, the returned projection will also expose [*projection*.invert](#projection_invert).

### d3.geoProjectionMutator(factory)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js "Source")

Constructs a new projection from the specified [raw projection](#_project) *factory* and returns a *mutate* function to call whenever the raw projection changes. The *factory* must return a raw projection. The returned *mutate* function returns the wrapped projection. For example, a conic projection typically has two configurable parallels. A suitable *factory* function, such as [d3.geoConicEqualAreaRaw](#geoConicEqualAreaRaw), would have the form:

```js
// y0 and y1 represent two parallels
function conicFactory(phi0, phi1) {
  return function conicRaw(lambda, phi) {
    return […, …];
  };
}
```

Using d3.geoProjectionMutator, you can implement a standard projection that allows the parallels to be changed, reassigning the raw projection used internally by [d3.geoProjection](#geoProjection):

```js
function conicCustom() {
  var phi0 = 29.5,
      phi1 = 45.5,
      mutate = d3.geoProjectionMutator(conicFactory),
      projection = mutate(phi0, phi1);

  projection.parallels = function(_) {
    return arguments.length ? mutate(phi0 = +_[0], phi1 = +_[1]) : [phi0, phi1];
  };

  return projection;
}
```

When creating a mutable projection, the *mutate* function is typically not exposed.

## Spherical math

### d3.geoArea(object)

[Source](https://github.com/d3/d3-geo/blob/main/src/area.js "Source")

Returns the spherical area of the specified GeoJSON *object* in [steradians](https://en.wikipedia.org/wiki/Steradian). This is the spherical equivalent of [*path*.area](#path_area).

### d3.geoBounds(object)

[Source](https://github.com/d3/d3-geo/blob/main/src/bounds.js "Source")

Returns the [spherical bounding box](https://www.jasondavies.com/maps/bounds/) for the specified GeoJSON *object*. The bounding box is represented by a two-dimensional array: \[\[*left*, *bottom*], \[*right*, *top*\]\], where *left* is the minimum longitude, *bottom* is the minimum latitude, *right* is maximum longitude, and *top* is the maximum latitude. All coordinates are given in degrees. (Note that in projected planar coordinates, the minimum latitude is typically the maximum *y*-value, and the maximum latitude is typically the minimum *y*-value.) This is the spherical equivalent of [*path*.bounds](#path_bounds).

### d3.geoCentroid(object)

[Source](https://github.com/d3/d3-geo/blob/main/src/centroid.js "Source")

Returns the spherical centroid of the specified GeoJSON *object*. This is the spherical equivalent of [*path*.centroid](#path_centroid).

### d3.geoDistance(a, b)

[Source](https://github.com/d3/d3-geo/blob/main/src/distance.js "Source")

Returns the great-arc distance in [radians](http://mathworld.wolfram.com/Radian.html) between the two points *a* and *b*. Each point must be specified as a two-element array \[*longitude*, *latitude*\] in degrees. This is the spherical equivalent of [*path*.measure](#path_measure) given a LineString of two points.

### d3.geoLength(object)

[Source](https://github.com/d3/d3-geo/blob/main/src/length.js "Source")

Returns the great-arc length of the specified GeoJSON *object* in [radians](http://mathworld.wolfram.com/Radian.html). For polygons, returns the perimeter of the exterior ring plus that of any interior rings. This is the spherical equivalent of [*path*.measure](#path_measure).

### d3.geoInterpolate(a, b)

[Source](https://github.com/d3/d3-geo/blob/main/src/interpolate.js "Source")

Returns an interpolator function given two points *a* and *b*. Each point must be specified as a two-element array \[*longitude*, *latitude*\] in degrees. The returned interpolator function takes a single argument *t*, where *t* is a number ranging from 0 to 1; a value of 0 returns the point *a*, while a value of 1 returns the point *b*. Intermediate values interpolate from *a* to *b* along the great arc that passes through both *a* and *b*. If *a* and *b* are antipodes, an arbitrary great arc is chosen.

### d3.geoContains(object, point)

[Source](https://github.com/d3/d3-geo/blob/main/src/contains.js "Source")

Returns true if and only if the specified GeoJSON *object* contains the specified *point*, or false if the *object* does not contain the *point*. The point must be specified as a two-element array \[*longitude*, *latitude*\] in degrees. For Point and MultiPoint geometries, an exact test is used; for a Sphere, true is always returned; for other geometries, an epsilon threshold is applied.

### d3.geoRotation(angles)

[Source](https://github.com/d3/d3-geo/blob/main/src/rotation.js "Source")

Returns a [rotation function](#_rotation) for the given *angles*, which must be a two- or three-element array of numbers [*lambda*, *phi*, *gamma*] specifying the rotation angles in degrees about [each spherical axis](https://observablehq.com/@d3/three-axis-rotation). (These correspond to [yaw, pitch and roll](https://en.wikipedia.org/wiki/Aircraft_principal_axes).) If the rotation angle *gamma* is omitted, it defaults to 0. See also [*projection*.rotate](#projection_rotate).

### rotation(point)

[Source](https://github.com/d3/d3-geo/blob/main/src/rotation.js "Source")

Returns a new array \[*longitude*, *latitude*\] in degrees representing the rotated point of the given *point*. The point must be specified as a two-element array \[*longitude*, *latitude*\] in degrees.

### rotation.invert(point)

[Source](https://github.com/d3/d3-geo/blob/main/src/rotation.js "Source")

Returns a new array \[*longitude*, *latitude*\] in degrees representing the point of the given rotated *point*; the inverse of [*rotation*](#_rotation). The point must be specified as a two-element array \[*longitude*, *latitude*\] in degrees.

## Circles

To generate a [great arc](https://en.wikipedia.org/wiki/Great-circle_distance) (a segment of a great circle), simply pass a GeoJSON LineString geometry object to a [d3.geoPath](#geoPath). D3’s projections use great-arc interpolation for intermediate points, so there’s no need for a great arc shape generator.

### d3.geoCircle()

[Source](https://github.com/d3/d3-geo/blob/main/src/circle.js "Source")

Returns a new circle generator.

### circle(arguments…)

[Source](https://github.com/d3/d3-geo/blob/main/src/circle.js "Source")

Returns a new GeoJSON geometry object of type “Polygon” approximating a circle on the surface of a sphere, with the current [center](#circle_center), [radius](#circle_radius) and [precision](#circle_precision). Any *arguments* are passed to the accessors.

### circle.center(center)

[Source](https://github.com/d3/d3-geo/blob/main/src/circle.js "Source")

If *center* is specified, sets the circle center to the specified point \[*longitude*, *latitude*\] in degrees, and returns this circle generator. The center may also be specified as a function; this function will be invoked whenever a circle is [generated](#_circle), being passed any arguments passed to the circle generator. If *center* is not specified, returns the current center accessor, which defaults to:

```js
function center() {
  return [0, 0];
}
```

### circle.radius(radius)

[Source](https://github.com/d3/d3-geo/blob/main/src/circle.js "Source")

If *radius* is specified, sets the circle radius to the specified angle in degrees, and returns this circle generator. The radius may also be specified as a function; this function will be invoked whenever a circle is [generated](#_circle), being passed any arguments passed to the circle generator. If *radius* is not specified, returns the current radius accessor, which defaults to:

```js
function radius() {
  return 90;
}
```

### circle.precision(angle)

[Source](https://github.com/d3/d3-geo/blob/main/src/circle.js "Source")

If *precision* is specified, sets the circle precision to the specified angle in degrees, and returns this circle generator. The precision may also be specified as a function; this function will be invoked whenever a circle is [generated](#_circle), being passed any arguments passed to the circle generator. If *precision* is not specified, returns the current precision accessor, which defaults to:

```js
function precision() {
  return 6;
}
```

Small circles do not follow great arcs and thus the generated polygon is only an approximation. Specifying a smaller precision angle improves the accuracy of the approximate polygon, but also increase the cost to generate and render it.

## Graticules

### d3.geoGraticule()

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js "Source")

Constructs a geometry generator for creating graticules: a uniform grid of [meridians](https://en.wikipedia.org/wiki/Meridian_\(geography\)) and [parallels](https://en.wikipedia.org/wiki/Circle_of_latitude) for showing projection distortion. The default graticule has meridians and parallels every 10° between ±80° latitude; for the polar regions, there are meridians every 90°.

<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/graticule.png" width="480" height="360">

### graticule()

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js "Source")

Returns a GeoJSON MultiLineString geometry object representing all meridians and parallels for this graticule.

### graticule.lines()

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js "Source")

Returns an array of GeoJSON LineString geometry objects, one for each meridian or parallel for this graticule.

### graticule.outline()

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js "Source")

Returns a GeoJSON Polygon geometry object representing the outline of this graticule, i.e. along the meridians and parallels defining its extent.

### graticule.extent(extent)

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js "Source")

If *extent* is specified, sets the major and minor extents of this graticule. If *extent* is not specified, returns the current minor extent, which defaults to ⟨⟨-180°, -80° - ε⟩, ⟨180°, 80° + ε⟩⟩.

### graticule.extentMajor(extent)

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js "Source")

If *extent* is specified, sets the major extent of this graticule. If *extent* is not specified, returns the current major extent, which defaults to ⟨⟨-180°, -90° + ε⟩, ⟨180°, 90° - ε⟩⟩.

### graticule.extentMinor(extent)

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js "Source")

If *extent* is specified, sets the minor extent of this graticule. If *extent* is not specified, returns the current minor extent, which defaults to ⟨⟨-180°, -80° - ε⟩, ⟨180°, 80° + ε⟩⟩.

### graticule.step(step)

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js "Source")

If *step* is specified, sets the major and minor step for this graticule. If *step* is not specified, returns the current minor step, which defaults to ⟨10°, 10°⟩.

### graticule.stepMajor(step)

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js "Source")

If *step* is specified, sets the major step for this graticule. If *step* is not specified, returns the current major step, which defaults to ⟨90°, 360°⟩.

### graticule.stepMinor(step)

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js "Source")

If *step* is specified, sets the minor step for this graticule. If *step* is not specified, returns the current minor step, which defaults to ⟨10°, 10°⟩.

### graticule.precision(angle)

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js "Source")

If *precision* is specified, sets the precision for this graticule, in degrees. If *precision* is not specified, returns the current precision, which defaults to 2.5°.

### d3.geoGraticule10()

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js "Source")

A convenience method for directly generating the default 10° global graticule as a GeoJSON MultiLineString geometry object. Equivalent to:

```js
function geoGraticule10() {
  return d3.geoGraticule()();
}
```

## Streams

D3 transforms geometry using a sequence of function calls, rather than materializing intermediate representations, to minimize overhead. Streams must implement several methods to receive input geometry. Streams are inherently stateful; the meaning of a [point](#point) depends on whether the point is inside of a [line](#lineStart), and likewise a line is distinguished from a ring by a [polygon](#polygonStart). Despite the name “stream”, these method calls are currently synchronous.

### d3.geoStream(object, stream)

[Source](https://github.com/d3/d3-geo/blob/main/src/stream.js "Source")

Streams the specified [GeoJSON](http://geojson.org) *object* to the specified [projection *stream*](#projection-streams). While both features and geometry objects are supported as input, the stream interface only describes the geometry, and thus additional feature properties are not visible to streams.

### stream.point(x, y, z)

Indicates a point with the specified coordinates *x* and *y* (and optionally *z*). The coordinate system is unspecified and implementation-dependent; for example, [projection streams](https://github.com/d3/d3-geo-projection) require spherical coordinates in degrees as input. Outside the context of a polygon or line, a point indicates a point geometry object ([Point](http://www.geojson.org/geojson-spec.html#point) or [MultiPoint](http://www.geojson.org/geojson-spec.html#multipoint)). Within a line or polygon ring, the point indicates a control point.

### stream.lineStart()

Indicates the start of a line or ring. Within a polygon, indicates the start of a ring. The first ring of a polygon is the exterior ring, and is typically clockwise. Any subsequent rings indicate holes in the polygon, and are typically counterclockwise.

### stream.lineEnd()

Indicates the end of a line or ring. Within a polygon, indicates the end of a ring. Unlike GeoJSON, the redundant closing coordinate of a ring is *not* indicated via [point](#point), and instead is implied via lineEnd within a polygon. Thus, the given polygon input:

```json
{
  "type": "Polygon",
  "coordinates": [
    [[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]
  ]
}
```

Will produce the following series of method calls on the stream:

```js
stream.polygonStart();
stream.lineStart();
stream.point(0, 0);
stream.point(0, 1);
stream.point(1, 1);
stream.point(1, 0);
stream.lineEnd();
stream.polygonEnd();
```

### stream.polygonStart()

Indicates the start of a polygon. The first line of a polygon indicates the exterior ring, and any subsequent lines indicate interior holes.

### stream.polygonEnd()

Indicates the end of a polygon.

### stream.sphere()

Indicates the sphere (the globe; the unit sphere centered at ⟨0,0,0⟩).

## Transforms

Transforms are a generalization of projections. Transform implement [*projection*.stream](#projection_stream) and can be passed to [*path*.projection](#path_projection). However, they only implement a subset of the other projection methods, and represent arbitrary geometric transformations rather than projections from spherical to planar coordinates.

### d3.geoTransform(methods)

[Source](https://github.com/d3/d3-geo/blob/main/src/transform.js "Source")

Defines an arbitrary transform using the methods defined on the specified *methods* object. Any undefined methods will use pass-through methods that propagate inputs to the output stream. For example, to reflect the *y*-dimension (see also [*identity*.reflectY](#identity_reflectY)):

```js
var reflectY = d3.geoTransform({
  point: function(x, y) {
    this.stream.point(x, -y);
  }
});
```

Or to define an affine matrix transformation:

```js
function matrix(a, b, c, d, tx, ty) {
  return d3.geoTransform({
    point: function(x, y) {
      this.stream.point(a * x + b * y + tx, c * x + d * y + ty);
    }
  });
}
```

### d3.geoIdentity()

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/identity.js "Source")

The identity transform can be used to scale, translate and clip planar geometry. It implements [*projection*.scale](#projection_scale), [*projection*.translate](#projection_translate), [*projection*.fitExtent](#projection_fitExtent), [*projection*.fitSize](#projection_fitSize), [*projection*.fitWidth](#projection_fitWidth), [*projection*.fitHeight](#projection_fitHeight), [*projection*.clipExtent](#projection_clipExtent), [*projection*.angle](#projection_angle), [*projection*.reflectX](#projection_reflectX) and [*projection*.reflectY](#projection_reflectY).

## Clipping

Projections perform cutting or clipping of geometries in two stages.

### preclip(stream)

Pre-clipping occurs in geographic coordinates. Cutting along the antimeridian line, or clipping along a small circle are the most common strategies.

See [*projection*.preclip](#projection_preclip).

### postclip(stream)

Post-clipping occurs on the plane, when a projection is bounded to a certain extent such as a rectangle.

See [*projection*.postclip](#projection_postclip).

Clipping functions are implemented as transformations of a [projection stream](#streams). Pre-clipping operates on spherical coordinates, in radians. Post-clipping operates on planar coordinates, in pixels.

### d3.geoClipAntimeridian

A clipping function which transforms a stream such that geometries (lines or polygons) that cross the antimeridian line are cut in two, one on each side. Typically used for pre-clipping.

### d3.geoClipCircle(angle)

Generates a clipping function which transforms a stream such that geometries are bounded by a small circle of radius *angle* around the projection’s [center](#projection_center). Typically used for pre-clipping.

### d3.geoClipRectangle(x0, y0, x1, y1)

Generates a clipping function which transforms a stream such that geometries are bounded by a rectangle of coordinates [[<i>x0</i>, <i>y0</i>], [<i>x1</i>, <i>y1</i>]]. Typically used for post-clipping.
