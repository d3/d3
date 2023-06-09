# Extended projections

D3 offers a large catalogue of projections, distributed as two separate modules:

* [d3-geo-projection](#d3-geo-projection)
* [d3-geo-polygon](#d3-geo-polygon)

To keep D3’s bundle size relatively lean, these modules are not bundled by default with D3. Add them to your project like so:

:::code-group
```html [ESM + CDN]
<!DOCTYPE html>
<div id="container"></div>
<script type="module">

import {geoBertin1953} from "https://cdn.jsdelivr.net/npm/d3-geo-projection@4/+esm";

const projection = geoBertin1953();

</script>
```

```html [UMD + CDN]
<!DOCTYPE html>
<div id="container"></div>
<script src="https://cdn.jsdelivr.net/npm/d3-geo-projection@4"></script>
<script type="module">

const projection = d3.geoBertin1953();

</script>
```

```html [UMD + local]
<!DOCTYPE html>
<div id="container"></div>
<script src="d3.js"></script>
<script src="d3-geo-projection.js"></script>
<script type="module">

const projection = d3.geoBertin1953();

</script>
```

```js [Observable]
d3 = require("d3@7", "d3-geo-projection@4")
```
:::

:::code-group
```html [ESM + CDN]
<!DOCTYPE html>
<div id="container"></div>
<script type="module">

import {geoAirocean} from "https://cdn.jsdelivr.net/npm/d3-geo-polygon@1/+esm";

const projection = geoAirocean();

</script>
```

```html [UMD + CDN]
<!DOCTYPE html>
<div id="container"></div>
<script src="https://cdn.jsdelivr.net/npm/d3-geo-polygon@1"></script>
<script type="module">

const projection = d3.geoAirocean();

</script>
```

```html [UMD + local]
<!DOCTYPE html>
<div id="container"></div>
<script src="d3.js"></script>
<script src="d3-geo-polygon.js"></script>
<script type="module">

const projection = d3.geoAirocean();

</script>
```

```js [Observable]
d3 = require("d3@7", "d3-geo-polygon@1")
```
:::


The d3-geo-projection 🗺️ module harbors a wide variety of projections, [command-line tools](https://github.com/d3/d3-geo-projection#command-line-reference), and [transformations](#geoProject). The d3-geo-polygon ⚽️ module adds a dozen more polyhedral projections enabled by spherical intersection and [clipping](#spherical_clipping) method.


:::tip
Projections tagged <abbr title="d3-geo">⚾️</abbr> are exported by [d3-geo](https://github.com/d3/d3-geo) and included in the [d3](https://github.com/d3/d3) default bundle. Projections tagged <abbr title="d3-geo-projection">🗺️</abbr> are exported by [d3-geo-projection](https://github.com/d3/d3-geo-projection), and projections tagged <abbr title="d3-geo-polygon">⚽️</abbr> are exported by [d3-geo-polygon](https://github.com/d3/d3-geo-polygon).
:::


## geoProject(*object*, *projection*) {#geoProject}

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/project/index.js) · Projects the specified GeoJSON object using the specified projection, returning a shallow copy of the specified GeoJSON object with projected coordinates. Typically, the input coordinates are spherical and the output coordinates are planar, but the projection can also be an arbitrary geometric transformation.

## geoStitch(*object*) {#geoStitch}

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/stitch.js) · Returns a shallow copy of the specified GeoJSON object, removing antimeridian and polar cuts, and replacing straight Cartesian line segments with geodesic segments. The input object must have coordinates in longitude and latitude in decimal degrees per RFC 7946. Antimeridian cutting, if needed, can then be re-applied after rotating to the desired projection aspect.

## geoQuantize(*object*, *digits*) {#geoQuantize}

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/quantize.js) · Returns a shallow copy of the specified GeoJSON object, rounding x and y coordinates according to *number*.toFixed. Typically this is done after projecting.

## Spherical clipping {#spherical_clipping}

### geoClipPolygon(*polygon*) {#geoClipPolygon}

<abbr title="d3-geo-polygon">⚽️</abbr> [Source](https://github.com/d3/d3-geo-polygon/blob/master/src/clip/polygon.js) · Given a GeoJSON *polygon* or *multipolygon*, returns a clip function suitable for [*projection*.preclip](./projection.md#projection_preclip).

#### *clip*.polygon()

<abbr title="d3-geo-polygon">⚽️</abbr> Given a clipPolygon function, returns the GeoJSON polygon.

### geoIntersectArc(*arcs*)

<abbr title="d3-geo-polygon">⚽️</abbr> [Source](https://github.com/d3/d3-geo-polygon/blob/master/src/intersect.js) · Given two spherical arcs [*point0*, *point1*] and [*point2*, *point3*], returns their intersection, or undefined if there is none. See “[Spherical Intersection](https://observablehq.com/@fil/spherical-intersection)”.

## Projections

## geoAiry() {#geoAiry}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/airy.png" width="480" height="250">](https://observablehq.com/@d3/airys-minimum-error)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/airy.js) · Airy’s minimum-error azimuthal projection.

### *airy*.radius([*radius*]) {#airy_radius}

Defaults to 90°.

## geoAitoff() {#geoAitoff}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/aitoff.png" width="480" height="250">](https://observablehq.com/@d3/aitoff)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/aitoff.js) · The Aitoff projection.

## geoAlbers() {#geoAlbers}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/albers.png" width="480" height="250">](https://observablehq.com/@d3/conic-equal-area)

<abbr title="d3-geo">⚾️</abbr> [Source](https://github.com/d3/d3-geo/blob/main/src/projection/albers.js) · Albers’ [equal-area conic projection](#geoConicEqualArea).

## geoArmadillo() {#geoArmadillo}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/armadillo.png" width="480" height="250">](https://observablehq.com/@d3/armadillo)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/armadillo.js) · The armadillo projection. The default center assumes the default [parallel](#armadillo_parallel) of 20° and should be changed if a different parallel is used. Note: requires clipping to the sphere.

### *armadillo*.parallel([*parallel*]) {#armadillo_parallel}

Defaults to 20°.

## geoAugust() {#geoAugust}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/august.png" width="480" height="250">](https://observablehq.com/@d3/august)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/august.js) · August’s epicycloidal conformal projection.

## geoAzimuthalEqualArea() {#geoAzimuthalEqualArea}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/azimuthalEqualArea.png" width="480" height="250">](https://observablehq.com/@d3/azimuthal-equal-area)

<abbr title="d3-geo">⚾️</abbr> [Source](https://github.com/d3/d3-geo/blob/main/src/projection/azimuthalEqualArea.js) · The Lambert azimuthal equal-area projection.

## geoAzimuthalEquidistant() {#geoAzimuthalEquidistant}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/azimuthalEquidistant.png" width="480" height="250">](https://observablehq.com/@d3/azimuthal-equidistant)

<abbr title="d3-geo">⚾️</abbr> [Source](https://github.com/d3/d3-geo/blob/main/src/projection/azimuthalEquidistant.js) · The azimuthal equidistant projection.

## geoBaker() {#geoBaker}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/baker.png" width="480" height="250">](https://observablehq.com/@d3/baker-dinomic)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/baker.js) · The Baker Dinomic projection.

## geoBerghaus() {#geoBerghaus}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/berghaus.png" width="480" height="250">](https://observablehq.com/@d3/berghaus-star)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/berghaus.js) · Berghaus’ star projection. The default center assumes the default [lobe number](#berghaus_lobes) of 5 and should be changed if a different number of lobes is used. Note: requires clipping to the sphere.

### *berghaus*.lobes([*lobes*]) {#berghaus_lobes}

If *lobes* is specified, sets the number of lobes in the resulting star, and returns this projection. If *lobes* is not specified, returns the current lobe number, which defaults to 5.

## geoBertin1953() {#geoBertin1953}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/bertin1953.png" width="480" height="250">](https://visionscarto.net/bertin-projection-1953)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/bertin.js) · Jacques Bertin’s 1953 projection.

## geoBoggs() {#geoBoggs}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/boggs.png" width="480" height="250">](https://observablehq.com/@d3/boggs-eumorphic)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/boggs.js) · The Boggs eumorphic projection. More commonly used in [interrupted form](#geoInterruptedBoggs).

## geoBonne() {#geoBonne}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/bonne.png" width="480" height="250">](https://observablehq.com/@d3/bonne)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/bonne.js) · The Bonne pseudoconical equal-area projection. The [Werner projection](https://observablehq.com/@d3/werner) is a limiting form of the Bonne projection with a standard parallel at ±90°. The default center assumes the default [parallel](#bonne_parallel) of 45° and should be changed if a different parallel is used.

### *bonne*.parallel([*parallel*]) {#bonne_parallel}

Defaults to 45°.

## geoBottomley() {#geoBottomley}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/bottomley.png" width="480" height="250">](https://observablehq.com/@d3/bottomley)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/bottomley.js) · The [Bottomley projection](https://cybergeo.revues.org/3977) “draws lines of latitude as concentric circular arcs, with arc lengths equal to their lengths on the globe, and placed symmetrically and equally spaced across the vertical central meridian.”

### *bottomley*.fraction([*fraction*]) {#bottomley_fraction}

Defaults to 0.5, corresponding to a sin(ψ) where ψ = π/6.

## geoBromley() {#geoBromley}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/bromley.png" width="480" height="250">](https://observablehq.com/@d3/bromley)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/bromley.js) · The Bromley projection is a rescaled [Mollweide projection](#geoMollweide).

## geoChamberlin(*point0*, *point1*, *point2*) {#geoChamberlin}

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/chamberlin.js) · The Chamberlin trimetric projection. This method does not support [*projection*.rotate](./projection.md#projection_rotate): the three reference points implicitly determine a fixed rotation.

## geoChamberlinAfrica() {#geoChamberlinAfrica}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/chamberlinAfrica.png" width="480" height="250">](https://bl.ocks.org/mbostock/5625053)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/chamberlin.js) · The Chamberlin projection for Africa using points [0°, 22°], [45°, 22°], [22.5°, -22°].

## geoCollignon() {#geoCollignon}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/collignon.png" width="480" height="250">](https://observablehq.com/@d3/collignon)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/collignon.js) · The Collignon equal-area pseudocylindrical projection. This projection is used in the polar areas of the [HEALPix projection](#geoHealpix).

## geoConicConformal() {#geoConicConformal}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/conicConformal.png" width="480" height="250">](https://observablehq.com/@d3/conic-conformal)

<abbr title="d3-geo">⚾️</abbr> [Source](https://github.com/d3/d3-geo/blob/main/src/projection/conicConformal.js) · The Lambert conformal conic projection.

## geoConicEqualArea() {#geoConicEqualArea}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/conicEqualArea.png" width="480" height="250">](https://observablehq.com/@d3/conic-equal-area)

<abbr title="d3-geo">⚾️</abbr> [Source](https://github.com/d3/d3-geo/blob/main/src/projection/conicEqualArea.js) · Albers’ conic equal-area projection.

## geoConicEquidistant() {#geoConicEquidistant}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/conicEquidistant.png" width="480" height="250">](https://observablehq.com/@d3/conic-equidistant)

<abbr title="d3-geo">⚾️</abbr> [Source](https://github.com/d3/d3-geo/blob/main/src/projection/conicEquidistant.js) · The conic equidistant projection.

## geoCraig() {#geoCraig}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/craig.png" width="480" height="250">](https://observablehq.com/@d3/craig)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/craig.js) · The Craig retroazimuthal projection. Note: this projection tends to [fold over itself](https://bl.ocks.org/mbostock/4459716) if the [standard parallel](#craig_parallel) is non-zero; we have not yet implemented the necessary advanced clipping to avoid overlap.

### *craig*.parallel([*parallel*]) {#craig_parallel}

Defaults to 0°.

## geoCraster() {#geoCraster}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/craster.png" width="480" height="250">](https://observablehq.com/@d3/craster)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/craster.js) · The Craster parabolic projection; also known as Putniņš P4.

## geoCylindricalEqualArea() {#geoCylindricalEqualArea}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/cylindricalEqualArea.png" width="480" height="250">](https://observablehq.com/@mbostock/cylindrical-equal-area-projections)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/cylindricalEqualArea.js) · The cylindrical equal-area projection. Depending on the chosen [parallel](#cylindricalEqualArea_parallel), this projection is also known as the Lambert cylindrical equal-area (0°), Behrmann (30°), Hobo–Dyer (37.5°), Gall–Peters (45°), Balthasart (50°) and Tobler world-in-a-square (~55.654°).

### *cylindricalEqualArea*.parallel([*parallel*]) {#cylindricalEqualArea_parallel}

Defaults to approximately 38.58°, fitting the world in a 960×500 rectangle.

## geoCylindricalStereographic() {#geoCylindricalStereographic}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/cylindricalStereographic.png" width="480" height="250">](https://observablehq.com/@d3/cylindrical-stereographic)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/cylindricalStereographic.js) · The cylindrical stereographic projection. Depending on the chosen [parallel](#cylindricalStereographic_parallel), this projection is also known as Braun’s stereographic (0°) and Gall’s stereographic (45°).

### *cylindricalStereographic*.parallel([*parallel*]) {#cylindricalStereographic_parallel}

Defaults to 0°.

## geoEckert1() {#geoEckert1}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/eckert1.png" width="480" height="250">](https://observablehq.com/@d3/eckert-i)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/eckert1.js) · The Eckert I projection.

## geoEckert2() {#geoEckert2}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/eckert2.png" width="480" height="250">](https://observablehq.com/@d3/eckert-ii)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/eckert2.js) · The Eckert II projection.

## geoEckert3() {#geoEckert3}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/eckert3.png" width="480" height="250">](https://observablehq.com/@d3/eckert-iii)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/eckert3.js) · The Eckert III projection.

## geoEckert4() {#geoEckert4}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/eckert4.png" width="480" height="250">](https://observablehq.com/@d3/eckert-iv)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/eckert4.js) · The Eckert IV projection.

## geoEckert5() {#geoEckert5}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/eckert5.png" width="480" height="250">](https://observablehq.com/@d3/eckert-v)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/eckert5.js) · The Eckert V projection.

## geoEckert6() {#geoEckert6}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/eckert6.png" width="480" height="250">](https://observablehq.com/@d3/eckert-vi)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/eckert6.js) · The Eckert VI projection.

## geoEisenlohr() {#geoEisenlohr}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/eisenlohr.png" width="480" height="250">](https://observablehq.com/@d3/eisenlohr)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/eisenlohr.js) · The Eisenlohr conformal projection.

## geoEquirectangular() {#geoEquirectangular}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/equirectangular.png" width="480" height="250">](https://observablehq.com/@d3/equirectangular)

<abbr title="d3-geo">⚾️</abbr> [Source](https://github.com/d3/d3-geo/blob/main/src/projection/equirectangular.js) · The equirectangular (plate carrée) projection. The [Cassini projection](https://observablehq.com/@d3/cassini) is the transverse aspect of the equirectangular projection.

## geoFahey() {#geoFahey}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/fahey.png" width="480" height="250">](https://observablehq.com/@d3/fahey)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/fahey.js) · The Fahey pseudocylindrical projection.

## geoFoucaut() {#geoFoucaut}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/foucaut.png" width="480" height="250">](https://www.jasondavies.com/maps/foucaut/)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/foucaut.js) · Foucaut’s stereographic equivalent projection.

## geoFoucautSinusoidal() {#geoFoucautSinusoidal}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/foucautSinusoidal.png" width="480" height="250">](https://observablehq.com/@d3/foucaut-sinusoidal)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/foucautSinusoidal.js) · Foucaut’s sinusoidal projection, an equal-area average of the sinusoidal and Lambert’s cylindrical projections.

### *foucautSinusoidal*.alpha([*alpha*]) {#foucautSinusoidal_alpha}

Relative weight of the cylindrical projection. Defaults to 0.5.

## geoGilbert([*type*]) {#geoGilbert}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/gilbert.png" width="480" height="250">](https://observablehq.com/@d3/gilbert)

[Source](https://github.com/d3/d3-geo-projection/blob/main/src/gilbert.js) · Gilbert’s two-world perspective projection. Wraps an instance of the specified projection *type*; if not specified, defaults to [geoOrthographic](#geoOrthographic).

## geoGingery() {#geoGingery}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/gingery.png" width="480" height="250">](https://observablehq.com/@d3/gingery)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/gingery.js) · The U.S.-centric Gingery world projection, as inspired by Cram’s Air Age. Note: requires clipping to the sphere.

### *gingery*.radius([*radius*]) {#gingery_radius}

Defaults to 30°.

### *gingery*.lobes([*lobes*]) {#gingery_lobes}

Defaults to 6.

## geoGinzburg4() {#geoGinzburg4}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/ginzburg4.png" width="480" height="250">](https://observablehq.com/@d3/ginzburg-iv)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/ginzburg4.js) · The Ginzburg IV projection.

## geoGinzburg5() {#geoGinzburg5}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/ginzburg5.png" width="480" height="250">](https://observablehq.com/@d3/ginzburg-v)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/ginzburg5.js) · The Ginzburg V projection.

## geoGinzburg6() {#geoGinzburg6}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/ginzburg6.png" width="480" height="250">](https://observablehq.com/@d3/ginzburg-vi)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/ginzburg6.js) · The Ginzburg VI projection.

## geoGinzburg8() {#geoGinzburg8}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/ginzburg8.png" width="480" height="250">](https://observablehq.com/@d3/ginzburg-viii)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/ginzburg8.js) · The Ginzburg VIII projection.

## geoGinzburg9() {#geoGinzburg9}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/ginzburg9.png" width="480" height="250">](https://observablehq.com/@d3/ginzburg-ix)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/ginzburg9.js) · The Ginzburg IX projection.

## geoGnomonic() {#geoGnomonic}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/gnomonic.png" width="480" height="250">](https://observablehq.com/@d3/gnomonic)

<abbr title="d3-geo">⚾️</abbr> [Source](https://github.com/d3/d3-geo/blob/main/src/projection/gnomonic.js) · The gnomonic projection.

## geoGringorten() {#geoGringorten}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/gringorten.png" width="480" height="250">](https://observablehq.com/@d3/gringorten)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/gringorten.js) · The Gringorten square equal-area projection, rearranged to give each hemisphere an entire square.

## geoGuyou() {#geoGuyou}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/guyou.png" width="480" height="250">](https://observablehq.com/@d3/guyou)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/guyou.js) · The Guyou hemisphere-in-a-square projection. Peirce is credited with its [quincuncial form](#geoPeirceQuincuncial).

## geoHammer() {#geoHammer}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/hammer.png" width="480" height="250">](https://observablehq.com/@d3/hammer)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/hammer.js) · The Hammer projection. Depending the chosen coefficient and aspect, also known as [Eckert–Greifendorff](https://observablehq.com/@d3/hammer?b=4), [quartic authalic](https://observablehq.com/@d3/hammer?b=Infinity), and [Briesemeister](https://observablehq.com/@d3/briesemeister-projection).

### *hammer*.coefficient([*coefficient*]) {#hammer_coefficient}

Defaults to 2.

## geoHammerRetroazimuthal() {#geoHammerRetroazimuthal}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/hammerRetroazimuthal.png" width="480" height="250">](https://observablehq.com/@d3/hammer-retroazimuthal)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/hammerRetroazimuthal.js) · The Hammer retroazimuthal projection. Note: requires clipping to the sphere.

### *hammerRetroazimuthal*.parallel([*parallel*]) {#hammerRetroazimuthal_parallel}

Defaults to 45°.

## geoHealpix() {#geoHealpix}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/healpix.png" width="480" height="250">](https://observablehq.com/@d3/healpix)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/healpix.js) · The HEALPix projection: a <b>H</b>ierarchical <b>E</b>qual <b>A</b>rea iso<b>L</b>atitude <b>Pix</b>elisation of a 2-sphere. In this implementation, the parameter *K* is fixed at 3. Note: requires clipping to the sphere.

### *healpix*.lobes([*lobes*]) {#healpix_lobes}

If *lobes* is specified, sets the number of lobes (the parameter *H* in the literature) and returns this projection. If *lobes* is not specified, returns the current lobe number, which defaults to 4.

## geoHill() {#geoHill}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/hill.png" width="480" height="250">](https://observablehq.com/@d3/hill-eucyclic)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/hill.js) · Hill eucyclic projection is pseudoconic and equal-area.

### *hill*.ratio([*ratio*]) {#hill_ratio}

Defaults to 1. With a ratio of 0, this projection becomes the [Maurer No. 73](https://observablehq.com/@d3/hill-eucyclic?b=0). As it approaches ∞, the projection converges to the [Eckert IV](#geoEckert4).

## geoHomolosine() {#geoHomolosine}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/homolosine.png" width="480" height="250">](https://observablehq.com/@d3/goode-homolosine)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/homolosine.js) · The pseudocylindrical, equal-area Goode homolosine projection is normally presented in [interrupted form](#geoInterruptedHomolosine).

## geoHufnagel() {#geoHufnagel}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/hufnagel.png" width="480" height="250">](https://observablehq.com/@fil/hufnagel-projection)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/hufnagel.js) · A customizable family of pseudocylindrical equal-area projections by Herbert Hufnagel.

### *hufnagel*.a([*a*]) {#hufnagel_a}

### *hufnagel*.b([*b*]) {#hufnagel_b}

### *hufnagel*.psiMax([*psiMax*]) {#hufnagel_psiMax}

### *hufnagel*.ratio([*ratio*]) {#hufnagel_ratio}

## geoHyperelliptical() {#geoHyperelliptical}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/hyperelliptical.png" width="480" height="250">](https://observablehq.com/@fil/toblers-hyperelliptical-projection)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/hyperelliptical.js) · Waldo R. Tobler’s hyperelliptical is a family of equal-area pseudocylindrical projections. Parameters include _k_, the exponent of the superellipse (or Lamé curve) that defines the shape of the meridians (default _k_ = 2.5); _alpha_, which governs the weight of the cylindrical projection that is averaged with the superellipse (default _alpha_ = 0); and _gamma_, that shapes the aspect ratio (default: _gamma_ = 1.183136).

## geoKavrayskiy7() {#geoKavrayskiy7}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/kavrayskiy7.png" width="480" height="250">](https://observablehq.com/@d3/kavrayskiy-vii)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/kavrayskiy7.js) · The Kavrayskiy VII pseudocylindrical projection.

## geoLagrange() {#geoLagrange}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/lagrange.png" width="480" height="250">](https://observablehq.com/@d3/lagrange)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/lagrange.js) · The Lagrange conformal projection.

### *lagrange*.spacing([*spacing*]) {#lagrange_spacing}

Defaults to 0.5.

## geoLarrivee() {#geoLarrivee}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/larrivee.png" width="480" height="250">](https://observablehq.com/@d3/larrivee)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/larrivee.js) · The Larrivée projection.

## geoLaskowski() {#geoLaskowski}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/laskowski.png" width="480" height="250">](https://observablehq.com/@d3/laskowski-tri-optimal)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/laskowski.js) · The Laskowski tri-optimal projection simultaneously minimizes distance, angular, and areal distortion.

## geoLittrow() {#geoLittrow}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/littrow.png" width="480" height="250">](https://observablehq.com/@d3/littrow)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/littrow.js) · The Littrow projection is the only conformal retroazimuthal map projection. Typically clipped to the geographic extent [[-90°, -60°], [90°, 60°]].

## geoLoximuthal() {#geoLoximuthal}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/loximuthal.png" width="480" height="250">](https://observablehq.com/@d3/loximuthal)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/loximuthal.js) · The [loximuthal projection](https://en.wikipedia.org/wiki/Loximuthal_projection) is “characterized by the fact that loxodromes (rhumb lines) from one chosen central point (the intersection of the central meridian and central latitude) are shown as straight lines, correct in azimuth from the center, and are ‘true to scale’… It is neither an equal-area projection nor conformal.”

### *loximuthal*.parallel([*parallel*]) {#loximuthal_parallel}

Defaults to 40°.

## geoMercator() {#geoMercator}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/mercator.png" width="480" height="250">](https://observablehq.com/@d3/mercator)

<abbr title="d3-geo">⚾️</abbr> [Source](https://github.com/d3/d3-geo/blob/main/src/projection/mercator.js) · The spherical Mercator projection.

## geoMiller() {#geoMiller}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/miller.png" width="480" height="250">](https://observablehq.com/@d3/miller)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/miller.js) · The Miller cylindrical projection is a modified [Mercator](#geoMercator) projection.

## geoModifiedStereographic(*coefficients*, *rotate*)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/modifiedStereographic.js) · The family of [modified stereographic projections](https://www.jasondavies.com/maps/modified-stereographic/). The default [clip angle](https://github.com/d3/d3-geo/blob/main/README.md#projection_clipAngle) for these projections is 90°. These projections do not support [*projection*.rotate](https://github.com/d3/d3-geo/blob/main/README.md#projection_rotate): a fixed rotation is applied that is specific to the given *coefficients*.

## geoModifiedStereographicAlaska() {#geoModifiedStereographicAlaska}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/modifiedStereographicAlaska.png" width="480" height="250">](https://www.jasondavies.com/maps/modified-stereographic/alaska/)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/modifiedStereographic.js) · A [modified stereographic](#geoModifiedStereographic) projection for Alaska.

## geoModifiedStereographicGs48() {#geoModifiedStereographicGs48}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/modifiedStereographicGs48.png" width="480" height="250">](https://www.jasondavies.com/maps/modified-stereographic/gs48/)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/modifiedStereographic.js) · A [modified stereographic](#geoModifiedStereographic) projection for the conterminous United States.

## geoModifiedStereographicGs50() {#geoModifiedStereographicGs50}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/modifiedStereographicGs50.png" width="480" height="250">](https://www.jasondavies.com/maps/modified-stereographic/gs50/)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/modifiedStereographic.js) · A [modified stereographic](#geoModifiedStereographic) projection for the United States including Alaska and Hawaii. Typically clipped to the geographic extent [[-180°, 15°], [-50°, 75°]].

## geoModifiedStereographicMiller() {#geoModifiedStereographicMiller}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/modifiedStereographicMiller.png" width="480" height="250">](https://www.jasondavies.com/maps/modified-stereographic/miller/)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/modifiedStereographic.js) · A [modified stereographic](#geoModifiedStereographic) projection for Europe and Africa. Typically clipped to the geographic extent [[-40°, -40°], [80°, 80°]].

## geoModifiedStereographicLee() {#geoModifiedStereographicLee}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/modifiedStereographicLee.png" width="480" height="250">](https://www.jasondavies.com/maps/modified-stereographic/lee/)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/modifiedStereographic.js) · A [modified stereographic](#geoModifiedStereographic) projection for the Pacific ocean.

## geoMollweide() {#geoMollweide}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/mollweide.png" width="480" height="250">](https://observablehq.com/@d3/mollweide)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/mollweide.js) · The equal-area, pseudocylindrical Mollweide projection. The oblique aspect is known as the [Atlantis projection](https://observablehq.com/@d3/atlantis). [Goode’s interrupted Mollweide](#interruptedMollweide) is also widely known.

## geoMtFlatPolarParabolic() {#geoMtFlatPolarParabolic}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/mtFlatPolarParabolic.png" width="480" height="250">](https://observablehq.com/@d3/flat-polar-parabolic)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/mtFlatPolarParabolic.js) · The McBryde–Thomas flat-polar parabolic pseudocylindrical equal-area projection.

## geoMtFlatPolarQuartic() {#geoMtFlatPolarQuartic}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/mtFlatPolarQuartic.png" width="480" height="250">](https://observablehq.com/@d3/flat-polar-quartic)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/mtFlatPolarQuartic.js) · The McBryde–Thomas flat-polar quartic pseudocylindrical equal-area projection.

## geoMtFlatPolarSinusoidal() {#geoMtFlatPolarSinusoidal}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/mtFlatPolarSinusoidal.png" width="480" height="250">](https://observablehq.com/@d3/flat-polar-sinusoidal)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/mtFlatPolarSinusoidal.js) · The McBryde–Thomas flat-polar sinusoidal equal-area projection.

## geoNaturalEarth1() {#geoNaturalEarth1}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/naturalEarth1.png" width="480" height="250">](https://observablehq.com/@d3/natural-earth)

<abbr title="d3-geo">⚾️</abbr> [Source](https://github.com/d3/d3-geo/blob/main/src/projection/naturalEarth1.js) · The Natural Earth projection.

## geoNaturalEarth2() {#geoNaturalEarth2}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/naturalEarth2.png" width="480" height="250">](https://observablehq.com/@d3/natural-earth-ii)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/naturalEarth2.js) · The [Natural Earth II](http://www.shadedrelief.com/NE2_proj/) projection. Compared to [Natural Earth](#geoNaturalEarth), it is slightly taller and rounder.

## geoNellHammer() {#geoNellHammer}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/nellHammer.png" width="480" height="250">](https://observablehq.com/@d3/nell-hammer)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/nellHammer.js) · The Nell–Hammer projection.

## geoNicolosi() {#geoNicolosi}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/nicolosi.png" width="480" height="250">](https://observablehq.com/@toja/nicolosi-globular-projection)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/nicolosi.js) · The Nicolosi globular projection.

## geoOrthographic() {#geoOrthographic}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/orthographic.png" width="480" height="250">](https://observablehq.com/@d3/orthographic)

<abbr title="d3-geo">⚾️</abbr> [Source](https://github.com/d3/d3-geo/blob/main/src/projection/orthographic.js) · The orthographic projection.

## geoPatterson() {#geoPatterson}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/patterson.png" width="480" height="250">](https://observablehq.com/@d3/patterson-cylindrical)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/patterson.js) · The Patterson cylindrical projection.

## geoPolyconic() {#geoPolyconic}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/polyconic.png" width="480" height="250">](https://observablehq.com/@d3/polyconic)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/polyconic.js) · The American polyconic projection.

## geoRectangularPolyconic() {#geoRectangularPolyconic}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/rectangularPolyconic.png" width="480" height="250">](https://observablehq.com/@d3/rectangular-polyconic)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/rectangularPolyconic.js) · The rectangular (War Office) polyconic projection.

### *rectangularPolyconic*.parallel([*parallel*]) {#rectangularPolyconic_parallel}

Defaults to 0°.

## geoRobinson() {#geoRobinson}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/robinson.png" width="480" height="250">](https://observablehq.com/@d3/robinson)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/robinson.js) · The Robinson projection.

## geoSatellite() {#geoSatellite}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/satellite.png" width="480" height="250">](https://observablehq.com/@d3/satellite)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/satellite.js) · The satellite (tilted perspective) projection.

### *satellite*.tilt([*tilt*]) {#satellite_tilt}

Defaults to 0°.

### *satellite*.distance([*distance*]) {#satellite_distance}

Distance from the center of the sphere to the point of view, as a proportion of the sphere’s radius; defaults to 2.0. The recommended maximum [clip angle](./projection.md#projection_clipAngle) for a given *distance* is acos(1 / *distance*) converted to degrees. If [tilt](#satellite_tilt) is also applied, then more conservative clipping may be necessary. For exact clipping, the in-development geographic projection pipeline is needed; see the [satellite explorer](https://observablehq.com/@d3/satellite-explorer).

## geoSinusoidal() {#geoSinusoidal}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/sinusoidal.png" width="480" height="250">](https://observablehq.com/@d3/sinusoidal)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/sinusoidal.js) · The sinusoidal projection.

## geoSinuMollweide() {#geoSinuMollweide}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/sinuMollweide.png" width="480" height="250">](https://observablehq.com/@d3/sinu-mollweide)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/sinuMollweide.js) · Allen K. Philbrick’s Sinu-Mollweide projection. See also the [interrupted form](#interruptedSinuMollweide).

## geoStereographic() {#geoStereographic}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/stereographic.png" width="480" height="250">](https://observablehq.com/@d3/stereographic)

<abbr title="d3-geo">⚾️</abbr> [Source](https://github.com/d3/d3-geo/blob/main/src/projection/stereographic.js) · The stereographic projection.

## geoTimes() {#geoTimes}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/times.png" width="480" height="250">](https://observablehq.com/@d3/times)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/times.js) · John Muir’s Times projection.

## geoTransverseMercator() {#geoTransverseMercator}

[<img src="https://raw.githubusercontent.com/d3/d3-geo/main/img/transverseMercator.png" width="480" height="250">](https://observablehq.com/@d3/transverse-mercator)

<abbr title="d3-geo">⚾️</abbr> [Source](https://github.com/d3/d3-geo/blob/main/src/projection/transverseMercator.js) · The transverse spherical Mercator projection.

## geoTwoPointAzimuthal(*point0*, *point1*) {#geoTwoPointAzimuthal}

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/twoPointAzimuthal.js) · The two-point azimuthal projection “shows correct azimuths (but not distances) from either of two points to any other point. [It can] be used to locate a ship at sea, given the exact location of two radio transmitters and the direction of the ship to the transmitters.” This projection does not support [*projection*.rotate](https://github.com/d3/d3-geo/blob/main/README.md#projection_rotate), as the rotation is fixed by the two given points.

## geoTwoPointAzimuthalUsa() {#geoTwoPointAzimuthalUsa}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/twoPointAzimuthalUsa.png" width="480" height="250">](https://www.jasondavies.com/maps/two-point-azimuthal/)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/twoPointAzimuthal.js) · The two-point azimuthal projection with points [-158°, 21.5°] and [-77°, 39°], approximately representing Honolulu, HI and Washington, D.C.

## geoTwoPointEquidistant(*point0*, *point1*) {#geoTwoPointEquidistant}

[Source](https://github.com/d3/d3-geo-projection/blob/main/src/twoPointEquidistant.js) · The two-point equidistant projection. This projection does not support [*projection*.rotate](./projection.md#projection_rotate), as the rotation is fixed by the two given points. Note: to show the whole Earth, this projection requires clipping to spherical polygons ([example](https://observablehq.com/@d3/two-point-equidistant)).

## geoTwoPointEquidistantUsa() {#geoTwoPointEquidistantUsa}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/twoPointEquidistantUsa.png" width="480" height="250">](https://www.jasondavies.com/maps/two-point-equidistant/)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/twoPointEquidistant.js) · The two-point equidistant projection with points [-158°, 21.5°] and [-77°, 39°], approximately representing Honolulu, HI and Washington, D.C.

## geoVanDerGrinten() {#geoVanDerGrinten}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/vanDerGrinten.png" width="480" height="250">](https://observablehq.com/@d3/van-der-grinten-i)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/vanDerGrinten.js) · The Van der Grinten projection.

## geoVanDerGrinten2() {#geoVanDerGrinten2}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/vanDerGrinten2.png" width="480" height="250">](https://observablehq.com/@d3/van-der-grinten-ii)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/vanDerGrinten2.js) · The Van der Grinten II projection.

## geoVanDerGrinten3() {#geoVanDerGrinten3}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/vanDerGrinten3.png" width="480" height="250">](https://observablehq.com/@d3/van-der-grinten-iii)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/vanDerGrinten3.js) · The Van der Grinten III projection.

## geoVanDerGrinten4() {#geoVanDerGrinten4}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/vanDerGrinten4.png" width="480" height="250">](https://observablehq.com/@d3/van-der-grinten-iv)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/vanDerGrinten4.js) · The Van der Grinten IV projection.

## geoWagner() {#geoWagner}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/wagner.png" width="480" height="250">](https://map-projections.net/d3-customizable-wagner/)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/wagner.js) · The Wagner projection is customizable: default values produce the Wagner VIII projection.

### *wagner*.poleline([*poleline*]) {#wagner_poleline}

Defaults to 65°.

### *wagner*.parallels([*parallels*]) {#wagner_parallels}

Defaults to 60°.

### *wagner*.inflation([*inflation*]) {#wagner_inflation}

Defaults to 20.

### *wagner*.ratio([*ratio*]) {#wagner_ratio}

Defaults to 200.

## geoWagner4() {#geoWagner4}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/wagner4.png" width="480" height="250">](https://observablehq.com/@d3/wagner-iv)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/wagner4.js) · The Wagner IV projection, also known as Putniṇš P2´.

## geoWagner6() {#geoWagner6}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/wagner6.png" width="480" height="250">](https://observablehq.com/@d3/wagner-vi)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/wagner6.js) · The Wagner VI projection.

## geoWagner7() {#geoWagner7}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/wagner7.png" width="480" height="250">](https://observablehq.com/@d3/wagner-vii)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/wagner7.js) · The Wagner VII projection.

## geoWiechel() {#geoWiechel}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/wiechel.png" width="480" height="250">](https://observablehq.com/@d3/wiechel)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/wiechel.js) · The Wiechel projection.

## geoWinkel3() {#geoWinkel3}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/winkel3.png" width="480" height="250">](https://observablehq.com/@d3/winkel-tripel)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/winkel3.js) · The Winkel tripel projection.

### Interrupted Projections

## geoInterrupt(*project*, *lobes*) {#geoInterrupt}

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/interrupted/index.js) · Defines a new interrupted projection for the specified [raw projection](./projection.md#raw-projections) function *project* and the specified array of *lobes*. The array *lobes* contains two elements representing the hemilobes for the northern hemisphere and the southern hemisphere, respectively. Each hemilobe is an array of triangles, with each triangle represented as three points (in degrees): the start, midpoint, and end. For example, the lobes in [Goode’s interrupted homolosine](#geoInterruptedHomolosine) projection are defined as:

```json
[
  [
    [[-180,   0], [-100,  90], [ -40,   0]],
    [[ -40,   0], [  30,  90], [ 180,   0]]
  ],
  [
    [[-180,   0], [-160, -90], [-100,   0]],
    [[-100,   0], [ -60, -90], [ -20,   0]],
    [[ -20,   0], [  20, -90], [  80,   0]],
    [[  80,   0], [ 140, -90], [ 180,   0]]
  ]
]
```

Note: interrupted projections typically require clipping to the sphere.

### *interrupted*.lobes([*lobes*]) {#interrupted_lobes}

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/interrupted/index.js) · If *lobes* is specified, sets the new array of hemilobes and returns this projection; see [d3.geoInterrupt](#geoInterrupt) for details on the format of the hemilobes array. If *lobes* is not specified, returns the current array of hemilobes.

## geoInterruptedHomolosine() {#geoInterruptedHomolosine}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/interruptedHomolosine.png" width="480" height="250">](https://observablehq.com/@d3/interrupted-goode-homolosine)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/interrupted/homolosine.js) · Goode’s interrupted [homolosine projection](#geoHomolosine). Its [ocean-centric aspect](https://observablehq.com/@d3/interrupted-homolosine-oceans) is also well-known.

## geoInterruptedSinusoidal() {#geoInterruptedSinusoidal}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/interruptedSinusoidal.png" width="480" height="250">](https://observablehq.com/@d3/interrupted-sinusoidal)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/interrupted/sinusoidal.js) · An interrupted [sinusoidal projection](#geoSinusoidal) with asymmetrical lobe boundaries that emphasize land masses over oceans, after the Swedish *Nordisk Världs Atlas* as reproduced by [C.A. Furuti](https://web.archive.org/web/20150928042327/http://www.progonos.com/furuti/MapProj/Normal/ProjInt/projInt.html#InterruptedSansonFlamsteed).

## geoInterruptedBoggs() {#geoInterruptedBoggs}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/interruptedBoggs.png" width="480" height="250">](https://observablehq.com/@d3/interrupted-boggs-eumorphic)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/interrupted/boggs.js) · Bogg’s interrupted [eumorphic projection](#geoBoggs).

## geoInterruptedSinuMollweide() {#geoInterruptedSinuMollweide}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/interruptedSinuMollweide.png" width="480" height="250">](https://observablehq.com/@d3/interrupted-sinu-mollweide)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/interrupted/sinuMollweide.js) · Alan K. Philbrick’s interrupted [sinu-Mollweide projection](#geoSinuMollweide).

## geoInterruptedMollweide() {#geoInterruptedMollweide}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/interruptedMollweide.png" width="480" height="250">](https://observablehq.com/@d3/interrupted-mollweide)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/interrupted/mollweide.js) · Goode’s interrupted [Mollweide projection](#geoMollweide).

## geoInterruptedMollweideHemispheres() {#geoInterruptedMollweideHemispheres}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/interruptedMollweideHemispheres.png" width="480" height="250">](https://observablehq.com/@d3/mollweide-hemispheres)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/interrupted/mollweideHemispheres.js) · The [Mollweide projection](#geoMollweide) interrupted into two (equal-area) hemispheres.

## geoInterruptedQuarticAuthalic() {#geoInterruptedQuarticAuthalic}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/interruptedQuarticAuthalic.png" width="480" height="250">](https://observablehq.com/@piwodlaiwo/interrupted-quartic-authalic-projection)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/quarticAuthalic.js) · The [quartic authalic projection](https://observablehq.com/@d3/hammer?b=Infinity) interrupted into two hemispheres.

### Polyhedral Projections

## geoPolyhedral(*tree*, *face*) {#geoPolyhedral}

<abbr title="d3-geo-projection">🗺️</abbr> <abbr title="d3-geo-polygon">⚽️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/polyhedral/index.js)· Defines a new polyhedral projection. The *tree* is a spanning tree of polygon face nodes; each *node* is assigned a *node*.transform matrix. The *face* function returns the appropriate *node* for a given *lambda* and *phi* in radians. Use [*projection*.angle](./projection.md#projection_angle) to set the orientation of the map (the *angle* defaults to -30°).

### *geoPolyhedral*.tree() {#geoPolyhedral_tree}

<abbr title="d3-geo-polygon">⚽️</abbr> [Source](https://github.com/d3/d3-geo-polygon/blob/master/src/polyhedral/index.js) · Returns the spanning tree of the polyhedron, from which one can infer the faces’ centers, polygons, shared edges etc.

## geoPolyhedralButterfly() {#geoPolyhedralButterfly}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/polyhedralButterfly.png" width="480" height="250">](https://observablehq.com/@d3/polyhedral-gnomonic)

<abbr title="d3-geo-projection">🗺️</abbr> <abbr title="d3-geo-polygon">⚽️</abbr>[Source](https://github.com/d3/d3-geo-projection/blob/main/src/polyhedral/butterfly.js) · The gnomonic butterfly projection.

## geoPolyhedralCollignon() {#geoPolyhedralCollignon}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/polyhedralCollignon.png" width="480" height="250">](https://www.jasondavies.com/maps/collignon-butterfly/)

<abbr title="d3-geo-projection">🗺️</abbr> <abbr title="d3-geo-polygon">⚽️</abbr>[Source](https://github.com/d3/d3-geo-projection/blob/main/src/polyhedral/collignon.js) · The Collignon butterfly projection.

## geoPolyhedralWaterman() {#geoPolyhedralWaterman}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/polyhedralWaterman.png" width="480" height="250">](https://www.jasondavies.com/maps/waterman-butterfly/)

<abbr title="d3-geo-projection">🗺️</abbr> <abbr title="d3-geo-polygon">⚽️</abbr>[Source](https://github.com/d3/d3-geo-projection/blob/main/src/polyhedral/waterman.js) · A butterfly projection inspired by Steve Waterman’s design.

### Quincuncial Projections

## geoQuincuncial(*project*) {#geoQuincuncial}

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/quincuncial/index.js) · Defines a new quincuncial projection for the specified [raw projection](#raw-projections) function *project*. The default rotation is [-90°, -90°, 45°] and the default clip angle is 180° - ε.

## geoGringortenQuincuncial() {#geoGringortenQuincuncial}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/gringortenQuincuncial.png" width="480" height="250">](https://observablehq.com/@d3/gringorten-quincuncial)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/quincuncial/gringorten.js) · The Gringorten square equal-area projection.

## geoPeirceQuincuncial() {#geoPeirceQuincuncial}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/main/img/peirceQuincuncial.png" width="480" height="250">](https://observablehq.com/@d3/peirce-quincuncial)

<abbr title="d3-geo-projection">🗺️</abbr> [Source](https://github.com/d3/d3-geo-projection/blob/main/src/quincuncial/peirce.js) · The Peirce quincuncial projection is the quincuncial form of the [Guyou projection](#geoGuyou).

## geoPolyhedralVoronoi([*parents*], [*polygons*], [*faceProjection*], [*faceFind*]) {#geoPolyhedralVoronoi}

<abbr title="d3-geo-polygon">⚽️</abbr> [Source](https://github.com/d3/d3-geo-polygon/blob/master/src/polyhedral/voronoi.js) · Returns a polyhedral projection based on the *polygons*, arranged in a tree according to the *parents* list. *polygons* are a GeoJSON FeatureCollection of geoVoronoi cells, which should indicate the corresponding sites (see [d3-geo-voronoi](https://github.com/Fil/d3-geo-voronoi)). An optional [*faceProjection*](#geoPolyhedral) is passed to geoPolyhedral()—note that the gnomonic projection on the polygons’ sites is the only faceProjection that works in the general case.

The *projection*.parents([*parents*]), *projection*.polygons([*polygons*]), *projection*.faceProjection([*faceProjection*]) methods set and read the corresponding options. Use *projection*.faceFind(voronoi.find) for faster results.

## geoCubic() {#geoCubic}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-polygon/master/img/cubic.png" width="480" height="250">](https://observablehq.com/@fil/cubic-projections)

<abbr title="d3-geo-polygon">⚽️</abbr> [Source](https://github.com/d3/d3-geo-polygon/blob/master/src/cubic.js) · The cubic projection.

## geoDodecahedral() {#geoDodecahedral}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-polygon/master/img/dodecahedral.png" width="480" height="250">](https://observablehq.com/@fil/dodecahedral-projection)

<abbr title="d3-geo-polygon">⚽️</abbr> [Source](https://github.com/d3/d3-geo-polygon/blob/master/src/polyhedral/dodecahedral.js) · The dodecahedral projection.

## geoIcosahedral() {#geoIcosahedral}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-polygon/master/img/icosahedral.png" width="480" height="250">](https://observablehq.com/@fil/icosahedral-projections)

<abbr title="d3-geo-polygon">⚽️</abbr> [Source](https://github.com/d3/d3-geo-polygon/blob/master/src/icosahedral.js) · The icosahedral projection.

## geoAirocean() {#geoAirocean}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-polygon/master/img/airocean.png" width="480" height="250">](https://observablehq.com/@fil/airocean-projection)

<abbr title="d3-geo-polygon">⚽️</abbr> [Source](https://github.com/d3/d3-geo-polygon/blob/master/src/airocean.js) · Buckminster Fuller’s Airocean projection (also known as “Dymaxion”), based on a very specific arrangement of the icosahedron which allows continuous continent shapes. Fuller’s triangle transformation, as formulated by Robert W. Gray (and implemented by Philippe Rivière), makes the projection almost equal-area.

## geoCahillKeyes() {#geoCahillKeyes}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-polygon/master/img/cahillKeyes.png" width="480" height="250">](http://www.genekeyes.com/)

<abbr title="d3-geo-polygon">⚽️</abbr> [Source](https://github.com/d3/d3-geo-polygon/blob/master/src/cahillKeyes.js) · The Cahill-Keyes projection, designed by Gene Keyes (1975), is built on Bernard J. S. Cahill’s 1909 octant design. Implementation by Mary Jo Graça (2011), ported to D3 by Enrico Spinielli (2013).

## geoImago() {#geoImago}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-polygon/master/img/imago.png" width="480" height="250">](https://kunimune.home.blog/2017/11/23/the-secrets-of-the-authagraph-revealed/)

<abbr title="d3-geo-polygon">⚽️</abbr> [Source](https://github.com/d3/d3-geo-polygon/blob/master/src/imago.js) · The Imago projection, engineered by Justin Kunimune (2017), is inspired by Hajime Narukawa’s AuthaGraph design (1999).

### *imago*.k([*k*]) {#imago_k}

Exponent. Useful values include 0.59 (default, minimizes angular distortion of the continents), 0.68 (gives the closest approximation of the AuthaGraph) and 0.72 (prevents kinks in the graticule).

### *imago*.shift([*shift*]) {#imago_shift}

Horizontal shift. Defaults to 1.16.

## geoTetrahedralLee() {#geoTetrahedralLee}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-polygon/master/img/tetrahedralLee.png" width="480" height="250">](https://observablehq.com/@d3/lees-tetrahedral)

<abbr title="d3-geo-polygon">⚽️</abbr> [Source](https://github.com/d3/d3-geo-polygon/blob/master/src/tetrahedralLee.js) · Lee’s tetrahedral conformal projection. Default <i>angle</i> is +30°, apex up (-30° for base up, apex down). Default aspect uses *projection*.rotate([30, 180]) and has the North Pole at the triangle’s center -- use *projection*.rotate([-30, 0]) for the [South aspect](https://observablehq.com/@fil/lee-projection).

## geoCox() {#geoCox}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-polygon/master/img/cox.png" width="480" height="250">](https://visionscarto.net/cox-conformal-projection)

<abbr title="d3-geo-polygon">⚽️</abbr> [Source](https://github.com/d3/d3-geo-polygon/blob/master/src/cox.js) · The Cox conformal projection.

## geoComplexLog([*planarProjectionRaw*[*, cutoffLatitude*]]) {#geoComplexLog}

[<img src="https://raw.githubusercontent.com/d3/d3-geo-polygon/master/img/complexLog.png" width="480" height="250">](https://cgmi.github.io/complex-log-projection/)

<abbr title="d3-geo-polygon">⚽️</abbr> [Source](https://github.com/d3/d3-geo-polygon/blob/master/src/complexLog.js) · Complex logarithmic view. This projection is based on the papers by Joachim Böttger *et al.*:

* [Detail‐In‐Context Visualization for Satellite Imagery (2008)](https://doi.org/10.1111/j.1467-8659.2008.01156.x)
* [Complex Logarithmic Views for Small Details in Large Contexts (2006)](https://doi.org/10.1109/TVCG.2006.126)

The specified raw projection <i>planarProjectionRaw</i> is used to project onto the complex plane on which the complex logarithm is applied.
Recommended are the raw projections for [azimuthal equal-area](#geoAzimuthalEqualArea) (default) or [azimuthal equidistant](#geoAzimuthalEquidistant).

*cutoffLatitude* is the latitude relative to the projection center at which to cutoff/clip the projection, lower values result in more detail around the projection center. Value must be < 0 because complex log projects the origin to infinity.

<a href="#complexLog_planarProjectionRaw" name="complexLog_planarProjectionRaw">#</a> <i>complexLog</i>.<b>planarProjectionRaw</b>([<i>projectionRaw</i>])

If <i>projectionRaw</i> is specified, sets the planar raw projection. See above. If <i>projectionRaw</i> is not specified, returns the current planar raw projection.

<a href="#complexLog_cutoffLatitude" name="complexLog_cutoffLatitude">#</a> <i>complexLog</i>.<b>cutoffLatitude</b>([<i>latitude</i>])

If <i>latitude</i> is specified, sets the cutoff latitude. See above. If <i>latitude</i> is not specified, returns the current cutoff latitude.
