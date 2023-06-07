# Spherical math

Low-level utilities for spherical geometry.

## geoArea(*object*) {#geoArea}

[Source](https://github.com/d3/d3-geo/blob/main/src/area.js) · Returns the spherical area of the specified GeoJSON *object* in [steradians](https://en.wikipedia.org/wiki/Steradian). This is the spherical equivalent of [*path*.area](./path.md#path_area).

## geoBounds(*object*) {#geoBounds}

[Source](https://github.com/d3/d3-geo/blob/main/src/bounds.js) · Returns the [spherical bounding box](https://www.jasondavies.com/maps/bounds/) for the specified GeoJSON *object*. The bounding box is represented by a two-dimensional array: \[\[*left*, *bottom*], \[*right*, *top*\]\], where *left* is the minimum longitude, *bottom* is the minimum latitude, *right* is maximum longitude, and *top* is the maximum latitude. All coordinates are given in degrees. (Note that in projected planar coordinates, the minimum latitude is typically the maximum *y*-value, and the maximum latitude is typically the minimum *y*-value.) This is the spherical equivalent of [*path*.bounds](./path.md#path_bounds).

## geoCentroid(*object*) {#geoCentroid}

[Source](https://github.com/d3/d3-geo/blob/main/src/centroid.js) · Returns the spherical centroid of the specified GeoJSON *object*. This is the spherical equivalent of [*path*.centroid](./path.md#path_centroid).

## geoDistance(*a*, *b*) {#geoDistance}

[Source](https://github.com/d3/d3-geo/blob/main/src/distance.js) · Returns the great-arc distance in [radians](http://mathworld.wolfram.com/Radian.html) between the two points *a* and *b*. Each point must be specified as a two-element array \[*longitude*, *latitude*\] in degrees. This is the spherical equivalent of [*path*.measure](./path.md#path_measure) given a LineString of two points.

## geoLength(*object*) {#geoLength}

[Source](https://github.com/d3/d3-geo/blob/main/src/length.js) · Returns the great-arc length of the specified GeoJSON *object* in [radians](http://mathworld.wolfram.com/Radian.html). For polygons, returns the perimeter of the exterior ring plus that of any interior rings. This is the spherical equivalent of [*path*.measure](./path.md#path_measure).

## geoInterpolate(*a*, *b*) {#geoInterpolate}

[Source](https://github.com/d3/d3-geo/blob/main/src/interpolate.js) · Returns an interpolator function given two points *a* and *b*. Each point must be specified as a two-element array \[*longitude*, *latitude*\] in degrees. The returned interpolator function takes a single argument *t*, where *t* is a number ranging from 0 to 1; a value of 0 returns the point *a*, while a value of 1 returns the point *b*. Intermediate values interpolate from *a* to *b* along the great arc that passes through both *a* and *b*. If *a* and *b* are antipodes, an arbitrary great arc is chosen.

## geoContains(*object*, *point*) {#geoContains}

[Source](https://github.com/d3/d3-geo/blob/main/src/contains.js) · Returns true if and only if the specified GeoJSON *object* contains the specified *point*, or false if the *object* does not contain the *point*. The point must be specified as a two-element array \[*longitude*, *latitude*\] in degrees. For Point and MultiPoint geometries, an exact test is used; for a Sphere, true is always returned; for other geometries, an epsilon threshold is applied.

## geoRotation(*angles*) {#geoRotation}

[Source](https://github.com/d3/d3-geo/blob/main/src/rotation.js) · Returns a [rotation function](#_rotation) for the given *angles*, which must be a two- or three-element array of numbers [*lambda*, *phi*, *gamma*] specifying the rotation angles in degrees about [each spherical axis](https://observablehq.com/@d3/three-axis-rotation). (These correspond to [yaw, pitch and roll](https://en.wikipedia.org/wiki/Aircraft_principal_axes).) If the rotation angle *gamma* is omitted, it defaults to 0. See also [*projection*.rotate](./projection.md#projection_rotate).

### *rotation*(*point*) {#_rotation}

[Source](https://github.com/d3/d3-geo/blob/main/src/rotation.js) · Returns a new array \[*longitude*, *latitude*\] in degrees representing the rotated point of the given *point*. The point must be specified as a two-element array \[*longitude*, *latitude*\] in degrees.

### *rotation*.invert(*point*) {#rotation_invert}

[Source](https://github.com/d3/d3-geo/blob/main/src/rotation.js) · Returns a new array \[*longitude*, *latitude*\] in degrees representing the point of the given rotated *point*; the inverse of [*rotation*](#_rotation). The point must be specified as a two-element array \[*longitude*, *latitude*\] in degrees.
