<script setup>

import * as d3 from "d3";
import WorldMap from "../components/WorldMap.vue";

const width = 688;
const height = 400;

</script>

# Spherical shapes

These shape generators return spherical GeoJSON for use with [geoPath](./path.md).

:::tip
To generate a [great arc](https://en.wikipedia.org/wiki/Great-circle_distance) (a segment of a great circle), pass a GeoJSON LineString geometry object to a [geoPath](./path.md). D3’s projections use geodesic interpolation for intermediate points.
:::

## geoGraticule() {#geoGraticule}

<WorldMap rotate :land="false" :projection='d3.geoOrthographic().rotate([110, -40]).fitExtent([[1, 1], [width - 1, height - 1]], {type: "Sphere"}).precision(0.2)' />

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · Constructs a geometry generator for creating graticules: a uniform grid of [meridians](https://en.wikipedia.org/wiki/Meridian_\(geography\)) and [parallels](https://en.wikipedia.org/wiki/Circle_of_latitude) for showing projection distortion. The default graticule has meridians and parallels every 10° between ±80° latitude; for the polar regions, there are meridians every 90°.

## *graticule*() {#_graticule}

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · Returns a GeoJSON MultiLineString geometry object representing all meridians and parallels for this graticule.

## *graticule*.lines() {#graticule_lines}

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · Returns an array of GeoJSON LineString geometry objects, one for each meridian or parallel for this graticule.

## *graticule*.outline() {#graticule_outline}

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · Returns a GeoJSON Polygon geometry object representing the outline of this graticule, i.e. along the meridians and parallels defining its extent.

## *graticule*.extent(*extent*) {#graticule_extent}

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · If *extent* is specified, sets the major and minor extents of this graticule. If *extent* is not specified, returns the current minor extent, which defaults to ⟨⟨-180°, -80° - ε⟩, ⟨180°, 80° + ε⟩⟩.

## *graticule*.extentMajor(*extent*) {#graticule_extentMajor}

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · If *extent* is specified, sets the major extent of this graticule. If *extent* is not specified, returns the current major extent, which defaults to ⟨⟨-180°, -90° + ε⟩, ⟨180°, 90° - ε⟩⟩.

## *graticule*.extentMinor(*extent*) {#graticule_extentMinor}

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · If *extent* is specified, sets the minor extent of this graticule. If *extent* is not specified, returns the current minor extent, which defaults to ⟨⟨-180°, -80° - ε⟩, ⟨180°, 80° + ε⟩⟩.

## *graticule*.step(*step*) {#graticule_step}

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · If *step* is specified, sets the major and minor step for this graticule. If *step* is not specified, returns the current minor step, which defaults to ⟨10°, 10°⟩.

## *graticule*.stepMajor(*step*) {#graticule_stepMajor}

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · If *step* is specified, sets the major step for this graticule. If *step* is not specified, returns the current major step, which defaults to ⟨90°, 360°⟩.

## *graticule*.stepMinor(*step*) {#graticule_stepMinor}

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · If *step* is specified, sets the minor step for this graticule. If *step* is not specified, returns the current minor step, which defaults to ⟨10°, 10°⟩.

## *graticule*.precision(*angle*) {#graticule_precision}

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · If *precision* is specified, sets the precision for this graticule, in degrees. If *precision* is not specified, returns the current precision, which defaults to 2.5°.

## geoGraticule10() {#geoGraticule10}

[Source](https://github.com/d3/d3-geo/blob/main/src/graticule.js) · A convenience method for directly generating the default 10° global graticule as a GeoJSON MultiLineString geometry object. Equivalent to:

```js
function geoGraticule10() {
  return d3.geoGraticule()();
}
```

## geoCircle() {#geoCircle}

[Source](https://github.com/d3/d3-geo/blob/main/src/circle.js) · Returns a new circle generator.

## *circle*(...*arguments*) {#_circle}

[Source](https://github.com/d3/d3-geo/blob/main/src/circle.js) · Returns a new GeoJSON geometry object of type “Polygon” approximating a circle on the surface of a sphere, with the current [center](#circle_center), [radius](#circle_radius) and [precision](#circle_precision). Any *arguments* are passed to the accessors.

## *circle*.center(*center*) {#circle_center}

[Source](https://github.com/d3/d3-geo/blob/main/src/circle.js) · If *center* is specified, sets the circle center to the specified point \[*longitude*, *latitude*\] in degrees, and returns this circle generator. The center may also be specified as a function; this function will be invoked whenever a circle is [generated](#_circle), being passed any arguments passed to the circle generator. If *center* is not specified, returns the current center accessor, which defaults to:

```js
function center() {
  return [0, 0];
}
```

## *circle*.radius(*radius*) {#circle_radius}

[Source](https://github.com/d3/d3-geo/blob/main/src/circle.js) · If *radius* is specified, sets the circle radius to the specified angle in degrees, and returns this circle generator. The radius may also be specified as a function; this function will be invoked whenever a circle is [generated](#_circle), being passed any arguments passed to the circle generator. If *radius* is not specified, returns the current radius accessor, which defaults to:

```js
function radius() {
  return 90;
}
```

## *circle*.precision(*angle*) {#circle_precision}

[Source](https://github.com/d3/d3-geo/blob/main/src/circle.js) · If *precision* is specified, sets the circle precision to the specified angle in degrees, and returns this circle generator. The precision may also be specified as a function; this function will be invoked whenever a circle is [generated](#_circle), being passed any arguments passed to the circle generator. If *precision* is not specified, returns the current precision accessor, which defaults to:

```js
function precision() {
  return 2;
}
```

Small circles do not follow great arcs and thus the generated polygon is only an approximation. Specifying a smaller precision angle improves the accuracy of the approximate polygon, but also increase the cost to generate and render it.
