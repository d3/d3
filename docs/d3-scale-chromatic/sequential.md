<script setup>

import * as d3 from "d3";
import ColorRamp from "../components/ColorRamp.vue";
import ColorSwatches from "../components/ColorSwatches.vue";

</script>

# Sequential schemes

Sequential color schemes are available as continuous interpolators (often used with [d3.scaleSequential](../d3-scale/sequential.md)) and as discrete schemes (often used with [d3.scaleOrdinal](../d3-scale/ordinal.md)).

Each discrete scheme, such as [d3.schemeBlues](#schemeBlues), is represented as an array of arrays of hexadecimal color strings. The *k*th element of this array contains the color scheme of size *k*; for example, `d3.schemeBlues[9]` contains an array of nine strings representing the nine colors of the blue sequential color scheme. Sequential color schemes support a size *k* ranging from 3 to 9.

To create a sequential discrete nine-color scale using the [Blues](#schemeBlues) color scheme:

```js
const color = d3.scaleOrdinal(d3.schemeBlues[9]);
```

To create a sequential continuous color scale using the [Blues](#interpolateBlues) color scheme:

```js
const color = d3.scaleSequential(d3.interpolateBlues);
```

## interpolateBlues(t) {#interpolateBlues}

<ColorRamp :color="d3.interpolateBlues" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Blues.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “Blues” sequential color scheme represented as an RGB string.

## interpolateGreens(t) {#interpolateGreens}

<ColorRamp :color="d3.interpolateGreens" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Greens.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “Greens” sequential color scheme represented as an RGB string.

## interpolateGreys(t) {#interpolateGreys}

<ColorRamp :color="d3.interpolateGreys" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Greys.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “Greys” sequential color scheme represented as an RGB string.

## interpolateOranges(t) {#interpolateOranges}

<ColorRamp :color="d3.interpolateOranges" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Oranges.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “Oranges” sequential color scheme represented as an RGB string.

## interpolatePurples(t) {#interpolatePurples}

<ColorRamp :color="d3.interpolatePurples" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Purples.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “Purples” sequential color scheme represented as an RGB string.

## interpolateReds(t) {#interpolateReds}

<ColorRamp :color="d3.interpolateReds" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Reds.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “Reds” sequential color scheme represented as an RGB string.

## interpolateTurbo(t) {#interpolateTurbo}

<ColorRamp :color="d3.interpolateTurbo" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/turbo.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “turbo” color scheme by [Anton Mikhailov](https://ai.googleblog.com/2019/08/turbo-improved-rainbow-colormap-for.html).

## interpolateViridis(t) {#interpolateViridis}

<ColorRamp :color="d3.interpolateViridis" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/viridis.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “viridis” perceptually-uniform color scheme designed by [van der Walt, Smith and Firing](https://bids.github.io/colormap/) for matplotlib, represented as an RGB string.

## interpolateInferno(t) {#interpolateInferno}

<ColorRamp :color="d3.interpolateInferno" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/viridis.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “inferno” perceptually-uniform color scheme designed by [van der Walt and Smith](https://bids.github.io/colormap/) for matplotlib, represented as an RGB string.

## interpolateMagma(t) {#interpolateMagma}

<ColorRamp :color="d3.interpolateMagma" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/viridis.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “magma” perceptually-uniform color scheme designed by [van der Walt and Smith](https://bids.github.io/colormap/) for matplotlib, represented as an RGB string.

## interpolatePlasma(t) {#interpolatePlasma}

<ColorRamp :color="d3.interpolatePlasma" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/viridis.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “plasma” perceptually-uniform color scheme designed by [van der Walt and Smith](https://bids.github.io/colormap/) for matplotlib, represented as an RGB string.

## interpolateCividis(t) {#interpolateCividis}

<ColorRamp :color="d3.interpolateCividis" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/cividis.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “cividis” color vision deficiency-optimized color scheme designed by [Nuñez, Anderton, and Renslow](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0199239), represented as an RGB string.

## interpolateWarm(t) {#interpolateWarm}

<ColorRamp :color="d3.interpolateWarm" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/rainbow.js) · Given a number *t* in the range [0,1], returns the corresponding color from a 180° rotation of [Niccoli’s perceptual rainbow](https://mycarta.wordpress.com/2013/02/21/perceptual-rainbow-palette-the-method/), represented as an RGB string.

## interpolateCool(t) {#interpolateCool}

<ColorRamp :color="d3.interpolateCool" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/rainbow.js) · Given a number *t* in the range [0,1], returns the corresponding color from [Niccoli’s perceptual rainbow](https://mycarta.wordpress.com/2013/02/21/perceptual-rainbow-palette-the-method/), represented as an RGB string.

## interpolateCubehelixDefault(t) {#interpolateCubehelixDefault}

<ColorRamp :color="d3.interpolateCubehelixDefault" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/cubehelix.js) · Given a number *t* in the range [0,1], returns the corresponding color from [Green’s default Cubehelix](http://www.mrao.cam.ac.uk/~dag/CUBEHELIX/) represented as an RGB string.

## interpolateBuGn(t) {#interpolateBuGn}

<ColorRamp :color="d3.interpolateBuGn" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/BuGn.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “BuGn” sequential color scheme represented as an RGB string.

## interpolateBuPu(t) {#interpolateBuPu}

<ColorRamp :color="d3.interpolateBuPu" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/BuPu.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “BuPu” sequential color scheme represented as an RGB string.

## interpolateGnBu(t) {#interpolateGnBu}

<ColorRamp :color="d3.interpolateGnBu" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/GnBu.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “GnBu” sequential color scheme represented as an RGB string.

## interpolateOrRd(t) {#interpolateOrRd}

<ColorRamp :color="d3.interpolateOrRd" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/OrRd.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “OrRd” sequential color scheme represented as an RGB string.

## interpolatePuBuGn(t) {#interpolatePuBuGn}

<ColorRamp :color="d3.interpolatePuBuGn" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/PuBuGn.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “PuBuGn” sequential color scheme represented as an RGB string.

## interpolatePuBu(t) {#interpolatePuBu}

<ColorRamp :color="d3.interpolatePuBu" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/PuBu.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “PuBu” sequential color scheme represented as an RGB string.

## interpolatePuRd(t) {#interpolatePuRd}

<ColorRamp :color="d3.interpolatePuRd" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/PuRd.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “PuRd” sequential color scheme represented as an RGB string.

## interpolateRdPu(t) {#interpolateRdPu}

<ColorRamp :color="d3.interpolateRdPu" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/RdPu.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “RdPu” sequential color scheme represented as an RGB string.

## interpolateYlGnBu(t) {#interpolateYlGnBu}

<ColorRamp :color="d3.interpolateYlGnBu" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/YlGnBu.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “YlGnBu” sequential color scheme represented as an RGB string.

## interpolateYlGn(t) {#interpolateYlGn}

<ColorRamp :color="d3.interpolateYlGn" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/YlGn.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “YlGn” sequential color scheme represented as an RGB string.

## interpolateYlOrBr(t) {#interpolateYlOrBr}

<ColorRamp :color="d3.interpolateYlOrBr" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/YlOrBr.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “YlOrBr” sequential color scheme represented as an RGB string.

## interpolateYlOrRd(t) {#interpolateYlOrRd}

<ColorRamp :color="d3.interpolateYlOrRd" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/YlOrRd.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “YlOrRd” sequential color scheme represented as an RGB string.

## schemeBlues[*k*] {#schemeBlues}

<ColorSwatches :colors="d3.schemeBlues[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Blues.js) · The “Blues” discrete sequential color scheme of size *k* in 3–9.

## schemeGreens[*k*] {#schemeGreens}

<ColorSwatches :colors="d3.schemeGreens[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Greens.js) · The “Greens” discrete sequential color scheme of size *k* in 3–9.

## schemeGreys[*k*] {#schemeGreys}

<ColorSwatches :colors="d3.schemeGreys[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Greys.js) · The “Greys” discrete sequential color scheme of size *k* in 3–9.

## schemeOranges[*k*] {#schemeOranges}

<ColorSwatches :colors="d3.schemeOranges[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Oranges.js) · The “Oranges” discrete sequential color scheme of size *k* in 3–9.

## schemePurples[*k*] {#schemePurples}

<ColorSwatches :colors="d3.schemePurples[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Purples.js) · The “Purples” discrete sequential color scheme of size *k* in 3–9.

## schemeReds[*k*] {#schemeReds}

<ColorSwatches :colors="d3.schemeReds[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-single/Reds.js) · The “Reds” discrete sequential color scheme of size *k* in 3–9.

## schemeBuGn[*k*] {#schemeBuGn}

<ColorSwatches :colors="d3.schemeBuGn[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/BuGn.js) · The “BuGn” discrete sequential color scheme of size *k* in 3–9.

## schemeBuPu[*k*] {#schemeBuPu}

<ColorSwatches :colors="d3.schemeBuPu[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/BuPu.js) · The “BuPu” discrete sequential color scheme of size *k* in 3–9.

## schemeGnBu[*k*] {#schemeGnBu}

<ColorSwatches :colors="d3.schemeGnBu[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/GnBu.js) · The “GnBu” discrete sequential color scheme of size *k* in 3–9.

## schemeOrRd[*k*] {#schemeOrRd}

<ColorSwatches :colors="d3.schemeOrRd[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/OrRd.js) · The “OrRd” discrete sequential color scheme of size *k* in 3–9.

## schemePuBuGn[*k*] {#schemePuBuGn}

<ColorSwatches :colors="d3.schemePuBuGn[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/PuBuGn.js) · The “PuBuGn” discrete sequential color scheme of size *k* in 3–9.

## schemePuBu[*k*] {#schemePuBu}

<ColorSwatches :colors="d3.schemePuBu[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/PuBu.js) · The “PuBu” discrete sequential color scheme of size *k* in 3–9.

## schemePuRd[*k*] {#schemePuRd}

<ColorSwatches :colors="d3.schemePuRd[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/PuRd.js) · The “PuRd” discrete sequential color scheme of size *k* in 3–9.

## schemeRdPu[*k*] {#schemeRdPu}

<ColorSwatches :colors="d3.schemeRdPu[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/RdPu.js) · The “RdPu” discrete sequential color scheme of size *k* in 3–9.

## schemeYlGnBu[*k*] {#schemeYlGnBu}

<ColorSwatches :colors="d3.schemeYlGnBu[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/YlGnBu.js) · The “YlGnBu” discrete sequential color scheme of size *k* in 3–9.

## schemeYlGn[*k*] {#schemeYlGn}

<ColorSwatches :colors="d3.schemeYlGn[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/YlGn.js) · The “YlGn” discrete sequential color scheme of size *k* in 3–9.

## schemeYlOrBr[*k*] {#schemeYlOrBr}

<ColorSwatches :colors="d3.schemeYlOrBr[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/YlOrBr.js) · The “YlOrBr” discrete sequential color scheme of size *k* in 3–9.

## schemeYlOrRd[*k*] {#schemeYlOrRd}

<ColorSwatches :colors="d3.schemeYlOrRd[9]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/YlOrRd.js) · The “YlOrRd” discrete sequential color scheme of size *k* in 3–9.

