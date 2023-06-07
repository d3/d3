# Conic projections

Conic projections project the sphere onto a cone, and then unroll the cone onto the plane. Conic projections have [two standard parallels](#conic_parallels).

## *conic*.parallels(*parallels*) {#conic_parallels}

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/conic.js) · The [two standard parallels](https://en.wikipedia.org/wiki/Map_projection#Conic) that define the map layout in conic projections.

## geoConicConformal() {#geoConicConformal}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/conicConformal.png" width="480" height="250">](https://observablehq.com/@d3/conic-conformal)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/conicConformal.js) · The conic conformal projection. The parallels default to [30°, 30°] resulting in flat top.

<!-- <br><a href="#geoConicConformalRaw" name="geoConicConformalRaw">#</a> d3.<b>geoConicConformalRaw</b>(<i>phi0</i>, <i>phi1</i>) -->

## geoConicEqualArea() {#geoConicEqualArea}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/conicEqualArea.png" width="480" height="250">](https://observablehq.com/@d3/conic-equal-area)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/conicEqualArea.js) · The Albers’ equal-area conic projection.

<!-- <br><a href="#geoConicEqualAreaRaw" name="geoConicEqualAreaRaw">#</a> d3.<b>geoConicEqualAreaRaw</b>(<i>phi0</i>, <i>phi1</i>) -->

## geoConicEquidistant() {#geoConicEquidistant}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/conicEquidistant.png" width="480" height="250">](https://observablehq.com/@d3/conic-equidistant)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/conicEquidistant.js) · The conic equidistant projection.

<!-- <br><a href="#geoConicEquidistantRaw" name="geoConicEquidistantRaw">#</a> d3.<b>geoConicEquidistantRaw</b>(<i>phi0</i>, <i>phi1</i>) -->

## geoAlbers() {#geoAlbers}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/albers.png" width="480" height="250">](https://observablehq.com/@d3/u-s-map)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/albers.js) · The Albers’ equal area-conic projection. This is a U.S.-centric configuration of [geoConicEqualArea](#geoConicEqualArea).

## geoAlbersUsa() {#geoAlbersUsa}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/albersUsa.png" width="480" height="250">](https://observablehq.com/@d3/u-s-map)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/albersUsa.js) · This is a U.S.-centric composite projection of three [geoConicEqualArea](#geoConicEqualArea) projections: [geoAlbers](#geoAlbers) is used for the lower forty-eight states, and separate conic equal-area projections are used for Alaska and Hawaii. The scale for Alaska is diminished: it is projected at 0.35× its true relative area. See [Albers USA with Territories](https://www.npmjs.com/package/geo-albers-usa-territories) for an extension to all US territories, and [d3-composite-projections](http://geoexamples.com/d3-composite-projections/) for more examples.

The constituent projections have fixed clip, center and rotation, and thus this projection does not support [*projection*.center](./projection.md#projection_center), [*projection*.rotate](./projection.md#projection_rotate), [*projection*.clipAngle](./projection.md#projection_clipAngle), or [*projection*.clipExtent](./projection.md#projection_clipExtent).
