<script setup>

import * as d3 from "d3";
import UsMap from "../components/UsMap.vue";
import WorldMap from "../components/WorldMap.vue";

const width = 688;
const height = 400;

</script>

# Conic projections

Conic projections project the sphere onto a cone, and then unroll the cone onto the plane. Conic projections have [two standard parallels](#conic_parallels).

## *conic*.parallels(*parallels*) {#conic_parallels}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/conic.js) · The [two standard parallels](https://en.wikipedia.org/wiki/Map_projection#Conic) that define the map layout in conic projections.

## geoConicConformal() {#geoConicConformal}

<a href="https://observablehq.com/@d3/conic-conformal" target="_blank" style="color: currentColor;"><WorldMap resolution="50m" :projection='d3.geoConicConformal().parallels([35, 65]).rotate([-20, 0]).scale(width * 0.55).center([0, 52]).translate([width / 2, height / 2]).clipExtent([[-1, -1], [width + 1, height + 1]]).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/conicConformal.js) · The conic conformal projection. The parallels default to [30°, 30°] resulting in flat top.

<!-- <br><a href="#geoConicConformalRaw" name="geoConicConformalRaw">#</a> d3.<b>geoConicConformalRaw</b>(<i>phi0</i>, <i>phi1</i>) -->

## geoConicEqualArea() {#geoConicEqualArea}

<a href="https://observablehq.com/@d3/conic-conformal" target="_blank" style="color: currentColor;"><WorldMap resolution="50m" :projection='d3.geoConicEqualArea().parallels([35, 65]).rotate([-20, 0]).scale(width * 0.55).center([0, 52]).translate([width / 2, height / 2]).clipExtent([[-1, -1], [width + 1, height + 1]]).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/conicEqualArea.js) · The Albers’ equal-area conic projection.

<!-- <br><a href="#geoConicEqualAreaRaw" name="geoConicEqualAreaRaw">#</a> d3.<b>geoConicEqualAreaRaw</b>(<i>phi0</i>, <i>phi1</i>) -->

## geoConicEquidistant() {#geoConicEquidistant}

<a href="https://observablehq.com/@d3/conic-equidistant" target="_blank" style="color: currentColor;"><WorldMap resolution="50m" :projection='d3.geoConicEquidistant().parallels([35, 65]).rotate([-20, 0]).scale(width * 0.55).center([0, 52]).translate([width / 2, height / 2]).clipExtent([[-1, -1], [width + 1, height + 1]]).precision(0.2)' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/conicEquidistant.js) · The conic equidistant projection.

<!-- <br><a href="#geoConicEquidistantRaw" name="geoConicEquidistantRaw">#</a> d3.<b>geoConicEquidistantRaw</b>(<i>phi0</i>, <i>phi1</i>) -->

## geoAlbers() {#geoAlbers}

<a href="https://observablehq.com/@d3/u-s-map" target="_blank" style="color: currentColor;"><UsMap :projection='d3.geoAlbers().scale(1300 / 975 * width * 0.8).translate([width / 2, height / 2])' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/albers.js) · The Albers’ equal area-conic projection. This is a U.S.-centric configuration of [geoConicEqualArea](#geoConicEqualArea).

## geoAlbersUsa() {#geoAlbersUsa}

<a href="https://observablehq.com/@d3/u-s-map" target="_blank" style="color: currentColor;"><UsMap :projection='d3.geoAlbersUsa().scale(1300 / 975 * width * 0.8).translate([width / 2, height / 2])' /></a>

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/albersUsa.js) · This is a U.S.-centric composite projection of three [geoConicEqualArea](#geoConicEqualArea) projections: [geoAlbers](#geoAlbers) is used for the lower forty-eight states, and separate conic equal-area projections are used for Alaska and Hawaii. The scale for Alaska is diminished: it is projected at 0.35× its true relative area. See [Albers USA with Territories](https://www.npmjs.com/package/geo-albers-usa-territories) for an extension to all US territories, and [d3-composite-projections](http://geoexamples.com/d3-composite-projections/) for more examples.

The constituent projections have fixed clip, center and rotation, and thus this projection does not support [*projection*.center](./projection.md#projection_center), [*projection*.rotate](./projection.md#projection_rotate), [*projection*.clipAngle](./projection.md#projection_clipAngle), or [*projection*.clipExtent](./projection.md#projection_clipExtent).
