<script setup>

import * as d3 from "d3";
import ColorRamp from "../components/ColorRamp.vue";
import ColorSwatches from "../components/ColorSwatches.vue";

</script>

# Diverging schemes

Diverging color schemes are available as continuous interpolators (often used with [d3.scaleSequential](../d3-scale/sequential.md)) and as discrete schemes (often used with [d3.scaleOrdinal](../d3-scale/ordinal.md)).

Each discrete scheme, such as [d3.schemeBrBG](#schemeBrBG), is represented as an array of arrays of hexadecimal color strings. The *k*th element of this array contains the color scheme of size *k*; for example, `d3.schemeBrBG[9]` contains an array of nine strings representing the nine colors of the brown-blue-green diverging color scheme. Diverging color schemes support a size *k* ranging from 3 to 11.

To create a diverging continuous color scale using the [PiYG](#interpolatePiYG) color scheme:

```js
const color = d3.scaleSequential(d3.interpolatePiYG);
```

To create a diverging discrete nine-color scale using the [PiYG](#schemePiYG) color scheme:

```js
const color = d3.scaleOrdinal(d3.schemePiYG[9]);
```

## interpolateBrBG(t) {#interpolateBrBG}

<ColorRamp :color="d3.interpolateBrBG" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/BrBG.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “BrBG” diverging color scheme represented as an RGB string.

## interpolatePRGn(t) {#interpolatePRGn}

<ColorRamp :color="d3.interpolatePRGn" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/PRGn.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “PRGn” diverging color scheme represented as an RGB string.

## interpolatePiYG(t) {#interpolatePiYG}

<ColorRamp :color="d3.interpolatePiYG" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/PiYG.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “PiYG” diverging color scheme represented as an RGB string.

## interpolatePuOr(t) {#interpolatePuOr}

<ColorRamp :color="d3.interpolatePuOr" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/PuOr.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “PuOr” diverging color scheme represented as an RGB string.

## interpolateRdBu(t) {#interpolateRdBu}

<ColorRamp :color="d3.interpolateRdBu" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/RdBu.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “RdBu” diverging color scheme represented as an RGB string.

## interpolateRdGy(t) {#interpolateRdGy}

<ColorRamp :color="d3.interpolateRdGy" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/RdGy.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “RdGy” diverging color scheme represented as an RGB string.

## interpolateRdYlBu(t) {#interpolateRdYlBu}

<ColorRamp :color="d3.interpolateRdYlBu" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/RdYlBu.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “RdYlBu” diverging color scheme represented as an RGB string.

## interpolateRdYlGn(t) {#interpolateRdYlGn}

<ColorRamp :color="d3.interpolateRdYlGn" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/RdYlGn.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “RdYlGn” diverging color scheme represented as an RGB string.

## interpolateSpectral(t) {#interpolateSpectral}

<ColorRamp :color="d3.interpolateSpectral" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/Spectral.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “Spectral” diverging color scheme represented as an RGB string.

## schemeBrBG[*k*] {#schemeBrBG}

<ColorSwatches :colors="d3.schemeBrBG[11]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/BrBG.js) · The “BrBG” discrete diverging color scheme of size *k* in 3–11.

## schemePRGn[*k*] {#schemePRGn}

<ColorSwatches :colors="d3.schemePRGn[11]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/PRGn.js) · The “PRGn” discrete diverging color scheme of size *k* in 3–11.

## schemePiYG[*k*] {#schemePiYG}

<ColorSwatches :colors="d3.schemePiYG[11]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/PiYG.js) · The “PiYG” discrete diverging color scheme of size *k* in 3–11.

## schemePuOr[*k*] {#schemePuOr}

<ColorSwatches :colors="d3.schemePuOr[11]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/PuOr.js) · The “PuOr” discrete diverging color scheme of size *k* in 3–11.

## schemeRdBu[*k*] {#schemeRdBu}

<ColorSwatches :colors="d3.schemeRdBu[11]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/RdBu.js) · The “RdBu” discrete diverging color scheme of size *k* in 3–11.

## schemeRdGy[*k*] {#schemeRdGy}

<ColorSwatches :colors="d3.schemeRdGy[11]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/RdGy.js) · The “RdGy” discrete diverging color scheme of size *k* in 3–11.

## schemeRdYlBu[*k*] {#schemeRdYlBu}

<ColorSwatches :colors="d3.schemeRdYlBu[11]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/RdYlBu.js) · The “RdYlBu” discrete diverging color scheme of size *k* in 3–11.

## schemeRdYlGn[*k*] {#schemeRdYlGn}

<ColorSwatches :colors="d3.schemeRdYlGn[11]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/RdYlGn.js) · The “RdYlGn” discrete diverging color scheme of size *k* in 3–11.

## schemeSpectral[*k*] {#schemeSpectral}

<ColorSwatches :colors="d3.schemeSpectral[11]" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/diverging/Spectral.js) · The “Spectral” discrete diverging color scheme of size *k* in 3–11.
