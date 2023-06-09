# Streams

Rather than materializing intermediate representations, streams transform geometry through function calls to minimize overhead. Streams must implement several methods to receive input geometry. Streams are inherently stateful; the meaning of a [point](#stream_point) depends on whether the point is inside of a [line](#stream_lineStart), and likewise a line is distinguished from a ring by a [polygon](#stream_polygonStart). Despite the name “stream”, these method calls are currently synchronous.

## geoStream(*object*, *stream*) {#geoStream}

[Source](https://github.com/d3/d3-geo/blob/main/src/stream.js) · Streams the specified [GeoJSON](http://geojson.org) *object* to the specified [projection *stream*](#streams). While both features and geometry objects are supported as input, the stream interface only describes the geometry, and thus additional feature properties are not visible to streams.

## *stream*.point(*x*, *y*, *z*) {#stream_point}

Indicates a point with the specified coordinates *x* and *y* (and optionally *z*). The coordinate system is unspecified and implementation-dependent; for example, [projection streams](./projection.md#projection_stream) require spherical coordinates in degrees as input. Outside the context of a polygon or line, a point indicates a point geometry object ([Point](http://www.geojson.org/geojson-spec.html#stream_point) or [MultiPoint](http://www.geojson.org/geojson-spec.html#multipoint)). Within a line or polygon ring, the point indicates a control point.

## *stream*.lineStart() {#stream_lineStart}

Indicates the start of a line or ring. Within a polygon, indicates the start of a ring. The first ring of a polygon is the exterior ring, and is typically clockwise. Any subsequent rings indicate holes in the polygon, and are typically counterclockwise.

## *stream*.lineEnd() {#stream_lineEnd}

Indicates the end of a line or ring. Within a polygon, indicates the end of a ring. Unlike GeoJSON, the redundant closing coordinate of a ring is *not* indicated via [point](#stream_point), and instead is implied via lineEnd within a polygon. Thus, the given polygon input:

```json
{
  "type": "Polygon",
  "coordinates": [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]]
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

## *stream*.polygonStart() {#stream_polygonStart}

Indicates the start of a polygon. The first line of a polygon indicates the exterior ring, and any subsequent lines indicate interior holes.

## *stream*.polygonEnd() {#stream_polygonEnd}

Indicates the end of a polygon.

## *stream*.sphere() {#stream_sphere}

Indicates the sphere (the globe; the unit sphere centered at ⟨0,0,0⟩).
