<script setup>

import * as d3 from "d3";
import WorldMap from "../components/WorldMap.vue";

const width = 688;
const height = 400;

</script>

# Azimuthal projections

Azimuthal projections project the sphere directly onto a plane.

## geoAzimuthalEqualArea() {#geoAzimuthalEqualArea}

<a href="https://observablehq.com/@d3/azimuthal-equal-area" target="_blank" style="color: currentColor;"><WorldMap rotate :projection='d3.geoAzimuthalEqualArea().rotate([110, -40]).fitExtent([[1, 1], [width - 1, height - 1]], {type: "Sphere"}).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/azimuthalEqualArea.js) · The azimuthal equal-area projection.

<!-- <br><a href="#geoAzimuthalEqualArea" name="geoAzimuthalEqualArea">#</a> d3.<b>geoAzimuthalEqualArea</b> -->

## geoAzimuthalEquidistant() {#geoAzimuthalEquidistant}

<a href="https://observablehq.com/@d3/azimuthal-equidistant" target="_blank" style="color: currentColor;"><WorldMap rotate :projection='d3.geoAzimuthalEquidistant().rotate([110, -40]).fitExtent([[1, 1], [width - 1, height - 1]], {type: "Sphere"}).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/azimuthalEquidistant.js) · The azimuthal equidistant projection.

<!-- <br><a href="#geoAzimuthalEquidistantRaw" name="geoAzimuthalEquidistantRaw">#</a> d3.<b>geoAzimuthalEquidistantRaw</b> -->

## geoGnomonic() {#geoGnomonic}

<a href="https://observablehq.com/@d3/gnomonic" target="_blank" style="color: currentColor;"><WorldMap rotate :projection='d3.geoGnomonic().scale(width / 6).translate([width / 2, height / 2]).clipAngle(74 - 1e-4).clipExtent([[-1, -1], [width + 1, height + 1]]).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/gnomonic.js) · The gnomonic projection.

<!-- <br><a href="#geoGnomonicRaw" name="geoGnomonicRaw">#</a> d3.<b>geoGnomonicRaw</b> -->

## geoOrthographic() {#geoOrthographic}

<a href="https://observablehq.com/@d3/orthographic" target="_blank" style="color: currentColor;"><WorldMap rotate :projection='d3.geoOrthographic().rotate([110, -40]).fitExtent([[1, 1], [width - 1, height - 1]], {type: "Sphere"}).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/orthographic.js) · The orthographic projection.

<!-- <br><a href="#geoOrthographicRaw" name="geoOrthographicRaw">#</a> d3.<b>geoOrthographicRaw</b> -->

## geoStereographic() {#geoStereographic}

<a href="https://observablehq.com/@d3/stereographic" target="_blank" style="color: currentColor;"><WorldMap rotate :projection='d3.geoStereographic().scale(width / 4).translate([width / 2, height / 2]).rotate([-27, 0]).clipAngle(135 - 1e-4).clipExtent([[-1, -1], [width + 1, height + 1]]).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/stereographic.js) · The stereographic projection.

<!-- <br><a href="#geoStereographicRaw" name="geoStereographicRaw">#</a> d3.<b>geoStereographicRaw</b> -->
