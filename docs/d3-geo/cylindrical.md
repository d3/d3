# Cylindrical projections

Cylindrical projections project the sphere onto a containing cylinder, and then unroll the cylinder onto the plane. [Pseudocylindrical projections](https://web.archive.org/web/20150928042327/http://www.progonos.com/furuti/MapProj/Normal/ProjPCyl/projPCyl.html) are a generalization of cylindrical projections.

## geoEquirectangular() {#geoEquirectangular}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/equirectangular.png" width="480" height="250">](https://observablehq.com/@d3/equirectangular)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/equirectangular.js) · The equirectangular (plate carrée) projection.

<!-- <br><a href="#geoEquirectangularRaw" name="geoEquirectangularRaw">#</a> d3.<b>geoEquirectangularRaw</b> -->

## geoMercator() {#geoMercator}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/mercator.png" width="480" height="250">](https://observablehq.com/@d3/mercator)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/mercator.js) · The spherical Mercator projection. Defines a default [*projection*.clipExtent](./projection.md#projection_clipExtent) such that the world is projected to a square, clipped to approximately ±85° latitude.

<!-- <br><a href="#geoMercatorRaw" name="geoMercatorRaw">#</a> d3.<b>geoMercatorRaw</b> -->

## geoTransverseMercator() {#geoTransverseMercator}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/transverseMercator.png" width="480" height="250">](https://observablehq.com/@d3/transverse-mercator)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/transverseMercator.js) · The transverse spherical Mercator projection. Defines a default [*projection*.clipExtent](./projection.md#projection_clipExtent) such that the world is projected to a square, clipped to approximately ±85° latitude.

<!-- <br><a href="#geoTransverseMercatorRaw" name="geoTransverseMercatorRaw">#</a> d3.<b>geoTransverseMercatorRaw</b> -->

## geoEqualEarth() {#geoEqualEarth}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/equalEarth.png" width="480" height="250">](https://observablehq.com/@d3/equal-earth)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/equalEarth.js) · The Equal Earth projection, an equal-area projection, by Bojan Šavrič _et al._, 2018.

<!-- <br><a href="#geoEqualEarthRaw" name="geoEqualEarthRaw">#</a> d3.<b>geoEqualEarthRaw</b> -->

## geoNaturalEarth1() {#geoNaturalEarth1}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/naturalEarth1.png" width="480" height="250">](https://observablehq.com/@d3/natural-earth)

[Source](https://github.com/d3/d3-geo/blob/main/src/projection/naturalEarth1.js) · The [Natural Earth projection](http://www.shadedrelief.com/NE_proj/) is a pseudocylindrical projection designed by Tom Patterson. It is neither conformal nor equal-area, but appealing to the eye for small-scale maps of the whole world.

<!-- ### geoNaturalEarth1Raw(*lambda*, *phi*) {#geoNaturalEarth1Raw} -->
