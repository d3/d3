<script setup>

import * as d3 from "d3";
import WorldMap from "../components/WorldMap.vue";

const width = 688;
const height = 400;

</script>

# Cylindrical projections

Cylindrical projections project the sphere onto a containing cylinder, and then unroll the cylinder onto the plane. [Pseudocylindrical projections](https://web.archive.org/web/20150928042327/http://www.progonos.com/furuti/MapProj/Normal/ProjPCyl/projPCyl.html) are a generalization of cylindrical projections.

## geoEquirectangular() {#geoEquirectangular}

<a href="https://observablehq.com/@d3/equirectangular" target="_blank" style="color: currentColor;"><WorldMap :height="width / 2" :projection='d3.geoEquirectangular().rotate([0, 0]).fitExtent([[1, 1], [width - 1, width / 2 - 1]], {type: "Sphere"}).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/equirectangular.js) · The equirectangular (plate carrée) projection.

<!-- <br><a href="#geoEquirectangularRaw" name="geoEquirectangularRaw">#</a> d3.<b>geoEquirectangularRaw</b> -->

## geoMercator() {#geoMercator}

<a href="https://observablehq.com/@d3/mercator" target="_blank" style="color: currentColor;"><WorldMap resolution="50m" :height="width" :projection='d3.geoMercator().rotate([0, 0]).fitExtent([[1, 1], [width - 1, width - 1]], {type: "Sphere"}).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/mercator.js) · The spherical Mercator projection. Defines a default [*projection*.clipExtent](./projection.md#projection_clipExtent) such that the world is projected to a square, clipped to approximately ±85° latitude.

<!-- <br><a href="#geoMercatorRaw" name="geoMercatorRaw">#</a> d3.<b>geoMercatorRaw</b> -->

## geoTransverseMercator() {#geoTransverseMercator}

<a href="https://observablehq.com/@d3/transverse-mercator" target="_blank" style="color: currentColor;"><WorldMap resolution="50m" :height="width" :projection='d3.geoTransverseMercator().rotate([0, 0]).fitExtent([[1, 1], [width - 1, width - 1]], {type: "Sphere"}).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/transverseMercator.js) · The transverse spherical Mercator projection. Defines a default [*projection*.clipExtent](./projection.md#projection_clipExtent) such that the world is projected to a square, clipped to approximately ±85° latitude.

<!-- <br><a href="#geoTransverseMercatorRaw" name="geoTransverseMercatorRaw">#</a> d3.<b>geoTransverseMercatorRaw</b> -->

## geoEqualEarth() {#geoEqualEarth}

<a href="https://observablehq.com/@d3/equal-earth" target="_blank" style="color: currentColor;"><WorldMap :height="width * 0.49" :projection='d3.geoEqualEarth().rotate([0, 0]).fitExtent([[1, 1], [width - 1, width * 0.49 - 1]], {type: "Sphere"}).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/equalEarth.js) · The Equal Earth projection, an equal-area projection, by Bojan Šavrič _et al._, 2018.

<!-- <br><a href="#geoEqualEarthRaw" name="geoEqualEarthRaw">#</a> d3.<b>geoEqualEarthRaw</b> -->

## geoNaturalEarth1() {#geoNaturalEarth1}

<a href="https://observablehq.com/@d3/natural-earth" target="_blank" style="color: currentColor;"><WorldMap :height="width * 0.5" :projection='d3.geoNaturalEarth1().rotate([0, 0]).fitExtent([[1, 1], [width - 1, width * 0.5 - 1]], {type: "Sphere"}).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/naturalEarth1.js) · The [Natural Earth projection](http://www.shadedrelief.com/NE_proj/) is a pseudocylindrical projection designed by Tom Patterson. It is neither conformal nor equal-area, but appealing to the eye for small-scale maps of the whole world.

<!-- ### geoNaturalEarth1Raw(*lambda*, *phi*) {#geoNaturalEarth1Raw} -->
