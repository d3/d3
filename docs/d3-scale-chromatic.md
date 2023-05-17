# d3-scale-chromatic

This module provides sequential, diverging and categorical color schemes designed to work with [d3-scale](https://github.com/d3/d3-scale)’s [d3.scaleOrdinal](https://github.com/d3/d3-scale#ordinal-scales) and [d3.scaleSequential](https://github.com/d3/d3-scale#sequential-scales). Most of these schemes are derived from Cynthia A. Brewer’s [ColorBrewer](http://colorbrewer2.org). Since ColorBrewer publishes only discrete color schemes, the sequential and diverging scales are interpolated using [uniform B-splines](https://bl.ocks.org/mbostock/048d21cf747371b11884f75ad896e5a5).

For example, to create a categorical color scale using the [Accent](#schemeAccent) color scheme:

```js
var accent = d3.scaleOrdinal(d3.schemeAccent);
```

To create a sequential discrete nine-color scale using the [Blues](#schemeBlues) color scheme:

```js
var blues = d3.scaleOrdinal(d3.schemeBlues[9]);
```

To create a diverging, continuous color scale using the [PiYG](#interpolatePiYG) color scheme:

```js
var piyg = d3.scaleSequential(d3.interpolatePiYG);
```

## Categorical schemes

### d3.schemeCategory10

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/categorical/category10.js "Source")

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/category10.png" width="100%" height="40" alt="category10">

An array of ten categorical colors represented as RGB hexadecimal strings.

### d3.schemeAccent

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/categorical/Accent.js "Source")

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Accent.png" width="100%" height="40" alt="Accent">

An array of eight categorical colors represented as RGB hexadecimal strings.

### d3.schemeDark2

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/categorical/Dark2.js "Source")

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Dark2.png" width="100%" height="40" alt="Dark2">

An array of eight categorical colors represented as RGB hexadecimal strings.

### d3.schemePaired

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/categorical/Paired.js "Source")

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Paired.png" width="100%" height="40" alt="Paired">

An array of twelve categorical colors represented as RGB hexadecimal strings.

### d3.schemePastel1

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/categorical/Pastel1.js "Source")

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Pastel1.png" width="100%" height="40" alt="Pastel1">

An array of nine categorical colors represented as RGB hexadecimal strings.

### d3.schemePastel2

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/categorical/Pastel2.js "Source")

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Pastel2.png" width="100%" height="40" alt="Pastel2">

An array of eight categorical colors represented as RGB hexadecimal strings.

### d3.schemeSet1

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/categorical/Set1.js "Source")

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Set1.png" width="100%" height="40" alt="Set1">

An array of nine categorical colors represented as RGB hexadecimal strings.

### d3.schemeSet2

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/categorical/Set2.js "Source")

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Set2.png" width="100%" height="40" alt="Set2">

An array of eight categorical colors represented as RGB hexadecimal strings.

### d3.schemeSet3

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/categorical/Set3.js "Source")

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Set3.png" width="100%" height="40" alt="Set3">

An array of twelve categorical colors represented as RGB hexadecimal strings.

### d3.schemeTableau10

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/categorical/Tableau10.js "Source")

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Tableau10.png" width="100%" height="40" alt="Tableau10">

An array of ten categorical colors authored by Tableau as part of [Tableau 10](https://www.tableau.com/about/blog/2016/7/colors-upgrade-tableau-10-56782) represented as RGB hexadecimal strings.

## Diverging schemes

Diverging color schemes are available as continuous interpolators (often used with [d3.scaleSequential](https://github.com/d3/d3-scale/blob/master/README.md#sequential-scales)) and as discrete schemes (often used with [d3.scaleOrdinal](https://github.com/d3/d3-scale/blob/master/README.md#ordinal-scales)). Each discrete scheme, such as [d3.schemeBrBG](#schemeBrBG), is represented as an array of arrays of hexadecimal color strings. The *k*th element of this array contains the color scheme of size *k*; for example, `d3.schemeBrBG[9]` contains an array of nine strings representing the nine colors of the brown-blue-green diverging color scheme. Diverging color schemes support a size *k* ranging from 3 to 11.

### d3.interpolateBrBG(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/diverging/BrBG.js "Source")
<br><a href="#schemeBrBG" name="schemeBrBG">#</a> d3.<b>schemeBrBG</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/BrBG.png" width="100%" height="40" alt="BrBG">

Given a number *t* in the range [0,1], returns the corresponding color from the “BrBG” diverging color scheme represented as an RGB string.

### d3.interpolatePRGn(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/diverging/PRGn.js "Source")
<br><a href="#schemePRGn" name="schemePRGn">#</a> d3.<b>schemePRGn</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/PRGn.png" width="100%" height="40" alt="PRGn">

Given a number *t* in the range [0,1], returns the corresponding color from the “PRGn” diverging color scheme represented as an RGB string.

### d3.interpolatePiYG(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/diverging/PiYG.js "Source")
<br><a href="#schemePiYG" name="schemePiYG">#</a> d3.<b>schemePiYG</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/PiYG.png" width="100%" height="40" alt="PiYG">

Given a number *t* in the range [0,1], returns the corresponding color from the “PiYG” diverging color scheme represented as an RGB string.

### d3.interpolatePuOr(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/diverging/PuOr.js "Source")
<br><a href="#schemePuOr" name="schemePuOr">#</a> d3.<b>schemePuOr</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/PuOr.png" width="100%" height="40" alt="PuOr">

Given a number *t* in the range [0,1], returns the corresponding color from the “PuOr” diverging color scheme represented as an RGB string.

### d3.interpolateRdBu(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/diverging/RdBu.js "Source")
<br><a href="#schemeRdBu" name="schemeRdBu">#</a> d3.<b>schemeRdBu</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/RdBu.png" width="100%" height="40" alt="RdBu">

Given a number *t* in the range [0,1], returns the corresponding color from the “RdBu” diverging color scheme represented as an RGB string.

### d3.interpolateRdGy(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/diverging/RdGy.js "Source")
<br><a href="#schemeRdGy" name="schemeRdGy">#</a> d3.<b>schemeRdGy</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/RdGy.png" width="100%" height="40" alt="RdGy">

Given a number *t* in the range [0,1], returns the corresponding color from the “RdGy” diverging color scheme represented as an RGB string.

### d3.interpolateRdYlBu(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/diverging/RdYlBu.js "Source")
<br><a href="#schemeRdYlBu" name="schemeRdYlBu">#</a> d3.<b>schemeRdYlBu</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/RdYlBu.png" width="100%" height="40" alt="RdYlBu">

Given a number *t* in the range [0,1], returns the corresponding color from the “RdYlBu” diverging color scheme represented as an RGB string.

### d3.interpolateRdYlGn(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/diverging/RdYlGn.js "Source")
<br><a href="#schemeRdYlGn" name="schemeRdYlGn">#</a> d3.<b>schemeRdYlGn</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/RdYlGn.png" width="100%" height="40" alt="RdYlGn">

Given a number *t* in the range [0,1], returns the corresponding color from the “RdYlGn” diverging color scheme represented as an RGB string.

### d3.interpolateSpectral(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/diverging/Spectral.js "Source")
<br><a href="#schemeSpectral" name="schemeSpectral">#</a> d3.<b>schemeSpectral</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Spectral.png" width="100%" height="40" alt="Spectral">

Given a number *t* in the range [0,1], returns the corresponding color from the “Spectral” diverging color scheme represented as an RGB string.

## Sequential, single-hue schemes

Sequential, single-hue color schemes are available as continuous interpolators (often used with [d3.scaleSequential](https://github.com/d3/d3-scale/blob/master/README.md#sequential-scales)) and as discrete schemes (often used with [d3.scaleOrdinal](https://github.com/d3/d3-scale/blob/master/README.md#ordinal-scales)). Each discrete scheme, such as [d3.schemeBlues](#schemeBlues), is represented as an array of arrays of hexadecimal color strings. The *k*th element of this array contains the color scheme of size *k*; for example, `d3.schemeBlues[9]` contains an array of nine strings representing the nine colors of the blue sequential color scheme. Sequential, single-hue color schemes support a size *k* ranging from 3 to 9.

### d3.interpolateBlues(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-single/Blues.js "Source")
<br><a href="#schemeBlues" name="schemeBlues">#</a> d3.<b>schemeBlues</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Blues.png" width="100%" height="40" alt="Blues">

Given a number *t* in the range [0,1], returns the corresponding color from the “Blues” sequential color scheme represented as an RGB string.

### d3.interpolateGreens(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-single/Greens.js "Source")
<br><a href="#schemeGreens" name="schemeGreens">#</a> d3.<b>schemeGreens</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Greens.png" width="100%" height="40" alt="Greens">

Given a number *t* in the range [0,1], returns the corresponding color from the “Greens” sequential color scheme represented as an RGB string.

### d3.interpolateGreys(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-single/Greys.js "Source")
<br><a href="#schemeGreys" name="schemeGreys">#</a> d3.<b>schemeGreys</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Greys.png" width="100%" height="40" alt="Greys">

Given a number *t* in the range [0,1], returns the corresponding color from the “Greys” sequential color scheme represented as an RGB string.

### d3.interpolateOranges(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-single/Oranges.js "Source")
<br><a href="#schemeOranges" name="schemeOranges">#</a> d3.<b>schemeOranges</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Oranges.png" width="100%" height="40" alt="Oranges">

Given a number *t* in the range [0,1], returns the corresponding color from the “Oranges” sequential color scheme represented as an RGB string.

### d3.interpolatePurples(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-single/Purples.js "Source")
<br><a href="#schemePurples" name="schemePurples">#</a> d3.<b>schemePurples</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Purples.png" width="100%" height="40" alt="Purples">

Given a number *t* in the range [0,1], returns the corresponding color from the “Purples” sequential color scheme represented as an RGB string.

### d3.interpolateReds(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-single/Reds.js "Source")
<br><a href="#schemeReds" name="schemeReds">#</a> d3.<b>schemeReds</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/Reds.png" width="100%" height="40" alt="Reds">

Given a number *t* in the range [0,1], returns the corresponding color from the “Reds” sequential color scheme represented as an RGB string.

## Sequential, multi-hue schemes

Sequential, multi-hue color schemes are available as continuous interpolators (often used with [d3.scaleSequential](https://github.com/d3/d3-scale/blob/master/README.md#sequential-scales)) and as discrete schemes (often used with [d3.scaleOrdinal](https://github.com/d3/d3-scale/blob/master/README.md#ordinal-scales)). Each discrete scheme, such as [d3.schemeBuGn](#schemeBuGn), is represented as an array of arrays of hexadecimal color strings. The *k*th element of this array contains the color scheme of size *k*; for example, `d3.schemeBuGn[9]` contains an array of nine strings representing the nine colors of the blue-green sequential color scheme. Sequential, multi-hue color schemes support a size *k* ranging from 3 to 9.

### d3.interpolateTurbo(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/turbo.js "Source")

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/turbo.png" width="100%" height="40" alt="turbo">

Given a number *t* in the range [0,1], returns the corresponding color from the “turbo” color scheme by [Anton Mikhailov](https://ai.googleblog.com/2019/08/turbo-improved-rainbow-colormap-for.html).

### d3.interpolateViridis(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/viridis.js "Source")

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/viridis.png" width="100%" height="40" alt="viridis">

Given a number *t* in the range [0,1], returns the corresponding color from the “viridis” perceptually-uniform color scheme designed by [van der Walt, Smith and Firing](https://bids.github.io/colormap/) for matplotlib, represented as an RGB string.

### d3.interpolateInferno(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/viridis.js "Source")

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/inferno.png" width="100%" height="40" alt="inferno">

Given a number *t* in the range [0,1], returns the corresponding color from the “inferno” perceptually-uniform color scheme designed by [van der Walt and Smith](https://bids.github.io/colormap/) for matplotlib, represented as an RGB string.

### d3.interpolateMagma(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/viridis.js "Source")

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/magma.png" width="100%" height="40" alt="magma">

Given a number *t* in the range [0,1], returns the corresponding color from the “magma” perceptually-uniform color scheme designed by [van der Walt and Smith](https://bids.github.io/colormap/) for matplotlib, represented as an RGB string.

### d3.interpolatePlasma(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/viridis.js "Source")

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/plasma.png" width="100%" height="40" alt="plasma">

Given a number *t* in the range [0,1], returns the corresponding color from the “plasma” perceptually-uniform color scheme designed by [van der Walt and Smith](https://bids.github.io/colormap/) for matplotlib, represented as an RGB string.

### d3.interpolateCividis(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/cividis.js "Source")

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/cividis.png" width="100%" height="40" alt="cividis">

Given a number *t* in the range [0,1], returns the corresponding color from the “cividis” color vision deficiency-optimized color scheme designed by [Nuñez, Anderton, and Renslow](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0199239), represented as an RGB string.

### d3.interpolateWarm(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/rainbow.js "Source")

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/warm.png" width="100%" height="40" alt="warm">

Given a number *t* in the range [0,1], returns the corresponding color from a 180° rotation of [Niccoli’s perceptual rainbow](https://mycarta.wordpress.com/2013/02/21/perceptual-rainbow-palette-the-method/), represented as an RGB string.

### d3.interpolateCool(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/rainbow.js "Source")

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/cool.png" width="100%" height="40" alt="cool">

Given a number *t* in the range [0,1], returns the corresponding color from [Niccoli’s perceptual rainbow](https://mycarta.wordpress.com/2013/02/21/perceptual-rainbow-palette-the-method/), represented as an RGB string.

### d3.interpolateCubehelixDefault(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/cubehelix.js "Source")

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/cubehelix.png" width="100%" height="40" alt="cubehelix">

Given a number *t* in the range [0,1], returns the corresponding color from [Green’s default Cubehelix](http://www.mrao.cam.ac.uk/~dag/CUBEHELIX/) represented as an RGB string.

### d3.interpolateBuGn(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/BuGn.js "Source")
<br><a href="#schemeBuGn" name="schemeBuGn">#</a> d3.<b>schemeBuGn</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/BuGn.png" width="100%" height="40" alt="BuGn">

Given a number *t* in the range [0,1], returns the corresponding color from the “BuGn” sequential color scheme represented as an RGB string.

### d3.interpolateBuPu(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/BuPu.js "Source")
<br><a href="#schemeBuPu" name="schemeBuPu">#</a> d3.<b>schemeBuPu</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/BuPu.png" width="100%" height="40" alt="BuPu">

Given a number *t* in the range [0,1], returns the corresponding color from the “BuPu” sequential color scheme represented as an RGB string.

### d3.interpolateGnBu(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/GnBu.js "Source")
<br><a href="#schemeGnBu" name="schemeGnBu">#</a> d3.<b>schemeGnBu</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/GnBu.png" width="100%" height="40" alt="GnBu">

Given a number *t* in the range [0,1], returns the corresponding color from the “GnBu” sequential color scheme represented as an RGB string.

### d3.interpolateOrRd(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/OrRd.js "Source")
<br><a href="#schemeOrRd" name="schemeOrRd">#</a> d3.<b>schemeOrRd</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/OrRd.png" width="100%" height="40" alt="OrRd">

Given a number *t* in the range [0,1], returns the corresponding color from the “OrRd” sequential color scheme represented as an RGB string.

### d3.interpolatePuBuGn(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/PuBuGn.js "Source")
<br><a href="#schemePuBuGn" name="schemePuBuGn">#</a> d3.<b>schemePuBuGn</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/PuBuGn.png" width="100%" height="40" alt="PuBuGn">

Given a number *t* in the range [0,1], returns the corresponding color from the “PuBuGn” sequential color scheme represented as an RGB string.

### d3.interpolatePuBu(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/PuBu.js "Source")
<br><a href="#schemePuBu" name="schemePuBu">#</a> d3.<b>schemePuBu</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/PuBu.png" width="100%" height="40" alt="PuBu">

Given a number *t* in the range [0,1], returns the corresponding color from the “PuBu” sequential color scheme represented as an RGB string.

### d3.interpolatePuRd(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/PuRd.js "Source")
<br><a href="#schemePuRd" name="schemePuRd">#</a> d3.<b>schemePuRd</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/PuRd.png" width="100%" height="40" alt="PuRd">

Given a number *t* in the range [0,1], returns the corresponding color from the “PuRd” sequential color scheme represented as an RGB string.

### d3.interpolateRdPu(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/RdPu.js "Source")
<br><a href="#schemeRdPu" name="schemeRdPu">#</a> d3.<b>schemeRdPu</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/RdPu.png" width="100%" height="40" alt="RdPu">

Given a number *t* in the range [0,1], returns the corresponding color from the “RdPu” sequential color scheme represented as an RGB string.

### d3.interpolateYlGnBu(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/YlGnBu.js "Source")
<br><a href="#schemeYlGnBu" name="schemeYlGnBu">#</a> d3.<b>schemeYlGnBu</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/YlGnBu.png" width="100%" height="40" alt="YlGnBu">

Given a number *t* in the range [0,1], returns the corresponding color from the “YlGnBu” sequential color scheme represented as an RGB string.

### d3.interpolateYlGn(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/YlGn.js "Source")
<br><a href="#schemeYlGn" name="schemeYlGn">#</a> d3.<b>schemeYlGn</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/YlGn.png" width="100%" height="40" alt="YlGn">

Given a number *t* in the range [0,1], returns the corresponding color from the “YlGn” sequential color scheme represented as an RGB string.

### d3.interpolateYlOrBr(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/YlOrBr.js "Source")
<br><a href="#schemeYlOrBr" name="schemeYlOrBr">#</a> d3.<b>schemeYlOrBr</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/YlOrBr.png" width="100%" height="40" alt="YlOrBr">

Given a number *t* in the range [0,1], returns the corresponding color from the “YlOrBr” sequential color scheme represented as an RGB string.

### d3.interpolateYlOrRd(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/YlOrRd.js "Source")
<br><a href="#schemeYlOrRd" name="schemeYlOrRd">#</a> d3.<b>schemeYlOrRd</b>[*k*]

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/YlOrRd.png" width="100%" height="40" alt="YlOrRd">

Given a number *t* in the range [0,1], returns the corresponding color from the “YlOrRd” sequential color scheme represented as an RGB string.

## Cyclical schemes

### d3.interpolateRainbow(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/rainbow.js "Source")

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/rainbow.png" width="100%" height="40" alt="rainbow">

Given a number *t* in the range [0,1], returns the corresponding color from [d3.interpolateWarm](#interpolateWarm) scale from [0.0, 0.5] followed by the [d3.interpolateCool](#interpolateCool) scale from [0.5, 1.0], thus implementing the cyclical [less-angry rainbow](http://bl.ocks.org/mbostock/310c99e53880faec2434) color scheme.

### d3.interpolateSinebow(t)

[Source](https://github.com/d3/d3-scale-chromatic/blob/master/src/sequential-multi/sinebow.js "Source")

<img src="https://raw.githubusercontent.com/d3/d3-scale-chromatic/master/img/sinebow.png" width="100%" height="40" alt="sinebow">

Given a number *t* in the range [0,1], returns the corresponding color from the “sinebow” color scheme by [Jim Bumgardner](https://krazydad.com/tutorials/makecolors.php) and [Charlie Loyd](http://basecase.org/env/on-rainbows).
