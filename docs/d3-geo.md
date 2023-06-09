# d3-geo

Map projections are sometimes implemented as point transformations: a function that takes a given longitude *lambda* and latitude *phi*, and returns the corresponding *xy* position on the plane. For instance, here is the spherical Mercator projection (in radians):

```js
function mercator(lambda, phi) {
  const x = lambda;
  const y = Math.log(Math.tan(Math.PI / 4 + phi / 2));
  return [x, y];
}
```

This is a reasonable approach if your geometry consists only of points. But what about discrete geometry such as polygons and polylines?

Discrete geometry introduces new challenges when projecting from the sphere to the plane. The edges of a spherical polygon are [geodesics](https://en.wikipedia.org/wiki/Geodesic) (segments of great circles), not straight lines. Geodesics become curves in all map projections except [gnomonic](./d3-geo/azimuthal.md#geoGnomonic), and thus accurate projection requires interpolation along each arc. D3 uses [adaptive sampling](https://observablehq.com/@d3/adaptive-sampling) inspired by [Visvalingam’s line simplification method](https://bost.ocks.org/mike/simplify/) to balance accuracy and performance.

The projection of polygons and polylines must also deal with the topological differences between the sphere and the plane. Some projections require cutting geometry that [crosses the antimeridian](https://observablehq.com/@d3/antimeridian-cutting), while others require [clipping geometry to a great circle](https://observablehq.com/@d3/orthographic-shading). Spherical polygons also require a [winding order convention](https://observablehq.com/@d3/winding-order) to determine which side of the polygon is the inside: the exterior ring for polygons smaller than a hemisphere must be clockwise, while the exterior ring for polygons [larger than a hemisphere](https://observablehq.com/@d3/oceans) must be anticlockwise. Interior rings representing holes must use the opposite winding order of their exterior ring.

<!-- For more, see Part 2 of [The Toolmaker’s Guide](https://vimeo.com/106198518#t=20m0s). -->

D3 uses spherical [GeoJSON](http://geojson.org/geojson-spec.html) to represent geographic features in JavaScript. D3 supports a wide variety of [common](./d3-geo/projection.md) and [unusual](https://github.com/d3/d3-geo-projection) map projections. And because D3 uses spherical geometry to represent data, you can apply any aspect to any projection by rotating geometry.

See one of:

- [Paths](./d3-geo/path.md) - generate SVG path data from GeoJSON
- [Projections](./d3-geo/projection.md) - project spherical geometry to the plane
- [Streams](./d3-geo/stream.md) - transform (either spherical or planar) geometry
- [Shapes](./d3-geo/shape.md) - generate circles, lines, and other spherical geometry
- [Spherical math](./d3-geo/math.md) - low-level methods for spherical geometry

:::tip
To convert shapefiles to GeoJSON, use [shp2json](https://github.com/mbostock/shapefile/blob/main/README.md#shp2json), part of the [shapefile package](https://github.com/mbostock/shapefile). See [Command-Line Cartography](https://medium.com/@mbostock/command-line-cartography-part-1-897aa8f8ca2c) for an introduction to d3-geo and related tools. See also [TopoJSON](https://github.com/topojson), an extension of GeoJSON that is significantly more compact and encodes topology.
:::

:::warning CAUTION
D3’s winding order convention is also used by [TopoJSON](https://github.com/topojson) and [ESRI shapefiles](https://github.com/mbostock/shapefile); however, it is the opposite convention of GeoJSON’s [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3.1.6). Also note that standard GeoJSON WGS84 uses planar equirectangular coordinates, not spherical coordinates, and thus may require [stitching](https://github.com/d3/d3-geo-projection/blob/main/README.md#geostitch) to remove antimeridian cuts.
:::
