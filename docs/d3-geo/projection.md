# Projections

Projections transform spherical polygonal geometry to planar polygonal geometry. D3 provides implementations of several classes of standard projections:

* [Azimuthal projections](./azimuthal.md)
* [Conic projections](./conic.md)
* [Cylindrical projections](./cylindrical.md)

For more projections, see [d3-geo-projection](https://github.com/d3/d3-geo-projection) and [d3-geo-polygon](https://github.com/d3/d3-geo-polygon). You can implement [custom projections](#raw-projections) using [geoProjection](#geoProjection) or [geoProjectionMutator](#geoProjectionMutator).

## *projection*(*point*) {#_projection}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · Returns a new array [*x*, *y*] (typically in pixels) representing the projected point of the given *point*. The point must be specified as a two-element array [*longitude*, *latitude*] in degrees. May return null if the specified *point* has no defined projected position, such as when the point is outside the clipping bounds of the projection.

## *projection*.invert(*point*) {#projection_invert}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · Returns a new array [*longitude*, *latitude*] in degrees representing the unprojected point of the given projected *point*. The point must be specified as a two-element array [*x*, *y*] (typically in pixels). May return null if the specified *point* has no defined projected position, such as when the point is outside the clipping bounds of the projection.

This method is only defined on invertible projections.

## *projection*.stream(*stream*) {#projection_stream}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · Returns a [projection stream](./stream.md) for the specified output *stream*. Any input geometry is projected before being streamed to the output stream. A typical projection involves several geometry transformations: the input geometry is first converted to radians, rotated on three axes, clipped to the small circle or cut along the antimeridian, and lastly projected to the plane with adaptive resampling, scale and translation.

## *projection*.preclip(*preclip*) {#projection_preclip}

If *preclip* is specified, sets the projection’s spherical clipping to the specified function and returns the projection; *preclip* is a function that takes a [projection stream](./stream.md) and returns a clipped stream. If *preclip* is not specified, returns the current spherical clipping function. Preclipping is commonly used to cut along the antimeridian line or along a small circle.

## *projection*.postclip(*postclip*) {#projection_postclip}

If *postclip* is specified, sets the projection’s Cartesian clipping to the specified function and returns the projection; *postclip* is a function that takes a [projection stream](./stream.md) and returns a clipped stream. If *postclip* is not specified, returns the current Cartesian clipping function. Post-clipping occurs on the plane, when a projection is bounded to a certain extent such as a rectangle.

## *projection*.clipAngle(*angle*) {#projection_clipAngle}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · If *angle* is specified, sets the projection’s clipping circle radius to the specified angle in degrees and returns the projection. If *angle* is null, switches to [antimeridian cutting](https://observablehq.com/@d3/antimeridian-cutting) rather than small-circle clipping. If *angle* is not specified, returns the current clip angle which defaults to null. Small-circle clipping is independent of viewport clipping via [*projection*.clipExtent](#projection_clipExtent). See also [*projection*.preclip](#projection_preclip), [geoClipAntimeridian](#geoClipAntimeridian), [geoClipCircle](#geoClipCircle).

## *projection*.clipExtent(*extent*) {#projection_clipExtent}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · If *extent* is specified, sets the projection’s viewport clip extent to the specified bounds in pixels and returns the projection. The *extent* bounds are specified as an array \[\[<i>x₀</i>, <i>y₀</i>\], \[<i>x₁</i>, <i>y₁</i>\]\], where <i>x₀</i> is the left-side of the viewport, <i>y₀</i> is the top, <i>x₁</i> is the right and <i>y₁</i> is the bottom. If *extent* is null, no viewport clipping is performed. If *extent* is not specified, returns the current viewport clip extent which defaults to null. Viewport clipping is independent of small-circle clipping via [*projection*.clipAngle](#projection_clipAngle). See also [*projection*.postclip](#projection_postclip), [geoClipRectangle](#geoClipRectangle).

## *projection*.scale(*scale*) {#projection_scale}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · If *scale* is specified, sets the projection’s scale factor to the specified value and returns the projection. If *scale* is not specified, returns the current scale factor; the default scale is projection-specific. The scale factor corresponds linearly to the distance between projected points; however, absolute scale factors are not equivalent across projections.

## *projection*.translate(*translate*) {#projection_translate}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · If *translate* is specified, sets the projection’s translation offset to the specified two-element array [<i>t<sub>x</sub></i>, <i>t<sub>y</sub></i>] and returns the projection. If *translate* is not specified, returns the current translation offset which defaults to [480, 250]. The translation offset determines the pixel coordinates of the projection’s [center](#projection_center). The default translation offset places ⟨0°,0°⟩ at the center of a 960×500 area.

## *projection*.center(*center*) {#projection_center}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · If *center* is specified, sets the projection’s center to the specified *center*, a two-element array of [*longitude*, *latitude*] in degrees and returns the projection. If *center* is not specified, returns the current center, which defaults to ⟨0°,0°⟩.

## *projection*.angle(*angle*) {#projection_angle}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · If *angle* is specified, sets the projection’s post-projection planar rotation angle to the specified *angle* in degrees and returns the projection. If *angle* is not specified, returns the projection’s current angle, which defaults to 0°. Note that it may be faster to rotate during rendering (e.g., using [*context*.rotate](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/rotate)) rather than during projection.

## *projection*.reflectX(*reflect*) {#projection_reflectX}

If *reflect* is specified, sets whether or not the *x*-dimension is reflected (negated) in the output. If *reflect* is not specified, returns true if *x*-reflection is enabled, which defaults to false. This can be useful to display sky and astronomical data with the orb seen from below: right ascension (eastern direction) will point to the left when North is pointing up.

## *projection*.reflectY(*reflect*) {#projection_reflectY}

If *reflect* is specified, sets whether or not the *y*-dimension is reflected (negated) in the output. If *reflect* is not specified, returns true if *y*-reflection is enabled, which defaults to false. This is especially useful for transforming from standard [spatial reference systems](https://en.wikipedia.org/wiki/Spatial_reference_system), which treat positive *y* as pointing up, to display coordinate systems such as Canvas and SVG, which treat positive *y* as pointing down.

## *projection*.rotate(*angles*) {#projection_rotate}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · If *angles* is specified, sets the projection’s [three-axis spherical rotation](https://observablehq.com/@d3/three-axis-rotation) to the specified value, which must be a two- or three-element array of numbers [*lambda*, *phi*, *gamma*] specifying the rotation angles in degrees about [each spherical axis](https://observablehq.com/@d3/three-axis-rotation). (These correspond to [yaw, pitch and roll](https://en.wikipedia.org/wiki/Aircraft_principal_axes).) If the rotation angle *gamma* is omitted, it defaults to 0. See also [geoRotation](./math.md#geoRotation). If *angles* is not specified, returns the current rotation which defaults to [0, 0, 0].

## *projection*.precision(*precision*) {#projection_precision}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · If *precision* is specified, sets the threshold for the projection’s [adaptive resampling](https://observablehq.com/@d3/adaptive-sampling) to the specified value in pixels and returns the projection. This value corresponds to the [Douglas–Peucker](https://en.wikipedia.org/wiki/Ramer–Douglas–Peucker_algorithm) distance. If *precision* is not specified, returns the projection’s current resampling precision which defaults to √0.5 ≅ 0.70710…

## *projection*.fitExtent(*extent*, *object*) {#projection_fitExtent}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · Sets the projection’s [scale](#projection_scale) and [translate](#projection_translate) to fit the specified GeoJSON *object* in the center of the given *extent*. The extent is specified as an array \[\[x₀, y₀\], \[x₁, y₁\]\], where x₀ is the left side of the bounding box, y₀ is the top, x₁ is the right and y₁ is the bottom. Returns the projection.

For example, to scale and translate the [New Jersey State Plane projection](https://observablehq.com/@d3/new-jersey-state-plane) to fit a GeoJSON object *nj* in the center of a 960×500 bounding box with 20 pixels of padding on each side:

```js
var projection = d3.geoTransverseMercator()
    .rotate([74 + 30 / 60, -38 - 50 / 60])
    .fitExtent([[20, 20], [940, 480]], nj);
```

Any [clip extent](#projection_clipExtent) is ignored when determining the new scale and translate. The [precision](#projection_precision) used to compute the bounding box of the given *object* is computed at an effective scale of 150.

## *projection*.fitSize(*size*, *object*) {#projection_fitSize}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · A convenience method for [*projection*.fitExtent](#projection_fitExtent) where the top-left corner of the extent is [0, 0]. The following two statements are equivalent:

```js
projection.fitExtent([[0, 0], [width, height]], object);
projection.fitSize([width, height], object);
```

## *projection*.fitWidth(*width*, *object*) {#projection_fitWidth}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · A convenience method for [*projection*.fitSize](#projection_fitSize) where the height is automatically chosen from the aspect ratio of *object* and the given constraint on *width*.

## *projection*.fitHeight(*height*, *object*) {#projection_fitHeight}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · A convenience method for [*projection*.fitSize](#projection_fitSize) where the width is automatically chosen from the aspect ratio of *object* and the given constraint on *height*.

## Raw projections {#raw-projections}

Raw projections are point transformation functions that are used to implement custom projections; they typically passed to [geoProjection](#geoProjection) or [geoProjectionMutator](#geoProjectionMutator). They are exposed here to facilitate the derivation of related projections. Raw projections take spherical coordinates [*lambda*, *phi*] in radians (not degrees!) and return a point [*x*, *y*], typically in the unit square centered around the origin.

### *project*(*lambda*, *phi*) {#_project}

Projects the specified point [<i>lambda</i>, <i>phi</i>] in radians, returning a new point [*x*, *y*] in unitless coordinates.

### *project*.invert(*x*, *y*) {#project_invert}

The inverse of [*project*](#_project).

## geoProjection(*project*) {#geoProjection}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · Constructs a new projection from the specified [raw projection](#raw-projections), *project*. The *project* function takes the *longitude* and *latitude* of a given point in [radians](http://mathworld.wolfram.com/Radian.html), often referred to as *lambda* (λ) and *phi* (φ), and returns a two-element array [*x*, *y*] representing its unit projection. The *project* function does not need to scale or translate the point, as these are applied automatically by [*projection*.scale](#projection_scale), [*projection*.translate](#projection_translate), and [*projection*.center](#projection_center). Likewise, the *project* function does not need to perform any spherical rotation, as [*projection*.rotate](#projection_rotate) is applied prior to projection.

For example, a spherical Mercator projection can be implemented as:

```js
var mercator = d3.geoProjection(function(x, y) {
  return [x, Math.log(Math.tan(Math.PI / 4 + y / 2))];
});
```

If the *project* function exposes an *invert* method, the returned projection will also expose [*projection*.invert](#projection_invert).

## geoProjectionMutator(*factory*) {#geoProjectionMutator}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/index.js) · Constructs a new projection from the specified [raw projection](#_project) *factory* and returns a *mutate* function to call whenever the raw projection changes. The *factory* must return a raw projection. The returned *mutate* function returns the wrapped projection. For example, a conic projection typically has two configurable parallels. A suitable *factory* function, such as [geoConicEqualAreaRaw](./conic.md#geoConicEqualArea), would have the form:

```js
// y0 and y1 represent two parallels
function conicFactory(phi0, phi1) {
  return function conicRaw(lambda, phi) {
    return […, …];
  };
}
```

Using d3.geoProjectionMutator, you can implement a standard projection that allows the parallels to be changed, reassigning the raw projection used internally by [geoProjection](#geoProjection):

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

## geoTransform(*methods*) {#geoTransform}

[Source](https://github.com/d3/d3-geo/blob/main/src/transform.js) · Defines an arbitrary transform using the methods defined on the specified *methods* object. Any undefined methods will use pass-through methods that propagate inputs to the output stream.

For example, to reflect the *y*-dimension (see also [*projection*.reflectY](#projection_reflectY)):

```js
const reflectY = d3.geoTransform({
  point(x, y) {
    this.stream.point(x, -y);
  }
});
```

Or to define an affine matrix transformation:

```js
function matrix(a, b, c, d, tx, ty) {
  return d3.geoTransform({
    point(x, y) {
      this.stream.point(a * x + b * y + tx, c * x + d * y + ty);
    }
  });
}
```

A transform is a generalized projection; it implements [*projection*.stream](#projection_stream) and can be passed to [*path*.projection](./path.md#path_projection). However, it implements only a subset of the other projection methods, and represent arbitrary geometric transformations rather than projections from spherical to planar coordinates.

## geoIdentity() {#geoIdentity}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/identity.js) · The identity transform can be used to scale, translate and clip planar geometry. It implements [*projection*.scale](#projection_scale), [*projection*.translate](#projection_translate), [*projection*.fitExtent](#projection_fitExtent), [*projection*.fitSize](#projection_fitSize), [*projection*.fitWidth](#projection_fitWidth), [*projection*.fitHeight](#projection_fitHeight), [*projection*.clipExtent](#projection_clipExtent), [*projection*.angle](#projection_angle), [*projection*.reflectX](#projection_reflectX) and [*projection*.reflectY](#projection_reflectY).

## geoClipAntimeridian {#geoClipAntimeridian}

[Source](https://github.com/d3/d3-geo/blob/main/src/clip/antimeridian.js) · A clipping function which transforms a stream such that geometries (lines or polygons) that cross the antimeridian line are cut in two, one on each side. Typically used for pre-clipping.

## geoClipCircle(*angle*) {#geoClipCircle}

[Source](https://github.com/d3/d3-geo/blob/main/src/clip/circle.js) · Generates a clipping function which transforms a stream such that geometries are bounded by a small circle of radius *angle* around the projection’s [center](#projection_center). Typically used for pre-clipping.

## geoClipRectangle(*x0*, *y0*, *x1*, *y1*) {#geoClipRectangle}

[Source](https://github.com/d3/d3-geo/blob/main/src/clip/rectangle.js) · Generates a clipping function which transforms a stream such that geometries are bounded by a rectangle of coordinates [[<i>x0</i>, <i>y0</i>], [<i>x1</i>, <i>y1</i>]]. Typically used for post-clipping.
