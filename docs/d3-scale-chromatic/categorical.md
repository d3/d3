<script setup>

import * as d3 from "d3";
import ColorSwatches from "../components/ColorSwatches.vue";

</script>

# Categorical schemes

For example, to create a categorical color scale using the [Accent](#schemeAccent) color scheme:

```js
const color = d3.scaleOrdinal(d3.schemeAccent);
```

## schemeCategory10 {#schemeCategory10}

<ColorSwatches :colors="d3.schemeCategory10" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/category10.js) · An array of ten categorical colors represented as RGB hexadecimal strings.

## schemeAccent {#schemeAccent}

<ColorSwatches :colors="d3.schemeAccent" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/Accent.js) · An array of eight categorical colors represented as RGB hexadecimal strings.

## schemeDark2 {#schemeDark2}

<ColorSwatches :colors="d3.schemeDark2" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/Dark2.js) · An array of eight categorical colors represented as RGB hexadecimal strings.

## schemeObservable10 {#schemeObservable10}

<ColorSwatches :colors="d3.schemeObservable10" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/observable10.js) · An array of ten categorical colors represented as RGB hexadecimal strings.

## schemePaired {#schemePaired}

<ColorSwatches :colors="d3.schemePaired" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/Paired.js) · An array of twelve categorical colors represented as RGB hexadecimal strings.

## schemePastel1 {#schemePastel1}

<ColorSwatches :colors="d3.schemePastel1" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/Pastel1.js) · An array of nine categorical colors represented as RGB hexadecimal strings.

## schemePastel2 {#schemePastel2}

<ColorSwatches :colors="d3.schemePastel2" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/Pastel2.js) · An array of eight categorical colors represented as RGB hexadecimal strings.

## schemeSet1 {#schemeSet1}

<ColorSwatches :colors="d3.schemeSet1" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/Set1.js) · An array of nine categorical colors represented as RGB hexadecimal strings.

## schemeSet2 {#schemeSet2}

<ColorSwatches :colors="d3.schemeSet2" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/Set2.js) · An array of eight categorical colors represented as RGB hexadecimal strings.

## schemeSet3 {#schemeSet3}

<ColorSwatches :colors="d3.schemeSet3" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/Set3.js) · An array of twelve categorical colors represented as RGB hexadecimal strings.

## schemeTableau10 {#schemeTableau10}

<ColorSwatches :colors="d3.schemeTableau10" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/categorical/Tableau10.js) · An array of ten categorical colors authored by Tableau as part of [Tableau 10](https://www.tableau.com/about/blog/2016/7/colors-upgrade-tableau-10-56782) represented as RGB hexadecimal strings.
