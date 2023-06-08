<script setup>

import * as d3 from "d3";
import ColorRamp from "./components/ColorRamp.vue";

</script>

# d3-interpolate

This module provides a variety of interpolation methods for blending between two values. Values may be numbers, colors, strings, arrays, or even deeply-nested objects. For example:

```js
const i = d3.interpolateNumber(10, 20);
i(0.0); // 10
i(0.2); // 12
i(0.5); // 15
i(1.0); // 20
```

The returned function `i` is an *interpolator*. Given a starting value *a* and an ending value *b*, it takes a parameter *t* typically in [0, 1] and returns the corresponding interpolated value. An interpolator typically returns a value equivalent to *a* at *t* = 0 and a value equivalent to *b* at *t* = 1.

You can interpolate more than just numbers. To find the perceptual midpoint between steelblue and brown:

```js
d3.interpolateLab("steelblue", "brown")(0.5); // "rgb(142, 92, 109)"
```

Or, as a color ramp from *t* = 0 to *t* = 1:

<ColorRamp :color='d3.interpolateLab("steelblue", "brown")' />

Here’s a more elaborate example demonstrating type inference used by [interpolate](./d3-interpolate/value.md#interpolate):

```js
const i = d3.interpolate({colors: ["red", "blue"]}, {colors: ["white", "black"]});
i(0.0); // {colors: ["rgb(255, 0, 0)", "rgb(0, 0, 255)"]}
i(0.5); // {colors: ["rgb(255, 128, 128)", "rgb(0, 0, 128)"]}
i(1.0); // {colors: ["rgb(255, 255, 255)", "rgb(0, 0, 0)"]}
```

Note that the generic value interpolator detects not only nested objects and arrays, but also color strings and numbers embedded in strings!

See one of:

* [Value interpolation](./d3-interpolate/value.md)
* [Color interpolation](./d3-interpolate/color.md)
* [Transform interpolation](./d3-interpolate/transform.md)
* [Zoom interpolation](./d3-interpolate/zoom.md)
