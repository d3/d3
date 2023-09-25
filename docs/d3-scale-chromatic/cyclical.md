<script setup>

import * as d3 from "d3";
import ColorRamp from "../components/ColorRamp.vue";

</script>

# Cyclical schemes

To create a cyclical continuous color scale using the [Rainbow](#interpolateRainbow) color scheme:

```js
const color = d3.scaleSequential(d3.interpolateRainbow);
```

## interpolateRainbow(*t*) {#interpolateRainbow}

<ColorRamp :color="d3.interpolateRainbow" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/rainbow.js) · Given a number *t* in the range [0,1], returns the corresponding color from [d3.interpolateWarm](./sequential.md#interpolateWarm) scale from [0.0, 0.5] followed by the [d3.interpolateCool](./sequential.md#interpolateCool) scale from [0.5, 1.0], thus implementing the cyclical [less-angry rainbow](https://observablehq.com/@mbostock/sinebow) color scheme.

## interpolateSinebow(*t*) {#interpolateSinebow}

<ColorRamp :color="d3.interpolateSinebow" />

[Source](https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/sinebow.js) · Given a number *t* in the range [0,1], returns the corresponding color from the “sinebow” color scheme by [Jim Bumgardner](https://krazydad.com/tutorials/makecolors.php) and [Charlie Loyd](http://basecase.org/env/on-rainbows).
